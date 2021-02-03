# Log library

Log library provides log service which generates good-looking output for logs and can be injected wherever developer wants. Uses `ts-log` package for console output. This logger is only for console logs, but possibly will be extended to be executed for sending log information to other services via event bus.

## Docs

### `LogLevel` enum

We define several log levels which will be logged (or not) during the system execution:

* `TRACE` for sending detailed output on what and where happened
* `DEBUG` simple info that should be ignored in production
* `INFO` simple info that just outputs what happens in the system
* `WARN` something not really good happened, but it is not an error or some critical problem
* `ERROR` something bad happened
* `FATAL` something really bad happened

### `ILogConfig` interface

Log contains information about what log levels we are going to execute in console.

Default value for configuration:

```json
{
    "console": ["ERROR", "INFO", "DEBUG", "FATAL", "WARN"]
}
```

### `LogService` class

Core service of this library which provides several methods for sending logs of different levels:

* `trace()`
* `debug()`
* `info()`
* `warn()`
* `error()`
* `fatal()`

Injected via `injectLogService()` function.
