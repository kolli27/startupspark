# Deployment Guide

## Prerequisites
- Node.js 18.x or higher
- PostgreSQL database (via Supabase)
- Stripe account for payments
- Environment variables configured

## Environment Setup
Create a `.env.local` file with the following variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# AI Service
AI_API_KEY=your_ai_service_key
```

## Database Setup
1. Use Supabase as your database provider
2. Execute the schema files in `docs/supabase-schema-updated.sql`
3. Set up database policies for secure row-level security

## Local Development
1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Access the application at `http://localhost:3000`

## Production Deployment

### Build
1. Build the application:
```bash
npm run build
```

2. Test the production build locally:
```bash
npm run start
```

### Deployment Options

#### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

#### Manual Deployment
1. Choose a Node.js hosting provider
2. Set up environment variables
3. Upload built application
4. Configure reverse proxy if needed

### Post-Deployment Steps
1. Configure Stripe webhooks to point to `/api/stripe/webhook`
2. Set up monitoring endpoints
3. Verify all API endpoints are accessible
4. Test authentication flow
5. Monitor error logs and performance

## Security Considerations
- Enable CORS policies
- Set up rate limiting
- Configure proper SSL/TLS
- Review and update Supabase security policies
- Keep dependencies updated

## Monitoring
- Set up error tracking
- Configure performance monitoring
- Enable analytics tracking
- Monitor API usage and rate limits

## Troubleshooting
- Check logs for errors
- Verify environment variables
- Ensure database connections
- Test Stripe webhook functionality
- Validate authentication flow

## Maintenance
- Regular dependency updates
- Database backups
- Performance optimization
- Security patches
- API version management
