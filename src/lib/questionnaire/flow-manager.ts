import { Question, QuestionnaireProgress, questions } from './questions';

interface BranchingRule {
  questionId: string;
  condition: (answers: { [key: string]: any }) => boolean;
  nextQuestionId: string;
}

interface Checkpoint {
  questionId: string;
  timestamp: number;
  answers: { [key: string]: any };
  progress: number;
}

export class QuestionnaireFlowManager {
  private static instance: QuestionnaireFlowManager;
  private branchingRules: BranchingRule[] = [];
  private checkpoints: Checkpoint[] = [];
  private autoSaveInterval: number = 30000; // 30 seconds
  private lastAutoSave: number = Date.now();

  private constructor() {
    // Initialize default branching rules
    this.initializeBranchingRules();
  }

  public static getInstance(): QuestionnaireFlowManager {
    if (!QuestionnaireFlowManager.instance) {
      QuestionnaireFlowManager.instance = new QuestionnaireFlowManager();
    }
    return QuestionnaireFlowManager.instance;
  }

  private initializeBranchingRules() {
    // Add sophisticated branching rules
    this.addBranchingRule({
      questionId: 'education',
      condition: (answers) => {
        const education = answers['education'] || [];
        return education.includes("PhD") || education.includes("Master's Degree");
      },
      nextQuestionId: 'industry_experience'
    });

    this.addBranchingRule({
      questionId: 'industry_experience',
      condition: (answers) => {
        const industries = answers['industry_experience'] || [];
        return industries.length >= 3;
      },
      nextQuestionId: 'market_size'
    });

    // Add more complex branching rules based on multiple answers
    this.addBranchingRule({
      questionId: 'market_size',
      condition: (answers) => {
        const marketSize = answers['market_size'];
        const education = answers['education'] || [];
        const hasHigherEducation = education.includes("PhD") || education.includes("Master's Degree");
        return (marketSize === "Global" || marketSize === "International") && hasHigherEducation;
      },
      nextQuestionId: 'international_experience'
    });
  }

  public addBranchingRule(rule: BranchingRule) {
    this.branchingRules.push(rule);
  }

  public getNextQuestion(currentQuestionId: string, answers: { [key: string]: any }): string | null {
    // Check custom branching rules first
    const matchingRule = this.branchingRules.find(rule => 
      rule.questionId === currentQuestionId && rule.condition(answers)
    );

    if (matchingRule) {
      return matchingRule.nextQuestionId;
    }

    // Fall back to default branching logic
    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    if (!currentQuestion) return null;

    if (typeof currentQuestion.nextQuestionId === 'function') {
      return currentQuestion.nextQuestionId(answers[currentQuestionId]);
    }

    if (typeof currentQuestion.nextQuestionId === 'string') {
      return currentQuestion.nextQuestionId;
    }

    return null;
  }

  public createCheckpoint(progress: QuestionnaireProgress): void {
    const currentQuestion = questions.find(q => q.id === progress.currentQuestionId);
    
    if (currentQuestion?.checkpoint) {
      this.checkpoints.push({
        questionId: progress.currentQuestionId,
        timestamp: Date.now(),
        answers: { ...progress.answers },
        progress: this.calculateProgress(progress.answers)
      });

      // Store checkpoint in localStorage
      this.saveCheckpointsToStorage();
    }
  }

  public restoreCheckpoint(checkpointId: string): QuestionnaireProgress | null {
    const checkpoint = this.checkpoints.find(cp => cp.questionId === checkpointId);
    
    if (checkpoint) {
      return {
        currentQuestionId: checkpoint.questionId,
        answers: { ...checkpoint.answers },
        completed: false,
        lastCheckpoint: checkpoint.questionId,
        lastSaved: checkpoint.timestamp
      };
    }

    return null;
  }

  public shouldAutoSave(lastSaved?: number): boolean {
    if (!lastSaved) return true;
    return Date.now() - lastSaved >= this.autoSaveInterval;
  }

  public autoSave(progress: QuestionnaireProgress): void {
    if (this.shouldAutoSave(progress.lastSaved)) {
      const updatedProgress = {
        ...progress,
        lastSaved: Date.now()
      };

      // Save to localStorage
      localStorage.setItem('questionnaireProgress', JSON.stringify(updatedProgress));
      this.lastAutoSave = Date.now();

      // Create checkpoint if current question is a checkpoint
      this.createCheckpoint(updatedProgress);
    }
  }

  public calculateProgress(answers: { [key: string]: any }): number {
    const answeredQuestions = Object.keys(answers).length;
    const totalQuestions = questions.length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }

  private saveCheckpointsToStorage(): void {
    localStorage.setItem('questionnaireCheckpoints', JSON.stringify(this.checkpoints));
  }

  public loadCheckpointsFromStorage(): void {
    const savedCheckpoints = localStorage.getItem('questionnaireCheckpoints');
    if (savedCheckpoints) {
      this.checkpoints = JSON.parse(savedCheckpoints);
    }
  }

  public getCheckpoints(): Checkpoint[] {
    return this.checkpoints;
  }

  public getLastCheckpoint(): Checkpoint | null {
    if (this.checkpoints.length === 0) return null;
    return this.checkpoints[this.checkpoints.length - 1];
  }

  public setAutoSaveInterval(interval: number): void {
    this.autoSaveInterval = interval;
  }

  public getAutoSaveInterval(): number {
    return this.autoSaveInterval;
  }
}

export const flowManager = QuestionnaireFlowManager.getInstance();
