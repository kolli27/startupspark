"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_CONFIG } from '@/lib/stripe/config'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PricingPlan {
  name: string
  price: string
  billingPeriod: string
  features: string[]
  priceId: string
  mode: 'payment' | 'subscription'
  popular?: boolean
}

const plans: PricingPlan[] = [
  {
    name: 'Free',
    price: '$0',
    billingPeriod: 'forever',
    features: [
      '1 business idea per month',
      'Basic idea generation',
      'Save favorites',
      'Community support'
    ],
    priceId: '',
    mode: 'payment'
  },
  {
    name: 'Premium (Monthly)',
    price: '$9.99',
    billingPeriod: 'per month',
    features: [
      '10 business ideas per month',
      'Follow-up questions',
      'Market insights',
      'Actionable suggestions',
      'Priority support',
      'Export to PDF'
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID!,
    mode: 'subscription',
    popular: true
  },
  {
    name: 'Premium (Annual)',
    price: '$3.00',
    billingPeriod: 'per month, billed annually',
    features: [
      'All Premium Monthly features',
      '10 business ideas per month',
      'Follow-up questions',
      'Market insights',
      'Actionable suggestions',
      'Priority support',
      'Export to PDF',
      '70% savings vs monthly'
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID!,
    mode: 'subscription'
  }
]

export default function PricingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePlanSelect = async (plan: PricingPlan) => {
    if (!user) {
      router.push('/login?redirect=/pricing')
      return
    }

    if (plan.name === 'Free') {
      router.push('/dashboard')
      return
    }

    setSelectedPlan(plan)
    setCheckoutLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Failed to load Stripe')

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          mode: plan.mode
        })
      })

      const { sessionId } = await response.json()
      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) throw error

    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to start checkout process. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized business ideas tailored to your skills and interests.
            Upgrade for premium features and more ideas per month.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden
                ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {plan.name}
                </h3>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/{plan.billingPeriod}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700'
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                  disabled={checkoutLoading && selectedPlan?.name === plan.name}
                >
                  {checkoutLoading && selectedPlan?.name === plan.name ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Processing...
                    </div>
                  ) : plan.name === 'Free' ? (
                    'Get Started'
                  ) : (
                    'Select Plan'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-8 text-center text-red-600 bg-red-50 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto grid gap-8 lg:grid-cols-2">
            <div className="text-left">
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade, downgrade, or cancel your plan at any time.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards through our secure payment processor, Stripe.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Do unused ideas roll over?</h3>
              <p className="text-gray-600">
                No, idea generation limits reset at the beginning of each billing cycle.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-gray-600">
                Yes, contact us within 14 days of purchase for a full refund if you're not satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
