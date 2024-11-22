import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { TextEncoder, TextDecoder } from 'util'

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  STRIPE_SECRET_KEY: 'test_stripe_secret_key',
  STRIPE_WEBHOOK_SECRET: 'test_webhook_secret',
  STRIPE_PRICE_ID: 'test_price_id',
  NEXT_PUBLIC_BASE_URL: 'http://localhost:3000'
}

// Mock Next.js components/hooks
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
}))

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies() {
    return {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    }
  },
  headers() {
    return {
      get: jest.fn(),
    }
  },
}))

// Mock window.location
const mockLocation = {
  assign: jest.fn(),
  href: 'http://localhost:3000',
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

// Mock window.fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
)

// Mock TextEncoder/TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Request/Response
global.Request = class Request {
  constructor(input, init) {
    this.url = input
    this.method = init?.method || 'GET'
    this.headers = new Headers(init?.headers)
    this.body = init?.body
  }
}

global.Response = class Response {
  constructor(body, init) {
    this.ok = true
    this._body = body
    this.status = init?.status || 200
    this.headers = new Headers(init?.headers)
  }

  json() {
    return Promise.resolve(JSON.parse(this._body))
  }

  text() {
    return Promise.resolve(this._body)
  }
}

global.Headers = class Headers {
  constructor(init) {
    this._headers = new Map()
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this._headers.set(key.toLowerCase(), value)
      })
    }
  }

  get(name) {
    return this._headers.get(name.toLowerCase())
  }

  set(name, value) {
    this._headers.set(name.toLowerCase(), value)
  }
}

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})

// Add console.error spy to suppress expected errors
const originalError = console.error
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
      args[0].includes('Error: Uncaught [Error: expected]'))
  ) {
    return
  }
  originalError.call(console, ...args)
}
