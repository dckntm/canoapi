import { ICollection } from './collection';
import { IEntity } from '../core/entity';
import { nextIndexedId } from './utils/nextIndexedId';

export const createIndexedCollection = <TEntity extends IEntity<number>>(
  name: string,
  getDefault: () => Partial<TEntity> | Promise<Partial<TEntity>> = () => ({}),
) => {
  const collection: ICollection<TEntity, number> = {
    name,
    getDefault,
    getNextId: nextIndexedId,
  };

  return collection;
};
