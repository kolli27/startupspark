import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { stripeService } from '@/lib/stripe/service'

export const metadata: Metadata = {
  title: 'Payment Successful - StartupSpark',
  description: 'Your payment has been processed successfully'
}

async function SuccessPage({
  searchParams
}: {
  searchParams: { session_id?: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // If no session_id is provided, redirect to dashboard
  if (!searchParams.session_id) {
    redirect('/dashboard')
  }

  // Get subscription details from Stripe
  const subscriptionDetails = await stripeService.getSubscriptionDetails(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg
            className="h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <circle
              className="opacity-25"
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M14 24l8 8 16-16"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Thank you for your subscription. Your account has been upgraded to{' '}
          <span className="font-semibold">
            {subscriptionDetails?.tier || 'premium'} tier
          </span>
          .
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                What's next?
              </h3>
              <ul className="mt-4 list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>Your subscription is now active</li>
                <li>You have access to all {subscriptionDetails?.tier || 'premium'} features</li>
                <li>You can start using the enhanced capabilities right away</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
