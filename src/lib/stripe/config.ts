import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
}

// Subscription tiers and their Stripe Price IDs
export const SUBSCRIPTION_TIERS = {
  basic: 'basic',
  pro: 'pro',
  enterprise: 'enterprise'
} as const

export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS]

// Usage limits per tier
export const USAGE_LIMITS = {
  [SUBSCRIPTION_TIERS.basic]: {
    ideaGenerations: 10,
    savedIdeas: 20,
    aiQueries: 50
  },
  [SUBSCRIPTION_TIERS.pro]: {
    ideaGenerations: 50,
    savedIdeas: 100,
    aiQueries: 250
  },
  [SUBSCRIPTION_TIERS.enterprise]: {
    ideaGenerations: -1, // Unlimited
    savedIdeas: -1, // Unlimited
    aiQueries: -1 // Unlimited
  }
} as const

export const SUBSCRIPTION_FEATURES = {
  [SUBSCRIPTION_TIERS.basic]: {
    features: [
      'Basic idea generation',
      'Simple recommendations',
      'Standard support',
      'Basic analytics'
    ] as const
  },
  [SUBSCRIPTION_TIERS.pro]: {
    features: [
      'Advanced idea generation',
      'Detailed recommendations',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'Team collaboration (up to 5)',
      'API access'
    ] as const
  },
  [SUBSCRIPTION_TIERS.enterprise]: {
    features: [
      'Unlimited idea generation',
      'Custom AI models',
      'Dedicated support',
      'Enterprise analytics',
      'White labeling',
      'Unlimited team members',
      'Priority API access',
      'Custom integrations',
      'SLA guarantees'
    ] as const
  }
} as const

// Define available features for each tier
type BasicFeatures = {
  ideaGeneration: true
  simpleRecommendations: true
  basicAnalytics: true
}

type ProFeatures = BasicFeatures & {
  advancedGeneration: true
  detailedRecommendations: true
  advancedAnalytics: true
  customBranding: true
  teamCollaboration: true
  apiAccess: true
}

type EnterpriseFeatures = ProFeatures & {
  unlimitedGeneration: true
  customAiModels: true
  whiteLabeling: true
  unlimitedTeam: true
  priorityApi: true
  customIntegrations: true
  slaGuarantee: true
}

// Feature flags for subscription tiers
export const FEATURE_FLAGS: {
  [SUBSCRIPTION_TIERS.basic]: BasicFeatures
  [SUBSCRIPTION_TIERS.pro]: ProFeatures
  [SUBSCRIPTION_TIERS.enterprise]: EnterpriseFeatures
} = {
  [SUBSCRIPTION_TIERS.basic]: {
    ideaGeneration: true,
    simpleRecommendations: true,
    basicAnalytics: true
  },
  [SUBSCRIPTION_TIERS.pro]: {
    ideaGeneration: true,
    simpleRecommendations: true,
    basicAnalytics: true,
    advancedGeneration: true,
    detailedRecommendations: true,
    advancedAnalytics: true,
    customBranding: true,
    teamCollaboration: true,
    apiAccess: true
  },
  [SUBSCRIPTION_TIERS.enterprise]: {
    ideaGeneration: true,
    simpleRecommendations: true,
    basicAnalytics: true,
    advancedGeneration: true,
    detailedRecommendations: true,
    advancedAnalytics: true,
    customBranding: true,
    teamCollaboration: true,
    apiAccess: true,
    unlimitedGeneration: true,
    customAiModels: true,
    whiteLabeling: true,
    unlimitedTeam: true,
    priorityApi: true,
    customIntegrations: true,
    slaGuarantee: true
  }
} as const

export type FeatureFlag = keyof EnterpriseFeatures

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
  PAYMENT_FAILED: 'invoice.payment_failed',
  USAGE_ALERT: 'usage.alert'
} as const

export type SubscriptionEvent = typeof SUBSCRIPTION_EVENTS[keyof typeof SUBSCRIPTION_EVENTS]

// Grace period configuration (in days)
export const GRACE_PERIODS = {
  PAYMENT_FAILURE: 3,
  USAGE_OVERAGE: 2
}

// Helper functions
export function isSubscriptionEvent(event: string): event is SubscriptionEvent {
  return Object.values(SUBSCRIPTION_EVENTS).includes(event as SubscriptionEvent)
}

export function isFeatureEnabled(feature: FeatureFlag, tier: SubscriptionTier): boolean {
  return feature in FEATURE_FLAGS[tier]
}

export function getSubscriptionFeatures(tier: SubscriptionTier) {
  return SUBSCRIPTION_FEATURES[tier].features
}

export function getUsageLimits(tier: SubscriptionTier) {
  return USAGE_LIMITS[tier]
}

export function getTierFromPriceId(priceId: string): SubscriptionTier {
  const priceTierMap: Record<string, SubscriptionTier> = {
    [process.env.STRIPE_BASIC_PRICE_ID!]: SUBSCRIPTION_TIERS.basic,
    [process.env.STRIPE_PRO_PRICE_ID!]: SUBSCRIPTION_TIERS.pro,
    [process.env.STRIPE_ENTERPRISE_PRICE_ID!]: SUBSCRIPTION_TIERS.enterprise
  }
  return priceTierMap[priceId] || SUBSCRIPTION_TIERS.basic
}
