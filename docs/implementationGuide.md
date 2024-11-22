# StartupSpark Implementation Guide

## Project Overview
StartupSpark is an AI-powered business idea generation platform with a hybrid chat/game interface and freemium model.

## Development Timeline (7 Days MVP)

### Day 1: Project Setup & Authentication
1. Initial Setup
   ```bash
   npx create-next-app@latest startupspark --typescript --tailwind --app
   ```
2. Install Dependencies
   ```bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs shadcn-ui @stripe/stripe-js
   ```
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
```
src/app/
├── page.tsx (Landing)
├── (auth)/
│   ├── login/
│   └── signup/
├── dashboard/
├── questionnaire/
│   └── results/
└── ideas/
```

### Components
```
src/components/
├── auth/
├── questionnaire/
├── ideas/
├── payment/
├── ui/
└── layout/
```

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
```css
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
```

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
