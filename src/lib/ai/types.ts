export interface BusinessIdea {
  name: string;
  description: string;
  targetMarket: string;
  skills: string;
  investment: string;
  challenges: string;
  steps: string;
  metrics: string;
  validation: string;
  marketSize?: string;
  competitiveAdvantage?: string;
  timeToMarket?: string;
  scalabilityPotential?: string;
  techRequirements?: string;
  regulatoryConsiderations?: string;
  [key: string]: string | undefined;
}

export interface FollowUpQuestion {
  question: string;
  importance: string;
  context: string;
  insights: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  relatedTopics: string[];
  potentialAnswers: string[];
  [key: string]: string | string[] | 'high' | 'medium' | 'low';
}

export interface ActionableSuggestions {
  immediate_next_steps: string;
  skill_development: string;
  networking_strategy: string;
  resource_allocation: string;
  potential_pitfalls: string;
  implementation_timeline: string;
  risk_mitigation: string;
  success_indicators: string;
  milestone_tracking: string;
  cost_breakdown: string;
  resource_requirements: string;
  contingency_plans: string;
  [key: string]: string;
}

export interface MarketInsights {
  current_trends: string;
  market_gaps: string;
  competitive_landscape: string;
  target_customers: string;
  revenue_potential: string;
  entry_strategy: string;
  growth_opportunities: string;
  market_risks: string;
  market_size_analysis: string;
  customer_segments: string;
  pricing_strategy: string;
  distribution_channels: string;
  regulatory_environment: string;
  technology_trends: string;
  [key: string]: string;
}

export interface ResponseQuality {
  completeness: number;
  relevance: number;
  specificity: number;
  actionability: number;
  overall: number;
}

