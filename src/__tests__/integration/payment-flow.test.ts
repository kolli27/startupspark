import { test, expect } from '@playwright/test';
import { stripe } from '@/lib/stripe/config';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe/config';

test.describe('Payment Flow Integration Tests', () => {
  let testUserId: string;

  test.beforeAll(async () => {
    // Create a test customer in Stripe
    const customer = await stripe.customers.create({
      email: `test-${Date.now()}@example.com`,
      metadata: {
        isTest: 'true'
      }
    });
    testUserId = customer.id;
  });

  test.afterAll(async () => {
    // Cleanup test customer
    if (testUserId) {
      await stripe.customers.del(testUserId);
    }
  });

  test('complete subscription flow - basic plan', async ({ page }) => {
    // Start from pricing page
    await page.goto('/pricing');
    
    // Click basic plan subscribe button
    await page.click('[data-testid="subscribe-basic"]');
    
    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/.*login/);
    
    // Login (implement test auth helper)
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'testpassword');
    await page.click('[data-testid="login-button"]');
    
    // Should redirect to checkout
    await expect(page).toHaveURL(/.*checkout/);
    
    // Fill payment details
    await page.fill('[data-testid="card-number"]', '4242424242424242');
    await page.fill('[data-testid="card-expiry"]', '12/25');
    await page.fill('[data-testid="card-cvc"]', '123');
    
    // Submit payment
    await page.click('[data-testid="submit-payment"]');
    
    // Should redirect to success page
    await expect(page).toHaveURL(/.*success/);
    
    // Verify subscription in Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: testUserId
    });
    expect(subscriptions.data.length).toBe(1);
    expect(subscriptions.data[0].status).toBe('active');
  });

  test('handles failed payment correctly', async ({ page }) => {
    await page.goto('/pricing');
    await page.click('[data-testid="subscribe-pro"]');
    
    // Use a card that will fail
    await page.fill('[data-testid="card-number"]', '4000000000000002');
    await page.fill('[data-testid="card-expiry"]', '12/25');
    await page.fill('[data-testid="card-cvc"]', '123');
    
    await page.click('[data-testid="submit-payment"]');
    
    // Should show error message
    await expect(page.locator('[data-testid="payment-error"]')).toBeVisible();
    
    // Should not create subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: testUserId
    });
    expect(subscriptions.data.length).toBe(0);
  });

  test('can upgrade subscription', async ({ page }) => {
    // Create initial basic subscription
    await stripe.subscriptions.create({
      customer: testUserId,
      items: [{ price: process.env.STRIPE_BASIC_PRICE_ID }]
    });

    await page.goto('/dashboard');
    await page.click('[data-testid="upgrade-subscription"]');
    
    // Select pro plan
    await page.click('[data-testid="select-pro"]');
    
    // Should show prorated amount
    await expect(page.locator('[data-testid="prorated-amount"]')).toBeVisible();
    
    // Confirm upgrade
    await page.click('[data-testid="confirm-upgrade"]');
    
    // Should show success message
    await expect(page.locator('[data-testid="upgrade-success"]')).toBeVisible();
    
    // Verify subscription was upgraded
    const subscriptions = await stripe.subscriptions.list({
      customer: testUserId
    });
    expect(subscriptions.data[0].items.data[0].price.id).toBe(process.env.STRIPE_PRO_PRICE_ID);
  });

  test('can cancel subscription', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('[data-testid="manage-subscription"]');
    await page.click('[data-testid="cancel-subscription"]');
    
    // Should show confirmation dialog
    await expect(page.locator('[data-testid="cancel-confirmation"]')).toBeVisible();
    
    await page.click('[data-testid="confirm-cancel"]');
    
    // Should show cancellation success
    await expect(page.locator('[data-testid="cancellation-success"]')).toBeVisible();
    
    // Verify subscription was cancelled
    const subscriptions = await stripe.subscriptions.list({
      customer: testUserId
    });
    expect(subscriptions.data[0].cancel_at_period_end).toBe(true);
  });
});
