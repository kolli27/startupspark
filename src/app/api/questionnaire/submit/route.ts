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
