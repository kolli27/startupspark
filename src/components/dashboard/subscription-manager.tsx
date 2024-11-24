import { useEffect, useState } from 'react'
import { stripeService } from '@/lib/stripe/service'
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_FEATURES, SubscriptionTier } from '@/lib/stripe/config'

type SubscriptionDetails = {
  id: string
  tier: SubscriptionTier
  status: string
  current_period_end: string
  cancel_at_period_end: boolean
  usage?: {
    ideaGenerations: number
    savedIdeas: number
    aiQueries: number
  }
}

export default function SubscriptionManager({ userId }: { userId: string }) {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const details = await stripeService.getSubscriptionDetails(userId)
        if (details) {
          setSubscription({
            id: details.id,
            tier: details.tier,
            status: details.status,
            current_period_end: details.current_period_end,
            cancel_at_period_end: details.cancel_at_period_end || false,
            usage: details.usage
          })
        }
      } catch (err) {
        setError('Failed to load subscription details')
        console.error('Error fetching subscription:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [userId])

  const handleManageSubscription = async () => {
    try {
      const { url } = await stripeService.createPortalSession(userId)
      window.location.href = url
    } catch (err) {
      setError('Failed to open subscription portal')
      console.error('Error opening portal:', err)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          No Active Subscription
        </h2>
        <p className="text-gray-600 mb-4">
          Upgrade your account to access premium features and increased usage limits.
        </p>
        <a
          href="/pricing"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          View Plans
        </a>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Subscription Details
          </h2>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              subscription.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </span>
        </div>

        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          <div className="pt-6 md:grid md:grid-cols-3 md:gap-4">
            <dt className="text-sm font-medium text-gray-500">Current plan</dt>
            <dd className="mt-1 text-sm text-gray-900 md:mt-0 md:col-span-2">
              {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
            </dd>
          </div>

          <div className="pt-6 md:grid md:grid-cols-3 md:gap-4">
            <dt className="text-sm font-medium text-gray-500">Billing period</dt>
            <dd className="mt-1 text-sm text-gray-900 md:mt-0 md:col-span-2">
              {subscription.cancel_at_period_end
                ? `Cancels on ${formatDate(subscription.current_period_end)}`
                : `Renews on ${formatDate(subscription.current_period_end)}`}
            </dd>
          </div>

          <div className="pt-6 md:grid md:grid-cols-3 md:gap-4">
            <dt className="text-sm font-medium text-gray-500">Features</dt>
            <dd className="mt-1 text-sm text-gray-900 md:mt-0 md:col-span-2">
              <ul className="list-disc list-inside space-y-1">
                {SUBSCRIPTION_FEATURES[subscription.tier].features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </dd>
          </div>

          {subscription.usage && (
            <div className="pt-6 md:grid md:grid-cols-3 md:gap-4">
              <dt className="text-sm font-medium text-gray-500">Current Usage</dt>
              <dd className="mt-1 text-sm text-gray-900 md:mt-0 md:col-span-2">
                <ul className="space-y-1">
                  <li>Idea Generations: {subscription.usage.ideaGenerations}</li>
                  <li>Saved Ideas: {subscription.usage.savedIdeas}</li>
                  <li>AI Queries: {subscription.usage.aiQueries}</li>
                </ul>
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleManageSubscription}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Manage Subscription
          </button>

          {!subscription.cancel_at_period_end && (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowCancelConfirm(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Cancel Subscription?
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to cancel your subscription? You'll continue to have access to premium features until the end of your current billing period.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleManageSubscription}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                >
                  Cancel Subscription
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Keep Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
