"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PaymentCancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-amber-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-gray-600 mb-8">
            Your payment was cancelled and you haven't been charged.
            If you have any questions or concerns, please don't hesitate to contact us.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => router.push('/pricing')}
              className="w-full bg-primary-600 hover:bg-primary-700"
            >
              Try Again
            </Button>

            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="w-full"
            >
              Return to Dashboard
            </Button>

            <div className="text-sm text-gray-500 mt-6">
              <p>Need help? Contact us at</p>
              <a
                href="mailto:support@startupspark.ai"
                className="text-primary-600 hover:text-primary-700"
              >
                support@startupspark.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
