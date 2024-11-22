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
