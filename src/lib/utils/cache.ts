type CacheEntry = {
  data: string;
  timestamp: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry>;
  private ttl: number; // Time to live in milliseconds

  constructor(ttlMinutes: number = 60) {
    this.cache = new Map();
    this.ttl = ttlMinutes * 60 * 1000;
  }

  set(key: string, value: string): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now()
    });
  }

  get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private maxTokens: number;
  private refillRate: number; // tokens per second

  constructor(maxTokens: number = 10, refillRate: number = 0.5) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
    this.maxTokens = maxTokens;
    this.refillRate = refillRate;
  }

  async waitForToken(): Promise<boolean> {
    this.refillTokens();

    if (this.tokens < 1) {
      const waitTime = Math.ceil((1 - this.tokens) / this.refillRate) * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.refillTokens();
    }

    this.tokens -= 1;
    return true;
  }

  private refillTokens(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000; // convert to seconds
    const newTokens = timePassed * this.refillRate;
    
    this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
    this.lastRefill = now;
  }
}

export const cache = new MemoryCache();
export const rateLimiter = new RateLimiter();
