import { injectAppConfig } from '../config';
import { RedisCache } from './redisCache';
import { DefaultRedisConfig, IRedisConfig } from './redisConfig';

export const injectRedisConfig = (): IRedisConfig => {
  const config = injectAppConfig();
  const redisConfig = DefaultRedisConfig;

  config.bind('redis', redisConfig);

  return redisConfig;
};

export const injectRedisCache = (): RedisCache => {
  return new RedisCache();
};
