// Web Vitals metrics type
export interface WebVitals {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

// Error log type
export interface ErrorLog {
  timestamp: string;
  severity: string;
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  context: {
    url: string;
    userAgent: string;
    [key: string]: any;
  };
}

// Analytics event type
export interface AnalyticsEvent {
  timestamp: string;
  event: string;
  properties: {
    url: string;
    [key: string]: any;
  };
}

// Performance metric type
export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  [key: string]: any;
}
