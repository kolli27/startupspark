import { createClient } from '@supabase/supabase-js'
import { stripe } from '../stripe/config'
import { Database } from '@/types/database'

// Initialize Supabase client with service role for admin access
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type FeatureName = 'idea_generations' | 'market_insights' | 'follow_up_questions'

interface UsageRecord {
  feature_name: string
  usage_count: number
}

export const usageService = {
  async trackFeatureUsage(userId: string, featureName: FeatureName): Promise<boolean> {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('subscription_tier, subscription_status')
        .eq('user_id', userId)
        .single()

      if (profileError) throw profileError

      // Check if subscription is active
      if (profile.subscription_status !== 'active') {
        throw new Error('Subscription not active')
      }

      // Call the increment_feature_usage function
      const { error } = await supabase.rpc('increment_feature_usage', {
        p_user_id: userId,
        p_feature_name: featureName
      })

      if (error) {
        if (error.message.includes('Usage limit exceeded')) {
          return false
        }
        throw error
      }

      return true
    } catch (error) {
      console.error('Error tracking feature usage:', error)
      return false
    }
  },

  async getCurrentUsage(userId: string): Promise<Record<FeatureName, number>> {
    try {
      const { data, error } = await supabase
        .from('usage_tracking')
        .select('feature_name, usage_count')
        .eq('user_id', userId)
        .gte('period_end', new Date().toISOString())
        .lte('period_start', new Date().toISOString())

      if (error) throw error

      return (data as UsageRecord[]).reduce((acc, curr) => ({
        ...acc,
        [curr.feature_name]: curr.usage_count
      }), {} as Record<FeatureName, number>)
    } catch (error) {
      console.error('Error fetching current usage:', error)
      return {
        idea_generations: 0,
        market_insights: 0,
        follow_up_questions: 0
      }
    }
  },

  async resetUsage(userId: string): Promise<void> {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('subscription_period_start, subscription_period_end')
        .eq('user_id', userId)
        .single()

      if (profileError) throw profileError

      if (!profile.subscription_period_start || !profile.subscription_period_end) {
        throw new Error('Invalid subscription period')
      }

      // Reset usage counts for the new period
      const features: FeatureName[] = ['idea_generations', 'market_insights', 'follow_up_questions']
      
      for (const feature of features) {
        await supabase
          .from('usage_tracking')
          .upsert({
            user_id: userId,
            feature_name: feature,
            usage_count: 0,
            period_start: profile.subscription_period_start,
            period_end: profile.subscription_period_end
          })
      }
    } catch (error) {
      console.error('Error resetting usage:', error)
      throw error
    }
  },

  async reportUsageToStripe(userId: string, featureName: FeatureName): Promise<void> {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('stripe_customer_id, subscription_tier')
        .eq('user_id', userId)
        .single()

      if (profileError) throw profileError

      // Only report usage for premium features
      if (profile.subscription_tier === 'premium' && profile.stripe_customer_id) {
        const subscriptions = await stripe.subscriptions.list({
          customer: profile.stripe_customer_id,
          status: 'active',
          limit: 1
        })

        if (subscriptions.data.length > 0) {
          const subscription = subscriptions.data[0]
          const item = subscription.items.data[0]

          await stripe.subscriptionItems.createUsageRecord(
            item.id,
            {
              quantity: 1,
              timestamp: Math.floor(Date.now() / 1000),
              action: 'increment'
            }
          )
        }
      }
    } catch (error) {
      console.error('Error reporting usage to Stripe:', error)
      throw error
    }
  }
}
