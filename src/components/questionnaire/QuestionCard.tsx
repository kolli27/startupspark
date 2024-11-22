import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Alert } from '../ui/alert';
import { Question, QuestionnaireProgress, getNextQuestionId, calculateProgress } from '../../lib/questionnaire/questions';

export interface QuestionCardProps {
  question: Question;
  onSubmit: (answer: any, nextQuestionId: string | null) => void;
  currentProgress: QuestionnaireProgress;
}

const createAnswerSchema = (question: Question) => {
  let baseSchema: any;

  switch (question.type) {
    case 'text':
      baseSchema = z.string();
      if (question.validation?.minLength) {
        baseSchema = baseSchema.min(question.validation.minLength);
      }
      if (question.validation?.maxLength) {
        baseSchema = baseSchema.max(question.validation.maxLength);
      }
      if (question.validation?.pattern) {
        baseSchema = baseSchema.regex(new RegExp(question.validation.pattern));
      }
      break;
    case 'choice':
      baseSchema = z.string();
      break;
    case 'multiple':
      baseSchema = z.array(z.string());
      break;
    case 'scale':
      baseSchema = z.number().min(1).max(5);
      break;
    case 'yes-no':
    case 'like-dislike':
      baseSchema = z.boolean();
      break;
    default:
      baseSchema = z.any();
  }

  if (question.validation?.required) {
    baseSchema = baseSchema.refine((val: unknown) => {
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== null && val !== '';
    }, 'This field is required');
  }

  return z.object({ answer: baseSchema });
};

export default function QuestionCard({ question, onSubmit, currentProgress }: QuestionCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<any>(() => {
    return currentProgress.answers[question.id] || '';
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(calculateProgress(currentProgress.answers));
    
    // Load saved answer for current question
    const savedAnswer = currentProgress.answers[question.id];
    if (savedAnswer) {
      setAnswer(savedAnswer);
    }
  }, [question.id, currentProgress]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('questionnaireProgress', JSON.stringify(currentProgress));
  }, [currentProgress]);

  const validateAnswer = (answer: any) => {
    const schema = createAnswerSchema(question);
    const result = schema.safeParse({ answer });
    
    if (!result.success) {
      const firstError = result.error.errors[0];
      throw new Error(firstError.message);
    }
    
    return result.data.answer;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const validatedAnswer = validateAnswer(answer);
      const nextQuestionId = getNextQuestionId(question, validatedAnswer);
      onSubmit(validatedAnswer, nextQuestionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid answer');
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">{question.text}</h3>

          {error && (
            <Alert variant="destructive">
              <p className="text-sm">{error}</p>
            </Alert>
          )}

          <div className="mt-4">
            {question.type === 'text' && (
              <textarea
                value={answer as string}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Share your thoughts..."
              />
            )}

            {question.type === 'yes-no' && (
              <div className="flex space-x-4">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(option === 'Yes')}
                    className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
                      answer === (option === 'Yes')
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'like-dislike' && (
              <div className="flex space-x-4">
                {['Like', 'Dislike'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(option === 'Like')}
                    className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
                      answer === (option === 'Like')
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'scale' && (
              <div className="flex justify-between space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAnswer(value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      answer === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'choice' && question.options && (
              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(option)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      answer === option
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'multiple' && question.options && (
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 p-3 rounded-lg border-2 hover:border-blue-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={Array.isArray(answer) && answer.includes(option)}
                      onChange={(e) => {
                        const newAnswer = Array.isArray(answer) ? [...answer] : [];
                        if (e.target.checked) {
                          newAnswer.push(option);
                        } else {
                          const index = newAnswer.indexOf(option);
                          if (index > -1) {
                            newAnswer.splice(index, 1);
                          }
                        }
                        setAnswer(newAnswer);
                      }}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Question {Object.keys(currentProgress.answers).length + 1} of {6}
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Next Question
          </button>
        </div>
      </form>
    </div>
  );
}
