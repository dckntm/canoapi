import { WrappedNodeRedisClient } from 'handy-redis';
import { StatusCode } from '../core';
import { Exception } from '../exception';
import { RedisConnection } from './redisConnection';

export class RedisCache {
  private client: WrappedNodeRedisClient;

  constructor() {
    this.client = RedisConnection.getRedisClient();
  }

  public async set(key: string, data: any): Promise<void> {
    try {
      this.client.set(key, JSON.stringify(data));
    } catch (e) {
      throw Exception.internal()
        .withMessage(
          `Failed to set data to redis with key ${key} and data ${data}`,
        )
        .withMeta(e)
        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
        .from(this.constructor.name);
    }
  }

  public async get<T = any>(key: string): Promise<T | null> {
    try {
      const jsonData = await this.client.get(key);

      if (!jsonData) return null;

      const data = JSON.parse(jsonData) as T;

      return data;
    } catch (e) {
      throw Exception.internal()
        .withMessage(`Failed to get data from redis with key ${key}`)
        .withMeta(e)
        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
        .from(this.constructor.name);
    }
  }

  public async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (e) {
      throw Exception.internal()
        .withMessage(`Failed to delete data from redis with key ${key}`)
        .withMeta(e)
        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
        .from(this.constructor.name);
    }
  }
}
