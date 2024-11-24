'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BusinessIdea } from '@/lib/ai/types';
import { SharedIdeaView } from '@/components/dashboard/shared-idea-view';

export default function SharedIdeaPage() {
  const params = useParams();
  const [idea, setIdea] = useState<BusinessIdea | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSharedIdea = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, you would decode the ID and fetch from your backend
        const decodedData = JSON.parse(atob(params.id as string));
        
        // Placeholder: Fetch idea details from your API
        const response = await fetch(`/api/shared-ideas/${decodedData.ideaId}`);
        if (!response.ok) {
          throw new Error('Failed to load shared idea');
        }
        
        const data = await response.json();
        setIdea(data);
      } catch (err) {
        console.error('Error loading shared idea:', err);
        setError('This shared idea link is invalid or has expired');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchSharedIdea();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="rounded-lg bg-white p-8 shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">
              Shared Idea Not Found
            </h2>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!idea) {
    return null;
  }

  const handleSave = async () => {
    // Implement save functionality
    console.log('Saving idea:', idea);
  };

  const handleClone = async () => {
    // Implement clone functionality
    console.log('Cloning idea:', idea);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedIdeaView
        idea={idea}
        onSave={handleSave}
        onClone={handleClone}
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      />
    </div>
  );
}
