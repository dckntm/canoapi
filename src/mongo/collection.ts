import { Collection } from 'mongodb';
import { IEntity } from '../core/entity';
import { IDocument } from '.';

export interface ICollection<TEntity extends IEntity<TKey>, TKey> {
  readonly name: string;

  getDefault(): Partial<TEntity> | Promise<Partial<TEntity>>;

  getNextId(
    collection: Collection<IDocument<TEntity, TKey>>,
  ): TKey | Promise<TKey>;
}
