import { OptionalId, FilterQuery, Collection, Db } from 'mongodb';
import { StatusCode } from '../core';
import { Exception } from '../exception';
import { MongoConnection, IDocument } from '.';
import { flattenObject } from './utils/flattenObject';
import { QueryOptions } from './queryOptions';
import { IEntity } from '../core/entity';
import { toDocument } from './utils/toDocument';
import { toEntity } from './utils/toEntity';
import { injectLogService } from '../log';

export abstract class MongoRepository<TEntity extends IEntity<TKey>, TKey> {
  protected readonly collection: Collection<IDocument<TEntity, TKey>>;

  public constructor(
    // private readonly collection: ICollection<TEntity, TKey>,
    protected readonly name: string,
    protected readonly nextId: (collection: Collection) => TKey | Promise<TKey>,
    protected readonly getDefault: () => Partial<TEntity> = () => ({}),
  ) {
    this.collection = MongoConnection.getDatabase().collection(name);
  }

  public async create(entity: TEntity): Promise<TKey> {
    const defaultValues = await this.getDefault();
    const id = entity.id ?? (await this.nextId(this.collection));

    const data = toDocument({
      ...defaultValues,
      ...entity,
      id,
    }) as OptionalId<IDocument<TEntity, TKey>>;

    const operation = await this.collection.insertOne(data);

    if (!operation.result.ok)
      throw Exception.internal()
        .withMessage('Failed to create entity')
        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
        .withMeta({ data })
        .from('MongoRepository');

    return id;
  }

  public async getOne(filter: FilterQuery<TEntity>): Promise<TEntity | null> {
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

    const document = await this.collection.findOne(documentFilter);

    if (document) return toEntity(document);

    return null;
  }

  public async getMany(
    filter: FilterQuery<TEntity>,
    options?: QueryOptions,
  ): Promise<TEntity[]> {
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

    const query = await this.collection.find(documentFilter, {
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

    const operation = await this.collection.updateOne(documentFilter, {
      $set: { ...flatUpdates },
    });

    return operation.result.ok === 1;
  }

  public async count(query: FilterQuery<TEntity>): Promise<number> {
    return await this.collection.countDocuments(query);
  }

  public async deleteOne(filter: FilterQuery<TEntity>): Promise<boolean> {
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

    const operation = await this.collection.deleteOne(documentFilter);

    return operation.result.ok === 1;
  }
}
