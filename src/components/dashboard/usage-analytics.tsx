import { useEffect, useState } from 'react'
import { usageService } from '@/lib/usage/service'
import { USAGE_LIMITS, SubscriptionTier } from '@/lib/stripe/config'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface UsageData {
  current: {
    ideaGenerations: number
    savedIdeas: number
    aiQueries: number
  }
  limits: typeof USAGE_LIMITS[SubscriptionTier]
  history: Array<{
    date: string
    ideaGenerations: number
    savedIdeas: number
    aiQueries: number
  }>
}

export default function UsageAnalytics({ userId }: { userId: string }) {
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsageData() {
      try {
        const data = await usageService.getUsageAnalytics(userId)
        setUsageData(data)
      } catch (err) {
        setError('Failed to load usage data')
        console.error('Error fetching usage data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsageData()
  }, [userId])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
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

  if (!usageData) {
    return null
  }

  const { current, limits, history } = usageData

  // Calculate usage percentages
  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0 // Unlimited
    return Math.round((current / limit) * 100)
  }

  const formatUsageValue = (current: number, limit: number) => {
    if (limit === -1) return `${current} / ∞`
    return `${current} / ${limit}`
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Usage Analytics</h2>

      {/* Current Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(current).map(([key, value]) => {
          const limit = limits[key as keyof typeof limits]
          const percentage = getUsagePercentage(value, limit)
          const isNearLimit = percentage >= 80 && percentage < 100
          const isOverLimit = percentage >= 100

          return (
            <div key={key} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {formatUsageValue(value, limit)}
              </p>
              <div className="mt-2">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        isOverLimit
                          ? 'bg-red-500'
                          : isNearLimit
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    ></div>
                  </div>
                </div>
                {(isNearLimit || isOverLimit) && (
                  <p className={`mt-1 text-sm ${isOverLimit ? 'text-red-600' : 'text-yellow-600'}`}>
                    {isOverLimit ? 'Usage limit exceeded' : 'Approaching usage limit'}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Usage History Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Usage History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={history}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Bar dataKey="ideaGenerations" fill="#4F46E5" name="Idea Generations" />
              <Bar dataKey="savedIdeas" fill="#10B981" name="Saved Ideas" />
              <Bar dataKey="aiQueries" fill="#6366F1" name="AI Queries" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upgrade CTA */}
      {Object.values(current).some((value, index) => {
        const limit = Object.values(limits)[index]
        return limit !== -1 && value >= limit * 0.8
      }) && (
        <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800">
                Approaching Usage Limits
              </h3>
              <div className="mt-2 text-sm text-indigo-700">
                <p>
                  You're approaching your usage limits. Consider upgrading your plan
                  to ensure uninterrupted access to all features.
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <a
                    href="/pricing"
                    className="bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Plans
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
