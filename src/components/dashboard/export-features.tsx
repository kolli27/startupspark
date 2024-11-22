'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

interface ExportData {
  savedRecommendations: any[];
  questionnaireResponses: any[];
}

export function ExportFeatures() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const supabase = createClientComponentClient();

  const fetchUserData = async (): Promise<ExportData> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: recommendations } = await supabase
      .from('saved_recommendations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const { data: responses } = await supabase
      .from('questionnaire_responses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return {
      savedRecommendations: recommendations || [],
      questionnaireResponses: responses || [],
    };
  };

  const exportToJSON = async () => {
    try {
      setLoading(true);
      const data = await fetchUserData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'startupspark-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Data exported successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data' });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      setLoading(true);
      const data = await fetchUserData();
      
      // Convert recommendations to CSV
      const recommendationsCSV = [
        ['Type', 'Content', 'Notes', 'Favorite', 'Created At'],
        ...data.savedRecommendations.map(rec => [
          rec.recommendation_type,
          rec.content,
          rec.notes || '',
          rec.is_favorite ? 'Yes' : 'No',
          new Date(rec.created_at).toLocaleDateString()
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      // Convert responses to CSV
      const responsesCSV = [
        ['Experience', 'Interests', 'Commitment', 'Resources', 'Created At'],
        ...data.questionnaireResponses.map(resp => [
          resp.experience,
          resp.interests,
          resp.commitment,
          resp.resources,
          new Date(resp.created_at).toLocaleDateString()
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      // Create and download recommendations CSV
      const recommendationsBlob = new Blob([recommendationsCSV], { type: 'text/csv' });
      const recommendationsUrl = URL.createObjectURL(recommendationsBlob);
      const recommendationsLink = document.createElement('a');
      recommendationsLink.href = recommendationsUrl;
      recommendationsLink.download = 'startupspark-recommendations.csv';
      document.body.appendChild(recommendationsLink);
      recommendationsLink.click();
      document.body.removeChild(recommendationsLink);
      URL.revokeObjectURL(recommendationsUrl);

      // Create and download responses CSV
      const responsesBlob = new Blob([responsesCSV], { type: 'text/csv' });
      const responsesUrl = URL.createObjectURL(responsesBlob);
      const responsesLink = document.createElement('a');
      responsesLink.href = responsesUrl;
      responsesLink.download = 'startupspark-responses.csv';
      document.body.appendChild(responsesLink);
      responsesLink.click();
      document.body.removeChild(responsesLink);
      URL.revokeObjectURL(responsesUrl);

      setMessage({ type: 'success', text: 'Data exported successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Export Your Data</h2>

      {message && (
        <Alert
          variant={message.type === 'success' ? 'default' : 'destructive'}
          className="mb-4"
        >
          {message.text}
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Export Options</h3>
          <p className="text-sm text-gray-500 mb-4">
            Download your saved ideas and questionnaire responses in your preferred format.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={exportToJSON}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Exporting...' : 'Export as JSON'}
          </Button>

          <Button
            variant="outline"
            onClick={exportToCSV}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Exporting...' : 'Export as CSV'}
          </Button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Your export will include:</p>
          <ul className="list-disc list-inside mt-2">
            <li>All saved business ideas and recommendations</li>
            <li>Your questionnaire responses</li>
            <li>Creation dates and notes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
