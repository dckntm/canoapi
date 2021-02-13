import { Collection } from 'mongodb';
import { Exception } from '../../exception';
import { injectLogService } from '../../log';
import { IIndexedDocument } from '../document';
import { IEntity } from '../../core/entity';

export const nextIndexedId = async <TEntity extends IEntity<number>>(
  collection: Collection<IIndexedDocument<TEntity>>,
): Promise<number> => {
  const last = await collection
    .find(
      {},
      {
        sort: { _id: -1 },
        limit: 1,
      },
    )
    .toArray();

  if (last.length > 0) {
    const { _id } = last[0];

    if (_id) return _id + 1;

    const logger = injectLogService();
    logger.info('Error in nextIndexedId');

    throw Exception.internal()
      .withMessage('Cannot generate next indexed id for collection')
      .from('nextIndexedId')
      .withMeta(last);
  } else return 1;
};
