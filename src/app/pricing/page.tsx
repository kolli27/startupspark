import { Metadata } from 'next'
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_FEATURES, USAGE_LIMITS } from '@/lib/stripe/config'
import { stripeService } from '@/lib/stripe/service'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Pricing - StartupSpark',
  description: 'Choose the perfect plan for your startup journey'
}

async function createCheckoutSession(userId: string, tier: keyof typeof SUBSCRIPTION_TIERS) {
  'use server'
  const session = await stripeService.createCheckoutSession(userId, tier)
  redirect(session.url)
}

async function PricingPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login?next=/pricing')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('subscription_tier, subscription_status')
    .eq('user_id', session.user.id)
    .single()

  const currentTier = profile?.subscription_tier || 'basic'
  const isActive = profile?.subscription_status === 'active'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Scale your startup journey with the perfect plan for your needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {/* Basic Plan */}
          <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Basic</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">$9</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 text-gray-500">Perfect for early-stage startups and solo founders.</p>

              <ul className="mt-6 space-y-4">
                {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.basic].features.map((feature) => (
                  <li key={feature} className="flex">
                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">
                    {USAGE_LIMITS[SUBSCRIPTION_TIERS.basic].ideaGenerations} idea generations/month
                  </span>
                </li>
              </ul>
            </div>

            <form action={() => createCheckoutSession(session.user.id, SUBSCRIPTION_TIERS.basic)}>
              <button
                type="submit"
                disabled={currentTier === SUBSCRIPTION_TIERS.basic && isActive}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  currentTier === SUBSCRIPTION_TIERS.basic && isActive
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {currentTier === SUBSCRIPTION_TIERS.basic && isActive ? 'Current Plan' : 'Get Started'}
              </button>
            </form>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 bg-white border border-indigo-200 rounded-2xl shadow-sm flex flex-col">
            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">$29</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 text-gray-500">For growing startups that need more power.</p>

              <ul className="mt-6 space-y-4">
                {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.pro].features.map((feature) => (
                  <li key={feature} className="flex">
                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">
                    {USAGE_LIMITS[SUBSCRIPTION_TIERS.pro].ideaGenerations} idea generations/month
                  </span>
                </li>
              </ul>
            </div>

            <form action={() => createCheckoutSession(session.user.id, SUBSCRIPTION_TIERS.pro)}>
              <button
                type="submit"
                disabled={currentTier === SUBSCRIPTION_TIERS.pro && isActive}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  currentTier === SUBSCRIPTION_TIERS.pro && isActive
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {currentTier === SUBSCRIPTION_TIERS.pro && isActive ? 'Current Plan' : 'Upgrade to Pro'}
              </button>
            </form>
          </div>

          {/* Enterprise Plan */}
          <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">$99</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 text-gray-500">For organizations that need unlimited capabilities.</p>

              <ul className="mt-6 space-y-4">
                {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.enterprise].features.map((feature) => (
                  <li key={feature} className="flex">
                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">Unlimited idea generations</span>
                </li>
              </ul>
            </div>

            <form action={() => createCheckoutSession(session.user.id, SUBSCRIPTION_TIERS.enterprise)}>
              <button
                type="submit"
                disabled={currentTier === SUBSCRIPTION_TIERS.enterprise && isActive}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  currentTier === SUBSCRIPTION_TIERS.enterprise && isActive
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {currentTier === SUBSCRIPTION_TIERS.enterprise && isActive ? 'Current Plan' : 'Contact Sales'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Need a custom plan? <a href="/contact" className="text-indigo-600 hover:text-indigo-500">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
