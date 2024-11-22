import { openai, MODELS } from './config'
import { cache, rateLimiter } from '../utils/cache'
import { responseTemplates, parseAIResponse } from './templates'
import type { Database } from '../../types/database'
import { BusinessIdea, FollowUpQuestion, ActionableSuggestions, MarketInsights } from './types'

type QuestionnaireResponse = Database['public']['Tables']['questionnaire_responses']['Row']

class AIServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly retryAfter?: number,
    public readonly originalError?: any
  ) {
    super(message)
    this.name = 'AIServiceError'
  }
}

const handleAIError = (error: any) => {
  // OpenAI specific error handling
  if (error.response?.status === 429) {
    throw new AIServiceError(
      'Rate limit exceeded. Please try again later.',
      'RATE_LIMIT',
      error.response.headers['retry-after'],
      error
    )
  }

  if (error.response?.status === 400) {
    throw new AIServiceError(
      'Invalid request to AI service.',
      'INVALID_REQUEST',
      undefined,
      error
    )
  }

  if (error.response?.status === 401) {
    throw new AIServiceError(
      'Authentication error with AI service.',
      'AUTH_ERROR',
      undefined,
      error
    )
  }

  if (error.response?.status === 500) {
    throw new AIServiceError(
      'AI service is currently unavailable.',
      'SERVICE_ERROR',
      undefined,
      error
    )
  }

  // Network or other errors
  if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
    throw new AIServiceError(
      'Failed to connect to AI service.',
      'CONNECTION_ERROR',
      undefined,
      error
    )
  }

  throw new AIServiceError(
    'Unexpected error occurred.',
    'UNKNOWN_ERROR',
    undefined,
    error
  )
}

