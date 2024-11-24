import { z } from 'zod';

export const ErrorSeverityEnum = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical'
} as const;

export type ErrorSeverity = typeof ErrorSeverityEnum[keyof typeof ErrorSeverityEnum];

export const WebVitalsSchema = z.object({
    id: z.string(),
    name: z.enum(['CLS', 'FID', 'FCP', 'LCP', 'TTFB']),
    value: z.number(),
    rating: z.enum(['good', 'needs-improvement', 'poor']),
    delta: z.number(),
    entries: z.array(z.any())
});

export const ErrorLogSchema = z.object({
    timestamp: z.string(),
    severity: z.enum(['info', 'warning', 'error', 'critical']),
    error: z.object({
        name: z.string(),
        message: z.string(),
        stack: z.string().optional()
    }),
    context: z.object({
        url: z.string(),
        userAgent: z.string()
    }).catchall(z.unknown())
});

export const AnalyticsEventSchema = z.object({
    timestamp: z.string(),
    event: z.string(),
    properties: z.object({
        url: z.string()
    }).catchall(z.unknown()),
    userId: z.string().optional(),
    sessionId: z.string().optional()
});

export const RequestMetricsSchema = z.object({
    path: z.string(),
    method: z.string(),
    duration: z.number(),
    timestamp: z.string(),
    statusCode: z.number().optional(),
    userAgent: z.string().optional(),
    ip: z.string().optional(),
    country: z.string().optional(),
    authenticated: z.boolean().optional()
});

export const PerformanceMetricSchema = z.object({
    name: z.string(),
    value: z.number(),
    timestamp: z.string()
}).catchall(z.unknown());

export type WebVitals = z.infer<typeof WebVitalsSchema>;
export type ErrorLog = z.infer<typeof ErrorLogSchema>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export type RequestMetrics = z.infer<typeof RequestMetricsSchema>;
export type PerformanceMetric = z.infer<typeof PerformanceMetricSchema>;