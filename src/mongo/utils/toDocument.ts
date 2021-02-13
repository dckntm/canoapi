import { IEntity } from '../../core/entity';
import { IDocument } from '../document';

export const toDocument = <TEntity extends IEntity<TKey>, TKey>(
  entity: TEntity,
): IDocument<TEntity, TKey> => {
  const { id, ...data } = entity;

  return {
    _id: id,
    ...data,
  };
};
