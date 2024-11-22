import React, { useState, useEffect } from 'react'
import { SubscriptionData, PaymentPlan, isFeatureAvailable } from '@/lib/stripe/config'

interface UseSubscriptionReturn {
  subscription: SubscriptionData | null
  loading: boolean
  error: string | null
  isFeatureEnabled: (feature: string) => boolean
  canGenerateIdea: boolean
  refreshSubscription: () => Promise<void>
}

export function useSubscription(): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/subscription')
      if (!response.ok) throw new Error('Failed to fetch subscription')
      const data = await response.json()
      setSubscription(data)
      setError(null)
    } catch (err) {
      setError('Failed to load subscription status')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [])

  const isFeatureEnabled = (feature: string): boolean => {
    if (!subscription) return false
    return isFeatureAvailable(feature as any, subscription.plan)
  }

  const canGenerateIdea = (): boolean => {
    if (!subscription) return false
    return subscription.ideasRemaining > 0
  }

  return {
    subscription,
    loading,
    error,
    isFeatureEnabled,
    canGenerateIdea: canGenerateIdea(),
    refreshSubscription: fetchSubscription
  }
}

// Higher-order component to protect premium features
export function withPremiumFeature<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  featureName: string
): React.FC<P> {
  const WithPremiumFeatureComponent: React.FC<P> = (props) => {
    const { isFeatureEnabled, loading } = useSubscription()

    if (loading) {
      return React.createElement('div', { className: 'animate-pulse' },
        React.createElement('div', { className: 'h-8 bg-gray-200 rounded w-3/4 mb-4' }),
        React.createElement('div', { className: 'h-8 bg-gray-200 rounded w-1/2' })
      )
    }

    if (!isFeatureEnabled(featureName)) {
      return React.createElement('div', { className: 'p-4 bg-gray-50 rounded-lg' },
        React.createElement('h3', { className: 'font-semibold text-lg mb-2' }, 'Premium Feature'),
        React.createElement('p', { className: 'text-gray-600 mb-4' }, 
          'This feature is only available to premium subscribers.'
        ),
        React.createElement('button', {
          onClick: () => window.location.href = '/pricing',
          className: 'bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700'
        }, 'Upgrade to Premium')
      )
    }

    return React.createElement(WrappedComponent, props)
  }

  WithPremiumFeatureComponent.displayName = `WithPremiumFeature(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return WithPremiumFeatureComponent
}

interface UseIdeaGenerationReturn {
  canGenerateIdea: boolean
  generateIdea: <T>(generationFunction: () => Promise<T>) => Promise<T>
  subscription: SubscriptionData | null
  ideasRemaining: number
}

// Hook to manage idea generation limits
export function useIdeaGeneration(): UseIdeaGenerationReturn {
  const { subscription, canGenerateIdea, refreshSubscription } = useSubscription()

  const generateIdea = async <T,>(generationFunction: () => Promise<T>): Promise<T> => {
    if (!canGenerateIdea) {
      throw new Error('Idea generation limit reached')
    }

    try {
      const result = await generationFunction()
      
      // Increment usage and refresh subscription data
      await fetch('/api/stripe/subscription', {
        method: 'PUT'
      })
      await refreshSubscription()

      return result
    } catch (error) {
      console.error('Failed to generate idea:', error)
      throw error
    }
  }

  return {
    canGenerateIdea,
    generateIdea,
    subscription,
    ideasRemaining: subscription?.ideasRemaining || 0
  }
}
