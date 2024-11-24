import { useState, useEffect } from 'react';
import { stripeService } from '@/lib/stripe/service';
import { SubscriptionTier, SUBSCRIPTION_TIERS } from '@/lib/stripe/config';

export interface SubscriptionDetails {
  id: string;
  tier: SubscriptionTier;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  usage?: {
    ideaGenerations: number;
    savedIdeas: number;
    aiQueries: number;
  };
}

export interface UseSubscriptionReturn {
  subscription: SubscriptionDetails | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSubscription(userId?: string): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    if (!userId) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const details = await stripeService.getSubscriptionDetails(userId);
      if (details) {
        setSubscription({
          id: details.id,
          tier: details.tier,
          status: details.status,
          current_period_end: details.current_period_end,
          cancel_at_period_end: details.cancel_at_period_end || false,
          usage: details.usage
        });
      } else {
        setSubscription(null);
      }
    } catch (err) {
      setError('Failed to load subscription details');
      console.error('Error fetching subscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [userId]);

  return {
    subscription,
    isLoading,
    error,
    refetch: fetchSubscription
  };
}
