#!/bin/bash

# Install core dependencies
npm install --save \
  @radix-ui/react-slot \
  @supabase/auth-helpers-nextjs \
  @testing-library/user-event \
  @upstash/ratelimit \
  @upstash/redis \
  class-variance-authority \
  clsx \
  framer-motion \
  ioredis \
  lucide-react \
  recharts \
  tailwind-merge

# Install dev dependencies
npm install --save-dev \
  @playwright/test \
  @types/jest \
  @types/node \
  @testing-library/jest-dom \
  @testing-library/react \
  @types/testing-library__jest-dom \
  jest \
  jest-environment-jsdom \
  ts-jest \
  typescript

# Install Playwright browsers
npx playwright install chromium firefox webkit

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

echo "Dependencies installation complete!"

# Run type check
echo "Running type check..."
npm run type-check
