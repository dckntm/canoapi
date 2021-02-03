# Mongo library

Mongo library provides simple interface of working with MongoDB server.

## Documentation

### `IIdentifiable<TKey>`

Basic interface provided by `core` library. It just requires any entity stored in database to have `_id` property of type `TKey`. We suggest using default `ObjectId` or `number`.

### `ICollection<TEntity extends IIdentifiable<TKey>, TKey>`

Special interface that defines default values for entity and way of getting nextId and name for collection in database.

> next id method seems to be a problem

#### `getDefault(): Partial<TEntity> | Promise<Partial`

Returns default values for entity stored in collection.

#### `getNextId(collection: Collection<TEntity>): TKey | Promise<TKey>`

Based on actual MongoDB `Collection` it returns the next key for property. This method is needed for generating non-standard IDs like `number`. Should be reconsidered.

### `IMongoConfig` interface

Contains basic information for connecting to MongoDB database. Default values: 

```json
{
    "connectionString": "mongodb://localhost:27017",
    "database": "default_db"
}
```

Configuration info is by default stored in `mongo` section of config file. Configuration for MongoDB is injected via `injectMongoConfig()` function.

### `MongoDatabase` class

Container for `MongoClient` which ensures that it's singleton for entire application. Responsible for connecting to database. Before using MongoDB collection it's required on server start up run `connect()` method:

```ts
try {
    const db = injectMongoDatabase();
    db.connect()
} catch (e) {
    throw e;
}
```

Other methods:

* `disconnect()` for closing connection to MongoDb. Should be used when server finishes the work.
* `isConnected()` checks if we are connected to MongoDB

As you've seen in example injected via `injectMongoDatabase()` function. Usually you won't need it, but if you develop your own repository you can inject it to use general for application MongoDB client.

### `MongoRepository<TEntity, TKey>` class

CRUD interface for interacting with concrete MongoDB collection. On creation requires `ICollection<TEntity, TKey>` as constructor parameter (to know rules of collection and it's name).

Provides several methods for CRUD operations:

* `create(entity: Partial<TEntity>, externalId?: TKey)` to create new document in database, possibly providing your own id, instead of asking to generate new one.
* `getOne(filter: FilterQuery<TEntity>)` returns one entity based on passed query or throws an error (_should return `undefined` or `null` instead_).
* `getMany(filter: FilterQuery<TEntity>)` returns an array of entities that satisfy passed filter. _Should be extended with querying (sorting, ordering, etc.)_.
* `updateOne(filter: FilterQuery<TEntity>, updates: Partial<TEntity>)` updates values of the first entity satisfying query with passed properties.
* `deleteOne(filter: FilterQuery<TEntity>)` deletes one document in collection based on passed filter.