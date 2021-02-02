# Api

Library provides functional way of defining your APIs.

## Documentation

### `HttpContext` / `IHttpContext`

`IHttpContext` is an abstraction over default `express` `Request` and `Response` objects. It is created pre request and supposed to contained request-related information (like authorization token payload information).

```ts
export interface IHttpContext<TMeta = any> {
  request: Request;
  response: Response;
  finished: boolean;
  meta: TMeta;
}
```

`finished` is special state property that marks whether this request is finished or not (request is considered to be finished when some result is send in response).

> There we should also consider request/response lifecycle of `express`

`meta` is the container for business-specific information in request (like user info or localization info).

### `HttpHandler`

Abstract type for functions that build request logic:

```ts
type HttpHandler = 
    | ((context: IHttpContext) => Promise<void> | void)
    | ((...args: unknown[])) => HttpHandler
```

It's definition might seem a bit weird, but is gives us a lot of options. First optional type for this `HttpHandler` is the basic one. It is just some action that happens with `IHttpContext` and usually mutates it. Second optional type is more abstract, because it is some kind of wrapper for `HttpHandler` which allows us to extend its capabilities with passed higher-order arguments.

### Handlers

There is a set of predefined common helper-handlers that are just required for developing any API.

#### `setStatus(code: StatusCode)`

Sets a status code of the response provided as a parameter. There is also a set of some shortcut handlers:

* `success` sets 200
* `created` sets 201
* `accepted` sets 202
* `badRequest` sets 400
* `unauthorized` sets 401
* `forbidden` sets 403
* `notFount` sets 404
* `notAllowed` sets 405
* `internalServerError` sets 500
* `notImplemented` sets 501

Range of available status codes is actually wider.

#### `sendJson(body: any)`

Writes to response body passed object and sends request. This is very important as when you call `SendJson` handler you actually finish the request, so for now you should remember when you finally cal it.  

#### `validate(schema: Yup.AnyObjectSchema)`

Throws an `Exception` if request body does not satisfies provided scheme. `Exception` will be automatically handled and send as a result of request.

#### `handleException(e: any)`

Takes any type as some exception, converts it to `Exception` type (from `error` library) if needed and sends it in body of response. Already handled in `ApiRouter` so you actually should not care about it much.

#### `dispatchQuery`

Set of bounded handlers that allow us to call async functions that return some result (queries). We can pass information for queries from 3 sources - body, query and params of request, that's why there is common `dispatchQuery` handler that takes query that should be executed and array of sources from which we build query data. After dispatching it automatically writes result to response body as json.

There are also shortcuts for dispatching queries:

* `dispatchQueryFromBody`
* `dispatchQueryFromQuery`
* `dispatchQueryFromParams`

Additionally there is `dispatchQueryFromValue` which also takes query data that should be put into query.

#### `dispatchCommand`

Set of bounded handlers that allow us to call async functions without any resulting response (commands). We can pass information for commands from 3 sources - body, query and params of request, that's why there is common `dispatchCommand` handler that takes command that should be executed and array of sources from which we build command data.

There are also shortcuts for dispatching commands:

* `dispatchCommandFromBody`
* `dispatchCommandFromQuery`
* `dispatchCommandFromParams`

Additionally there is `dispatchCommandFromValue` which also takes command data that should be put into command.

#### `compose(...handler: HttpHandler[])`

Handler wrapper which takes several handlers and executes them one-by-one in provided order. It converts several handlers into one and try-catches exceptions, which than will be handled by `handleException` handler.

### `ApiRouter` class

`ApiRouter` class is actually a builder for routes in our system. ApiRouter is build using constructor and several fluent-syntax methods for each kind of HTTP method (get, post, put, delete). `ApiRouter` has it's own base route, several default handlers and a set of routes to be build for server. Routes (helper interface `IRoute`) have route, handler and HTTP method information.

Based on this information `ApiRouter` build `Router` from `express` via `apply()` method which that can be used with `server.use()`.

*Example*

```ts
const server = express();

const UserRouter = new ApiRouter('/user')
    .get('/', compose(success, sendJson({name: 'Ilya', surname: 'Katun', email: 'katun.ilya@gmail.com', age: 20})))
    // this will be by default handled by handlerError HttpHandler wrapper
    .get('/error', (ctx: HttpContext) => {
        throw new Error('This is error');
    })

server.use(UserRouter.apply());
```
