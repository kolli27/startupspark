import { NextRequest } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { POST } from '@/app/api/stripe/webhook/route'
import { stripeService } from '@/lib/stripe/service'

// Mock Stripe webhook event types
const mockCustomerSubscriptionCreated = {
  type: 'customer.subscription.created',
  data: {
    object: {
      id: 'sub_123',
      customer: 'cus_123',
      status: 'active',
      current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      items: {
        data: [{
          price: {
            id: 'price_123',
            product: 'prod_123'
          }
        }]
      }
    }
  }
}

const mockCustomerSubscriptionUpdated = {
  type: 'customer.subscription.updated',
  data: {
    object: {
      id: 'sub_123',
      customer: 'cus_123',
      status: 'active',
      cancel_at_period_end: true,
      current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
    }
  }
}

const mockCustomerSubscriptionDeleted = {
  type: 'customer.subscription.deleted',
  data: {
    object: {
      id: 'sub_123',
      customer: 'cus_123',
      status: 'canceled'
    }
  }
}

const mockPaymentFailed = {
  type: 'invoice.payment_failed',
  data: {
    object: {
      subscription: 'sub_123',
      customer: 'cus_123',
      payment_intent: 'pi_123'
    }
  }
}

// Mock dependencies
jest.mock('@supabase/auth-helpers-nextjs')
jest.mock('@/lib/stripe/service')

// Mock Stripe webhook signature verification
jest.mock('stripe', () => ({
  Stripe: jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn().mockImplementation((body, signature) => {
        if (!signature) throw new Error('No signature provided')
        return JSON.parse(body)
      })
    }
  }))
}))

describe('Stripe Webhook Handler', () => {
  let mockSupabase: any

  beforeEach(() => {
    jest.clearAllMocks()

    // Setup mock Supabase client
    mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { user_id: 'user_123' } })
    }
    ;(createRouteHandlerClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  const createMockRequest = (event: any) => {
    return new NextRequest('http://localhost/api/stripe/webhook', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'stripe-signature': 'mock_signature'
      }
    })
  }

  describe('Subscription Created', () => {
    it('handles new subscription creation', async () => {
      const request = createMockRequest(mockCustomerSubscriptionCreated)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions')
      expect(mockSupabase.update).toHaveBeenCalledWith({
        status: 'active',
        stripe_subscription_id: 'sub_123',
        current_period_end: expect.any(String)
      })
    })
  })

  describe('Subscription Updated', () => {
    it('handles subscription updates', async () => {
      const request = createMockRequest(mockCustomerSubscriptionUpdated)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions')
      expect(mockSupabase.update).toHaveBeenCalledWith({
        status: 'active',
        cancel_at_period_end: true,
        current_period_end: expect.any(String)
      })
    })
  })

  describe('Subscription Deleted', () => {
    it('handles subscription deletion', async () => {
      const request = createMockRequest(mockCustomerSubscriptionDeleted)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions')
      expect(mockSupabase.update).toHaveBeenCalledWith({
        status: 'canceled',
        canceled_at: expect.any(String)
      })
    })
  })

  describe('Payment Failed', () => {
    it('handles failed payments', async () => {
      const request = createMockRequest(mockPaymentFailed)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions')
      expect(mockSupabase.update).toHaveBeenCalledWith({
        status: 'past_due'
      })
    })
  })

  describe('Error Handling', () => {
    it('handles missing signature', async () => {
      const request = new NextRequest('http://localhost/api/stripe/webhook', {
        method: 'POST',
        body: JSON.stringify(mockCustomerSubscriptionCreated)
      })
      const response = await POST(request)

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('No signature')
        })
      )
    })

    it('handles database errors', async () => {
      mockSupabase.update.mockRejectedValueOnce(new Error('Database error'))
      const request = createMockRequest(mockCustomerSubscriptionCreated)
      const response = await POST(request)

      expect(response.status).toBe(500)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('Error processing webhook')
        })
      )
    })

    it('handles unknown event types', async () => {
      const request = createMockRequest({
        type: 'unknown.event',
        data: { object: {} }
      })
      const response = await POST(request)

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('Unhandled event type')
        })
      )
    })
  })

  describe('Customer Mapping', () => {
    it('handles customer lookup failures', async () => {
      mockSupabase.single.mockRejectedValueOnce(new Error('Customer not found'))
      const request = createMockRequest(mockCustomerSubscriptionCreated)
      const response = await POST(request)

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('Customer not found')
        })
      )
    })

    it('validates customer data', async () => {
      mockSupabase.single.mockResolvedValueOnce({ data: null })
      const request = createMockRequest(mockCustomerSubscriptionCreated)
      const response = await POST(request)

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('Customer not found')
        })
      )
    })
  })
})
