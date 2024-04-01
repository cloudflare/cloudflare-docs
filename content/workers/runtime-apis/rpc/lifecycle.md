---
pcx_content_type: configuration
title: Lifecycle
meta:
  title: Workers RPC — Lifecycle
  description: Memory management, resource management, and the lifecycle of RPC stubs
---

# Lifecycle

## Lifetimes, Memory and Resource Management

When you call another Worker over RPC using a Service binding, you are using memory in the Worker you are calling. Consider the following example:

```js
let user = await env.USER_SERVICE.findUser(id);
```

As long as the caller Worker is running, garbage collection in the callee Worker cannot run. The garbage collector for the callee Worker cannot know when the caller Worker is done with the user it has provided. This is different from what would happen if the user service ran in the same Worker that it was called in — the garbage collector would know when `user` could be safely and automatically disposed of.

This is not a limitation of the Worker runtime, but a limitation inherent to any distributed system. In a distributed system, the garbage collector has no visibility into the remote object graph nor any idea when the remote end is encountering memory pressure.

## Explicit Resource Management

To ensure resources are properly disposed of, you should use [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management), a new JavaScript language feature that allows you to explicitly signal when resources can be disposed of. Explicit Resource Management is a Stage 3 TC39 proposal — it is [coming to V8 soon](https://groups.google.com/g/v8-reviews/c/LAk0iBZcIbM).

Explicit Resource Management adds the following language features:

- The [`using` desclaration](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file#using-declarations)
- [`Symbol.dispose` and `Symbol.asyncDispose`](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file#additions-to-symbol)

If a variable is declared with `using`, when the variable is no longer in scope, the variable can be safely disposed of. For example:

```js
function sendEmail(id, message) {
  using user = await env.USER_SERVICE.findUser(id);
  await user.sendEmail(message);
  return;
} // Exited scope, so user can be safely disposed of
```

When you declare variables that point to resources that are accessed via RPC, from other Workers or Durable Objects, you should generally declare them with the `using` declaration. This tells the callee Worker that the caller Worker is done with the resource, allowing it to be garbage collected and disposed of.

### How to use the `using` declaration in your Worker

Because it has not yet landed in V8, the `using` keyword is not yet available directly in the Workers runtime. To use it in your code, you must use a prerelease version of the [Wrangler CLI](/workers/wrangler/) to run and deploy your Worker:

```sh
npx wrangler@using-declaration-experimental dev
```

This version of Wrangler will transpile `using` into direct calls to `Symbol.dispose()`, before running your code or deploying it to Cloudflare.

The following code:

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

## Automatic disposal and execution contexts

The RPC system automatically disposes of stubs in the following cases:

### End of Execution Context

When the Worker's "execution context" ends, all stubs created in that context are implicitly disposed.

An "execution context" is the context in which a single event is handled. For example, when a worker implements a [`fetch()` handler](/workers/runtime-apis/handlers/fetch) to receive HTTP requests, each HTTP request creates a new execution context.

When the client of the HTTP request disconnects, the context is immediately terminated, ending all asynchronous tasks and disposing all stubs. For example, the Worker below does not make use of the `using` declaration, but stubs will be disposed of once the `fetch()` handler returns a response:

```js
export default {
  async fetch(request, env, ctx) {
    let authResult = await env.AUTH_SERVICE.checkCookie(req.headers.get("Cookie"));
    if (!authResult.authorized) {
      return new Response("Not authorized", {status: 403});
    }
    let profile = await authResult.user.getProfile();

    return new Response(`Hello, ${profile.name}!`);
  },
};
```

When a Worker is running as a result of an RPC call on a `WorkerEntrypoint`, the execution context remains open until the client and server have both disposed all stubs passed between the two, or when the client's execution context ends, whichever comes first.

If you need to extend the execution context, you can do so by using [`ctx.waitUntil()`](/workers/runtime-apis/context).

### Stubs received as parameters in an RPC call

When stubs are received in the parameters of an RPC, those stubs are automatically disposed when the call returns. If you wish to keep the stubs longer than that, you must call the `dup()` method on them.

### Sessions

Each top-level RPC call to a `WorkerEntrypoint` is considered its own session. Subsequent stubs that are introduced by that call are considered to be part of this same session. For example, both `user` and `messages` are considered to be part of the same session:

```js
let user = await env.USER_SERVICE.findUser(id);
let messages = await user.messages();
```

### Disposing RPC objects disposes stubs that are part of that object

When an RPC returns any kind of object, that object will have a disposer. Disposing it will dispose all stubs returned by the call. For instance, if an RPC returns an array of four stubs, the array itself will have a disposer that disposes all four stubs. The only time the value returned by an RPC does not have a disposer is when it is a primitive value, such as a number or string. These types cannot have disposers added to them, but because these types cannot themselves contain stubs, there is no need for a disposer in this case.

This means you should almost always store the result of an RPC into a `using` declaration:

```js
using result = stub.foo();
```

This way, if the result contains any new stubs, they will be disposed of. If you decide you want any of these stubs to not be automatically disposed, you can call `dup()` on the stub before the end of the scope that the `using` declaration is in, and then remember to explicitly dispose those stubs later.


## Disposers and `RpcTarget` classes

A class that extends [`RpcTarget`](/workers/runtime-apis/rpc/compatible-types) can also implement a disposer:

```js
class Foo extends RpcTarget {
  [Symbol.dispose]() {
    // ...
  }
}
```

Disposers always run asynchronously. The RpcTarget's disposer runs some time after the last stub is disposed. This is especially true because the dispose message needs to cross the network, but is true even in the case that the stub happens to point to a local object. Exceptions thrown by the disposer will be reported as uncaught exceptions.

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

## Proxying and forwarding stubs

A stub received over RPC from one Worker can be forwarded over RPC to another Worker.

```js
---
filename: introducer.js
---
using counter = env.COUNTER_SERVICE.getCounter();
await env.ANOTHER_SERVICE.useCounter(counter);
```

Here, three different workers are involved:

1. The calling Worker (we'll call this the "introducer")
2. `COUNTER_SERVICE`
3. `ANOTHER_SERVICE`

When `ANOTHER_SERVICE` calls a method on the `counter` that is passed to it, this call will automatically be proxied through the introducer and on to the [`RpcTarget`](/workers/runtime-apis/rpc/compatible-types) class implemented by `COUNTER_SERVICE`.

In this way, the introducer Worker can connect two Workers that did not otherwise have any ability to form direct connections to each other.

Currently, this proxying only lasts until the end of the Workers' execution contexts. A proxy connection cannot be persisted for later use.

## The `dup()` method

Sometimes, you need to pass a stub to a function which will dispose the stub when it is done, but you also want to keep the stub for later use. To solve this problem, you can "dup" the stub:

```js
let stub = await env.SOME_SERVICE.getThing();

// Create a duplicate.
let stub2 = stub.dup();

// Call some function that will dispose the stub.
await func(stub);

// stub2 is still valid
```

You can think of `dup()` like the [Unix system call of the same name](https://man7.org/linux/man-pages/man2/dup.2.html): it creates a new handle pointing at the same target, which must be independently closed (disposed).

If the instance of the [`RpcTarget` class](/workers/runtime-apis/rpc/compatible-types) that the stubs point to has a disposer, the disposer will only be invoked when all duplicates have been disposed. However, this only applies to duplicates that originate from the same stub. If the same instance of `RpcTarget` is passed over RPC multiple times, a new stub is created each time, and these are not considered duplicates of each other. Thus, the disposer will be invoked once for each time the `RpcTarget` was sent.

In order to avoid this situation, you can manually create a stub locally, and then pass the stub across RPC multiple times. When passing a stub over RPC, ownership of the stub transfers to the recipient, so you must make a `dup()` for each time you send it:\

```js
import { RpcTarget, RpcStub } from "cloudflare:workers";

class Foo extends RpcTarget {
  // ...
}

let obj = new Foo();
let stub = new RpcStub(obj);
await rpc1(stub.dup());  // sends a dup of `stub`
await rpc2(stub.dup());  // sends another dup of `stub`
stub[Symbol.dispose]();  // disposes the original stub

// obj's disposer will be called when the other two stubs
// are disposed remotely.
```
