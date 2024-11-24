'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BusinessIdea } from '@/lib/ai/types';
import { useIdeaSharing } from '@/lib/hooks/useIdeaSharing';

interface SharedIdeaViewProps {
  idea: BusinessIdea;
  userId?: string;
  onSave?: () => Promise<void>;
  onClone?: () => Promise<void>;
  className?: string;
}

export function SharedIdeaView({
  idea,
  userId,
  onSave,
  onClone,
  className = ''
}: SharedIdeaViewProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const { shareIdea, isSharing, error } = useIdeaSharing(userId || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isCloning, setIsCloning] = useState(false);

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        { label: 'Description', value: idea.description },
        { label: 'Required Skills', value: idea.skills },
        { label: 'Initial Investment', value: idea.investment }
      ]
    },
    {
      id: 'market',
      title: 'Market Analysis',
      content: [
        { label: 'Target Market', value: idea.targetMarket },
        { label: 'Market Size', value: idea.marketSize },
        { label: 'Market Validation', value: idea.validation }
      ]
    },
    {
      id: 'execution',
      title: 'Execution Plan',
      content: [
        { label: 'First Steps', value: idea.steps },
        { label: 'Success Metrics', value: idea.metrics },
        { label: 'Challenges', value: idea.challenges }
      ]
    }
  ];

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  const handleClone = async () => {
    if (!onClone) return;
    setIsCloning(true);
    try {
      await onClone();
    } finally {
      setIsCloning(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="relative">
        <div className="px-6 py-16 sm:px-12 sm:py-24 lg:px-16 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {idea.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto"
            >
              {idea.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${activeSection === section.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Active Section Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {sections
            .find((s) => s.id === activeSection)
            ?.content.map((item) => (
              <div
                key={item.label}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {onSave && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSaving ? 'Saving...' : 'Save Idea'}
            </motion.button>
          )}

          {onClone && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClone}
              disabled={isCloning}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isCloning ? 'Cloning...' : 'Clone Idea'}
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => shareIdea(idea)}
            disabled={isSharing}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSharing ? 'Sharing...' : 'Share'}
            <svg
              className="ml-2 -mr-1 h-5 w-5 text-gray-400"
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
          </motion.button>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}
