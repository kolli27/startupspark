import { NextResponse } from 'next/server'
import { STRIPE_CONFIG } from '@/lib/stripe/config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { StripeService } from '@/lib/stripe/service'

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { priceId, mode } = body

    // Validate price ID exists in our config
    const validPriceIds = [
      STRIPE_CONFIG.prices.premium.oneTime,
      STRIPE_CONFIG.prices.premium.subscription
    ]

    if (!priceId || !validPriceIds.includes(priceId)) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      )
    }

    // Validate payment mode
    if (!['payment', 'subscription'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid payment mode' },
        { status: 400 }
      )
    }

    const stripeService = new StripeService(supabase)
    const sessionId = await stripeService.createCheckoutSession(
      session.user.id,
      priceId,
      mode as 'payment' | 'subscription'
    )

    return NextResponse.json({ sessionId })

  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