export const aiService = {
  async generateBusinessIdeas(response: QuestionnaireResponse, signal?: AbortSignal) {
    const cacheKey = `ideas:${JSON.stringify(response)}`
    const cachedResult = cache.get(cacheKey)
    if (cachedResult) return cachedResult

    await rateLimiter.waitForToken()

    try {
      const prompt = `As a startup advisor, generate 3 detailed and personalized business ideas based on the following information:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

For each idea, provide:
1. Business Name
2. Description
3. Target Market
4. Required Skills
5. Initial Investment Range
6. Potential Challenges
7. First Steps to Get Started

Format each idea exactly like this template:
${responseTemplates.businessIdea}`

      const completion = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        stream: false,
      }, { signal })

      const content = completion.choices[0].message.content
      if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE')

      const parsedIdeas = parseAIResponse(content, 'ideas') as BusinessIdea[]
      const formattedResponse = parsedIdeas.map(idea => 
        responseTemplates.businessIdea
          .replace('{name}', idea.name)
          .replace('{description}', idea.description)
          .replace('{targetMarket}', idea.targetMarket)
          .replace('{skills}', idea.skills)
          .replace('{investment}', idea.investment)
          .replace('{challenges}', idea.challenges)
          .replace('{steps}', idea.steps)
      ).join('\n\n')

      cache.set(cacheKey, formattedResponse)
      return formattedResponse

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error
      handleAIError(error)
    }
  },

  async generateFollowUpQuestions(response: QuestionnaireResponse, signal?: AbortSignal) {
    const cacheKey = `questions:${JSON.stringify(response)}`
    const cachedResult = cache.get(cacheKey)
    if (cachedResult) return cachedResult

    await rateLimiter.waitForToken()

    try {
      const prompt = `Based on the following questionnaire responses, generate 5 specific follow-up questions to help better understand the user's business potential:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format each question exactly like this template:
${responseTemplates.followUpQuestions}`

      const completion = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        stream: false,
      }, { signal })

      const content = completion.choices[0].message.content
      if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE')

      const parsedQuestions = parseAIResponse(content, 'questions') as FollowUpQuestion[]
      const formattedResponse = parsedQuestions.map((q, i) => 
        responseTemplates.followUpQuestions
          .replace('{number}', (i + 1).toString())
          .replace('{question}', q.question)
          .replace('{importance}', q.importance)
      ).join('\n\n')

      cache.set(cacheKey, formattedResponse)
      return formattedResponse

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error
      handleAIError(error)
    }
  },

  async generateActionableSuggestions(response: QuestionnaireResponse, signal?: AbortSignal) {
    const cacheKey = `suggestions:${JSON.stringify(response)}`
    const cachedResult = cache.get(cacheKey)
    if (cachedResult) return cachedResult

    await rateLimiter.waitForToken()

    try {
      const prompt = `Based on the following profile, provide detailed, actionable suggestions for starting a business:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format the response exactly like this template:
${responseTemplates.actionableSuggestions}`

      const completion = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        stream: false,
      }, { signal })

      const content = completion.choices[0].message.content
      if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE')

      const parsedSuggestions = parseAIResponse(content, 'suggestions') as ActionableSuggestions
      const formattedResponse = responseTemplates.actionableSuggestions
        .replace('{immediateSteps}', parsedSuggestions.immediate_next_steps)
        .replace('{skillDevelopment}', parsedSuggestions.skill_development)
        .replace('{networking}', parsedSuggestions.networking_strategy)
        .replace('{resources}', parsedSuggestions.resource_allocation)
        .replace('{pitfalls}', parsedSuggestions.potential_pitfalls)
        .replace('{timeline}', parsedSuggestions.implementation_timeline)

      cache.set(cacheKey, formattedResponse)
      return formattedResponse

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error
      handleAIError(error)
    }
  },

  async generateMarketInsights(response: QuestionnaireResponse, signal?: AbortSignal) {
    const cacheKey = `insights:${JSON.stringify(response)}`
    const cachedResult = cache.get(cacheKey)
    if (cachedResult) return cachedResult

    await rateLimiter.waitForToken()

    try {
      const prompt = `Analyze market opportunities based on this profile:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format the response exactly like this template:
${responseTemplates.marketInsights}`

      const completion = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        stream: false,
      }, { signal })

      const content = completion.choices[0].message.content
      if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE')

      const parsedInsights = parseAIResponse(content, 'insights') as MarketInsights
      const formattedResponse = responseTemplates.marketInsights
        .replace('{trends}', parsedInsights.current_trends)
        .replace('{gaps}', parsedInsights.market_gaps)
        .replace('{competition}', parsedInsights.competitive_landscape)
        .replace('{customers}', parsedInsights.target_customers)
        .replace('{revenue}', parsedInsights.revenue_potential)
        .replace('{strategy}', parsedInsights.entry_strategy)

      cache.set(cacheKey, formattedResponse)
      return formattedResponse

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error
      handleAIError(error)
    }
  },

  // New method for streaming responses
  async *streamResponse(response: QuestionnaireResponse, type: 'ideas' | 'questions' | 'suggestions' | 'insights') {
    await rateLimiter.waitForToken()

    let prompt = ''
    let template = ''

    switch (type) {
      case 'ideas':
        prompt = `As a startup advisor, generate 3 detailed and personalized business ideas...`
        template = responseTemplates.businessIdea
        break
      case 'questions':
        prompt = `Based on the following questionnaire responses, generate 5 specific follow-up questions...`
        template = responseTemplates.followUpQuestions
        break
      case 'suggestions':
        prompt = `Based on the following profile, provide detailed, actionable suggestions...`
        template = responseTemplates.actionableSuggestions
        break
      case 'insights':
        prompt = `Analyze market opportunities based on this profile...`
        template = responseTemplates.marketInsights
        break
    }

    try {
      const stream = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        stream: true,
      })

      let buffer = ''
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        buffer += content
        
        // Only yield complete sentences or sections
        if (content.includes('.') || content.includes('\n')) {
          yield buffer
          buffer = ''
        }
      }
      
      // Yield any remaining content
      if (buffer) {
        yield buffer
      }

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error
      handleAIError(error)
    }
  }
}
