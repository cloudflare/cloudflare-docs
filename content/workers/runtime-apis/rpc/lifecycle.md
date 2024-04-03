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

Assume that `findUser()` on the server side returns an object extending `RpcTarget`, thus `user` on the client side ends up being a stub pointing to that remote object.

As long as the stub still exists on the client, the corresponding object on the server cannot be garbage collected. But, each isolate has its own garbage collector which cannot see into other isolates. So, in order for the server's isolate to know that the object can be collected, the calling isolate must send it an explicit signal saying so, called "disposing" the stub.

In many cases (described below), the system will automatically realize when a stub is no longer needed, and will dispose it automatically. However, for best performance, your code should dispose stubs explicitly when it is done with them.

## Explicit Resource Management

To ensure resources are properly disposed of, you should use [Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management), a new JavaScript language feature that allows you to explicitly signal when resources can be disposed of. Explicit Resource Management is a Stage 3 TC39 proposal — it is [coming to V8 soon](https://bugs.chromium.org/p/v8/issues/detail?id=13559).

Explicit Resource Management adds the following language features:

- The [`using` declaration](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file#using-declarations)
- [`Symbol.dispose` and `Symbol.asyncDispose`](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file#additions-to-symbol)

If a variable is declared with `using`, when the variable is no longer in scope, the variable's disposer will be invoked. For example:

```js
function sendEmail(id, message) {
  using user = await env.USER_SERVICE.findUser(id);
  await user.sendEmail(message);

  // user[Symbol.dispose]() is implicitly called at the end of the scope.
}
```

`using` declarations are useful to make sure you can't forget to dispose stubs — even if your code is interrupted by an exception.

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

### End of event handler / execution context

When an event handler is "done", any stubs created as part of the event are automatically disposed.

For example, consider a [`fetch()` handler](/workers/runtime-apis/handlers/fetch) which handles incoming HTTP events. The handler may make outgoing RPCs as part of handling the event, and those may return stubs. When the final HTTP response is sent, the handler is "done", and all stubs are immediately disposed.

More precisely, the event has an "execution context", which begins when the handler is first invoked, and ends when the HTTP response is sent. The execution context may also end early if the client disconnects before receiving a response, or it can be extended past its normal end point by calling [`ctx.waitUntil()`](/workers/runtime-apis/context).

For example, the Worker below does not make use of the `using` declaration, but stubs will be disposed of once the `fetch()` handler returns a response:

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

A Worker invoked via RPC also has an execution context. The context begins when an RPC method on a `WorkerEntrypoint` is invoked. If no stubs are passed in the parameters or results of this RPC, the context ends (the event is "done") when the RPC returns. However, if any stubs are passed, then the execution context is implicitly extended until all such stubs are disposed (and all calls made through them have returned). As with HTTP, if the client disconnects, the server's execution context is canceled immediately, regardless of whether stubs still exist. A client that is itself another Worker is considered to have disconnected when its own execution context ends. Again, the context can be extended with [`ctx.waitUntil()`](/workers/runtime-apis/context).

### Stubs received as parameters in an RPC call

When stubs are received in the parameters of an RPC, those stubs are automatically disposed when the call returns. If you wish to keep the stubs longer than that, you must call the `dup()` method on them.

### Disposing RPC objects disposes stubs that are part of that object

When an RPC returns any kind of object, that object will have a disposer added by the system. Disposing it will dispose all stubs returned by the call. For instance, if an RPC returns an array of four stubs, the array itself will have a disposer that disposes all four stubs. The only time the value returned by an RPC does not have a disposer is when it is a primitive value, such as a number or string. These types cannot have disposers added to them, but because these types cannot themselves contain stubs, there is no need for a disposer in this case.

This means you should almost always store the result of an RPC into a `using` declaration:

```js
using result = stub.foo();
```

This way, if the result contains any stubs, they will be disposed of. Even if you don't expect the RPC to return stubs, if it returns any kind of an object, it is a good idea to store it into a `using` declaration. This way, if the RPC is extended in the future to return stubs, your code is ready.

If you decide you want to keep a returned stub beyond the scope of the `using` declaration, you can call `dup()` on the stub before the end of the scope. (Remember to explicitly dispose the duplicate later.)

## Disposers and `RpcTarget` classes

A class that extends [`RpcTarget`](/workers/runtime-apis/rpc/compatible-types) can optionally implement a disposer:

```js
class Foo extends RpcTarget {
  [Symbol.dispose]() {
    // ...
  }
}
```

The RpcTarget's disposer runs after the last stub is disposed. Note that the client-side call to the stub's disposer does not wait for the server-side disposer to be called; the server's disposer is called later on. Because of this, any exceptions thrown by the disposer do not propagate to the client; instead, they are reported as uncaught exceptions. Note that an `RpcTarget`'s disposer must be declared as `Symbol.dispose`. `Symbol.asyncDispose` is not supported.

## Promise pipelining

When you call an RPC method and get back an object, it's common to immediately call a method on the object:

```js
// Two round trips.
using counter = await env.COUNTER_SERVICE.getCounter();
await counter.increment();
```

But consider the case where the Worker service that you are calling may be far away across the network, as in the case of [Smart Placement](/workers/runtime-apis/bindings/service-bindings/#smart-placement) or [Durable Objects](/durable-objects). The code above makes two round trips, once when calling `getCounter()`, and again when calling `.increment()`. We'd like to avoid this.

With most RPC systems, the only way to avoid the problem would be to combine the two calls into a single "batch" call, perhaps called `getCounterAndIncrement()`. However, this makes the interface worse. You wouldn't design a local interface this way.

Workers RPC allows a different approach: You can simply elide the first `await`:

```js
// Only one round trip! Note the missing `await`.
using promiseForCounter = env.COUNTER_SERVICE.getCounter();
await promiseForCounter.increment();
```

In this code, `getCounter()` returns a promise for a counter. Normally, the only thing you would do with a promise is `await` it. However, Workers RPC promises are special: they also allow you to initiate speculative calls on the future result of the promise. These calls are sent to the server immediately, without waiting for the initial call to complete. Thus, multiple chained calls can be completed in a single round trip.

How does this work? The promise returned by an RPC is not a real JavaScript `Promise`. Instead, it is a custom ["Thenable"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables). It has a `.then()` method like `Promise`, which allows it to be used in all the places where you'd use a normal `Promise`. For instance, you can `await` it. But, in addition to that, an RPC promise also acts like a stub. Calling any method name on the promise forms a speculative call on the promise's eventual result. This is known as "promise pipelining".

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

If the initial RPC ends up throwing an exception, then any pipelined calls will also fail with the same exception

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
