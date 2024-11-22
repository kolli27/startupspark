'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { questionnaireService } from '@/lib/questionnaire/service';
import { BusinessRecommendation } from '@/lib/types/questionnaire';
import { Alert } from '@/components/ui/alert';

export default function QuestionnaireResults() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<BusinessRecommendation[]>([]);

  useEffect(() => {
    async function loadResults() {
      try {
        setLoading(true);
        const responses = await questionnaireService.getLatestResponses();
        const recommendations = await questionnaireService.generateRecommendations(responses);
        setRecommendations(recommendations);
      } catch (err) {
        console.error('Error loading results:', err);
        setError('Failed to load your recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Analyzing your responses...
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We're generating personalized business recommendations based on your answers.
          </p>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Alert variant="destructive">
          <p>{error}</p>
        </Alert>
        <button
          onClick={() => router.push('/questionnaire')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry Questionnaire
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Business Recommendations
        </h1>

        <div className="space-y-8">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="bg-white rounded-lg shadow-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {recommendation.title}
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {recommendation.matchScore}% Match
                </span>
              </div>

              <p className="text-gray-600">{recommendation.description}</p>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Why This Fits You</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recommendation.reasons.map((reason, index) => (
                    <li key={index} className="text-gray-600">{reason}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {recommendation.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Investment & Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Estimated Startup Cost</p>
                    <p className="text-gray-900">
                      {recommendation.estimatedStartupCost.currency}
                      {recommendation.estimatedStartupCost.min.toLocaleString()} - 
                      {recommendation.estimatedStartupCost.max.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Break-even</p>
                    <p className="text-gray-900">{recommendation.timeline.breakeven}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-1">
                  {recommendation.nextSteps.map((step, index) => (
                    <li key={index} className="text-gray-600">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save & Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
