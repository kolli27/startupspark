# .babelrc

```
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }],
    "@babel/preset-typescript",
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ],
  "plugins": []
}

```

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
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.460.0",
    "next": "15.0.3",
    "openai": "^4.73.0",
    "react": "19.0.0-rc-66855b96-20241106",
    "react-dom": "19.0.0-rc-66855b96-20241106",
    "stripe": "^17.4.0",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "web-vitals": "^4.2.4",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@babel/core": "^7.23.6",
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

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
    console.error('Error generating AI recommendations:', error)
    
    if (error.name === 'AIServiceError') {
      return NextResponse.json(
        { 
          error: error.message,
          code: error.code,
          retryAfter: error.retryAfter 
        },
        { status: error.code === 'RATE_LIMIT' ? 429 : 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

```

# src/app/api/monitoring/analytics/route.ts

```ts
import { NextResponse } from 'next/server';
import type { AnalyticsEvent } from '@/lib/monitoring/types';

export async function POST(request: Request) {
  try {
    const event: AnalyticsEvent = await request.json();
    
    // In a production environment, you would:
    // 1. Store analytics events in a database
    // 2. Send to analytics service (e.g., Google Analytics, Mixpanel)
    // 3. Process events for reporting
    
    console.log('[Server Analytics Event]', event);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track analytics event:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

```

# src/app/api/monitoring/error/route.ts

```ts
import { NextResponse } from 'next/server';
import type { ErrorLog } from '@/lib/monitoring/types';

export async function POST(request: Request) {
  try {
    const errorLog: ErrorLog = await request.json();
    
    // In a production environment, you would:
    // 1. Store error logs in a database
    // 2. Send to error tracking service (e.g., Sentry)
    // 3. Trigger alerts for critical errors
    
    console.error('[Server Error Log]', errorLog);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

```

# src/app/api/monitoring/performance/route.ts

```ts
import { NextResponse } from 'next/server';
import type { WebVitals } from '@/lib/monitoring/types';

export async function POST(request: Request) {
  try {
    const metric: WebVitals = await request.json();
    
    // In a production environment, you would:
    // 1. Store performance metrics in a database
    // 2. Send to monitoring service (e.g., New Relic, Datadog)
    // 3. Set up alerts for performance degradation
    
    console.log('[Server Performance Metric]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log performance metric:', error);
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
import { stripe, STRIPE_CONFIG } from '@/lib/stripe/config'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Stripe from 'stripe'

async function updateUserSubscription(
  supabase: any,
  userId: string,
  subscriptionData: {
    status: string;
    current_period_end: number;
    cancel_at_period_end: boolean;
    stripe_subscription_id?: string;
    stripe_customer_id?: string;
  }
) {
  const { error } = await supabase
    .from('user_subscriptions')
    .upsert({
      user_id: userId,
      stripe_subscription_id: subscriptionData.stripe_subscription_id,
      stripe_customer_id: subscriptionData.stripe_customer_id,
      stripe_subscription_status: subscriptionData.status,
      current_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscriptionData.cancel_at_period_end,
      updated_at: new Date().toISOString()
    })

  if (error) throw error
}

async function handleSubscriptionChange(event: Stripe.Event, supabase: any) {
  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata.userId

  if (!userId) {
    console.error('No userId found in subscription metadata')
    return
  }

  await updateUserSubscription(supabase, userId, {
    status: subscription.status,
    current_period_end: subscription.current_period_end,
    cancel_at_period_end: subscription.cancel_at_period_end,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string
  })
}

async function handlePaymentSuccess(event: Stripe.Event, supabase: any) {
  const session = event.data.object as Stripe.Checkout.Session
  const userId = session.metadata?.userId

  if (!userId) {
    console.error('No userId found in session metadata')
    return
  }

  // For one-time payments
  if (session.mode === 'payment') {
    const { error } = await supabase
      .from('user_purchases')
      .insert({
        user_id: userId,
        amount: session.amount_total,
        currency: session.currency,
        status: 'completed',
        payment_intent: session.payment_intent,
        created_at: new Date().toISOString()
      })

    if (error) throw error
  }

  // For subscription payments, ensure customer data is saved
  if (session.mode === 'subscription' && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    
    await updateUserSubscription(supabase, userId, {
      status: subscription.status,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string
    })
  }
}

async function handleInvoicePaid(event: Stripe.Event, supabase: any) {
  const invoice = event.data.object as Stripe.Invoice
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
    const userId = subscription.metadata.userId
    
    if (userId) {
      await updateUserSubscription(supabase, userId, {
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string
      })
    }
  }
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_CONFIG.webhookSecret!
    )

    const supabase = createRouteHandlerClient({ cookies })

    switch (event.type) {
      case 'checkout.session.completed':
        await handlePaymentSuccess(event, supabase)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChange(event, supabase)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaid(event, supabase)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
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
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/AuthContext"
import { SavedRecommendations } from "@/components/dashboard/SavedRecommendations"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="font-bold text-xl">
              <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 bg-clip-text text-transparent">
                StartupSpark
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user.email}</span>
              <Button
                variant="outline"
                onClick={async () => {
                  await signOut()
                  router.push("/login")
                }}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button
                  variant="gradient"
                  className="w-full justify-start"
                  onClick={() => router.push("/questionnaire")}
                >
                  Take Questionnaire
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.location.href = '#saved-recommendations'}
                >
                  View Saved Ideas
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Your Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Questionnaire</span>
                    <span className="text-green-600">✓ Complete</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profile</span>
                    <span className="text-green-600">✓ Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome back!</h1>
              <p className="text-gray-600 mb-6">
                Here are your saved recommendations and business ideas. Take the questionnaire again to get new personalized suggestions.
              </p>
            </div>

            <div id="saved-recommendations" className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Saved Recommendations</h2>
              <SavedRecommendations userId={user.id} />
            </div>
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
import { logError, ErrorSeverity, trackEvent } from '@/lib/monitoring';
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
    logError(error, ErrorSeverity.ERROR, {
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
 
    --primary: 238 84% 67%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
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
 
    --primary: 238 84% 67%;
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
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
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500;
}

.gradient-border {
  @apply border-transparent bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-border;
}

.gradient-bg {
  @apply bg-gradient-to-r from-primary-500 to-accent-500;
}

```

# src/app/layout.tsx

```tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { measureWebVitals, reportPerformanceMetric } from '@/lib/monitoring';
import DebugPanel from '@/components/debug/DebugPanel';

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
  // Initialize performance monitoring
  if (typeof window !== 'undefined') {
    measureWebVitals((metric) => {
      reportPerformanceMetric(metric);
    });
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <DebugPanel />
      </body>
    </html>
  );
}

```

# src/app/page.tsx

```tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl">
            <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 bg-clip-text text-transparent">
              StartupSpark
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="gradient" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            Transform Your Ideas into{" "}
            <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 bg-clip-text text-transparent">
              Thriving Businesses
            </span>
          </h1>
          <p className="text-gray-700 text-xl md:text-2xl max-w-2xl mx-auto mb-12">
            Use AI-powered insights to discover personalized business ideas that match your skills, passions, and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="gradient" className="text-lg px-8 py-6" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/questionnaire">Try Demo</Link>
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-24">
          <div className="p-8 rounded-xl border bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Ideas</h3>
            <p className="text-gray-600 leading-relaxed">
              Get business ideas tailored to your unique skills and interests.
            </p>
          </div>
          <div className="p-8 rounded-xl border bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Market Validation</h3>
            <p className="text-gray-600 leading-relaxed">
              Validate your ideas with real market data and insights.
            </p>
          </div>
          <div className="p-8 rounded-xl border bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Quick Start</h3>
            <p className="text-gray-600 leading-relaxed">
              Get actionable steps to start your business journey today.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 StartupSpark. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

```

# src/app/payment/cancel/page.tsx

```tsx
"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PaymentCancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-amber-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>

          <p className="text-gray-600 mb-8">
            Your payment was cancelled and you haven't been charged.
            If you have any questions or concerns, please don't hesitate to contact us.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => router.push('/pricing')}
              className="w-full bg-primary-600 hover:bg-primary-700"
            >
              Try Again
            </Button>

            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="w-full"
            >
              Return to Dashboard
            </Button>

            <div className="text-sm text-gray-500 mt-6">
              <p>Need help? Contact us at</p>
              <a
                href="mailto:support@startupspark.ai"
                className="text-primary-600 hover:text-primary-700"
              >
                support@startupspark.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# src/app/payment/success/page.tsx

```tsx
"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/lib/hooks/useSubscription'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshSubscription } = useSubscription()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      router.push('/dashboard')
      return
    }

    const verifyPayment = async () => {
      try {
        // Refresh subscription data
        await refreshSubscription()
        setLoading(false)
      } catch (error) {
        console.error('Error verifying payment:', error)
        router.push('/dashboard')
      }
    }

    verifyPayment()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-8">
            Thank you for upgrading to Premium! You now have access to all premium features
            and can generate up to 10 business ideas per month.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => router.push('/questionnaire')}
              className="w-full bg-primary-600 hover:bg-primary-700"
            >
              Generate New Ideas
            </Button>

            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# src/app/pricing/page.tsx

```tsx
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_CONFIG } from '@/lib/stripe/config'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PricingPlan {
  name: string
  price: string
  billingPeriod: string
  features: string[]
  priceId: string
  mode: 'payment' | 'subscription'
  popular?: boolean
}

const plans: PricingPlan[] = [
  {
    name: 'Free',
    price: '$0',
    billingPeriod: 'forever',
    features: [
      '1 business idea per month',
      'Basic idea generation',
      'Save favorites',
      'Community support'
    ],
    priceId: '',
    mode: 'payment'
  },
  {
    name: 'Premium (Monthly)',
    price: '$9.99',
    billingPeriod: 'per month',
    features: [
      '10 business ideas per month',
      'Follow-up questions',
      'Market insights',
      'Actionable suggestions',
      'Priority support',
      'Export to PDF'
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE_ID!,
    mode: 'subscription',
    popular: true
  },
  {
    name: 'Premium (Annual)',
    price: '$3.00',
    billingPeriod: 'per month, billed annually',
    features: [
      'All Premium Monthly features',
      '10 business ideas per month',
      'Follow-up questions',
      'Market insights',
      'Actionable suggestions',
      'Priority support',
      'Export to PDF',
      '70% savings vs monthly'
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID!,
    mode: 'subscription'
  }
]

export default function PricingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePlanSelect = async (plan: PricingPlan) => {
    if (!user) {
      router.push('/login?redirect=/pricing')
      return
    }

    if (plan.name === 'Free') {
      router.push('/dashboard')
      return
    }

    setSelectedPlan(plan)
    setCheckoutLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Failed to load Stripe')

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          mode: plan.mode
        })
      })

      const { sessionId } = await response.json()
      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) throw error

    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to start checkout process. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized business ideas tailored to your skills and interests.
            Upgrade for premium features and more ideas per month.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden
                ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {plan.name}
                </h3>

                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/{plan.billingPeriod}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700'
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                  disabled={checkoutLoading && selectedPlan?.name === plan.name}
                >
                  {checkoutLoading && selectedPlan?.name === plan.name ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Processing...
                    </div>
                  ) : plan.name === 'Free' ? (
                    'Get Started'
                  ) : (
                    'Select Plan'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-8 text-center text-red-600 bg-red-50 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto grid gap-8 lg:grid-cols-2">
            <div className="text-left">
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade, downgrade, or cancel your plan at any time.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards through our secure payment processor, Stripe.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Do unused ideas roll over?</h3>
              <p className="text-gray-600">
                No, idea generation limits reset at the beginning of each billing cycle.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-gray-600">
                Yes, contact us within 14 days of purchase for a full refund if you're not satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# src/app/questionnaire/page.tsx

```tsx
'use client';

import { useState } from 'react';
import QuestionCard from '@/components/questionnaire/QuestionCard';

const questions = [
  {
    id: '1',
    section: 'Personal Interests and Passions',
    text: 'What activities or topics are you most passionate about?',
    type: 'text' as const,
    aiSuggestion: 'Think about activities that make you lose track of time.',
    followUpQuestion: 'What specifically excites you about these activities?'
  },
  {
    id: '2',
    section: 'Personal Interests and Passions',
    text: 'Would you prefer your business to align with your personal passions?',
    type: 'yes-no' as const,
    aiSuggestion: 'Consider how combining passion with business could affect your motivation.'
  },
  {
    id: '3',
    section: 'Skills and Expertise',
    text: 'How would you rate your comfort level with technology?',
    type: 'scale' as const,
    aiSuggestion: '1 = Beginner, 5 = Expert. This helps us suggest suitable tech-based opportunities.'
  },
  {
    id: '4',
    section: 'Market Trends',
    text: 'Which current market trends interest you the most?',
    type: 'multiple' as const,
    options: [
      'Artificial Intelligence',
      'Sustainability',
      'Remote Work Solutions',
      'Health Tech',
      'E-commerce',
      'Educational Technology'
    ],
    homework: 'Research the growth potential of your selected trends over the next 5 years.'
  },
  {
    id: '5',
    section: 'Business Model Preference',
    text: 'What type of business model interests you?',
    type: 'multiple' as const,
    options: [
      'Digital Products',
      'Physical Products',
      'Services',
      'Subscription-based',
      'Marketplace',
      'Consulting'
    ],
    aiSuggestion: 'Consider which models align with your lifestyle and skills.'
  }
];

export default function QuestionnairePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      // Here you would typically submit the answers to your API
      console.log('Questionnaire completed:', answers);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thanks for completing the questionnaire!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We're analyzing your answers to generate personalized business recommendations.
          </p>
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Business Idea Discovery
            </h2>
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        <QuestionCard
          question={questions[currentQuestionIndex]}
          onSubmit={handleAnswer}
          onNext={handleNext}
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

# src/components/auth/AuthProviderWrapper.tsx

```tsx
"use client"

import { AuthProvider } from "@/lib/auth/AuthContext"

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
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

# src/components/questionnaire/AIRecommendations.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { aiService } from "@/lib/ai/service"
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
  const [error, setError] = useState<string | null>(null)

  const { generateIdea, canGenerateIdea, ideasRemaining } = useIdeaGeneration()
  const { isFeatureEnabled, subscription } = useSubscription()

  const generateContent = async (type: RecommendationType) => {
    setLoading(true)
    setError(null)

    try {
      switch (type) {
        case 'business_idea':
          if (!businessIdeas && canGenerateIdea) {
            const ideas = await generateIdea(() => aiService.generateBusinessIdeas(response))
            if (ideas) setBusinessIdeas(ideas)
          }
          break
        case 'follow_up':
          if (!followUpQuestions && isFeatureEnabled('followUpQuestions')) {
            const questions = await aiService.generateFollowUpQuestions(response)
            if (questions) setFollowUpQuestions(questions)
          }
          break
        case 'suggestion':
          if (!suggestions && isFeatureEnabled('actionableSuggestions')) {
            const suggs = await aiService.generateActionableSuggestions(response)
            if (suggs) setSuggestions(suggs)
          }
          break
        case 'insight':
          if (!marketInsights && isFeatureEnabled('marketInsights')) {
            const insights = await aiService.generateMarketInsights(response)
            if (insights) setMarketInsights(insights)
          }
          break
      }
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateContent(activeTab)
  }, [activeTab])

  const getActiveContent = () => {
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
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
          <Button
            variant="outline"
            size="sm"
            onClick={() => generateContent(activeTab)}
            className="ml-4"
          >
            Retry
          </Button>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Generating personalized recommendations...</p>
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
import { useState } from 'react';
import { z } from 'zod';
import { validateFormData } from '@/lib/utils/form-validation';
import { Alert } from '@/components/ui/alert';

export interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    type: 'text' | 'choice' | 'multiple' | 'scale' | 'like-dislike' | 'yes-no';
    options?: string[];
    aiSuggestion?: string;
    followUpQuestion?: string;
    homework?: string;
    section?: string;
  };
  onSubmit: (answer: any) => void;
  onNext: () => void;
}

const answerSchema = z.object({
  answer: z.union([
    z.string().min(1, 'Answer is required'),
    z.array(z.string()).min(1, 'At least one option must be selected'),
    z.number().min(1).max(5),
    z.boolean()
  ])
});

type AnswerType = z.infer<typeof answerSchema>['answer'];

export default function QuestionCard({ question, onSubmit, onNext }: QuestionCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<AnswerType>('');
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = validateFormData(answerSchema, { answer });

    if (!result.success) {
      const firstError = Object.values(result.errors)[0];
      setError(firstError ? firstError[0] : 'Invalid answer');
      return;
    }

    try {
      onSubmit(result.data.answer);
      if (question.followUpQuestion && !showFollowUp) {
        setShowFollowUp(true);
      } else {
        onNext();
      }
    } catch (err) {
      setError('Failed to submit answer. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      {question.section && (
        <div className="text-sm font-medium text-blue-600 uppercase tracking-wide">
          {question.section}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">{question.text}</h3>
        
        {question.aiSuggestion && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <span className="font-medium">AI Suggestion:</span> {question.aiSuggestion}
            </p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <p className="text-sm">{error}</p>
          </Alert>
        )}

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
                  onClick={() => setAnswer(option)}
                  className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
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

          {question.type === 'multiple' && question.options && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <label key={option} className="flex items-center space-x-3 p-3 rounded-lg border-2 hover:border-blue-200 cursor-pointer">
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

        {question.homework && (
          <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Homework:</span> {question.homework}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {showFollowUp ? 'Continue' : 'Next Question'}
        </button>
      </div>
    </form>
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

```

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary-600",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "gradient-bg text-white shadow hover:opacity-90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
import { openai, MODELS } from './config'
import { cache, rateLimiter } from '../utils/cache'
import { responseTemplates, parseAIResponse } from './templates'
import { Database } from '@/types/database'
import { BusinessIdea, FollowUpQuestion, ActionableSuggestions, MarketInsights } from './types'

type QuestionnaireResponse = Database['public']['Tables']['questionnaire_responses']['Row']

class AIServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly retryAfter?: number
  ) {
    super(message)
    this.name = 'AIServiceError'
  }
}

export const aiService = {
  async generateBusinessIdeas(response: QuestionnaireResponse) {
    const cacheKey = `ideas:${JSON.stringify(response)}`
    const cachedResult = cache.get(cacheKey)
    if (cachedResult) return cachedResult

    await rateLimiter.waitForToken()

    try {
      const prompt = `As a startup advisor, generate 3 detailed and personalized business ideas based on the following information:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

For each idea, provide:
1. Business Name
2. Description
3. Target Market
4. Required Skills
5. Initial Investment Range
6. Potential Challenges
7. First Steps to Get Started

Format each idea exactly like this template:
${responseTemplates.businessIdea}`

      const completion = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      })

      const content = completion.choices[0].message.content
      if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE')

      const parsedIdeas = parseAIResponse(content, 'ideas') as BusinessIdea[]
      const formattedResponse = parsedIdeas.map(idea => 
        responseTemplates.businessIdea
          .replace('{name}', idea.name)
          .replace('{description}', idea.description)
          .replace('{targetMarket}', idea.targetMarket)
          .replace('{skills}', idea.skills)
          .replace('{investment}', idea.investment)
          .replace('{challenges}', idea.challenges)
          .replace('{steps}', idea.steps)
      ).join('\n\n')

      cache.set(cacheKey, formattedResponse)
      return formattedResponse

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error

      if (error.response?.status === 429) {
        throw new AIServiceError(
          'Rate limit exceeded. Please try again later.',
          'RATE_LIMIT',
          error.response.headers['retry-after']
        )
      }

      throw new AIServiceError(
        'Failed to generate business ideas',
        'GENERATION_ERROR'
      )
    }
  },

  async generateFollowUpQuestions(response: QuestionnaireResponse) {
    const cacheKey = `questions:${JSON.stringify(response)}`
    const cachedResult = cache.get(cacheKey)
    if (cachedResult) return cachedResult

    await rateLimiter.waitForToken()

    try {
      const prompt = `Based on the following questionnaire responses, generate 5 specific follow-up questions to help better understand the user's business potential:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format each question exactly like this template:
${responseTemplates.followUpQuestions}`

      const completion = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      })

      const content = completion.choices[0].message.content
      if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE')

      const parsedQuestions = parseAIResponse(content, 'questions') as FollowUpQuestion[]
      const formattedResponse = parsedQuestions.map((q, i) => 
        responseTemplates.followUpQuestions
          .replace('{number}', (i + 1).toString())
          .replace('{question}', q.question)
          .replace('{importance}', q.importance)
      ).join('\n\n')

      cache.set(cacheKey, formattedResponse)
      return formattedResponse

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error

      if (error.response?.status === 429) {
        throw new AIServiceError(
          'Rate limit exceeded. Please try again later.',
          'RATE_LIMIT',
          error.response.headers['retry-after']
        )
      }

      throw new AIServiceError(
        'Failed to generate follow-up questions',
        'GENERATION_ERROR'
      )
    }
  },

  async generateActionableSuggestions(response: QuestionnaireResponse) {
    const cacheKey = `suggestions:${JSON.stringify(response)}`
    const cachedResult = cache.get(cacheKey)
    if (cachedResult) return cachedResult

    await rateLimiter.waitForToken()

    try {
      const prompt = `Based on the following profile, provide detailed, actionable suggestions for starting a business:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format the response exactly like this template:
${responseTemplates.actionableSuggestions}`

      const completion = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      })

      const content = completion.choices[0].message.content
      if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE')

      const parsedSuggestions = parseAIResponse(content, 'suggestions') as ActionableSuggestions
      const formattedResponse = responseTemplates.actionableSuggestions
        .replace('{immediateSteps}', parsedSuggestions.immediate_next_steps)
        .replace('{skillDevelopment}', parsedSuggestions.skill_development)
        .replace('{networking}', parsedSuggestions.networking_strategy)
        .replace('{resources}', parsedSuggestions.resource_allocation)
        .replace('{pitfalls}', parsedSuggestions.potential_pitfalls)
        .replace('{timeline}', parsedSuggestions.implementation_timeline)

      cache.set(cacheKey, formattedResponse)
      return formattedResponse

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error

      if (error.response?.status === 429) {
        throw new AIServiceError(
          'Rate limit exceeded. Please try again later.',
          'RATE_LIMIT',
          error.response.headers['retry-after']
        )
      }

      throw new AIServiceError(
        'Failed to generate actionable suggestions',
        'GENERATION_ERROR'
      )
    }
  },

  async generateMarketInsights(response: QuestionnaireResponse) {
    const cacheKey = `insights:${JSON.stringify(response)}`
    const cachedResult = cache.get(cacheKey)
    if (cachedResult) return cachedResult

    await rateLimiter.waitForToken()

    try {
      const prompt = `Analyze market opportunities based on this profile:
- Professional Background: ${response.experience}
- Business Interests: ${response.interests}
- Time Commitment: ${response.commitment}
- Available Resources: ${response.resources}

Format the response exactly like this template:
${responseTemplates.marketInsights}`

      const completion = await openai.chat.completions.create({
        model: MODELS.GPT4,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      })

      const content = completion.choices[0].message.content
      if (!content) throw new AIServiceError('Empty response from AI', 'EMPTY_RESPONSE')

      const parsedInsights = parseAIResponse(content, 'insights') as MarketInsights
      const formattedResponse = responseTemplates.marketInsights
        .replace('{trends}', parsedInsights.current_trends)
        .replace('{gaps}', parsedInsights.market_gaps)
        .replace('{competition}', parsedInsights.competitive_landscape)
        .replace('{customers}', parsedInsights.target_customers)
        .replace('{revenue}', parsedInsights.revenue_potential)
        .replace('{strategy}', parsedInsights.entry_strategy)

      cache.set(cacheKey, formattedResponse)
      return formattedResponse

    } catch (error: any) {
      if (error.name === 'AIServiceError') throw error

      if (error.response?.status === 429) {
        throw new AIServiceError(
          'Rate limit exceeded. Please try again later.',
          'RATE_LIMIT',
          error.response.headers['retry-after']
        )
      }

      throw new AIServiceError(
        'Failed to generate market insights',
        'GENERATION_ERROR'
      )
    }
  }
}

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

Required Skills:
{skills}

Initial Investment:
{investment}

Potential Challenges:
{challenges}

First Steps:
{steps}

---
`.trim(),

  followUpQuestions: `
Follow-up Question {number}: {question}
Importance: {importance}

---
`.trim(),

  actionableSuggestions: `
Actionable Plan
==============

Immediate Next Steps (30 Days):
{immediateSteps}

Skill Development:
{skillDevelopment}

Networking Strategy:
{networking}

Resource Allocation:
{resources}

Potential Pitfalls:
{pitfalls}

Implementation Timeline:
{timeline}

---
`.trim(),

  marketInsights: `
Market Analysis
==============

Current Trends:
{trends}

Market Gaps:
{gaps}

Competitive Landscape:
{competition}

Target Customers:
{customers}

Revenue Potential:
{revenue}

Entry Strategy:
{strategy}

---
`.trim()
}

export const formatResponse = (template: string, data: Record<string, string>): string => {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(`{${key}}`, value);
  }
  return result;
}

function parseBusinessIdeas(response: string): BusinessIdea[] {
  return response.split('Business Idea:').filter(Boolean).map(idea => {
    const sections = idea.split('\n\n');
    return {
      name: sections[0].trim(),
      description: sections.find(s => s.includes('Description:'))?.split('Description:')[1]?.trim() || '',
      targetMarket: sections.find(s => s.includes('Target Market:'))?.split('Target Market:')[1]?.trim() || '',
      skills: sections.find(s => s.includes('Required Skills:'))?.split('Required Skills:')[1]?.trim() || '',
      investment: sections.find(s => s.includes('Initial Investment:'))?.split('Initial Investment:')[1]?.trim() || '',
      challenges: sections.find(s => s.includes('Potential Challenges:'))?.split('Potential Challenges:')[1]?.trim() || '',
      steps: sections.find(s => s.includes('First Steps:'))?.split('First Steps:')[1]?.trim() || '',
    };
  });
}

function parseFollowUpQuestions(response: string): FollowUpQuestion[] {
  return response.split('Follow-up Question').filter(Boolean).map(q => {
    const [question, importance] = q.split('Importance:').map(s => s.trim());
    return {
      question: question.replace(/^\d+:\s*/, '').trim(),
      importance: importance?.split('---')[0].trim() || '',
    };
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
    implementation_timeline: ''
  };
  
  sections.forEach(section => {
    const lines = section.split('\n');
    if (lines[0].includes(':')) {
      const key = lines[0].split(':')[0].trim().toLowerCase().replace(/\s+/g, '_');
      const validKeys: (keyof ActionableSuggestions)[] = [
        'immediate_next_steps',
        'skill_development',
        'networking_strategy',
        'resource_allocation',
        'potential_pitfalls',
        'implementation_timeline'
      ];
      
      if (validKeys.includes(key as keyof ActionableSuggestions)) {
        result[key as keyof ActionableSuggestions] = lines.slice(1).join('\n').trim();
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
    entry_strategy: ''
  };
  
  sections.forEach(section => {
    const lines = section.split('\n');
    if (lines[0].includes(':')) {
      const key = lines[0].split(':')[0].trim().toLowerCase().replace(/\s+/g, '_');
      const validKeys: (keyof MarketInsights)[] = [
        'current_trends',
        'market_gaps',
        'competitive_landscape',
        'target_customers',
        'revenue_potential',
        'entry_strategy'
      ];
      
      if (validKeys.includes(key as keyof MarketInsights)) {
        result[key as keyof MarketInsights] = lines.slice(1).join('\n').trim();
      }
    }
  });
  
  return result;
}

export function parseAIResponse(response: string, type: 'ideas'): BusinessIdea[];
export function parseAIResponse(response: string, type: 'questions'): FollowUpQuestion[];
export function parseAIResponse(response: string, type: 'suggestions'): ActionableSuggestions;
export function parseAIResponse(response: string, type: 'insights'): MarketInsights;
export function parseAIResponse(
  response: string,
  type: 'ideas' | 'questions' | 'suggestions' | 'insights'
): BusinessIdea[] | FollowUpQuestion[] | ActionableSuggestions | MarketInsights {
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
}

export interface FollowUpQuestion {
  question: string;
  importance: string;
}

export interface ActionableSuggestions {
  immediate_next_steps: string;
  skill_development: string;
  networking_strategy: string;
  resource_allocation: string;
  potential_pitfalls: string;
  implementation_timeline: string;
  [key: string]: string; // Add index signature
}

export interface MarketInsights {
  current_trends: string;
  market_gaps: string;
  competitive_landscape: string;
  target_customers: string;
  revenue_potential: string;
  entry_strategy: string;
  [key: string]: string; // Add index signature
}

export type ParsedResponse = 
  | BusinessIdea[]
  | FollowUpQuestion[]
  | ActionableSuggestions
  | MarketInsights;

export const isBusinessIdea = (obj: any): obj is BusinessIdea => {
  return (
    typeof obj === 'object' &&
    'name' in obj &&
    'description' in obj &&
    'targetMarket' in obj &&
    'skills' in obj &&
    'investment' in obj &&
    'challenges' in obj &&
    'steps' in obj
  );
};

export const isFollowUpQuestion = (obj: any): obj is FollowUpQuestion => {
  return (
    typeof obj === 'object' &&
    'question' in obj &&
    'importance' in obj
  );
};

export const isActionableSuggestions = (obj: any): obj is ActionableSuggestions => {
  return (
    typeof obj === 'object' &&
    'immediate_next_steps' in obj &&
    'skill_development' in obj &&
    'networking_strategy' in obj &&
    'resource_allocation' in obj &&
    'potential_pitfalls' in obj &&
    'implementation_timeline' in obj
  );
};

export const isMarketInsights = (obj: any): obj is MarketInsights => {
  return (
    typeof obj === 'object' &&
    'current_trends' in obj &&
    'market_gaps' in obj &&
    'competitive_landscape' in obj &&
    'target_customers' in obj &&
    'revenue_potential' in obj &&
    'entry_strategy' in obj
  );
};

```

# src/lib/auth/AuthContext.tsx

```tsx
// lib/auth/AuthContext.tsx
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null; success: boolean }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null; success: boolean; confirmationRequired?: boolean }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setServerSession = async () => {
      try {
        const { data: { session: sessionData }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        console.log('AuthContext: Initial session check:', {
          hasSession: !!sessionData,
          user: sessionData?.user?.email
        })
        
        setSession(sessionData)
        setUser(sessionData?.user ?? null)
      } catch (error) {
        console.error('AuthContext: Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }

    setServerSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('AuthContext: Auth state change:', event, {
          hasSession: !!currentSession,
          user: currentSession?.user?.email
        })

        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (event === 'SIGNED_IN') {
          // Force refresh to ensure middleware catches the new session
          router.refresh()
        }
        
        if (event === 'SIGNED_OUT') {
          setUser(null)
          setSession(null)
          router.refresh()
          router.push('/login')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('AuthContext: Sign in attempt:', {
        success: !!data.session,
        user: data.session?.user?.email,
        error: error?.message
      })

      if (error) throw error

      return { error: null, success: true }
    } catch (error) {
      console.error('AuthContext: Sign in error:', error)
      return {
        error: error as Error,
        success: false
      }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      console.log('AuthContext: Sign up attempt:', {
        success: !!data.user,
        user: data.user?.email,
        error: error?.message
      })

      if (error) throw error

      return {
        error: null,
        success: true,
        confirmationRequired: data.session === null
      }
    } catch (error) {
      console.error('AuthContext: Sign up error:', error)
      return {
        error: error as Error,
        success: false
      }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      console.log('AuthContext: Sign out successful')
    } catch (error) {
      console.error('AuthContext: Sign out error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

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

# src/lib/hooks/useSubscription.ts

```ts
import React, { useState, useEffect } from 'react'
import { SubscriptionData, PaymentPlan, isFeatureAvailable } from '@/lib/stripe/config'

interface UseSubscriptionReturn {
  subscription: SubscriptionData | null
  loading: boolean
  error: string | null
  isFeatureEnabled: (feature: string) => boolean
  canGenerateIdea: boolean
  refreshSubscription: () => Promise<void>
}

export function useSubscription(): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/subscription')
      if (!response.ok) throw new Error('Failed to fetch subscription')
      const data = await response.json()
      setSubscription(data)
      setError(null)
    } catch (err) {
      setError('Failed to load subscription status')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [])

  const isFeatureEnabled = (feature: string): boolean => {
    if (!subscription) return false
    return isFeatureAvailable(feature as any, subscription.plan)
  }

  const canGenerateIdea = (): boolean => {
    if (!subscription) return false
    return subscription.ideasRemaining > 0
  }

  return {
    subscription,
    loading,
    error,
    isFeatureEnabled,
    canGenerateIdea: canGenerateIdea(),
    refreshSubscription: fetchSubscription
  }
}

// Higher-order component to protect premium features
export function withPremiumFeature<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  featureName: string
): React.FC<P> {
  const WithPremiumFeatureComponent: React.FC<P> = (props) => {
    const { isFeatureEnabled, loading } = useSubscription()

    if (loading) {
      return React.createElement('div', { className: 'animate-pulse' },
        React.createElement('div', { className: 'h-8 bg-gray-200 rounded w-3/4 mb-4' }),
        React.createElement('div', { className: 'h-8 bg-gray-200 rounded w-1/2' })
      )
    }

    if (!isFeatureEnabled(featureName)) {
      return React.createElement('div', { className: 'p-4 bg-gray-50 rounded-lg' },
        React.createElement('h3', { className: 'font-semibold text-lg mb-2' }, 'Premium Feature'),
        React.createElement('p', { className: 'text-gray-600 mb-4' }, 
          'This feature is only available to premium subscribers.'
        ),
        React.createElement('button', {
          onClick: () => window.location.href = '/pricing',
          className: 'bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700'
        }, 'Upgrade to Premium')
      )
    }

    return React.createElement(WrappedComponent, props)
  }

  WithPremiumFeatureComponent.displayName = `WithPremiumFeature(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return WithPremiumFeatureComponent
}

interface UseIdeaGenerationReturn {
  canGenerateIdea: boolean
  generateIdea: <T>(generationFunction: () => Promise<T>) => Promise<T>
  subscription: SubscriptionData | null
  ideasRemaining: number
}

// Hook to manage idea generation limits
export function useIdeaGeneration(): UseIdeaGenerationReturn {
  const { subscription, canGenerateIdea, refreshSubscription } = useSubscription()

  const generateIdea = async <T,>(generationFunction: () => Promise<T>): Promise<T> => {
    if (!canGenerateIdea) {
      throw new Error('Idea generation limit reached')
    }

    try {
      const result = await generationFunction()
      
      // Increment usage and refresh subscription data
      await fetch('/api/stripe/subscription', {
        method: 'PUT'
      })
      await refreshSubscription()

      return result
    } catch (error) {
      console.error('Failed to generate idea:', error)
      throw error
    }
  }

  return {
    canGenerateIdea,
    generateIdea,
    subscription,
    ideasRemaining: subscription?.ideasRemaining || 0
  }
}

```

# src/lib/monitoring/index.ts

```ts
import { WebVitals } from './types';

// Error severity levels
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

// Error logging
export const logError = (error: Error, severity: ErrorSeverity = ErrorSeverity.ERROR, context: Record<string, any> = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    severity,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    context: {
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      ...context,
    },
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Log]', errorLog);
  }

  // In production, you would typically send this to a logging service
  // Example: send to your backend API endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/monitoring/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorLog),
    }).catch(console.error); // Catch to prevent infinite error loops
  }
};

// Analytics tracking
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  const event = {
    timestamp: new Date().toISOString(),
    event: eventName,
    properties: {
      url: typeof window !== 'undefined' ? window.location.href : '',
      ...properties,
    },
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', event);
  }

  // In production, send to analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/monitoring/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(console.error);
  }
};

// Performance monitoring
export const measureWebVitals = (onPerfEntry?: (metric: WebVitals) => void) => {
  if (typeof window !== 'undefined' && onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Performance metric reporting
export const reportPerformanceMetric = (metric: WebVitals) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Performance Metric]', metric);
  }

  // In production, send to monitoring endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/monitoring/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    }).catch(console.error);
  }
};

```

# src/lib/monitoring/types.ts

```ts
// Web Vitals metrics type
export interface WebVitals {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

// Error log type
export interface ErrorLog {
  timestamp: string;
  severity: string;
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  context: {
    url: string;
    userAgent: string;
    [key: string]: any;
  };
}

// Analytics event type
export interface AnalyticsEvent {
  timestamp: string;
  event: string;
  properties: {
    url: string;
    [key: string]: any;
  };
}

// Performance metric type
export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  [key: string]: any;
}

```

# src/lib/questionnaire/questions.ts

```ts
export interface Question {
  id: string
  text: string
  options: string[]
}

export const questions: Question[] = [
  {
    id: "experience",
    text: "What's your professional background?",
    options: [
      "Technology / Software Development",
      "Business / Management",
      "Creative / Design",
      "Marketing / Sales",
      "Other"
    ]
  },
  {
    id: "interests",
    text: "What type of business interests you the most?",
    options: [
      "Software / Apps",
      "E-commerce",
      "Consulting / Services",
      "Content Creation",
      "Physical Products"
    ]
  },
  {
    id: "commitment",
    text: "How much time can you commit to your startup?",
    options: [
      "Full-time",
      "Part-time (20+ hours/week)",
      "Side project (10-20 hours/week)",
      "Minimal time (5-10 hours/week)"
    ]
  },
  {
    id: "resources",
    text: "What resources do you currently have available?",
    options: [
      "Savings / Capital to invest",
      "Technical skills",
      "Industry connections",
      "Marketing expertise",
      "Just getting started"
    ]
  }
]

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
  apiVersion: '2024-11-20.acacia', // Latest API version
  typescript: true,
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
}

export const SUBSCRIPTION_PRICE_ID = process.env.STRIPE_PRICE_ID

if (!SUBSCRIPTION_PRICE_ID) {
  throw new Error('Missing STRIPE_PRICE_ID environment variable')
}

// Subscription tiers and features
export const SUBSCRIPTION_TIERS = {
  free: 'free',
  premium: 'premium'
} as const

export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS]

export const SUBSCRIPTION_FEATURES = {
  [SUBSCRIPTION_TIERS.free]: {
    ideaGenerations: 3,
    features: ['Basic business ideas', 'Simple recommendations'] as const
  },
  [SUBSCRIPTION_TIERS.premium]: {
    ideaGenerations: -1, // Unlimited
    features: [
      'Unlimited business ideas',
      'Advanced AI recommendations',
      'Market insights',
      'Follow-up questions',
      'Actionable suggestions',
      'Priority support'
    ] as const
  }
} as const

// Feature flags for subscription tiers
export const PREMIUM_FEATURES = [
  'followUpQuestions',
  'actionableSuggestions',
  'marketInsights',
  'unlimitedIdeas',
  'prioritySupport'
] as const

export type PremiumFeature = typeof PREMIUM_FEATURES[number]

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
  PAYMENT_FAILED: 'invoice.payment_failed'
} as const

export type SubscriptionEvent = typeof SUBSCRIPTION_EVENTS[keyof typeof SUBSCRIPTION_EVENTS]

// Helper function to check if an event is a subscription event
export function isSubscriptionEvent(event: string): event is SubscriptionEvent {
  return Object.values(SUBSCRIPTION_EVENTS).includes(event as SubscriptionEvent)
}

// Helper function to check if a feature is premium
export function isPremiumFeature(feature: string): feature is PremiumFeature {
  return PREMIUM_FEATURES.includes(feature as PremiumFeature)
}

// Helper function to get features for a subscription tier
export function getSubscriptionFeatures(tier: SubscriptionTier) {
  return SUBSCRIPTION_FEATURES[tier].features
}

// Helper function to get idea generation limit for a subscription tier
export function getIdeaGenerationLimit(tier: SubscriptionTier) {
  return SUBSCRIPTION_FEATURES[tier].ideaGenerations
}

```

# src/lib/stripe/service.ts

```ts
import Stripe from 'stripe'
import { stripe } from './config'

interface CheckoutSession {
  url: string
}

interface PortalSession {
  url: string
}

interface SubscriptionStatus {
  id: string
  status: 'active' | 'canceled' | 'past_due' | 'incomplete'
  current_period_end: string
  cancel_at_period_end?: boolean
}

export const stripeService = {
  async createCheckoutSession(userId: string): Promise<CheckoutSession> {
    try {
      const session = await stripe.checkout.sessions.create({
        customer_email: userId,
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
        metadata: {
          userId,
        },
      })

      if (!session.url) {
        throw new Error('Failed to create checkout session')
      }

      return { url: session.url }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw new Error('Failed to create checkout session')
    }
  },

  async createPortalSession(customerId: string): Promise<PortalSession> {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      })

      return { url: session.url }
    } catch (error) {
      console.error('Error creating portal session:', error)
      throw new Error('Failed to create portal session')
    }
  },

  async getActiveSubscription(customerId: string): Promise<SubscriptionStatus | null> {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        limit: 1,
      })

      if (!subscriptions.data.length) {
        return null
      }

      const subscription = subscriptions.data[0]
      return {
        id: subscription.id,
        status: subscription.status as SubscriptionStatus['status'],
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
      throw new Error('Failed to fetch subscription')
    }
  },

  async constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
    webhookSecret: string
  ): Promise<Stripe.Event> {
    try {
      return stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      )
    } catch (error) {
      console.error('Error constructing webhook event:', error)
      throw new Error('Failed to construct webhook event')
    }
  },

  async handleSubscriptionChange(
    subscriptionId: string,
    customerId: string,
    status: SubscriptionStatus['status']
  ): Promise<void> {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      
      if (subscription.customer !== customerId) {
        throw new Error('Subscription does not belong to customer')
      }

      // Update subscription status in your database
      // This would typically be handled by your webhook handler
      console.log(`Subscription ${subscriptionId} status updated to ${status}`)
    } catch (error) {
      console.error('Error handling subscription change:', error)
      throw new Error('Failed to handle subscription change')
    }
  }
}

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

