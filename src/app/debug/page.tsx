'use client';

import { useState } from 'react';
import { logError, ErrorSeverity, trackEvent } from '@/lib/monitoring';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function DebugPage() {
  const analytics = useAnalytics();
  const [lastAction, setLastAction] = useState<string>('');

  const triggerError = () => {
    try {
      throw new Error('Test error from debug page');
    } catch (error) {
      logError(error as Error, ErrorSeverity.ERROR, {
        source: 'DebugPage',
        test: true
      });
      setLastAction('Error logged');
    }
  };

  const triggerAnalytics = () => {
    analytics.track('test_event', {
      source: 'DebugPage',
      timestamp: new Date().toISOString()
    });
    setLastAction('Analytics event tracked');
  };

  const triggerSlowOperation = async () => {
    const start = performance.now();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate slow operation
    const duration = performance.now() - start;
    
    analytics.track('slow_operation', {
      duration,
      source: 'DebugPage'
    });
    setLastAction('Slow operation completed');
  };

  const triggerCriticalError = () => {
    try {
      throw new Error('Critical test error');
    } catch (error) {
      logError(error as Error, ErrorSeverity.CRITICAL, {
        source: 'DebugPage',
        test: true
      });
      setLastAction('Critical error logged');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-4">Monitoring Debug Page</h1>
        
        {lastAction && (
          <div className="bg-blue-100 p-4 rounded mb-4">
            Last action: {lastAction}
          </div>
        )}

        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-2">Error Logging</h2>
            <div className="space-x-4">
              <button
                onClick={triggerError}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Trigger Error
              </button>
              <button
                onClick={triggerCriticalError}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Trigger Critical Error
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-2">Analytics</h2>
            <button
              onClick={triggerAnalytics}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Track Test Event
            </button>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-2">Performance</h2>
            <button
              onClick={triggerSlowOperation}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Trigger Slow Operation
            </button>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Note: Open the Debug Panel to see the monitoring events in real-time.</p>
        </div>
      </div>
    </div>
  );
}
