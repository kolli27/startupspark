import type { Page, expect as PlaywrightExpect } from '@playwright/test';
import type { TestDataManager } from '@/__tests__/integration/test-environment';

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeEnabled(): Promise<R>;
      toHavePremiumFeatures(): Promise<R>;
      toBeSubscribed(): Promise<R>;
    }
  }

  namespace jest {
    interface Matchers<R> {
      toHavePremiumFeatures(): R;
      toBeSubscribed(): R;
    }
  }
}

declare module '@playwright/test' {
  interface Page {
    login(email: string, password: string): Promise<void>;
    setupTestData(): Promise<void>;
    cleanupTestData(): Promise<void>;
  }
}

declare module 'stripe' {
  interface Subscription {
    cancel_at_period_end: boolean;
  }
}

declare module '@testing-library/jest-dom' {
  export interface CustomMatchers<R = unknown> {
    toHavePremiumFeatures(): R;
    toBeSubscribed(): R;
  }
}

export interface TestUser {
  id: string;
  email: string;
  password: string;
  stripeCustomerId?: string;
}

export interface TestEnvironment {
  testDataManager: typeof TestDataManager;
  setupTestEnvironment(): Promise<void>;
  teardownTestEnvironment(): Promise<void>;
}

export interface TestCard {
  number: string;
  expiry: string;
  cvc: string;
}

export interface TestSubscription {
  id: string;
  customerId: string;
  status: string;
  priceId: string;
}

export interface TestFeatures {
  hasAdvancedAnalytics: boolean;
  hasTeamFeatures: boolean;
  hasApiAccess: boolean;
}

export interface TestConfig {
  baseURL: string;
  apiBaseURL: string;
  stripeWebhookSecret: string;
  testTimeout: number;
  retryCount: number;
}

export interface TestDataManagerConfig {
  cleanupTimeout: number;
  autoCleanup: boolean;
}

export interface TestBrowserConfig {
  headless: boolean;
  slowMo: number;
  viewport: {
    width: number;
    height: number;
  };
}

export interface TestMonitoringConfig {
  sentryDsn?: string;
  logflareApiKey?: string;
  logflareSourceId?: string;
}

export interface TestNotificationConfig {
  slackWebhookUrl?: string;
  discordWebhookUrl?: string;
}

export interface TestDebugConfig {
  debugTests: boolean;
  verboseLogs: boolean;
  saveFailedTestArtifacts: boolean;
}

export interface TestCIConfig {
  parallelTests: number;
  testShard: number;
  totalShards: number;
}
