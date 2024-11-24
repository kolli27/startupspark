import Redis from 'ioredis';
import { logger } from '../monitoring';

interface RateLimitConfig {
  points?: number;        // Number of requests allowed
  duration?: number;      // Time window in seconds
  blockDuration?: number; // Duration to block if limit exceeded (seconds)
  prefix?: string;       // Redis key prefix
}

interface RateLimitInfo {
  remaining: number;     // Remaining points in current window
  reset: number;        // Timestamp when points reset
  blocked: boolean;     // Whether requester is currently blocked
}

export class RateLimiter {
  private redis: Redis;
  private points: number;
  private duration: number;
  private blockDuration: number;
  private prefix: string;

  constructor(config: RateLimitConfig = {}) {
    const {
      points = 10,
      duration = 60,
      blockDuration = 600,
      prefix = 'ai:ratelimit:'
    } = config;

    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      }
    });

    this.points = points;
    this.duration = duration;
    this.blockDuration = blockDuration;
    this.prefix = prefix;

    this.redis.on('error', (error: Error) => {
      logger.error('Redis rate limiter error:', error);
    });
  }

  private getPointsKey(id: string): string {
    return `${this.prefix}${id}:points`;
  }

  private getBlockKey(id: string): string {
    return `${this.prefix}${id}:blocked`;
  }

  async isBlocked(id: string): Promise<boolean> {
    const blocked = await this.redis.get(this.getBlockKey(id));
    return !!blocked;
  }

  async getRateLimit(id: string): Promise<RateLimitInfo> {
    const [pointsStr, blocked] = await Promise.all([
      this.redis.get(this.getPointsKey(id)),
      this.isBlocked(id)
    ]);

    const points = pointsStr ? parseInt(pointsStr) : this.points;
    const ttl = await this.redis.ttl(this.getPointsKey(id));
    
    return {
      remaining: Math.max(0, points),
      reset: Date.now() + (ttl >= 0 ? ttl * 1000 : this.duration * 1000),
      blocked
    };
  }

  async consume(id: string): Promise<RateLimitInfo> {
    const blocked = await this.isBlocked(id);
    if (blocked) {
      throw new Error('Rate limit exceeded - currently blocked');
    }

    const pointsKey = this.getPointsKey(id);
    const points = await this.redis.get(pointsKey);

    if (!points) {
      // First request in window
      await this.redis.setex(pointsKey, this.duration, this.points - 1);
      return this.getRateLimit(id);
    }

    const remaining = parseInt(points);
    if (remaining <= 0) {
      // Block the requester
      await this.redis.setex(this.getBlockKey(id), this.blockDuration, '1');
      throw new Error('Rate limit exceeded');
    }

    // Consume a point
    await this.redis.decrby(pointsKey, 1);
    return this.getRateLimit(id);
  }

  async reset(id: string): Promise<void> {
    await Promise.all([
      this.redis.del(this.getPointsKey(id)),
      this.redis.del(this.getBlockKey(id))
    ]);
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}

// Export a singleton instance with default configuration
export const rateLimiter = new RateLimiter();

// Export error types for better error handling
export class RateLimitError extends Error {
  constructor(message: string, public readonly retryAfter: number) {
    super(message);
    this.name = 'RateLimitError';
  }
}
