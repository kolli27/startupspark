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
```sql
users (
  id uuid primary key,
  email text unique,
  created_at timestamp,
  last_login timestamp,
  is_premium boolean,
  subscription_type text,
  subscription_end_date timestamp
)
```

### Profiles Table
```sql
profiles (
  id uuid primary key,
  user_id uuid references users(id),
  questionnaire_progress jsonb,
  last_question_answered timestamp,
  completed_sections text[]
)
```

### Ideas Table
```sql
ideas (
  id uuid primary key,
  user_id uuid references users(id),
  content jsonb,
  created_at timestamp,
  is_premium boolean,
  is_bookmarked boolean,
  category text
)
```

### Questionnaire_Progress Table
```sql
questionnaire_progress (
  id uuid primary key,
  user_id uuid references users(id),
  section_id text,
  answers jsonb,
  last_updated timestamp
)
```

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
```env
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
