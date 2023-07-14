---
pcx_content_type: configuration
title: AsyncLocalStorage
---

# AsyncLocalStorage

## Background

{{<render file="_nodejs-compat-howto.md">}}

Cloudflare Workers provides an implemenation of a subset of the Node.js [`AsyncLocalStorage`](https://nodejs.org/dist/latest-v18.x/docs/api/async_context.html#class-asynclocalstorage) API for creating in-memory stores that remain coherent through asynchronous operations.

## Constructor

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();
```

{{<definitions>}}

- {{<code>}}new AsyncLocalStorage(){{</code>}} : {{<type>}}AsyncLocalStorage{{</type>}}

  - Returns a new `AsyncLocalStorage` instance.

{{</definitions>}}

## Methods

{{<definitions>}}

- `getStore()` : {{<type>}}any{{</type>}}

  - Returns the current store. If called outside of an asynchronous context initialized by calling `asyncLocalStorage.run()`, it returns `undefined`.

- {{<code>}}run(store{{<param-type>}}any{{</param-type>}}, callback{{<param-type>}}function{{</param-type>}}, ...args{{<param-type>}}arguments{{</param-type>}}){{</code>}} : {{<type>}}any{{</type>}}

  - Runs a function synchronously within a context and returns its return value. The store is not accessible outside of the callback function. The store is accessible to any asynchronous operations created within the callback. The optional `args` are passed to the callback function. If the callback function throws an error, the error is thrown by `run()` also.

- {{<code>}}exit(callback{{<param-type>}}function{{</param-type>}}, ...args{{<param-type>}}arguments{{</param-type>}}){{</code>}} : {{<type>}}any{{</type>}}

  - Runs a function synchronously outside of a context and returns its return value. This method is equivalent to calling `run()` with the `store` value set to `undefined`.

{{</definitions>}}

## Static Methods

{{<definitions>}}

- `AsyncLocalStorage.bind(fn)` : {{<type>}}function{{</type>}}

  - Captures the asynchronous context that is current when `bind()` is called and returns a function that enters that context before calling the passed in function.

- `AsyncLocalStorage.snapshot()` : {{<type>}}function{{</type>}}

  - Captures the asynchronous context that is current when `snapshot()` is called and returns a function that enters that context before calling a given function.

{{</definitions>}}

## Examples

### Fetch Listener

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();
let idSeq = 0;

export default {
  async fetch(req) {
    return asyncLocalStorage.run(idSeq++, () => {
      // Simulate some async activity...
      await scheduler.wait(1000);
      return new Response(asyncLocalStorage.getStore());
    });
  }
};
```

### Multiple stores

The API supports multiple `AsyncLocalStorage` instances to be used concurrently.

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const als1 = new AsyncLocalStorage();
const als2 = new AsyncLocalStorage();

export default {
  async fetch(req) {
    return als1.run(123, () => {
      return als2.run(321, () => {
        // Simulate some async activity...
        await scheduler.wait(1000);
        return new Response(`${als1.getStore()}-${als2.getStore()}`);
      });
    });
  }
};
```

### Unhandled Rejections

When a `Promise` rejects and the rejection is unhandled, the async context propagates to the `'unhandledrejection'` event handler:

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();
let idSeq = 0;

addEventListener('unhandledrejection', (event) => {
  console.log(asyncLocalStorage.getStore(), 'unhandled rejection!');
});

export default {
  async fetch(req) {
    return asyncLocalStorage.run(idSeq++, () => {
      // Cause an unhandled rejection!
      throw new Error('boom');
    });
  }
};
```

### `AsyncLocalStorage.bind()` and `AsyncLocalStorage.snapshot()`

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage();

function foo() { console.log(als.getStore()); }
function bar() { console.log(als.getStore()); }

const oneFoo = als.run(123, () => AsyncLocalStorage.bind(foo));
oneFoo(); // prints 123

const snapshot = als.run('abc', () => AsyncLocalStorage.snapshot());
snapshot(foo); // prints 'abc'
snapshot(bar); // prints 'abc'
```

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage();

class MyResource {
  #runInAsyncScope = AsyncLocalStorage.snapshot();

  doSomething() {
    this.#runInAsyncScope(() => {
      return als.getStore();
    });
  }
};

const myResource = als.run(123, () => new MyResource());
console.log(myResource.doSomething()); // prints 123
```

## `AsyncResource`

The [`AsyncResource`](https://nodejs.org/dist/latest-v18.x/docs/api/async_context.html#class-asyncresource) class is a component of Node.js' async context tracking API that allows users to create their own async contexts. Objects that extend from `AsyncResource` are capable of propagating the async context in much the same way as promises.

Note that `AsyncLocalStorage.snapshot()` and `AsyncLocalStorage.bind()` provide a better approach. `AsyncResource` is provided solely for backwards compatibility with Node.js.

### Constructor

```js
import { AsyncResource, AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage();

class MyResource extends AsyncResource {
  constructor() {
    // The type string is required by Node.js but unused in Workers.
    super('MyResource');
  }

  doSomething() {
    this.runInAsyncScope(() => {
      return als.getStore();
    });
  }
};

const myResource = als.run(123, () => new MyResource());
console.log(myResource.doSomething()); // prints 123
```

{{<definitions>}}

- {{<code>}}new AsyncResource(type{{<param-type>}}string{{</param-type>}}, options{{<param-type>}}AsyncResourceOptions{{</param-type>}}){{</code>}} : {{<type>}}AsyncResource{{</type>}}

  - Returns a new `AsyncResource`. Importantly, while the constructor arguments are required in Node.js' implementation of `AsyncResource`, they are not used in Workers.

- {{<code>}}AsyncResource.bind(fn{{<param-type>}}function{{</param-type>}}, type{{<param-type>}}string{{</param-type>}}, thisArg{{<param-type>}}any{{</param-type>}}){{</code>}}

  - Binds the given function to the current async context.

{{</definitions>}}

### Methods

{{<definitions>}}

- {{<code>}}asyncResource.bind(fn{{<param-type>}}function{{</param-type>}}, thisArg{{<param-type>}}any{{</param-type>}}){{</code>}}

  - Binds the given function to the async context associated with this `AsyncResource`.

- {{<code>}}asyncResource.runInAsyncScope(fn{{<param-type>}}function{{</param-type>}}, thisArg{{<param-type>}}any{{</param-type>}}, ...args{{<param-type>}}arguments{{</param-type>}}){{</code>}}

  - Call the provided function with the given arguments in the async context associated with this `AsyncResource`.

{{</definitions>}}

## Caveats

* The `AsyncLocalStorage` implementation provided by Workers intentionally omits support for the [`asyncLocalStorage.enterWith()`](https://nodejs.org/dist/latest-v18.x/docs/api/async_context.html#asynclocalstorageenterwithstore) and [`asyncLocalStorage.disable()`](https://nodejs.org/dist/latest-v18.x/docs/api/async_context.html#asynclocalstoragedisable) methods.

* Workers does not implement the full [`async_hooks`](https://nodejs.org/dist/latest-v18.x/docs/api/async_hooks.html) API upon which Node.js' implementation of `AsyncLocalStorage` is built.

* Workers does not implement the ability to create an `AsyncResource` with an explicitly identified trigger context as allowed by Node.js. This means that a new `AsyncResource` will always be bound to the async context in which it was created.