# src/lib/utils/sanitize.ts

```ts
import { z } from 'zod'

/**
 * Sanitizes strings by removing potentially dangerous content
 * @param input - String to sanitize
 */
export function sanitizeString(input: string): string {
  if (!input) return ''
  
  return input
    // Remove script tags and their contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Convert special characters to HTML entities
    .replace(/[&<>"']/g, (match) => {
      const entities: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      }
      return entities[match]
    })
    // Remove other potentially dangerous HTML tags
    .replace(/<(.*?)>/g, '')
    // Remove null characters
    .replace(/\0/g, '')
    // Normalize whitespace
    .trim()
}

/**
 * Sanitizes an object's string properties recursively
 * @param obj - Object to sanitize
 */
export function sanitizeObject<T extends object>(obj: T): T {
  const sanitized: any = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeString(item) : 
        item && typeof item === 'object' ? sanitizeObject(item) : 
        item
      )
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized as T
}

/**
 * Creates a sanitized Zod schema for string validation
 * @param schema - Base Zod string schema
 */
export function createSanitizedStringSchema(schema: z.ZodString = z.string()) {
  return schema.transform(sanitizeString)
}

/**
 * Example usage of sanitized schema:
 * 
 * const UserSchema = z.object({
 *   name: createSanitizedStringSchema(z.string().min(2)),
 *   email: createSanitizedStringSchema(z.string().email()),
 *   bio: createSanitizedStringSchema(z.string().max(500).optional())
 * })
 */

export type SanitizedRequest<T> = {
  body: T;
  query: { [key: string]: string };
  headers: { [key: string]: string };
}

/**
 * Middleware function to sanitize incoming request data
 * @param schema - Zod schema for request validation
 */
export function withSanitization<T>(schema: z.ZodType<T>) {
  return async (req: Request): Promise<SanitizedRequest<T>> => {
    let body = {}
    
    // Parse and sanitize body if present
    if (req.body) {
      const contentType = req.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        body = await req.json()
      }
    }

    // Get and sanitize query parameters
    const url = new URL(req.url)
    const query: { [key: string]: string } = {}
    url.searchParams.forEach((value, key) => {
      query[key] = sanitizeString(value)
    })

    // Get and sanitize headers
    const headers: { [key: string]: string } = {}
    req.headers.forEach((value, key) => {
      headers[key] = sanitizeString(value)
    })

    // Validate and sanitize body using provided schema
    const sanitizedBody = schema.parse(body)

    return {
      body: sanitizedBody,
      query,
      headers
    }
  }
}

```

