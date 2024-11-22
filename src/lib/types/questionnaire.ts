export type QuestionType = 'text' | 'choice' | 'multiple' | 'scale' | 'like-dislike' | 'yes-no';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  section?: string;
  options?: string[];
  aiSuggestion?: string;
  followUpQuestion?: string;
  homework?: string;
}

export interface QuestionnaireSection {
  title: string;
  description: string;
  questions: Question[];
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string | string[] | number | boolean;
  timestamp: string;
}

export interface QuestionnaireResult {
  userId: string;
  responses: QuestionnaireResponse[];
  completedAt: string;
  recommendations?: BusinessRecommendation[];
}

export interface BusinessRecommendation {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  reasons: string[];
  marketPotential: string;
  requiredSkills: string[];
  estimatedStartupCost: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: {
    preparation: string;
    launch: string;
    breakeven: string;
  };
  nextSteps: string[];
}
