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
