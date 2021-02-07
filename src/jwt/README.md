# JWT

Library provides ability to work with JSON-web tokens

## Docs

### `IJWTConfig` interface /`DefaultJWTConfig` object

`IJWTConfig` declares amount of properties to configurate JWT such as secret key, issuer, validation settings, lifetime end etc.

`DefaultJWTConfig` is default configuration. Changes are possible by adding necessary values into `config.dev.json`.
Changes will be applied automatically by `injectJWTConfig` method.

#### Methods

* `createJWT(payload: any):string;`

Returns string value of signed JSON-Web token.

Throws `Exception` which will be handled automatically if it is impossible to sign new token.

* `validateJWT(token: string):string;`

Returns payload if token is valid, otherwise - throws an `Exception` which will be handled automatically.
