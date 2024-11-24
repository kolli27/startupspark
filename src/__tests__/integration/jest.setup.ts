import '@testing-library/jest-dom';
import { stripe } from '@/lib/stripe/config';
import { TestDataManager, setupTestEnvironment, teardownTestEnvironment } from './test-environment';

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toHavePremiumFeatures(): R;
      toBeSubscribed(): R;
    }
  }
}

// Global test configuration
jest.setTimeout(30000);

// Mock external services
jest.mock('@/lib/stripe/config', () => ({
  stripe: {
    customers: {
      create: jest.fn(),
      del: jest.fn()
    },
    subscriptions: {
      create: jest.fn(),
      update: jest.fn(),
      list: jest.fn()
    },
    checkout: {
      sessions: {
        create: jest.fn()
      }
    }
  }
}));

// Custom matchers
expect.extend({
  toHavePremiumFeatures(received) {
    const features = [
      'advanced-analytics',
      'team-features',
      'api-access'
    ];

    const missingFeatures = features.filter(feature => 
      !received.querySelector(`[data-testid="${feature}"]`)
    );

    if (missingFeatures.length === 0) {
      return {
        message: () => 'Expected element not to have premium features',
        pass: true
      };
    } else {
      return {
        message: () => `Expected element to have premium features. Missing: ${missingFeatures.join(', ')}`,
        pass: false
      };
    }
  },

  toBeSubscribed(received) {
    const hasSubscription = received.querySelector('[data-testid="subscription-active"]');
    
    return {
      message: () => 
        hasSubscription
          ? 'Expected user not to be subscribed'
          : 'Expected user to be subscribed',
      pass: !!hasSubscription
    };
  }
});

// Test environment setup
beforeAll(async () => {
  await setupTestEnvironment();
});

// Clean up after each test
afterEach(async () => {
  await TestDataManager.cleanup();
  
  // Clear all mocks
  jest.clearAllMocks();
  
  // Clear localStorage
  localStorage.clear();
  
  // Reset any runtime configuration
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_mock';
  process.env.STRIPE_SECRET_KEY = 'sk_test_mock';
});

// Global teardown
afterAll(async () => {
  await teardownTestEnvironment();
});

// Mock Stripe test cards
export const TEST_CARDS = {
  valid: '4242424242424242',
  declined: '4000000000000002',
  insufficientFunds: '4000000000009995',
  expiredCard: '4000000000000069'
};

// Test helper functions
export function createTestSubscription(tier = 'basic') {
  return stripe.subscriptions.create({
    customer: 'cus_mock',
    items: [{ price: `price_mock_${tier}` }],
    metadata: { isTest: 'true' }
  });
}

export function mockStripeCheckoutSession(succeeded = true) {
  const mockSession = {
    id: 'cs_test_mock',
    url: 'https://checkout.stripe.com/mock',
    payment_status: succeeded ? 'paid' : 'unpaid'
  };

  (stripe.checkout.sessions.create as jest.Mock).mockResolvedValue(mockSession);
  return mockSession;
}

// Test data generators
export function generateTestUser() {
  return {
    email: `test-${Date.now()}@example.com`,
    password: 'testpassword',
    name: 'Test User'
  };
}

export function generateTestSubscription(tier = 'basic') {
  return {
    id: `sub_mock_${Date.now()}`,
    customer: 'cus_mock',
    status: 'active',
    items: {
      data: [{
        price: {
          id: `price_mock_${tier}`
        }
      }]
    }
  };
}
