import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SubscriptionManager } from '@/components/payment/SubscriptionManager'
import { useSubscription } from '@/lib/hooks/useSubscription'

// Mock Stripe service
jest.mock('@/lib/stripe/service', () => ({
  stripeService: {
    createCheckoutSession: jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test' }),
    createPortalSession: jest.fn().mockResolvedValue({ url: 'https://billing.stripe.com/test' }),
    getActiveSubscription: jest.fn().mockResolvedValue(null)
  }
}))

// Mock subscription hook
jest.mock('@/lib/hooks/useSubscription', () => ({
  useSubscription: jest.fn()
}))

// Mock window.location
const mockLocation = {
  assign: jest.fn()
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
})

describe('SubscriptionManager', () => {
  const mockUserId = 'user123'

  beforeEach(() => {
    jest.clearAllMocks()
    // Default to no subscription
    ;(useSubscription as jest.Mock).mockReturnValue({
      subscription: null,
      isLoading: false,
      error: null
    })
  })

  describe('Free User Flow', () => {
    it('displays upgrade options for free users', async () => {
      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/upgrade to premium/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /subscribe now/i })).toBeInTheDocument()
    })

    it('initiates Stripe checkout when clicking subscribe', async () => {
      render(<SubscriptionManager userId={mockUserId} />)

      const subscribeButton = screen.getByRole('button', { name: /subscribe now/i })
      await userEvent.click(subscribeButton)

      expect(window.location.assign).toHaveBeenCalledWith('https://checkout.stripe.com/test')
    })

    it('shows loading state during checkout initiation', async () => {
      render(<SubscriptionManager userId={mockUserId} />)

      const subscribeButton = screen.getByRole('button', { name: /subscribe now/i })
      await userEvent.click(subscribeButton)

      expect(screen.getByText(/redirecting to checkout/i)).toBeInTheDocument()
    })
  })

  describe('Premium User Flow', () => {
    beforeEach(() => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: {
          id: 'sub_123',
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        isLoading: false,
        error: null
      })
    })

    it('displays subscription management options for premium users', () => {
      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/premium subscription/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /manage subscription/i })).toBeInTheDocument()
    })

    it('shows subscription renewal date', () => {
      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/renews/i)).toBeInTheDocument()
    })

    it('opens Stripe portal when clicking manage subscription', async () => {
      render(<SubscriptionManager userId={mockUserId} />)

      const manageButton = screen.getByRole('button', { name: /manage subscription/i })
      await userEvent.click(manageButton)

      expect(window.location.assign).toHaveBeenCalledWith('https://billing.stripe.com/test')
    })
  })

  describe('Loading States', () => {
    it('shows loading state while fetching subscription status', () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: null,
        isLoading: true,
        error: null
      })

      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('displays error message when subscription check fails', () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: null,
        isLoading: false,
        error: 'Failed to load subscription status'
      })

      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/failed to load subscription status/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
    })

    it('handles Stripe checkout errors gracefully', async () => {
      const stripeService = require('@/lib/stripe/service').stripeService
      stripeService.createCheckoutSession.mockRejectedValueOnce(new Error('Checkout failed'))

      render(<SubscriptionManager userId={mockUserId} />)

      const subscribeButton = screen.getByRole('button', { name: /subscribe now/i })
      await userEvent.click(subscribeButton)

      expect(screen.getByText(/failed to initiate checkout/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })

    it('handles Stripe portal errors gracefully', async () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: {
          id: 'sub_123',
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        isLoading: false,
        error: null
      })

      const stripeService = require('@/lib/stripe/service').stripeService
      stripeService.createPortalSession.mockRejectedValueOnce(new Error('Portal failed'))

      render(<SubscriptionManager userId={mockUserId} />)

      const manageButton = screen.getByRole('button', { name: /manage subscription/i })
      await userEvent.click(manageButton)

      expect(screen.getByText(/failed to open billing portal/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })
  })

  describe('Subscription Status Changes', () => {
    it('handles subscription cancellation status', () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: {
          id: 'sub_123',
          status: 'canceled',
          current_period_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        isLoading: false,
        error: null
      })

      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/subscription ending/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /reactivate subscription/i })).toBeInTheDocument()
    })

    it('handles past due subscription status', () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: {
          id: 'sub_123',
          status: 'past_due',
          current_period_end: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        isLoading: false,
        error: null
      })

      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/payment past due/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /update payment method/i })).toBeInTheDocument()
    })
  })
})
