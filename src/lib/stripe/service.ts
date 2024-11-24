import { stripe } from './config';
import {
  SUBSCRIPTION_TIERS,
  SubscriptionTier,
  SubscriptionStatus
} from './config';

interface SubscriptionDetails {
  id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  current_period_end: string;
  cancel_at_period_end: boolean;
  usage?: {
    ideaGenerations: number;
    savedIdeas: number;
    aiQueries: number;
  };
}

export const stripeService = {
  getPriceIdForTier(tier: SubscriptionTier): string {
    const priceIds = {
      [SUBSCRIPTION_TIERS.basic]: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
      [SUBSCRIPTION_TIERS.pro]: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
      [SUBSCRIPTION_TIERS.enterprise]: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID
    };

    const priceId = priceIds[tier];
    if (!priceId) {
      throw new Error(`No price ID configured for tier: ${tier}`);
    }

    return priceId;
  },

  async createCheckoutSession(
    userId: string,
    tier: SubscriptionTier = SUBSCRIPTION_TIERS.basic,
    customFields?: Record<string, any>
  ) {
    const priceId = this.getPriceIdForTier(tier);

    const session = await stripe.checkout.sessions.create({
      customer: userId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      metadata: customFields
    });

    return session;
  },

  async createPortalSession(userId: string) {
    return stripe.billingPortal.sessions.create({
      customer: userId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    });
  },

  async getSubscriptionDetails(userId: string): Promise<SubscriptionDetails | null> {
    const subscriptions = await stripe.subscriptions.list({
      customer: userId,
      status: 'active',
      expand: ['data.default_payment_method']
    });

    if (!subscriptions.data.length) return null;

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;
    const tier = Object.entries(SUBSCRIPTION_TIERS).find(
      ([_, id]) => this.getPriceIdForTier(id as SubscriptionTier) === priceId
    )?.[1] as SubscriptionTier;

    // Get usage metrics from our database
    const usage = await this.getSubscriptionUsage(userId);

    return {
      id: subscription.id,
      tier: tier || SUBSCRIPTION_TIERS.basic,
      status: subscription.status as SubscriptionStatus,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      usage
    };
  },

  async getSubscriptionUsage(userId: string) {
    // Implement fetching usage metrics from your database
    // This is a placeholder implementation
    return {
      ideaGenerations: 0,
      savedIdeas: 0,
      aiQueries: 0
    };
  },

  async cancelSubscription(subscriptionId: string) {
    return stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });
  },

  async reactivateSubscription(subscriptionId: string) {
    return stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false
    });
  }
};
