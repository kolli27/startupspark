import { WebVitals } from './types';

// Error severity levels
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

// Error logging
export const logError = (error: Error, severity: ErrorSeverity = ErrorSeverity.ERROR, context: Record<string, any> = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    severity,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    context: {
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      ...context,
    },
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Log]', errorLog);
  }

  // In production, you would typically send this to a logging service
  // Example: send to your backend API endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/monitoring/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorLog),
    }).catch(console.error); // Catch to prevent infinite error loops
  }
};

// Analytics tracking
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  const event = {
    timestamp: new Date().toISOString(),
    event: eventName,
    properties: {
      url: typeof window !== 'undefined' ? window.location.href : '',
      ...properties,
    },
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', event);
  }

  // In production, send to analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/monitoring/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(console.error);
  }
};

// Performance monitoring
export const measureWebVitals = (onPerfEntry?: (metric: WebVitals) => void) => {
  if (typeof window !== 'undefined' && onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Performance metric reporting
export const reportPerformanceMetric = (metric: WebVitals) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Performance Metric]', metric);
  }

  // In production, send to monitoring endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/monitoring/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    }).catch(console.error);
  }
};
