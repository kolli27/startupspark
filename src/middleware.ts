import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from './types/database';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis for rate limiting
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '5 s'),
});

const PROTECTED_ROUTES = ['/dashboard', '/questionnaire', '/payment', '/api/ai', '/api/questionnaire', '/api/recommendations'];
const PUBLIC_ROUTES = ['/', '/login', '/signup', '/pricing', '/password-reset'];

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://startupspark.com',
  'https://app.startupspark.com',
  'http://localhost:3000',
];

// Enhanced security headers
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.openai.com https://*.supabase.co https://api.stripe.com;",
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
};

// Track request metrics
async function trackRequestMetrics(req: NextRequest, startTime: number) {
  try {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const path = req.nextUrl.pathname;
    
    await fetch('/api/monitoring/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        duration,
        method: req.method,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Failed to track metrics:', error);
  }
}

export async function middleware(req: NextRequest) {
  const startTime = Date.now();

  // CORS handling
  const origin = req.headers.get('origin');
  const res = NextResponse.next();
  
  if (origin) {
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin);
    }
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.headers.set('Access-Control-Max-Age', '86400');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res;
  }

  // Rate limiting for API routes with different limits for authenticated users
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';
    const authHeader = req.headers.get('authorization');
    
    // More lenient rate limit for authenticated users
    const limit = authHeader ? 50 : 20;
    const window = authHeader ? '10 s' : '5 s';
    
    const rateLimiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(limit, window),
    });

    const { success } = await rateLimiter.limit(`${ip}:${authHeader ? 'auth' : 'unauth'}`);
    
    if (!success) {
      const retryAfter = 60; // Default retry after 60 seconds
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests',
          retryAfter
        }),
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfter)
          } 
        }
      );
    }
  }

  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Auth error:', error);
    await trackRequestMetrics(req, startTime);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const path = req.nextUrl.pathname;

  // Handle public routes
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    const response = addSecurityHeaders(res);
    await trackRequestMetrics(req, startTime);
    return response;
  }

  // Handle protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some(route => path.startsWith(route));
  if (isProtectedRoute) {
    if (!session) {
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirectTo', path);
      await trackRequestMetrics(req, startTime);
      return NextResponse.redirect(redirectUrl);
    }

    // Additional checks for premium API routes
    if (path.startsWith('/api/ai') || path.startsWith('/api/recommendations')) {
      try {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('subscription_status, subscription_tier')
          .eq('user_id', session.user.id)
          .single();

        if (!profile || profile.subscription_status !== 'active') {
          await trackRequestMetrics(req, startTime);
          return new NextResponse(
            JSON.stringify({
              error: 'Subscription required',
              message: 'Active subscription required',
            }),
            { status: 403, headers: { ...securityHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (error) {
        console.error('Subscription check error:', error);
        await trackRequestMetrics(req, startTime);
        return new NextResponse(
          JSON.stringify({ error: 'Internal server error' }),
          { status: 500, headers: { ...securityHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
  }

  const response = addSecurityHeaders(NextResponse.next({ request: { headers: req.headers } }));
  await trackRequestMetrics(req, startTime);
  return response;
}

function addSecurityHeaders(res: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value);
  });
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)',],
};
