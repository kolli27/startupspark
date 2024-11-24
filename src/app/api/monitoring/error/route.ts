import { NextResponse } from 'next/server';
import { ErrorLog } from '@/lib/monitoring/types';
import { createClient } from '@/lib/supabase/config';
import { Database } from '@/types/database';

type ErrorLogInsert = Database['public']['Tables']['error_logs']['Insert'];
type Json = Database['public']['Tables']['error_logs']['Insert']['context'];

export async function POST(request: Request) {
  try {
    const errorLog: ErrorLog = await request.json();
    const supabase = createClient();
    
    // Convert context to proper JSON type
    const context: Json = {
      url: errorLog.context.url,
      userAgent: errorLog.context.userAgent,
      ...Object.fromEntries(
        Object.entries(errorLog.context)
          .filter(([key]) => key !== 'url' && key !== 'userAgent')
      )
    };

    const errorLogData: ErrorLogInsert = {
      severity: errorLog.severity,
      error_name: errorLog.error.name,
      error_message: errorLog.error.message,
      error_stack: errorLog.error.stack || null,
      context,
      timestamp: errorLog.timestamp,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('error_logs')
      .insert(errorLogData);

    if (error) throw error;

    if (errorLog.severity === 'critical') {
      // Send alert to monitoring service
      await fetch('/api/monitoring/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'error_alert',
          severity: 'critical',
          message: errorLog.error.message,
          context: errorLog.context
        })
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to log error' }, 
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const severity = searchParams.get('severity') as Database['public']['Tables']['error_logs']['Row']['severity'] | null;
    const limit = parseInt(searchParams.get('limit') || '100');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    
    const supabase = createClient();
    
    let query = supabase
      .from('error_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (severity) {
      query = query.eq('severity', severity);
    }
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
        severity: severity || 'all',
        from: from || 'beginning',
        to: to || 'now'
      }
    });
  } catch (error) {
    console.error('Failed to fetch error logs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch error logs' },
      { status: 500 }
    );
  }
}
