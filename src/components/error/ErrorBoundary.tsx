'use client';

import { useEffect } from 'react';
import { Alert } from '@/components/ui/alert';
import { logError, ErrorSeverity, trackEvent } from '@/lib/monitoring';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error with our monitoring system
    logError(error, ErrorSeverity.ERROR, {
      component: 'ErrorBoundary',
      digest: error.digest,
      timestamp: new Date().toISOString()
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <h2 className="text-lg font-semibold">Something went wrong!</h2>
          <p className="text-sm text-gray-500">
            {error.message || 'An unexpected error occurred'}
          </p>
        </Alert>
        <button
          onClick={() => {
            // Track the retry attempt
            trackEvent('error_retry', {
              errorMessage: error.message,
              errorDigest: error.digest,
              timestamp: new Date().toISOString()
            });
            reset();
          }}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
