import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import UsageAnalytics from '@/components/dashboard/usage-analytics'
import SubscriptionManager from '@/components/dashboard/subscription-manager'
import { IdeaGrid } from '@/components/dashboard/idea-grid'
import { AnalyticsPanel } from '@/components/dashboard/analytics-panel'

export const metadata: Metadata = {
  title: 'Dashboard - StartupSpark',
  description: 'Manage your startup ideas and track your progress'
}

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Fetch user profile with subscription details
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {session.user.email}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here's an overview of your account and startup progress
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Subscription Status */}
              <SubscriptionManager userId={session.user.id} />

              {/* Usage Analytics */}
              <UsageAnalytics userId={session.user.id} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Analytics Overview */}
              <AnalyticsPanel userId={session.user.id} />

              {/* Recent Ideas */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Ideas</h2>
                </div>
                <div className="p-6">
                  <IdeaGrid userId={session.user.id} limit={5} />
                </div>
              </div>
            </div>
          </div>

          {/* Subscription CTA */}
          {(!profile?.subscription_tier || profile.subscription_tier === 'basic') && (
            <div className="mt-8 bg-indigo-50 rounded-lg shadow-sm">
              <div className="px-6 py-5 sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium text-indigo-900">
                    Upgrade to Pro
                  </h3>
                  <p className="mt-2 text-sm text-indigo-700">
                    Get access to advanced features and increased usage limits.
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-6">
                  <a
                    href="/pricing"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Plans
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/questionnaire"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">New Idea</p>
                <p className="text-sm text-gray-500">Generate a new startup idea</p>
              </div>
            </a>

            <a
              href="/dashboard/saved"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Saved Ideas</p>
                <p className="text-sm text-gray-500">View your saved ideas</p>
              </div>
            </a>

            <a
              href="/pricing"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Subscription</p>
                <p className="text-sm text-gray-500">Manage your plan</p>
              </div>
            </a>

            <a
              href="/contact"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Support</p>
                <p className="text-sm text-gray-500">Get help and support</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
