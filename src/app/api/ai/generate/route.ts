import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { aiService } from '@/lib/ai/service'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { stream } = await request.json()

    // Get the latest questionnaire response for the user
    const { data: questionnaireData, error: questionnaireError } = await supabase
      .from('questionnaire_responses')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (questionnaireError || !questionnaireData) {
      return NextResponse.json(
        { error: 'No questionnaire response found' },
        { status: 400 }
      )
    }

    // Handle streaming response
    if (stream) {
      const encoder = new TextEncoder()
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of aiService.streamResponse(questionnaireData, 'ideas')) {
              controller.enqueue(encoder.encode(chunk))
            }
            controller.close()
          } catch (error: any) {
            controller.error(error)
          }
        },
      })

      return new Response(customReadable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    // Handle regular response
    try {
      // Generate all types of recommendations in parallel
      const [
        businessIdeas,
        followUpQuestions,
        actionableSuggestions,
        marketInsights
      ] = await Promise.all([
        aiService.generateBusinessIdeas(questionnaireData),
        aiService.generateFollowUpQuestions(questionnaireData),
        aiService.generateActionableSuggestions(questionnaireData),
        aiService.generateMarketInsights(questionnaireData)
      ])

      return NextResponse.json({
        data: {
          businessIdeas,
          followUpQuestions,
          actionableSuggestions,
          marketInsights
        }
      })
    } catch (error: any) {
      if (error.name === 'AIServiceError') {
        return NextResponse.json(
          { 
            error: error.message,
            code: error.code,
            retryAfter: error.retryAfter 
          },
          { 
            status: error.code === 'RATE_LIMIT' ? 429 : 
                    error.code === 'AUTH_ERROR' ? 401 :
                    error.code === 'INVALID_REQUEST' ? 400 : 500 
          }
        )
      }

      throw error
    }
  } catch (error: any) {
    console.error('Error generating AI recommendations:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
