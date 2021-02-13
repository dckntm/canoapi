# Mongo library

Mongo library provides simple interface of working with MongoDB server.

## Documentation

First of all I want to explain concept behind data separation for production cases. I see 3 types of data we operate:

**Data Transfer Objects** - objects that are used only for transferring data across different infrastructural parts of service (but not databases). I suppose DTOs should be used as some shared package of interfaces for seamless client-server integration.

**Entities** - objects specific for domain. They can contain business logic. Must be identifiable.

**Documents** - objects for storing in database. They must be somehow mapped with Entities (as aggregates or directly). Also must be identifiable.

### `IEntity<TKey>`

Basic interface provided by `core` library. It just unsures that entity has `id` (which is still is nullable). We suggest using default `ObjectId` or `number`.

### `IMongoConfig` interface

Contains basic information for connecting to MongoDB database. Default values: 

```json
{
    "connectionString": "mongodb://localhost:27017",
    "database": "default_db"
}
```

Configuration info is by default stored in `mongo` section of config file. Configuration for MongoDB is injected via `injectMongoConfig()` function.

### `MongoConnection` class

Container for `MongoClient` which ensures that it's singleton for entire application. Responsible for connecting to database. Before using MongoDB collection it's required on server start up run `init()` method:

Other methods:

* `disconnect()` for closing connection to MongoDb. Should be used when server finishes the work.
* `isConnected()` checks if we are connected to MongoDB.
* `getDatabase(): Db` returns `Db` instance based on provided in configuration name. 

### `MongoRepository<TEntity extends IEntity<TKey>, TKey>` abstract class

CRUD interface for interacting with concrete MongoDB collection. It's constructor requires `name` for collection (we suggest using `Repository.name` on implementation), `nextId` function which takes collection and provides ids for new entities and `getDefault` function (by default it returns empty object: `() => ({})`).

You should provide your own class for repository based on this abstraction.

Provides several methods for CRUD operations:

* `create(entity: TEntity): Promise<TKey>` to create new document in database, possibly providing your own id, instead of asking to generate new one.
* `getOne(filter: FilterQuery<TEntity>): Promise<TEntity | null>` returns first that satisfies query entity based on passed query or nothing if no entity works out.
* `getMany(filter: FilterQuery<TEntity>,options?: QueryOptions,): Promise<TEntity[]>` returns an array of entities that satisfy passed filter and takes simple skip-limit-sort query.
* `updateOne(filter: FilterQuery<TEntity>, updates: Partial<TEntity>): Promise<boolean>` updates values of the first entity satisfying query with passed properties and informs if update was successful with returned boolean.
* `deleteOne(filter: FilterQuery<TEntity>): Promise<boolean>` deletes one document in collection based on passed filter and returns if deletion was successful.
* `count(query: FilterQuery<TEntity>): Promise<number>` returns number of entities that satisfy passed query

For simplicity there are 2 more abstract class for entities with `ObjectId` id and `number` id:

* DefaultMongoRepository<TEntity extends IEntity<ObjectId>>`
* IndexedMongoRepository<TEntity extends IEntity<number>>`

They do not require `nextId` function parameter as it's already provided. Indexed repository picks next number from the max id in collection (starting with 1).

_Examples_:


```ts
interface SimpleObject extends IEntity<number> {
  name: string;
  age: number;
}

class SimpleObjectRepository extends IndexedMongoRepository<SimpleObject> {
  constructor() {
    super(SimpleObjectRepository.name);
  }
}
```

In order to fully support functional injection concept (each service should provides it's own injection mechanism with `injectXXX` function) I suggest writing simple injection function like this:

```ts 
const injectSimpleObjectRepository = () => new SimpleObjectRepository();
```

_Full server app example_

```ts
// define entity
interface SimpleObject extends IEntity<number> {
  name: string;
  age: number;
}

// define repository class
class SimpleObjectRepository extends IndexedMongoRepository<SimpleObject> {
  constructor() {
    super(SimpleObjectRepository.name);
  }
}

// provide injection function
const injectSimpleObjectRepository = () => new SimpleObjectRepository();

// simple router for testing mongo
const MongoRouter = new ApiRouter('/mongo')
  // one can provide validation with Yup and `validate` HttpHandler  
  .post('/', async (ctx: IHttpContext) => {
    const repo = injectSimpleObjectRepository();

    const simpleObject = ctx.request.body as SimpleObject;

    const id = await repo.create(simpleObject);

    await compose(created, sendJson(id))(ctx);
  })
  .get('/:page', async (ctx: IHttpContext) => {
    const page = Number(ctx.request.params.page) ?? 0;
    const repo = injectSimpleObjectRepository();

    const data = await repo.getMany({}, QueryOptions.create().onPage(page, 10));

    await compose(success, sendJson(data))(ctx);
  });

const configureServices = async () => {
  // do not forget to initialize MongoConnection
  await MongoConnection.init();
};

// configure and run server
createServer(configureServices).withRouter(MongoRouter).run();

```