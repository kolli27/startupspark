import { NextResponse } from 'next/server';
import { AnalyticsEvent, RequestMetrics } from '@/lib/monitoring/types';
import { createClient } from '@/lib/supabase/config';
import { Database } from '@/types/database';

type Tables = Database['public']['Tables'];
type MonitoringPayload = AnalyticsEvent | RequestMetrics;

function formatAnalyticsEvent(event: AnalyticsEvent): Tables['analytics_events']['Insert'] {
  return {
    timestamp: event.timestamp,
    event: event.event,
    properties: event.properties as any,
    user_id: event.userId || null,
    session_id: event.sessionId || null,
    created_at: new Date().toISOString()
  };
}

function formatRequestMetrics(metrics: RequestMetrics): Tables['request_metrics']['Insert'] {
  return {
    path: metrics.path,
    method: metrics.method,
    duration: metrics.duration,
    timestamp: metrics.timestamp,
    status_code: metrics.statusCode || null,
    user_agent: metrics.userAgent || null,
    ip: metrics.ip || null,
    country: metrics.country || null,
    authenticated: metrics.authenticated || false,
    created_at: new Date().toISOString()
  };
}

export async function POST(request: Request) {
  try {
    const payload: MonitoringPayload = await request.json();
    const supabase = createClient();
    
    if ('duration' in payload) {
      const formattedMetrics = formatRequestMetrics(payload);
      const { error } = await supabase
        .from('request_metrics')
        .insert(formattedMetrics);
      if (error) throw error;
    } else {
      const formattedEvent = formatAnalyticsEvent(payload);
      const { error } = await supabase
        .from('analytics_events')
        .insert(formattedEvent);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track monitoring event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track monitoring event' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'analytics';
    const limit = parseInt(searchParams.get('limit') || '100');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    
    const supabase = createClient();
    const table = type === 'requests' ? 'request_metrics' : 'analytics_events';
    
    let query = supabase
      .from(table)
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (from) {
      query = query.gte('timestamp', from);
    }
    if (to) {
      query = query.lte('timestamp', to);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({ 
      success: true, 
      data,
      metadata: {
        count: data?.length || 0,
        from: from || 'beginning',
        to: to || 'now'
      }
    });
  } catch (error) {
    console.error('Failed to fetch monitoring data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch monitoring data' },
      { status: 500 }
    );
  }
}
