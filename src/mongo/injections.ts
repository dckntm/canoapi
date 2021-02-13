import { injectAppConfig } from '../config';
import { DefaultMongoConfig, IMongoConfig } from './mongoConfig';

export const injectMongoConfig = (): IMongoConfig => {
  const appConfig = injectAppConfig();
  const config = DefaultMongoConfig;

  appConfig.bind('mongo', config);

  return config;
};

// export const injectMongoRepository = <TEntity extends IEntity<TKey>, TKey>(
//   collection: ICollection<TEntity, TKey>,
// ): MongoRepository<TEntity, TKey> => {
//   return new MongoRepository(collection);
// };