export interface GenerationMetadata {
  timestamp: number;
  model: string;
  temperature: number;
  quality: ResponseQuality;
  generationTime: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export type ParsedResponse = 
  | (BusinessIdea & { metadata: GenerationMetadata })[]
  | (FollowUpQuestion & { metadata: GenerationMetadata })[]
  | (ActionableSuggestions & { metadata: GenerationMetadata })
  | (MarketInsights & { metadata: GenerationMetadata });

export const isBusinessIdea = (obj: any): obj is BusinessIdea => {
  const requiredFields: (keyof BusinessIdea)[] = [
    'name', 'description', 'targetMarket', 'skills',
    'investment', 'challenges', 'steps', 'metrics', 'validation'
  ];
  
  return (
    typeof obj === 'object' &&
    requiredFields.every(field => field in obj)
  );
};

export const isFollowUpQuestion = (obj: any): obj is FollowUpQuestion => {
  const requiredFields: (keyof FollowUpQuestion)[] = [
    'question', 'importance', 'context', 'insights',
    'category', 'priority', 'relatedTopics', 'potentialAnswers'
  ];
  
  return (
    typeof obj === 'object' &&
    requiredFields.every(field => field in obj)
  );
};

export const isActionableSuggestions = (obj: any): obj is ActionableSuggestions => {
  const requiredFields: (keyof ActionableSuggestions)[] = [
    'immediate_next_steps', 'skill_development', 'networking_strategy',
    'resource_allocation', 'potential_pitfalls', 'implementation_timeline',
    'risk_mitigation', 'success_indicators', 'milestone_tracking',
    'cost_breakdown', 'resource_requirements', 'contingency_plans'
  ];
  
  return (
    typeof obj === 'object' &&
    requiredFields.every(field => field in obj)
  );
};

export const isMarketInsights = (obj: any): obj is MarketInsights => {
  const requiredFields: (keyof MarketInsights)[] = [
    'current_trends', 'market_gaps', 'competitive_landscape',
    'target_customers', 'revenue_potential', 'entry_strategy',
    'growth_opportunities', 'market_risks', 'market_size_analysis',
    'customer_segments', 'pricing_strategy', 'distribution_channels',
    'regulatory_environment', 'technology_trends'
  ];
  
  return (
    typeof obj === 'object' &&
    requiredFields.every(field => field in obj)
  );
};

export const isBusinessIdeaArray = (obj: any): obj is BusinessIdea[] => {
  return Array.isArray(obj) && obj.every(isBusinessIdea);
};

export const isFollowUpQuestionArray = (obj: any): obj is FollowUpQuestion[] => {
  return Array.isArray(obj) && obj.every(isFollowUpQuestion);
};

export interface ValidationResult<T> {
  isValid: boolean;
  data: T | null;
  errors: string[];
  quality?: ResponseQuality;
}

export function validateResponseQuality(response: Record<string, unknown>): ResponseQuality {
  const calculateScore = (value: unknown): number => {
    if (typeof value !== 'string') return 0;
    
    const length = value.length;
    const hasSpecificDetails = /\b(specifically|in particular|for example|such as)\b/i.test(value);
    const hasNumbers = /\d+/.test(value);
    const hasStructure = /\b(first|second|third|finally|moreover|however)\b/i.test(value);
    
    let score = 0;
    if (length > 200) score += 0.3;
    if (hasSpecificDetails) score += 0.3;
    if (hasNumbers) score += 0.2;
    if (hasStructure) score += 0.2;
    
    return Math.min(score, 1);
  };

  const stringValues = Object.entries(response)
    .filter(([_, value]) => typeof value === 'string')
    .map(([_, value]) => value);

  const scores = stringValues.map(calculateScore);
  
  if (scores.length === 0) {
    return {
      completeness: 0,
      relevance: 0,
      specificity: 0,
      actionability: 0,
      overall: 0
    };
  }
  
  return {
    completeness: scores.reduce((acc, score) => acc + score, 0) / scores.length,
    relevance: scores.reduce((acc, score) => acc + score, 0) / scores.length,
    specificity: scores.filter(score => score > 0.7).length / scores.length,
    actionability: scores.filter(score => score > 0.8).length / scores.length,
    overall: scores.reduce((acc, score) => acc + score, 0) / scores.length
  };
}

export function validateBusinessIdeaArray(ideas: any): ValidationResult<BusinessIdea[]> {
  const errors: string[] = [];
  
  if (!Array.isArray(ideas)) {
    return {
      isValid: false,
      data: null,
      errors: ['Expected an array of business ideas']
    };
  }

  const validatedIdeas: BusinessIdea[] = [];
  const requiredFields: (keyof BusinessIdea)[] = [
    'name', 'description', 'targetMarket', 'skills',
    'investment', 'challenges', 'steps', 'metrics', 'validation'
  ];

  ideas.forEach((idea, index) => {
    requiredFields.forEach(field => {
      if (!idea[field] || typeof idea[field] !== 'string' || !idea[field].trim()) {
        errors.push(`Idea ${index + 1}: Missing or invalid ${field}`);
      }
    });
    if (errors.length === 0) {
      validatedIdeas.push(idea);
    }
  });

  const quality = validateResponseQuality(
    validatedIdeas[0] ? Object.fromEntries(
      Object.entries(validatedIdeas[0]).filter(([_, v]) => typeof v === 'string')
    ) : {}
  );

  return {
    isValid: errors.length === 0 && quality.overall >= 0.7,
    data: errors.length === 0 ? validatedIdeas : null,
    errors,
    quality
  };
}

export function validateFollowUpQuestionArray(questions: any): ValidationResult<FollowUpQuestion[]> {
  const errors: string[] = [];
  
  if (!Array.isArray(questions)) {
    return {
      isValid: false,
      data: null,
      errors: ['Expected an array of follow-up questions']
    };
  }

  const validatedQuestions: FollowUpQuestion[] = [];
  const requiredFields: (keyof FollowUpQuestion)[] = [
    'question', 'importance', 'context', 'insights',
    'category', 'priority', 'relatedTopics', 'potentialAnswers'
  ];

  questions.forEach((question, index) => {
    requiredFields.forEach(field => {
      if (!question[field] || 
          (field !== 'relatedTopics' && field !== 'potentialAnswers' && typeof question[field] !== 'string') ||
          (field === 'priority' && !['high', 'medium', 'low'].includes(question[field])) ||
          ((field === 'relatedTopics' || field === 'potentialAnswers') && !Array.isArray(question[field]))) {
        errors.push(`Question ${index + 1}: Missing or invalid ${field}`);
      }
    });
    if (errors.length === 0) {
      validatedQuestions.push(question);
    }
  });

  const quality = validateResponseQuality(
    validatedQuestions[0] ? Object.fromEntries(
      Object.entries(validatedQuestions[0]).filter(([_, v]) => typeof v === 'string')
    ) : {}
  );

  return {
    isValid: errors.length === 0 && quality.overall >= 0.7,
    data: errors.length === 0 ? validatedQuestions : null,
    errors,
    quality
  };
}

export function validateActionableSuggestions(suggestions: any): ValidationResult<ActionableSuggestions> {
  const errors: string[] = [];
  const requiredFields: (keyof ActionableSuggestions)[] = [
    'immediate_next_steps', 'skill_development', 'networking_strategy',
    'resource_allocation', 'potential_pitfalls', 'implementation_timeline',
    'risk_mitigation', 'success_indicators', 'milestone_tracking',
    'cost_breakdown', 'resource_requirements', 'contingency_plans'
  ];

  requiredFields.forEach(field => {
    if (!suggestions[field] || typeof suggestions[field] !== 'string' || !suggestions[field].trim()) {
      errors.push(`Missing or invalid ${field}`);
    }
  });

  const quality = validateResponseQuality(suggestions);

  return {
    isValid: errors.length === 0 && quality.overall >= 0.7,
    data: errors.length === 0 ? suggestions : null,
    errors,
    quality
  };
}

export function validateMarketInsights(insights: any): ValidationResult<MarketInsights> {
  const errors: string[] = [];
  const requiredFields: (keyof MarketInsights)[] = [
    'current_trends', 'market_gaps', 'competitive_landscape',
    'target_customers', 'revenue_potential', 'entry_strategy',
    'growth_opportunities', 'market_risks', 'market_size_analysis',
    'customer_segments', 'pricing_strategy', 'distribution_channels',
    'regulatory_environment', 'technology_trends'
  ];

  requiredFields.forEach(field => {
    if (!insights[field] || typeof insights[field] !== 'string' || !insights[field].trim()) {
      errors.push(`Missing or invalid ${field}`);
    }
  });

  const quality = validateResponseQuality(insights);

  return {
    isValid: errors.length === 0 && quality.overall >= 0.7,
    data: errors.length === 0 ? insights : null,
    errors,
    quality
  };
}
