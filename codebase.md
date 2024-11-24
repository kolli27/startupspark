# .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# docs/api-documentation.md

```md
# API Documentation

## Authentication
All API endpoints require authentication via a valid session token. Authentication is handled through Supabase.

## Endpoints

### AI Generation
`POST /api/ai/generate`
- Generates AI recommendations based on user input
- Request Body: User input parameters
- Response: AI-generated recommendations

### Questionnaire
`POST /api/questionnaire/submit`
- Submits questionnaire responses
- Request Body: Questionnaire answers
- Response: Submission confirmation

`GET /api/questionnaire/responses/latest`
- Retrieves the user's latest questionnaire responses
- Response: Latest questionnaire responses

### Recommendations
`GET /api/recommendations`
- Retrieves all saved recommendations
- Response: List of recommendations

`POST /api/recommendations`
- Saves a new recommendation
- Request Body: Recommendation data
- Response: Saved recommendation

`PATCH /api/recommendations/[id]`
- Updates an existing recommendation
- Request Body: Updated recommendation data
- Response: Updated recommendation

`DELETE /api/recommendations/[id]`
- Deletes a recommendation
- Response: Deletion confirmation

### Stripe Integration
`POST /api/stripe/checkout`
- Creates a checkout session
- Request Body: Subscription plan details
- Response: Checkout session URL

`GET /api/stripe/subscription`
- Gets current subscription status
- Response: Subscription details

`POST /api/stripe/subscription`
- Creates a new subscription
- Request Body: Subscription details
- Response: New subscription information

`PUT /api/stripe/subscription`
- Updates subscription
- Request Body: Updated subscription details
- Response: Updated subscription information

`POST /api/stripe/webhook`
- Handles Stripe webhook events
- Request Body: Webhook event data
- Response: Event processing confirmation

### Monitoring
`POST /api/monitoring/analytics`
- Logs analytics events
- Request Body: Analytics data
- Response: Logging confirmation

`POST /api/monitoring/performance`
- Logs performance metrics
- Request Body: Performance data
- Response: Logging confirmation

`POST /api/monitoring/error`
- Logs error events
- Request Body: Error details
- Response: Logging confirmation

## Error Handling
All endpoints follow a consistent error handling pattern:
- 400: Bad Request - Invalid input
- 401: Unauthorized - Authentication required
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource doesn't exist
- 500: Internal Server Error - Server-side error

## Rate Limiting
API endpoints are subject to rate limiting to ensure service stability.

```

# docs/codebaseSummary.md

```md
# StartupSpark Codebase Summary

## Project Structure
\`\`\`
startupspark/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/           # Protected dashboard routes
│   ├── questionnaire/       # Interactive questionnaire
│   │   └── results/        # Results display
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── questionnaire/      # Questionnaire components
│   ├── payment/           # Payment components (planned)
│   └── ui/                # Shared UI components
├── lib/                    # Utility functions and shared logic
│   ├── supabase/          # Supabase client and utilities
│   ├── ai/                # AI integration logic
│   ├── recommendations/   # Recommendation handling
│   └── utils/             # Helper functions
├── types/                  # TypeScript type definitions
└── public/                # Static assets
\`\`\`

## Current Implementation Status

### 1. Core Features
- Authentication system implemented
- Basic questionnaire flow working
- Initial AI integration complete
- Basic recommendation storage

### 2. In Progress
- Enhanced questionnaire interface
  - Adding typing indicators
  - Implementing progress tracking
  - Adding section navigation
- AI service improvements
  - Rate limiting
  - Response caching
  - Error handling
- Payment system integration
  - Stripe setup
  - Subscription handling
- Dashboard enhancements
  - Statistics display
  - Idea management

## Architecture Decisions

### 1. Server Components First
- Default to React Server Components
- Use 'use client' only for interactive components
- Leverage Next.js App Router features

### 2. Data Flow
- Supabase for real-time data and authentication
- Server-side API routes for sensitive operations
- Client-side state management with React hooks
- Optimistic updates for better UX

### 3. AI Integration
- Separate AI logic in dedicated service
- Rate limiting and error handling (in progress)
- Caching for common responses (planned)
- Streaming for real-time responses

### 4. Authentication Flow
- Supabase Auth for user management
- Protected routes with middleware
- Persistent sessions
- Role-based access control

### 5. Payment Integration (Planned)
- Stripe for payment processing
- Webhook handling for subscription events
- Secure payment flow
- Premium feature gating

## Component Architecture

### 1. Layout Components
- Responsive design system
- Mobile-first approach
- Consistent spacing and typography
- Shared navigation components

### 2. Feature Components
- Modular design
- Clear separation of concerns
- Reusable patterns
- Error boundary implementation (in progress)

### 3. UI Components
- Shadcn/ui integration
- Custom theme support
- Accessibility built-in
- Loading state handling (in progress)

## State Management

### 1. Server State
- Database queries via Supabase
- API route handlers
- Server-side caching (planned)
- Error handling

### 2. Client State
- React hooks for local state
- Form state management
- UI state (modals, dropdowns)
- Navigation state

## Security Measures

### 1. Authentication
- Secure session management
- CSRF protection
- Rate limiting (in progress)
- Input validation

### 2. Data Protection
- Data encryption
- Secure API endpoints
- Environment variable protection
- XSS prevention

## Development Guidelines

### 1. Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component naming conventions

### 2. Git Workflow
- Feature branch workflow
- Pull request templates
- Commit message conventions
- Code review guidelines

### 3. Documentation
- Component documentation
- API documentation
- Setup instructions
- Deployment guides

```

# docs/critical-path-tests.md

```md
# Critical Path Tests - Implementation Status

## 1. Questionnaire Flow ✅

### Form Validation ✅
- [x] Text input validation
- [x] Yes/No question validation
- [x] Scale question validation (1-5)
- [x] Multiple choice validation
- [x] Error message display
- [x] Form submission handling

### Progress Tracking ✅
- [x] Section progression
- [x] Progress percentage calculation
- [x] Question state management
- [x] Answer persistence

### Response Submission ✅
- [x] Database integration
- [x] User association
- [x] Error handling
- [x] Validation error handling

### Profile Updates ✅
- [x] Completion status tracking
- [x] Profile creation/updates

## 2. AI Recommendations Flow ✅

### Generation Process ✅
- [x] Business Ideas generation
- [x] Follow-up Questions (Premium)
- [x] Actionable Suggestions (Premium)
- [x] Market Insights (Premium)

### Rate Limiting ✅
- [x] Free tier limits
- [x] Premium tier access
- [x] Error handling
- [x] Upgrade prompts

### Recommendation Storage ✅
- [x] Save functionality
- [x] Retrieval
- [x] Access control

## 3. Subscription Flow ✅

### Stripe Integration ✅
- [x] Checkout process
- [x] Session handling
- [x] Payment processing
- [x] Webhook handling

### Subscription Status ✅
- [x] Status verification
- [x] Feature access control
- [x] Subscription level recognition
- [x] Status updates

### Payment Handling ✅
- [x] Success flow
- [x] Cancel flow
- [x] Error handling
- [x] Retry mechanisms

### Error Recovery ✅
- [x] Payment failures
- [x] System failures
- [x] State recovery
- [x] User notifications

## Test Coverage Summary

### Components Tested
- QuestionCard
- AIRecommendations
- SubscriptionManager
- Stripe Webhook Handler

### Key Scenarios Covered
1. User Input & Validation
   - Form submissions
   - Input validation
   - Error handling
   - Progress tracking

2. AI Integration
   - Recommendation generation
   - Premium feature access
   - Rate limiting
   - Error handling

3. Payment Processing
   - Checkout flow
   - Subscription management
   - Webhook processing
   - Error recovery

### Test Types Implemented
- Unit Tests
- Integration Tests
- API Tests
- Error Handling Tests

## Next Steps

1. Performance Testing
   - [ ] Load testing for AI endpoints
   - [ ] Stress testing for webhook handling
   - [ ] Response time benchmarking

2. End-to-End Testing
   - [ ] Complete user journey tests
   - [ ] Cross-browser testing
   - [ ] Mobile responsiveness testing

3. Security Testing
   - [ ] Authentication flow tests
   - [ ] Authorization tests
   - [ ] Data privacy compliance tests

## Test Maintenance Guidelines

1. Keep Tests Updated
   - Update tests when components change
   - Maintain mock data accuracy
   - Keep API versions in sync

2. Monitor Coverage
   - Maintain high coverage of critical paths
   - Add tests for new features
   - Update tests for bug fixes

3. Best Practices
   - Use meaningful test descriptions
   - Keep tests focused and atomic
   - Maintain mock data consistency
   - Document complex test scenarios

```

# docs/currentTask.md

```md
# Current Development Tasks

## Completed
1. Project Setup & Authentication
   - Next.js project with TypeScript ✓
   - TailwindCSS and Shadcn/ui ✓
   - Supabase configuration ✓
   - Basic authentication flow ✓
   - Base layout ✓

## In Progress

### Priority 1: Questionnaire Interface
1. Chat Interface Enhancements
   - Add typing indicators
   - Implement progress bar
   - Add section indicators
   - Enable answer modification

2. Question Flow Improvements
   - Enhance branching logic
   - Improve skip functionality
   - Add checkpoint system
   - Implement auto-save

### Priority 2: AI Integration
1. Enhanced AI Service
   - Implement rate limiting
   - Add caching layer
   - Improve error handling
   - Add idea formatting templates

2. Response Optimization
   - Enhance generation logic
   - Improve response parsing
   - Optimize storage system
   - Add retrieval caching

### Priority 3: Payment System
1. Stripe Integration
   - Set up payment processing
   - Configure webhooks
   - Implement subscription handling
   - Add usage limits

2. Premium Features
   - Implement feature gates
   - Add premium indicators
   - Create upgrade flows
   - Add limit notifications

### Priority 4: Dashboard Improvements
1. Enhanced Interface
   - Add statistics display
   - Implement idea grid with sorting/filtering
   - Add detailed idea views
   - Create sharing options

2. User Experience
   - Add loading skeletons
   - Implement proper error boundaries
   - Enhance mobile responsiveness
   - Add micro-animations

## Development Guidelines
- Commit code regularly with meaningful messages
- Test features as they're built
- Document code and decisions
- Keep the roadmap updated
- Follow TypeScript best practices
- Maintain consistent code style
- Use component-driven development
- Implement proper error handling

## Getting Started
1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Set up environment variables:
   - Copy .env.example to .env.local
   - Fill in required values
4. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Next Steps
1. Begin implementing typing indicators in the questionnaire interface
2. Add progress tracking components
3. Implement rate limiting for AI service
4. Set up caching layer for responses
5. Begin Stripe integration planning

```

# docs/deployment-guide.md

```md
# Deployment Guide

## Prerequisites
- Node.js 18.x or higher
- PostgreSQL database (via Supabase)
- Stripe account for payments
- Environment variables configured

## Environment Setup
Create a `.env.local` file with the following variables:
\`\`\`env
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
\`\`\`

## Database Setup
1. Use Supabase as your database provider
2. Execute the schema files in `docs/supabase-schema-updated.sql`
3. Set up database policies for secure row-level security

## Local Development
1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Access the application at `http://localhost:3000`

## Production Deployment

### Build
1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Test the production build locally:
\`\`\`bash
npm run start
\`\`\`

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

```

# docs/implementationGuide.md

```md
# StartupSpark Implementation Guide

## Project Overview
StartupSpark is an AI-powered business idea generation platform with a hybrid chat/game interface and freemium model.

## Development Timeline (7 Days MVP)

### Day 1: Project Setup & Authentication
1. Initial Setup
   \`\`\`bash
   npx create-next-app@latest startupspark --typescript --tailwind --app
   \`\`\`
2. Install Dependencies
   \`\`\`bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs shadcn-ui @stripe/stripe-js
   \`\`\`
3. Configure Supabase
   - Set up database using schema from techStack.md
   - Implement authentication flow
   - Create AuthContext provider

### Day 2: Questionnaire Interface
1. Build Core Components
   - Chat-like interface with game elements
   - Progress tracking
   - Question/answer components
2. Implement AI Integration
   - Set up GPT-4 service
   - Create prompt templates
   - Implement real-time follow-up questions

### Day 3: Ideas Generation & Storage
1. Create Ideas System
   - Implement idea generation logic
   - Build storage/retrieval system
   - Create bookmarking functionality
2. Build Ideas Dashboard
   - Grid/list view of ideas
   - Filtering/sorting
   - Detail view

### Day 4: Payment Integration
1. Stripe Setup
   - Configure products/prices
   - Implement checkout flow
   - Handle webhooks
2. Premium Features
   - Implement feature gates
   - Premium content previews
   - Upgrade prompts

### Day 5: User Experience
1. Polish Interface
   - Loading states
   - Error boundaries
   - Animations
   - Responsive design
2. User Dashboard
   - Profile management
   - Progress tracking
   - Settings

### Day 6: Landing Page & Marketing
1. Create Landing Page
   - Hero section
   - Feature highlights
   - Pricing section
   - Example premium ideas
2. Implement SEO
   - Metadata
   - Open Graph
   - Sitemap

### Day 7: Testing & Deployment
1. Testing
   - User flow testing
   - Payment testing
   - Error handling
2. Deployment
   - Vercel setup
   - Environment variables
   - Final checks

## Key Features

### Free Tier
- Complete questionnaire
- Generate 1 business idea
- Basic profile features
- Save progress

### Premium Tier ($9.99 one-time or $3.00/month annually)
- Generate 10 business ideas
- Regenerate ideas
- Detailed descriptions
- Priority queue
- Future: validation tools & guides

## Component Structure

### Pages
\`\`\`
src/app/
├── page.tsx (Landing)
├── (auth)/
│   ├── login/
│   └── signup/
├── dashboard/
├── questionnaire/
│   └── results/
└── ideas/
\`\`\`

### Components
\`\`\`
src/components/
├── auth/
├── questionnaire/
├── ideas/
├── payment/
├── ui/
└── layout/
\`\`\`

## Database Tables
- Users
- Profiles
- Ideas
- Questionnaire_Progress

## API Routes
- Authentication endpoints
- Questionnaire flow
- Ideas generation/management
- Payment processing

## Style Guide
\`\`\`css
/* Color Scheme */
--primary-500: #6366F1    /* Bright Indigo */
--primary-600: #4F46E5    /* Hover */
--primary-100: #E0E7FF    /* Backgrounds */
--accent-500: #EC4899     /* Pink */
--accent-100: #FCE7F3     /* Light Pink */
--yellow-500: #FCD34D     /* Achievements */
--green-500: #10B981     /* Success */
--gray-50: #F9FAFB       /* Background */
--gray-100: #F3F4F6      /* Card Background */
--gray-700: #374151      /* Text */
--gray-900: #111827      /* Headings */
\`\`\`

## Environment Setup
1. Create .env.local with variables from techStack.md
2. Set up Supabase project
3. Configure Stripe account
4. Set up GPT-4 API access

## Development Workflow
1. Work through daily tasks in order
2. Commit frequently with clear messages
3. Test features as they're completed
4. Document any deviations from plan

## Testing Checklist
- [ ] Authentication flow
- [ ] Questionnaire progression
- [ ] Idea generation
- [ ] Payment processing
- [ ] Premium features
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Loading states

## Deployment Checklist
- [ ] Environment variables
- [ ] Database migrations
- [ ] Stripe webhooks
- [ ] API routes
- [ ] Static assets
- [ ] SEO metadata
- [ ] Analytics setup

## Next Steps After MVP
1. Validation tools
2. Community features
3. Advanced analytics
4. Mobile app consideration

## Resources
- Next.js 14 Documentation
- Supabase Documentation
- Stripe Documentation
- GPT-4 API Documentation
- TailwindCSS Documentation
- Shadcn/ui Components

Remember to reference:
- projectRoadmap.md for detailed feature plans
- techStack.md for technical details
- supabase-schema.sql for database structure

```

# docs/projectRoadmap.md

```md
# StartupSpark Project Roadmap

## Project Overview
- **Name**: StartupSpark
- **Description**: A webapp that uses AI to help aspiring entrepreneurs find business ideas matching their passions, skillsets, and real-world problems
- **Value Proposition**: Personalized AI-driven idea generation tailored to each individual, versus predetermined ideas from existing products

## Current Status
- Basic authentication and user system implemented
- Core questionnaire interface in place
- Initial AI integration working
- Basic idea storage implemented

## Immediate Focus (Next 2 Weeks)

### Week 1: Core Experience Enhancement
1. Questionnaire Interface Polish
   - Typing indicators
   - Progress tracking
   - Section navigation
   - Answer modification
   - Auto-save functionality

2. AI Service Improvements
   - Rate limiting implementation
   - Response caching
   - Error handling enhancement
   - Idea formatting templates
   - Response optimization

### Week 2: Monetization & Polish
1. Payment System
   - Stripe integration
   - Subscription management
   - Premium feature gates
   - Usage tracking

2. Dashboard Enhancement
   - Statistics display
   - Idea grid with sorting/filtering
   - Detailed idea views
   - Sharing capabilities

3. User Experience Polish
   - Loading skeletons
   - Error boundaries
   - Mobile responsiveness
   - Micro-animations

## Future Phases

### Phase 2: Enhanced Features
1. Advanced Idea Generation
   - Multiple idea variations
   - Detailed market analysis
   - Competitor insights
   - Implementation roadmaps

2. Validation Tools
   - Market size estimation
   - Competitor analysis
   - Resource requirements
   - Risk assessment

### Phase 3: Community & Collaboration
1. Community Features
   - Idea sharing
   - Feedback system
   - Collaborative ideation
   - Expert insights

2. Analytics & Insights
   - Success metrics
   - Trend analysis
   - User behavior insights
   - Market predictions

## Target Users
- **Age Range**: Universal (anyone who wants to start a business)
- **Technical Proficiency**: Accessible to everyone
- **Target Groups**: Both complete beginners and those with business experience
- **Key Characteristics**:
  - Willing to spend money for ideation
  - Goals include side hustles or full-time businesses
  - Need help overcoming "this already exists" mindset
  - Seeking market knowledge and validation

## Design Guidelines
- **Interface**: Hybrid chat/game interface
- **Style**: Playful & Modern
- **Color Scheme**:
  \`\`\`css
  --primary-500: #6366F1    /* Bright Indigo */
  --primary-600: #4F46E5    /* Hover */
  --primary-100: #E0E7FF    /* Backgrounds */
  --accent-500: #EC4899     /* Pink */
  --accent-100: #FCE7F3     /* Light Pink */
  --yellow-500: #FCD34D     /* Achievements */
  --green-500: #10B981     /* Success */
  --gray-50: #F9FAFB       /* Background */
  --gray-100: #F3F4F6      /* Card Background */
  --gray-700: #374151      /* Text */
  --gray-900: #111827      /* Headings */
  \`\`\`

## Success Metrics
1. User Engagement
   - Completion rate of questionnaire
   - Time spent in application
   - Return user rate
   - Feature usage statistics

2. Business Metrics
   - Conversion to paid users
   - Monthly recurring revenue
   - User retention
   - Feature adoption rates

3. Product Quality
   - User satisfaction scores
   - Idea quality ratings
   - Support ticket volume
   - System performance metrics

```

# docs/quickStart.md

```md
# StartupSpark Quick-Start Guide

## Project Transfer Instructions

1. Save these key documents locally:
   - docs/implementationGuide.md (Main development guide)
   - docs/projectRoadmap.md (Feature roadmap)
   - docs/techStack.md (Technical specifications)

2. Create a new project in Claude:
   - Start a new chat
   - Share the saved documentation files
   - Begin with implementationGuide.md as your primary reference

## Key Project Information

### Core Concept
- AI-powered business idea generator
- Hybrid chat/game interface
- Freemium model with premium features

### Technical Stack
- Next.js 14 (App Router)
- Supabase (Auth + Database)
- GPT-4 API
- Stripe Integration
- TailwindCSS + Shadcn/ui

### Business Model
- Free Tier: 1 business idea
- Premium Tier: 
  - $9.99 one-time payment
  - $3.00/month paid annually
  - 10 business ideas + additional features

### Development Timeline
- 7-day MVP timeline
- Daily tasks outlined in implementationGuide.md
- Clear milestones and deliverables

## Getting Started

1. Environment Setup:
   \`\`\`bash
   npx create-next-app@latest startupspark --typescript --tailwind --app
   cd startupspark
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs shadcn-ui @stripe/stripe-js
   \`\`\`

2. Configuration:
   - Set up .env.local with required variables
   - Configure Supabase project
   - Set up Stripe account
   - Configure GPT-4 API access

3. Development Flow:
   - Follow daily tasks in implementationGuide.md
   - Reference projectRoadmap.md for feature details
   - Use techStack.md for technical specifications

4. Key Files to Create First:
   - src/app/layout.tsx (Root layout)
   - src/lib/supabase/config.ts (Supabase configuration)
   - src/lib/auth/AuthContext.tsx (Authentication context)
   - src/components/ui/* (Base UI components)

## Next Steps

1. Review implementationGuide.md thoroughly
2. Set up development environment
3. Begin with Day 1 tasks
4. Track progress against timeline
5. Test features as they're completed

Remember: The implementation guide provides a day-by-day breakdown of tasks and clear instructions for each feature. Use it as your primary reference during development.

```

# docs/stripe-setup-guide.md

```md
# Stripe Setup Guide

## Products and Prices Setup

1. Log in to your Stripe Dashboard
2. Navigate to Products > Add Product

### Premium Subscription Product

Create a new product with the following details:

\`\`\`
Name: Premium Subscription
Description: Get unlimited business ideas and advanced features
Default price: $9.99/month or $99/year
\`\`\`

Configuration steps:
1. Set the product name and description
2. Add two recurring prices:
   - Monthly: $9.99/month
   - Annual: $99/year (Save ~17%)
3. Set the lookup_key for both prices to "premium"
4. Enable tax collection if required
5. Save the product

## Environment Variables

Update your environment variables with the following Stripe configuration:

\`\`\`env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_ANNUAL_PRICE_ID=price_xxxxx
\`\`\`

## Webhook Configuration

1. In the Stripe Dashboard, go to Developers > Webhooks
2. Add a new endpoint with your application's webhook URL
3. Add the following events to listen for:
   - checkout.session.completed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded

## Usage-Based Billing (Optional)

If you want to implement usage-based billing:

1. Create a usage-based price for the Premium product
2. Configure the price with:
   - Usage type: Metered
   - Aggregation mode: Sum of usage during period
   - Price per unit: Set as needed
3. Update the webhook handler to track usage with `stripe.subscriptionItems.createUsageRecord`

## Testing

Use Stripe's test mode to verify the integration:

1. Test card numbers:
   - Success: 4242 4242 4242 4242
   - Decline: 4000 0000 0000 0002

2. Test webhook events:
   - Use the Stripe CLI to forward webhooks locally
   - Test each subscription event type
   - Verify usage tracking and limits

## Production Checklist

Before going live:

1. Verify all webhook endpoints are properly configured
2. Test the complete subscription lifecycle
3. Ensure error handling is robust
4. Set up monitoring for failed payments
5. Configure customer email notifications
6. Set up Stripe tax handling if required
7. Test the upgrade/downgrade flows
8. Verify usage limits are properly enforced

## Subscription Management

The system handles the following subscription states:

- Free tier (default)
- Premium active
- Premium canceled (remains active until period end)
- Premium past due
- Premium incomplete

Each state triggers appropriate usage limits and feature access.

## Usage Tracking

The system tracks:

1. Business idea generations
2. Market insights usage
3. Follow-up questions

Limits per tier:
- Free: 3 ideas/month, no advanced features
- Premium: Unlimited ideas and features

The usage tracking system automatically:
- Resets counters on renewal
- Enforces limits based on tier
- Updates usage statistics in real-time

```

# docs/supabase-schema-updated.sql

```sql
-- Original tables and policies from supabase-schema.sql
-- Create questionnaire_responses table
create table public.questionnaire_responses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  experience text not null,
  interests text not null,
  commitment text not null,
  resources text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on questionnaire_responses
alter table public.questionnaire_responses enable row level security;

-- Create policy to allow users to insert their own responses
create policy "Users can insert their own responses"
  on public.questionnaire_responses
  for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to view their own responses
create policy "Users can view their own responses"
  on public.questionnaire_responses
  for select
  using (auth.uid() = user_id);

-- Create user_profiles table with subscription fields
create table public.user_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  has_completed_questionnaire boolean default false,
  stripe_customer_id text unique,
  subscription_tier text check (subscription_tier in ('free', 'pro', 'enterprise')),
  subscription_status text check (subscription_status in ('active', 'trialing', 'past_due', 'canceled', 'incomplete')),
  subscription_period_start timestamp with time zone,
  subscription_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS on user_profiles
alter table public.user_profiles enable row level security;

-- Create policy to allow users to insert their own profile
create policy "Users can insert their own profile"
  on public.user_profiles
  for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to update their own profile
create policy "Users can update their own profile"
  on public.user_profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create policy to allow users to view their own profile
create policy "Users can view their own profile"
  on public.user_profiles
  for select
  using (auth.uid() = user_id);

-- Create saved_recommendations table
create table public.saved_recommendations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recommendation_type text not null check (recommendation_type in ('business_idea', 'follow_up', 'suggestion', 'insight')),
  content text not null,
  notes text,
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on saved_recommendations
alter table public.saved_recommendations enable row level security;

-- Create policy to allow users to insert their own recommendations
create policy "Users can insert their own recommendations"
  on public.saved_recommendations
  for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to update their own recommendations
create policy "Users can update their own recommendations"
  on public.saved_recommendations
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create policy to allow users to delete their own recommendations
create policy "Users can delete their own recommendations"
  on public.saved_recommendations
  for delete
  using (auth.uid() = user_id);

-- Create policy to allow users to view their own recommendations
create policy "Users can view their own recommendations"
  on public.saved_recommendations
  for select
  using (auth.uid() = user_id);

-- Create subscription_history table for tracking changes
create table public.subscription_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  stripe_subscription_id text not null,
  status text not null,
  tier text not null,
  period_start timestamp with time zone not null,
  period_end timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on subscription_history
alter table public.subscription_history enable row level security;

-- Create policy to allow users to view their own subscription history
create policy "Users can view their own subscription history"
  on public.subscription_history
  for select
  using (auth.uid() = user_id);

-- Create function to handle user profile creation on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profiles (
    user_id,
    subscription_tier,
    subscription_status
  )
  values (
    new.id,
    'free',
    'active'
  );
  return new;
end;
$$;

-- Create trigger to create user profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to update subscription status
create or replace function public.update_subscription_status()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Insert into subscription history
  insert into public.subscription_history (
    user_id,
    stripe_subscription_id,
    status,
    tier,
    period_start,
    period_end
  )
  values (
    new.user_id,
    new.stripe_customer_id,
    new.subscription_status,
    new.subscription_tier,
    new.subscription_period_start,
    new.subscription_period_end
  );
  return new;
end;
$$;

-- Create trigger for subscription status changes
create trigger on_subscription_updated
  after update of subscription_status, subscription_tier
  on public.user_profiles
  for each row
  when (old.subscription_status is distinct from new.subscription_status
    or old.subscription_tier is distinct from new.subscription_tier)
  execute procedure public.update_subscription_status();

```

# docs/supabase-schema.sql

```sql
-- Create questionnaire_responses table
create table public.questionnaire_responses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  experience text not null,
  interests text not null,
  commitment text not null,
  resources text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on questionnaire_responses
alter table public.questionnaire_responses enable row level security;

-- Create policy to allow users to insert their own responses
create policy "Users can insert their own responses"
  on public.questionnaire_responses
  for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to view their own responses
create policy "Users can view their own responses"
  on public.questionnaire_responses
  for select
  using (auth.uid() = user_id);

-- Create user_profiles table
create table public.user_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  has_completed_questionnaire boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS on user_profiles
alter table public.user_profiles enable row level security;

-- Create policy to allow users to insert their own profile
create policy "Users can insert their own profile"
  on public.user_profiles
  for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to update their own profile
create policy "Users can update their own profile"
  on public.user_profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create policy to allow users to view their own profile
create policy "Users can view their own profile"
  on public.user_profiles
  for select
  using (auth.uid() = user_id);

-- Create function to handle user profile creation on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profiles (user_id)
  values (new.id);
  return new;
end;
$$;

-- Create trigger to create user profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create saved_recommendations table
create table public.saved_recommendations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recommendation_type text not null check (recommendation_type in ('business_idea', 'follow_up', 'suggestion', 'insight')),
  content text not null,
  notes text,
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on saved_recommendations
alter table public.saved_recommendations enable row level security;

-- Create policy to allow users to insert their own recommendations
create policy "Users can insert their own recommendations"
  on public.saved_recommendations
  for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to update their own recommendations
create policy "Users can update their own recommendations"
  on public.saved_recommendations
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create policy to allow users to delete their own recommendations
create policy "Users can delete their own recommendations"
  on public.saved_recommendations
  for delete
  using (auth.uid() = user_id);

-- Create policy to allow users to view their own recommendations
create policy "Users can view their own recommendations"
  on public.saved_recommendations
  for select
  using (auth.uid() = user_id);

```

# docs/techStack.md

```md
# Technical Stack

## Core Technologies
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Shadcn/ui (UI components)

## Backend & Infrastructure
- Supabase
  - Authentication
  - Database
  - Real-time features
- GPT-4 API (AI integration)
- Vercel (Hosting)

## Payment Processing
- Stripe
  - One-time payment ($9.99)
  - Annual subscription ($3.00/month, paid yearly)

## Development Tools
- GitHub Codespaces
- Mailtrap (Email testing)

## Database Schema

### Users Table
\`\`\`sql
users (
  id uuid primary key,
  email text unique,
  created_at timestamp,
  last_login timestamp,
  is_premium boolean,
  subscription_type text,
  subscription_end_date timestamp
)
\`\`\`

### Profiles Table
\`\`\`sql
profiles (
  id uuid primary key,
  user_id uuid references users(id),
  questionnaire_progress jsonb,
  last_question_answered timestamp,
  completed_sections text[]
)
\`\`\`

### Ideas Table
\`\`\`sql
ideas (
  id uuid primary key,
  user_id uuid references users(id),
  content jsonb,
  created_at timestamp,
  is_premium boolean,
  is_bookmarked boolean,
  category text
)
\`\`\`

### Questionnaire_Progress Table
\`\`\`sql
questionnaire_progress (
  id uuid primary key,
  user_id uuid references users(id),
  section_id text,
  answers jsonb,
  last_updated timestamp
)
\`\`\`

## API Routes

### Authentication
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/session

### Questionnaire
- GET /api/questionnaire/next
- POST /api/questionnaire/answer
- PUT /api/questionnaire/modify
- GET /api/questionnaire/progress

### Ideas
- POST /api/ideas/generate
- GET /api/ideas/list
- PUT /api/ideas/bookmark
- GET /api/ideas/[id]

### Payment
- POST /api/payment/create-checkout
- POST /api/payment/webhook
- GET /api/payment/status

## Environment Variables
\`\`\`env
# Next.js
NEXT_PUBLIC_API_URL=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

```

# docs/usage-tracking.sql

```sql
-- Create usage_tracking table
create table public.usage_tracking (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  feature_name text not null,
  usage_count integer default 0,
  period_start timestamp with time zone not null,
  period_end timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on usage_tracking
alter table public.usage_tracking enable row level security;

-- Create policy to allow users to view their own usage
create policy "Users can view their own usage"
  on public.usage_tracking
  for select
  using (auth.uid() = user_id);

-- Create policy to allow service role to update usage
create policy "Service role can update usage"
  on public.usage_tracking
  for all
  using (auth.role() = 'service_role');

-- Create function to initialize usage tracking for new subscription period
create or replace function public.initialize_usage_tracking()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Initialize usage tracking for the new subscription period
  insert into public.usage_tracking (
    user_id,
    feature_name,
    usage_count,
    period_start,
    period_end
  )
  values
    (new.user_id, 'idea_generations', 0, new.subscription_period_start, new.subscription_period_end),
    (new.user_id, 'market_insights', 0, new.subscription_period_start, new.subscription_period_end),
    (new.user_id, 'follow_up_questions', 0, new.subscription_period_start, new.subscription_period_end);
  return new;
end;
$$;

-- Create trigger for initializing usage tracking
create trigger on_subscription_period_change
  after insert or update of subscription_period_end
  on public.user_profiles
  for each row
  when (
    old is null or 
    old.subscription_period_end is distinct from new.subscription_period_end
  )
  execute procedure public.initialize_usage_tracking();

-- Create function to increment feature usage
create or replace function public.increment_feature_usage(
  p_user_id uuid,
  p_feature_name text
)
returns void
language plpgsql
security definer
as $$
declare
  v_subscription_tier text;
  v_usage_limit integer;
  v_current_usage integer;
begin
  -- Get user's subscription tier
  select subscription_tier into v_subscription_tier
  from public.user_profiles
  where user_id = p_user_id;

  -- Set usage limit based on subscription tier
  v_usage_limit := case
    when v_subscription_tier = 'free' then
      case p_feature_name
        when 'idea_generations' then 3
        else 0
      end
    when v_subscription_tier = 'premium' then -1  -- Unlimited
    else 0
  end;

  -- Get current usage
  select usage_count into v_current_usage
  from public.usage_tracking
  where user_id = p_user_id
    and feature_name = p_feature_name
    and now() between period_start and period_end;

  -- Check if usage is within limits
  if v_usage_limit = -1 or v_current_usage < v_usage_limit then
    -- Increment usage
    update public.usage_tracking
    set usage_count = usage_count + 1,
        updated_at = now()
    where user_id = p_user_id
      and feature_name = p_feature_name
      and now() between period_start and period_end;
  else
    raise exception 'Usage limit exceeded for feature %', p_feature_name;
  end if;
end;
$$;

```

