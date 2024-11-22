import { z } from 'zod'

/**
 * Sanitizes strings by removing potentially dangerous content
 * @param input - String to sanitize
 */
export function sanitizeString(input: string): string {
  if (!input) return ''
  
  return input
    // Remove script tags and their contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Convert special characters to HTML entities
    .replace(/[&<>"']/g, (match) => {
      const entities: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      }
      return entities[match]
    })
    // Remove other potentially dangerous HTML tags
    .replace(/<(.*?)>/g, '')
    // Remove null characters
    .replace(/\0/g, '')
    // Normalize whitespace
    .trim()
}

/**
 * Sanitizes an object's string properties recursively
 * @param obj - Object to sanitize
 */
export function sanitizeObject<T extends object>(obj: T): T {
  const sanitized: any = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeString(item) : 
        item && typeof item === 'object' ? sanitizeObject(item) : 
        item
      )
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized as T
}

/**
 * Creates a sanitized Zod schema for string validation
 * @param schema - Base Zod string schema
 */
export function createSanitizedStringSchema(schema: z.ZodString = z.string()) {
  return schema.transform(sanitizeString)
}

/**
 * Example usage of sanitized schema:
 * 
 * const UserSchema = z.object({
 *   name: createSanitizedStringSchema(z.string().min(2)),
 *   email: createSanitizedStringSchema(z.string().email()),
 *   bio: createSanitizedStringSchema(z.string().max(500).optional())
 * })
 */

export type SanitizedRequest<T> = {
  body: T;
  query: { [key: string]: string };
  headers: { [key: string]: string };
}

/**
 * Middleware function to sanitize incoming request data
 * @param schema - Zod schema for request validation
 */
export function withSanitization<T>(schema: z.ZodType<T>) {
  return async (req: Request): Promise<SanitizedRequest<T>> => {
    let body = {}
    
    // Parse and sanitize body if present
    if (req.body) {
      const contentType = req.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        body = await req.json()
      }
    }

    // Get and sanitize query parameters
    const url = new URL(req.url)
    const query: { [key: string]: string } = {}
    url.searchParams.forEach((value, key) => {
      query[key] = sanitizeString(value)
    })

    // Get and sanitize headers
    const headers: { [key: string]: string } = {}
    req.headers.forEach((value, key) => {
      headers[key] = sanitizeString(value)
    })

    // Validate and sanitize body using provided schema
    const sanitizedBody = schema.parse(body)

    return {
      body: sanitizedBody,
      query,
      headers
    }
  }
}
