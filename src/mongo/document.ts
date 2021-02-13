import { ObjectId } from 'mongodb';
import { IEntity } from '../core/entity';

export type IDocument<TEntity extends IEntity<TKey>, TKey> = Omit<
  TEntity,
  'id'
> & {
  _id?: TKey;
};

export type IDefaultDocument<TEntity> = IDocument<TEntity, ObjectId>;
export type IIndexedDocument<TEntity> = IDocument<TEntity, number>;
