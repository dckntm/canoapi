import { IEntity } from '../../core/entity';
import { IDocument } from '../document';

export const toEntity = <TEntity extends IEntity<TKey>, TKey>(
  document: IDocument<TEntity, TKey>,
): TEntity => {
  const { _id, ...data } = document;

  return {
    id: _id,
    ...data,
  } as TEntity;
};
