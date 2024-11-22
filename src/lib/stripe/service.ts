import Stripe from 'stripe'
import { stripe } from './config'

interface CheckoutSession {
  url: string
}

interface PortalSession {
  url: string
}

interface SubscriptionStatus {
  id: string
  status: 'active' | 'canceled' | 'past_due' | 'incomplete'
  current_period_end: string
  cancel_at_period_end?: boolean
}

export const stripeService = {
  async createCheckoutSession(userId: string): Promise<CheckoutSession> {
    try {
      const session = await stripe.checkout.sessions.create({
        customer_email: userId,
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
        metadata: {
          userId,
        },
      })

      if (!session.url) {
        throw new Error('Failed to create checkout session')
      }

      return { url: session.url }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw new Error('Failed to create checkout session')
    }
  },

  async createPortalSession(customerId: string): Promise<PortalSession> {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      })

      return { url: session.url }
    } catch (error) {
      console.error('Error creating portal session:', error)
      throw new Error('Failed to create portal session')
    }
  },

  async getActiveSubscription(customerId: string): Promise<SubscriptionStatus | null> {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        limit: 1,
      })

      if (!subscriptions.data.length) {
        return null
      }

      const subscription = subscriptions.data[0]
      return {
        id: subscription.id,
        status: subscription.status as SubscriptionStatus['status'],
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
      throw new Error('Failed to fetch subscription')
    }
  },

  async constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
    webhookSecret: string
  ): Promise<Stripe.Event> {
    try {
      return stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      )
    } catch (error) {
      console.error('Error constructing webhook event:', error)
      throw new Error('Failed to construct webhook event')
    }
  },

  async handleSubscriptionChange(
    subscriptionId: string,
    customerId: string,
    status: SubscriptionStatus['status']
  ): Promise<void> {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      
      if (subscription.customer !== customerId) {
        throw new Error('Subscription does not belong to customer')
      }

      // Update subscription status in your database
      // This would typically be handled by your webhook handler
      console.log(`Subscription ${subscriptionId} status updated to ${status}`)
    } catch (error) {
      console.error('Error handling subscription change:', error)
      throw new Error('Failed to handle subscription change')
    }
  }
}
