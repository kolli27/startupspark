import { z } from 'zod'

export interface ValidationResult<T> {
  success: boolean
  data: T
  errors: Record<string, string[]>
}

export function validateFormData<T>(
  schema: z.Schema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.parse(data)
    return {
      success: true,
      data: result,
      errors: {}
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(err.message)
      })
      return {
        success: false,
        data: {} as T,
        errors
      }
    }
    return {
      success: false,
      data: {} as T,
      errors: { _form: ['An unexpected error occurred'] }
    }
  }
}
