import { OptionalId, FilterQuery, Collection } from 'mongodb';
import { IIdentifiable, StatusCode } from '../core';
import { Exception } from '../exception';
import { MongoDatabase, ICollection, injectMongoDatabase } from '.';
import { flattenObject } from './utils/flattenObject';

// TODO: implement from IRepository
export class MongoRepository<TEntity extends IIdentifiable<TKey>, TKey> {
  private readonly mongoDatabase: MongoDatabase;

  public constructor(private readonly collection: ICollection<TEntity, TKey>) {
    this.mongoDatabase = injectMongoDatabase();
  }

  public async create(
    entity: Partial<TEntity>,
    externalId?: TKey,
  ): Promise<TKey> {
    const collection = this.getCollection();
    const defaultValues = await this.collection.getDefault();
    const id = externalId ?? (await this.collection.getNextId(collection));

    // TODO : some id handling needed
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

  public async getOne(filter: FilterQuery<TEntity>): Promise<TEntity> {
    const collection = this.getCollection();
    const document = await collection.findOne(filter);

    if (document) {
      return document;
    }

    // TODO : get rid of this exception
    throw Exception.internal()
      .withMessage('Failed to get entity')
      .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
      .withMeta({ filter })
      .from('MongoRepository');
  }

  // TODO: add querying
  public async getMany(filter: FilterQuery<TEntity>): Promise<TEntity[]> {
    const collection = this.getCollection();

    const query = await collection.find(filter);

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
    const db = this.mongoDatabase.Database;

    return db.collection(this.collection.name);
  }

  private async GetNextId(): Promise<number> {
    return (await this.getCollection().countDocuments({})) + 1;
  }
}
