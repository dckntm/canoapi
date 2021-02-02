# Event Bus Library

Bus library provides very simple in-memory implementation of some event bus. Do not use it for making event queues, it is just publish-subscribe object for dispatching events. 

## Docs

### `IEvent` interface

`IEvent<TType, TPayload>` is a simple object that contains event type (based on type event handlers are executed or not) and some payload which is used by handler.

### `EventHandler` type

`EventHandler` is simply a type for functions that takes some event if `IEvent` interface and executes some logic if event type is satisfied.

### `EventBus` class

`EventBus` is a singleton service that is configured with some set of handlers (`EventHandler`). We subscribe to some event via providing event handler (we can also unsubscribe). Event handler should pick event by itself.

#### Methods

* `subscribe(handler: EventHandler): void` - subscribes passed event handler to be executed on each and every event with appropriate route.
* `unsubscribe(handler: EventHandler): void` - finds handlers to be executed on passed route and executes them one by one.
* `dispatch(event: IEvent): Promise<void>` - asynchronously runs passed event over each handler in collection.

`EventBus` is injected via `injectEventBus()` function.
