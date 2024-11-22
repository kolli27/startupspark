'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/questionnaire/QuestionCard';
import { questions, QuestionnaireProgress } from '@/lib/questionnaire/questions';

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentProgress, setCurrentProgress] = useState<QuestionnaireProgress>(() => {
    // Try to load saved progress from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('questionnaireProgress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved progress:', e);
        }
      }
    }
    
    // Default initial state
    return {
      currentQuestionId: questions[0].id,
      answers: {},
      completed: false
    };
  });

  const currentQuestion = questions.find(q => q.id === currentProgress.currentQuestionId);

  const handleSubmit = async (answer: any, nextQuestionId: string | null) => {
    const newAnswers = {
      ...currentProgress.answers,
      [currentQuestion!.id]: answer
    };

    if (nextQuestionId) {
      // Move to next question
      setCurrentProgress({
        currentQuestionId: nextQuestionId,
        answers: newAnswers,
        completed: false
      });
    } else {
      // Questionnaire completed
      const finalProgress = {
        currentQuestionId: currentQuestion!.id,
        answers: newAnswers,
        completed: true
      };
      
      setCurrentProgress(finalProgress);
      localStorage.setItem('questionnaireProgress', JSON.stringify(finalProgress));
      
      // Navigate to results page
      router.push('/questionnaire/results');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>Question not found. Please try restarting the questionnaire.</p>
          <button
            onClick={() => {
              localStorage.removeItem('questionnaireProgress');
              setCurrentProgress({
                currentQuestionId: questions[0].id,
                answers: {},
                completed: false
              });
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Restart Questionnaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <QuestionCard
          question={currentQuestion}
          onSubmit={handleSubmit}
          currentProgress={currentProgress}
        />
      </div>
    </div>
  );
}
