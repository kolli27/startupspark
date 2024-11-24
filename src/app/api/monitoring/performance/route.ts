import { NextResponse } from 'next/server';
import { WebVitals } from '@/lib/monitoring/types';
import { createClient } from '@/lib/supabase/config';

export async function POST(request: Request) {
  try {
    const metrics: WebVitals[] = await request.json();
    const supabase = createClient();
    
    const aggregatedMetrics = metrics.map(metric => ({
      ...metric,
      timestamp: new Date().toISOString(),
      aggregated_value: metric.value * metric.delta
    }));

    const { error } = await supabase
      .from('performance_metrics')
      .insert(aggregatedMetrics);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log metrics:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}