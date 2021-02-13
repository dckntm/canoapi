import { OptionalId, FilterQuery, Collection, Db } from 'mongodb';
import { StatusCode } from '../core';
import { Exception } from '../exception';
import { MongoConnection, ICollection, IDocument } from '.';
import { flattenObject } from './utils/flattenObject';
import { QueryOptions } from './queryOptions';
import { IEntity } from '../core/entity';
import { toDocument } from './utils/toDocument';
import { toEntity } from './utils/toEntity';

export class MongoRepository<TEntity extends IEntity<TKey>, TKey> {
  private readonly database: Db;

  public constructor(private readonly collection: ICollection<TEntity, TKey>) {
    this.database = MongoConnection.getDatabase();
  }

  public async create(entity: TEntity): Promise<TKey> {
    const collection = this.getCollection();
    const defaultValues = await this.collection.getDefault();
    const id = entity.id ?? (await this.collection.getNextId(collection));

    const data = toDocument({
      ...defaultValues,
      ...entity,
      id,
    }) as OptionalId<IDocument<TEntity, TKey>>;

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

    let documentFilter = {};

    if (filter.id) {
      const { id, ...data } = filter;

      documentFilter = {
        _id: id,
        ...data,
      };
    } else {
      documentFilter = filter;
    }

    const document = await collection.findOne(documentFilter);

    if (document) return toEntity(document);

    return null;
  }

  public async getMany(
    filter: FilterQuery<TEntity>,
    options?: QueryOptions,
  ): Promise<TEntity[]> {
    const collection = this.getCollection();

    let documentFilter = {};

    if (filter.id) {
      const { id, ...data } = filter;

      documentFilter = {
        _id: id,
        ...data,
      };
    } else {
      documentFilter = filter;
    }

    const query = await collection.find(documentFilter, {
      limit: options?.limit,
      sort: options?.sort,
      skip: options?.skip,
    });

    const documents = await query.toArray();

    return documents.map((x) => toEntity(x));
  }

  public async updateOne(
    filter: FilterQuery<TEntity>,
    updates: Partial<TEntity>,
  ): Promise<boolean> {
    const collection = this.getCollection();
    let documentFilter = {};

    if (filter.id) {
      const { id, ...data } = filter;

      documentFilter = {
        _id: id,
        ...data,
      };
    } else {
      documentFilter = filter;
    }

    const flatUpdates = flattenObject(updates, { shouldReplaceArrays: true });

    const operation = await collection.updateOne(documentFilter, {
      $set: { ...flatUpdates },
    });

    return operation.result.ok === 1;
  }

  public async getEntityCount(query: FilterQuery<TEntity>): Promise<number> {
    const collection = this.getCollection();

    return await collection.countDocuments(query);
  }

  public async deleteOne(filter: FilterQuery<TEntity>): Promise<boolean> {
    const collection = this.getCollection();

    let documentFilter = {};

    if (filter.id) {
      const { id, ...data } = filter;

      documentFilter = {
        _id: id,
        ...data,
      };
    } else {
      documentFilter = filter;
    }

    const operation = await collection.deleteOne(documentFilter);

    return operation.result.ok === 1;
  }

  private getCollection(): Collection<IDocument<TEntity, TKey>> {
    return this.database.collection(this.collection.name);
  }
}
