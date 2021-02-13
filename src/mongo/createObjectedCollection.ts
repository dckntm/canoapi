import { Collection, ObjectId } from 'mongodb';
import { ICollection } from './collection';
import { IEntity } from '../core/entity';
import { IDefaultDocument, IDocument } from './document';

export const createObjectedCollection = <TEntity extends IEntity<ObjectId>>(
  name: string,
  getDefault: () => Partial<TEntity> | Promise<Partial<TEntity>> = () => ({}),
) => {
  const collection: ICollection<TEntity, ObjectId> = {
    name,
    getDefault,
    getNextId: (_: Collection<IDefaultDocument<TEntity>>) => new ObjectId(),
  };

  return collection;
};
