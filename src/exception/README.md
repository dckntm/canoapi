# Exception library

Exception library is internal utility for producing 3 general kinds of errors across the entire application:

* internal errors: these are for exceptions that happen in services (like config or router)
* business errors: these are for exceptions that happen due to violation of some business rules
* api errors: there are for exceptions that happen on api layer like failed validation of request body or failed file transport, etc 

## Docs

### `ExceptionType` enum

Has 3 values for each error type we defined in our system logic:

* `INTERNAL`
* `BUSINESS`
* `API`

### `Exception` class

`Exception` is an object that contains information about error happened in the system. It has 5 properties:

* `type` which is `Exception` enum value, that defines whether it api/business or internal error
* `status` which will be sent in response
* `message` which is some note that we provide for error
* `sender` which class originated error
* `meta` any additional info for error. Usually exception object itself

`Exception` class provides several fluent methods for building new `Exception`s

#### Methods

* `static api(): Exception`

Create `Exception` with `API` type and returns it.

* `static internal(): Exception`

Create `Exception` with `INTERNAL` type and returns it.

* `static business(): Exception`

Create `Exception` with `BUSINESS` type and returns it.

* `withMessage(message: string): this`

Fills `message` property with passed message value. 

* `form(sender: string): this`

Fills `sender` property of inner `Error` object with sender value.

* `withMeta(meta: any): this`

Fills `meta` property with additional unclassified data. Usually it is exception itself.

* `withStatus(code: StatusCode): this`

Fills `code` property with passed `StatusCode`

*Example*

```ts
throw Exception.api()
    .withMessage('Some API exception)
    .withStatus(StatusCode.INTERNAL_SERVER_ERROR)
    .withMeta(meta)
    .from('some service');
```
