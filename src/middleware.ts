import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from './types/database';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/questionnaire',
  '/payment',
  '/api/ai',
  '/api/questionnaire',
  '/api/recommendations',
];

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/pricing',
  '/password-reset',
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Auth error in middleware:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const path = req.nextUrl.pathname;

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    return res;
  }

  // Check if route requires authentication
  const isProtectedRoute = PROTECTED_ROUTES.some(route => path.startsWith(route));

  if (isProtectedRoute) {
    if (!session) {
      // Redirect to login if accessing protected route without session
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirectTo', path);
      return NextResponse.redirect(redirectUrl);
    }

    // Check subscription status for specific routes
    if (path.startsWith('/api/ai') || path.startsWith('/api/recommendations')) {
      try {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('subscription_status, subscription_tier')
          .eq('user_id', session.user.id)
          .single();

        if (!profile || profile.subscription_status !== 'active') {
          return new NextResponse(
            JSON.stringify({
              error: 'Subscription required',
              message: 'Active subscription required to access this feature',
            }),
            { 
              status: 403,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        return new NextResponse(
          JSON.stringify({
            error: 'Internal server error',
            message: 'Failed to verify subscription status',
          }),
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }
  }

  // Update response headers for session handling
  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
