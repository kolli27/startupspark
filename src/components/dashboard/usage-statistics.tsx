'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { usageService } from '@/lib/usage/service';

interface UsageStats {
  savedIdeasCount: number;
  questionnaireResponses: number;
  subscriptionTier: string;
  subscriptionStatus: string;
  periodEnd?: string;
  featureUsage: {
    idea_generations: number;
    market_insights: number;
    follow_up_questions: number;
  };
}

const FEATURE_LIMITS = {
  free: {
    idea_generations: 3,
    market_insights: 0,
    follow_up_questions: 0
  },
  premium: {
    idea_generations: -1, // Unlimited
    market_insights: -1,
    follow_up_questions: -1
  }
};

export function UsageStatistics() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch user profile data
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('subscription_tier, subscription_status, subscription_period_end')
          .eq('user_id', user.id)
          .single();

        // Fetch saved recommendations count
        const { count: savedCount } = await supabase
          .from('saved_recommendations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Fetch questionnaire responses count
        const { count: responseCount } = await supabase
          .from('questionnaire_responses')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Fetch feature usage
        const featureUsage = await usageService.getCurrentUsage(user.id);

        setStats({
          savedIdeasCount: savedCount || 0,
          questionnaireResponses: responseCount || 0,
          subscriptionTier: profile?.subscription_tier || 'free',
          subscriptionStatus: profile?.subscription_status || 'inactive',
          periodEnd: profile?.subscription_period_end,
          featureUsage
        });
      } catch (error) {
        console.error('Error fetching usage statistics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [supabase]);

  const getUsageDisplay = (feature: keyof typeof FEATURE_LIMITS.free, count: number) => {
    const limit = stats ? FEATURE_LIMITS[stats.subscriptionTier as keyof typeof FEATURE_LIMITS][feature] : 0;
    if (limit === -1) return `${count} (Unlimited)`;
    return `${count} / ${limit}`;
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Usage Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Subscription Plan</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900 capitalize">
              {stats?.subscriptionTier}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1 text-lg font-medium capitalize">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                ${stats?.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {stats?.subscriptionStatus}
              </span>
            </p>
          </div>

          {stats?.periodEnd && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Next Billing Date</h3>
              <p className="mt-1 text-lg font-medium">
                {new Date(stats.periodEnd).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Feature Usage This Period</h3>
            <div className="mt-2 space-y-2">
              <div>
                <p className="text-sm text-gray-600">Business Ideas Generated</p>
                <p className="text-lg font-semibold">
                  {getUsageDisplay('idea_generations', stats?.featureUsage.idea_generations || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Market Insights Used</p>
                <p className="text-lg font-semibold">
                  {getUsageDisplay('market_insights', stats?.featureUsage.market_insights || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Follow-up Questions Asked</p>
                <p className="text-lg font-semibold">
                  {getUsageDisplay('follow_up_questions', stats?.featureUsage.follow_up_questions || 0)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Saved Items</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {stats?.savedIdeasCount}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Questionnaire Responses</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {stats?.questionnaireResponses}
            </p>
          </div>
        </div>
      </div>

      {stats?.subscriptionTier === 'free' && (
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Upgrade to Premium</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get unlimited ideas and advanced features
              </p>
            </div>
            <Button
              onClick={() => window.location.href = '/pricing'}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
