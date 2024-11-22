import { NextResponse } from 'next/server'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe/config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import { usageService } from '@/lib/usage/service'

async function updateUserSubscription(
  supabase: any,
  userId: string,
  subscriptionData: {
    status: string;
    current_period_end: number;
    cancel_at_period_end: boolean;
    stripe_subscription_id?: string;
    stripe_customer_id?: string;
    subscription_tier: 'free' | 'premium';
  }
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

  const subscriptionTier = subscription.items.data[0].price.lookup_key === 'premium' ? 'premium' : 'free'

  await updateUserSubscription(supabase, userId, {
    status: subscription.status,
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: subscription.cancel_at_period_end,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    subscription_tier: subscriptionTier
  })
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
    const subscriptionTier = subscription.items.data[0].price.lookup_key === 'premium' ? 'premium' : 'free'
    
    await updateUserSubscription(supabase, userId, {
      status: subscription.status,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      subscription_tier: subscriptionTier
    })
  }
}

async function handleInvoicePaid(event: Stripe.Event, supabase: any) {
  const invoice = event.data.object as Stripe.Invoice
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
    const userId = subscription.metadata.userId
    
    if (userId) {
      const subscriptionTier = subscription.items.data[0].price.lookup_key === 'premium' ? 'premium' : 'free'
      
      await updateUserSubscription(supabase, userId, {
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string,
        subscription_tier: subscriptionTier
      })
    }
  }
}

async function handleSubscriptionDeleted(event: Stripe.Event, supabase: any) {
  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata.userId

  if (!userId) {
    console.error('No userId found in subscription metadata')
    return
  }

  // Reset to free tier
  await updateUserSubscription(supabase, userId, {
    status: 'canceled',
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: true,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    subscription_tier: 'free'
  })
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
    )

    const supabase = createRouteHandlerClient({ cookies })

    switch (event.type) {
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
        await handleInvoicePaid(event, supabase)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
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
