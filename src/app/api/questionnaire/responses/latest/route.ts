import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';
import { APIError, handleAPIError } from '@/lib/utils/api-error';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new APIError('Not authenticated', 401, 'UNAUTHORIZED');
    }

    // Fetch the latest questionnaire response for the user
    const { data: response, error: responsesError } = await supabase
      .from('questionnaire_responses')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (responsesError) {
      console.error('Error fetching response:', responsesError);
      throw new APIError('Failed to fetch questionnaire response', 500);
    }

    if (!response) {
      throw new APIError('No questionnaire response found', 404);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: response.id,
        experience: response.experience,
        interests: response.interests,
        commitment: response.commitment,
        resources: response.resources,
        created_at: response.created_at,
        updated_at: response.updated_at
      }
    });

  } catch (error) {
    return handleAPIError(error);
  }
}
