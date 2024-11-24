import { test, expect } from '@playwright/test';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe/config';
import type { Page } from '@playwright/test';

async function loginAsPremiumUser(page: Page) {
  await page.goto('/login');
  await page.fill('[data-testid="email-input"]', 'premium@example.com');
  await page.fill('[data-testid="password-input"]', 'testpassword');
  await page.click('[data-testid="login-button"]');
  await expect(page).toHaveURL('/dashboard');
}

test.describe('Premium Features Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsPremiumUser(page);
  });

  test('verify AI idea generation limits', async ({ page }) => {
    await page.goto('/questionnaire');
    
    // Should show premium generation limit
    await expect(page.locator('[data-testid="generation-limit"]')).toContainText('50');
    
    // Generate multiple ideas
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="generate-idea"]');
      await expect(page.locator('[data-testid="idea-result"]')).toBeVisible();
    }
    
    // Should update usage counter
    await expect(page.locator('[data-testid="ideas-generated"]')).toContainText('3');
  });

  test('verify advanced analytics access', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should have access to advanced analytics
    await expect(page.locator('[data-testid="advanced-analytics"]')).toBeVisible();
    
    // Check specific premium analytics features
    await page.click('[data-testid="analytics-tab"]');
    await expect(page.locator('[data-testid="market-trends"]')).toBeVisible();
    await expect(page.locator('[data-testid="competitor-analysis"]')).toBeVisible();
    await expect(page.locator('[data-testid="performance-metrics"]')).toBeVisible();
  });

  test('verify idea export features', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Select an idea
    await page.click('[data-testid="idea-card"]');
    
    // Should have export options
    await expect(page.locator('[data-testid="export-pdf"]')).toBeVisible();
    await expect(page.locator('[data-testid="export-excel"]')).toBeVisible();
    
    // Test PDF export
    const downloadPromise = page.waitForEvent('download');
    await page.click('[data-testid="export-pdf"]');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('verify team collaboration features', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Access team settings
    await page.click('[data-testid="team-settings"]');
    
    // Should show team member management
    await expect(page.locator('[data-testid="team-members"]')).toBeVisible();
    
    // Add team member
    await page.click('[data-testid="add-member"]');
    await page.fill('[data-testid="member-email"]', 'teammate@example.com');
    await page.click('[data-testid="send-invite"]');
    
    // Should show pending invite
    await expect(page.locator('[data-testid="pending-invites"]')).toContainText('teammate@example.com');
  });

  test('verify custom branding features', async ({ page }) => {
    await page.goto('/dashboard/settings');
    
    // Should have branding options
    await expect(page.locator('[data-testid="branding-settings"]')).toBeVisible();
    
    // Upload custom logo
    const logoPath = 'test-assets/logo.png';
    await page.setInputFiles('[data-testid="logo-upload"]', logoPath);
    
    // Set brand colors
    await page.fill('[data-testid="primary-color"]', '#FF5733');
    await page.click('[data-testid="save-branding"]');
    
    // Should show success message
    await expect(page.locator('[data-testid="branding-success"]')).toBeVisible();
    
    // Verify branding applied
    await page.goto('/dashboard');
    const logo = page.locator('[data-testid="brand-logo"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', /\/uploads\/.*logo\.png$/);
  });

  test('verify API access', async ({ page, request }) => {
    await page.goto('/dashboard/api');
    
    // Should show API key management
    await expect(page.locator('[data-testid="api-keys"]')).toBeVisible();
    
    // Generate new API key
    await page.click('[data-testid="generate-key"]');
    const apiKey = await page.textContent('[data-testid="new-api-key"]');
    expect(apiKey).toBeTruthy();
    
    // Test API access
    const response = await request.post('/api/ai/generate', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        prompt: 'Test prompt'
      }
    });
    expect(response.ok()).toBeTruthy();
  });

  test('verify usage analytics', async ({ page }) => {
    await page.goto('/dashboard/usage');
    
    // Should show detailed usage metrics
    await expect(page.locator('[data-testid="usage-metrics"]')).toBeVisible();
    
    // Check specific metrics
    await expect(page.locator('[data-testid="api-calls"]')).toBeVisible();
    await expect(page.locator('[data-testid="storage-usage"]')).toBeVisible();
    await expect(page.locator('[data-testid="team-activity"]')).toBeVisible();
    
    // Test date range filtering
    await page.click('[data-testid="date-range"]');
    await page.click('[data-testid="last-30-days"]');
    await expect(page.locator('[data-testid="usage-graph"]')).toBeVisible();
  });
});
