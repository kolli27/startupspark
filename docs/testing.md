# Testing Guide

## Overview

This document outlines the testing strategy and setup for StartuSpark. We use a combination of unit tests (Jest), integration tests (Playwright), and end-to-end tests to ensure application quality.

## Test Structure

```
src/__tests__/
├── integration/          # Integration tests
│   ├── payment-flow.test.ts
│   ├── premium-features.test.ts
│   ├── test-environment.ts
│   ├── test-setup.ts
│   └── test.env
├── unit/                # Unit tests
└── tsconfig.json        # Test-specific TypeScript config
```

## Running Tests

### All Tests
```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

### Integration Tests
```bash
npm run test:e2e        # Run all integration tests
npm run test:e2e:ui     # Run integration tests with UI
```

### Unit Tests
```bash
npm run test:unit       # Run unit tests
```

## Test Environment Setup

1. Install dependencies:
```bash
npm install
```

2. Set up test environment:
```bash
cp src/__tests__/integration/test.env .env.test
```

3. Configure test environment variables in `.env.test`

## Writing Tests

### Integration Tests

Integration tests use Playwright and should follow these patterns:

```typescript
import { test, expect } from '@playwright/test';
import { TestDataManager } from './test-environment';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup for each test
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

### Premium Features Testing

When testing premium features:

1. Use the `setupPremiumUser` utility
2. Verify feature access
3. Test usage limits
4. Verify upgrade flows

Example:
```typescript
test('premium user can access advanced features', async ({ page }) => {
  const user = await setupPremiumUser(page);
  await expectPremiumFeatures(page).toBeEnabled();
});
```

### Payment Flow Testing

When testing payment flows:

1. Use test card numbers
2. Mock Stripe responses
3. Verify subscription states
4. Test error scenarios

Example:
```typescript
test('handles successful payment', async ({ page }) => {
  await page.goto('/pricing');
  await fillPaymentDetails(page, TEST_CARDS.valid);
  await expectPaymentSuccess(page);
});
```

## Test Data Management

- Use `TestDataManager` for creating test data
- Clean up after tests
- Use unique identifiers for test data
- Avoid test data collisions

## CI/CD Integration

Tests are automatically run in GitHub Actions:

1. On pull requests
2. On merge to main
3. On release tags

Configuration is in `.github/workflows/main.yml`

## Best Practices

1. **Isolation**: Each test should be independent
2. **Clean Up**: Always clean up test data
3. **Meaningful Assertions**: Test behavior, not implementation
4. **Performance**: Keep tests fast and efficient
5. **Maintainability**: Follow DRY principles in test code

## Common Issues and Solutions

### Test Timeouts
- Increase timeout in `playwright.config.ts`
- Check for slow operations
- Consider using faster selectors

### Flaky Tests
- Add retry logic
- Use stable selectors
- Avoid timing dependencies
- Add proper waits

### Database Issues
- Use test database
- Clean up data
- Reset database state

## Monitoring Test Quality

1. Coverage Reports
```bash
npm run test:coverage
```

2. Test Performance
```bash
npm run test:perf
```

3. Flaky Tests
```bash
npm run test:flaky
```

## Adding New Tests

1. Create test file in appropriate directory
2. Follow existing patterns
3. Add to test suite
4. Update documentation

## Debugging Tests

1. Use UI Mode
```bash
npm run test:e2e:ui
```

2. Use Debug Mode
```bash
DEBUG=pw:api npm run test:e2e
```

3. Save Test Artifacts
```bash
SAVE_FAILED_TEST_ARTIFACTS=true npm test
```

## Contact

For testing issues or questions:
- Engineering Team: engineering@startupspark.com
- DevOps Team: devops@startupspark.com
