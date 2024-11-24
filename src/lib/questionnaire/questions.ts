export interface Question {
  id: string;
  text: string;
  section: string;
  type: 'text' | 'choice' | 'multiple' | 'scale' | 'like-dislike' | 'yes-no';
  options?: string[];
  nextQuestionId?: string | { [key: string]: string } | ((answer: any) => string | null); // Enhanced branching logic
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  checkpoint?: boolean; // For progress saving
  skipIf?: (answers: { [key: string]: any }) => boolean; // Skip logic
}

export interface QuestionnaireProgress {
  currentQuestionId: string;
  answers: { [key: string]: any };
  completed: boolean;
  lastCheckpoint?: string;
  lastSaved?: number; // Timestamp for auto-save
}

export const questions: Question[] = [
  // Personal Background Section
  {
    id: "early_experiences",
    section: "Personal Background",
    text: "What early experiences have shaped your entrepreneurial interests?",
    type: "text",
    validation: { required: true, minLength: 50 },
    nextQuestionId: "education",
    checkpoint: true
  },
  {
    id: "education",
    section: "Personal Background",
    text: "What is your educational background?",
    type: "multiple",
    options: [
      "High School",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD",
      "Self-taught",
      "Professional Certifications",
      "Other"
    ],
    nextQuestionId: (answer: string[]) => {
      // Skip career aspirations for highly educated individuals
      if (answer.includes("PhD") || answer.includes("Master's Degree")) {
        return "industry_experience";
      }
      return "career_aspirations";
    },
    validation: { required: true }
  },
  {
    id: "career_aspirations",
    section: "Personal Background",
    text: "What are your long-term career aspirations?",
    type: "text",
    validation: { required: true },
    nextQuestionId: "industry_experience",
    checkpoint: true,
    skipIf: (answers) => {
      const education = answers["education"] || [];
      return education.includes("PhD") || education.includes("Master's Degree");
    }
  },

  // Market Analysis Section
  {
    id: "industry_experience",
    section: "Market Analysis",
    text: "What industries do you have experience in or knowledge about?",
    type: "multiple",
    options: [
      "Technology",
      "Healthcare",
      "Finance",
      "Education",
      "Retail",
      "Manufacturing",
      "Services",
      "Other"
    ],
    nextQuestionId: (answer: string[]) => {
      // Skip competition awareness for those with diverse experience
      if (answer.length >= 3) {
        return "market_size";
      }
      return "competition_awareness";
    },
    validation: { required: true }
  },
  {
    id: "competition_awareness",
    section: "Market Analysis",
    text: "How would you rate your understanding of market competition?",
    type: "scale",
    nextQuestionId: "market_size",
    validation: { required: true },
    skipIf: (answers) => {
      const industries = answers["industry_experience"] || [];
      return industries.length >= 3;
    }
  },
  {
    id: "market_size",
    section: "Market Analysis",
    text: "What market size are you targeting for your business?",
    type: "choice",
    options: [
      "Local/Regional",
      "National",
      "International",
      "Global",
      "Niche Market",
      "Not Sure Yet"
    ],
    nextQuestionId: (answer: string) => {
      // Additional questions for global aspirations
      if (answer === "Global" || answer === "International") {
        return "international_experience";
      }
      return "work_style";
    },
    checkpoint: true
  },
  {
    id: "international_experience",
    section: "Market Analysis",
    text: "Do you have experience working with international markets?",
    type: "yes-no",
    nextQuestionId: "work_style",
    skipIf: (answers) => {
      const marketSize = answers["market_size"];
      return marketSize !== "Global" && marketSize !== "International";
    }
  },

  // Business Operations Section
  {
    id: "work_style",
    section: "Business Operations",
    text: "What's your preferred work style?",
    type: "choice",
    options: [
      "Independent Worker",
      "Team Leader",
      "Collaborative",
      "Hybrid Approach"
    ],
    nextQuestionId: (answer: string) => {
      // Skip management questions for independent workers
      if (answer === "Independent Worker") {
        return "investment_capacity";
      }
      return "management_approach";
    }
  },
  {
    id: "management_approach",
    section: "Business Operations",
    text: "What management approach resonates with you?",
    type: "choice",
    options: [
      "Hands-on Leadership",
      "Delegative Management",
      "Democratic Decision-making",
      "Results-oriented Management"
    ],
    nextQuestionId: "team_building",
    skipIf: (answers) => answers["work_style"] === "Independent Worker"
  },
  {
    id: "team_building",
    section: "Business Operations",
    text: "How do you plan to build your team?",
    type: "multiple",
    options: [
      "Hire Full-time Employees",
      "Work with Contractors",
      "Build Remote Team",
      "Start Solo",
      "Partner with Others"
    ],
    nextQuestionId: "investment_capacity",
    checkpoint: true,
    skipIf: (answers) => answers["work_style"] === "Independent Worker"
  },

  // Financial Planning Section
  {
    id: "investment_capacity",
    section: "Financial Planning",
    text: "What is your initial investment capacity?",
    type: "choice",
    options: [
      "Bootstrap (< $5,000)",
      "Small Investment ($5,000 - $25,000)",
      "Medium Investment ($25,000 - $100,000)",
      "Large Investment (> $100,000)",
      "Seeking External Funding"
    ],
    nextQuestionId: (answer: string) => {
      // Additional funding questions for larger investments
      if (answer === "Large Investment (> $100,000)" || answer === "Seeking External Funding") {
        return "funding_timeline";
      }
      return "revenue_expectations";
    }
  },
  {
    id: "funding_timeline",
    section: "Financial Planning",
    text: "What is your expected timeline for securing funding?",
    type: "choice",
    options: [
      "Immediate",
      "3-6 months",
      "6-12 months",
      "More than 12 months"
    ],
    nextQuestionId: "revenue_expectations",
    skipIf: (answers) => {
      const investment = answers["investment_capacity"];
      return investment !== "Large Investment (> $100,000)" && investment !== "Seeking External Funding";
    }
  },
  {
    id: "revenue_expectations",
    section: "Financial Planning",
    text: "What are your first-year revenue expectations?",
    type: "choice",
    options: [
      "< $50,000",
      "$50,000 - $100,000",
      "$100,000 - $500,000",
      "> $500,000",
      "Not Sure Yet"
    ],
    nextQuestionId: "risk_tolerance",
    checkpoint: true
  },
  {
    id: "risk_tolerance",
    section: "Financial Planning",
    text: "How would you describe your risk tolerance?",
    type: "scale",
    nextQuestionId: "digital_literacy",
    checkpoint: true
  },

  // Technical Capabilities Section
  {
    id: "digital_literacy",
    section: "Technical Capabilities",
    text: "Rate your comfort level with digital technologies:",
    type: "scale",
    nextQuestionId: (answer: number) => {
      // Skip basic tech questions for highly tech-savvy users
      if (answer >= 4) {
        return "advanced_tech_skills";
      }
      return "tech_skills";
    }
  },
  {
    id: "tech_skills",
    section: "Technical Capabilities",
    text: "What technical skills do you possess?",
    type: "multiple",
    options: [
      "Programming/Development",
      "Digital Marketing",
      "Data Analysis",
      "Design/UX",
      "Project Management",
      "None Yet"
    ],
    nextQuestionId: "software_proficiency",
    skipIf: (answers) => (answers["digital_literacy"] || 0) >= 4
  },
  {
    id: "advanced_tech_skills",
    section: "Technical Capabilities",
    text: "Which advanced technical areas are you proficient in?",
    type: "multiple",
    options: [
      "Cloud Architecture",
      "AI/Machine Learning",
      "Blockchain",
      "DevOps",
      "Cybersecurity",
      "System Design"
    ],
    nextQuestionId: "software_proficiency",
    skipIf: (answers) => (answers["digital_literacy"] || 0) < 4
  },
  {
    id: "software_proficiency",
    section: "Technical Capabilities",
    text: "Which business software are you proficient in?",
    type: "multiple",
    options: [
      "Office Suite",
      "Accounting Software",
      "CRM Systems",
      "Design Tools",
      "Project Management Tools",
      "Development Tools",
      "None Yet"
    ],
    checkpoint: true
  }
];