# src/middleware.ts

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logError, ErrorSeverity, trackEvent } from '@/lib/monitoring';

export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();

  try {
    // Continue to the API route
    const response = await NextResponse.next();

    // Track API performance
    const duration = Date.now() - startTime;
    trackEvent('api_request', {
      path: request.nextUrl.pathname,
      method: request.method,
      status: response.status,
      duration,
      requestId,
    });

    // Track slow requests (over 1 second)
    if (duration > 1000) {
      trackEvent('slow_api_request', {
        path: request.nextUrl.pathname,
        method: request.method,
        duration,
        requestId,
      });
    }

    return response;
  } catch (error) {
    // Log API errors
    logError(error as Error, ErrorSeverity.ERROR, {
      path: request.nextUrl.pathname,
      method: request.method,
      requestId,
    });

    // Track API errors
    trackEvent('api_error', {
      path: request.nextUrl.pathname,
      method: request.method,
      error: (error as Error).message,
      requestId,
    });

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Internal Server Error',
      }),
      { status: 500 }
    );
  }
}

// Configure the middleware to run only for API routes
export const config = {
  matcher: '/api/:path*',
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
  | Json[]

export interface Database {
  public: {
    Tables: {
      questionnaire_responses: {
        Row: {
          id: string
          user_id: string
          experience: string
          interests: string
          commitment: string
          resources: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          experience: string
          interests: string
          commitment: string
          resources: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          experience?: string
          interests?: string
          commitment?: string
          resources?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          has_completed_questionnaire: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          has_completed_questionnaire?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          has_completed_questionnaire?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      saved_recommendations: {
        Row: {
          id: string
          user_id: string
          recommendation_type: string
          content: string
          notes: string | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recommendation_type: string
          content: string
          notes?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          recommendation_type?: string
          content?: string
          notes?: string | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {

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
│   ├── codebaseSummary.md
│   ├── critical-path-tests.md
│   ├── currentTask.md
│   ├── implementationGuide.md
│   ├── projectRoadmap.md
│   ├── quickStart.md
│   ├── supabase-schema.sql
│   └── techStack.md
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
│   │   │   └── SavedRecommendations.tsx
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

59 directories, 92 files

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
          DEFAULT: "#6366F1",
          foreground: "#FFFFFF",
          100: "#E0E7FF",
          500: "#6366F1",
          600: "#4F46E5"
        },
        accent: {
          DEFAULT: "#EC4899",
          foreground: "#FFFFFF",
          100: "#FCE7F3",
          500: "#EC4899"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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

