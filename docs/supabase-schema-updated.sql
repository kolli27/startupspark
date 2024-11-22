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