# docs/user-manual.md

```md
# User Manual

## Getting Started

### Account Setup
1. Visit the homepage and create an account
2. Complete your profile settings in the dashboard
3. Choose a subscription plan if required

## Main Features

### Questionnaire
The questionnaire helps gather information about your startup needs:
1. Navigate to the questionnaire page
2. Answer each question thoughtfully
3. Submit your responses
4. Review AI-generated recommendations
5. Save useful recommendations for later reference

### Dashboard

#### Profile Settings
- Update personal information
- Manage notification preferences
- Change password
- Configure account settings

#### Usage Statistics
- View API usage metrics
- Monitor recommendation generations
- Track questionnaire submissions
- Analyze usage patterns

#### Saved Recommendations
- Access previously saved recommendations
- Edit saved recommendations
- Delete unwanted recommendations
- Export recommendations

#### Export Features
- Export data in various formats
- Download usage reports
- Save recommendations as PDF
- Back up questionnaire responses

### Subscription Management
1. View available plans on the pricing page
2. Select desired subscription tier
3. Complete payment process
4. Manage subscription in dashboard
   - Upgrade/downgrade plan
   - Update payment method
   - View billing history

### AI Recommendations
- Generated based on questionnaire responses
- Customized to your specific needs
- Save useful recommendations
- Export recommendations for offline use

## Security

### Password Management
- Use strong passwords
- Enable two-factor authentication if available
- Reset password when needed
- Keep login credentials secure

### Data Privacy
- All data is encrypted
- Personal information is protected
- Choose data sharing preferences
- Request data export or deletion

## Troubleshooting

### Common Issues
1. Login Problems
   - Check email/password
   - Clear browser cache
   - Reset password if needed

2. Payment Issues
   - Verify payment method
   - Check subscription status
   - Contact support for billing questions

3. Feature Access
   - Confirm subscription status
   - Check account permissions
   - Review usage limits

### Support
- Email support available
- Check documentation
- Submit bug reports
- Request feature enhancements

## Best Practices
1. Regular Updates
   - Keep profile information current
   - Review saved recommendations
   - Update preferences as needed

2. Data Management
   - Export important data regularly
   - Review and clean saved recommendations
   - Update questionnaire responses when needed

3. Security
   - Regular password updates
   - Review account activity
   - Monitor usage statistics

```

# jest.config.js

```js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (if you're using them in your Next.js project)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.{js,jsx,ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

```

# jest.setup.js

```js
import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { TextEncoder, TextDecoder } from 'util'

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  STRIPE_SECRET_KEY: 'test_stripe_secret_key',
  STRIPE_WEBHOOK_SECRET: 'test_webhook_secret',
  STRIPE_PRICE_ID: 'test_price_id',
  NEXT_PUBLIC_BASE_URL: 'http://localhost:3000'
}

// Mock Next.js components/hooks
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
}))

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies() {
    return {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    }
  },
  headers() {
    return {
      get: jest.fn(),
    }
  },
}))

// Mock window.location
const mockLocation = {
  assign: jest.fn(),
  href: 'http://localhost:3000',
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

// Mock window.fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
)

// Mock TextEncoder/TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Request/Response
global.Request = class Request {
  constructor(input, init) {
    this.url = input
    this.method = init?.method || 'GET'
    this.headers = new Headers(init?.headers)
    this.body = init?.body
  }
}

global.Response = class Response {
  constructor(body, init) {
    this.ok = true
    this._body = body
    this.status = init?.status || 200
    this.headers = new Headers(init?.headers)
  }

  json() {
    return Promise.resolve(JSON.parse(this._body))
  }

  text() {
    return Promise.resolve(this._body)
  }
}

global.Headers = class Headers {
  constructor(init) {
    this._headers = new Map()
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this._headers.set(key.toLowerCase(), value)
      })
    }
  }

  get(name) {
    return this._headers.get(name.toLowerCase())
  }

  set(name, value) {
    this._headers.set(name.toLowerCase(), value)
  }
}

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})

// Add console.error spy to suppress expected errors
const originalError = console.error
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
      args[0].includes('Error: Uncaught [Error: expected]'))
  ) {
    return
  }
  originalError.call(console, ...args)
}

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# package.json

```json
{
  "name": "startupspark",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-navigation-menu": "^1.2.1",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@stripe/stripe-js": "^5.2.0",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.46.1",
    "@types/ioredis": "^4.28.10",
    "@upstash/ratelimit": "^2.0.4",
    "@upstash/redis": "^1.34.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "ioredis": "^5.4.1",
    "lucide-react": "^0.460.0",
    "next": "15.0.3",
    "openai": "^4.73.0",
    "react": "19.0.0-rc-66855b96-20241106",
    "react-dom": "19.0.0-rc-66855b96-20241106",
    "recharts": "^2.13.3",
    "stripe": "^17.4.0",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "web-vitals": "^4.2.4",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@babel/core": "^7.23.6",
    "@babel/plugin-syntax-import-attributes": "^7.26.0",
    "@babel/preset-env": "^7.23.6",
    "@babel/preset-react": "^7.23.6",
    "@babel/preset-typescript": "^7.23.6",
    "@testing-library/jest-dom": "^6.1.4",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/jest": "^29.5.10",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "babel-jest": "^29.7.0",
    "eslint": "^8",
    "eslint-config-next": "15.0.3",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5",
    "whatwg-fetch": "^3.6.20"
  }
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# README.md

```md
# StartupSpark

An AI-powered platform that helps aspiring entrepreneurs find business ideas matching their passions, skillsets, and real-world problems.

## Project Overview

StartupSpark uses advanced AI to generate personalized business ideas tailored to each individual's unique combination of skills, interests, and goals. Unlike existing solutions that offer predetermined ideas, our platform creates truly personalized suggestions backed by market validation.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **UI Components**: Shadcn/ui
- **Backend**: Supabase (Authentication, Database, Real-time features)
- **AI Integration**: GPT-4 API
- **Payment Processing**: Stripe
- **Deployment**: Vercel

## Development Progress

### ✅ Day 1: Project Setup & Initial Implementation

- [x] Initialize Next.js project with TypeScript
- [x] Configure TailwindCSS and custom theme
- [x] Set up project structure
- [x] Create base UI components
- [x] Implement landing page
- [ ] Set up Supabase client
- [ ] Configure authentication
- [ ] Create protected routes

### 🔄 Current Focus

- Authentication system implementation
- Questionnaire interface development
- Supabase integration

### 📅 Next Steps

1. Complete authentication flow
2. Build interactive questionnaire
3. Implement AI integration
4. Set up payment processing
5. Create dashboard interface

## Project Structure

\`\`\`
startupspark/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication routes
│   ├── (dashboard)/         # Protected dashboard routes
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── questionnaire/      # Questionnaire components
│   ├── ideas/             # Idea display components
│   ├── payment/           # Payment components
│   └── ui/                # Shared UI components
├── lib/                    # Utility functions
│   ├── supabase/          # Supabase client
│   ├── stripe/            # Stripe integration
│   ├── ai/                # AI integration
│   └── utils/             # Helper functions
└── types/                 # TypeScript types
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in required values
4. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Environment Variables

Required environment variables:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
\`\`\`

## Features

- 🎯 Personalized business idea generation
- 📊 Market validation and analysis
- 💡 Interactive questionnaire
- 📈 Real-time market insights
- 🔒 Secure authentication
- 💳 Premium features (subscription-based)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - see LICENSE file for details

```

# setup-database.sql

```sql
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS public.questionnaire_responses (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  experience text NOT NULL,
  interests text NOT NULL,
  commitment text NOT NULL,
  resources text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  has_completed_questionnaire boolean DEFAULT false,
  stripe_customer_id text UNIQUE,
  subscription_tier text CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  subscription_status text CHECK (subscription_status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete')),
  subscription_period_start timestamp with time zone,
  subscription_period_end timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS public.saved_recommendations (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recommendation_type text NOT NULL CHECK (recommendation_type IN ('business_idea', 'follow_up', 'suggestion', 'insight')),
  content text NOT NULL,
  notes text,
  is_favorite boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.subscription_history (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id text NOT NULL,
  status text NOT NULL,
  tier text NOT NULL,
  period_start timestamp with time zone NOT NULL,
  period_end timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  feature_name text NOT NULL,
  usage_count integer DEFAULT 0,
  period_start timestamp with time zone NOT NULL,
  period_end timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create monitoring tables
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  timestamp timestamp with time zone NOT NULL,
  event text NOT NULL,
  properties jsonb NOT NULL DEFAULT '{}'::jsonb,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.request_metrics (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  path text NOT NULL,
  method text NOT NULL,
  duration integer NOT NULL,
  timestamp timestamp with time zone NOT NULL,
  status_code integer,
  user_agent text,
  ip text,
  country text,
  authenticated boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for monitoring tables
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON public.analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event ON public.analytics_events(event);
CREATE INDEX IF NOT EXISTS idx_request_metrics_timestamp ON public.request_metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_request_metrics_path ON public.request_metrics(path);
CREATE INDEX IF NOT EXISTS idx_request_metrics_status_code ON public.request_metrics(status_code);

-- Enable RLS
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can insert their own responses"
  ON public.questionnaire_responses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own responses"
  ON public.questionnaire_responses
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recommendations"
  ON public.saved_recommendations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recommendations"
  ON public.saved_recommendations
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recommendations"
  ON public.saved_recommendations
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own recommendations"
  ON public.saved_recommendations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscription history"
  ON public.subscription_history
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own usage"
  ON public.usage_tracking
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can update usage"
  ON public.usage_tracking
  FOR ALL
  USING (auth.role() = 'service_role');

-- Monitoring RLS policies
CREATE POLICY "Service role can insert analytics events"
  ON public.analytics_events
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can view analytics events"
  ON public.analytics_events
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can insert request metrics"
  ON public.request_metrics
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can view request metrics"
  ON public.request_metrics
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Create functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    user_id,
    subscription_tier,
    subscription_status
  )
  VALUES (
    NEW.id,
    'free',
    'active'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_subscription_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Insert into subscription history
  INSERT INTO public.subscription_history (
    user_id,
    stripe_subscription_id,
    status,
    tier,
    period_start,
    period_end
  )
  VALUES (
    NEW.user_id,
    NEW.stripe_customer_id,
    NEW.subscription_status,
    NEW.subscription_tier,
    NEW.subscription_period_start,
    NEW.subscription_period_end
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.initialize_usage_tracking()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Initialize usage tracking for the new subscription period
  INSERT INTO public.usage_tracking (
    user_id,
    feature_name,
    usage_count,
    period_start,
    period_end
  )
  VALUES
    (NEW.user_id, 'idea_generations', 0, NEW.subscription_period_start, NEW.subscription_period_end),
    (NEW.user_id, 'market_insights', 0, NEW.subscription_period_start, NEW.subscription_period_end),
    (NEW.user_id, 'follow_up_questions', 0, NEW.subscription_period_start, NEW.subscription_period_end);
  RETURN NEW;
END;
$$;

-- Create triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

DROP TRIGGER IF EXISTS on_subscription_updated ON public.user_profiles;
CREATE TRIGGER on_subscription_updated
  AFTER UPDATE OF subscription_status, subscription_tier
  ON public.user_profiles
  FOR EACH ROW
  WHEN (OLD.subscription_status IS DISTINCT FROM NEW.subscription_status
    OR OLD.subscription_tier IS DISTINCT FROM NEW.subscription_tier)
  EXECUTE PROCEDURE public.update_subscription_status();

DROP TRIGGER IF EXISTS on_subscription_period_change ON public.user_profiles;
CREATE TRIGGER on_subscription_period_change
  AFTER INSERT OR UPDATE OF subscription_period_end
  ON public.user_profiles
  FOR EACH ROW
  WHEN (
    OLD IS NULL OR 
    OLD.subscription_period_end IS DISTINCT FROM NEW.subscription_period_end
  )
  EXECUTE PROCEDURE public.initialize_usage_tracking();

-- Create function to increment feature usage
CREATE OR REPLACE FUNCTION public.increment_feature_usage(
  p_user_id uuid,
  p_feature_name text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_subscription_tier text;
  v_usage_limit integer;
  v_current_usage integer;
BEGIN
  -- Get user's subscription tier
  SELECT subscription_tier INTO v_subscription_tier
  FROM public.user_profiles
  WHERE user_id = p_user_id;

  -- Set usage limit based on subscription tier
  v_usage_limit := CASE
    WHEN v_subscription_tier = 'free' THEN
      CASE p_feature_name
        WHEN 'idea_generations' THEN 3
        ELSE 0
      END
    WHEN v_subscription_tier = 'premium' THEN -1  -- Unlimited
    ELSE 0
  END;

  -- Get current usage
  SELECT usage_count INTO v_current_usage
  FROM public.usage_tracking
  WHERE user_id = p_user_id
    AND feature_name = p_feature_name
    AND now() BETWEEN period_start AND period_end;

  -- Check if usage is within limits
  IF v_usage_limit = -1 OR v_current_usage < v_usage_limit THEN
    -- Increment usage
    UPDATE public.usage_tracking
    SET usage_count = usage_count + 1,
        updated_at = now()
    WHERE user_id = p_user_id
      AND feature_name = p_feature_name
      AND now() BETWEEN period_start AND period_end;
  ELSE
    RAISE EXCEPTION 'Usage limit exceeded for feature %', p_feature_name;
  END IF;
END;
$$;

```

# src/__tests__/api/stripe/webhook.test.ts

```ts
import { NextRequest } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { POST } from '@/app/api/stripe/webhook/route'
import { stripeService } from '@/lib/stripe/service'

// Mock Stripe webhook event types
const mockCustomerSubscriptionCreated = {
  type: 'customer.subscription.created',
  data: {
    object: {
      id: 'sub_123',
      customer: 'cus_123',
      status: 'active',
      current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      items: {
        data: [{
          price: {
            id: 'price_123',
            product: 'prod_123'
          }
        }]
      }
    }
  }
}

const mockCustomerSubscriptionUpdated = {
  type: 'customer.subscription.updated',
  data: {
    object: {
      id: 'sub_123',
      customer: 'cus_123',
      status: 'active',
      cancel_at_period_end: true,
      current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
    }
  }
}

const mockCustomerSubscriptionDeleted = {
  type: 'customer.subscription.deleted',
  data: {
    object: {
      id: 'sub_123',
      customer: 'cus_123',
      status: 'canceled'
    }
  }
}

const mockPaymentFailed = {
  type: 'invoice.payment_failed',
  data: {
    object: {
      subscription: 'sub_123',
      customer: 'cus_123',
      payment_intent: 'pi_123'
    }
  }
}

// Mock dependencies
jest.mock('@supabase/auth-helpers-nextjs')
jest.mock('@/lib/stripe/service')

// Mock Stripe webhook signature verification
jest.mock('stripe', () => ({
  Stripe: jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn().mockImplementation((body, signature) => {
        if (!signature) throw new Error('No signature provided')
        return JSON.parse(body)
      })
    }
  }))
}))

describe('Stripe Webhook Handler', () => {
  let mockSupabase: any

  beforeEach(() => {
    jest.clearAllMocks()

    // Setup mock Supabase client
    mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { user_id: 'user_123' } })
    }
    ;(createRouteHandlerClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  const createMockRequest = (event: any) => {
    return new NextRequest('http://localhost/api/stripe/webhook', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'stripe-signature': 'mock_signature'
      }
    })
  }

  describe('Subscription Created', () => {
    it('handles new subscription creation', async () => {
      const request = createMockRequest(mockCustomerSubscriptionCreated)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions')
      expect(mockSupabase.update).toHaveBeenCalledWith({
        status: 'active',
        stripe_subscription_id: 'sub_123',
        current_period_end: expect.any(String)
      })
    })
  })

  describe('Subscription Updated', () => {
    it('handles subscription updates', async () => {
      const request = createMockRequest(mockCustomerSubscriptionUpdated)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions')
      expect(mockSupabase.update).toHaveBeenCalledWith({
        status: 'active',
        cancel_at_period_end: true,
        current_period_end: expect.any(String)
      })
    })
  })

  describe('Subscription Deleted', () => {
    it('handles subscription deletion', async () => {
      const request = createMockRequest(mockCustomerSubscriptionDeleted)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions')
      expect(mockSupabase.update).toHaveBeenCalledWith({
        status: 'canceled',
        canceled_at: expect.any(String)
      })
    })
  })

  describe('Payment Failed', () => {
    it('handles failed payments', async () => {
      const request = createMockRequest(mockPaymentFailed)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(mockSupabase.from).toHaveBeenCalledWith('subscriptions')
      expect(mockSupabase.update).toHaveBeenCalledWith({
        status: 'past_due'
      })
    })
  })

  describe('Error Handling', () => {
    it('handles missing signature', async () => {
      const request = new NextRequest('http://localhost/api/stripe/webhook', {
        method: 'POST',
        body: JSON.stringify(mockCustomerSubscriptionCreated)
      })
      const response = await POST(request)

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('No signature')
        })
      )
    })

    it('handles database errors', async () => {
      mockSupabase.update.mockRejectedValueOnce(new Error('Database error'))
      const request = createMockRequest(mockCustomerSubscriptionCreated)
      const response = await POST(request)

      expect(response.status).toBe(500)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('Error processing webhook')
        })
      )
    })

    it('handles unknown event types', async () => {
      const request = createMockRequest({
        type: 'unknown.event',
        data: { object: {} }
      })
      const response = await POST(request)

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('Unhandled event type')
        })
      )
    })
  })

  describe('Customer Mapping', () => {
    it('handles customer lookup failures', async () => {
      mockSupabase.single.mockRejectedValueOnce(new Error('Customer not found'))
      const request = createMockRequest(mockCustomerSubscriptionCreated)
      const response = await POST(request)

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('Customer not found')
        })
      )
    })

    it('validates customer data', async () => {
      mockSupabase.single.mockResolvedValueOnce({ data: null })
      const request = createMockRequest(mockCustomerSubscriptionCreated)
      const response = await POST(request)

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual(
        expect.objectContaining({
          error: expect.stringContaining('Customer not found')
        })
      )
    })
  })
})

```

# src/__tests__/payment/SubscriptionManager.test.tsx

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SubscriptionManager } from '@/components/payment/SubscriptionManager'
import { useSubscription } from '@/lib/hooks/useSubscription'

// Mock Stripe service
jest.mock('@/lib/stripe/service', () => ({
  stripeService: {
    createCheckoutSession: jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test' }),
    createPortalSession: jest.fn().mockResolvedValue({ url: 'https://billing.stripe.com/test' }),
    getActiveSubscription: jest.fn().mockResolvedValue(null)
  }
}))

// Mock subscription hook
jest.mock('@/lib/hooks/useSubscription', () => ({
  useSubscription: jest.fn()
}))

// Mock window.location
const mockLocation = {
  assign: jest.fn()
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
})

describe('SubscriptionManager', () => {
  const mockUserId = 'user123'

  beforeEach(() => {
    jest.clearAllMocks()
    // Default to no subscription
    ;(useSubscription as jest.Mock).mockReturnValue({
      subscription: null,
      isLoading: false,
      error: null
    })
  })

  describe('Free User Flow', () => {
    it('displays upgrade options for free users', async () => {
      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/upgrade to premium/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /subscribe now/i })).toBeInTheDocument()
    })

    it('initiates Stripe checkout when clicking subscribe', async () => {
      render(<SubscriptionManager userId={mockUserId} />)

      const subscribeButton = screen.getByRole('button', { name: /subscribe now/i })
      await userEvent.click(subscribeButton)

      expect(window.location.assign).toHaveBeenCalledWith('https://checkout.stripe.com/test')
    })

    it('shows loading state during checkout initiation', async () => {
      render(<SubscriptionManager userId={mockUserId} />)

      const subscribeButton = screen.getByRole('button', { name: /subscribe now/i })
      await userEvent.click(subscribeButton)

      expect(screen.getByText(/redirecting to checkout/i)).toBeInTheDocument()
    })
  })

  describe('Premium User Flow', () => {
    beforeEach(() => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: {
          id: 'sub_123',
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        isLoading: false,
        error: null
      })
    })

    it('displays subscription management options for premium users', () => {
      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/premium subscription/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /manage subscription/i })).toBeInTheDocument()
    })

    it('shows subscription renewal date', () => {
      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/renews/i)).toBeInTheDocument()
    })

    it('opens Stripe portal when clicking manage subscription', async () => {
      render(<SubscriptionManager userId={mockUserId} />)

      const manageButton = screen.getByRole('button', { name: /manage subscription/i })
      await userEvent.click(manageButton)

      expect(window.location.assign).toHaveBeenCalledWith('https://billing.stripe.com/test')
    })
  })

  describe('Loading States', () => {
    it('shows loading state while fetching subscription status', () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: null,
        isLoading: true,
        error: null
      })

      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('displays error message when subscription check fails', () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: null,
        isLoading: false,
        error: 'Failed to load subscription status'
      })

      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/failed to load subscription status/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
    })

    it('handles Stripe checkout errors gracefully', async () => {
      const stripeService = require('@/lib/stripe/service').stripeService
      stripeService.createCheckoutSession.mockRejectedValueOnce(new Error('Checkout failed'))

      render(<SubscriptionManager userId={mockUserId} />)

      const subscribeButton = screen.getByRole('button', { name: /subscribe now/i })
      await userEvent.click(subscribeButton)

      expect(screen.getByText(/failed to initiate checkout/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })

    it('handles Stripe portal errors gracefully', async () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: {
          id: 'sub_123',
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        isLoading: false,
        error: null
      })

      const stripeService = require('@/lib/stripe/service').stripeService
      stripeService.createPortalSession.mockRejectedValueOnce(new Error('Portal failed'))

      render(<SubscriptionManager userId={mockUserId} />)

      const manageButton = screen.getByRole('button', { name: /manage subscription/i })
      await userEvent.click(manageButton)

      expect(screen.getByText(/failed to open billing portal/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })
  })

  describe('Subscription Status Changes', () => {
    it('handles subscription cancellation status', () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: {
          id: 'sub_123',
          status: 'canceled',
          current_period_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        isLoading: false,
        error: null
      })

      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/subscription ending/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /reactivate subscription/i })).toBeInTheDocument()
    })

    it('handles past due subscription status', () => {
      (useSubscription as jest.Mock).mockReturnValue({
        subscription: {
          id: 'sub_123',
          status: 'past_due',
          current_period_end: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        isLoading: false,
        error: null
      })

      render(<SubscriptionManager userId={mockUserId} />)

      expect(screen.getByText(/payment past due/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /update payment method/i })).toBeInTheDocument()
    })
  })
})

```

# src/__tests__/questionnaire/AIRecommendations.test.tsx

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AIRecommendations } from '@/components/questionnaire/AIRecommendations'

// Mock hooks
jest.mock('@/lib/hooks/useSubscription', () => ({
  useIdeaGeneration: () => ({
    generateIdea: jest.fn(async (fn) => fn()),
    canGenerateIdea: true,
    ideasRemaining: 5
  }),
  useSubscription: () => ({
    isFeatureEnabled: (feature: string) => feature === 'business_idea',
    subscription: null
  })
}))

// Mock AI service
jest.mock('@/lib/ai/service', () => ({
  aiService: {
    generateBusinessIdeas: jest.fn().mockResolvedValue(`
      1. Tech Education Platform
      Create an online platform that teaches programming through interactive projects.
      The growing demand for tech education makes this a promising venture.
      
      2. Sustainability Consulting
      Help businesses reduce their environmental impact and implement green practices.
      Growing awareness of climate change drives demand for sustainability experts.
      
      3. Digital Wellness App
      Develop an app that helps remote workers maintain work-life balance.
      The rise of remote work creates opportunities in digital wellness.
    `),
    generateFollowUpQuestions: jest.fn().mockResolvedValue(`
      1. Market Research Questions
      What specific age group would be your target audience?
      Have you researched your main competitors?
      
      2. Implementation Questions
      What initial resources would you need?
      How would you validate your business idea?
    `),
    generateActionableSuggestions: jest.fn().mockResolvedValue(`
      1. Initial Steps
      Create a basic business plan
      Research potential competitors
      Identify target market demographics
      
      2. Validation Steps
      Build a minimum viable product
      Gather feedback from potential customers
      Test pricing models
    `),
    generateMarketInsights: jest.fn().mockResolvedValue(`
      1. Market Size
      The global edtech market is expected to reach $342.9B by 2025
      Remote work solutions market growing at 17% CAGR
      
      2. Key Trends
      Increasing demand for microlearning
      Rise of subscription-based learning platforms
      Growing focus on mobile-first education
    `)
  }
}))

describe('AIRecommendations', () => {
  const mockResponse = {
    id: '123',
    user_id: 'user123',
    experience: 'Intermediate',
    interests: 'Technology, Education',
    commitment: 'Full-time',
    resources: 'Limited initial investment',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('generates and displays business ideas', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Initial state should show loading
    expect(screen.getByText(/generating personalized recommendations/i)).toBeInTheDocument()

    // Wait for ideas to be generated
    expect(await screen.findByText('Tech Education Platform')).toBeInTheDocument()
    expect(screen.getByText('Sustainability Consulting')).toBeInTheDocument()
    expect(screen.getByText('Digital Wellness App')).toBeInTheDocument()
  })

  it('handles premium features correctly', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Click on Market Insights tab (premium feature)
    await userEvent.click(screen.getByRole('button', { name: /market insights/i }))

    // Should show premium upgrade message
    expect(screen.getByText(/upgrade to premium/i)).toBeInTheDocument()
    expect(screen.getByText(/premium feature/i)).toBeInTheDocument()
  })

  it('shows remaining idea generations for free users', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    expect(screen.getByText(/5 left/)).toBeInTheDocument()
  })

  it('allows saving recommendations', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Wait for ideas to be generated
    await screen.findByText('Tech Education Platform')

    // Each recommendation should have a save button
    const saveButtons = screen.getAllByRole('button', { name: /save/i })
    expect(saveButtons.length).toBeGreaterThan(0)
  })

  it('handles error states gracefully', async () => {
    // Mock AI service to throw an error
    jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockAiService = require('@/lib/ai/service').aiService
    mockAiService.generateBusinessIdeas.mockRejectedValueOnce(new Error('Generation failed'))

    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Should show error message
    expect(await screen.findByText(/failed to generate recommendations/i)).toBeInTheDocument()

    // Should show retry button
    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toBeInTheDocument()

    // Clicking retry should attempt generation again
    await userEvent.click(retryButton)
    expect(mockAiService.generateBusinessIdeas).toHaveBeenCalledTimes(2)
  })

  it('switches between recommendation types', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Wait for initial load
    await screen.findByText('Tech Education Platform')

    // Switch to Follow-up Questions tab
    await userEvent.click(screen.getByRole('button', { name: /follow-up questions/i }))
    expect(screen.getByText(/premium feature/i)).toBeInTheDocument()

    // Switch to Action Steps tab
    await userEvent.click(screen.getByRole('button', { name: /action steps/i }))
    expect(screen.getByText(/premium feature/i)).toBeInTheDocument()

    // Switch back to Business Ideas tab
    await userEvent.click(screen.getByRole('button', { name: /business ideas/i }))
    expect(screen.getByText('Tech Education Platform')).toBeInTheDocument()
  })
})

```

# src/__tests__/questionnaire/QuestionCard.test.tsx

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionCard, { QuestionCardProps } from '@/components/questionnaire/QuestionCard'

// Mock form validation
jest.mock('@/lib/utils/form-validation', () => ({
  validateFormData: jest.fn((_, { answer }) => ({
    success: Boolean(answer && answer.length > 0),
    data: { answer },
    errors: !answer || answer.length === 0 ? { answer: ['Answer is required'] } : {}
  }))
}))

