import { openai, MODELS } from './config';
import { redisCache } from '../utils/redis-cache';
import { rateLimiter, RateLimitError } from '../utils/rate-limiter';
import { responseTemplates, systemPrompts, parseAIResponse, formatResponse } from './templates';
import { logger } from '../monitoring';
import type { Database } from '../../types/database';
import { 
  BusinessIdea, 
  FollowUpQuestion, 
  ActionableSuggestions, 
  MarketInsights,
  ValidationResult,
  validateBusinessIdeaArray,
  validateFollowUpQuestionArray,
  validateActionableSuggestions,
  validateMarketInsights,
  GenerationMetadata,
  ResponseQuality
} from './types';

type QuestionnaireResponse = Database['public']['Tables']['questionnaire_responses']['Row'];

interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
};

const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 3600, // 1 hour
  LONG: 86400, // 24 hours
};

const QUALITY_THRESHOLDS = {
  MIN_OVERALL: 0.7,
  MIN_SPECIFICITY: 0.6,
  MIN_ACTIONABILITY: 0.6,
};

export class AIServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly retryAfter?: number,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

async function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error | null = null;
  let delay = config.initialDelay;

  for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      logger.warn(`Retry attempt ${attempt} failed:`, error);

      if (
        error instanceof RateLimitError ||
        error.code === 'INVALID_REQUEST' ||
        error.code === 'AUTH_ERROR'
      ) {
        throw error;
      }

      if (attempt === config.maxRetries) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, config.maxDelay);
    }
  }

  throw lastError || new Error('Operation failed after retries');
}

const handleAIError = (error: any) => {
  logger.error('AI Service error:', error);

  if (error instanceof RateLimitError) {
    throw new AIServiceError(
      'Rate limit exceeded. Please try again later.',
      'RATE_LIMIT',
      error.retryAfter,
      error
    );
  }

  if (error.response?.status === 429) {
    throw new AIServiceError(
      'Rate limit exceeded. Please try again later.',
      'RATE_LIMIT',
      error.response.headers['retry-after'],
      error
    );
  }

  if (error.response?.status === 400) {
    throw new AIServiceError(
      'Invalid request to AI service.',
      'INVALID_REQUEST',
      undefined,
      error
    );
  }

  if (error.response?.status === 401) {
    throw new AIServiceError(
      'Authentication error with AI service.',
      'AUTH_ERROR',
      undefined,
      error
    );
  }

  if (error.response?.status === 500) {
    throw new AIServiceError(
      'AI service is currently unavailable.',
      'SERVICE_ERROR',
      undefined,
      error
    );
  }

  if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
    throw new AIServiceError(
      'Failed to connect to AI service.',
      'CONNECTION_ERROR',
      undefined,
      error
    );
  }

  throw new AIServiceError(
    'Unexpected error occurred.',
    'UNKNOWN_ERROR',
    undefined,
    error
  );
};

const generateCacheKey = (type: string, response: QuestionnaireResponse): string => {
  const { user_id, experience, interests, commitment, resources } = response;
  return `${type}:${user_id}:${JSON.stringify({ experience, interests, commitment, resources })}`;
};

const validateAndCacheResponse = async <T>(
  response: T,
  validator: (data: any) => ValidationResult<T>,
  cacheKey: string,
  ttl: number,
  metadata: GenerationMetadata
): Promise<T & { metadata: GenerationMetadata }> => {
  const validation = validator(response);
  if (!validation.isValid) {
    logger.error('Response validation failed:', validation.errors);
    throw new AIServiceError(
      'Generated response failed validation',
      'VALIDATION_ERROR',
      undefined,
      validation.errors
    );
  }

  if (validation.quality) {
    metadata.quality = validation.quality;
  }

  const responseWithMetadata = { ...response, metadata };
  await redisCache.set(cacheKey, JSON.stringify(responseWithMetadata), ttl);
  return responseWithMetadata;
};

const createGenerationMetadata = (
  model: string,
  temperature: number,
  startTime: number,
  completion: any
): GenerationMetadata => ({
  timestamp: Date.now(),
  model,
  temperature,
  quality: {
    completeness: 0,
    relevance: 0,
    specificity: 0,
    actionability: 0,
    overall: 0
  },
  generationTime: Date.now() - startTime,
  promptTokens: completion.usage?.prompt_tokens || 0,
  completionTokens: completion.usage?.completion_tokens || 0,
  totalTokens: completion.usage?.total_tokens || 0
});

