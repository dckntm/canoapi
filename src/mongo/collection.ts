import { IIdentifiable } from '../core';
import { Collection } from 'mongodb';

export interface ICollection<TEntity extends IIdentifiable<TKey>, TKey> {
  readonly name: string;

  getDefault(): Partial<TEntity> | Promise<Partial<TEntity>>;

  getNextId(collection: Collection<TEntity>): TKey | Promise<TKey>;
}
