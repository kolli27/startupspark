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
