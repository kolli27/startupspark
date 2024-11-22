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
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in required values
4. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Required environment variables:

```env
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
```

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
