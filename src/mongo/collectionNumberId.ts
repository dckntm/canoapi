import { Collection } from 'mongodb';
import { IIdentifiable } from '../core';
import { ICollection } from './collection';

export abstract class CollectionNumberId<TEntity extends IIdentifiable<number>>
  implements ICollection<TEntity, number> {
  name: string = this.constructor.name;

  getDefault(): Partial<TEntity> | Promise<Partial<TEntity>> {
    return {};
  }

  async getNextId(collection: Collection<TEntity>): Promise<number> {
    return await collection.countDocuments();
  }
}
