import { Question, QuestionType, QuestionnaireResponse, BusinessRecommendation, QuestionnaireResult, QuestionnaireSection } from '@/lib/types/questionnaire';

export const QUESTIONNAIRE_SECTIONS: QuestionnaireSection[] = [
  {
    title: 'Personal Interests and Passions',
    description: 'Let\'s discover what drives and excites you.',
    questions: [
      {
        id: '1',
        text: 'What activities or topics are you most passionate about?',
        type: 'text' as QuestionType,
        aiSuggestion: 'Think about activities that make you lose track of time.',
        followUpQuestion: 'What specifically excites you about these activities?'
      },
      {
        id: '2',
        text: 'Would you prefer your business to align with your personal passions?',
        type: 'yes-no' as QuestionType,
        aiSuggestion: 'Consider how combining passion with business could affect your motivation.'
      }
    ]
  },
  {
    title: 'Skills and Expertise',
    description: 'Understanding your capabilities helps identify suitable opportunities.',
    questions: [
      {
        id: '3',
        text: 'How would you rate your comfort level with technology?',
        type: 'scale' as QuestionType,
        aiSuggestion: '1 = Beginner, 5 = Expert. This helps us suggest suitable tech-based opportunities.'
      },
      {
        id: '4',
        text: 'Which skills would you like to leverage in your business?',
        type: 'multiple' as QuestionType,
        options: [
          'Technical/Programming',
          'Design/Creative',
          'Marketing/Sales',
          'Writing/Content Creation',
          'Teaching/Coaching',
          'Management/Leadership'
        ],
        homework: 'Consider taking online courses to strengthen your chosen skills.'
      }
    ]
  }
];

export const questionnaireService = {
  async submitQuestionnaire(
    userId: string,
    responses: QuestionnaireResponse[]
  ): Promise<QuestionnaireResult> {
    try {
      const result = await fetch('/api/questionnaire/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          answers: responses,
        }),
      });

      if (!result.ok) {
        throw new Error('Failed to submit questionnaire');
      }

      return result.json();
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      throw error;
    }
  },

  async generateRecommendations(
    responses: QuestionnaireResponse[]
  ): Promise<BusinessRecommendation[]> {
    try {
      const result = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses }),
      });

      if (!result.ok) {
        throw new Error('Failed to generate recommendations');
      }

      return result.json();
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  },

  async getLatestResponses(): Promise<QuestionnaireResponse[]> {
    try {
      const result = await fetch('/api/questionnaire/responses/latest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!result.ok) {
        throw new Error('Failed to fetch latest responses');
      }

      return result.json();
    } catch (error) {
      console.error('Error fetching latest responses:', error);
      throw error;
    }
  },

  getNextQuestion(currentQuestionId: string): Question | null {
    let foundCurrent = false;
    
    for (const section of QUESTIONNAIRE_SECTIONS) {
      for (const question of section.questions) {
        if (foundCurrent) {
          return question;
        }
        if (question.id === currentQuestionId) {
          foundCurrent = true;
        }
      }
    }
    
    return null;
  },

  calculateProgress(currentQuestionId: string): number {
    let totalQuestions = 0;
    let currentQuestionIndex = 0;

    QUESTIONNAIRE_SECTIONS.forEach((section: QuestionnaireSection) => {
      section.questions.forEach((question: Question) => {
        if (question.id === currentQuestionId) {
          currentQuestionIndex = totalQuestions;
        }
        totalQuestions++;
      });
    });

    return (currentQuestionIndex / totalQuestions) * 100;
  },

  getAllQuestions(): Question[] {
    return QUESTIONNAIRE_SECTIONS.flatMap(section => section.questions);
  },

  getCurrentSection(questionId: string): QuestionnaireSection | null {
    for (const section of QUESTIONNAIRE_SECTIONS) {
      if (section.questions.some((q: Question) => q.id === questionId)) {
        return section;
      }
    }
    return null;
  }
};
