import { injectAppConfig } from '../config';
import { ICollection } from './collection';
import { DefaultMongoConfig, IMongoConfig } from './mongoConfig';
import { MongoRepository } from './mongoRepository';
import { IEntity } from '../core/entity';

export const injectMongoConfig = (): IMongoConfig => {
  const appConfig = injectAppConfig();
  const config = DefaultMongoConfig;

  appConfig.bind('mongo', config);

  return config;
};

export const injectMongoRepository = <TEntity extends IEntity<TKey>, TKey>(
  collection: ICollection<TEntity, TKey>,
): MongoRepository<TEntity, TKey> => {
  return new MongoRepository(collection);
};