describe('QuestionCard', () => {
  const mockOnSubmit = jest.fn()
  const mockOnNext = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Text Question Type', () => {
    const textQuestion: QuestionCardProps['question'] = {
      id: '1',
      text: 'What activities are you passionate about?',
      type: 'text',
      aiSuggestion: 'Think about activities that make you lose track of time.',
      followUpQuestion: 'What specifically excites you about these activities?'
    }

    it('renders text input with correct question', async () => {
      render(
        <QuestionCard
          question={textQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      expect(screen.getByText(textQuestion.text)).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Share your thoughts...')).toBeInTheDocument()
    })

    it('shows validation error for empty submission', async () => {
      render(
        <QuestionCard
          question={textQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      const submitButton = screen.getByRole('button', { name: /next question/i })
      await userEvent.click(submitButton)

      expect(await screen.findByText('Answer is required')).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('submits valid text answer', async () => {
      render(
        <QuestionCard
          question={textQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      const input = screen.getByPlaceholderText('Share your thoughts...')
      await userEvent.type(input, 'I love coding and building things')
      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(mockOnSubmit).toHaveBeenCalledWith('I love coding and building things')
      expect(mockOnNext).toHaveBeenCalled()
    })
  })

  describe('Yes/No Question Type', () => {
    const yesNoQuestion: QuestionCardProps['question'] = {
      id: '2',
      text: 'Would you prefer your business to align with your personal passions?',
      type: 'yes-no',
      aiSuggestion: 'Consider how combining passion with business could affect your motivation.'
    }

    it('renders yes/no options', async () => {
      render(
        <QuestionCard
          question={yesNoQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument()
    })

    it('submits selected yes/no answer', async () => {
      render(
        <QuestionCard
          question={yesNoQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      await userEvent.click(screen.getByRole('button', { name: /yes/i }))
      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(mockOnSubmit).toHaveBeenCalledWith(true)
      expect(mockOnNext).toHaveBeenCalled()
    })
  })

  describe('Scale Question Type', () => {
    const scaleQuestion: QuestionCardProps['question'] = {
      id: '3',
      text: 'How would you rate your comfort level with technology?',
      type: 'scale',
      aiSuggestion: '1 = Beginner, 5 = Expert'
    }

    it('renders scale options 1-5', async () => {
      render(
        <QuestionCard
          question={scaleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      ;[1, 2, 3, 4, 5].forEach(value => {
        expect(screen.getByRole('button', { name: value.toString() })).toBeInTheDocument()
      })
    })

    it('submits selected scale value', async () => {
      render(
        <QuestionCard
          question={scaleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      await userEvent.click(screen.getByRole('button', { name: '4' }))
      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(mockOnSubmit).toHaveBeenCalledWith(4)
      expect(mockOnNext).toHaveBeenCalled()
    })
  })

  describe('Multiple Choice Question Type', () => {
    const multipleQuestion: QuestionCardProps['question'] = {
      id: '4',
      text: 'Which skills would you like to leverage?',
      type: 'multiple',
      options: ['Technical', 'Design', 'Marketing', 'Writing']
    }

    it('renders all options with checkboxes', async () => {
      render(
        <QuestionCard
          question={multipleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      // Ensure options exist before testing
      if (multipleQuestion.options) {
        multipleQuestion.options.forEach(option => {
          expect(screen.getByLabelText(option)).toBeInTheDocument()
        })
      }
    })

    it('submits multiple selected options', async () => {
      render(
        <QuestionCard
          question={multipleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      // Ensure options exist before testing
      if (multipleQuestion.options) {
        await userEvent.click(screen.getByLabelText('Technical'))
        await userEvent.click(screen.getByLabelText('Marketing'))
        await userEvent.click(screen.getByRole('button', { name: /next question/i }))

        expect(mockOnSubmit).toHaveBeenCalledWith(['Technical', 'Marketing'])
        expect(mockOnNext).toHaveBeenCalled()
      }
    })

    it('shows validation error for no selection', async () => {
      render(
        <QuestionCard
          question={multipleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(await screen.findByText('At least one option must be selected')).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('AI Suggestions', () => {
    const questionWithSuggestion: QuestionCardProps['question'] = {
      id: '1',
      text: 'What activities are you passionate about?',
      type: 'text',
      aiSuggestion: 'Think about activities that make you lose track of time.'
    }

    it('displays AI suggestion when provided', async () => {
      render(
        <QuestionCard
          question={questionWithSuggestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      expect(screen.getByText(/AI Suggestion:/)).toBeInTheDocument()
      // Ensure aiSuggestion exists before testing
      if (questionWithSuggestion.aiSuggestion) {
        expect(screen.getByText(questionWithSuggestion.aiSuggestion)).toBeInTheDocument()
      }
    })
  })

  describe('Error Handling', () => {
    const textQuestion: QuestionCardProps['question'] = {
      id: '1',
      text: 'What activities are you passionate about?',
      type: 'text'
    }

    it('handles submission errors gracefully', async () => {
      const mockErrorSubmit = jest.fn().mockRejectedValue(new Error('Submission failed'))
      
      render(
        <QuestionCard
          question={textQuestion}
          onSubmit={mockErrorSubmit}
          onNext={mockOnNext}
        />
      )

      const input = screen.getByPlaceholderText('Share your thoughts...')
      await userEvent.type(input, 'Test answer')
      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(await screen.findByText('Failed to submit answer. Please try again.')).toBeInTheDocument()
    })
  })
})

```

# src/app/(auth)/login/page.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth/AuthContext"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, signIn, loading: authLoading } = useAuth()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Get the redirectTo from URL params or default to dashboard
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"

  // If user is already logged in, redirect to intended destination
  useEffect(() => {
    if (user && !authLoading) {
      console.log("Login: User already logged in, redirecting to:", redirectTo)
      window.location.href = redirectTo
    }
  }, [user, authLoading, redirectTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    console.log("Login: Attempting sign in for:", email)

    try {
      const { error, success } = await signIn(email, password)
      console.log("Login: Sign in result:", { error, success })

      if (error) {
        throw error
      }

      if (success) {
        console.log("Login: Sign in successful, redirecting to:", redirectTo)
        // Force a hard refresh to ensure the session is properly established
        window.location.href = redirectTo
      }
    } catch (err: any) {
      console.error("Login: Error in submit handler:", err)
      setError(
        err.message === "Invalid login credentials"
          ? "Invalid email or password"
          : err.message || "An error occurred while signing in"
      )
    } finally {
      setLoading(false)
    }
  }

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't show login form if user is already logged in
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                disabled={loading}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              variant="gradient"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            By signing in, you agree to our{" "}
            <Link 
              href="/terms" 
              className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
            >
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link 
              href="/privacy" 
              className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

```

# src/app/(auth)/password-reset/page.tsx

```tsx
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();

  // Get the hash from the URL (for reset confirmation)
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const isResetConfirmation = hash.includes('type=recovery');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isResetConfirmation) {
        // Set new password
        const { error } = await supabase.auth.updateUser({ password });
        
        if (error) throw error;
        
        setMessage('Password updated successfully. You can now log in with your new password.');
        setPassword('');
      } else {
        // Request password reset
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/password-reset#type=recovery`,
        });
        
        if (error) throw error;
        
        setMessage('Check your email for the password reset link.');
        setEmail('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isResetConfirmation ? 'Set New Password' : 'Reset Password'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
          {message && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{message}</div>
            </div>
          )}
          
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            {isResetConfirmation ? (
              <div>
                <label htmlFor="password" className="sr-only">New Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New password"
                  minLength={6}
                />
              </div>
            ) : (
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              {isResetConfirmation ? 'Update Password' : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

```

# src/app/(auth)/signup/page.tsx

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth/AuthContext"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const { error, success, confirmationRequired } = await signUp(email, password)
      if (error) throw error
      
      if (success) {
        if (confirmationRequired) {
          setSuccess(true)
        } else {
          // In development, we're auto-confirming emails
          router.push("/dashboard")
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent you a confirmation email. Please check your inbox and follow the instructions to complete your registration.
            </p>
          </div>
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Return to Sign In
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              variant="gradient"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

```

# src/app/api/ai/generate/route.ts

```ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { aiService } from '@/lib/ai/service'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { stream } = await request.json()

    // Get the latest questionnaire response for the user
    const { data: questionnaireData, error: questionnaireError } = await supabase
      .from('questionnaire_responses')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (questionnaireError || !questionnaireData) {
      return NextResponse.json(
        { error: 'No questionnaire response found' },
        { status: 400 }
      )
    }

    // Handle streaming response
    if (stream) {
      const encoder = new TextEncoder()
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of aiService.streamResponse(questionnaireData, 'ideas')) {
              controller.enqueue(encoder.encode(chunk))
            }
            controller.close()
          } catch (error: any) {
            controller.error(error)
          }
        },
      })

      return new Response(customReadable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    // Handle regular response
    try {
      // Generate all types of recommendations in parallel
      const [
        businessIdeas,
        followUpQuestions,
        actionableSuggestions,
        marketInsights
      ] = await Promise.all([
        aiService.generateBusinessIdeas(questionnaireData),
        aiService.generateFollowUpQuestions(questionnaireData),
        aiService.generateActionableSuggestions(questionnaireData),
        aiService.generateMarketInsights(questionnaireData)
      ])

      return NextResponse.json({
        data: {
          businessIdeas,
          followUpQuestions,
          actionableSuggestions,
          marketInsights
        }
      })
    } catch (error: any) {
      if (error.name === 'AIServiceError') {
        return NextResponse.json(
          { 
            error: error.message,
            code: error.code,
            retryAfter: error.retryAfter 
          },
          { 
            status: error.code === 'RATE_LIMIT' ? 429 : 
                    error.code === 'AUTH_ERROR' ? 401 :
                    error.code === 'INVALID_REQUEST' ? 400 : 500 
          }
        )
      }

      throw error
    }
  } catch (error: any) {
    console.error('Error generating AI recommendations:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

```

# src/app/api/monitoring/analytics/route.ts

```ts
import { NextResponse } from 'next/server';
import { AnalyticsEvent, RequestMetrics } from '@/lib/monitoring/types';
import { createClient } from '@/lib/supabase/config';
import { Database } from '@/types/database';

type Tables = Database['public']['Tables'];
type MonitoringPayload = AnalyticsEvent | RequestMetrics;

function formatAnalyticsEvent(event: AnalyticsEvent): Tables['analytics_events']['Insert'] {
  return {
    timestamp: event.timestamp,
    event: event.event,
    properties: event.properties as any,
    user_id: event.userId || null,
    session_id: event.sessionId || null,
    created_at: new Date().toISOString()
  };
}

function formatRequestMetrics(metrics: RequestMetrics): Tables['request_metrics']['Insert'] {
  return {
    path: metrics.path,
    method: metrics.method,
    duration: metrics.duration,
    timestamp: metrics.timestamp,
    status_code: metrics.statusCode || null,
    user_agent: metrics.userAgent || null,
    ip: metrics.ip || null,
    country: metrics.country || null,
    authenticated: metrics.authenticated || false,
    created_at: new Date().toISOString()
  };
}

export async function POST(request: Request) {
  try {
    const payload: MonitoringPayload = await request.json();
    const supabase = createClient();
    
    if ('duration' in payload) {
      const formattedMetrics = formatRequestMetrics(payload);
      const { error } = await supabase
        .from('request_metrics')
        .insert(formattedMetrics);
      if (error) throw error;
    } else {
      const formattedEvent = formatAnalyticsEvent(payload);
      const { error } = await supabase
        .from('analytics_events')
        .insert(formattedEvent);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track monitoring event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track monitoring event' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'analytics';
    const limit = parseInt(searchParams.get('limit') || '100');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    
    const supabase = createClient();
    const table = type === 'requests' ? 'request_metrics' : 'analytics_events';
    
    let query = supabase
      .from(table)
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (from) {
      query = query.gte('timestamp', from);
    }
    if (to) {
      query = query.lte('timestamp', to);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({ 
      success: true, 
      data,
      metadata: {
        count: data?.length || 0,
        from: from || 'beginning',
        to: to || 'now'
      }
    });
  } catch (error) {
    console.error('Failed to fetch monitoring data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch monitoring data' },
      { status: 500 }
    );
  }
}

```

# src/app/api/monitoring/error/route.ts

```ts
import { NextResponse } from 'next/server';
import { ErrorLog } from '@/lib/monitoring/types';
import { createClient } from '@/lib/supabase/config';
import { Database } from '@/types/database';

type ErrorLogInsert = Database['public']['Tables']['error_logs']['Insert'];
type Json = Database['public']['Tables']['error_logs']['Insert']['context'];

export async function POST(request: Request) {
  try {
    const errorLog: ErrorLog = await request.json();
    const supabase = createClient();
    
    // Convert context to proper JSON type
    const context: Json = {
      url: errorLog.context.url,
      userAgent: errorLog.context.userAgent,
      ...Object.fromEntries(
        Object.entries(errorLog.context)
          .filter(([key]) => key !== 'url' && key !== 'userAgent')
      )
    };

    const errorLogData: ErrorLogInsert = {
      severity: errorLog.severity,
      error_name: errorLog.error.name,
      error_message: errorLog.error.message,
      error_stack: errorLog.error.stack || null,
      context,
      timestamp: errorLog.timestamp,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('error_logs')
      .insert(errorLogData);

    if (error) throw error;

    if (errorLog.severity === 'critical') {
      // Send alert to monitoring service
      await fetch('/api/monitoring/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'error_alert',
          severity: 'critical',
          message: errorLog.error.message,
          context: errorLog.context
        })
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to log error' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity') as Database['public']['Tables']['error_logs']['Row']['severity'] | null;
    const limit = parseInt(searchParams.get('limit') || '100');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    
    const supabase = createClient();
    
    let query = supabase
      .from('error_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (severity) {
      query = query.eq('severity', severity);
    }
    if (from) {
      query = query.gte('timestamp', from);
    }
    if (to) {
      query = query.lte('timestamp', to);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({ 
      success: true, 
      data,
      metadata: {
        count: data?.length || 0,
        severity: severity || 'all',
        from: from || 'beginning',
        to: to || 'now'
      }
    });
  } catch (error) {
    console.error('Failed to fetch error logs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch error logs' },
      { status: 500 }
    );
  }
}

```

# src/app/api/monitoring/performance/route.ts

```ts
import { NextResponse } from 'next/server';
import { WebVitals } from '@/lib/monitoring/types';
import { createClient } from '@/lib/supabase/config';

export async function POST(request: Request) {
  try {
    const metrics: WebVitals[] = await request.json();
    const supabase = createClient();
    
    const aggregatedMetrics = metrics.map(metric => ({
      ...metric,
      timestamp: new Date().toISOString(),
      aggregated_value: metric.value * metric.delta
    }));

    const { error } = await supabase
      .from('performance_metrics')
      .insert(aggregatedMetrics);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log metrics:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```

# src/app/api/questionnaire/responses/latest/route.ts

```ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';
import { APIError, handleAPIError } from '@/lib/utils/api-error';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new APIError('Not authenticated', 401, 'UNAUTHORIZED');
    }

    // Fetch the latest questionnaire response for the user
    const { data: response, error: responsesError } = await supabase
      .from('questionnaire_responses')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (responsesError) {
      console.error('Error fetching response:', responsesError);
      throw new APIError('Failed to fetch questionnaire response', 500);
    }

    if (!response) {
      throw new APIError('No questionnaire response found', 404);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: response.id,
        experience: response.experience,
        interests: response.interests,
        commitment: response.commitment,
        resources: response.resources,
        created_at: response.created_at,
        updated_at: response.updated_at
      }
    });

  } catch (error) {
    return handleAPIError(error);
  }
}

```

# src/app/api/questionnaire/submit/route.ts

```ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';
import { APIError, handleAPIError } from '@/lib/utils/api-error';
import { z } from 'zod';
import { withSanitization, createSanitizedStringSchema } from '@/lib/utils/sanitize';

// Define schema for questionnaire submission
const QuestionnaireSchema = z.object({
  experience: createSanitizedStringSchema(z.string().min(1).max(1000)),
  interests: createSanitizedStringSchema(z.string().min(1).max(1000)),
  commitment: createSanitizedStringSchema(z.string().min(1).max(1000)),
  resources: createSanitizedStringSchema(z.string().min(1).max(1000))
});

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new APIError('Not authenticated', 401, 'UNAUTHORIZED');
    }

    // Parse, validate, and sanitize request data
    const sanitizedRequest = await withSanitization(QuestionnaireSchema)(request);
    const { experience, interests, commitment, resources } = sanitizedRequest.body;

    // Save sanitized data to database
    const { data, error } = await supabase
      .from('questionnaire_responses')
      .insert([{
        user_id: session.user.id,
        experience,
        interests,
        commitment,
        resources
      }])
      .select()
      .single();

    if (error) {
      throw new APIError('Failed to save questionnaire', 500, 'DATABASE_ERROR');
    }

    // Update user profile to mark questionnaire as completed
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({ has_completed_questionnaire: true })
      .eq('user_id', session.user.id);

    if (profileError) {
      console.error('Failed to update user profile:', profileError);
      // Don't throw here as the questionnaire was still saved successfully
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    return handleAPIError(error);
  }
}

export async function GET() {
  return handleAPIError(
    new APIError('Method not allowed', 405, 'METHOD_NOT_ALLOWED')
  );
}

```

# src/app/api/recommendations/[id]/route.ts

```ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// PATCH - Update a recommendation (e.g., toggle favorite, update notes)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updates = await request.json()

    const { data, error } = await supabase
      .from('saved_recommendations')
      .update(updates)
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update recommendation' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error updating recommendation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a recommendation
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('saved_recommendations')
      .delete()
      .eq('id', params.id)
      .eq('user_id', session.user.id)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete recommendation' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting recommendation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

```

# src/app/api/recommendations/route.ts

```ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET - Fetch user's saved recommendations
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('saved_recommendations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch recommendations' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Save a new recommendation
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { recommendation_type, content, notes } = await request.json()

    if (!recommendation_type || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('saved_recommendations')
      .insert({
        user_id: session.user.id,
        recommendation_type,
        content,
        notes
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to save recommendation' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error saving recommendation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

```

# src/app/api/shared-ideas/[id]/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server';
import { BusinessIdea } from '@/lib/ai/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In a real implementation, you would:
    // 1. Validate the share token/id
    // 2. Check if the share link has expired
    // 3. Fetch the idea from your database
    // 4. Check if the user has permission to view it
    
    // This is a placeholder implementation
    const mockIdea: BusinessIdea = {
      name: 'Shared Business Idea',
      description: 'This is a shared business idea that demonstrates the sharing functionality.',
      targetMarket: 'Small to medium-sized businesses',
      skills: 'Marketing, Business Development, Project Management',
      investment: '$10,000 - $50,000',
      challenges: 'Market competition, Initial customer acquisition',
      steps: '1. Market research\n2. Business plan development\n3. MVP creation',
      metrics: 'Customer acquisition cost, Monthly recurring revenue, User engagement',
      validation: 'Validated through customer interviews and market analysis',
      marketSize: '$500M annually',
      competitiveAdvantage: 'Unique value proposition and innovative approach',
      timeToMarket: '6-8 months',
      scalabilityPotential: 'High potential for international expansion',
      techRequirements: 'Web platform, Mobile app, Cloud infrastructure',
      regulatoryConsiderations: 'Standard business regulations apply'
    };

    // Add artificial delay to simulate database query
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(mockIdea);
  } catch (error) {
    console.error('Error fetching shared idea:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shared idea' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'save':
        // Save the idea to the user's collection
        return NextResponse.json({ success: true, message: 'Idea saved successfully' });

      case 'clone':
        // Create a copy of the idea for the user
        return NextResponse.json({ success: true, message: 'Idea cloned successfully' });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing shared idea action:', error);
    return NextResponse.json(
      { error: 'Failed to process action' },
      { status: 500 }
    );
  }
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the shared idea exists and is accessible
    // This is useful for validating share links without fetching the full idea
    
    // Placeholder implementation
    return new Response(null, {
      status: 200,
      headers: {
        'x-idea-exists': 'true',
        'x-idea-accessible': 'true'
      }
    });
  } catch (error) {
    console.error('Error checking shared idea:', error);
    return new Response(null, { status: 404 });
  }
}

```

# src/app/api/stripe/checkout/route.ts

```ts
import { NextResponse } from 'next/server'
import { STRIPE_CONFIG } from '@/lib/stripe/config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { StripeService } from '@/lib/stripe/service'

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { priceId, mode } = body

    // Validate price ID exists in our config
    const validPriceIds = [
      STRIPE_CONFIG.prices.premium.oneTime,
      STRIPE_CONFIG.prices.premium.subscription
    ]

    if (!priceId || !validPriceIds.includes(priceId)) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      )
    }

    // Validate payment mode
    if (!['payment', 'subscription'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid payment mode' },
        { status: 400 }
      )
    }

    const stripeService = new StripeService(supabase)
    const sessionId = await stripeService.createCheckoutSession(
      session.user.id,
      priceId,
      mode as 'payment' | 'subscription'
    )

    return NextResponse.json({ sessionId })

  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

```

# src/app/api/stripe/subscription/route.ts

```ts
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { StripeService } from '@/lib/stripe/service'

export async function GET(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const stripeService = new StripeService(supabase)
    const subscription = await stripeService.getSubscription(session.user.id)

    return NextResponse.json(subscription)

  } catch (error: any) {
    console.error('Subscription fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { action, returnUrl } = body

    const stripeService = new StripeService(supabase)

    switch (action) {
      case 'cancel':
        await stripeService.cancelSubscription(session.user.id)
        return NextResponse.json({ success: true })

      case 'reactivate':
        await stripeService.reactivateSubscription(session.user.id)
        return NextResponse.json({ success: true })

      case 'portal':
        if (!returnUrl) {
          return NextResponse.json(
            { error: 'Return URL is required' },
            { status: 400 }
          )
        }
        const portalUrl = await stripeService.createPortalSession(session.user.id, returnUrl)
        return NextResponse.json({ url: portalUrl })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error: any) {
    console.error('Subscription action error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process subscription action' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const stripeService = new StripeService(supabase)
    await stripeService.incrementIdeaUsage(session.user.id)

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Usage update error:', error)
    return NextResponse.json(
      { error: 'Failed to update usage' },
      { status: 500 }
    )
  }
}

```

# src/app/api/stripe/webhook/route.ts

```ts
import { NextResponse } from 'next/server'
import { 
  stripe, 
  STRIPE_WEBHOOK_SECRET, 
  SubscriptionTier,
  SUBSCRIPTION_TIERS,
  USAGE_LIMITS,
  GRACE_PERIODS
} from '@/lib/stripe/config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Stripe from 'stripe'
import { usageService } from '@/lib/usage/service'

interface SubscriptionData {
  status: string
  current_period_end: number
  cancel_at_period_end: boolean
  stripe_subscription_id?: string
  stripe_customer_id?: string
  subscription_tier: SubscriptionTier
  usage_limits?: typeof USAGE_LIMITS[SubscriptionTier]
}

// Custom event types
interface CustomUsageAlert {
  subscription: string
  type: string
  total_usage: number
}

function isCustomUsageAlert(obj: unknown): obj is CustomUsageAlert {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'subscription' in obj &&
    typeof (obj as any).subscription === 'string' &&
    'type' in obj &&
    typeof (obj as any).type === 'string' &&
    'total_usage' in obj &&
    typeof (obj as any).total_usage === 'number'
  )
}

async function updateUserSubscription(
  supabase: any,
  userId: string,
  subscriptionData: SubscriptionData
) {
  const { error } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: userId,
      stripe_subscription_id: subscriptionData.stripe_subscription_id,
      stripe_customer_id: subscriptionData.stripe_customer_id,
      subscription_status: subscriptionData.status,
      subscription_tier: subscriptionData.subscription_tier,
      subscription_period_start: new Date().toISOString(),
      subscription_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscriptionData.cancel_at_period_end,
      usage_limits: subscriptionData.usage_limits,
      updated_at: new Date().toISOString()
    })

  if (error) throw error

  // Reset usage tracking for new subscription period
  await usageService.resetUsage(userId)
}

async function handleSubscriptionChange(event: Stripe.Event, supabase: any) {
  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata.userId

  if (!userId) {
    console.error('No userId found in subscription metadata')
    return
  }

  const tier = subscription.metadata.tier as SubscriptionTier || SUBSCRIPTION_TIERS.basic
  const usageLimits = USAGE_LIMITS[tier]

  await updateUserSubscription(supabase, userId, {
    status: subscription.status,
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: subscription.cancel_at_period_end,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    subscription_tier: tier,
    usage_limits: usageLimits
  })

  // Send welcome email for new subscriptions
  if (event.type === 'customer.subscription.created') {
    await sendSubscriptionEmail(userId, 'welcome', tier)
  }
}

async function handlePaymentSuccess(event: Stripe.Event, supabase: any) {
  const session = event.data.object as Stripe.Checkout.Session
  const userId = session.metadata?.userId

  if (!userId) {
    console.error('No userId found in session metadata')
    return
  }

  // For subscription payments, ensure customer data is saved
  if (session.mode === 'subscription' && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    const tier = subscription.metadata.tier as SubscriptionTier || SUBSCRIPTION_TIERS.basic
    const usageLimits = USAGE_LIMITS[tier]
    
    await updateUserSubscription(supabase, userId, {
      status: subscription.status,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      subscription_tier: tier,
      usage_limits: usageLimits
    })
  }
}

async function handlePaymentFailed(event: Stripe.Event, supabase: any) {
  const invoice = event.data.object as Stripe.Invoice
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
  const userId = subscription.metadata.userId

  if (userId) {
    // Add grace period for payment failure
    const gracePeriodEnd = new Date()
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + GRACE_PERIODS.PAYMENT_FAILURE)

    await supabase
      .from('user_profiles')
      .update({
        payment_failure_grace_period_end: gracePeriodEnd.toISOString()
      })
      .eq('user_id', userId)

    // Send payment failure notification
    await sendSubscriptionEmail(userId, 'payment_failed', subscription.metadata.tier as SubscriptionTier)
  }
}

async function handleCustomUsageAlert(eventData: unknown, supabase: any) {
  if (!isCustomUsageAlert(eventData)) {
    console.error('Invalid usage alert data:', eventData)
    return
  }

  const subscription = await stripe.subscriptions.retrieve(eventData.subscription)
  const userId = subscription.metadata.userId
  const usageType = eventData.type
  const currentUsage = eventData.total_usage

  if (userId) {
    // Add grace period for usage overage
    const gracePeriodEnd = new Date()
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + GRACE_PERIODS.USAGE_OVERAGE)

    await supabase
      .from('user_profiles')
      .update({
        usage_overage_grace_period_end: gracePeriodEnd.toISOString()
      })
      .eq('user_id', userId)

    // Send usage limit notification
    await sendSubscriptionEmail(userId, 'usage_limit', subscription.metadata.tier as SubscriptionTier, {
      usageType,
      currentUsage
    })
  }
}

async function handleSubscriptionDeleted(event: Stripe.Event, supabase: any) {
  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata.userId

  if (!userId) {
    console.error('No userId found in subscription metadata')
    return
  }

  // Reset to basic tier
  await updateUserSubscription(supabase, userId, {
    status: 'canceled',
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: true,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    subscription_tier: SUBSCRIPTION_TIERS.basic,
    usage_limits: USAGE_LIMITS[SUBSCRIPTION_TIERS.basic]
  })

  // Send cancellation email
  await sendSubscriptionEmail(userId, 'cancelled', SUBSCRIPTION_TIERS.basic)
}

async function sendSubscriptionEmail(
  userId: string,
  type: 'welcome' | 'payment_failed' | 'usage_limit' | 'cancelled',
  tier: SubscriptionTier,
  data?: Record<string, any>
) {
  // Implementation for sending emails would go here
  // This could integrate with your email service provider
  console.log(`Sending ${type} email to ${userId} for tier ${tier}`, data)
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing required webhook configuration' },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    ) as Stripe.Event & { type: string }

    const supabase = createRouteHandlerClient({ cookies })

    // Handle standard Stripe events
    switch (event.type as Stripe.WebhookEndpointCreateParams.EnabledEvent) {
      case 'checkout.session.completed':
        await handlePaymentSuccess(event, supabase)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event, supabase)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event, supabase)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSuccess(event, supabase)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event, supabase)
        break

      default:
        // Handle non-standard events
        if ((event as any).type === 'customer.usage.alert') {
          await handleCustomUsageAlert(event.data.object, supabase)
        } else {
          console.log(`Unhandled event type: ${event.type}`)
        }
    }

    return NextResponse.json({ received: true })

  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    )
  }
}

// Stripe requires the raw body to construct the event
export const config = {
  api: {
    bodyParser: false
  }
}

```

# src/app/dashboard/page.tsx

```tsx
import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import UsageAnalytics from '@/components/dashboard/usage-analytics'
import SubscriptionManager from '@/components/dashboard/subscription-manager'
import { IdeaGrid } from '@/components/dashboard/idea-grid'
import { AnalyticsPanel } from '@/components/dashboard/analytics-panel'

export const metadata: Metadata = {
  title: 'Dashboard - StartupSpark',
  description: 'Manage your startup ideas and track your progress'
}

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Fetch user profile with subscription details
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {session.user.email}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here's an overview of your account and startup progress
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Subscription Status */}
              <SubscriptionManager userId={session.user.id} />

              {/* Usage Analytics */}
              <UsageAnalytics userId={session.user.id} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Analytics Overview */}
              <AnalyticsPanel userId={session.user.id} />

              {/* Recent Ideas */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Ideas</h2>
                </div>
                <div className="p-6">
                  <IdeaGrid userId={session.user.id} limit={5} />
                </div>
              </div>
            </div>
          </div>

          {/* Subscription CTA */}
          {(!profile?.subscription_tier || profile.subscription_tier === 'basic') && (
            <div className="mt-8 bg-indigo-50 rounded-lg shadow-sm">
              <div className="px-6 py-5 sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium text-indigo-900">
                    Upgrade to Pro
                  </h3>
                  <p className="mt-2 text-sm text-indigo-700">
                    Get access to advanced features and increased usage limits.
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-6">
                  <a
                    href="/pricing"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Plans
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/questionnaire"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">New Idea</p>
                <p className="text-sm text-gray-500">Generate a new startup idea</p>
              </div>
            </a>

            <a
              href="/dashboard/saved"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Saved Ideas</p>
                <p className="text-sm text-gray-500">View your saved ideas</p>
              </div>
            </a>

            <a
              href="/pricing"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Subscription</p>
                <p className="text-sm text-gray-500">Manage your plan</p>
              </div>
            </a>

            <a
              href="/contact"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Support</p>
                <p className="text-sm text-gray-500">Get help and support</p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

```

# src/app/debug/page.tsx

```tsx
'use client';

import { useState } from 'react';
import { logError, ErrorSeverity, trackEvent } from '@/lib/monitoring';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function DebugPage() {
  const analytics = useAnalytics();
  const [lastAction, setLastAction] = useState<string>('');

  const triggerError = () => {
    try {
      throw new Error('Test error from debug page');
    } catch (error) {
      logError(error as Error, ErrorSeverity.ERROR, {
        source: 'DebugPage',
        test: true
      });
      setLastAction('Error logged');
    }
  };

  const triggerAnalytics = () => {
    analytics.track('test_event', {
      source: 'DebugPage',
      timestamp: new Date().toISOString()
    });
    setLastAction('Analytics event tracked');
  };

  const triggerSlowOperation = async () => {
    const start = performance.now();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate slow operation
    const duration = performance.now() - start;
    
    analytics.track('slow_operation', {
      duration,
      source: 'DebugPage'
    });
    setLastAction('Slow operation completed');
  };

  const triggerCriticalError = () => {
    try {
      throw new Error('Critical test error');
    } catch (error) {
      logError(error as Error, ErrorSeverity.CRITICAL, {
        source: 'DebugPage',
        test: true
      });
      setLastAction('Critical error logged');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-4">Monitoring Debug Page</h1>
        
        {lastAction && (
          <div className="bg-blue-100 p-4 rounded mb-4">
            Last action: {lastAction}
          </div>
        )}

        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-2">Error Logging</h2>
            <div className="space-x-4">
              <button
                onClick={triggerError}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Trigger Error
              </button>
              <button
                onClick={triggerCriticalError}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Trigger Critical Error
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-2">Analytics</h2>
            <button
              onClick={triggerAnalytics}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Track Test Event
            </button>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-2">Performance</h2>
            <button
              onClick={triggerSlowOperation}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Trigger Slow Operation
            </button>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Note: Open the Debug Panel to see the monitoring events in real-time.</p>
        </div>
      </div>
    </div>
  );
}

```

# src/app/error.tsx

```tsx
'use client';

import { useEffect } from 'react';
import { logError, ErrorSeverityEnum, trackEvent } from '@/lib/monitoring';
import { Alert } from '@/components/ui/alert';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error with our monitoring system
    logError(error, 'ERROR', {
      component: 'RootError',
      digest: error.digest,
      timestamp: new Date().toISOString()
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <h2 className="text-lg font-semibold">Something went wrong!</h2>
          <p className="text-sm text-gray-500">
            {error.message || 'An unexpected error occurred'}
          </p>
        </Alert>
        <div className="flex gap-4">
          <button
            onClick={() => {
              trackEvent('error_retry', {
                errorMessage: error.message,
                errorDigest: error.digest,
                timestamp: new Date().toISOString()
              });
              reset();
            }}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try again
          </button>
          <button
            onClick={() => {
              trackEvent('error_home_redirect', {
                errorMessage: error.message,
                errorDigest: error.digest,
                timestamp: new Date().toISOString()
              });
              window.location.href = '/';
            }}
            className="flex-1 rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/fonts/GeistMonoVF.woff

This is a binary file of the type: Binary

# src/app/fonts/GeistVF.woff

This is a binary file of the type: Binary

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 215 25% 27%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 217 19% 27%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 200 13% 45%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 215 25% 27%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 200 13% 45%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent;
}

.gradient-border {
  @apply border-2 border-transparent relative;
  background: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent))) border-box;
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box, 
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) padding-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.gradient-bg {
  @apply bg-gradient-to-r from-primary via-secondary to-accent text-white hover:opacity-90 transition-opacity;
}

@keyframes subtle-float {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(15px, -15px) scale(1.05);
  }
  66% {
    transform: translate(-10px, 10px) scale(0.95);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(150px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(150px) rotate(-360deg);
  }
}

.animate-orbit {
  animation: orbit 20s linear infinite;
}

.animate-orbit-reverse {
  animation: orbit 25s linear infinite reverse;
}

.animate-float {
  animation: subtle-float 6s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.visual-element {
  @apply relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-primary/10;
  transition: all 0.3s ease;
}

.visual-element:hover {
  @apply border-primary/30 shadow-2xl -translate-y-1;
}

.orbit-element {
  @apply absolute p-4 bg-white/90 backdrop-blur-md shadow-xl rounded-xl border-2 border-primary/20;
  transition: all 0.3s ease;
}

.orbit-element:hover {
  @apply border-primary/40 shadow-2xl scale-110;
  z-index: 10;
}

```

# src/app/layout.tsx

```tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { measureWebVitals } from '@/lib/monitoring';
import DebugPanel from '@/components/debug/DebugPanel';
import { AuthProvider } from '@/lib/auth/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StartupSpark',
  description: 'Your AI-powered startup advisor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <DebugPanel />
        </AuthProvider>
      </body>
    </html>
  );
}

```

# src/app/page.tsx

```tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Rocket, Target, ArrowRight, Lightbulb, ChartBar, Users, Brain, TrendingUp } from "lucide-react"
import PricingSection from "@/components/pricing-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-2xl">StartupSpark</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="gradient-bg shadow-lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
                Discover Your Perfect{" "}
                <span className="gradient-text">Business Idea</span>
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl max-w-xl mb-12">
                Let AI help you uncover exciting business opportunities perfectly matched to your skills, interests, and market potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gradient-bg text-lg px-8 py-6 shadow-lg group"
                  asChild
                >
                  <Link href="/signup">
                    Find Your Idea
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 hover:bg-accent/5 border-2"
                  asChild
                >
                  <Link href="/questionnaire">Try Idea Generator</Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative h-[600px] hidden md:block">
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 visual-element w-48 h-48 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-sm">AI-Powered</p>
                  <p className="text-xs text-muted-foreground">Idea Generation</p>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/10">
                {/* Market Analysis */}
                <div className="orbit-element animate-orbit">
                  <ChartBar className="w-8 h-8 text-primary mb-1" />
                  <p className="text-sm font-medium">Market Analysis</p>
                  <p className="text-xs text-muted-foreground">Validate Potential</p>
                </div>

                {/* Target Audience */}
                <div className="orbit-element animate-orbit animation-delay-2000" style={{ animationDelay: "-6s" }}>
                  <Users className="w-8 h-8 text-accent mb-1" />
                  <p className="text-sm font-medium">Target Audience</p>
                  <p className="text-xs text-muted-foreground">Define Your Market</p>
                </div>

                {/* Growth Strategy */}
                <div className="orbit-element animate-orbit animation-delay-4000" style={{ animationDelay: "-12s" }}>
                  <TrendingUp className="w-8 h-8 text-secondary mb-1" />
                  <p className="text-sm font-medium">Growth Strategy</p>
                  <p className="text-xs text-muted-foreground">Scale Your Business</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-primary/20 animate-pulse"></div>
              <div className="absolute bottom-32 right-24 w-6 h-6 rounded-full bg-accent/20 animate-pulse animation-delay-2000"></div>
              <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-secondary/20 animate-pulse animation-delay-4000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Discovery",
                description: "Our AI analyzes your profile to discover untapped business opportunities perfect for you."
              },
              {
                icon: Target,
                title: "Market Potential",
                description: "Each idea comes with market analysis to ensure real business potential."
              },
              {
                icon: Rocket,
                title: "Actionable Path",
                description: "Get a clear roadmap to turn your chosen idea into a real business."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group p-8 rounded-xl border-2 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="h-0.5 w-0 group-hover:w-full mt-4 gradient-bg transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 StartupSpark. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

```

# src/app/payment/cancel/page.tsx

```tsx
import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Payment Cancelled - StartupSpark',
  description: 'Your payment has been cancelled'
}

async function CancelPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg
            className="h-16 w-16 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Payment Cancelled
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your payment was cancelled and no charges were made.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                What would you like to do?
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-4">
                <a
                  href="/pricing"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Try Again
                </a>
                <a
                  href="/dashboard"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Return to Dashboard
                </a>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Need help?
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  If you're experiencing issues or have questions,{' '}
                  <a
                    href="/contact"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    contact our support team
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancelPage

```

# src/app/payment/success/page.tsx

```tsx
import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { stripeService } from '@/lib/stripe/service'

export const metadata: Metadata = {
  title: 'Payment Successful - StartupSpark',
  description: 'Your payment has been processed successfully'
}

async function SuccessPage({
  searchParams
}: {
  searchParams: { session_id?: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // If no session_id is provided, redirect to dashboard
  if (!searchParams.session_id) {
    redirect('/dashboard')
  }

  // Get subscription details from Stripe
  const subscriptionDetails = await stripeService.getSubscriptionDetails(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg
            className="h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <circle
              className="opacity-25"
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M14 24l8 8 16-16"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Thank you for your subscription. Your account has been upgraded to{' '}
          <span className="font-semibold">
            {subscriptionDetails?.tier || 'premium'} tier
          </span>
          .
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                What's next?
              </h3>
              <ul className="mt-4 list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>Your subscription is now active</li>
                <li>You have access to all {subscriptionDetails?.tier || 'premium'} features</li>
                <li>You can start using the enhanced capabilities right away</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage

```

# src/app/pricing/page.tsx

```tsx
import { Metadata } from 'next'
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_FEATURES, USAGE_LIMITS } from '@/lib/stripe/config'
import { stripeService } from '@/lib/stripe/service'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Pricing - StartupSpark',
  description: 'Choose the perfect plan for your startup journey'
}

async function createCheckoutSession(userId: string, tier: keyof typeof SUBSCRIPTION_TIERS) {
  'use server'
  const session = await stripeService.createCheckoutSession(userId, tier)
  redirect(session.url)
}

async function PricingPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login?next=/pricing')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('subscription_tier, subscription_status')
    .eq('user_id', session.user.id)
    .single()

  const currentTier = profile?.subscription_tier || 'basic'
  const isActive = profile?.subscription_status === 'active'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Scale your startup journey with the perfect plan for your needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {/* Basic Plan */}
          <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Basic</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">$9</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 text-gray-500">Perfect for early-stage startups and solo founders.</p>

              <ul className="mt-6 space-y-4">
                {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.basic].features.map((feature) => (
                  <li key={feature} className="flex">
                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">
                    {USAGE_LIMITS[SUBSCRIPTION_TIERS.basic].ideaGenerations} idea generations/month
                  </span>
                </li>
              </ul>
            </div>

            <form action={() => createCheckoutSession(session.user.id, SUBSCRIPTION_TIERS.basic)}>
              <button
                type="submit"
                disabled={currentTier === SUBSCRIPTION_TIERS.basic && isActive}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  currentTier === SUBSCRIPTION_TIERS.basic && isActive
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {currentTier === SUBSCRIPTION_TIERS.basic && isActive ? 'Current Plan' : 'Get Started'}
              </button>
            </form>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 bg-white border border-indigo-200 rounded-2xl shadow-sm flex flex-col">
            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">$29</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 text-gray-500">For growing startups that need more power.</p>

              <ul className="mt-6 space-y-4">
                {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.pro].features.map((feature) => (
                  <li key={feature} className="flex">
                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">
                    {USAGE_LIMITS[SUBSCRIPTION_TIERS.pro].ideaGenerations} idea generations/month
                  </span>
                </li>
              </ul>
            </div>

            <form action={() => createCheckoutSession(session.user.id, SUBSCRIPTION_TIERS.pro)}>
              <button
                type="submit"
                disabled={currentTier === SUBSCRIPTION_TIERS.pro && isActive}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  currentTier === SUBSCRIPTION_TIERS.pro && isActive
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {currentTier === SUBSCRIPTION_TIERS.pro && isActive ? 'Current Plan' : 'Upgrade to Pro'}
              </button>
            </form>
          </div>

          {/* Enterprise Plan */}
          <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">$99</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 text-gray-500">For organizations that need unlimited capabilities.</p>

              <ul className="mt-6 space-y-4">
                {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.enterprise].features.map((feature) => (
                  <li key={feature} className="flex">
                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
                <li className="flex">
                  <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-gray-500">Unlimited idea generations</span>
                </li>
              </ul>
            </div>

            <form action={() => createCheckoutSession(session.user.id, SUBSCRIPTION_TIERS.enterprise)}>
              <button
                type="submit"
                disabled={currentTier === SUBSCRIPTION_TIERS.enterprise && isActive}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  currentTier === SUBSCRIPTION_TIERS.enterprise && isActive
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {currentTier === SUBSCRIPTION_TIERS.enterprise && isActive ? 'Current Plan' : 'Contact Sales'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Need a custom plan? <a href="/contact" className="text-indigo-600 hover:text-indigo-500">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PricingPage

```

# src/app/questionnaire/page.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/questionnaire/QuestionCard';
import { questions, QuestionnaireProgress } from '@/lib/questionnaire/questions';

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentProgress, setCurrentProgress] = useState<QuestionnaireProgress>(() => {
    // Try to load saved progress from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('questionnaireProgress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved progress:', e);
        }
      }
    }
    
    // Default initial state
    return {
      currentQuestionId: questions[0].id,
      answers: {},
      completed: false
    };
  });

  const currentQuestion = questions.find(q => q.id === currentProgress.currentQuestionId);

  const handleSubmit = async (answer: any, nextQuestionId: string | null) => {
    const newAnswers = {
      ...currentProgress.answers,
      [currentQuestion!.id]: answer
    };

    if (nextQuestionId) {
      // Move to next question
      setCurrentProgress({
        currentQuestionId: nextQuestionId,
        answers: newAnswers,
        completed: false
      });
    } else {
      // Questionnaire completed
      const finalProgress = {
        currentQuestionId: currentQuestion!.id,
        answers: newAnswers,
        completed: true
      };
      
      setCurrentProgress(finalProgress);
      localStorage.setItem('questionnaireProgress', JSON.stringify(finalProgress));
      
      // Navigate to results page
      router.push('/questionnaire/results');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>Question not found. Please try restarting the questionnaire.</p>
          <button
            onClick={() => {
              localStorage.removeItem('questionnaireProgress');
              setCurrentProgress({
                currentQuestionId: questions[0].id,
                answers: {},
                completed: false
              });
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Restart Questionnaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <QuestionCard
          question={currentQuestion}
          onSubmit={handleSubmit}
          currentProgress={currentProgress}
        />
      </div>
    </div>
  );
}

```

# src/app/questionnaire/results/page.tsx

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { questionnaireService } from '@/lib/questionnaire/service';
import { BusinessRecommendation } from '@/lib/types/questionnaire';
import { Alert } from '@/components/ui/alert';

export default function QuestionnaireResults() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<BusinessRecommendation[]>([]);

  useEffect(() => {
    async function loadResults() {
      try {
        setLoading(true);
        const responses = await questionnaireService.getLatestResponses();
        const recommendations = await questionnaireService.generateRecommendations(responses);
        setRecommendations(recommendations);
      } catch (err) {
        console.error('Error loading results:', err);
        setError('Failed to load your recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Analyzing your responses...
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We're generating personalized business recommendations based on your answers.
          </p>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Alert variant="destructive">
          <p>{error}</p>
        </Alert>
        <button
          onClick={() => router.push('/questionnaire')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry Questionnaire
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Business Recommendations
        </h1>

        <div className="space-y-8">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="bg-white rounded-lg shadow-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {recommendation.title}
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {recommendation.matchScore}% Match
                </span>
              </div>

              <p className="text-gray-600">{recommendation.description}</p>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Why This Fits You</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recommendation.reasons.map((reason, index) => (
                    <li key={index} className="text-gray-600">{reason}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {recommendation.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Investment & Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Estimated Startup Cost</p>
                    <p className="text-gray-900">
                      {recommendation.estimatedStartupCost.currency}
                      {recommendation.estimatedStartupCost.min.toLocaleString()} - 
                      {recommendation.estimatedStartupCost.max.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Break-even</p>
                    <p className="text-gray-900">{recommendation.timeline.breakeven}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-1">
                  {recommendation.nextSteps.map((step, index) => (
                    <li key={index} className="text-gray-600">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save & Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

```

# src/app/shared-ideas/[id]/page.tsx

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BusinessIdea } from '@/lib/ai/types';
import { SharedIdeaView } from '@/components/dashboard/shared-idea-view';

export default function SharedIdeaPage() {
  const params = useParams();
  const [idea, setIdea] = useState<BusinessIdea | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSharedIdea = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, you would decode the ID and fetch from your backend
        const decodedData = JSON.parse(atob(params.id as string));
        
        // Placeholder: Fetch idea details from your API
        const response = await fetch(`/api/shared-ideas/${decodedData.ideaId}`);
        if (!response.ok) {
          throw new Error('Failed to load shared idea');
        }
        
        const data = await response.json();
        setIdea(data);
      } catch (err) {
        console.error('Error loading shared idea:', err);
        setError('This shared idea link is invalid or has expired');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchSharedIdea();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="rounded-lg bg-white p-8 shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="mt-2 text-lg font-medium text-gray-900">
              Shared Idea Not Found
            </h2>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!idea) {
    return null;
  }

  const handleSave = async () => {
    // Implement save functionality
    console.log('Saving idea:', idea);
  };

  const handleClone = async () => {
    // Implement clone functionality
    console.log('Cloning idea:', idea);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedIdeaView
        idea={idea}
        onSave={handleSave}
        onClone={handleClone}
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      />
    </div>
  );
}

```

# src/components/auth/AuthProviderWrapper.tsx

```tsx
"use client"

import { AuthProvider } from "@/lib/auth/AuthContext"

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

```

# src/components/dashboard/analytics-panel.tsx

```tsx
import { FC } from 'react'

interface AnalyticsPanelProps {
  userId: string
}

export const AnalyticsPanel: FC<AnalyticsPanelProps> = ({ userId }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Analytics Overview</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ideas Generated */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Ideas Generated</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
            <p className="mt-1 text-sm text-gray-500">Last 30 days</p>
          </div>

          {/* Ideas Saved */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Ideas Saved</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
            <p className="mt-1 text-sm text-gray-500">Total saved ideas</p>
          </div>

          {/* AI Queries */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">AI Queries</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
            <p className="mt-1 text-sm text-gray-500">This month</p>
          </div>

          {/* Success Rate */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-500">Success Rate</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0%</dd>
            <p className="mt-1 text-sm text-gray-500">Ideas rated positively</p>
          </div>
        </div>

        {/* Placeholder for future analytics features */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            More detailed analytics coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

```

# src/components/dashboard/export-features.tsx

```tsx
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

interface ExportData {
  savedRecommendations: any[];
  questionnaireResponses: any[];
}

export function ExportFeatures() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const supabase = createClientComponentClient();

  const fetchUserData = async (): Promise<ExportData> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: recommendations } = await supabase
      .from('saved_recommendations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const { data: responses } = await supabase
      .from('questionnaire_responses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return {
      savedRecommendations: recommendations || [],
      questionnaireResponses: responses || [],
    };
  };

  const exportToJSON = async () => {
    try {
      setLoading(true);
      const data = await fetchUserData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'startupspark-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Data exported successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data' });
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      setLoading(true);
      const data = await fetchUserData();
      
      // Convert recommendations to CSV
      const recommendationsCSV = [
        ['Type', 'Content', 'Notes', 'Favorite', 'Created At'],
        ...data.savedRecommendations.map(rec => [
          rec.recommendation_type,
          rec.content,
          rec.notes || '',
          rec.is_favorite ? 'Yes' : 'No',
          new Date(rec.created_at).toLocaleDateString()
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      // Convert responses to CSV
      const responsesCSV = [
        ['Experience', 'Interests', 'Commitment', 'Resources', 'Created At'],
        ...data.questionnaireResponses.map(resp => [
          resp.experience,
          resp.interests,
          resp.commitment,
          resp.resources,
          new Date(resp.created_at).toLocaleDateString()
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      // Create and download recommendations CSV
      const recommendationsBlob = new Blob([recommendationsCSV], { type: 'text/csv' });
      const recommendationsUrl = URL.createObjectURL(recommendationsBlob);
      const recommendationsLink = document.createElement('a');
      recommendationsLink.href = recommendationsUrl;
      recommendationsLink.download = 'startupspark-recommendations.csv';
      document.body.appendChild(recommendationsLink);
      recommendationsLink.click();
      document.body.removeChild(recommendationsLink);
      URL.revokeObjectURL(recommendationsUrl);

      // Create and download responses CSV
      const responsesBlob = new Blob([responsesCSV], { type: 'text/csv' });
      const responsesUrl = URL.createObjectURL(responsesBlob);
      const responsesLink = document.createElement('a');
      responsesLink.href = responsesUrl;
      responsesLink.download = 'startupspark-responses.csv';
      document.body.appendChild(responsesLink);
      responsesLink.click();
      document.body.removeChild(responsesLink);
      URL.revokeObjectURL(responsesUrl);

      setMessage({ type: 'success', text: 'Data exported successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Export Your Data</h2>

      {message && (
        <Alert
          variant={message.type === 'success' ? 'default' : 'destructive'}
          className="mb-4"
        >
          {message.text}
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Export Options</h3>
          <p className="text-sm text-gray-500 mb-4">
            Download your saved ideas and questionnaire responses in your preferred format.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={exportToJSON}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Exporting...' : 'Export as JSON'}
          </Button>

          <Button
            variant="outline"
            onClick={exportToCSV}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Exporting...' : 'Export as CSV'}
          </Button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Your export will include:</p>
          <ul className="list-disc list-inside mt-2">
            <li>All saved business ideas and recommendations</li>
            <li>Your questionnaire responses</li>
            <li>Creation dates and notes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

```

# src/components/dashboard/idea-detail-view.tsx

```tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BusinessIdea } from '@/lib/ai/types';

interface IdeaDetailViewProps {
  idea: BusinessIdea;
  onClose: () => void;
  onShare?: () => void;
  className?: string;
}

export function IdeaDetailView({ idea, onClose, onShare, className = '' }: IdeaDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'execution'>('overview');
  const [isSharing, setIsSharing] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'market', label: 'Market Analysis' },
    { id: 'execution', label: 'Execution Plan' }
  ] as const;

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (onShare) {
        await onShare();
      } else {
        await navigator.share({
          title: idea.name,
          text: idea.description,
          url: window.location.href
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}
    >
      <div className="relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900"
            >
              {idea.name}
            </motion.h2>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                disabled={isSharing}
                className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium focus:outline-none
                  ${activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Description</h3>
                  <p className="mt-1 text-gray-600">{idea.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Required Skills</h3>
                  <p className="mt-1 text-gray-600">{idea.skills}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Initial Investment</h3>
                  <p className="mt-1 text-gray-600">{idea.investment}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'market' && (
              <motion.div
                key="market"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Target Market</h3>
                  <p className="mt-1 text-gray-600">{idea.targetMarket}</p>
                </div>
                {idea.marketSize && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Market Size</h3>
                    <p className="mt-1 text-gray-600">{idea.marketSize}</p>
                  </div>
                )}
                {idea.competitiveAdvantage && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Competitive Advantage</h3>
                    <p className="mt-1 text-gray-600">{idea.competitiveAdvantage}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Market Validation</h3>
                  <p className="mt-1 text-gray-600">{idea.validation}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'execution' && (
              <motion.div
                key="execution"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">First Steps</h3>
                  <p className="mt-1 text-gray-600">{idea.steps}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Success Metrics</h3>
                  <p className="mt-1 text-gray-600">{idea.metrics}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Potential Challenges</h3>
                  <p className="mt-1 text-gray-600">{idea.challenges}</p>
                </div>
                {idea.timeToMarket && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Time to Market</h3>
                    <p className="mt-1 text-gray-600">{idea.timeToMarket}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

```

# src/components/dashboard/idea-grid.tsx

```tsx
'use client';

import React, { useState } from 'react';
import { BusinessIdea } from '@/lib/ai/types';
import { IdeaDetailView } from './idea-detail-view';

interface IdeaGridProps {
  userId: string;
  ideas: BusinessIdea[];
  limit?: number;
  onShare?: (idea: BusinessIdea) => Promise<void>;
}

export function IdeaGrid({ userId, ideas, limit = 10, onShare }: IdeaGridProps) {
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const displayedIdeas = ideas.slice(0, limit);

  const handleShare = async (idea: BusinessIdea) => {
    if (onShare) {
      await onShare(idea);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedIdeas.map((idea) => (
          <div
            key={idea.name}
            className={`
              relative group bg-white rounded-lg shadow-sm overflow-hidden
              transform transition-all duration-200 ease-in-out
              hover:shadow-lg hover:-translate-y-1
              ${hoveredId === idea.name ? 'ring-2 ring-indigo-500' : ''}
            `}
            onMouseEnter={() => setHoveredId(idea.name)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {idea.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(idea);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                {idea.description}
              </p>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {idea.investment}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {idea.targetMarket.split(' ')[0]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIdea(idea)}
                className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                View Details
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-white via-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {ideas.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M24 38c8.837 0 16-3.582 16-8V14M24 6c-8.837 0-16 3.582-16 8s7.163 8 16 8c8.837 0 16-3.582 16-8s-7.163-8-16-8z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No ideas yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by generating your first business idea.
          </p>
          <div className="mt-6">
            <a
              href="/questionnaire"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Ideas
              <svg
                className="ml-2 -mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Idea Detail Modal */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setSelectedIdea(null)}
            />
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <IdeaDetailView
                idea={selectedIdea}
                onClose={() => setSelectedIdea(null)}
                onShare={() => handleShare(selectedIdea)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

# src/components/dashboard/keyboard-shortcuts-modal.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useKeyboardShortcuts, COMMON_SHORTCUTS } from '@/lib/hooks/use-keyboard-shortcuts';

interface ShortcutItem {
  key: string;
  description: string;
}

const SHORTCUTS: ShortcutItem[] = [
  { key: '⌘/Ctrl + K', description: 'Search ideas' },
  { key: '⌘/Ctrl + N', description: 'Create new idea' },
  { key: '⌘/Ctrl + S', description: 'Save changes' },
  { key: 'Esc', description: 'Close modal' },
  { key: '←/→', description: 'Navigate between ideas' },
  { key: 'Space', description: 'Select/deselect idea' },
];

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useKeyboardShortcuts([
    {
      ...COMMON_SHORTCUTS.CLOSE,
      handler: () => setIsOpen(false),
    },
  ]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <Button
          variant="outline"
          className="bg-white"
          onClick={() => setIsOpen(true)}
        >
          ⌘ Keyboard Shortcuts
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Keyboard Shortcuts</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {SHORTCUTS.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-gray-600">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-sm font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-mono">Esc</kbd> to close this modal
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

```

# src/components/dashboard/profile-settings.tsx

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { useAuth } from '@/lib/auth/AuthContext';

interface ProfileData {
  email: string;
  name?: string;
  notifications: boolean;
}

export function ProfileSettings() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    email: user?.email || '',
    name: user?.user_metadata?.name || '',
    notifications: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update profile logic would go here
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {message && (
        <Alert
          variant={message.type === 'success' ? 'default' : 'destructive'}
          className="mb-4"
        >
          {message.text}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={profileData.email}
            disabled={true}
            className="bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="notifications"
            checked={profileData.notifications}
            onChange={(e) => setProfileData({ ...profileData, notifications: e.target.checked })}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="notifications" className="text-sm text-gray-700">
            Receive email notifications about new recommendations
          </label>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <Button type="submit" variant="default">
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

```

# src/components/dashboard/SavedRecommendations.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { recommendationsService, RecommendationType } from "@/lib/recommendations/service"

interface SavedRecommendation {
  id: string
  recommendation_type: string
  content: string
  notes: string | null
  is_favorite: boolean
  created_at: string
}

interface SavedRecommendationsProps {
  userId: string
}

export function SavedRecommendations({ userId }: SavedRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<SavedRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<RecommendationType | 'all'>('all')

  useEffect(() => {
    loadRecommendations()
  }, [userId])

  const loadRecommendations = async () => {
    try {
      const data = await recommendationsService.getUserRecommendations(userId)
      setRecommendations(data)
    } catch (err) {
      setError("Failed to load recommendations")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await recommendationsService.toggleFavorite(id, !isFavorite)
      setRecommendations(prev => 
        prev.map(rec => 
          rec.id === id ? { ...rec, is_favorite: !isFavorite } : rec
        )
      )
    } catch (err) {
      console.error("Failed to update favorite status:", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await recommendationsService.deleteRecommendation(id)
      setRecommendations(prev => prev.filter(rec => rec.id !== id))
    } catch (err) {
      console.error("Failed to delete recommendation:", err)
    }
  }

  const filteredRecommendations = recommendations.filter(rec => 
    activeType === 'all' || rec.recommendation_type === activeType
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading saved recommendations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button
          variant={activeType === 'all' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('all')}
        >
          All
        </Button>
        <Button
          variant={activeType === 'business_idea' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('business_idea')}
        >
          Business Ideas
        </Button>
        <Button
          variant={activeType === 'follow_up' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('follow_up')}
        >
          Follow-up Questions
        </Button>
        <Button
          variant={activeType === 'suggestion' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('suggestion')}
        >
          Action Steps
        </Button>
        <Button
          variant={activeType === 'insight' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('insight')}
        >
          Market Insights
        </Button>
      </div>

      {filteredRecommendations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No saved recommendations yet.</p>
          <Button
            variant="gradient"
            onClick={() => window.location.href = '/questionnaire'}
            className="mt-4"
          >
            Take Questionnaire
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <div key={rec.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                    {rec.recommendation_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    Saved on {formatDate(rec.created_at)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFavorite(rec.id, rec.is_favorite)}
                  >
                    {rec.is_favorite ? '★' : '☆'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(rec.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="prose max-w-none">
                {rec.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('-') ? 'ml-4' : ''}>
                    {line}
                  </p>
                ))}
              </div>
              {rec.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{rec.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

```

# src/components/dashboard/shared-idea-view.tsx

```tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BusinessIdea } from '@/lib/ai/types';
import { useIdeaSharing } from '@/lib/hooks/useIdeaSharing';

interface SharedIdeaViewProps {
  idea: BusinessIdea;
  userId?: string;
  onSave?: () => Promise<void>;
  onClone?: () => Promise<void>;
  className?: string;
}

export function SharedIdeaView({
  idea,
  userId,
  onSave,
  onClone,
  className = ''
}: SharedIdeaViewProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const { shareIdea, isSharing, error } = useIdeaSharing(userId || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isCloning, setIsCloning] = useState(false);

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        { label: 'Description', value: idea.description },
        { label: 'Required Skills', value: idea.skills },
        { label: 'Initial Investment', value: idea.investment }
      ]
    },
    {
      id: 'market',
      title: 'Market Analysis',
      content: [
        { label: 'Target Market', value: idea.targetMarket },
        { label: 'Market Size', value: idea.marketSize },
        { label: 'Market Validation', value: idea.validation }
      ]
    },
    {
      id: 'execution',
      title: 'Execution Plan',
      content: [
        { label: 'First Steps', value: idea.steps },
        { label: 'Success Metrics', value: idea.metrics },
        { label: 'Challenges', value: idea.challenges }
      ]
    }
  ];

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  const handleClone = async () => {
    if (!onClone) return;
    setIsCloning(true);
    try {
      await onClone();
    } finally {
      setIsCloning(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="relative">
        <div className="px-6 py-16 sm:px-12 sm:py-24 lg:px-16 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {idea.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto"
            >
              {idea.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${activeSection === section.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Active Section Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {sections
            .find((s) => s.id === activeSection)
            ?.content.map((item) => (
              <div
                key={item.label}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {onSave && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSaving ? 'Saving...' : 'Save Idea'}
            </motion.button>
          )}

          {onClone && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClone}
              disabled={isCloning}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isCloning ? 'Cloning...' : 'Clone Idea'}
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => shareIdea(idea)}
            disabled={isSharing}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSharing ? 'Sharing...' : 'Share'}
            <svg
              className="ml-2 -mr-1 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </motion.button>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

```

# src/components/dashboard/subscription-manager.tsx

```tsx
import { useEffect, useState } from 'react'
import { stripeService } from '@/lib/stripe/service'
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_FEATURES, SubscriptionTier } from '@/lib/stripe/config'

type SubscriptionDetails = {
  id: string
  tier: SubscriptionTier
  status: string
  current_period_end: string
  cancel_at_period_end: boolean
  usage?: {
    ideaGenerations: number
    savedIdeas: number
    aiQueries: number
  }
}

export default function SubscriptionManager({ userId }: { userId: string }) {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const details = await stripeService.getSubscriptionDetails(userId)
        if (details) {
          setSubscription({
            id: details.id,
            tier: details.tier,
            status: details.status,
            current_period_end: details.current_period_end,
            cancel_at_period_end: details.cancel_at_period_end || false,
            usage: details.usage
          })
        }
      } catch (err) {
        setError('Failed to load subscription details')
        console.error('Error fetching subscription:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [userId])

  const handleManageSubscription = async () => {
    try {
      const { url } = await stripeService.createPortalSession(userId)
      window.location.href = url
    } catch (err) {
      setError('Failed to open subscription portal')
      console.error('Error opening portal:', err)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          No Active Subscription
        </h2>
        <p className="text-gray-600 mb-4">
          Upgrade your account to access premium features and increased usage limits.
        </p>
        <a
          href="/pricing"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          View Plans
        </a>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Subscription Details
          </h2>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              subscription.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </span>
        </div>

        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          <div className="pt-6 md:grid md:grid-cols-3 md:gap-4">
            <dt className="text-sm font-medium text-gray-500">Current plan</dt>
            <dd className="mt-1 text-sm text-gray-900 md:mt-0 md:col-span-2">
              {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
            </dd>
          </div>

          <div className="pt-6 md:grid md:grid-cols-3 md:gap-4">
            <dt className="text-sm font-medium text-gray-500">Billing period</dt>
            <dd className="mt-1 text-sm text-gray-900 md:mt-0 md:col-span-2">
              {subscription.cancel_at_period_end
                ? `Cancels on ${formatDate(subscription.current_period_end)}`
                : `Renews on ${formatDate(subscription.current_period_end)}`}
            </dd>
          </div>

          <div className="pt-6 md:grid md:grid-cols-3 md:gap-4">
            <dt className="text-sm font-medium text-gray-500">Features</dt>
            <dd className="mt-1 text-sm text-gray-900 md:mt-0 md:col-span-2">
              <ul className="list-disc list-inside space-y-1">
                {SUBSCRIPTION_FEATURES[subscription.tier].features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </dd>
          </div>

          {subscription.usage && (
            <div className="pt-6 md:grid md:grid-cols-3 md:gap-4">
              <dt className="text-sm font-medium text-gray-500">Current Usage</dt>
              <dd className="mt-1 text-sm text-gray-900 md:mt-0 md:col-span-2">
                <ul className="space-y-1">
                  <li>Idea Generations: {subscription.usage.ideaGenerations}</li>
                  <li>Saved Ideas: {subscription.usage.savedIdeas}</li>
                  <li>AI Queries: {subscription.usage.aiQueries}</li>
                </ul>
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleManageSubscription}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Manage Subscription
          </button>

          {!subscription.cancel_at_period_end && (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowCancelConfirm(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Cancel Subscription?
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to cancel your subscription? You'll continue to have access to premium features until the end of your current billing period.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleManageSubscription}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                >
                  Cancel Subscription
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Keep Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

```

# src/components/dashboard/usage-analytics.tsx

```tsx
import { useEffect, useState } from 'react'
import { usageService } from '@/lib/usage/service'
import { USAGE_LIMITS, SubscriptionTier } from '@/lib/stripe/config'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface UsageData {
  current: {
    ideaGenerations: number
    savedIdeas: number
    aiQueries: number
  }
  limits: typeof USAGE_LIMITS[SubscriptionTier]
  history: Array<{
    date: string
    ideaGenerations: number
    savedIdeas: number
    aiQueries: number
  }>
}

export default function UsageAnalytics({ userId }: { userId: string }) {
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsageData() {
      try {
        const data = await usageService.getUsageAnalytics(userId)
        setUsageData(data)
      } catch (err) {
        setError('Failed to load usage data')
        console.error('Error fetching usage data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsageData()
  }, [userId])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  if (!usageData) {
    return null
  }

  const { current, limits, history } = usageData

  // Calculate usage percentages
  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0 // Unlimited
    return Math.round((current / limit) * 100)
  }

  const formatUsageValue = (current: number, limit: number) => {
    if (limit === -1) return `${current} / ∞`
    return `${current} / ${limit}`
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Usage Analytics</h2>

      {/* Current Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(current).map(([key, value]) => {
          const limit = limits[key as keyof typeof limits]
          const percentage = getUsagePercentage(value, limit)
          const isNearLimit = percentage >= 80 && percentage < 100
          const isOverLimit = percentage >= 100

          return (
            <div key={key} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {formatUsageValue(value, limit)}
              </p>
              <div className="mt-2">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        isOverLimit
                          ? 'bg-red-500'
                          : isNearLimit
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    ></div>
                  </div>
                </div>
                {(isNearLimit || isOverLimit) && (
                  <p className={`mt-1 text-sm ${isOverLimit ? 'text-red-600' : 'text-yellow-600'}`}>
                    {isOverLimit ? 'Usage limit exceeded' : 'Approaching usage limit'}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Usage History Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Usage History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={history}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Bar dataKey="ideaGenerations" fill="#4F46E5" name="Idea Generations" />
              <Bar dataKey="savedIdeas" fill="#10B981" name="Saved Ideas" />
              <Bar dataKey="aiQueries" fill="#6366F1" name="AI Queries" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upgrade CTA */}
      {Object.values(current).some((value, index) => {
        const limit = Object.values(limits)[index]
        return limit !== -1 && value >= limit * 0.8
      }) && (
        <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800">
                Approaching Usage Limits
              </h3>
              <div className="mt-2 text-sm text-indigo-700">
                <p>
                  You're approaching your usage limits. Consider upgrading your plan
                  to ensure uninterrupted access to all features.
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <a
                    href="/pricing"
                    className="bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Plans
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

```

# src/components/dashboard/usage-statistics.tsx

```tsx
'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { usageService } from '@/lib/usage/service';

interface UsageStats {
  savedIdeasCount: number;
  questionnaireResponses: number;
  subscriptionTier: string;
  subscriptionStatus: string;
  periodEnd?: string;
  featureUsage: {
    idea_generations: number;
    market_insights: number;
    follow_up_questions: number;
  };
}

const FEATURE_LIMITS = {
  free: {
    idea_generations: 3,
    market_insights: 0,
    follow_up_questions: 0
  },
  premium: {
    idea_generations: -1, // Unlimited
    market_insights: -1,
    follow_up_questions: -1
  }
};

export function UsageStatistics() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch user profile data
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('subscription_tier, subscription_status, subscription_period_end')
          .eq('user_id', user.id)
          .single();

        // Fetch saved recommendations count
        const { count: savedCount } = await supabase
          .from('saved_recommendations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Fetch questionnaire responses count
        const { count: responseCount } = await supabase
          .from('questionnaire_responses')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Fetch feature usage
        const featureUsage = await usageService.getCurrentUsage(user.id);

        setStats({
          savedIdeasCount: savedCount || 0,
          questionnaireResponses: responseCount || 0,
          subscriptionTier: profile?.subscription_tier || 'free',
          subscriptionStatus: profile?.subscription_status || 'inactive',
          periodEnd: profile?.subscription_period_end,
          featureUsage
        });
      } catch (error) {
        console.error('Error fetching usage statistics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [supabase]);

  const getUsageDisplay = (feature: keyof typeof FEATURE_LIMITS.free, count: number) => {
    const limit = stats ? FEATURE_LIMITS[stats.subscriptionTier as keyof typeof FEATURE_LIMITS][feature] : 0;
    if (limit === -1) return `${count} (Unlimited)`;
    return `${count} / ${limit}`;
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Usage Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Subscription Plan</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900 capitalize">
              {stats?.subscriptionTier}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1 text-lg font-medium capitalize">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                ${stats?.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {stats?.subscriptionStatus}
              </span>
            </p>
          </div>

          {stats?.periodEnd && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Next Billing Date</h3>
              <p className="mt-1 text-lg font-medium">
                {new Date(stats.periodEnd).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Feature Usage This Period</h3>
            <div className="mt-2 space-y-2">
              <div>
                <p className="text-sm text-gray-600">Business Ideas Generated</p>
                <p className="text-lg font-semibold">
                  {getUsageDisplay('idea_generations', stats?.featureUsage.idea_generations || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Market Insights Used</p>
                <p className="text-lg font-semibold">
                  {getUsageDisplay('market_insights', stats?.featureUsage.market_insights || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Follow-up Questions Asked</p>
                <p className="text-lg font-semibold">
                  {getUsageDisplay('follow_up_questions', stats?.featureUsage.follow_up_questions || 0)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Saved Items</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {stats?.savedIdeasCount}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Questionnaire Responses</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {stats?.questionnaireResponses}
            </p>
          </div>
        </div>
      </div>

      {stats?.subscriptionTier === 'free' && (
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Upgrade to Premium</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get unlimited ideas and advanced features
              </p>
            </div>
            <Button
              onClick={() => window.location.href = '/pricing'}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

```

# src/components/debug/DebugPanel.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { WebVitals } from '@/lib/monitoring/types';

interface MetricLog {
  timestamp: string;
  type: 'error' | 'analytics' | 'performance';
  data: any;
}

export default function DebugPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<MetricLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'error' | 'analytics' | 'performance'>('all');

  useEffect(() => {
    // Listen for monitoring events in development
    if (process.env.NODE_ENV === 'development') {
      const originalConsoleError = console.error;
      const originalConsoleLog = console.log;

      console.error = (...args) => {
        if (args[0] === '[Error Log]') {
          setLogs(prev => [{
            timestamp: new Date().toISOString(),
            type: 'error' as const,
            data: args[1]
          }, ...prev].slice(0, 100)); // Keep last 100 logs
        }
        originalConsoleError.apply(console, args);
      };

      console.log = (...args) => {
        if (args[0] === '[Analytics Event]') {
          setLogs(prev => [{
            timestamp: new Date().toISOString(),
            type: 'analytics' as const,
            data: args[1]
          }, ...prev].slice(0, 100));
        } else if (args[0] === '[Performance Metric]') {
          setLogs(prev => [{
            timestamp: new Date().toISOString(),
            type: 'performance' as const,
            data: args[1]
          }, ...prev].slice(0, 100));
        }
        originalConsoleLog.apply(console, args);
      };

      return () => {
        console.error = originalConsoleError;
        console.log = originalConsoleLog;
      };
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 text-white px-4 py-2 rounded-md mb-2"
      >
        {isVisible ? 'Hide' : 'Show'} Debug Panel
      </button>

      {isVisible && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-96 max-h-[600px] overflow-auto">
          <div className="flex gap-2 mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option value="error">Errors</option>
              <option value="analytics">Analytics</option>
              <option value="performance">Performance</option>
            </select>
            <button
              onClick={() => setLogs([])}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Clear
            </button>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log, index) => (
              <div
                key={index}
                className={`p-2 rounded text-sm font-mono ${
                  log.type === 'error' ? 'bg-red-100' :
                  log.type === 'analytics' ? 'bg-blue-100' :
                  'bg-green-100'
                }`}
              >
                <div className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
                <div className="font-semibold">{log.type.toUpperCase()}</div>
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(log.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

```

# src/components/error/ErrorBoundary.tsx

```tsx
'use client';

import { useEffect } from 'react';
import { Alert } from '@/components/ui/alert';
import { logError, ErrorSeverity, trackEvent } from '@/lib/monitoring';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error with our monitoring system
    logError(error, ErrorSeverity.ERROR, {
      component: 'ErrorBoundary',
      digest: error.digest,
      timestamp: new Date().toISOString()
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <h2 className="text-lg font-semibold">Something went wrong!</h2>
          <p className="text-sm text-gray-500">
            {error.message || 'An unexpected error occurred'}
          </p>
        </Alert>
        <button
          onClick={() => {
            // Track the retry attempt
            trackEvent('error_retry', {
              errorMessage: error.message,
              errorDigest: error.digest,
              timestamp: new Date().toISOString()
            });
            reset();
          }}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

```

# src/components/payment/SubscriptionManager.tsx

```tsx
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { loadStripe } from '@stripe/stripe-js'
import { SubscriptionData } from '@/lib/stripe/config'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface SubscriptionManagerProps {
  userId: string
  onSubscriptionChange?: () => void
}

export function SubscriptionManager({ userId, onSubscriptionChange }: SubscriptionManagerProps) {
  const router = useRouter()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/subscription')
      if (!response.ok) throw new Error('Failed to fetch subscription')
      const data = await response.json()
      setSubscription(data)
    } catch (err) {
      setError('Failed to load subscription status')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async () => {
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID,
          mode: 'subscription'
        })
      })

      const { sessionId } = await response.json()
      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) throw error
    } catch (err) {
      setError('Failed to start upgrade process')
      console.error(err)
    }
  }

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'portal',
          returnUrl: window.location.href
        })
      })

      const { url } = await response.json()
      router.push(url)
    } catch (err) {
      setError('Failed to open subscription management')
      console.error(err)
    }
  }

  const handleCancelSubscription = async () => {
    try {
      await fetch('/api/stripe/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' })
      })

      await fetchSubscription()
      if (onSubscriptionChange) onSubscriptionChange()
    } catch (err) {
      setError('Failed to cancel subscription')
      console.error(err)
    }
  }

  const handleReactivateSubscription = async () => {
    try {
      await fetch('/api/stripe/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reactivate' })
      })

      await fetchSubscription()
      if (onSubscriptionChange) onSubscriptionChange()
    } catch (err) {
      setError('Failed to reactivate subscription')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <p>{error}</p>
      </Alert>
    )
  }

  if (!subscription || subscription.plan === 'free') {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Free Plan</h3>
          <p className="text-gray-600 mb-4">
            Generate 1 business idea per month
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Ideas remaining this month: {subscription?.ideasRemaining || 1}
            </p>
          </div>
        </div>

        <Button
          onClick={handleUpgrade}
          className="w-full bg-primary-600 hover:bg-primary-700"
        >
          Upgrade to Premium
        </Button>

        <div className="text-sm text-gray-500 text-center">
          <p>Get 10 ideas/month plus premium features</p>
          <p>$9.99/month or $3.00/month paid annually</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Premium Plan</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Ideas remaining this month: {subscription.ideasRemaining}
          </p>
          <p className="text-sm text-gray-500">
            Renewal date: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
          {subscription.cancelAtPeriodEnd && (
            <p className="text-amber-600 text-sm">
              Your subscription will end on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {subscription.cancelAtPeriodEnd ? (
          <Button
            onClick={handleReactivateSubscription}
            className="w-full"
            variant="outline"
          >
            Reactivate Subscription
          </Button>
        ) : (
          <Button
            onClick={handleCancelSubscription}
            className="w-full"
            variant="outline"
          >
            Cancel Subscription
          </Button>
        )}

        <Button
          onClick={handleManageSubscription}
          className="w-full"
        >
          Manage Subscription
        </Button>
      </div>
    </div>
  )
}

```

# src/components/pricing-section.tsx

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Infinity } from "lucide-react"
import Link from "next/link"

export default function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-muted-foreground text-xl">
            Choose the perfect plan for your entrepreneurial journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <Card className="relative p-6 flex flex-col border-2 hover:border-primary/50 transition-all duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Free</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground ml-2">Forever free</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {[
                "1 AI-generated business idea",
                "Basic market insights",
                "Personality assessment",
                "Skills matching"
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/signup">Start Free</Link>
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card className="relative p-6 flex flex-col border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 lg:scale-105 shadow-lg">
            <Badge className="absolute -top-3 right-4">
              Popular
            </Badge>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Pro</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground ml-2">One-time payment</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {[
                "10 AI-generated business ideas",
                "Deep market analysis",
                "Competitor insights",
                "Revenue potential estimates",
                "Step-by-step launch guide",
                "Export to PDF"
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </Card>

          {/* Premium Plan */}
          <Card className="relative p-6 flex flex-col border-2 hover:border-primary/50 transition-all duration-300">
            <Badge className="absolute -top-3 right-4 bg-gradient-to-r from-primary to-accent">
              Best Value
            </Badge>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Premium</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">$10</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <span className="text-sm text-muted-foreground">Cancel anytime</span>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {[
                { text: "Unlimited business ideas", icon: Infinity },
                { text: "Monthly validation report", icon: Check },
                { text: "In-depth market analysis", icon: Check },
                { text: "Competitor tracking", icon: Check },
                { text: "Revenue forecasting", icon: Check },
                { text: "Custom launch roadmap", icon: Check },
                { text: "Priority support", icon: Check }
              ].map(({ text, icon: Icon }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className={`text-muted-foreground ${text === "Unlimited business ideas" ? "font-medium" : ""}`}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full border-primary hover:bg-primary hover:text-white transition-colors"
              asChild
            >
              <Link href="/signup">Subscribe Now</Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

```

# src/components/questionnaire/AIRecommendations.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"
import { SaveRecommendationButton } from "./SaveRecommendationButton"
import { useIdeaGeneration, useSubscription } from "@/lib/hooks/useSubscription"
import { SubscriptionManager } from "@/components/payment/SubscriptionManager"
import type { Database } from "@/types/database"
import type { RecommendationType } from "@/lib/recommendations/service"

type QuestionnaireResponse = Database["public"]["Tables"]["questionnaire_responses"]["Row"]

interface AIRecommendationsProps {
  response: QuestionnaireResponse
  userId: string
}

interface ContentSection {
  title: string
  content: string
}

function parseContent(content: string | null): ContentSection[] {
  if (!content) return []
  
  const sections: ContentSection[] = []
  let currentTitle = ""
  let currentContent: string[] = []

  content.split('\n').forEach(line => {
    if (line.match(/^\d\./)) {
      if (currentTitle && currentContent.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentContent.join('\n')
        })
      }
      currentTitle = line.replace(/^\d\.\s*/, '')
      currentContent = []
    } else if (line.trim()) {
      currentContent.push(line)
    }
  })

  if (currentTitle && currentContent.length > 0) {
    sections.push({
      title: currentTitle,
      content: currentContent.join('\n')
    })
  }

  return sections
}

export function AIRecommendations({ response, userId }: AIRecommendationsProps) {
  const [businessIdeas, setBusinessIdeas] = useState<string | null>(null)
  const [followUpQuestions, setFollowUpQuestions] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string | null>(null)
  const [marketInsights, setMarketInsights] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<RecommendationType>('business_idea')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{
    message: string;
    code?: string;
    retryAfter?: number;
  } | null>(null)
  const [streamingContent, setStreamingContent] = useState<string>('')

  const { generateIdea, canGenerateIdea, ideasRemaining } = useIdeaGeneration()
  const { isFeatureEnabled, subscription } = useSubscription()

  const generateContent = async (type: RecommendationType, useStreaming: boolean = false) => {
    setLoading(true)
    setError(null)
    setStreamingContent('')

    try {
      if (useStreaming) {
        const response = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stream: true }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to generate content')
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error('Failed to initialize stream')

        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          setStreamingContent(prev => prev + chunk)
        }

        // Update the appropriate state based on type
        switch (type) {
          case 'business_idea':
            setBusinessIdeas(streamingContent)
            break
          case 'follow_up':
            setFollowUpQuestions(streamingContent)
            break
          case 'suggestion':
            setSuggestions(streamingContent)
            break
          case 'insight':
            setMarketInsights(streamingContent)
            break
        }
      } else {
        const response = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stream: false }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw {
            message: error.message || 'Failed to generate content',
            code: error.code,
            retryAfter: error.retryAfter
          }
        }

        const data = await response.json()
        
        switch (type) {
          case 'business_idea':
            setBusinessIdeas(data.data.businessIdeas)
            break
          case 'follow_up':
            setFollowUpQuestions(data.data.followUpQuestions)
            break
          case 'suggestion':
            setSuggestions(data.data.actionableSuggestions)
            break
          case 'insight':
            setMarketInsights(data.data.marketInsights)
            break
        }
      }
    } catch (err: any) {
      setError({
        message: err.message || "Failed to generate recommendations",
        code: err.code,
        retryAfter: err.retryAfter
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateContent(activeTab)
  }, [activeTab])

  const getActiveContent = () => {
    if (streamingContent) return streamingContent
    
    switch (activeTab) {
      case 'business_idea':
        return businessIdeas
      case 'follow_up':
        return followUpQuestions
      case 'suggestion':
        return suggestions
      case 'insight':
        return marketInsights
      default:
        return null
    }
  }

  const isPremiumFeature = (tab: RecommendationType): boolean => {
    switch (tab) {
      case 'business_idea':
        return false
      case 'follow_up':
        return !isFeatureEnabled('followUpQuestions')
      case 'suggestion':
        return !isFeatureEnabled('actionableSuggestions')
      case 'insight':
        return !isFeatureEnabled('marketInsights')
    }
  }

  const sections = parseContent(getActiveContent())

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={activeTab === 'business_idea' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('business_idea')}
          >
            Business Ideas {!canGenerateIdea && `(${ideasRemaining} left)`}
          </Button>
          <Button
            variant={activeTab === 'follow_up' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('follow_up')}
          >
            Follow-up Questions {isPremiumFeature('follow_up') && '⭐'}
          </Button>
          <Button
            variant={activeTab === 'suggestion' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('suggestion')}
          >
            Action Steps {isPremiumFeature('suggestion') && '⭐'}
          </Button>
          <Button
            variant={activeTab === 'insight' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('insight')}
          >
            Market Insights {isPremiumFeature('insight') && '⭐'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{error.message}</p>
              {error.code === 'RATE_LIMIT' && error.retryAfter && (
                <p className="text-sm">Please try again in {error.retryAfter} seconds</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateContent(activeTab)}
              className="ml-4"
            >
              Retry
            </Button>
          </div>
        </Alert>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                {streamingContent ? 'Generating...' : 'Analyzing your profile...'}
              </p>
            </div>
          </div>
        ) : isPremiumFeature(activeTab) ? (
          <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
            <h3 className="text-xl font-semibold">Premium Feature</h3>
            <p className="text-gray-600 text-center max-w-md">
              Upgrade to premium to access {activeTab.replace('_', ' ')} recommendations
              and unlock all premium features.
            </p>
            <SubscriptionManager userId={userId} />
          </div>
        ) : !canGenerateIdea && activeTab === 'business_idea' ? (
          <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
            <h3 className="text-xl font-semibold">Generation Limit Reached</h3>
            <p className="text-gray-600 text-center max-w-md">
              You've reached your idea generation limit for this month.
              Upgrade to premium to generate more ideas.
            </p>
            <SubscriptionManager userId={userId} />
          </div>
        ) : (
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  <SaveRecommendationButton
                    userId={userId}
                    type={activeTab}
                    content={section.content}
                  />
                </div>
                <div className="prose max-w-none">
                  {section.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('-') ? 'ml-4' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

```

# src/components/questionnaire/QuestionCard.tsx

```tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Alert } from '../ui/alert';
import { Question, QuestionnaireProgress, questions } from '../../lib/questionnaire/questions';
import { TypingIndicator } from './typing-indicator';
import { SectionIndicator } from './section-indicator';
import { flowManager } from '../../lib/questionnaire/flow-manager';

export interface QuestionCardProps {
  question: Question;
  onSubmit: (answer: any, nextQuestionId: string | null) => void;
  currentProgress: QuestionnaireProgress;
  onModifyPrevious: () => void;
}

const createAnswerSchema = (question: Question) => {
  let baseSchema: any;

  switch (question.type) {
    case 'text':
      baseSchema = z.string();
      if (question.validation?.minLength) {
        baseSchema = baseSchema.min(question.validation.minLength);
      }
      if (question.validation?.maxLength) {
        baseSchema = baseSchema.max(question.validation.maxLength);
      }
      if (question.validation?.pattern) {
        baseSchema = baseSchema.regex(new RegExp(question.validation.pattern));
      }
      break;
    case 'choice':
      baseSchema = z.string();
      break;
    case 'multiple':
      baseSchema = z.array(z.string());
      break;
    case 'scale':
      baseSchema = z.number().min(1).max(5);
      break;
    case 'yes-no':
    case 'like-dislike':
      baseSchema = z.boolean();
      break;
    default:
      baseSchema = z.any();
  }

  if (question.validation?.required) {
    baseSchema = baseSchema.refine((val: unknown) => {
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== null && val !== '';
    }, 'This field is required');
  }

  return z.object({ answer: baseSchema });
};

export default function QuestionCard({ question, onSubmit, currentProgress, onModifyPrevious }: QuestionCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<any>(() => {
    return currentProgress.answers[question.id] || '';
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [showModifyTooltip, setShowModifyTooltip] = useState(false);
  const [autoSaveIndicator, setAutoSaveIndicator] = useState<string | null>(null);
  const [lastCheckpoint, setLastCheckpoint] = useState<string | null>(null);

  // Auto-save functionality using FlowManager
  const autoSave = useCallback(() => {
    try {
      const updatedProgress = {
        ...currentProgress,
        answers: {
          ...currentProgress.answers,
          [question.id]: answer
        }
      };

      flowManager.autoSave(updatedProgress);
      setAutoSaveIndicator('Progress auto-saved');
      setTimeout(() => setAutoSaveIndicator(null), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setAutoSaveIndicator('Auto-save failed');
    }
  }, [currentProgress, question.id, answer]);

  useEffect(() => {
    const autoSaveTimer = setInterval(autoSave, flowManager.getAutoSaveInterval());
    return () => clearInterval(autoSaveTimer);
  }, [autoSave]);

  useEffect(() => {
    // Load saved answer for current question
    const savedAnswer = currentProgress.answers[question.id];
    if (savedAnswer) {
      setAnswer(savedAnswer);
      setIsModifying(true);
    } else {
      setAnswer(''); // Reset answer when moving to a new question
      setIsModifying(false);
    }

    // Enhanced typing indicator
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 800);

    // Load last checkpoint
    const checkpoint = flowManager.getLastCheckpoint();
    setLastCheckpoint(checkpoint?.questionId || null);

    return () => clearTimeout(timer);
  }, [question.id, currentProgress]);

  const validateAnswer = (answer: any) => {
    const schema = createAnswerSchema(question);
    const result = schema.safeParse({ answer });
    
    if (!result.success) {
      const firstError = result.error.errors[0];
      throw new Error(firstError.message);
    }
    
    return result.data.answer;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const validatedAnswer = validateAnswer(answer);
      
      // Use FlowManager to determine next question
      const nextQuestionId = flowManager.getNextQuestion(question.id, {
        ...currentProgress.answers,
        [question.id]: validatedAnswer
      });

      // Save progress before submitting
      await autoSave();
      
      // Create checkpoint if needed
      if (question.checkpoint) {
        flowManager.createCheckpoint({
          ...currentProgress,
          currentQuestionId: question.id,
          answers: {
            ...currentProgress.answers,
            [question.id]: validatedAnswer
          }
        });
      }
      
      onSubmit(validatedAnswer, nextQuestionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid answer');
    }
  };

  const handleRestoreCheckpoint = () => {
    if (lastCheckpoint) {
      const restoredProgress = flowManager.restoreCheckpoint(lastCheckpoint);
      if (restoredProgress) {
        // Update the form with restored data
        setAnswer(restoredProgress.answers[question.id] || '');
        setIsModifying(true);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Indicator */}
      <SectionIndicator
        currentSection={question.section}
        progress={flowManager.calculateProgress(currentProgress.answers)}
        isActive={true}
      />

      {/* Auto-save Indicator */}
      {autoSaveIndicator && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
          {autoSaveIndicator}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
        <div className="space-y-4">
          {/* Typing Indicator */}
          <TypingIndicator 
            isTyping={isTyping} 
            message={isModifying ? "Retrieving previous answer..." : "Thinking..."}
          />

          {!isTyping && (
            <h3 className="text-xl font-semibold text-gray-900">{question.text}</h3>
          )}

          {error && (
            <Alert variant="destructive">
              <p className="text-sm">{error}</p>
            </Alert>
          )}

          {/* Checkpoint Indicator */}
          {question.checkpoint && (
            <div className="flex items-center justify-between text-sm bg-green-50 p-3 rounded-md">
              <div className="flex items-center space-x-2 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Checkpoint question - progress will be saved</span>
              </div>
              {lastCheckpoint && (
                <button
                  type="button"
                  onClick={handleRestoreCheckpoint}
                  className="text-blue-600 hover:text-blue-700 focus:outline-none"
                >
                  Restore Last Checkpoint
                </button>
              )}
            </div>
          )}

          {/* Question Input Section */}
          <div className="mt-4">
            {question.type === 'text' && (
              <textarea
                value={answer as string}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Share your thoughts..."
              />
            )}

            {question.type === 'yes-no' && (
              <div className="flex space-x-4">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(option === 'Yes')}
                    className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
                      answer === (option === 'Yes')
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'like-dislike' && (
              <div className="flex space-x-4">
                {['Like', 'Dislike'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(option === 'Like')}
                    className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
                      answer === (option === 'Like')
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'scale' && (
              <div className="flex justify-between space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAnswer(value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      answer === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'choice' && question.options && (
              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(option)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      answer === option
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'multiple' && question.options && (
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 p-3 rounded-lg border-2 hover:border-blue-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={Array.isArray(answer) && answer.includes(option)}
                      onChange={(e) => {
                        const newAnswer = Array.isArray(answer) ? [...answer] : [];
                        if (e.target.checked) {
                          newAnswer.push(option);
                        } else {
                          const index = newAnswer.indexOf(option);
                          if (index > -1) {
                            newAnswer.splice(index, 1);
                          }
                        }
                        setAnswer(newAnswer);
                      }}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation and Progress Section */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div 
              className="relative"
              onMouseEnter={() => setShowModifyTooltip(true)}
              onMouseLeave={() => setShowModifyTooltip(false)}
            >
              <button
                type="button"
                onClick={onModifyPrevious}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Modify Previous</span>
              </button>
              {showModifyTooltip && (
                <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap">
                  Click to modify previous answers
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Question {Object.keys(currentProgress.answers).length + 1} of {questions.filter(q => !q.skipIf || !q.skipIf(currentProgress.answers)).length}
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {isModifying ? 'Update Answer' : 'Next Question'}
          </button>
        </div>
      </form>
    </div>
  );
}

```

# src/components/questionnaire/SaveRecommendationButton.tsx

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { recommendationsService, RecommendationType } from "@/lib/recommendations/service"

interface SaveRecommendationButtonProps {
  userId: string
  type: RecommendationType
  content: string
  onSave?: () => void
}

export function SaveRecommendationButton({ 
  userId, 
  type, 
  content,
  onSave 
}: SaveRecommendationButtonProps) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await recommendationsService.saveRecommendation(userId, type, content)
      setSaved(true)
      onSave?.()
    } catch (error) {
      console.error('Failed to save recommendation:', error)
    } finally {
      setSaving(false)
    }
  }

  if (saved) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="text-green-600 border-green-600"
        disabled
      >
        Saved ✓
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSave}
      disabled={saving}
    >
      {saving ? "Saving..." : "Save for Later"}
    </Button>
  )
}

```

# src/components/questionnaire/section-indicator.tsx

```tsx
'use client';

import React from 'react';

interface SectionIndicatorProps {
  currentSection: string;
  progress: number;
  isActive: boolean;
}

export const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  currentSection,
  progress,
  isActive
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-6 transition-all duration-300 ${
      isActive ? 'border-l-4 border-blue-500' : ''
    }`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-blue-500' : 'bg-gray-300'
          }`}></div>
          <h2 className="text-lg font-semibold text-gray-800">{currentSection}</h2>
        </div>
        <div className="text-sm font-medium text-gray-600">
          {progress}% Complete
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

```

# src/components/questionnaire/typing-indicator.tsx

```tsx
'use client';

import React from 'react';

interface TypingIndicatorProps {
  isTyping: boolean;
  message?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  isTyping, 
  message = 'Thinking...' 
}) => {
  if (!isTyping) return null;

  return (
    <div className="flex items-center space-x-2 h-8 mb-4">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
          style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
          style={{ animationDelay: '0.4s' }}></div>
      </div>
      <span className="text-sm text-gray-500">{message}</span>
    </div>
  );
};

```

# src/components/ui/alert.tsx

```tsx
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AlertProps {
  variant?: 'default' | 'destructive'
  children: ReactNode
  className?: string
}

export function Alert({
  variant = 'default',
  children,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-lg border p-4',
        {
          'bg-red-50 border-red-200 text-red-700': variant === 'destructive',
          'bg-gray-50 border-gray-200 text-gray-700': variant === 'default',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function AlertDescription({ children, className, ...props }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("text-sm", className)} {...props}>
      {children}
    </div>
  )
}
```

# src/components/ui/badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

# src/components/ui/card.tsx

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }

```

# src/components/ui/input.tsx

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

# src/components/ui/premium-feature-indicator.tsx

```tsx
'use client';

import React from 'react';
import { useSubscription } from '@/lib/hooks/useSubscription';
import { SUBSCRIPTION_TIERS, USAGE_LIMITS, SubscriptionTier } from '@/lib/stripe/config';

type UsageMetric = keyof typeof USAGE_LIMITS[keyof typeof USAGE_LIMITS];

interface PremiumFeatureIndicatorProps {
  feature: UsageMetric;
  currentUsage: number;
  userId: string;
  className?: string;
  showUpgradeButton?: boolean;
}

export function PremiumFeatureIndicator({
  feature,
  currentUsage,
  userId,
  className = '',
  showUpgradeButton = true
}: PremiumFeatureIndicatorProps) {
  const { subscription, isLoading } = useSubscription(userId);
  const tier = subscription?.tier || SUBSCRIPTION_TIERS.basic;
  const limit = USAGE_LIMITS[tier][feature];
  const isUnlimited = limit === -1;
  const usagePercentage = isUnlimited ? 0 : (currentUsage / limit) * 100;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = usagePercentage >= 100;

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const getStatusColor = () => {
    if (isUnlimited) return 'bg-green-100 text-green-800';
    if (isAtLimit) return 'bg-red-100 text-red-800';
    if (isNearLimit) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const formatFeatureName = (feature: string) => {
    return feature
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <div className={`rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {formatFeatureName(feature)}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {isUnlimited ? 'Unlimited' : `${currentUsage}/${limit}`}
        </span>
      </div>

      {!isUnlimited && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>
      )}

      {(isNearLimit || isAtLimit) && showUpgradeButton && tier !== SUBSCRIPTION_TIERS.enterprise && (
        <div className="mt-3">
          {isAtLimit ? (
            <div className="text-red-800 text-sm mb-2">
              You've reached your {formatFeatureName(feature)} limit
            </div>
          ) : (
            <div className="text-yellow-800 text-sm mb-2">
              You're approaching your {formatFeatureName(feature)} limit
            </div>
          )}
          <a
            href="/pricing"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upgrade Now
            <svg
              className="ml-1.5 -mr-0.5 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      )}

      {tier === SUBSCRIPTION_TIERS.enterprise && (
        <div className="mt-2 text-sm text-gray-600">
          Enterprise plan includes unlimited {formatFeatureName(feature).toLowerCase()}
        </div>
      )}
    </div>
  );
}

interface PremiumFeatureBadgeProps {
  tier: SubscriptionTier;
  className?: string;
}

export function PremiumFeatureBadge({ tier, className = '' }: PremiumFeatureBadgeProps) {
  const getBadgeStyle = () => {
    switch (tier) {
      case SUBSCRIPTION_TIERS.enterprise:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case SUBSCRIPTION_TIERS.pro:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()} ${className}`}>
      {tier === SUBSCRIPTION_TIERS.enterprise && (
        <svg className="mr-1.5 h-2 w-2 text-purple-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
      )}
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </span>
  );
}

interface UpgradePromptProps {
  feature: string;
  targetTier: SubscriptionTier;
  className?: string;
}

export function UpgradePrompt({ feature, targetTier, className = '' }: UpgradePromptProps) {
  return (
    <div className={`rounded-lg border border-yellow-200 bg-yellow-50 p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Upgrade to access {feature}
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              This feature is available in the {targetTier.charAt(0).toUpperCase() + targetTier.slice(1)} plan and above.
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <a
                href="/pricing"
                className="px-3 py-1.5 bg-yellow-800 text-white text-sm font-medium rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
              >
                View Plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

# src/lib/ai/config.ts

```ts
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const MODELS = {
  GPT4: 'gpt-4-1106-preview',
  GPT4_VISION: 'gpt-4-vision-preview',
} as const

export type ModelType = typeof MODELS[keyof typeof MODELS]

```

# src/lib/ai/service.ts

```ts
import { openai, MODELS } from './config';
import { redisCache } from '../utils/redis-cache';
import { rateLimiter, RateLimitError } from '../utils/rate-limiter';
import { responseTemplates, systemPrompts, parseAIResponse, formatResponse } from './templates';
import { logger } from '../monitoring';
import type { Database } from '../../types/database';
import { 
  BusinessIdea, 
  FollowUpQuestion, 
  ActionableSuggestions, 
  MarketInsights,
  ValidationResult,
  validateBusinessIdeaArray,
  validateFollowUpQuestionArray,
  validateActionableSuggestions,
  validateMarketInsights,
  GenerationMetadata,
  ResponseQuality
} from './types';

type QuestionnaireResponse = Database['public']['Tables']['questionnaire_responses']['Row'];

interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
};

const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 3600, // 1 hour
  LONG: 86400, // 24 hours
};

const QUALITY_THRESHOLDS = {
  MIN_OVERALL: 0.7,
  MIN_SPECIFICITY: 0.6,
  MIN_ACTIONABILITY: 0.6,
};

export class AIServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly retryAfter?: number,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

async function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error | null = null;
  let delay = config.initialDelay;

  for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      logger.warn(`Retry attempt ${attempt} failed:`, error);

      if (
        error instanceof RateLimitError ||
        error.code === 'INVALID_REQUEST' ||
        error.code === 'AUTH_ERROR'
      ) {
        throw error;
      }

      if (attempt === config.maxRetries) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, config.maxDelay);
    }
  }

  throw lastError || new Error('Operation failed after retries');
}

const handleAIError = (error: any) => {
  logger.error('AI Service error:', error);

  if (error instanceof RateLimitError) {
    throw new AIServiceError(
      'Rate limit exceeded. Please try again later.',
      'RATE_LIMIT',
      error.retryAfter,
      error
    );
  }

  if (error.response?.status === 429) {
    throw new AIServiceError(
      'Rate limit exceeded. Please try again later.',
      'RATE_LIMIT',
      error.response.headers['retry-after'],
      error
    );
  }

  if (error.response?.status === 400) {
    throw new AIServiceError(
      'Invalid request to AI service.',
      'INVALID_REQUEST',
      undefined,
      error
    );
  }

  if (error.response?.status === 401) {
    throw new AIServiceError(
      'Authentication error with AI service.',
      'AUTH_ERROR',
      undefined,
      error
    );
  }

  if (error.response?.status === 500) {
    throw new AIServiceError(
      'AI service is currently unavailable.',
      'SERVICE_ERROR',
      undefined,
      error
    );
  }

  if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
    throw new AIServiceError(
      'Failed to connect to AI service.',
      'CONNECTION_ERROR',
      undefined,
      error
    );
  }

  throw new AIServiceError(
    'Unexpected error occurred.',
    'UNKNOWN_ERROR',
    undefined,
    error
  );
};

const generateCacheKey = (type: string, response: QuestionnaireResponse): string => {
  const { user_id, experience, interests, commitment, resources } = response;
  return `${type}:${user_id}:${JSON.stringify({ experience, interests, commitment, resources })}`;
};

const validateAndCacheResponse = async <T>(
  response: T,
  validator: (data: any) => ValidationResult<T>,
  cacheKey: string,
  ttl: number,
  metadata: GenerationMetadata
): Promise<T & { metadata: GenerationMetadata }> => {
  const validation = validator(response);
  if (!validation.isValid) {
    logger.error('Response validation failed:', validation.errors);
    throw new AIServiceError(
      'Generated response failed validation',
      'VALIDATION_ERROR',
      undefined,
      validation.errors
    );
  }

  if (validation.quality) {
    metadata.quality = validation.quality;
  }

  const responseWithMetadata = { ...response, metadata };
  await redisCache.set(cacheKey, JSON.stringify(responseWithMetadata), ttl);
  return responseWithMetadata;
};

const createGenerationMetadata = (
  model: string,
  temperature: number,
  startTime: number,
  completion: any
): GenerationMetadata => ({
  timestamp: Date.now(),
  model,
  temperature,
  quality: {
    completeness: 0,
    relevance: 0,
    specificity: 0,
    actionability: 0,
    overall: 0
  },
  generationTime: Date.now() - startTime,
  promptTokens: completion.usage?.prompt_tokens || 0,
  completionTokens: completion.usage?.completion_tokens || 0,
  totalTokens: completion.usage?.total_tokens || 0
});

export const aiService = {
  async generateBusinessIdeas(response: QuestionnaireResponse, signal?: AbortSignal) {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    const cacheKey = generateCacheKey('ideas', response);
    const cachedResult = await redisCache.get(cacheKey);
    if (cachedResult) {
      try {
        const parsed = JSON.parse(cachedResult);
        if (parsed.metadata) return parsed;
      } catch (error) {
        logger.warn('Cache parsing failed:', error);
      }
    }

    try {
      const result = await withRetry(async () => {
        const startTime = Date.now();
        const prompt = `As a startup advisor, generate 3 detailed and personalized business ideas based on the following information:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format each idea exactly like this template:
${responseTemplates.businessIdea}`;

        const completion = await openai.chat.completions.create({
          model: MODELS.GPT4,
          messages: [
            { role: 'system', content: systemPrompts.businessIdea },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          stream: false,
        }, { signal });

        const content = completion.choices[0].message.content;
        if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE');

        const metadata = createGenerationMetadata(MODELS.GPT4, 0.7, startTime, completion);
        const parsedIdeas = parseAIResponse(content, 'ideas') as BusinessIdea[];
        
        return validateAndCacheResponse(
          parsedIdeas,
          validateBusinessIdeaArray,
          cacheKey,
          CACHE_TTL.MEDIUM,
          metadata
        );
      });

      return result;
    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  },

  async generateFollowUpQuestions(response: QuestionnaireResponse, signal?: AbortSignal) {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    const cacheKey = generateCacheKey('questions', response);
    const cachedResult = await redisCache.get(cacheKey);
    if (cachedResult) {
      try {
        const parsed = JSON.parse(cachedResult);
        if (parsed.metadata) return parsed;
      } catch (error) {
        logger.warn('Cache parsing failed:', error);
      }
    }

    try {
      const result = await withRetry(async () => {
        const startTime = Date.now();
        const prompt = `Based on the following questionnaire responses, generate 5 specific follow-up questions:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format each question exactly like this template:
${responseTemplates.followUpQuestion}`;

        const completion = await openai.chat.completions.create({
          model: MODELS.GPT4,
          messages: [
            { role: 'system', content: systemPrompts.followUpQuestion },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          stream: false,
        }, { signal });

        const content = completion.choices[0].message.content;
        if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE');

        const metadata = createGenerationMetadata(MODELS.GPT4, 0.7, startTime, completion);
        const parsedQuestions = parseAIResponse(content, 'questions') as FollowUpQuestion[];
        
        return validateAndCacheResponse(
          parsedQuestions,
          validateFollowUpQuestionArray,
          cacheKey,
          CACHE_TTL.SHORT,
          metadata
        );
      });

      return result;
    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  },

  async generateActionableSuggestions(response: QuestionnaireResponse, signal?: AbortSignal) {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    const cacheKey = generateCacheKey('suggestions', response);
    const cachedResult = await redisCache.get(cacheKey);
    if (cachedResult) {
      try {
        const parsed = JSON.parse(cachedResult);
        if (parsed.metadata) return parsed;
      } catch (error) {
        logger.warn('Cache parsing failed:', error);
      }
    }

    try {
      const result = await withRetry(async () => {
        const startTime = Date.now();
        const prompt = `Based on the following profile, provide detailed, actionable suggestions:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format the response exactly like this template:
${responseTemplates.actionableSuggestions}`;

        const completion = await openai.chat.completions.create({
          model: MODELS.GPT4,
          messages: [
            { role: 'system', content: systemPrompts.actionableSuggestions },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          stream: false,
        }, { signal });

        const content = completion.choices[0].message.content;
        if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE');

        const metadata = createGenerationMetadata(MODELS.GPT4, 0.7, startTime, completion);
        const parsedSuggestions = parseAIResponse(content, 'suggestions') as ActionableSuggestions;
        
        return validateAndCacheResponse(
          parsedSuggestions,
          validateActionableSuggestions,
          cacheKey,
          CACHE_TTL.MEDIUM,
          metadata
        );
      });

      return result;
    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  },

  async generateMarketInsights(response: QuestionnaireResponse, signal?: AbortSignal) {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    const cacheKey = generateCacheKey('insights', response);
    const cachedResult = await redisCache.get(cacheKey);
    if (cachedResult) {
      try {
        const parsed = JSON.parse(cachedResult);
        if (parsed.metadata) return parsed;
      } catch (error) {
        logger.warn('Cache parsing failed:', error);
      }
    }

    try {
      const result = await withRetry(async () => {
        const startTime = Date.now();
        const prompt = `Analyze market opportunities based on this profile:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format the response exactly like this template:
${responseTemplates.marketInsights}`;

        const completion = await openai.chat.completions.create({
          model: MODELS.GPT4,
          messages: [
            { role: 'system', content: systemPrompts.marketInsights },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          stream: false,
        }, { signal });

        const content = completion.choices[0].message.content;
        if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE');

        const metadata = createGenerationMetadata(MODELS.GPT4, 0.7, startTime, completion);
        const parsedInsights = parseAIResponse(content, 'insights') as MarketInsights;
        
        return validateAndCacheResponse(
          parsedInsights,
          validateMarketInsights,
          cacheKey,
          CACHE_TTL.LONG,
          metadata
        );
      });

      return result;
    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  },

  async *streamResponse(response: QuestionnaireResponse, type: 'ideas' | 'questions' | 'suggestions' | 'insights') {
    const userId = response.user_id;
    await rateLimiter.consume(userId);

    let prompt = '';
    let template = '';
    let systemMessage = '';

    switch (type) {
      case 'ideas':
        prompt = `As a startup advisor, generate 3 detailed and personalized business ideas...`;
        template = responseTemplates.businessIdea;
        systemMessage = systemPrompts.businessIdea;
        break;
      case 'questions':
        prompt = `Based on the following questionnaire responses, generate 5 specific follow-up questions...`;
        template = responseTemplates.followUpQuestion;
        systemMessage = systemPrompts.followUpQuestion;
        break;
      case 'suggestions':
        prompt = `Based on the following profile, provide detailed, actionable suggestions...`;
        template = responseTemplates.actionableSuggestions;
        systemMessage = systemPrompts.actionableSuggestions;
        break;
      case 'insights':
        prompt = `Analyze market opportunities based on this profile...`;
        template = responseTemplates.marketInsights;
        systemMessage = systemPrompts.marketInsights;
        break;
    }

    try {
      const stream = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        stream: true,
      });

      let buffer = '';
      let section = '';
      
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        buffer += content;
        
        // Detect section boundaries and yield complete sections
        if (content.includes('---') || content.includes('==')) {
          if (section) {
            yield section;
            section = '';
          }
          buffer = '';
        } else if (content.includes('.') || content.includes('\n')) {
          section += buffer;
          buffer = '';
        }
      }
      
      // Yield any remaining content
      if (buffer || section) {
        yield buffer || section;
      }

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error;
      handleAIError(error);
    }
  }
};

```

# src/lib/ai/templates.ts

```ts
import { BusinessIdea, FollowUpQuestion, ActionableSuggestions, MarketInsights } from './types'

export const responseTemplates = {
  businessIdea: `
Business Idea: {name}
==================
Description:
{description}

Target Market:
{targetMarket}

Market Size:
{marketSize}

Required Skills:
{skills}

Initial Investment:
{investment}

Time to Market:
{timeToMarket}

Competitive Advantage:
{competitiveAdvantage}

Potential Challenges:
{challenges}

First Steps:
{steps}

Success Metrics:
{metrics}

Market Validation:
{validation}

Scalability Potential:
{scalabilityPotential}

Technical Requirements:
{techRequirements}

Regulatory Considerations:
{regulatoryConsiderations}

---
`.trim(),

  followUpQuestion: `
Follow-up Question {number}
=======================
Question: {question}
Category: {category}
Priority: {priority}

Importance:
{importance}

Context:
{context}

Expected Insights:
{insights}

Related Topics:
{relatedTopics}

Potential Answers:
{potentialAnswers}

---
`.trim(),

  actionableSuggestions: `
Actionable Plan
==============

Immediate Next Steps (30 Days):
{immediate_next_steps}

Skill Development Plan:
{skill_development}

Networking Strategy:
{networking_strategy}

Resource Allocation:
{resource_allocation}

Cost Breakdown:
{cost_breakdown}

Resource Requirements:
{resource_requirements}

Implementation Timeline:
{implementation_timeline}

Milestone Tracking:
{milestone_tracking}

Potential Pitfalls:
{potential_pitfalls}

Risk Mitigation:
{risk_mitigation}

Contingency Plans:
{contingency_plans}

Success Indicators:
{success_indicators}

---
`.trim(),

  marketInsights: `
Market Analysis
==============

Current Market Trends:
{current_trends}

Market Size Analysis:
{market_size_analysis}

Market Gaps:
{market_gaps}

Competitive Landscape:
{competitive_landscape}

Customer Segments:
{customer_segments}

Target Customers:
{target_customers}

Revenue Potential:
{revenue_potential}

Pricing Strategy:
{pricing_strategy}

Distribution Channels:
{distribution_channels}

Entry Strategy:
{entry_strategy}

Growth Opportunities:
{growth_opportunities}

Market Risks:
{market_risks}

Regulatory Environment:
{regulatory_environment}

Technology Trends:
{technology_trends}

---
`.trim()
}

export const systemPrompts = {
  businessIdea: `You are an experienced startup advisor with expertise in business ideation and market analysis. Your task is to generate detailed, actionable business ideas based on the user's background and preferences. Focus on:
- Practical and implementable ideas
- Clear market opportunities
- Realistic resource requirements
- Specific success metrics
- Actionable first steps
Format your response exactly according to the template provided.`,

  followUpQuestion: `You are a business consultant specializing in due diligence and strategic planning. Your task is to generate insightful follow-up questions that will help uncover critical aspects of the business opportunity. Focus on:
- Strategic implications
- Risk assessment
- Market validation
- Resource optimization
Format your response exactly according to the template provided.`,

  actionableSuggestions: `You are a startup mentor with experience in helping entrepreneurs execute their business plans. Your task is to provide detailed, actionable suggestions that will help turn ideas into reality. Focus on:
- Concrete, time-bound actions
- Resource optimization
- Risk management
- Success metrics
Format your response exactly according to the template provided.`,

  marketInsights: `You are a market research analyst with expertise in identifying market opportunities and trends. Your task is to provide comprehensive market insights that will help inform business strategy. Focus on:
- Data-driven analysis
- Market dynamics
- Competitive positioning
- Growth opportunities
Format your response exactly according to the template provided.`
}

export const formatResponse = (template: string, data: Record<string, string | string[] | number>): string => {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{${key}}`;
    if (result.includes(placeholder)) {
      if (Array.isArray(value)) {
        result = result.replace(placeholder, value.map(v => `- ${v}`).join('\n'));
      } else {
        result = result.replace(placeholder, String(value));
      }
    }
  }
  return result.trim();
}

export function parseAIResponse(response: string, type: 'ideas'): BusinessIdea[];
export function parseAIResponse(response: string, type: 'questions'): FollowUpQuestion[];
export function parseAIResponse(response: string, type: 'suggestions'): ActionableSuggestions;
export function parseAIResponse(response: string, type: 'insights'): MarketInsights;
export function parseAIResponse(
  response: string,
  type: 'ideas' | 'questions' | 'suggestions' | 'insights'
): BusinessIdea[] | FollowUpQuestion[] | ActionableSuggestions | MarketInsights {
  try {
    switch (type) {
      case 'ideas':
        return parseBusinessIdeas(response);
      case 'questions':
        return parseFollowUpQuestions(response);
      case 'suggestions':
        return parseActionableSuggestions(response);
      case 'insights':
        return parseMarketInsights(response);
    }
  } catch (error) {
    console.error(`Error parsing AI response for type ${type}:`, error);
    throw new Error(`Failed to parse AI response for type ${type}`);
  }
}

function parseBusinessIdeas(response: string): BusinessIdea[] {
  const ideas = response.split('Business Idea:').filter(Boolean);
  return ideas.map(idea => {
    const sections = idea.split('\n\n');
    const parsedIdea: BusinessIdea = {
      name: '',
      description: '',
      targetMarket: '',
      skills: '',
      investment: '',
      challenges: '',
      steps: '',
      metrics: '',
      validation: '',
      marketSize: '',
      competitiveAdvantage: '',
      timeToMarket: '',
      scalabilityPotential: '',
      techRequirements: '',
      regulatoryConsiderations: ''
    };

    sections.forEach(section => {
      const [header, ...content] = section.split('\n');
      const contentText = content.join('\n').trim();

      const key = header.trim().toLowerCase()
        .replace(/[:\s-]+/g, '')
        .replace('market', 'marketSize')
        .replace('technical', 'tech')
        .replace('requirements', 'Requirements')
        .replace('competitive', 'competitiveAdvantage')
        .replace('time', 'timeToMarket')
        .replace('scalability', 'scalabilityPotential')
        .replace('regulatory', 'regulatoryConsiderations');

      if (key in parsedIdea) {
        (parsedIdea as any)[key] = contentText;
      } else if (!parsedIdea.name && !header.includes(':')) {
        parsedIdea.name = header.trim();
      }
    });

    return parsedIdea;
  });
}

function parseFollowUpQuestions(response: string): FollowUpQuestion[] {
  return response.split('Follow-up Question').filter(Boolean).map(q => {
    const sections = q.split('\n').filter(Boolean);
    const question: FollowUpQuestion = {
      question: '',
      importance: '',
      context: '',
      insights: '',
      category: '',
      priority: 'medium',
      relatedTopics: [],
      potentialAnswers: []
    };

    let currentSection = '';
    sections.forEach(section => {
      if (section.includes(':')) {
        const [key, value] = section.split(':').map(s => s.trim());
        const normalizedKey = key.toLowerCase();

        switch (normalizedKey) {
          case 'question':
            question.question = value;
            break;
          case 'category':
            question.category = value;
            break;
          case 'priority':
            question.priority = value.toLowerCase() as 'high' | 'medium' | 'low';
            break;
          case 'importance':
            currentSection = 'importance';
            question.importance = value;
            break;
          case 'context':
            currentSection = 'context';
            question.context = value;
            break;
          case 'expected insights':
            currentSection = 'insights';
            question.insights = value;
            break;
          case 'related topics':
            currentSection = 'relatedTopics';
            if (value) question.relatedTopics = [value];
            break;
          case 'potential answers':
            currentSection = 'potentialAnswers';
            if (value) question.potentialAnswers = [value];
            break;
        }
      } else if (section.trim().startsWith('-')) {
        const value = section.trim().substring(1).trim();
        if (currentSection === 'relatedTopics') {
          question.relatedTopics.push(value);
        } else if (currentSection === 'potentialAnswers') {
          question.potentialAnswers.push(value);
        }
      } else if (currentSection && currentSection !== 'relatedTopics' && currentSection !== 'potentialAnswers') {
        (question as any)[currentSection] += '\n' + section.trim();
      }
    });

    return question;
  });
}

function parseActionableSuggestions(response: string): ActionableSuggestions {
  const sections = response.split('\n\n');
  const result: ActionableSuggestions = {
    immediate_next_steps: '',
    skill_development: '',
    networking_strategy: '',
    resource_allocation: '',
    potential_pitfalls: '',
    implementation_timeline: '',
    risk_mitigation: '',
    success_indicators: '',
    milestone_tracking: '',
    cost_breakdown: '',
    resource_requirements: '',
    contingency_plans: ''
  };
  
  sections.forEach(section => {
    const [header, ...content] = section.split('\n');
    if (header.includes(':')) {
      const key = header.split(':')[0].trim().toLowerCase().replace(/[\s-]+/g, '_');
      if (key in result) {
        result[key] = content.join('\n').trim();
      }
    }
  });
  
  return result;
}

function parseMarketInsights(response: string): MarketInsights {
  const sections = response.split('\n\n');
  const result: MarketInsights = {
    current_trends: '',
    market_gaps: '',
    competitive_landscape: '',
    target_customers: '',
    revenue_potential: '',
    entry_strategy: '',
    growth_opportunities: '',
    market_risks: '',
    market_size_analysis: '',
    customer_segments: '',
    pricing_strategy: '',
    distribution_channels: '',
    regulatory_environment: '',
    technology_trends: ''
  };
  
  sections.forEach(section => {
    const [header, ...content] = section.split('\n');
    if (header.includes(':')) {
      const key = header.split(':')[0].trim().toLowerCase().replace(/[\s-]+/g, '_');
      if (key in result) {
        result[key] = content.join('\n').trim();
      }
    }
  });
  
  return result;
}

```

# src/lib/ai/types.ts

```ts
export interface BusinessIdea {
  name: string;
  description: string;
  targetMarket: string;
  skills: string;
  investment: string;
  challenges: string;
  steps: string;
  metrics: string;
  validation: string;
  marketSize?: string;
  competitiveAdvantage?: string;
  timeToMarket?: string;
  scalabilityPotential?: string;
  techRequirements?: string;
  regulatoryConsiderations?: string;
  [key: string]: string | undefined;
}

export interface FollowUpQuestion {
  question: string;
  importance: string;
  context: string;
  insights: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  relatedTopics: string[];
  potentialAnswers: string[];
  [key: string]: string | string[] | 'high' | 'medium' | 'low';
}

export interface ActionableSuggestions {
  immediate_next_steps: string;
  skill_development: string;
  networking_strategy: string;
  resource_allocation: string;
  potential_pitfalls: string;
  implementation_timeline: string;
  risk_mitigation: string;
  success_indicators: string;
  milestone_tracking: string;
  cost_breakdown: string;
  resource_requirements: string;
  contingency_plans: string;
  [key: string]: string;
}

export interface MarketInsights {
  current_trends: string;
  market_gaps: string;
  competitive_landscape: string;
  target_customers: string;
  revenue_potential: string;
  entry_strategy: string;
  growth_opportunities: string;
  market_risks: string;
  market_size_analysis: string;
  customer_segments: string;
  pricing_strategy: string;
  distribution_channels: string;
  regulatory_environment: string;
  technology_trends: string;
  [key: string]: string;
}

export interface ResponseQuality {
  completeness: number;
  relevance: number;
  specificity: number;
  actionability: number;
  overall: number;
}

export interface GenerationMetadata {
  timestamp: number;
  model: string;
  temperature: number;
  quality: ResponseQuality;
  generationTime: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export type ParsedResponse = 
  | (BusinessIdea & { metadata: GenerationMetadata })[]
  | (FollowUpQuestion & { metadata: GenerationMetadata })[]
  | (ActionableSuggestions & { metadata: GenerationMetadata })
  | (MarketInsights & { metadata: GenerationMetadata });

export const isBusinessIdea = (obj: any): obj is BusinessIdea => {
  const requiredFields: (keyof BusinessIdea)[] = [
    'name', 'description', 'targetMarket', 'skills',
    'investment', 'challenges', 'steps', 'metrics', 'validation'
  ];
  
  return (
    typeof obj === 'object' &&
    requiredFields.every(field => field in obj)
  );
};

export const isFollowUpQuestion = (obj: any): obj is FollowUpQuestion => {
  const requiredFields: (keyof FollowUpQuestion)[] = [
    'question', 'importance', 'context', 'insights',
    'category', 'priority', 'relatedTopics', 'potentialAnswers'
  ];
  
  return (
    typeof obj === 'object' &&
    requiredFields.every(field => field in obj)
  );
};

export const isActionableSuggestions = (obj: any): obj is ActionableSuggestions => {
  const requiredFields: (keyof ActionableSuggestions)[] = [
    'immediate_next_steps', 'skill_development', 'networking_strategy',
    'resource_allocation', 'potential_pitfalls', 'implementation_timeline',
    'risk_mitigation', 'success_indicators', 'milestone_tracking',
    'cost_breakdown', 'resource_requirements', 'contingency_plans'
  ];
  
  return (
    typeof obj === 'object' &&
    requiredFields.every(field => field in obj)
  );
};

export const isMarketInsights = (obj: any): obj is MarketInsights => {
  const requiredFields: (keyof MarketInsights)[] = [
    'current_trends', 'market_gaps', 'competitive_landscape',
    'target_customers', 'revenue_potential', 'entry_strategy',
    'growth_opportunities', 'market_risks', 'market_size_analysis',
    'customer_segments', 'pricing_strategy', 'distribution_channels',
    'regulatory_environment', 'technology_trends'
  ];
  
  return (
    typeof obj === 'object' &&
    requiredFields.every(field => field in obj)
  );
};

export const isBusinessIdeaArray = (obj: any): obj is BusinessIdea[] => {
  return Array.isArray(obj) && obj.every(isBusinessIdea);
};

export const isFollowUpQuestionArray = (obj: any): obj is FollowUpQuestion[] => {
  return Array.isArray(obj) && obj.every(isFollowUpQuestion);
};

export interface ValidationResult<T> {
  isValid: boolean;
  data: T | null;
  errors: string[];
  quality?: ResponseQuality;
}

export function validateResponseQuality(response: Record<string, unknown>): ResponseQuality {
  const calculateScore = (value: unknown): number => {
    if (typeof value !== 'string') return 0;
    
    const length = value.length;
    const hasSpecificDetails = /\b(specifically|in particular|for example|such as)\b/i.test(value);
    const hasNumbers = /\d+/.test(value);
    const hasStructure = /\b(first|second|third|finally|moreover|however)\b/i.test(value);
    
    let score = 0;
    if (length > 200) score += 0.3;
    if (hasSpecificDetails) score += 0.3;
    if (hasNumbers) score += 0.2;
    if (hasStructure) score += 0.2;
    
    return Math.min(score, 1);
  };

  const stringValues = Object.entries(response)
    .filter(([_, value]) => typeof value === 'string')
    .map(([_, value]) => value);

  const scores = stringValues.map(calculateScore);
  
  if (scores.length === 0) {
    return {
      completeness: 0,
      relevance: 0,
      specificity: 0,
      actionability: 0,
      overall: 0
    };
  }
  
  return {
    completeness: scores.reduce((acc, score) => acc + score, 0) / scores.length,
    relevance: scores.reduce((acc, score) => acc + score, 0) / scores.length,
    specificity: scores.filter(score => score > 0.7).length / scores.length,
    actionability: scores.filter(score => score > 0.8).length / scores.length,
    overall: scores.reduce((acc, score) => acc + score, 0) / scores.length
  };
}

export function validateBusinessIdeaArray(ideas: any): ValidationResult<BusinessIdea[]> {
  const errors: string[] = [];
  
  if (!Array.isArray(ideas)) {
    return {
      isValid: false,
      data: null,
      errors: ['Expected an array of business ideas']
    };
  }

  const validatedIdeas: BusinessIdea[] = [];
  const requiredFields: (keyof BusinessIdea)[] = [
    'name', 'description', 'targetMarket', 'skills',
    'investment', 'challenges', 'steps', 'metrics', 'validation'
  ];

  ideas.forEach((idea, index) => {
    requiredFields.forEach(field => {
      if (!idea[field] || typeof idea[field] !== 'string' || !idea[field].trim()) {
        errors.push(`Idea ${index + 1}: Missing or invalid ${field}`);
      }
    });
    if (errors.length === 0) {
      validatedIdeas.push(idea);
    }
  });

  const quality = validateResponseQuality(
    validatedIdeas[0] ? Object.fromEntries(
      Object.entries(validatedIdeas[0]).filter(([_, v]) => typeof v === 'string')
    ) : {}
  );

  return {
    isValid: errors.length === 0 && quality.overall >= 0.7,
    data: errors.length === 0 ? validatedIdeas : null,
    errors,
    quality
  };
}

export function validateFollowUpQuestionArray(questions: any): ValidationResult<FollowUpQuestion[]> {
  const errors: string[] = [];
  
  if (!Array.isArray(questions)) {
    return {
      isValid: false,
      data: null,
      errors: ['Expected an array of follow-up questions']
    };
  }

  const validatedQuestions: FollowUpQuestion[] = [];
  const requiredFields: (keyof FollowUpQuestion)[] = [
    'question', 'importance', 'context', 'insights',
    'category', 'priority', 'relatedTopics', 'potentialAnswers'
  ];

  questions.forEach((question, index) => {
    requiredFields.forEach(field => {
      if (!question[field] || 
          (field !== 'relatedTopics' && field !== 'potentialAnswers' && typeof question[field] !== 'string') ||
          (field === 'priority' && !['high', 'medium', 'low'].includes(question[field])) ||
          ((field === 'relatedTopics' || field === 'potentialAnswers') && !Array.isArray(question[field]))) {
        errors.push(`Question ${index + 1}: Missing or invalid ${field}`);
      }
    });
    if (errors.length === 0) {
      validatedQuestions.push(question);
    }
  });

  const quality = validateResponseQuality(
    validatedQuestions[0] ? Object.fromEntries(
      Object.entries(validatedQuestions[0]).filter(([_, v]) => typeof v === 'string')
    ) : {}
  );

  return {
    isValid: errors.length === 0 && quality.overall >= 0.7,
    data: errors.length === 0 ? validatedQuestions : null,
    errors,
    quality
  };
}

export function validateActionableSuggestions(suggestions: any): ValidationResult<ActionableSuggestions> {
  const errors: string[] = [];
  const requiredFields: (keyof ActionableSuggestions)[] = [
    'immediate_next_steps', 'skill_development', 'networking_strategy',
    'resource_allocation', 'potential_pitfalls', 'implementation_timeline',
    'risk_mitigation', 'success_indicators', 'milestone_tracking',
    'cost_breakdown', 'resource_requirements', 'contingency_plans'
  ];

  requiredFields.forEach(field => {
    if (!suggestions[field] || typeof suggestions[field] !== 'string' || !suggestions[field].trim()) {
      errors.push(`Missing or invalid ${field}`);
    }
  });

  const quality = validateResponseQuality(suggestions);

  return {
    isValid: errors.length === 0 && quality.overall >= 0.7,
    data: errors.length === 0 ? suggestions : null,
    errors,
    quality
  };
}

export function validateMarketInsights(insights: any): ValidationResult<MarketInsights> {
  const errors: string[] = [];
  const requiredFields: (keyof MarketInsights)[] = [
    'current_trends', 'market_gaps', 'competitive_landscape',
    'target_customers', 'revenue_potential', 'entry_strategy',
    'growth_opportunities', 'market_risks', 'market_size_analysis',
    'customer_segments', 'pricing_strategy', 'distribution_channels',
    'regulatory_environment', 'technology_trends'
  ];

  requiredFields.forEach(field => {
    if (!insights[field] || typeof insights[field] !== 'string' || !insights[field].trim()) {
      errors.push(`Missing or invalid ${field}`);
    }
  });

  const quality = validateResponseQuality(insights);

  return {
    isValid: errors.length === 0 && quality.overall >= 0.7,
    data: errors.length === 0 ? insights : null,
    errors,
    quality
  };
}

```

# src/lib/auth/AuthContext.tsx

```tsx
import { createContext, useContext, ReactNode } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';

interface AuthContextType {
  getSession: () => Promise<{
    user?: {
      id: string;
      email: string;
      name?: string;
    } | null;
  }>;
}

export const auth: AuthContextType = {
  getSession: async () => {
    const session = await useSession();
    return {
      user: session?.data?.user ? {
        id: session.data.user.id,
        email: session.data.user.email!,
        name: session.data.user.name || undefined
      } : null
    };
  }
};

const AuthContext = createContext<AuthContextType>(auth);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
}

```

# src/lib/hooks/use-keyboard-shortcuts.ts

```ts
import { useEffect } from 'react';

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  handler: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutHandler[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Check if the active element is an input or textarea
      const isInputActive = document.activeElement instanceof HTMLInputElement || 
                          document.activeElement instanceof HTMLTextAreaElement;

      // Don't trigger shortcuts when typing in input fields
      if (isInputActive) return;

      shortcuts.forEach(shortcut => {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : true;
        const altMatch = shortcut.alt ? event.altKey : true;
        const shiftMatch = shortcut.shift ? event.shiftKey : true;

        if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
          event.preventDefault();
          shortcut.handler();
        }
      });
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Predefined shortcuts for common actions
export const COMMON_SHORTCUTS = {
  SEARCH: { key: 'k', ctrl: true },
  NEW: { key: 'n', ctrl: true },
  SAVE: { key: 's', ctrl: true },
  CLOSE: { key: 'escape' },
} as const;

```

# src/lib/hooks/useAnalytics.ts

```ts
import { useCallback } from 'react';
import { trackEvent } from '@/lib/monitoring';

export const useAnalytics = () => {
  const track = useCallback((eventName: string, properties: Record<string, any> = {}) => {
    trackEvent(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      path: typeof window !== 'undefined' ? window.location.pathname : '',
    });
  }, []);

  // Predefined common events
  const trackPageView = useCallback((pageName: string, additionalProps = {}) => {
    track('page_view', { pageName, ...additionalProps });
  }, [track]);

  const trackButtonClick = useCallback((buttonName: string, additionalProps = {}) => {
    track('button_click', { buttonName, ...additionalProps });
  }, [track]);

  const trackFormSubmit = useCallback((formName: string, additionalProps = {}) => {
    track('form_submit', { formName, ...additionalProps });
  }, [track]);

  const trackError = useCallback((errorType: string, errorDetails: any) => {
    track('error_occurred', { errorType, errorDetails });
  }, [track]);

  const trackFeatureUsage = useCallback((featureName: string, additionalProps = {}) => {
    track('feature_used', { featureName, ...additionalProps });
  }, [track]);

  return {
    track,
    trackPageView,
    trackButtonClick,
    trackFormSubmit,
    trackError,
    trackFeatureUsage,
  };
};

```

# src/lib/hooks/useIdeaSharing.ts

```ts
import { useState } from 'react';
import { BusinessIdea } from '@/lib/ai/types';

interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

interface UseIdeaSharingReturn {
  isSharing: boolean;
  shareIdea: (idea: BusinessIdea) => Promise<void>;
  generateShareableLink: (idea: BusinessIdea) => Promise<string>;
  exportToPDF: (idea: BusinessIdea) => Promise<Blob>;
  error: Error | null;
}

export function useIdeaSharing(userId: string): UseIdeaSharingReturn {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const formatIdeaForSharing = (idea: BusinessIdea): string => {
    return `
Business Idea: ${idea.name}

Description:
${idea.description}

Target Market:
${idea.targetMarket}

Required Skills:
${idea.skills}

Initial Investment:
${idea.investment}

First Steps:
${idea.steps}

Success Metrics:
${idea.metrics}

Market Validation:
${idea.validation}
    `.trim();
  };

  const shareViaNavigator = async (options: ShareOptions) => {
    if (typeof navigator.share !== 'function') {
      throw new Error('Web Share API not supported');
    }
    await navigator.share(options);
  };

  const generateShareableLink = async (idea: BusinessIdea): Promise<string> => {
    // This would typically involve creating a shareable link through your backend
    const baseUrl = window.location.origin;
    const shareableId = btoa(JSON.stringify({ ideaId: idea.name, userId }));
    return `${baseUrl}/shared-ideas/${shareableId}`;
  };

  const exportToPDF = async (idea: BusinessIdea): Promise<Blob> => {
    try {
      // This is a placeholder for PDF generation
      // In a real implementation, you'd use a library like pdfmake or jsPDF
      const content = formatIdeaForSharing(idea);
      return new Blob([content], { type: 'application/pdf' });
    } catch (err) {
      throw new Error('Failed to generate PDF');
    }
  };

  const shareIdea = async (idea: BusinessIdea) => {
    setIsSharing(true);
    setError(null);

    try {
      // Try native sharing first
      if (typeof navigator.share === 'function') {
        const shareableLink = await generateShareableLink(idea);
        await shareViaNavigator({
          title: idea.name,
          text: idea.description,
          url: shareableLink
        });
        return;
      }

      // Fallback to clipboard
      const shareableLink = await generateShareableLink(idea);
      await navigator.clipboard.writeText(shareableLink);
      
      // You might want to show a toast notification here
      console.log('Link copied to clipboard');

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to share idea'));
      console.error('Error sharing idea:', err);
    } finally {
      setIsSharing(false);
    }
  };

  return {
    isSharing,
    shareIdea,
    generateShareableLink,
    exportToPDF,
    error
  };
}

// Helper function to check if sharing is supported
export function isSharingSupported(): boolean {
  return typeof navigator.share === 'function';
}

// Helper function to check if the Web Share API supports files
export function isFilesSharingSupported(): boolean {
  return typeof navigator.canShare === 'function' && navigator.canShare({ files: [] });
}

```

# src/lib/hooks/useSubscription.ts

```ts
import { useState, useEffect } from 'react';
import { stripeService } from '@/lib/stripe/service';
import { SubscriptionTier, SUBSCRIPTION_TIERS } from '@/lib/stripe/config';

export interface SubscriptionDetails {
  id: string;
  tier: SubscriptionTier;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  usage?: {
    ideaGenerations: number;
    savedIdeas: number;
    aiQueries: number;
  };
}

export interface UseSubscriptionReturn {
  subscription: SubscriptionDetails | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSubscription(userId?: string): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    if (!userId) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const details = await stripeService.getSubscriptionDetails(userId);
      if (details) {
        setSubscription({
          id: details.id,
          tier: details.tier,
          status: details.status,
          current_period_end: details.current_period_end,
          cancel_at_period_end: details.cancel_at_period_end || false,
          usage: details.usage
        });
      } else {
        setSubscription(null);
      }
    } catch (err) {
      setError('Failed to load subscription details');
      console.error('Error fetching subscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [userId]);

  return {
    subscription,
    isLoading,
    error,
    refetch: fetchSubscription
  };
}

```

# src/lib/monitoring/index.ts

```ts
interface LogLevel {
  error: string;
  warn: string;
  info: string;
  debug: string;
}

type LogMethod = (message: string, ...args: any[]) => void;

interface Logger {
  error: LogMethod;
  warn: LogMethod;
  info: LogMethod;
  debug: LogMethod;
}

const LOG_LEVELS: LogLevel = {
  error: 'ERROR',
  warn: 'WARN',
  info: 'INFO',
  debug: 'DEBUG'
};

class MonitoringService implements Logger {
  private formatMessage(level: string, message: string, args: any[]): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.map(arg => 
      arg instanceof Error ? arg.stack || arg.message : JSON.stringify(arg)
    ).join(' ');
    
    return `[${timestamp}] ${level}: ${message} ${formattedArgs}`.trim();
  }

  error(message: string, ...args: any[]): void {
    console.error(this.formatMessage(LOG_LEVELS.error, message, args));
  }

  warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage(LOG_LEVELS.warn, message, args));
  }

  info(message: string, ...args: any[]): void {
    console.info(this.formatMessage(LOG_LEVELS.info, message, args));
  }

  debug(message: string, ...args: any[]): void {
    console.debug(this.formatMessage(LOG_LEVELS.debug, message, args));
  }
}

export const logger = new MonitoringService();

```

# src/lib/monitoring/types.ts

```ts
import { z } from 'zod';

export const ErrorSeverityEnum = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical'
} as const;

export type ErrorSeverity = typeof ErrorSeverityEnum[keyof typeof ErrorSeverityEnum];

export const WebVitalsSchema = z.object({
    id: z.string(),
    name: z.enum(['CLS', 'FID', 'FCP', 'LCP', 'TTFB']),
    value: z.number(),
    rating: z.enum(['good', 'needs-improvement', 'poor']),
    delta: z.number(),
    entries: z.array(z.any())
});

export const ErrorLogSchema = z.object({
    timestamp: z.string(),
    severity: z.enum(['info', 'warning', 'error', 'critical']),
    error: z.object({
        name: z.string(),
        message: z.string(),
        stack: z.string().optional()
    }),
    context: z.object({
        url: z.string(),
        userAgent: z.string()
    }).catchall(z.unknown())
});

export const AnalyticsEventSchema = z.object({
    timestamp: z.string(),
    event: z.string(),
    properties: z.object({
        url: z.string()
    }).catchall(z.unknown()),
    userId: z.string().optional(),
    sessionId: z.string().optional()
});

export const RequestMetricsSchema = z.object({
    path: z.string(),
    method: z.string(),
    duration: z.number(),
    timestamp: z.string(),
    statusCode: z.number().optional(),
    userAgent: z.string().optional(),
    ip: z.string().optional(),
    country: z.string().optional(),
    authenticated: z.boolean().optional()
});

export const PerformanceMetricSchema = z.object({
    name: z.string(),
    value: z.number(),
    timestamp: z.string()
}).catchall(z.unknown());

export type WebVitals = z.infer<typeof WebVitalsSchema>;
export type ErrorLog = z.infer<typeof ErrorLogSchema>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export type RequestMetrics = z.infer<typeof RequestMetricsSchema>;
export type PerformanceMetric = z.infer<typeof PerformanceMetricSchema>;
```

# src/lib/questionnaire/flow-manager.ts

```ts
import { Question, QuestionnaireProgress, questions } from './questions';

interface BranchingRule {
  questionId: string;
  condition: (answers: { [key: string]: any }) => boolean;
  nextQuestionId: string;
}

interface Checkpoint {
  questionId: string;
  timestamp: number;
  answers: { [key: string]: any };
  progress: number;
}

export class QuestionnaireFlowManager {
  private static instance: QuestionnaireFlowManager;
  private branchingRules: BranchingRule[] = [];
  private checkpoints: Checkpoint[] = [];
  private autoSaveInterval: number = 30000; // 30 seconds
  private lastAutoSave: number = Date.now();

  private constructor() {
    // Initialize default branching rules
    this.initializeBranchingRules();
  }

  public static getInstance(): QuestionnaireFlowManager {
    if (!QuestionnaireFlowManager.instance) {
      QuestionnaireFlowManager.instance = new QuestionnaireFlowManager();
    }
    return QuestionnaireFlowManager.instance;
  }

  private initializeBranchingRules() {
    // Add sophisticated branching rules
    this.addBranchingRule({
      questionId: 'education',
      condition: (answers) => {
        const education = answers['education'] || [];
        return education.includes("PhD") || education.includes("Master's Degree");
      },
      nextQuestionId: 'industry_experience'
    });

    this.addBranchingRule({
      questionId: 'industry_experience',
      condition: (answers) => {
        const industries = answers['industry_experience'] || [];
        return industries.length >= 3;
      },
      nextQuestionId: 'market_size'
    });

    // Add more complex branching rules based on multiple answers
    this.addBranchingRule({
      questionId: 'market_size',
      condition: (answers) => {
        const marketSize = answers['market_size'];
        const education = answers['education'] || [];
        const hasHigherEducation = education.includes("PhD") || education.includes("Master's Degree");
        return (marketSize === "Global" || marketSize === "International") && hasHigherEducation;
      },
      nextQuestionId: 'international_experience'
    });
  }

  public addBranchingRule(rule: BranchingRule) {
    this.branchingRules.push(rule);
  }

  public getNextQuestion(currentQuestionId: string, answers: { [key: string]: any }): string | null {
    // Check custom branching rules first
    const matchingRule = this.branchingRules.find(rule => 
      rule.questionId === currentQuestionId && rule.condition(answers)
    );

    if (matchingRule) {
      return matchingRule.nextQuestionId;
    }

    // Fall back to default branching logic
    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    if (!currentQuestion) return null;

    if (typeof currentQuestion.nextQuestionId === 'function') {
      return currentQuestion.nextQuestionId(answers[currentQuestionId]);
    }

    if (typeof currentQuestion.nextQuestionId === 'string') {
      return currentQuestion.nextQuestionId;
    }

    return null;
  }

  public createCheckpoint(progress: QuestionnaireProgress): void {
    const currentQuestion = questions.find(q => q.id === progress.currentQuestionId);
    
    if (currentQuestion?.checkpoint) {
      this.checkpoints.push({
        questionId: progress.currentQuestionId,
        timestamp: Date.now(),
        answers: { ...progress.answers },
        progress: this.calculateProgress(progress.answers)
      });

      // Store checkpoint in localStorage
      this.saveCheckpointsToStorage();
    }
  }

  public restoreCheckpoint(checkpointId: string): QuestionnaireProgress | null {
    const checkpoint = this.checkpoints.find(cp => cp.questionId === checkpointId);
    
    if (checkpoint) {
      return {
        currentQuestionId: checkpoint.questionId,
        answers: { ...checkpoint.answers },
        completed: false,
        lastCheckpoint: checkpoint.questionId,
        lastSaved: checkpoint.timestamp
      };
    }

    return null;
  }

  public shouldAutoSave(lastSaved?: number): boolean {
    if (!lastSaved) return true;
    return Date.now() - lastSaved >= this.autoSaveInterval;
  }

  public autoSave(progress: QuestionnaireProgress): void {
    if (this.shouldAutoSave(progress.lastSaved)) {
      const updatedProgress = {
        ...progress,
        lastSaved: Date.now()
      };

      // Save to localStorage
      localStorage.setItem('questionnaireProgress', JSON.stringify(updatedProgress));
      this.lastAutoSave = Date.now();

      // Create checkpoint if current question is a checkpoint
      this.createCheckpoint(updatedProgress);
    }
  }

  public calculateProgress(answers: { [key: string]: any }): number {
    const answeredQuestions = Object.keys(answers).length;
    const totalQuestions = questions.length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }

  private saveCheckpointsToStorage(): void {
    localStorage.setItem('questionnaireCheckpoints', JSON.stringify(this.checkpoints));
  }

  public loadCheckpointsFromStorage(): void {
    const savedCheckpoints = localStorage.getItem('questionnaireCheckpoints');
    if (savedCheckpoints) {
      this.checkpoints = JSON.parse(savedCheckpoints);
    }
  }

  public getCheckpoints(): Checkpoint[] {
    return this.checkpoints;
  }

  public getLastCheckpoint(): Checkpoint | null {
    if (this.checkpoints.length === 0) return null;
    return this.checkpoints[this.checkpoints.length - 1];
  }

  public setAutoSaveInterval(interval: number): void {
    this.autoSaveInterval = interval;
  }

  public getAutoSaveInterval(): number {
    return this.autoSaveInterval;
  }
}

export const flowManager = QuestionnaireFlowManager.getInstance();

```

# src/lib/questionnaire/questions.ts

```ts
export interface Question {
  id: string;
  text: string;
  section: string;
  type: 'text' | 'choice' | 'multiple' | 'scale' | 'like-dislike' | 'yes-no';
  options?: string[];
  nextQuestionId?: string | { [key: string]: string } | ((answer: any) => string | null); // Enhanced branching logic
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  checkpoint?: boolean; // For progress saving
  skipIf?: (answers: { [key: string]: any }) => boolean; // Skip logic
}

export interface QuestionnaireProgress {
  currentQuestionId: string;
  answers: { [key: string]: any };
  completed: boolean;
  lastCheckpoint?: string;
  lastSaved?: number; // Timestamp for auto-save
}

export const questions: Question[] = [
  // Personal Background Section
  {
    id: "early_experiences",
    section: "Personal Background",
    text: "What early experiences have shaped your entrepreneurial interests?",
    type: "text",
    validation: { required: true, minLength: 50 },
    nextQuestionId: "education",
    checkpoint: true
  },
  {
    id: "education",
    section: "Personal Background",
    text: "What is your educational background?",
    type: "multiple",
    options: [
      "High School",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD",
      "Self-taught",
      "Professional Certifications",
      "Other"
    ],
    nextQuestionId: (answer: string[]) => {
      // Skip career aspirations for highly educated individuals
      if (answer.includes("PhD") || answer.includes("Master's Degree")) {
        return "industry_experience";
      }
      return "career_aspirations";
    },
    validation: { required: true }
  },
  {
    id: "career_aspirations",
    section: "Personal Background",
    text: "What are your long-term career aspirations?",
    type: "text",
    validation: { required: true },
    nextQuestionId: "industry_experience",
    checkpoint: true,
    skipIf: (answers) => {
      const education = answers["education"] || [];
      return education.includes("PhD") || education.includes("Master's Degree");
    }
  },

  // Market Analysis Section
  {
    id: "industry_experience",
    section: "Market Analysis",
    text: "What industries do you have experience in or knowledge about?",
    type: "multiple",
    options: [
      "Technology",
      "Healthcare",
      "Finance",
      "Education",
      "Retail",
      "Manufacturing",
      "Services",
      "Other"
    ],
    nextQuestionId: (answer: string[]) => {
      // Skip competition awareness for those with diverse experience
      if (answer.length >= 3) {
        return "market_size";
      }
      return "competition_awareness";
    },
    validation: { required: true }
  },
  {
    id: "competition_awareness",
    section: "Market Analysis",
    text: "How would you rate your understanding of market competition?",
    type: "scale",
    nextQuestionId: "market_size",
    validation: { required: true },
    skipIf: (answers) => {
      const industries = answers["industry_experience"] || [];
      return industries.length >= 3;
    }
  },
  {
    id: "market_size",
    section: "Market Analysis",
    text: "What market size are you targeting for your business?",
    type: "choice",
    options: [
      "Local/Regional",
      "National",
      "International",
      "Global",
      "Niche Market",
      "Not Sure Yet"
    ],
    nextQuestionId: (answer: string) => {
      // Additional questions for global aspirations
      if (answer === "Global" || answer === "International") {
        return "international_experience";
      }
      return "work_style";
    },
    checkpoint: true
  },
  {
    id: "international_experience",
    section: "Market Analysis",
    text: "Do you have experience working with international markets?",
    type: "yes-no",
    nextQuestionId: "work_style",
    skipIf: (answers) => {
      const marketSize = answers["market_size"];
      return marketSize !== "Global" && marketSize !== "International";
    }
  },

  // Business Operations Section
  {
    id: "work_style",
    section: "Business Operations",
    text: "What's your preferred work style?",
    type: "choice",
    options: [
      "Independent Worker",
      "Team Leader",
      "Collaborative",
      "Hybrid Approach"
    ],
    nextQuestionId: (answer: string) => {
      // Skip management questions for independent workers
      if (answer === "Independent Worker") {
        return "investment_capacity";
      }
      return "management_approach";
    }
  },
  {
    id: "management_approach",
    section: "Business Operations",
    text: "What management approach resonates with you?",
    type: "choice",
    options: [
      "Hands-on Leadership",
      "Delegative Management",
      "Democratic Decision-making",
      "Results-oriented Management"
    ],
    nextQuestionId: "team_building",
    skipIf: (answers) => answers["work_style"] === "Independent Worker"
  },
  {
    id: "team_building",
    section: "Business Operations",
    text: "How do you plan to build your team?",
    type: "multiple",
    options: [
      "Hire Full-time Employees",
      "Work with Contractors",
      "Build Remote Team",
      "Start Solo",
      "Partner with Others"
    ],
    nextQuestionId: "investment_capacity",
    checkpoint: true,
    skipIf: (answers) => answers["work_style"] === "Independent Worker"
  },

  // Financial Planning Section
  {
    id: "investment_capacity",
    section: "Financial Planning",
    text: "What is your initial investment capacity?",
    type: "choice",
    options: [
      "Bootstrap (< $5,000)",
      "Small Investment ($5,000 - $25,000)",
      "Medium Investment ($25,000 - $100,000)",
      "Large Investment (> $100,000)",
      "Seeking External Funding"
    ],
    nextQuestionId: (answer: string) => {
      // Additional funding questions for larger investments
      if (answer === "Large Investment (> $100,000)" || answer === "Seeking External Funding") {
        return "funding_timeline";
      }
      return "revenue_expectations";
    }
  },
  {
    id: "funding_timeline",
    section: "Financial Planning",
    text: "What is your expected timeline for securing funding?",
    type: "choice",
    options: [
      "Immediate",
      "3-6 months",
      "6-12 months",
      "More than 12 months"
    ],
    nextQuestionId: "revenue_expectations",
    skipIf: (answers) => {
      const investment = answers["investment_capacity"];
      return investment !== "Large Investment (> $100,000)" && investment !== "Seeking External Funding";
    }
  },
  {
    id: "revenue_expectations",
    section: "Financial Planning",
    text: "What are your first-year revenue expectations?",
    type: "choice",
    options: [
      "< $50,000",
      "$50,000 - $100,000",
      "$100,000 - $500,000",
      "> $500,000",
      "Not Sure Yet"
    ],
    nextQuestionId: "risk_tolerance",
    checkpoint: true
  },
  {
    id: "risk_tolerance",
    section: "Financial Planning",
    text: "How would you describe your risk tolerance?",
    type: "scale",
    nextQuestionId: "digital_literacy",
    checkpoint: true
  },

  // Technical Capabilities Section
  {
    id: "digital_literacy",
    section: "Technical Capabilities",
    text: "Rate your comfort level with digital technologies:",
    type: "scale",
    nextQuestionId: (answer: number) => {
      // Skip basic tech questions for highly tech-savvy users
      if (answer >= 4) {
        return "advanced_tech_skills";
      }
      return "tech_skills";
    }
  },
  {
    id: "tech_skills",
    section: "Technical Capabilities",
    text: "What technical skills do you possess?",
    type: "multiple",
    options: [
      "Programming/Development",
      "Digital Marketing",
      "Data Analysis",
      "Design/UX",
      "Project Management",
      "None Yet"
    ],
    nextQuestionId: "software_proficiency",
    skipIf: (answers) => (answers["digital_literacy"] || 0) >= 4
  },
  {
    id: "advanced_tech_skills",
    section: "Technical Capabilities",
    text: "Which advanced technical areas are you proficient in?",
    type: "multiple",
    options: [
      "Cloud Architecture",
      "AI/Machine Learning",
      "Blockchain",
      "DevOps",
      "Cybersecurity",
      "System Design"
    ],
    nextQuestionId: "software_proficiency",
    skipIf: (answers) => (answers["digital_literacy"] || 0) < 4
  },
  {
    id: "software_proficiency",
    section: "Technical Capabilities",
    text: "Which business software are you proficient in?",
    type: "multiple",
    options: [
      "Office Suite",
      "Accounting Software",
      "CRM Systems",
      "Design Tools",
      "Project Management Tools",
      "Development Tools",
      "None Yet"
    ],
    checkpoint: true
  }
];

export const getNextQuestionId = (currentQuestion: Question, answer: any): string | null => {
  if (!currentQuestion.nextQuestionId) return null;
  
  if (typeof currentQuestion.nextQuestionId === 'function') {
    return currentQuestion.nextQuestionId(answer);
  }
  
  if (typeof currentQuestion.nextQuestionId === 'string') {
    return currentQuestion.nextQuestionId;
  }
  
  return currentQuestion.nextQuestionId[answer] || currentQuestion.nextQuestionId['default'];
};

export const shouldSkipQuestion = (question: Question, answers: { [key: string]: any }): boolean => {
  return question.skipIf ? question.skipIf(answers) : false;
};

export const calculateProgress = (answers: { [key: string]: any }): number => {
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = questions.filter(q => !shouldSkipQuestion(q, answers)).length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
};

export const getCurrentSection = (questionId: string): string => {
  const question = questions.find(q => q.id === questionId);
  return question?.section || '';
};

export const getSectionProgress = (answers: { [key: string]: any }): { [key: string]: number } => {
  const sections = [...new Set(questions.map(q => q.section))];
  const progress: { [key: string]: number } = {};
  
  sections.forEach(section => {
    const sectionQuestions = questions.filter(q => q.section === section && !shouldSkipQuestion(q, answers));
    const answeredQuestions = sectionQuestions.filter(q => answers[q.id]);
    progress[section] = Math.round((answeredQuestions.length / sectionQuestions.length) * 100);
  });
  
  return progress;
};

export const getLastCheckpoint = (answers: { [key: string]: any }): string | null => {
  const answeredQuestions = questions.filter(q => answers[q.id] && !shouldSkipQuestion(q, answers));
  const lastCheckpoint = [...answeredQuestions].reverse().find(q => q.checkpoint);
  return lastCheckpoint?.id || null;
};

export const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

```

# src/lib/questionnaire/recommendations.ts

```ts
interface BusinessIdea {
  title: string
  description: string
  requirements: string[]
  timeCommitment: string
  initialInvestment: string
  skills: string[]
}

const businessIdeas: Record<string, BusinessIdea[]> = {
  "Technology / Software Development": [
    {
      title: "SaaS Platform",
      description: "Build a software-as-a-service solution targeting specific business needs",
      requirements: ["Technical expertise", "Problem-solving skills", "Market research"],
      timeCommitment: "Full-time",
      initialInvestment: "Low to Medium",
      skills: ["Programming", "UI/UX Design", "Business Development"]
    },
    {
      title: "Mobile App Development",
      description: "Create mobile applications for specific niches or problems",
      requirements: ["Mobile development skills", "UI/UX knowledge", "App store optimization"],
      timeCommitment: "Part-time to Full-time",
      initialInvestment: "Low",
      skills: ["Mobile Development", "UI/UX Design", "Marketing"]
    }
  ],
  "Business / Management": [
    {
      title: "Business Consulting",
      description: "Offer consulting services in your area of expertise",
      requirements: ["Industry experience", "Network", "Communication skills"],
      timeCommitment: "Flexible",
      initialInvestment: "Low",
      skills: ["Consulting", "Business Strategy", "Networking"]
    },
    {
      title: "Online Course Creation",
      description: "Create and sell online courses in your area of expertise",
      requirements: ["Subject matter expertise", "Content creation", "Marketing"],
      timeCommitment: "Part-time",
      initialInvestment: "Low",
      skills: ["Teaching", "Content Creation", "Digital Marketing"]
    }
  ],
  "Creative / Design": [
    {
      title: "Design Agency",
      description: "Offer design services to businesses and individuals",
      requirements: ["Design portfolio", "Client management", "Project management"],
      timeCommitment: "Flexible",
      initialInvestment: "Low",
      skills: ["Design", "Client Management", "Project Management"]
    },
    {
      title: "Digital Products Marketplace",
      description: "Create and sell digital design assets",
      requirements: ["Design skills", "E-commerce knowledge", "Marketing"],
      timeCommitment: "Part-time",
      initialInvestment: "Low",
      skills: ["Design", "E-commerce", "Digital Marketing"]
    }
  ],
  "Marketing / Sales": [
    {
      title: "Digital Marketing Agency",
      description: "Help businesses with their online marketing needs",
      requirements: ["Marketing expertise", "Client management", "Analytics"],
      timeCommitment: "Full-time",
      initialInvestment: "Low to Medium",
      skills: ["Digital Marketing", "Analytics", "Client Management"]
    },
    {
      title: "Social Media Management",
      description: "Manage social media presence for businesses",
      requirements: ["Social media expertise", "Content creation", "Client management"],
      timeCommitment: "Part-time to Full-time",
      initialInvestment: "Low",
      skills: ["Social Media", "Content Creation", "Client Management"]
    }
  ]
}

export function generateRecommendations(
  experience: string,
  interests: string,
  commitment: string,
  resources: string
): BusinessIdea[] {
  // Get ideas based on experience
  let recommendations = businessIdeas[experience] || []

  // Filter based on commitment level
  if (commitment === "Minimal time (5-10 hours/week)") {
    recommendations = recommendations.filter(idea => 
      idea.timeCommitment.includes("Part-time") || idea.timeCommitment === "Flexible"
    )
  }

  // Filter based on resources
  if (resources === "Just getting started") {
    recommendations = recommendations.filter(idea => 
      idea.initialInvestment === "Low"
    )
  }

  // If no recommendations match the criteria, provide general recommendations
  if (recommendations.length === 0) {
    recommendations = [
      {
        title: "Freelancing",
        description: "Start freelancing in your area of expertise",
        requirements: ["Relevant skills", "Time management", "Client communication"],
        timeCommitment: "Flexible",
        initialInvestment: "Low",
        skills: ["Time Management", "Communication", "Project Management"]
      },
      {
        title: "Online Teaching",
        description: "Share your knowledge through online teaching platforms",
        requirements: ["Subject expertise", "Communication skills", "Basic tech setup"],
        timeCommitment: "Part-time",
        initialInvestment: "Low",
        skills: ["Teaching", "Communication", "Basic Tech"]
      }
    ]
  }

  return recommendations
}

export function getResourceRecommendations(resources: string): string[] {
  const baseRecommendations = [
    "Complete your profile to unlock personalized recommendations",
    "Join our community to connect with other entrepreneurs",
    "Explore our resource library for startup guides and templates"
  ]

  const resourceSpecificRecommendations: Record<string, string[]> = {
    "Savings / Capital to invest": [
      "Consider hiring key team members",
      "Invest in professional branding and website",
      "Set up proper business infrastructure"
    ],
    "Technical skills": [
      "Build a minimum viable product (MVP)",
      "Focus on technical validation of your idea",
      "Consider offering technical consulting services"
    ],
    "Industry connections": [
      "Leverage your network for initial customers",
      "Seek mentorship from industry experts",
      "Consider partnership opportunities"
    ],
    "Marketing expertise": [
      "Create a comprehensive marketing strategy",
      "Build your personal brand",
      "Start content marketing early"
    ],
    "Just getting started": [
      "Focus on market research and validation",
      "Start with a side project while maintaining current income",
      "Build your skills through online courses and workshops"
    ]
  }

  return [
    ...baseRecommendations,
    ...(resourceSpecificRecommendations[resources] || [])
  ]
}

```

# src/lib/questionnaire/service.ts

```ts
import { Question, QuestionType, QuestionnaireResponse, BusinessRecommendation, QuestionnaireResult, QuestionnaireSection } from '@/lib/types/questionnaire';

export const QUESTIONNAIRE_SECTIONS: QuestionnaireSection[] = [
  {
    title: 'Personal Interests and Passions',
    description: 'Let\'s discover what drives and excites you.',
    questions: [
      {
        id: '1',
        text: 'What activities or topics are you most passionate about?',
        type: 'text' as QuestionType,
        aiSuggestion: 'Think about activities that make you lose track of time.',
        followUpQuestion: 'What specifically excites you about these activities?'
      },
      {
        id: '2',
        text: 'Would you prefer your business to align with your personal passions?',
        type: 'yes-no' as QuestionType,
        aiSuggestion: 'Consider how combining passion with business could affect your motivation.'
      }
    ]
  },
  {
    title: 'Skills and Expertise',
    description: 'Understanding your capabilities helps identify suitable opportunities.',
    questions: [
      {
        id: '3',
        text: 'How would you rate your comfort level with technology?',
        type: 'scale' as QuestionType,
        aiSuggestion: '1 = Beginner, 5 = Expert. This helps us suggest suitable tech-based opportunities.'
      },
      {
        id: '4',
        text: 'Which skills would you like to leverage in your business?',
        type: 'multiple' as QuestionType,
        options: [
          'Technical/Programming',
          'Design/Creative',
          'Marketing/Sales',
          'Writing/Content Creation',
          'Teaching/Coaching',
          'Management/Leadership'
        ],
        homework: 'Consider taking online courses to strengthen your chosen skills.'
      }
    ]
  }
];

export const questionnaireService = {
  async submitQuestionnaire(
    userId: string,
    responses: QuestionnaireResponse[]
  ): Promise<QuestionnaireResult> {
    try {
      const result = await fetch('/api/questionnaire/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          answers: responses,
        }),
      });

      if (!result.ok) {
        throw new Error('Failed to submit questionnaire');
      }

      return result.json();
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      throw error;
    }
  },

  async generateRecommendations(
    responses: QuestionnaireResponse[]
  ): Promise<BusinessRecommendation[]> {
    try {
      const result = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses }),
      });

      if (!result.ok) {
        throw new Error('Failed to generate recommendations');
      }

      return result.json();
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  },

  async getLatestResponses(): Promise<QuestionnaireResponse[]> {
    try {
      const result = await fetch('/api/questionnaire/responses/latest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!result.ok) {
        throw new Error('Failed to fetch latest responses');
      }

      return result.json();
    } catch (error) {
      console.error('Error fetching latest responses:', error);
      throw error;
    }
  },

  getNextQuestion(currentQuestionId: string): Question | null {
    let foundCurrent = false;
    
    for (const section of QUESTIONNAIRE_SECTIONS) {
      for (const question of section.questions) {
        if (foundCurrent) {
          return question;
        }
        if (question.id === currentQuestionId) {
          foundCurrent = true;
        }
      }
    }
    
    return null;
  },

  calculateProgress(currentQuestionId: string): number {
    let totalQuestions = 0;
    let currentQuestionIndex = 0;

    QUESTIONNAIRE_SECTIONS.forEach((section: QuestionnaireSection) => {
      section.questions.forEach((question: Question) => {
        if (question.id === currentQuestionId) {
          currentQuestionIndex = totalQuestions;
        }
        totalQuestions++;
      });
    });

    return (currentQuestionIndex / totalQuestions) * 100;
  },

  getAllQuestions(): Question[] {
    return QUESTIONNAIRE_SECTIONS.flatMap(section => section.questions);
  },

  getCurrentSection(questionId: string): QuestionnaireSection | null {
    for (const section of QUESTIONNAIRE_SECTIONS) {
      if (section.questions.some((q: Question) => q.id === questionId)) {
        return section;
      }
    }
    return null;
  }
};

```

# src/lib/recommendations/service.ts

```ts
import { supabase } from "../supabase/config"
import type { Database } from "@/types/database"

type SavedRecommendation = Database["public"]["Tables"]["saved_recommendations"]["Row"]
type InsertRecommendation = Database["public"]["Tables"]["saved_recommendations"]["Insert"]
type UpdateRecommendation = Database["public"]["Tables"]["saved_recommendations"]["Update"]

export type RecommendationType = "business_idea" | "follow_up" | "suggestion" | "insight"

export const recommendationsService = {
  async saveRecommendation(
    userId: string,
    type: RecommendationType,
    content: string,
    notes?: string
  ) {
    const recommendation: InsertRecommendation = {
      user_id: userId,
      recommendation_type: type,
      content,
      notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from("saved_recommendations")
      .insert([recommendation])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUserRecommendations(userId: string) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async toggleFavorite(id: string, isFavorite: boolean) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .update({ 
        is_favorite: isFavorite,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateNotes(id: string, notes: string) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .update({ 
        notes,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteRecommendation(id: string) {
    const { error } = await supabase
      .from("saved_recommendations")
      .delete()
      .eq("id", id)

    if (error) throw error
  },

  async getFavorites(userId: string) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .select("*")
      .eq("user_id", userId)
      .eq("is_favorite", true)
      .order("updated_at", { ascending: false })

    if (error) throw error
    return data
  },

  async getRecommendationsByType(userId: string, type: RecommendationType) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .select("*")
      .eq("user_id", userId)
      .eq("recommendation_type", type)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }
}

```

# src/lib/stripe/config.ts

```ts
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
}

// Subscription tiers and their Stripe Price IDs
export const SUBSCRIPTION_TIERS = {
  basic: 'basic',
  pro: 'pro',
  enterprise: 'enterprise'
} as const

export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS]

// Usage limits per tier
export const USAGE_LIMITS = {
  [SUBSCRIPTION_TIERS.basic]: {
    ideaGenerations: 10,
    savedIdeas: 20,
    aiQueries: 50
  },
  [SUBSCRIPTION_TIERS.pro]: {
    ideaGenerations: 50,
    savedIdeas: 100,
    aiQueries: 250
  },
  [SUBSCRIPTION_TIERS.enterprise]: {
    ideaGenerations: -1, // Unlimited
    savedIdeas: -1, // Unlimited
    aiQueries: -1 // Unlimited
  }
} as const

export const SUBSCRIPTION_FEATURES = {
  [SUBSCRIPTION_TIERS.basic]: {
    features: [
      'Basic idea generation',
      'Simple recommendations',
      'Standard support',
      'Basic analytics'
    ] as const
  },
  [SUBSCRIPTION_TIERS.pro]: {
    features: [
      'Advanced idea generation',
      'Detailed recommendations',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'Team collaboration (up to 5)',
      'API access'
    ] as const
  },
  [SUBSCRIPTION_TIERS.enterprise]: {
    features: [
      'Unlimited idea generation',
      'Custom AI models',
      'Dedicated support',
      'Enterprise analytics',
      'White labeling',
      'Unlimited team members',
      'Priority API access',
      'Custom integrations',
      'SLA guarantees'
    ] as const
  }
} as const

// Define available features for each tier
type BasicFeatures = {
  ideaGeneration: true
  simpleRecommendations: true
  basicAnalytics: true
}

type ProFeatures = BasicFeatures & {
  advancedGeneration: true
  detailedRecommendations: true
  advancedAnalytics: true
  customBranding: true
  teamCollaboration: true
  apiAccess: true
}

type EnterpriseFeatures = ProFeatures & {
  unlimitedGeneration: true
  customAiModels: true
  whiteLabeling: true
  unlimitedTeam: true
  priorityApi: true
  customIntegrations: true
  slaGuarantee: true
}

// Feature flags for subscription tiers
export const FEATURE_FLAGS: {
  [SUBSCRIPTION_TIERS.basic]: BasicFeatures
  [SUBSCRIPTION_TIERS.pro]: ProFeatures
  [SUBSCRIPTION_TIERS.enterprise]: EnterpriseFeatures
} = {
  [SUBSCRIPTION_TIERS.basic]: {
    ideaGeneration: true,
    simpleRecommendations: true,
    basicAnalytics: true
  },
  [SUBSCRIPTION_TIERS.pro]: {
    ideaGeneration: true,
    simpleRecommendations: true,
    basicAnalytics: true,
    advancedGeneration: true,
    detailedRecommendations: true,
    advancedAnalytics: true,
    customBranding: true,
    teamCollaboration: true,
    apiAccess: true
  },
  [SUBSCRIPTION_TIERS.enterprise]: {
    ideaGeneration: true,
    simpleRecommendations: true,
    basicAnalytics: true,
    advancedGeneration: true,
    detailedRecommendations: true,
    advancedAnalytics: true,
    customBranding: true,
    teamCollaboration: true,
    apiAccess: true,
    unlimitedGeneration: true,
    customAiModels: true,
    whiteLabeling: true,
    unlimitedTeam: true,
    priorityApi: true,
    customIntegrations: true,
    slaGuarantee: true
  }
} as const

export type FeatureFlag = keyof EnterpriseFeatures

// Subscription status types
export type SubscriptionStatus = 
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid'

// Subscription event types that we handle
export const SUBSCRIPTION_EVENTS = {
  CREATED: 'customer.subscription.created',
  UPDATED: 'customer.subscription.updated',
  DELETED: 'customer.subscription.deleted',
  PAYMENT_FAILED: 'invoice.payment_failed',
  USAGE_ALERT: 'usage.alert'
} as const

export type SubscriptionEvent = typeof SUBSCRIPTION_EVENTS[keyof typeof SUBSCRIPTION_EVENTS]

// Grace period configuration (in days)
export const GRACE_PERIODS = {
  PAYMENT_FAILURE: 3,
  USAGE_OVERAGE: 2
}

// Helper functions
export function isSubscriptionEvent(event: string): event is SubscriptionEvent {
  return Object.values(SUBSCRIPTION_EVENTS).includes(event as SubscriptionEvent)
}

export function isFeatureEnabled(feature: FeatureFlag, tier: SubscriptionTier): boolean {
  return feature in FEATURE_FLAGS[tier]
}

export function getSubscriptionFeatures(tier: SubscriptionTier) {
  return SUBSCRIPTION_FEATURES[tier].features
}

export function getUsageLimits(tier: SubscriptionTier) {
  return USAGE_LIMITS[tier]
}

export function getTierFromPriceId(priceId: string): SubscriptionTier {
  const priceTierMap: Record<string, SubscriptionTier> = {
    [process.env.STRIPE_BASIC_PRICE_ID!]: SUBSCRIPTION_TIERS.basic,
    [process.env.STRIPE_PRO_PRICE_ID!]: SUBSCRIPTION_TIERS.pro,
    [process.env.STRIPE_ENTERPRISE_PRICE_ID!]: SUBSCRIPTION_TIERS.enterprise
  }
  return priceTierMap[priceId] || SUBSCRIPTION_TIERS.basic
}

```

# src/lib/stripe/service.ts

```ts
import { stripe } from './config';
import {
  SUBSCRIPTION_TIERS,
  SubscriptionTier,
  SubscriptionStatus
} from './config';

interface SubscriptionDetails {
  id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  current_period_end: string;
  cancel_at_period_end: boolean;
  usage?: {
    ideaGenerations: number;
    savedIdeas: number;
    aiQueries: number;
  };
}

export const stripeService = {
  getPriceIdForTier(tier: SubscriptionTier): string {
    const priceIds = {
      [SUBSCRIPTION_TIERS.basic]: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
      [SUBSCRIPTION_TIERS.pro]: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
      [SUBSCRIPTION_TIERS.enterprise]: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID
    };

    const priceId = priceIds[tier];
    if (!priceId) {
      throw new Error(`No price ID configured for tier: ${tier}`);
    }

    return priceId;
  },

  async createCheckoutSession(
    userId: string,
    tier: SubscriptionTier = SUBSCRIPTION_TIERS.basic,
    customFields?: Record<string, any>
  ) {
    const priceId = this.getPriceIdForTier(tier);

    const session = await stripe.checkout.sessions.create({
      customer: userId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      metadata: customFields
    });

    return session;
  },

  async createPortalSession(userId: string) {
    return stripe.billingPortal.sessions.create({
      customer: userId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    });
  },

  async getSubscriptionDetails(userId: string): Promise<SubscriptionDetails | null> {
    const subscriptions = await stripe.subscriptions.list({
      customer: userId,
      status: 'active',
      expand: ['data.default_payment_method']
    });

    if (!subscriptions.data.length) return null;

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;
    const tier = Object.entries(SUBSCRIPTION_TIERS).find(
      ([_, id]) => this.getPriceIdForTier(id as SubscriptionTier) === priceId
    )?.[1] as SubscriptionTier;

    // Get usage metrics from our database
    const usage = await this.getSubscriptionUsage(userId);

    return {
      id: subscription.id,
      tier: tier || SUBSCRIPTION_TIERS.basic,
      status: subscription.status as SubscriptionStatus,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      usage
    };
  },

  async getSubscriptionUsage(userId: string) {
    // Implement fetching usage metrics from your database
    // This is a placeholder implementation
    return {
      ideaGenerations: 0,
      savedIdeas: 0,
      aiQueries: 0
    };
  },

  async cancelSubscription(subscriptionId: string) {
    return stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });
  },

  async reactivateSubscription(subscriptionId: string) {
    return stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false
    });
  }
};

```

# src/lib/supabase/config.ts

```ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Since we've checked for undefined above, we can safely assert these as strings
const url = supabaseUrl as string;
const anonKey = supabaseAnonKey as string;

export function createClient() {
  return createSupabaseClient<Database>(
    url,
    anonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: true,
      },
    }
  );
}

// Create a single instance for use throughout the app
export const supabase = createClient();

// Type helper for database responses
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Helper function to handle Supabase responses
export async function handleSupabaseResponse<T>(
  promise: Promise<{ data: T | null; error: any }>
): Promise<T> {
  const { data, error } = await promise;
  
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  if (!data) {
    throw new Error('No data returned from Supabase');
  }
  
  return data;
}

```

# src/lib/types/questionnaire.ts

```ts
export type QuestionType = 'text' | 'choice' | 'multiple' | 'scale' | 'like-dislike' | 'yes-no';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  section?: string;
  options?: string[];
  aiSuggestion?: string;
  followUpQuestion?: string;
  homework?: string;
}

export interface QuestionnaireSection {
  title: string;
  description: string;
  questions: Question[];
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string | string[] | number | boolean;
  timestamp: string;
}

export interface QuestionnaireResult {
  userId: string;
  responses: QuestionnaireResponse[];
  completedAt: string;
  recommendations?: BusinessRecommendation[];
}

export interface BusinessRecommendation {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  reasons: string[];
  marketPotential: string;
  requiredSkills: string[];
  estimatedStartupCost: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: {
    preparation: string;
    launch: string;
    breakeven: string;
  };
  nextSteps: string[];
}

```

# src/lib/usage/service.ts

```ts
import { createClient } from '@supabase/supabase-js'
import { USAGE_LIMITS, SubscriptionTier } from '@/lib/stripe/config'
import { stripeService } from '@/lib/stripe/service'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface UsageMetrics {
  ideaGenerations: number
  savedIdeas: number
  aiQueries: number
}

export const usageService = {
  async getUserUsage(userId: string): Promise<UsageMetrics> {
    const { data, error } = await supabase
      .from('usage_metrics')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching user usage:', error)
      return { ideaGenerations: 0, savedIdeas: 0, aiQueries: 0 }
    }

    return {
      ideaGenerations: data?.idea_generations || 0,
      savedIdeas: data?.saved_ideas || 0,
      aiQueries: data?.ai_queries || 0
    }
  },

  async resetUsage(userId: string): Promise<void> {
    const { error } = await supabase
      .from('usage_metrics')
      .upsert({
        user_id: userId,
        idea_generations: 0,
        saved_ideas: 0,
        ai_queries: 0,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error resetting user usage:', error)
      throw new Error('Failed to reset usage metrics')
    }
  },

  async incrementUsage(
    userId: string,
    metric: keyof UsageMetrics,
    subscriptionId?: string
  ): Promise<boolean> {
    // Get current subscription details
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('subscription_tier, subscription_status, usage_limits')
      .eq('user_id', userId)
      .single()

    if (!profile) {
      throw new Error('User profile not found')
    }

    const tier = profile.subscription_tier as SubscriptionTier
    const limits = USAGE_LIMITS[tier]

    // Get current usage
    const currentUsage = await this.getUserUsage(userId)
    const newValue = currentUsage[metric] + 1

    // Check if user has exceeded their limit
    if (limits[metric] !== -1 && newValue > limits[metric]) {
      return false
    }

    // Update usage in database
    const { error } = await supabase
      .from('usage_metrics')
      .upsert({
        user_id: userId,
        [metric]: newValue,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error updating usage metrics:', error)
      throw new Error('Failed to update usage metrics')
    }

    // Report usage to Stripe if subscription ID is provided
    if (subscriptionId) {
      try {
        await stripeService.reportUsage(subscriptionId, metric, newValue)
      } catch (error) {
        console.error('Error reporting usage to Stripe:', error)
        // Continue even if Stripe reporting fails
      }
    }

    // Check if usage is approaching limit and notify if needed
    if (limits[metric] !== -1) {
      const usagePercentage = (newValue / limits[metric]) * 100
      if (usagePercentage >= 80) {
        await this.notifyUsageLimit(userId, tier, metric, newValue, limits[metric])
      }
    }

    return true
  },

  async notifyUsageLimit(
    userId: string,
    tier: SubscriptionTier,
    metric: keyof UsageMetrics,
    currentUsage: number,
    limit: number
  ): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'usage_limit',
        title: 'Usage Limit Warning',
        message: `You've used ${currentUsage} out of ${limit} ${metric}. Consider upgrading your plan for unlimited usage.`,
        metadata: {
          tier,
          metric,
          currentUsage,
          limit
        },
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error creating usage notification:', error)
    }
  },

  async checkGracePeriod(userId: string): Promise<boolean> {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('payment_failure_grace_period_end, usage_overage_grace_period_end')
      .eq('user_id', userId)
      .single()

    if (!profile) {
      return false
    }

    const now = new Date()
    const paymentGracePeriodEnd = profile.payment_failure_grace_period_end
      ? new Date(profile.payment_failure_grace_period_end)
      : null
    const usageGracePeriodEnd = profile.usage_overage_grace_period_end
      ? new Date(profile.usage_overage_grace_period_end)
      : null

    return (
      (paymentGracePeriodEnd !== null && now < paymentGracePeriodEnd) ||
      (usageGracePeriodEnd !== null && now < usageGracePeriodEnd)
    )
  },

  async getUsageAnalytics(userId: string): Promise<{
    current: UsageMetrics
    limits: typeof USAGE_LIMITS[SubscriptionTier]
    history: Array<{ date: string } & UsageMetrics>
  }> {
    // Get current usage and limits
    const [currentUsage, profile] = await Promise.all([
      this.getUserUsage(userId),
      supabase
        .from('user_profiles')
        .select('subscription_tier')
        .eq('user_id', userId)
        .single()
    ])

    if (!profile.data) {
      throw new Error('User profile not found')
    }

    const tier = profile.data.subscription_tier as SubscriptionTier
    const limits = USAGE_LIMITS[tier]

    // Get usage history
    const { data: history, error } = await supabase
      .from('usage_history')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(30)

    if (error) {
      console.error('Error fetching usage history:', error)
      throw new Error('Failed to fetch usage history')
    }

    return {
      current: currentUsage,
      limits,
      history: history.map(record => ({
        date: record.date,
        ideaGenerations: record.idea_generations,
        savedIdeas: record.saved_ideas,
        aiQueries: record.ai_queries
      }))
    }
  }
}

```

# src/lib/utils.ts

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# src/lib/utils/api-error.ts

```ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
          code: error.code,
        },
      }),
      {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Handle unknown errors
  return new Response(
    JSON.stringify({
      error: {
        message: 'An unexpected error occurred',
        code: 'INTERNAL_SERVER_ERROR',
      },
    }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export const throwIfUnauthorized = (condition: boolean) => {
  if (condition) {
    throw new APIError('Unauthorized', 401, 'UNAUTHORIZED');
  }
};

export const throwIfNotFound = (condition: boolean) => {
  if (condition) {
    throw new APIError('Resource not found', 404, 'NOT_FOUND');
  }
};

export const throwIfBadRequest = (condition: boolean, message?: string) => {
  if (condition) {
    throw new APIError(message || 'Bad request', 400, 'BAD_REQUEST');
  }
};

```

# src/lib/utils/cache.ts

```ts
type CacheEntry = {
  data: string;
  timestamp: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry>;
  private ttl: number; // Time to live in milliseconds

  constructor(ttlMinutes: number = 60) {
    this.cache = new Map();
    this.ttl = ttlMinutes * 60 * 1000;
  }

  set(key: string, value: string): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now()
    });
  }

  get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private maxTokens: number;
  private refillRate: number; // tokens per second

  constructor(maxTokens: number = 10, refillRate: number = 0.5) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
    this.maxTokens = maxTokens;
    this.refillRate = refillRate;
  }

  async waitForToken(): Promise<boolean> {
    this.refillTokens();

    if (this.tokens < 1) {
      const waitTime = Math.ceil((1 - this.tokens) / this.refillRate) * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.refillTokens();
    }

    this.tokens -= 1;
    return true;
  }

  private refillTokens(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000; // convert to seconds
    const newTokens = timePassed * this.refillRate;
    
    this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
    this.lastRefill = now;
  }
}

export const cache = new MemoryCache();
export const rateLimiter = new RateLimiter();

```

# src/lib/utils/form-validation.ts

```ts
import { z } from 'zod'

export interface ValidationResult<T> {
  success: boolean
  data: T
  errors: Record<string, string[]>
}

export function validateFormData<T>(
  schema: z.Schema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.parse(data)
    return {
      success: true,
      data: result,
      errors: {}
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(err.message)
      })
      return {
        success: false,
        data: {} as T,
        errors
      }
    }
    return {
      success: false,
      data: {} as T,
      errors: { _form: ['An unexpected error occurred'] }
    }
  }
}

```

# src/lib/utils/index.ts

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# src/lib/utils/rate-limiter.ts

```ts
import Redis from 'ioredis';
import { logger } from '../monitoring';

interface RateLimitConfig {
  points?: number;        // Number of requests allowed
  duration?: number;      // Time window in seconds
  blockDuration?: number; // Duration to block if limit exceeded (seconds)
  prefix?: string;       // Redis key prefix
}

interface RateLimitInfo {
  remaining: number;     // Remaining points in current window
  reset: number;        // Timestamp when points reset
  blocked: boolean;     // Whether requester is currently blocked
}

export class RateLimiter {
  private redis: Redis;
  private points: number;
  private duration: number;
  private blockDuration: number;
  private prefix: string;

  constructor(config: RateLimitConfig = {}) {
    const {
      points = 10,
      duration = 60,
      blockDuration = 600,
      prefix = 'ai:ratelimit:'
    } = config;

    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      }
    });

    this.points = points;
    this.duration = duration;
    this.blockDuration = blockDuration;
    this.prefix = prefix;

    this.redis.on('error', (error: Error) => {
      logger.error('Redis rate limiter error:', error);
    });
  }

  private getPointsKey(id: string): string {
    return `${this.prefix}${id}:points`;
  }

  private getBlockKey(id: string): string {
    return `${this.prefix}${id}:blocked`;
  }

  async isBlocked(id: string): Promise<boolean> {
    const blocked = await this.redis.get(this.getBlockKey(id));
    return !!blocked;
  }

  async getRateLimit(id: string): Promise<RateLimitInfo> {
    const [pointsStr, blocked] = await Promise.all([
      this.redis.get(this.getPointsKey(id)),
      this.isBlocked(id)
    ]);

    const points = pointsStr ? parseInt(pointsStr) : this.points;
    const ttl = await this.redis.ttl(this.getPointsKey(id));
    
    return {
      remaining: Math.max(0, points),
      reset: Date.now() + (ttl >= 0 ? ttl * 1000 : this.duration * 1000),
      blocked
    };
  }

  async consume(id: string): Promise<RateLimitInfo> {
    const blocked = await this.isBlocked(id);
    if (blocked) {
      throw new Error('Rate limit exceeded - currently blocked');
    }

    const pointsKey = this.getPointsKey(id);
    const points = await this.redis.get(pointsKey);

    if (!points) {
      // First request in window
      await this.redis.setex(pointsKey, this.duration, this.points - 1);
      return this.getRateLimit(id);
    }

    const remaining = parseInt(points);
    if (remaining <= 0) {
      // Block the requester
      await this.redis.setex(this.getBlockKey(id), this.blockDuration, '1');
      throw new Error('Rate limit exceeded');
    }

    // Consume a point
    await this.redis.decrby(pointsKey, 1);
    return this.getRateLimit(id);
  }

  async reset(id: string): Promise<void> {
    await Promise.all([
      this.redis.del(this.getPointsKey(id)),
      this.redis.del(this.getBlockKey(id))
    ]);
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}

// Export a singleton instance with default configuration
export const rateLimiter = new RateLimiter();

// Export error types for better error handling
export class RateLimitError extends Error {
  constructor(message: string, public readonly retryAfter: number) {
    super(message);
    this.name = 'RateLimitError';
  }
}

```

# src/lib/utils/redis-cache.ts

```ts
import Redis from 'ioredis';
import { logger } from '../monitoring';

interface CacheConfig {
  host?: string;
  port?: number;
  password?: string;
  ttl?: number; // Time to live in seconds
  prefix?: string;
}

interface CacheMetrics {
  hits: number;
  misses: number;
  errors: number;
}

export class RedisCache {
  private redis: Redis;
  private ttl: number;
  private prefix: string;
  private metrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    errors: 0,
  };

  constructor(config: CacheConfig = {}) {
    const {
      host = process.env.REDIS_HOST || 'localhost',
      port = parseInt(process.env.REDIS_PORT || '6379'),
      password = process.env.REDIS_PASSWORD,
      ttl = 3600, // 1 hour default
      prefix = 'ai:cache:',
    } = config;

    this.redis = new Redis({
      host,
      port,
      password,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.ttl = ttl;
    this.prefix = prefix;

    this.redis.on('error', (error) => {
      logger.error('Redis cache error:', error);
      this.metrics.errors++;
    });
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const cacheKey = this.getKey(key);
    try {
      if (ttl) {
        await this.redis.setex(cacheKey, ttl, value);
      } else {
        await this.redis.setex(cacheKey, this.ttl, value);
      }
    } catch (error) {
      logger.error('Error setting cache:', error);
      this.metrics.errors++;
    }
  }

  async get(key: string): Promise<string | null> {
    const cacheKey = this.getKey(key);
    try {
      const value = await this.redis.get(cacheKey);
      if (value) {
        this.metrics.hits++;
        return value;
      }
      this.metrics.misses++;
      return null;
    } catch (error) {
      logger.error('Error getting cache:', error);
      this.metrics.errors++;
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    const cacheKey = this.getKey(key);
    try {
      await this.redis.del(cacheKey);
    } catch (error) {
      logger.error('Error deleting cache:', error);
      this.metrics.errors++;
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await this.redis.keys(`${this.prefix}*`);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      logger.error('Error clearing cache:', error);
      this.metrics.errors++;
    }
  }

  async getMetrics(): Promise<CacheMetrics> {
    return { ...this.metrics };
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}

// Export a singleton instance with default configuration
export const redisCache = new RedisCache();

```

# src/lib/utils/sanitize.ts

```ts
import { z } from 'zod';
import { ErrorLog, PerformanceMetric, AnalyticsEvent } from '@/lib/monitoring/types';

export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[&<>"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }[match] || ''))
    .replace(/<(.*?)>/g, '')
    .replace(/\0/g, '')
    .trim();
}

export function sanitizeObject<T extends object>(obj: T): T {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeString(item) : 
        item && typeof item === 'object' ? sanitizeObject(item) : 
        item
      );
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
}

export function sanitizeError(error: Error): Partial<Error> {
  return {
    name: sanitizeString(error.name),
    message: sanitizeString(error.message),
    stack: process.env.NODE_ENV === 'development' ? sanitizeString(error.stack || '') : undefined
  };
}

export function createSanitizedStringSchema(schema: z.ZodString = z.string()) {
  return schema.transform(sanitizeString);
}

export function sanitizeMonitoringData<T extends ErrorLog | PerformanceMetric | AnalyticsEvent>(data: T): T {
  return sanitizeObject(data);
}

export type SanitizedRequest<T> = {
  body: T;
  query: Record<string, string>;
  headers: Record<string, string>;
}

export function withSanitization<T>(schema: z.ZodType<T>) {
  return async (req: Request): Promise<SanitizedRequest<T>> => {
    const body = req.headers.get('content-type')?.includes('application/json') 
      ? await req.json()
      : {};

    const url = new URL(req.url);
    const query: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      query[key] = sanitizeString(value);
    });

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = sanitizeString(value);
    });

    const sanitizedBody = schema.parse(sanitizeObject(body));

    return { body: sanitizedBody, query, headers };
  };
}
```

# src/middleware.ts

```ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from './types/database';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis for rate limiting
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '5 s'),
});

const PROTECTED_ROUTES = ['/dashboard', '/questionnaire', '/payment', '/api/ai', '/api/questionnaire', '/api/recommendations'];
const PUBLIC_ROUTES = ['/', '/login', '/signup', '/pricing', '/password-reset'];

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://startupspark.com',
  'https://app.startupspark.com',
  'http://localhost:3000',
];

// Enhanced security headers
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.openai.com https://*.supabase.co https://api.stripe.com;",
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
};

// Track request metrics
async function trackRequestMetrics(req: NextRequest, startTime: number) {
  try {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const path = req.nextUrl.pathname;
    
    await fetch('/api/monitoring/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        duration,
        method: req.method,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Failed to track metrics:', error);
  }
}

export async function middleware(req: NextRequest) {
  const startTime = Date.now();

  // CORS handling
  const origin = req.headers.get('origin');
  const res = NextResponse.next();
  
  if (origin) {
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin);
    }
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.headers.set('Access-Control-Max-Age', '86400');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res;
  }

  // Rate limiting for API routes with different limits for authenticated users
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';
    const authHeader = req.headers.get('authorization');
    
    // More lenient rate limit for authenticated users
    const limit = authHeader ? 50 : 20;
    const window = authHeader ? '10 s' : '5 s';
    
    const rateLimiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(limit, window),
    });

    const { success } = await rateLimiter.limit(`${ip}:${authHeader ? 'auth' : 'unauth'}`);
    
    if (!success) {
      const retryAfter = 60; // Default retry after 60 seconds
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests',
          retryAfter
        }),
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfter)
          } 
        }
      );
    }
  }

  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Auth error:', error);
    await trackRequestMetrics(req, startTime);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const path = req.nextUrl.pathname;

  // Handle public routes
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    const response = addSecurityHeaders(res);
    await trackRequestMetrics(req, startTime);
    return response;
  }

  // Handle protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some(route => path.startsWith(route));
  if (isProtectedRoute) {
    if (!session) {
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirectTo', path);
      await trackRequestMetrics(req, startTime);
      return NextResponse.redirect(redirectUrl);
    }

    // Additional checks for premium API routes
    if (path.startsWith('/api/ai') || path.startsWith('/api/recommendations')) {
      try {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('subscription_status, subscription_tier')
          .eq('user_id', session.user.id)
          .single();

        if (!profile || profile.subscription_status !== 'active') {
          await trackRequestMetrics(req, startTime);
          return new NextResponse(
            JSON.stringify({
              error: 'Subscription required',
              message: 'Active subscription required',
            }),
            { status: 403, headers: { ...securityHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (error) {
        console.error('Subscription check error:', error);
        await trackRequestMetrics(req, startTime);
        return new NextResponse(
          JSON.stringify({ error: 'Internal server error' }),
          { status: 500, headers: { ...securityHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
  }

  const response = addSecurityHeaders(NextResponse.next({ request: { headers: req.headers } }));
  await trackRequestMetrics(req, startTime);
  return response;
}

function addSecurityHeaders(res: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value);
  });
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)',],
};

```

# src/types/database.ts

```ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      questionnaire_responses: {
        Row: {
          id: string;
          user_id: string;
          experience: string;
          interests: string;
          commitment: string;
          resources: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          experience: string;
          interests: string;
          commitment: string;
          resources: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          experience?: string;
          interests?: string;
          commitment?: string;
          resources?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          has_completed_questionnaire: boolean;
          stripe_customer_id: string | null;
          subscription_tier: 'free' | 'premium';
          subscription_status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete';
          subscription_period_start: string | null;
          subscription_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          has_completed_questionnaire?: boolean;
          stripe_customer_id?: string | null;
          subscription_tier?: 'free' | 'premium';
          subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete';
          subscription_period_start?: string | null;
          subscription_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          has_completed_questionnaire?: boolean;
          stripe_customer_id?: string | null;
          subscription_tier?: 'free' | 'premium';
          subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete';
          subscription_period_start?: string | null;
          subscription_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      saved_recommendations: {
        Row: {
          id: string;
          user_id: string;
          recommendation_type: 'business_idea' | 'follow_up' | 'suggestion' | 'insight';
          content: string;
          notes: string | null;
          is_favorite: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          recommendation_type: 'business_idea' | 'follow_up' | 'suggestion' | 'insight';
          content: string;
          notes?: string | null;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          recommendation_type?: 'business_idea' | 'follow_up' | 'suggestion' | 'insight';
          content?: string;
          notes?: string | null;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscription_history: {
        Row: {
          id: string;
          user_id: string;
          stripe_subscription_id: string;
          status: string;
          tier: string;
          period_start: string;
          period_end: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_subscription_id: string;
          status: string;
          tier: string;
          period_start: string;
          period_end: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_subscription_id?: string;
          status?: string;
          tier?: string;
          period_start?: string;
          period_end?: string;
          created_at?: string;
        };
      };
      usage_tracking: {
        Row: {
          id: string;
          user_id: string;
          feature_name: string;
          usage_count: number;
          period_start: string;
          period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          feature_name: string;
          usage_count?: number;
          period_start: string;
          period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          feature_name?: string;
          usage_count?: number;
          period_start?: string;
          period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          timestamp: string;
          event: string;
          properties: Json;
          user_id: string | null;
          session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          timestamp: string;
          event: string;
          properties: Json;
          user_id?: string | null;
          session_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          timestamp?: string;
          event?: string;
          properties?: Json;
          user_id?: string | null;
          session_id?: string | null;
          created_at?: string;
        };
      };
      request_metrics: {
        Row: {
          id: string;
          path: string;
          method: string;
          duration: number;
          timestamp: string;
          status_code: number | null;
          user_agent: string | null;
          ip: string | null;
          country: string | null;
          authenticated: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          path: string;
          method: string;
          duration: number;
          timestamp: string;
          status_code?: number | null;
          user_agent?: string | null;
          ip?: string | null;
          country?: string | null;
          authenticated?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          path?: string;
          method?: string;
          duration?: number;
          timestamp?: string;
          status_code?: number | null;
          user_agent?: string | null;
          ip?: string | null;
          country?: string | null;
          authenticated?: boolean;
          created_at?: string;
        };
      };
      error_logs: {
        Row: {
          id: string;
          severity: 'info' | 'warning' | 'error' | 'critical';
          error_name: string;
          error_message: string;
          error_stack: string | null;
          context: Json;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          severity: 'info' | 'warning' | 'error' | 'critical';
          error_name: string;
          error_message: string;
          error_stack?: string | null;
          context: Json;
          timestamp: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          severity?: 'info' | 'warning' | 'error' | 'critical';
          error_name?: string;
          error_message?: string;
          error_stack?: string | null;
          context?: Json;
          timestamp?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      update_subscription_status: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      increment_feature_usage: {
        Args: {
          p_user_id: string;
          p_feature_name: string;
        };
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

```

# src/types/jest.d.ts

```ts
import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(className: string): R
      toBeVisible(): R
      toBeDisabled(): R
      toHaveValue(value: string | string[] | number): R
      toBeChecked(): R
    }
  }
}

export {}

```

# structure.txt

```txt
.
├── README.md
├── codebase.md
├── docs
│   ├── api-documentation.md
│   ├── codebaseSummary.md
│   ├── critical-path-tests.md
│   ├── currentTask.md
│   ├── deployment-guide.md
│   ├── implementationGuide.md
│   ├── projectRoadmap.md
│   ├── quickStart.md
│   ├── stripe-setup-guide.md
│   ├── supabase-schema-updated.sql
│   ├── supabase-schema.sql
│   ├── techStack.md
│   ├── usage-tracking.sql
│   └── user-manual.md
├── jest.config.js
├── jest.setup.js
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── setup-database.sql
├── src
│   ├── __tests__
│   │   ├── api
│   │   │   └── stripe
│   │   │       └── webhook.test.ts
│   │   ├── payment
│   │   │   └── SubscriptionManager.test.tsx
│   │   └── questionnaire
│   │       ├── AIRecommendations.test.tsx
│   │       └── QuestionCard.test.tsx
│   ├── app
│   │   ├── (auth)
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   ├── password-reset
│   │   │   │   └── page.tsx
│   │   │   └── signup
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   ├── ai
│   │   │   │   └── generate
│   │   │   │       └── route.ts
│   │   │   ├── monitoring
│   │   │   │   ├── analytics
│   │   │   │   │   └── route.ts
│   │   │   │   ├── error
│   │   │   │   │   └── route.ts
│   │   │   │   └── performance
│   │   │   │       └── route.ts
│   │   │   ├── questionnaire
│   │   │   │   ├── responses
│   │   │   │   │   └── latest
│   │   │   │   │       └── route.ts
│   │   │   │   └── submit
│   │   │   │       └── route.ts
│   │   │   ├── recommendations
│   │   │   │   ├── [id]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── stripe
│   │   │       ├── checkout
│   │   │       │   └── route.ts
│   │   │       ├── subscription
│   │   │       │   └── route.ts
│   │   │       └── webhook
│   │   │           └── route.ts
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── debug
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── payment
│   │   │   ├── cancel
│   │   │   │   └── page.tsx
│   │   │   └── success
│   │   │       └── page.tsx
│   │   ├── pricing
│   │   │   └── page.tsx
│   │   └── questionnaire
│   │       ├── page.tsx
│   │       └── results
│   │           └── page.tsx
│   ├── components
│   │   ├── auth
│   │   │   └── AuthProviderWrapper.tsx
│   │   ├── dashboard
│   │   │   ├── SavedRecommendations.tsx
│   │   │   ├── export-features.tsx
│   │   │   ├── profile-settings.tsx
│   │   │   └── usage-statistics.tsx
│   │   ├── debug
│   │   │   └── DebugPanel.tsx
│   │   ├── error
│   │   │   └── ErrorBoundary.tsx
│   │   ├── ideas
│   │   ├── payment
│   │   │   └── SubscriptionManager.tsx
│   │   ├── questionnaire
│   │   │   ├── AIRecommendations.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   └── SaveRecommendationButton.tsx
│   │   └── ui
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       └── input.tsx
│   ├── lib
│   │   ├── ai
│   │   │   ├── config.ts
│   │   │   ├── service.ts
│   │   │   ├── templates.ts
│   │   │   └── types.ts
│   │   ├── auth
│   │   │   └── AuthContext.tsx
│   │   ├── hooks
│   │   │   ├── useAnalytics.ts
│   │   │   └── useSubscription.ts
│   │   ├── monitoring
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── questionnaire
│   │   │   ├── questions.ts
│   │   │   ├── recommendations.ts
│   │   │   └── service.ts
│   │   ├── recommendations
│   │   │   └── service.ts
│   │   ├── stripe
│   │   │   ├── config.ts
│   │   │   └── service.ts
│   │   ├── supabase
│   │   │   └── config.ts
│   │   ├── types
│   │   │   └── questionnaire.ts
│   │   ├── usage
│   │   │   └── service.ts
│   │   └── utils
│   │       ├── api-error.ts
│   │       ├── cache.ts
│   │       ├── form-validation.ts
│   │       ├── index.ts
│   │       └── sanitize.ts
│   ├── middleware.ts
│   └── types
│       ├── database.ts
│       └── jest.d.ts
├── structure.txt
├── tailwind.config.ts
└── tsconfig.json

61 directories, 104 files

```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          100: "hsl(215 25% 90%)",
          500: "hsl(215 25% 27%)",
          600: "hsl(215 25% 20%)"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          100: "hsl(200 13% 90%)",
          500: "hsl(200 13% 45%)"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          100: "hsl(217 19% 90%)",
          500: "hsl(217 19% 27%)"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        success: {
          DEFAULT: "#10B981",
          500: "#10B981"
        },
        warning: {
          DEFAULT: "#FCD34D",
          500: "#FCD34D"
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          700: "#374151",
          900: "#111827"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

