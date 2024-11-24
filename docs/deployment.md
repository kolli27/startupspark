# Deployment Guide

## Prerequisites

- Vercel account with appropriate permissions
- GitHub account with repository access
- Access to production environment variables
- Node.js 18.x or later

## Environment Variables

All production environment variables should be configured in Vercel's dashboard. These variables are referenced in `.env.production` and `vercel.json`.

### Required Environment Variables

```bash
# App
NEXT_PUBLIC_APP_URL=https://startupspark.com
NODE_ENV=production

# Database
DATABASE_URL=postgres://user:password@host:5432/startupspark_prod

# Authentication
NEXTAUTH_URL=https://startupspark.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_BASIC_PRICE_ID=price_live_basic
STRIPE_PRO_PRICE_ID=price_live_pro
STRIPE_ENTERPRISE_PRICE_ID=price_live_enterprise

# OpenAI
OPENAI_API_KEY=your-production-openai-key
OPENAI_ORG_ID=your-org-id

# Redis
REDIS_URL=redis://your-production-redis-url

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOGFLARE_API_KEY=your-logflare-key
LOGFLARE_SOURCE_ID=your-source-id
```

## CI/CD Pipeline

The CI/CD pipeline is configured using GitHub Actions (`.github/workflows/main.yml`). The pipeline:

1. Runs on push to main branch and pull requests
2. Validates code (linting, type checking, tests)
3. Builds the application
4. Deploys to Vercel (production) when merging to main
5. Sends notifications to Slack

### Required Secrets

Configure these secrets in GitHub repository settings:

```bash
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
SLACK_BOT_TOKEN=your-slack-bot-token
```

## Manual Deployment

If needed, you can deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Post-Deployment Verification

After deployment, verify:

1. Application loads correctly
2. Authentication works
3. API endpoints are responsive
4. Stripe integration is functional
5. AI features are working
6. Database connections are established
7. Redis caching is operational
8. Monitoring is active

## Rollback Procedure

If issues are detected:

1. Verify the issue in logs (Vercel dashboard)
2. If needed, rollback to previous deployment in Vercel dashboard
3. Investigate root cause using monitoring tools
4. Fix issues in development and follow normal deployment process

## Performance Monitoring

Monitor application performance using:

- Vercel Analytics
- Sentry for error tracking
- Logflare for log aggregation
- Custom monitoring endpoints

## Security Considerations

1. All production secrets are managed through Vercel
2. Environment variables are encrypted
3. Security headers are configured in `vercel.json`
4. API rate limiting is enabled
5. CORS policies are enforced

## Database Migrations

1. Backup production database
2. Run migrations using the migration script
3. Verify data integrity
4. Monitor for any issues

## Troubleshooting

Common issues and solutions:

1. Build failures
   - Check build logs in GitHub Actions
   - Verify environment variables
   - Check for dependency issues

2. Runtime errors
   - Check Sentry for error details
   - Review Vercel function logs
   - Verify environment variables

3. Performance issues
   - Check Vercel Analytics
   - Review Redis cache hit rates
   - Monitor database performance

## Contact

For deployment issues, contact:
- DevOps team: devops@startupspark.com
- Engineering lead: engineering@startupspark.com

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
