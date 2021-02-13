import { IEntity } from '.';
import { MongoRepository } from './mongoRepository';
import { nextIndexedId } from './utils/nextIndexedId';

export abstract class IndexedMongoRepository<
  TEntity extends IEntity<number>
> extends MongoRepository<TEntity, number> {
  constructor(name: string, getDefault: () => Partial<TEntity> = () => ({})) {
    super(name, nextIndexedId, getDefault);
  }
}
