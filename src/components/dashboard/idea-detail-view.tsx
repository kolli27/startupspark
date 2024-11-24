'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BusinessIdea } from '@/lib/ai/types';

interface IdeaDetailViewProps {
  idea: BusinessIdea;
  onClose: () => void;
  onShare?: () => void;
  className?: string;
}

export function IdeaDetailView({ idea, onClose, onShare, className = '' }: IdeaDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'execution'>('overview');
  const [isSharing, setIsSharing] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'market', label: 'Market Analysis' },
    { id: 'execution', label: 'Execution Plan' }
  ] as const;

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (onShare) {
        await onShare();
      } else {
        await navigator.share({
          title: idea.name,
          text: idea.description,
          url: window.location.href
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}
    >
      <div className="relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900"
            >
              {idea.name}
            </motion.h2>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                disabled={isSharing}
                className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
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
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium focus:outline-none
                  ${activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Description</h3>
                  <p className="mt-1 text-gray-600">{idea.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Required Skills</h3>
                  <p className="mt-1 text-gray-600">{idea.skills}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Initial Investment</h3>
                  <p className="mt-1 text-gray-600">{idea.investment}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'market' && (
              <motion.div
                key="market"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Target Market</h3>
                  <p className="mt-1 text-gray-600">{idea.targetMarket}</p>
                </div>
                {idea.marketSize && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Market Size</h3>
                    <p className="mt-1 text-gray-600">{idea.marketSize}</p>
                  </div>
                )}
                {idea.competitiveAdvantage && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Competitive Advantage</h3>
                    <p className="mt-1 text-gray-600">{idea.competitiveAdvantage}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Market Validation</h3>
                  <p className="mt-1 text-gray-600">{idea.validation}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'execution' && (
              <motion.div
                key="execution"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">First Steps</h3>
                  <p className="mt-1 text-gray-600">{idea.steps}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Success Metrics</h3>
                  <p className="mt-1 text-gray-600">{idea.metrics}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Potential Challenges</h3>
                  <p className="mt-1 text-gray-600">{idea.challenges}</p>
                </div>
                {idea.timeToMarket && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Time to Market</h3>
                    <p className="mt-1 text-gray-600">{idea.timeToMarket}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