export const aiService = {
  async generateBusinessIdeas(response: QuestionnaireResponse, signal?: AbortSignal) {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    const cacheKey = generateCacheKey('ideas', response);
    const cachedResult = await redisCache.get(cacheKey);
    if (cachedResult) {
      try {
        const parsed = JSON.parse(cachedResult);
        if (parsed.metadata) return parsed;
      } catch (error) {
        logger.warn('Cache parsing failed:', error);
      }
    }

    try {
      const result = await withRetry(async () => {
        const startTime = Date.now();
        const prompt = `As a startup advisor, generate 3 detailed and personalized business ideas based on the following information:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format each idea exactly like this template:
${responseTemplates.businessIdea}`;

        const completion = await openai.chat.completions.create({
          model: MODELS.GPT4,
          messages: [
            { role: 'system', content: systemPrompts.businessIdea },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          stream: false,
        }, { signal });

        const content = completion.choices[0].message.content;
        if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE');

        const metadata = createGenerationMetadata(MODELS.GPT4, 0.7, startTime, completion);
        const parsedIdeas = parseAIResponse(content, 'ideas') as BusinessIdea[];
        
        return validateAndCacheResponse(
          parsedIdeas,
          validateBusinessIdeaArray,
          cacheKey,
          CACHE_TTL.MEDIUM,
          metadata
        );
      });

      return result;
    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  },

  async generateFollowUpQuestions(response: QuestionnaireResponse, signal?: AbortSignal) {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    const cacheKey = generateCacheKey('questions', response);
    const cachedResult = await redisCache.get(cacheKey);
    if (cachedResult) {
      try {
        const parsed = JSON.parse(cachedResult);
        if (parsed.metadata) return parsed;
      } catch (error) {
        logger.warn('Cache parsing failed:', error);
      }
    }

    try {
      const result = await withRetry(async () => {
        const startTime = Date.now();
        const prompt = `Based on the following questionnaire responses, generate 5 specific follow-up questions:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format each question exactly like this template:
${responseTemplates.followUpQuestion}`;

        const completion = await openai.chat.completions.create({
          model: MODELS.GPT4,
          messages: [
            { role: 'system', content: systemPrompts.followUpQuestion },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          stream: false,
        }, { signal });

        const content = completion.choices[0].message.content;
        if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE');

        const metadata = createGenerationMetadata(MODELS.GPT4, 0.7, startTime, completion);
        const parsedQuestions = parseAIResponse(content, 'questions') as FollowUpQuestion[];
        
        return validateAndCacheResponse(
          parsedQuestions,
          validateFollowUpQuestionArray,
          cacheKey,
          CACHE_TTL.SHORT,
          metadata
        );
      });

      return result;
    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  },

  async generateActionableSuggestions(response: QuestionnaireResponse, signal?: AbortSignal) {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    const cacheKey = generateCacheKey('suggestions', response);
    const cachedResult = await redisCache.get(cacheKey);
    if (cachedResult) {
      try {
        const parsed = JSON.parse(cachedResult);
        if (parsed.metadata) return parsed;
      } catch (error) {
        logger.warn('Cache parsing failed:', error);
      }
    }

    try {
      const result = await withRetry(async () => {
        const startTime = Date.now();
        const prompt = `Based on the following profile, provide detailed, actionable suggestions:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format the response exactly like this template:
${responseTemplates.actionableSuggestions}`;

        const completion = await openai.chat.completions.create({
          model: MODELS.GPT4,
          messages: [
            { role: 'system', content: systemPrompts.actionableSuggestions },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          stream: false,
        }, { signal });

        const content = completion.choices[0].message.content;
        if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE');

        const metadata = createGenerationMetadata(MODELS.GPT4, 0.7, startTime, completion);
        const parsedSuggestions = parseAIResponse(content, 'suggestions') as ActionableSuggestions;
        
        return validateAndCacheResponse(
          parsedSuggestions,
          validateActionableSuggestions,
          cacheKey,
          CACHE_TTL.MEDIUM,
          metadata
        );
      });

      return result;
    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  },

  async generateMarketInsights(response: QuestionnaireResponse, signal?: AbortSignal) {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    const cacheKey = generateCacheKey('insights', response);
    const cachedResult = await redisCache.get(cacheKey);
    if (cachedResult) {
      try {
        const parsed = JSON.parse(cachedResult);
        if (parsed.metadata) return parsed;
      } catch (error) {
        logger.warn('Cache parsing failed:', error);
      }
    }

    try {
      const result = await withRetry(async () => {
        const startTime = Date.now();
        const prompt = `Analyze market opportunities based on this profile:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format the response exactly like this template:
${responseTemplates.marketInsights}`;

        const completion = await openai.chat.completions.create({
          model: MODELS.GPT4,
          messages: [
            { role: 'system', content: systemPrompts.marketInsights },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          stream: false,
        }, { signal });

        const content = completion.choices[0].message.content;
        if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE');

        const metadata = createGenerationMetadata(MODELS.GPT4, 0.7, startTime, completion);
        const parsedInsights = parseAIResponse(content, 'insights') as MarketInsights;
        
        return validateAndCacheResponse(
          parsedInsights,
          validateMarketInsights,
          cacheKey,
          CACHE_TTL.LONG,
          metadata
        );
      });

      return result;
    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  },

  async *streamResponse(response: QuestionnaireResponse, type: 'ideas' | 'questions' | 'suggestions' | 'insights') {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    let prompt = '';
    let template = '';
    let systemMessage = '';

    switch (type) {
      case 'ideas':
        prompt = `As a startup advisor, generate 3 detailed and personalized business ideas...`;
        template = responseTemplates.businessIdea;
        systemMessage = systemPrompts.businessIdea;
        break;
      case 'questions':
        prompt = `Based on the following questionnaire responses, generate 5 specific follow-up questions...`;
        template = responseTemplates.followUpQuestion;
        systemMessage = systemPrompts.followUpQuestion;
        break;
      case 'suggestions':
        prompt = `Based on the following profile, provide detailed, actionable suggestions...`;
        template = responseTemplates.actionableSuggestions;
        systemMessage = systemPrompts.actionableSuggestions;
        break;
      case 'insights':
        prompt = `Analyze market opportunities based on this profile...`;
        template = responseTemplates.marketInsights;
        systemMessage = systemPrompts.marketInsights;
        break;
    }

    try {
      const stream = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        stream: true,
      });

      let buffer = '';
      let section = '';
      
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        buffer += content;
        
        // Detect section boundaries and yield complete sections
        if (content.includes('---') || content.includes('==')) {
          if (section) {
            yield section;
            section = '';
          }
          buffer = '';
        } else if (content.includes('.') || content.includes('\n')) {
          section += buffer;
          buffer = '';
        }
      }
      
      // Yield any remaining content
      if (buffer || section) {
        yield buffer || section;
      }

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  }
};
