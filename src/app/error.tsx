'use client';

import { useEffect } from 'react';
import { logError, ErrorSeverityEnum, trackEvent } from '@/lib/monitoring';
import { Alert } from '@/components/ui/alert';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error with our monitoring system
    logError(error, 'ERROR', {
      component: 'RootError',
      digest: error.digest,
      timestamp: new Date().toISOString()
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <h2 className="text-lg font-semibold">Something went wrong!</h2>
          <p className="text-sm text-gray-500">
            {error.message || 'An unexpected error occurred'}
          </p>
        </Alert>
        <div className="flex gap-4">
          <button
            onClick={() => {
              trackEvent('error_retry', {
                errorMessage: error.message,
                errorDigest: error.digest,
                timestamp: new Date().toISOString()
              });
              reset();
            }}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try again
          </button>
          <button
            onClick={() => {
              trackEvent('error_home_redirect', {
                errorMessage: error.message,
                errorDigest: error.digest,
                timestamp: new Date().toISOString()
              });
              window.location.href = '/';
            }}
            className="flex-1 rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
