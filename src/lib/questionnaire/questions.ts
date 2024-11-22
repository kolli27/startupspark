export interface Question {
  id: string;
  text: string;
  type: 'text' | 'choice' | 'multiple' | 'scale' | 'like-dislike' | 'yes-no';
  options?: string[];
  nextQuestionId?: string | { [key: string]: string }; // For branching logic
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface QuestionnaireProgress {
  currentQuestionId: string;
  answers: { [key: string]: any };
  completed: boolean;
}

export const questions: Question[] = [
  {
    id: "experience",
    text: "What's your professional background?",
    type: "choice",
    options: [
      "Technology / Software Development",
      "Business / Management",
      "Creative / Design",
      "Marketing / Sales",
      "Other"
    ],
    nextQuestionId: {
      "Technology / Software Development": "tech_experience",
      "Business / Management": "business_experience",
      "default": "interests"
    },
    validation: { required: true }
  },
  {
    id: "tech_experience",
    text: "How many years of software development experience do you have?",
    type: "scale",
    nextQuestionId: "interests",
    validation: { required: true }
  },
  {
    id: "business_experience",
    text: "Have you previously started or managed a business?",
    type: "yes-no",
    nextQuestionId: "interests",
    validation: { required: true }
  },
  {
    id: "interests",
    text: "What type of business interests you the most?",
    type: "choice",
    options: [
      "Software / Apps",
      "E-commerce",
      "Consulting / Services",
      "Content Creation",
      "Physical Products"
    ],
    nextQuestionId: "commitment",
    validation: { required: true }
  },
  {
    id: "commitment",
    text: "How much time can you commit to your startup?",
    type: "choice",
    options: [
      "Full-time",
      "Part-time (20+ hours/week)",
      "Side project (10-20 hours/week)",
      "Minimal time (5-10 hours/week)"
    ],
    nextQuestionId: "resources",
    validation: { required: true }
  },
  {
    id: "resources",
    text: "What resources do you currently have available?",
    type: "multiple",
    options: [
      "Savings / Capital to invest",
      "Technical skills",
      "Industry connections",
      "Marketing expertise",
      "Just getting started"
    ],
    validation: { required: true }
  }
]

export const getNextQuestionId = (currentQuestion: Question, answer: any): string | null => {
  if (!currentQuestion.nextQuestionId) return null;
  
  if (typeof currentQuestion.nextQuestionId === 'string') {
    return currentQuestion.nextQuestionId;
  }
  
  return currentQuestion.nextQuestionId[answer] || currentQuestion.nextQuestionId['default'];
};

export const calculateProgress = (answers: { [key: string]: any }): number => {
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
};
