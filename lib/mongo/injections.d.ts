import { IIdentifiable } from 'core';
import { ICollection } from './collection';
import { IMongoConfig } from './mongoConfig';
import { MongoDatabase } from './mongoDatabase';
import { MongoRepository } from './mongoRepository';
export declare const injectMongoConfig: () => IMongoConfig;
export declare const connectToMongoDatabase: () => Promise<void>;
export declare const injectMongoDatabase: () => MongoDatabase;
export declare const injectMongoRepository: <TEntity extends IIdentifiable<TKey>, TKey>(collection: ICollection<TEntity, TKey>) => MongoRepository<TEntity, TKey>;
