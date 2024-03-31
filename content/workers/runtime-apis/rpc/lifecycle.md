---
pcx_content_type: configuration
title: Lifecycle
meta:
  title: Workers RPC — Lifecycle
  description: Workers RPC — Lifecycle
---

# Lifecycle

## Lifetimes, Memory and Resource Management

When you call another Worker over RPC using a Service binding, you are using memory in the Worker you are calling. Consider the following example:

```js
const user = await env.USER_SERVICE.findUser(id);
```

As long as the caller Worker is running, garbage collection in the callee Worker cannot run. The garbage collector for the callee Worker cannot know when the caller Worker is done with the user it has provided. This is different from what would happen if the user service ran in the same Worker that it was called in — the garbage collector would know when `user` could be safely and automatically disposed of.

This is not a limitation of the Worker runtime, but a limitation inherent to any distributed system. In a distributed system, the garbage collector has no visibility into the remote object graph nor any idea when the remote end is encountering memory pressure.

This why the examples above implement the `using` declaration — a new JavaScript language feature called [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management).

## Explicit Resource Management

[Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management) is a Stage 3 TC39 proposal that lets you explicitly declare when a given resource can be disposed of.

If a variable is declared with `using`, when the variable is no longer in scope, the variable can be safely disposed of. The following code:

```js
{
  using counter = await env.COUNTER_SERVICE.newCounter();
  await counter.increment(2);
  await counter.increment(4);
}
```
...is equivalent to:

```js
{
  const counter = await env.COUNTER_SERVICE.newCounter();
  try {
    await counter.increment(2);
    await counter.increment(4);
  } finally {
    counter[Symbol.dispose]();
  }
}
```

In the case of an RPC stub, the disposer notifies the callee Worker that the caller Worker is done with the stub, allowing it to then be garbage collected.

## Disposers and `RpcTarget` classes

A class that extends `RpcTarget` can also implement a disposer:

```js
class Foo extends RpcTarget {
  [Symbol.dispose]() {
    // ...
  }
}
```

Disposers always run asynchronously. The RpcTarget's disposer runs some time after the last stub is disposed. This is especially true because the dispose message needs to cross the network, but is true even in the case that the stub happens to point to a local object. Exceptions thrown by the disposer will be reported as uncaught exceptions.

## Dup


## Promise pipelining

When you call an RPC method and get back an object, it's common to immediately call a method on the object:

```js
using counter = await env.COUNTER_SERVICE.getCounter();
await counter.increment();
```

But consider the case where the Worker service that you are calling may be far away across the network, as in the case of [Smart Placement](/workers/runtime-apis/bindings/service-bindings/#smart-placement) or [Durable Objects](/durable-objects). On the surface, you might guess that the code above makes two round trips, once when calling `getCounter()`, and again when calling `.increment()`.

In practice, both calls are completed in a single round trip over the network. After sending the first call, the client immediately sends a second message instructing the server that when `getCounter()` is done, it should call `increment()` on the result.

This works because RPC methods return a custom ["Thenable"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables) — a Promise-like object that conform to the semantics and interface of a JavaScript Promise. You can treat this in your own code just like you would a normal JavaScript Promise — the optimization is handled automatically behind the scenes.

This works when calling properties of objects returned by RPC methods as well. For example:

```js
---
filename: myService.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export class MyService extends WorkerEntrypoint {
  async foo() {
    return {
      bar: {
        baz: () => "qux"
      }
    }
  }
}
```

```js
---
filename: client.js
---
export default {
  async fetch(request, env) {
    using foo = await env.MY_SERVICE.foo();
    let baz = await foo.bar.baz();
    return new Response(baz);
  }
}
```