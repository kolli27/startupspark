import { NextResponse } from 'next/server'
import { 
  stripe, 
  STRIPE_WEBHOOK_SECRET, 
  SubscriptionTier,
  SUBSCRIPTION_TIERS,
  USAGE_LIMITS,
  GRACE_PERIODS
} from '@/lib/stripe/config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import { usageService } from '@/lib/usage/service'

interface SubscriptionData {
  status: string
  current_period_end: number
  cancel_at_period_end: boolean
  stripe_subscription_id?: string
  stripe_customer_id?: string
  subscription_tier: SubscriptionTier
  usage_limits?: typeof USAGE_LIMITS[SubscriptionTier]
}

// Custom event types
interface CustomUsageAlert {
  subscription: string
  type: string
  total_usage: number
}

function isCustomUsageAlert(obj: unknown): obj is CustomUsageAlert {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'subscription' in obj &&
    typeof (obj as any).subscription === 'string' &&
    'type' in obj &&
    typeof (obj as any).type === 'string' &&
    'total_usage' in obj &&
    typeof (obj as any).total_usage === 'number'
  )
}

async function updateUserSubscription(
  supabase: any,
  userId: string,
  subscriptionData: SubscriptionData
) {
  const { error } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: userId,
      stripe_subscription_id: subscriptionData.stripe_subscription_id,
      stripe_customer_id: subscriptionData.stripe_customer_id,
      subscription_status: subscriptionData.status,
      subscription_tier: subscriptionData.subscription_tier,
      subscription_period_start: new Date().toISOString(),
      subscription_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscriptionData.cancel_at_period_end,
      usage_limits: subscriptionData.usage_limits,
      updated_at: new Date().toISOString()
    })

  if (error) throw error

  // Reset usage tracking for new subscription period
  await usageService.resetUsage(userId)
}

async function handleSubscriptionChange(event: Stripe.Event, supabase: any) {
  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata.userId

  if (!userId) {
    console.error('No userId found in subscription metadata')
    return
  }

  const tier = subscription.metadata.tier as SubscriptionTier || SUBSCRIPTION_TIERS.basic
  const usageLimits = USAGE_LIMITS[tier]

  await updateUserSubscription(supabase, userId, {
    status: subscription.status,
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: subscription.cancel_at_period_end,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    subscription_tier: tier,
    usage_limits: usageLimits
  })

  // Send welcome email for new subscriptions
  if (event.type === 'customer.subscription.created') {
    await sendSubscriptionEmail(userId, 'welcome', tier)
  }
}

async function handlePaymentSuccess(event: Stripe.Event, supabase: any) {
  const session = event.data.object as Stripe.Checkout.Session
  const userId = session.metadata?.userId

  if (!userId) {
    console.error('No userId found in session metadata')
    return
  }

  // For subscription payments, ensure customer data is saved
  if (session.mode === 'subscription' && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    const tier = subscription.metadata.tier as SubscriptionTier || SUBSCRIPTION_TIERS.basic
    const usageLimits = USAGE_LIMITS[tier]
    
    await updateUserSubscription(supabase, userId, {
      status: subscription.status,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      subscription_tier: tier,
      usage_limits: usageLimits
    })
  }
}

async function handlePaymentFailed(event: Stripe.Event, supabase: any) {
  const invoice = event.data.object as Stripe.Invoice
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
  const userId = subscription.metadata.userId

  if (userId) {
    // Add grace period for payment failure
    const gracePeriodEnd = new Date()
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + GRACE_PERIODS.PAYMENT_FAILURE)

    await supabase
      .from('user_profiles')
      .update({
        payment_failure_grace_period_end: gracePeriodEnd.toISOString()
      })
      .eq('user_id', userId)

    // Send payment failure notification
    await sendSubscriptionEmail(userId, 'payment_failed', subscription.metadata.tier as SubscriptionTier)
  }
}

async function handleCustomUsageAlert(eventData: unknown, supabase: any) {
  if (!isCustomUsageAlert(eventData)) {
    console.error('Invalid usage alert data:', eventData)
    return
  }

  const subscription = await stripe.subscriptions.retrieve(eventData.subscription)
  const userId = subscription.metadata.userId
  const usageType = eventData.type
  const currentUsage = eventData.total_usage

  if (userId) {
    // Add grace period for usage overage
    const gracePeriodEnd = new Date()
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + GRACE_PERIODS.USAGE_OVERAGE)

    await supabase
      .from('user_profiles')
      .update({
        usage_overage_grace_period_end: gracePeriodEnd.toISOString()
      })
      .eq('user_id', userId)

    // Send usage limit notification
    await sendSubscriptionEmail(userId, 'usage_limit', subscription.metadata.tier as SubscriptionTier, {
      usageType,
      currentUsage
    })
  }
}

async function handleSubscriptionDeleted(event: Stripe.Event, supabase: any) {
  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata.userId

  if (!userId) {
    console.error('No userId found in subscription metadata')
    return
  }

  // Reset to basic tier
  await updateUserSubscription(supabase, userId, {
    status: 'canceled',
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: true,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    subscription_tier: SUBSCRIPTION_TIERS.basic,
    usage_limits: USAGE_LIMITS[SUBSCRIPTION_TIERS.basic]
  })

  // Send cancellation email
  await sendSubscriptionEmail(userId, 'cancelled', SUBSCRIPTION_TIERS.basic)
}

async function sendSubscriptionEmail(
  userId: string,
  type: 'welcome' | 'payment_failed' | 'usage_limit' | 'cancelled',
  tier: SubscriptionTier,
  data?: Record<string, any>
) {
  // Implementation for sending emails would go here
  // This could integrate with your email service provider
  console.log(`Sending ${type} email to ${userId} for tier ${tier}`, data)
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing required webhook configuration' },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    ) as Stripe.Event & { type: string }

    const supabase = createRouteHandlerClient({ cookies })

    // Handle standard Stripe events
    switch (event.type as Stripe.WebhookEndpointCreateParams.EnabledEvent) {
      case 'checkout.session.completed':
        await handlePaymentSuccess(event, supabase)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event, supabase)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event, supabase)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSuccess(event, supabase)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event, supabase)
        break

      default:
        // Handle non-standard events
        if ((event as any).type === 'customer.usage.alert') {
          await handleCustomUsageAlert(event.data.object, supabase)
        } else {
          console.log(`Unhandled event type: ${event.type}`)
        }
    }

    return NextResponse.json({ received: true })

  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    )
  }
}

// Stripe requires the raw body to construct the event
export const config = {
  api: {
    bodyParser: false
  }
}
