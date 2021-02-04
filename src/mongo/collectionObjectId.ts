import { ObjectId, Collection } from 'mongodb';
import { ICollection } from './collection';
import { IIdentifiable } from '../core';

export abstract class CollectionObjectId<
  TEntity extends IIdentifiable<ObjectId>
> implements ICollection<TEntity, ObjectId> {
  name = this.constructor.name;

  getDefault(): Partial<TEntity> | Promise<Partial<TEntity>> {
    return {};
  }

  getNextId(_: Collection<TEntity>): ObjectId | Promise<ObjectId> {
    return new ObjectId();
  }
}
