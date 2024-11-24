import { stripe } from '@/lib/stripe/config';
import type { Page, expect as PlaywrightExpect } from '@playwright/test';

// Test environment configuration
export const TEST_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiBaseURL: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api` : 'http://localhost:3000/api',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test',
  testTimeout: 30000,
  retryCount: process.env.CI ? 2 : 0
};

// Test user types
interface TestUser {
  id: string;
  email: string;
  password: string;
  stripeCustomerId?: string;
}

// Test data management
export class TestDataManager {
  private static testUsers: TestUser[] = [];
  private static testSubscriptions: string[] = [];

  static async createTestUser(): Promise<TestUser> {
    const email = `test-${Date.now()}@example.com`;
    const password = 'testpassword';

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email,
      metadata: { isTest: 'true' }
    });

    const user: TestUser = {
      id: `test-${Date.now()}`,
      email,
      password,
      stripeCustomerId: customer.id
    };

    this.testUsers.push(user);
    return user;
  }

  static async createTestSubscription(customerId: string, priceId: string) {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata: { isTest: 'true' }
    });

    this.testSubscriptions.push(subscription.id);
    return subscription;
  }

  static async cleanup() {
    // Clean up subscriptions
    for (const subscriptionId of this.testSubscriptions) {
      try {
        // Cancel subscription at period end
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true
        });
      } catch (error) {
        console.error(`Failed to cancel test subscription ${subscriptionId}:`, error);
      }
    }

    // Clean up customers
    for (const user of this.testUsers) {
      if (user.stripeCustomerId) {
        try {
          await stripe.customers.del(user.stripeCustomerId);
        } catch (error) {
          console.error(`Failed to delete test customer ${user.stripeCustomerId}:`, error);
        }
      }
    }

    this.testUsers = [];
    this.testSubscriptions = [];
  }
}

// Page object models
export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string) {
    await this.page.goto(`${TEST_CONFIG.baseURL}/login`);
    await this.page.fill('[data-testid="email-input"]', email);
    await this.page.fill('[data-testid="password-input"]', password);
    await this.page.click('[data-testid="login-button"]');
    await this.page.waitForURL('**/dashboard');
  }
}

export class DashboardPage {
  constructor(private page: Page) {}

  async navigateToSubscription() {
    await this.page.click('[data-testid="subscription-settings"]');
    await this.page.waitForSelector('[data-testid="subscription-details"]');
  }

  async verifyPremiumFeatures() {
    await this.page.waitForSelector('[data-testid="premium-features"]');
    return {
      hasAdvancedAnalytics: await this.page.isVisible('[data-testid="advanced-analytics"]'),
      hasTeamFeatures: await this.page.isVisible('[data-testid="team-features"]'),
      hasApiAccess: await this.page.isVisible('[data-testid="api-access"]')
    };
  }
}

export class PaymentPage {
  constructor(private page: Page) {}

  async fillPaymentDetails(cardNumber: string, expiry: string, cvc: string) {
    const stripeFrame = this.page.frameLocator('iframe[name^="__privateStripeFrame"]');
    await stripeFrame.locator('[placeholder="Card number"]').fill(cardNumber);
    await stripeFrame.locator('[placeholder="MM / YY"]').fill(expiry);
    await stripeFrame.locator('[placeholder="CVC"]').fill(cvc);
  }

  async submitPayment() {
    await this.page.click('[data-testid="submit-payment"]');
  }
}

// Test utilities
export async function setupTestPageWithAuth(page: Page): Promise<TestUser> {
  const user = await TestDataManager.createTestUser();
  const loginPage = new LoginPage(page);
  await loginPage.login(user.email, user.password);
  return user;
}

export async function setupPremiumUser(page: Page): Promise<TestUser> {
  const user = await TestDataManager.createTestUser();
  if (user.stripeCustomerId) {
    await TestDataManager.createTestSubscription(
      user.stripeCustomerId,
      process.env.STRIPE_PRO_PRICE_ID!
    );
  }
  const loginPage = new LoginPage(page);
  await loginPage.login(user.email, user.password);
  return user;
}

// Test assertions
export function expectPremiumFeatures(page: Page) {
  return {
    async toBeEnabled() {
      const dashboard = new DashboardPage(page);
      const features = await dashboard.verifyPremiumFeatures();
      expect(features.hasAdvancedAnalytics).toBe(true);
      expect(features.hasTeamFeatures).toBe(true);
      expect(features.hasApiAccess).toBe(true);
    }
  };
}

// Custom matchers
declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeEnabled(): Promise<R>;
    }
  }
}

export function expectPaymentSuccess(page: Page) {
  return expect(page.locator('[data-testid="payment-success"]')).toBeVisible();
}

export function expectPaymentError(page: Page) {
  return expect(page.locator('[data-testid="payment-error"]')).toBeVisible();
}

// Test environment setup and teardown
export async function setupTestEnvironment() {
  // Set up test database if needed
  // Set up test Redis instance if needed
  // Set up test Stripe webhook endpoint if needed
}

export async function teardownTestEnvironment() {
  await TestDataManager.cleanup();
}
