export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
          code: error.code,
        },
      }),
      {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Handle unknown errors
  return new Response(
    JSON.stringify({
      error: {
        message: 'An unexpected error occurred',
        code: 'INTERNAL_SERVER_ERROR',
      },
    }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export const throwIfUnauthorized = (condition: boolean) => {
  if (condition) {
    throw new APIError('Unauthorized', 401, 'UNAUTHORIZED');
  }
};

export const throwIfNotFound = (condition: boolean) => {
  if (condition) {
    throw new APIError('Resource not found', 404, 'NOT_FOUND');
  }
};

export const throwIfBadRequest = (condition: boolean, message?: string) => {
  if (condition) {
    throw new APIError(message || 'Bad request', 400, 'BAD_REQUEST');
  }
};
