'use client';

import React from 'react';
import { useSubscription } from '@/lib/hooks/useSubscription';
import { SUBSCRIPTION_TIERS, USAGE_LIMITS, SubscriptionTier } from '@/lib/stripe/config';

type UsageMetric = keyof typeof USAGE_LIMITS[keyof typeof USAGE_LIMITS];

interface PremiumFeatureIndicatorProps {
  feature: UsageMetric;
  currentUsage: number;
  userId: string;
  className?: string;
  showUpgradeButton?: boolean;
}

export function PremiumFeatureIndicator({
  feature,
  currentUsage,
  userId,
  className = '',
  showUpgradeButton = true
}: PremiumFeatureIndicatorProps) {
  const { subscription, isLoading } = useSubscription(userId);
  const tier = subscription?.tier || SUBSCRIPTION_TIERS.basic;
  const limit = USAGE_LIMITS[tier][feature];
  const isUnlimited = limit === -1;
  const usagePercentage = isUnlimited ? 0 : (currentUsage / limit) * 100;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = usagePercentage >= 100;

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const getStatusColor = () => {
    if (isUnlimited) return 'bg-green-100 text-green-800';
    if (isAtLimit) return 'bg-red-100 text-red-800';
    if (isNearLimit) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const formatFeatureName = (feature: string) => {
    return feature
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <div className={`rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {formatFeatureName(feature)}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {isUnlimited ? 'Unlimited' : `${currentUsage}/${limit}`}
        </span>
      </div>

      {!isUnlimited && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>
      )}

      {(isNearLimit || isAtLimit) && showUpgradeButton && tier !== SUBSCRIPTION_TIERS.enterprise && (
        <div className="mt-3">
          {isAtLimit ? (
            <div className="text-red-800 text-sm mb-2">
              You've reached your {formatFeatureName(feature)} limit
            </div>
          ) : (
            <div className="text-yellow-800 text-sm mb-2">
              You're approaching your {formatFeatureName(feature)} limit
            </div>
          )}
          <a
            href="/pricing"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upgrade Now
            <svg
              className="ml-1.5 -mr-0.5 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      )}

      {tier === SUBSCRIPTION_TIERS.enterprise && (
        <div className="mt-2 text-sm text-gray-600">
          Enterprise plan includes unlimited {formatFeatureName(feature).toLowerCase()}
        </div>
      )}
    </div>
  );
}

interface PremiumFeatureBadgeProps {
  tier: SubscriptionTier;
  className?: string;
}

export function PremiumFeatureBadge({ tier, className = '' }: PremiumFeatureBadgeProps) {
  const getBadgeStyle = () => {
    switch (tier) {
      case SUBSCRIPTION_TIERS.enterprise:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case SUBSCRIPTION_TIERS.pro:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()} ${className}`}>
      {tier === SUBSCRIPTION_TIERS.enterprise && (
        <svg className="mr-1.5 h-2 w-2 text-purple-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
      )}
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </span>
  );
}

interface UpgradePromptProps {
  feature: string;
  targetTier: SubscriptionTier;
  className?: string;
}

export function UpgradePrompt({ feature, targetTier, className = '' }: UpgradePromptProps) {
  return (
    <div className={`rounded-lg border border-yellow-200 bg-yellow-50 p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Upgrade to access {feature}
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              This feature is available in the {targetTier.charAt(0).toUpperCase() + targetTier.slice(1)} plan and above.
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <a
                href="/pricing"
                className="px-3 py-1.5 bg-yellow-800 text-white text-sm font-medium rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
              >
                View Plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
