"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { loadStripe } from '@stripe/stripe-js'
import { SubscriptionData } from '@/lib/stripe/config'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface SubscriptionManagerProps {
  userId: string
  onSubscriptionChange?: () => void
}

export function SubscriptionManager({ userId, onSubscriptionChange }: SubscriptionManagerProps) {
  const router = useRouter()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/subscription')
      if (!response.ok) throw new Error('Failed to fetch subscription')
      const data = await response.json()
      setSubscription(data)
    } catch (err) {
      setError('Failed to load subscription status')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async () => {
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID,
          mode: 'subscription'
        })
      })

      const { sessionId } = await response.json()
      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) throw error
    } catch (err) {
      setError('Failed to start upgrade process')
      console.error(err)
    }
  }

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'portal',
          returnUrl: window.location.href
        })
      })

      const { url } = await response.json()
      router.push(url)
    } catch (err) {
      setError('Failed to open subscription management')
      console.error(err)
    }
  }

  const handleCancelSubscription = async () => {
    try {
      await fetch('/api/stripe/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' })
      })

      await fetchSubscription()
      if (onSubscriptionChange) onSubscriptionChange()
    } catch (err) {
      setError('Failed to cancel subscription')
      console.error(err)
    }
  }

  const handleReactivateSubscription = async () => {
    try {
      await fetch('/api/stripe/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reactivate' })
      })

      await fetchSubscription()
      if (onSubscriptionChange) onSubscriptionChange()
    } catch (err) {
      setError('Failed to reactivate subscription')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <p>{error}</p>
      </Alert>
    )
  }

  if (!subscription || subscription.plan === 'free') {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Free Plan</h3>
          <p className="text-gray-600 mb-4">
            Generate 1 business idea per month
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Ideas remaining this month: {subscription?.ideasRemaining || 1}
            </p>
          </div>
        </div>

        <Button
          onClick={handleUpgrade}
          className="w-full bg-primary-600 hover:bg-primary-700"
        >
          Upgrade to Premium
        </Button>

        <div className="text-sm text-gray-500 text-center">
          <p>Get 10 ideas/month plus premium features</p>
          <p>$9.99/month or $3.00/month paid annually</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Premium Plan</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Ideas remaining this month: {subscription.ideasRemaining}
          </p>
          <p className="text-sm text-gray-500">
            Renewal date: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
          {subscription.cancelAtPeriodEnd && (
            <p className="text-amber-600 text-sm">
              Your subscription will end on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {subscription.cancelAtPeriodEnd ? (
          <Button
            onClick={handleReactivateSubscription}
            className="w-full"
            variant="outline"
          >
            Reactivate Subscription
          </Button>
        ) : (
          <Button
            onClick={handleCancelSubscription}
            className="w-full"
            variant="outline"
          >
            Cancel Subscription
          </Button>
        )}

        <Button
          onClick={handleManageSubscription}
          className="w-full"
        >
          Manage Subscription
        </Button>
      </div>
    </div>
  )
}