export const getNextQuestionId = (currentQuestion: Question, answer: any): string | null => {
  if (!currentQuestion.nextQuestionId) return null;
  
  if (typeof currentQuestion.nextQuestionId === 'function') {
    return currentQuestion.nextQuestionId(answer);
  }
  
  if (typeof currentQuestion.nextQuestionId === 'string') {
    return currentQuestion.nextQuestionId;
  }
  
  return currentQuestion.nextQuestionId[answer] || currentQuestion.nextQuestionId['default'];
};

export const shouldSkipQuestion = (question: Question, answers: { [key: string]: any }): boolean => {
  return question.skipIf ? question.skipIf(answers) : false;
};

export const calculateProgress = (answers: { [key: string]: any }): number => {
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = questions.filter(q => !shouldSkipQuestion(q, answers)).length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
};

export const getCurrentSection = (questionId: string): string => {
  const question = questions.find(q => q.id === questionId);
  return question?.section || '';
};

export const getSectionProgress = (answers: { [key: string]: any }): { [key: string]: number } => {
  const sections = [...new Set(questions.map(q => q.section))];
  const progress: { [key: string]: number } = {};
  
  sections.forEach(section => {
    const sectionQuestions = questions.filter(q => q.section === section && !shouldSkipQuestion(q, answers));
    const answeredQuestions = sectionQuestions.filter(q => answers[q.id]);
    progress[section] = Math.round((answeredQuestions.length / sectionQuestions.length) * 100);
  });
  
  return progress;
};

export const getLastCheckpoint = (answers: { [key: string]: any }): string | null => {
  const answeredQuestions = questions.filter(q => answers[q.id] && !shouldSkipQuestion(q, answers));
  const lastCheckpoint = [...answeredQuestions].reverse().find(q => q.checkpoint);
  return lastCheckpoint?.id || null;
};

export const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
