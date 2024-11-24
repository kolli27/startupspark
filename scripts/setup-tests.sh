#!/bin/bash

# Install dependencies
npm install --save-dev \
  @playwright/test \
  @types/jest \
  @types/node \
  @testing-library/jest-dom \
  @testing-library/react \
  jest \
  jest-environment-jsdom \
  ts-jest \
  typescript

# Install Playwright browsers
npx playwright install

# Create test directories if they don't exist
mkdir -p src/__tests__/integration
mkdir -p src/__tests__/unit
mkdir -p test-results

# Copy test environment file if it doesn't exist
if [ ! -f .env.test ]; then
  cp src/__tests__/integration/test.env .env.test
fi

# Install global test dependencies
npm install -g playwright

# Verify installations
echo "Verifying installations..."

# Check TypeScript
echo "TypeScript version:"
npx tsc --version

# Check Jest
echo "Jest version:"
npx jest --version

# Check Playwright
echo "Playwright version:"
npx playwright --version

# Run TypeScript compiler to check for errors
echo "Running type check..."
npm run type-check

# Run test compilation
echo "Compiling tests..."
npx tsc -p src/__tests__/tsconfig.json --noEmit

echo "Test setup complete!"
