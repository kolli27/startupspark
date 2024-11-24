import Redis from 'ioredis';
import { logger } from '../monitoring';

interface CacheConfig {
  host?: string;
  port?: number;
  password?: string;
  ttl?: number; // Time to live in seconds
  prefix?: string;
}

interface CacheMetrics {
  hits: number;
  misses: number;
  errors: number;
}

export class RedisCache {
  private redis: Redis;
  private ttl: number;
  private prefix: string;
  private metrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    errors: 0,
  };

  constructor(config: CacheConfig = {}) {
    const {
      host = process.env.REDIS_HOST || 'localhost',
      port = parseInt(process.env.REDIS_PORT || '6379'),
      password = process.env.REDIS_PASSWORD,
      ttl = 3600, // 1 hour default
      prefix = 'ai:cache:',
    } = config;

    this.redis = new Redis({
      host,
      port,
      password,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.ttl = ttl;
    this.prefix = prefix;

    this.redis.on('error', (error) => {
      logger.error('Redis cache error:', error);
      this.metrics.errors++;
    });
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const cacheKey = this.getKey(key);
    try {
      if (ttl) {
        await this.redis.setex(cacheKey, ttl, value);
      } else {
        await this.redis.setex(cacheKey, this.ttl, value);
      }
    } catch (error) {
      logger.error('Error setting cache:', error);
      this.metrics.errors++;
    }
  }

  async get(key: string): Promise<string | null> {
    const cacheKey = this.getKey(key);
    try {
      const value = await this.redis.get(cacheKey);
      if (value) {
        this.metrics.hits++;
        return value;
      }
      this.metrics.misses++;
      return null;
    } catch (error) {
      logger.error('Error getting cache:', error);
      this.metrics.errors++;
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    const cacheKey = this.getKey(key);
    try {
      await this.redis.del(cacheKey);
    } catch (error) {
      logger.error('Error deleting cache:', error);
      this.metrics.errors++;
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await this.redis.keys(`${this.prefix}*`);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      logger.error('Error clearing cache:', error);
      this.metrics.errors++;
    }
  }

  async getMetrics(): Promise<CacheMetrics> {
    return { ...this.metrics };
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}

// Export a singleton instance with default configuration
export const redisCache = new RedisCache();
