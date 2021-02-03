import { RedisClient } from 'redis';
import { injectRedisConfig } from './injections';
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';

export class RedisConnection {
  private static client: WrappedNodeRedisClient;

  private constructor() {}

  public static init() {
    if (!RedisConnection.client) {
      const config = injectRedisConfig();

      RedisConnection.client = createNodeRedisClient(config);
    }
  }

  public static getRedisClient() {
    return RedisConnection.client;
  }
}
