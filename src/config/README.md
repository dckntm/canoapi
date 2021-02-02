# Configuration library

This is configuration library, which we use for getting configuration for different services. It works as service for services as we usually need some configuration for other services to be created/run.

## Docs

### `IAppConfig` interface /`AppConfig` class

`AppConfig`  provides 2 methods: one is for accessing environment variable via name with caching, another is for mapping configuration object from json file values by section name which also support caching.

When reading configuration file `AppConfig` by default considers that we store it in root directory of the project and  it is called `config.<ENV>.json` where `<ENV>` is value of `ENV` environment variable.

Injected via `injectAppConfig()` method.

#### Methods 

* `getEnvironmentVariable(variable: string): string | undefined;`

Returns string value of environment variable if it is present or `undefined` if it is not. Cached when successfully found. Before trying to get environment variable from `process.env` it tries to access it from local in memory cache.

> Maybe we should throw some internal error environment variable is null

*Example*

```ts
// getting general instance of AppConfig
const config = new AppConfig();

// getting environment variable ENV
const env = config.getEnvironmentVariable('ENV');

// env might be undefined so check if it undefined 
```

* `bind<T>(sectionName: string, config: T): void;`

Fills passed `config` object with values from json file property with `section` name. Does not return anything as `config` object will be filled with values after mapping. If it can't map object for some reason it throws internal error

*Example*

```ts
// getting general instance of AppConfig
const config = injectAppConfig();

// create default instance of some configuration object 
const serverConfig = new ServerConfig();

// mapping
config.bind('server', serverConfig);

// now serverConfig is filled with values from config.<env>.json
```

