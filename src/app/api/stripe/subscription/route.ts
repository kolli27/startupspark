import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { StripeService } from '@/lib/stripe/service'

export async function GET(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const stripeService = new StripeService(supabase)
    const subscription = await stripeService.getSubscription(session.user.id)

    return NextResponse.json(subscription)

  } catch (error: any) {
    console.error('Subscription fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

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
    const { action, returnUrl } = body

    const stripeService = new StripeService(supabase)

    switch (action) {
      case 'cancel':
        await stripeService.cancelSubscription(session.user.id)
        return NextResponse.json({ success: true })

      case 'reactivate':
        await stripeService.reactivateSubscription(session.user.id)
        return NextResponse.json({ success: true })

      case 'portal':
        if (!returnUrl) {
          return NextResponse.json(
            { error: 'Return URL is required' },
            { status: 400 }
          )
        }
        const portalUrl = await stripeService.createPortalSession(session.user.id, returnUrl)
        return NextResponse.json({ url: portalUrl })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error: any) {
    console.error('Subscription action error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process subscription action' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const stripeService = new StripeService(supabase)
    await stripeService.incrementIdeaUsage(session.user.id)

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Usage update error:', error)
    return NextResponse.json(
      { error: 'Failed to update usage' },
      { status: 500 }
    )
  }
}
