export interface BusinessIdea {
  name: string;
  description: string;
  targetMarket: string;
  skills: string;
  investment: string;
  challenges: string;
  steps: string;
}

export interface FollowUpQuestion {
  question: string;
  importance: string;
}

export interface ActionableSuggestions {
  immediate_next_steps: string;
  skill_development: string;
  networking_strategy: string;
  resource_allocation: string;
  potential_pitfalls: string;
  implementation_timeline: string;
  [key: string]: string; // Add index signature
}

export interface MarketInsights {
  current_trends: string;
  market_gaps: string;
  competitive_landscape: string;
  target_customers: string;
  revenue_potential: string;
  entry_strategy: string;
  [key: string]: string; // Add index signature
}

export type ParsedResponse = 
  | BusinessIdea[]
  | FollowUpQuestion[]
  | ActionableSuggestions
  | MarketInsights;

export const isBusinessIdea = (obj: any): obj is BusinessIdea => {
  return (
    typeof obj === 'object' &&
    'name' in obj &&
    'description' in obj &&
    'targetMarket' in obj &&
    'skills' in obj &&
    'investment' in obj &&
    'challenges' in obj &&
    'steps' in obj
  );
};

export const isFollowUpQuestion = (obj: any): obj is FollowUpQuestion => {
  return (
    typeof obj === 'object' &&
    'question' in obj &&
    'importance' in obj
  );
};

export const isActionableSuggestions = (obj: any): obj is ActionableSuggestions => {
  return (
    typeof obj === 'object' &&
    'immediate_next_steps' in obj &&
    'skill_development' in obj &&
    'networking_strategy' in obj &&
    'resource_allocation' in obj &&
    'potential_pitfalls' in obj &&
    'implementation_timeline' in obj
  );
};

export const isMarketInsights = (obj: any): obj is MarketInsights => {
  return (
    typeof obj === 'object' &&
    'current_trends' in obj &&
    'market_gaps' in obj &&
    'competitive_landscape' in obj &&
    'target_customers' in obj &&
    'revenue_potential' in obj &&
    'entry_strategy' in obj
  );
};
