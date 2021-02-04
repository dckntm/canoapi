import { injectRedisConfig } from './injections';
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { injectLogService } from '../log';

export class RedisConnection {
  private static client: WrappedNodeRedisClient;

  private constructor() {}

  public static init() {
    if (!RedisConnection.client) {
      const log = injectLogService();
      const config = injectRedisConfig();

      log.info('Connecting to Redis...');

      RedisConnection.client = createNodeRedisClient(config);

      log.info(`Connected to Redis on ${config.host}:${config.port}`);
    }
  }

  public static getRedisClient() {
    return RedisConnection.client;
  }
}
