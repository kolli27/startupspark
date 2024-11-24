import { test as base } from '@playwright/test';
import { stripe } from '@/lib/stripe/config';

// Extend base test with custom fixtures
export const test = base.extend({
  // Add authenticated page fixture
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', process.env.TEST_USER_EMAIL || 'test@example.com');
    await page.fill('[data-testid="password-input"]', process.env.TEST_USER_PASSWORD || 'testpassword');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');
    await use(page);
  },

  // Add premium user fixture
  premiumPage: async ({ page }, use) => {
    // Create test customer and subscription
    const customer = await stripe.customers.create({
      email: `test-${Date.now()}@example.com`,
      metadata: { isTest: 'true' }
    });

    await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRO_PRICE_ID }],
      metadata: { isTest: 'true' }
    });

    // Login as premium user
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', customer.email);
    await page.fill('[data-testid="password-input"]', 'testpassword');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');

    await use(page);

    // Cleanup
    await stripe.customers.del(customer.id);
  }
});

export { expect } from '@playwright/test';

// Helper functions
export async function createTestUser() {
  // Implement user creation logic
  return {
    email: `test-${Date.now()}@example.com`,
    password: 'testpassword'
  };
}

export async function cleanupTestUser(email: string) {
  // Implement user cleanup logic
}

export async function setupTestData() {
  // Set up any required test data
}

export async function cleanupTestData() {
  // Clean up test data
}

// Test environment setup
export async function setupTestEnvironment() {
  // Set up test database if needed
  // Set up test Redis instance if needed
  // Set up test Stripe webhook endpoint if needed
}

// Mock services
export const mockStripeService = {
  createCheckoutSession: async () => ({
    id: 'test_session',
    url: 'https://test-checkout.stripe.com'
  }),
  
  createPortalSession: async () => ({
    id: 'test_portal',
    url: 'https://test-portal.stripe.com'
  })
};

export const mockOpenAIService = {
  generateResponse: async () => ({
    text: 'Test AI response',
    usage: {
      prompt_tokens: 10,
      completion_tokens: 20,
      total_tokens: 30
    }
  })
};

// Test utilities
export function generateTestIdea() {
  return {
    name: `Test Idea ${Date.now()}`,
    description: 'A test business idea',
    targetMarket: 'Test market',
    skills: 'Test skills',
    investment: '$1000',
    challenges: 'Test challenges',
    steps: 'Test steps',
    metrics: 'Test metrics',
    validation: 'Test validation'
  };
}

export function generateTestUser() {
  return {
    email: `test-${Date.now()}@example.com`,
    password: 'testpassword',
    name: 'Test User'
  };
}

// Custom test assertions
export function expectSuccessNotification(page: any) {
  return expect(page.locator('[data-testid="success-notification"]')).toBeVisible();
}

export function expectErrorNotification(page: any) {
  return expect(page.locator('[data-testid="error-notification"]')).toBeVisible();
}

export function expectLoading(page: any) {
  return expect(page.locator('[data-testid="loading-indicator"]')).toBeVisible();
}

// Test environment variables
export const TEST_ENV = {
  STRIPE_TEST_PRICE_ID: 'price_test',
  TEST_USER_EMAIL: 'test@example.com',
  TEST_USER_PASSWORD: 'testpassword',
  API_TEST_KEY: 'test_api_key'
};
