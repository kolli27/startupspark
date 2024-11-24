'use client';

import React, { useState } from 'react';
import { BusinessIdea } from '@/lib/ai/types';
import { IdeaDetailView } from './idea-detail-view';

interface IdeaGridProps {
  userId: string;
  ideas: BusinessIdea[];
  limit?: number;
  onShare?: (idea: BusinessIdea) => Promise<void>;
}

export function IdeaGrid({ userId, ideas, limit = 10, onShare }: IdeaGridProps) {
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const displayedIdeas = ideas.slice(0, limit);

  const handleShare = async (idea: BusinessIdea) => {
    if (onShare) {
      await onShare(idea);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedIdeas.map((idea) => (
          <div
            key={idea.name}
            className={`
              relative group bg-white rounded-lg shadow-sm overflow-hidden
              transform transition-all duration-200 ease-in-out
              hover:shadow-lg hover:-translate-y-1
              ${hoveredId === idea.name ? 'ring-2 ring-indigo-500' : ''}
            `}
            onMouseEnter={() => setHoveredId(idea.name)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {idea.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(idea);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                {idea.description}
              </p>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {idea.investment}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {idea.targetMarket.split(' ')[0]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIdea(idea)}
                className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                View Details
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-white via-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {ideas.length === 0 && (
        <div className="text-center py-12">
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
              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M24 38c8.837 0 16-3.582 16-8V14M24 6c-8.837 0-16 3.582-16 8s7.163 8 16 8c8.837 0 16-3.582 16-8s-7.163-8-16-8z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No ideas yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by generating your first business idea.
          </p>
          <div className="mt-6">
            <a
              href="/questionnaire"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Ideas
              <svg
                className="ml-2 -mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Idea Detail Modal */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setSelectedIdea(null)}
            />
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <IdeaDetailView
                idea={selectedIdea}
                onClose={() => setSelectedIdea(null)}
                onShare={() => handleShare(selectedIdea)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
