import { createClient } from '@supabase/supabase-js'
import { USAGE_LIMITS, SubscriptionTier } from '@/lib/stripe/config'
import { stripeService } from '@/lib/stripe/service'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface UsageMetrics {
  ideaGenerations: number
  savedIdeas: number
  aiQueries: number
}

export const usageService = {
  async getUserUsage(userId: string): Promise<UsageMetrics> {
    const { data, error } = await supabase
      .from('usage_metrics')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching user usage:', error)
      return { ideaGenerations: 0, savedIdeas: 0, aiQueries: 0 }
    }

    return {
      ideaGenerations: data?.idea_generations || 0,
      savedIdeas: data?.saved_ideas || 0,
      aiQueries: data?.ai_queries || 0
    }
  },

  async resetUsage(userId: string): Promise<void> {
    const { error } = await supabase
      .from('usage_metrics')
      .upsert({
        user_id: userId,
        idea_generations: 0,
        saved_ideas: 0,
        ai_queries: 0,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error resetting user usage:', error)
      throw new Error('Failed to reset usage metrics')
    }
  },

  async incrementUsage(
    userId: string,
    metric: keyof UsageMetrics,
    subscriptionId?: string
  ): Promise<boolean> {
    // Get current subscription details
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('subscription_tier, subscription_status, usage_limits')
      .eq('user_id', userId)
      .single()

    if (!profile) {
      throw new Error('User profile not found')
    }

    const tier = profile.subscription_tier as SubscriptionTier
    const limits = USAGE_LIMITS[tier]

    // Get current usage
    const currentUsage = await this.getUserUsage(userId)
    const newValue = currentUsage[metric] + 1

    // Check if user has exceeded their limit
    if (limits[metric] !== -1 && newValue > limits[metric]) {
      return false
    }

    // Update usage in database
    const { error } = await supabase
      .from('usage_metrics')
      .upsert({
        user_id: userId,
        [metric]: newValue,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error updating usage metrics:', error)
      throw new Error('Failed to update usage metrics')
    }

    // Report usage to Stripe if subscription ID is provided
    if (subscriptionId) {
      try {
        await stripeService.reportUsage(subscriptionId, metric, newValue)
      } catch (error) {
        console.error('Error reporting usage to Stripe:', error)
        // Continue even if Stripe reporting fails
      }
    }

    // Check if usage is approaching limit and notify if needed
    if (limits[metric] !== -1) {
      const usagePercentage = (newValue / limits[metric]) * 100
      if (usagePercentage >= 80) {
        await this.notifyUsageLimit(userId, tier, metric, newValue, limits[metric])
      }
    }

    return true
  },

  async notifyUsageLimit(
    userId: string,
    tier: SubscriptionTier,
    metric: keyof UsageMetrics,
    currentUsage: number,
    limit: number
  ): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'usage_limit',
        title: 'Usage Limit Warning',
        message: `You've used ${currentUsage} out of ${limit} ${metric}. Consider upgrading your plan for unlimited usage.`,
        metadata: {
          tier,
          metric,
          currentUsage,
          limit
        },
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error creating usage notification:', error)
    }
  },

  async checkGracePeriod(userId: string): Promise<boolean> {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('payment_failure_grace_period_end, usage_overage_grace_period_end')
      .eq('user_id', userId)
      .single()

    if (!profile) {
      return false
    }

    const now = new Date()
    const paymentGracePeriodEnd = profile.payment_failure_grace_period_end
      ? new Date(profile.payment_failure_grace_period_end)
      : null
    const usageGracePeriodEnd = profile.usage_overage_grace_period_end
      ? new Date(profile.usage_overage_grace_period_end)
      : null

    return (
      (paymentGracePeriodEnd !== null && now < paymentGracePeriodEnd) ||
      (usageGracePeriodEnd !== null && now < usageGracePeriodEnd)
    )
  },

  async getUsageAnalytics(userId: string): Promise<{
    current: UsageMetrics
    limits: typeof USAGE_LIMITS[SubscriptionTier]
    history: Array<{ date: string } & UsageMetrics>
  }> {
    // Get current usage and limits
    const [currentUsage, profile] = await Promise.all([
      this.getUserUsage(userId),
      supabase
        .from('user_profiles')
        .select('subscription_tier')
        .eq('user_id', userId)
        .single()
    ])

    if (!profile.data) {
      throw new Error('User profile not found')
    }

    const tier = profile.data.subscription_tier as SubscriptionTier
    const limits = USAGE_LIMITS[tier]

    // Get usage history
    const { data: history, error } = await supabase
      .from('usage_history')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(30)

    if (error) {
      console.error('Error fetching usage history:', error)
      throw new Error('Failed to fetch usage history')
    }

    return {
      current: currentUsage,
      limits,
      history: history.map(record => ({
        date: record.date,
        ideaGenerations: record.idea_generations,
        savedIdeas: record.saved_ideas,
        aiQueries: record.ai_queries
      }))
    }
  }
}
