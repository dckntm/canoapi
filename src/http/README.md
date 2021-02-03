# Http Library

Provides simple `HttpClient` that can be used directly or as a base class for more complex client. Provides set of methods for sending different requests to different services.

## Docs

### `IHttpClientConfig` interface

Config for `HttpClient` consists (currently) of 2 props:

* `base` url for some external service
* `defaultHeaders` for some default headers of the service which we can inject

As there can be several different `HttpClient`s in system we inject config via section name (default is `http`), so when you for example want to provide some configuration for several external APIs you just place them in different sections and inject HttpClient & HttpClientConfig with this section name.

> I recommend to put `http-` prefix before each `HttpClientConfig` section like `http-poke` or `http-google` or `http-facebook`

By default configuration for HTTP client provides following values:

```json
{
    "base": "",
    "defaultHeaders": []
}
```

You notice that default configuration does not provide any logical information for performing successful calls (only if you pass the entire url).

### `HttpClient` class

Core service for this library, which provides 5 methods for making API calls (using `axios` under the hood):

#### Methods

```ts
request<TResult = any>(
    url: string,
    method: HttpMethod,
    data: any = {},
    headers: any = {},): Promise<TResult>
```

general method for sending any kind of request

* `get(...): Promise<TResult>`
* `post(...): Promise<TResult>`
* `put(...): Promise<TResult>`
* `delete(...): Promise<TResult>`

with the same params (except from `method` which is obviously omitted)

As it was noticed earlier `HttpClient` is injected via `InjectHttpClient(name = 'http')`

