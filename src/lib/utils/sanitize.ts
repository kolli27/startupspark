import { z } from 'zod';
import { ErrorLog, PerformanceMetric, AnalyticsEvent } from '@/lib/monitoring/types';

export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[&<>"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }[match] || ''))
    .replace(/<(.*?)>/g, '')
    .replace(/\0/g, '')
    .trim();
}

export function sanitizeObject<T extends object>(obj: T): T {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeString(item) : 
        item && typeof item === 'object' ? sanitizeObject(item) : 
        item
      );
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
}

export function sanitizeError(error: Error): Partial<Error> {
  return {
    name: sanitizeString(error.name),
    message: sanitizeString(error.message),
    stack: process.env.NODE_ENV === 'development' ? sanitizeString(error.stack || '') : undefined
  };
}

export function createSanitizedStringSchema(schema: z.ZodString = z.string()) {
  return schema.transform(sanitizeString);
}

export function sanitizeMonitoringData<T extends ErrorLog | PerformanceMetric | AnalyticsEvent>(data: T): T {
  return sanitizeObject(data);
}

export type SanitizedRequest<T> = {
  body: T;
  query: Record<string, string>;
  headers: Record<string, string>;
}

export function withSanitization<T>(schema: z.ZodType<T>) {
  return async (req: Request): Promise<SanitizedRequest<T>> => {
    const body = req.headers.get('content-type')?.includes('application/json') 
      ? await req.json()
      : {};

    const url = new URL(req.url);
    const query: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      query[key] = sanitizeString(value);
    });

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = sanitizeString(value);
    });

    const sanitizedBody = schema.parse(sanitizeObject(body));

    return { body: sanitizedBody, query, headers };
  };
}