import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia', // Latest API version
  typescript: true,
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
}

export const SUBSCRIPTION_PRICE_ID = process.env.STRIPE_PRICE_ID

if (!SUBSCRIPTION_PRICE_ID) {
  throw new Error('Missing STRIPE_PRICE_ID environment variable')
}

// Subscription tiers and features
export const SUBSCRIPTION_TIERS = {
  free: 'free',
  premium: 'premium'
} as const

export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS]

export const SUBSCRIPTION_FEATURES = {
  [SUBSCRIPTION_TIERS.free]: {
    ideaGenerations: 3,
    features: ['Basic business ideas', 'Simple recommendations'] as const
  },
  [SUBSCRIPTION_TIERS.premium]: {
    ideaGenerations: -1, // Unlimited
    features: [
      'Unlimited business ideas',
      'Advanced AI recommendations',
      'Market insights',
      'Follow-up questions',
      'Actionable suggestions',
      'Priority support'
    ] as const
  }
} as const

// Feature flags for subscription tiers
export const PREMIUM_FEATURES = [
  'followUpQuestions',
  'actionableSuggestions',
  'marketInsights',
  'unlimitedIdeas',
  'prioritySupport'
] as const

export type PremiumFeature = typeof PREMIUM_FEATURES[number]

// Subscription status types
export type SubscriptionStatus = 
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid'

// Subscription event types that we handle
export const SUBSCRIPTION_EVENTS = {
  CREATED: 'customer.subscription.created',
  UPDATED: 'customer.subscription.updated',
  DELETED: 'customer.subscription.deleted',
  PAYMENT_FAILED: 'invoice.payment_failed'
} as const

export type SubscriptionEvent = typeof SUBSCRIPTION_EVENTS[keyof typeof SUBSCRIPTION_EVENTS]

// Helper function to check if an event is a subscription event
export function isSubscriptionEvent(event: string): event is SubscriptionEvent {
  return Object.values(SUBSCRIPTION_EVENTS).includes(event as SubscriptionEvent)
}

// Helper function to check if a feature is premium
export function isPremiumFeature(feature: string): feature is PremiumFeature {
  return PREMIUM_FEATURES.includes(feature as PremiumFeature)
}

// Helper function to get features for a subscription tier
export function getSubscriptionFeatures(tier: SubscriptionTier) {
  return SUBSCRIPTION_FEATURES[tier].features
}

// Helper function to get idea generation limit for a subscription tier
export function getIdeaGenerationLimit(tier: SubscriptionTier) {
  return SUBSCRIPTION_FEATURES[tier].ideaGenerations
}
