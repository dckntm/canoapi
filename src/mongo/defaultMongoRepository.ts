import { ObjectId } from 'mongodb';
import { IEntity } from '.';
import { MongoRepository } from './mongoRepository';

export abstract class DefaultMongoRepository<
  TEntity extends IEntity<ObjectId>
> extends MongoRepository<TEntity, ObjectId> {
  constructor(name: string, getDefault: () => Partial<TEntity> = () => ({})) {
    super(name, () => new ObjectId(), getDefault);
  }
}
