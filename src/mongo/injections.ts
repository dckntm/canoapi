import { IIdentifiable } from '../core';
import { injectAppConfig } from '../config';
import { ICollection } from './collection';
import { DefaultMongoConfig, IMongoConfig } from './mongoConfig';
import { MongoDatabase } from './mongoDatabase';
import { MongoRepository } from './mongoRepository';

export const injectMongoConfig = (): IMongoConfig => {
  const appConfig = injectAppConfig();
  const config = DefaultMongoConfig;
  appConfig.bind('mongo', config);

  return config;
};

export const connectToMongoDatabase = async (): Promise<void> => {
  const mongoDatabase = new MongoDatabase();
  await mongoDatabase.connect();
};

export const injectMongoDatabase = (): MongoDatabase => {
  return new MongoDatabase();
};

export const injectMongoRepository = <
  TEntity extends IIdentifiable<TKey>,
  TKey
>(
  collection: ICollection<TEntity, TKey>,
): MongoRepository<TEntity, TKey> => {
  return new MongoRepository(collection);
};
