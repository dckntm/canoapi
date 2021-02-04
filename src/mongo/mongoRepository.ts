import { OptionalId, FilterQuery, Collection, Db } from 'mongodb';
import { IIdentifiable, StatusCode } from '../core';
import { Exception } from '../exception';
import { MongoConnection, ICollection } from '.';
import { flattenObject } from './utils/flattenObject';
import { QueryOptions } from './queryOptions';

export class MongoRepository<TEntity extends IIdentifiable<TKey>, TKey> {
  private readonly database: Db;

  public constructor(private readonly collection: ICollection<TEntity, TKey>) {
    this.database = MongoConnection.getDatabase();
  }

  public async create(entity: TEntity): Promise<TKey> {
    const collection = this.getCollection();
    const defaultValues = await this.collection.getDefault();
    const id = entity._id ?? (await this.collection.getNextId(collection));

    const data = {
      _id: id,
      ...defaultValues,
      ...entity,
    } as OptionalId<TEntity>;

    const operation = await collection.insertOne(data);

    if (!operation.result.ok)
      throw Exception.internal()
        .withMessage('Failed to create entity')
        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
        .withMeta({ data })
        .from('MongoRepository');

    return id;
  }

  public async getOne(filter: FilterQuery<TEntity>): Promise<TEntity | null> {
    const collection = this.getCollection();
    return await collection.findOne(filter);
  }

  public async getMany(
    filter: FilterQuery<TEntity>,
    options?: QueryOptions,
  ): Promise<TEntity[]> {
    const collection = this.getCollection();

    const query = await collection.find(filter, {
      limit: options?.limit,
      sort: options?.sort,
      skip: options?.skip,
    });

    const documents = await query.toArray();

    return documents;
  }

  public async updateOne(
    query: FilterQuery<TEntity>,
    updates: Partial<TEntity>,
  ): Promise<boolean> {
    const collection = this.getCollection();
    const flatUpdates = flattenObject(updates, { shouldReplaceArrays: true });

    const operation = await collection.updateOne(query, {
      $set: { ...flatUpdates },
    });

    return operation.result.ok === 1;
  }

  public async getEntityCount(query: FilterQuery<TEntity>): Promise<number> {
    const collection = this.getCollection();

    return await collection.countDocuments(query);
  }

  public async deleteOne(query: FilterQuery<TEntity>): Promise<boolean> {
    const collection = this.getCollection();

    const operation = await collection.deleteOne(query);

    return operation.result.ok === 1;
  }

  private getCollection(): Collection<TEntity> {
    return this.database.collection(this.collection.name);
  }
}
