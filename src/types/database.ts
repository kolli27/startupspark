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
