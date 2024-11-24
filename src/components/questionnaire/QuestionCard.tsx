'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Alert } from '../ui/alert';
import { Question, QuestionnaireProgress, questions } from '../../lib/questionnaire/questions';
import { TypingIndicator } from './typing-indicator';
import { SectionIndicator } from './section-indicator';
import { flowManager } from '../../lib/questionnaire/flow-manager';

export interface QuestionCardProps {
  question: Question;
  onSubmit: (answer: any, nextQuestionId: string | null) => void;
  currentProgress: QuestionnaireProgress;
  onModifyPrevious: () => void;
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

export default function QuestionCard({ question, onSubmit, currentProgress, onModifyPrevious }: QuestionCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<any>(() => {
    return currentProgress.answers[question.id] || '';
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [showModifyTooltip, setShowModifyTooltip] = useState(false);
  const [autoSaveIndicator, setAutoSaveIndicator] = useState<string | null>(null);
  const [lastCheckpoint, setLastCheckpoint] = useState<string | null>(null);

  // Calculate section information
  const currentSectionIndex = questions.findIndex(q => q.section === question.section);
  const uniqueSections = [...new Set(questions.map(q => q.section))];
  const totalSections = uniqueSections.length;

  // Auto-save functionality using FlowManager
  const autoSave = useCallback(() => {
    try {
      const updatedProgress = {
        ...currentProgress,
        answers: {
          ...currentProgress.answers,
          [question.id]: answer
        }
      };

      flowManager.autoSave(updatedProgress);
      setAutoSaveIndicator('Progress auto-saved');
      setTimeout(() => setAutoSaveIndicator(null), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setAutoSaveIndicator('Auto-save failed');
    }
  }, [currentProgress, question.id, answer]);

  useEffect(() => {
    const autoSaveTimer = setInterval(autoSave, flowManager.getAutoSaveInterval());
    return () => clearInterval(autoSaveTimer);
  }, [autoSave]);

  useEffect(() => {
    // Load saved answer for current question
    const savedAnswer = currentProgress.answers[question.id];
    if (savedAnswer) {
      setAnswer(savedAnswer);
      setIsModifying(true);
    } else {
      setAnswer(''); // Reset answer when moving to a new question
      setIsModifying(false);
    }

    // Enhanced typing indicator
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 800);

    // Load last checkpoint
    const checkpoint = flowManager.getLastCheckpoint();
    setLastCheckpoint(checkpoint?.questionId || null);

    return () => clearTimeout(timer);
  }, [question.id, currentProgress]);

  const validateAnswer = (answer: any) => {
    const schema = createAnswerSchema(question);
    const result = schema.safeParse({ answer });
    
    if (!result.success) {
      const firstError = result.error.errors[0];
      throw new Error(firstError.message);
    }
    
    return result.data.answer;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const validatedAnswer = validateAnswer(answer);
      
      // Use FlowManager to determine next question
      const nextQuestionId = flowManager.getNextQuestion(question.id, {
        ...currentProgress.answers,
        [question.id]: validatedAnswer
      });

      // Save progress before submitting
      await autoSave();
      
      // Create checkpoint if needed
      if (question.checkpoint) {
        flowManager.createCheckpoint({
          ...currentProgress,
          currentQuestionId: question.id,
          answers: {
            ...currentProgress.answers,
            [question.id]: validatedAnswer
          }
        });
      }
      
      onSubmit(validatedAnswer, nextQuestionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid answer');
    }
  };

  const handleRestoreCheckpoint = () => {
    if (lastCheckpoint) {
      const restoredProgress = flowManager.restoreCheckpoint(lastCheckpoint);
      if (restoredProgress) {
        // Update the form with restored data
        setAnswer(restoredProgress.answers[question.id] || '');
        setIsModifying(true);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Indicator */}
      <SectionIndicator
        currentSection={question.section}
        totalSections={totalSections}
        currentSectionIndex={currentSectionIndex}
      />

      {/* Auto-save Indicator */}
      {autoSaveIndicator && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
          {autoSaveIndicator}
        </div>
      )}

      <form onSubmit={handleSubmit} className={`space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto ${isModifying ? 'border-2 border-blue-200' : ''}`}>
        <div className="space-y-4">
          {/* Typing Indicator */}
          <TypingIndicator isVisible={isTyping} />

          {!isTyping && (
            <>
              <h3 className="text-xl font-semibold text-gray-900">{question.text}</h3>
              {isModifying && (
                <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded-md">
                  Modifying previous answer
                </div>
              )}
            </>
          )}

          {error && (
            <Alert variant="destructive">
              <p className="text-sm">{error}</p>
            </Alert>
          )}

          {/* Checkpoint Indicator */}
          {question.checkpoint && (
            <div className="flex items-center justify-between text-sm bg-green-50 p-3 rounded-md">
              <div className="flex items-center space-x-2 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Checkpoint question - progress will be saved</span>
              </div>
              {lastCheckpoint && (
                <button
                  type="button"
                  onClick={handleRestoreCheckpoint}
                  className="text-blue-600 hover:text-blue-700 focus:outline-none"
                >
                  Restore Last Checkpoint
                </button>
              )}
            </div>
          )}

          {/* Question Input Section */}
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

        {/* Navigation and Progress Section */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div 
              className="relative"
              onMouseEnter={() => setShowModifyTooltip(true)}
              onMouseLeave={() => setShowModifyTooltip(false)}
            >
              <button
                type="button"
                onClick={onModifyPrevious}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Modify Previous</span>
              </button>
              {showModifyTooltip && (
                <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap">
                  Click to modify previous answers
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Question {Object.keys(currentProgress.answers).length + 1} of {questions.filter(q => !q.skipIf || !q.skipIf(currentProgress.answers)).length}
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {isModifying ? 'Update Answer' : 'Next Question'}
          </button>
        </div>
      </form>
    </div>
  );
}
