import { FC } from 'react'

interface AnalyticsPanelProps {
  userId: string
}

export const AnalyticsPanel: FC<AnalyticsPanelProps> = ({ userId }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Analytics Overview</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ideas Generated */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Ideas Generated</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
            <p className="mt-1 text-sm text-gray-500">Last 30 days</p>
          </div>

          {/* Ideas Saved */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Ideas Saved</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
            <p className="mt-1 text-sm text-gray-500">Total saved ideas</p>
          </div>

          {/* AI Queries */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">AI Queries</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
            <p className="mt-1 text-sm text-gray-500">This month</p>
          </div>

          {/* Success Rate */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Success Rate</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0%</dd>
            <p className="mt-1 text-sm text-gray-500">Ideas rated positively</p>
          </div>
        </div>

        {/* Placeholder for future analytics features */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            More detailed analytics coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}
