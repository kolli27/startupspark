"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/lib/hooks/useSubscription'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshSubscription } = useSubscription()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      router.push('/dashboard')
      return
    }

    const verifyPayment = async () => {
      try {
        // Refresh subscription data
        await refreshSubscription()
        setLoading(false)
      } catch (error) {
        console.error('Error verifying payment:', error)
        router.push('/dashboard')
      }
    }

    verifyPayment()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-8">
            Thank you for upgrading to Premium! You now have access to all premium features
            and can generate up to 10 business ideas per month.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => router.push('/questionnaire')}
              className="w-full bg-primary-600 hover:bg-primary-700"
            >
              Generate New Ideas
            </Button>

            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
