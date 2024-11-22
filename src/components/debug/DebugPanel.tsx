'use client';

import { useState, useEffect } from 'react';
import { WebVitals } from '@/lib/monitoring/types';

interface MetricLog {
  timestamp: string;
  type: 'error' | 'analytics' | 'performance';
  data: any;
}

export default function DebugPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<MetricLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'error' | 'analytics' | 'performance'>('all');

  useEffect(() => {
    // Listen for monitoring events in development
    if (process.env.NODE_ENV === 'development') {
      const originalConsoleError = console.error;
      const originalConsoleLog = console.log;

      console.error = (...args) => {
        if (args[0] === '[Error Log]') {
          setLogs(prev => [{
            timestamp: new Date().toISOString(),
            type: 'error' as const,
            data: args[1]
          }, ...prev].slice(0, 100)); // Keep last 100 logs
        }
        originalConsoleError.apply(console, args);
      };

      console.log = (...args) => {
        if (args[0] === '[Analytics Event]') {
          setLogs(prev => [{
            timestamp: new Date().toISOString(),
            type: 'analytics' as const,
            data: args[1]
          }, ...prev].slice(0, 100));
        } else if (args[0] === '[Performance Metric]') {
          setLogs(prev => [{
            timestamp: new Date().toISOString(),
            type: 'performance' as const,
            data: args[1]
          }, ...prev].slice(0, 100));
        }
        originalConsoleLog.apply(console, args);
      };

      return () => {
        console.error = originalConsoleError;
        console.log = originalConsoleLog;
      };
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 text-white px-4 py-2 rounded-md mb-2"
      >
        {isVisible ? 'Hide' : 'Show'} Debug Panel
      </button>

      {isVisible && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-96 max-h-[600px] overflow-auto">
          <div className="flex gap-2 mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option value="error">Errors</option>
              <option value="analytics">Analytics</option>
              <option value="performance">Performance</option>
            </select>
            <button
              onClick={() => setLogs([])}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Clear
            </button>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log, index) => (
              <div
                key={index}
                className={`p-2 rounded text-sm font-mono ${
                  log.type === 'error' ? 'bg-red-100' :
                  log.type === 'analytics' ? 'bg-blue-100' :
                  'bg-green-100'
                }`}
              >
                <div className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
                <div className="font-semibold">{log.type.toUpperCase()}</div>
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(log.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
