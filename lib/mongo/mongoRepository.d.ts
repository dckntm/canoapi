import { FilterQuery } from 'mongodb';
import { IIdentifiable } from 'core';
import { ICollection } from '.';
export declare class MongoRepository<TEntity extends IIdentifiable<TKey>, TKey> {
    private readonly collection;
    private readonly mongoDatabase;
    constructor(collection: ICollection<TEntity, TKey>);
    create(entity: Partial<TEntity>, externalId?: TKey): Promise<TKey>;
    getOne(filter: FilterQuery<TEntity>): Promise<TEntity>;
    getMany(filter: FilterQuery<TEntity>): Promise<TEntity[]>;
    updateOne(query: FilterQuery<TEntity>, updates: Partial<TEntity>): Promise<boolean>;
    getEntityCount(query: FilterQuery<TEntity>): Promise<number>;
    deleteOne(query: FilterQuery<TEntity>): Promise<boolean>;
    private getCollection;
    private GetNextId;
}
