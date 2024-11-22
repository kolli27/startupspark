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
