---
pcx_content_type: configuration
title: RPC
meta:
  title: Service bindings - RPC
  description: Facilitate Worker-to-Worker communication via RPC
---

<!-- TODO: Naming?? -->
# Service Bindings — RPC

[Service bindings](/workers/runtime-apis/bindings/service-bindings) allow one Worker to call into another, without going through a publicly-accessible URL.

You can use Service bindings to create your own internal APIs that your Worker makes available to other Workers. This is done by extending the built-in `WorkerEntrypoint` class, and adding your own public methods. These public methods can then be directly called by other Workers on your Cloudflare account that declare a [binding](/workers/runtime-apis/bindings) to this Worker.

The RPC system is designed feel as similar as possible to calling a JavaScript function in the same Worker. In most cases, you should be able to write code in the same way you would if everything was in a single Worker.

{{<Aside type="note">}}
You can also use RPC to communicate between Workers and [Durable Objects](/durable-objects/).
{{</Aside>}}

## Example

For example, the following Worker implements the public method `add(a, b)`:

```toml
---
filename: wrangler.toml
---
name = "worker_b"
main = "./src/workerB.js"
```

```js
---
filename: workerB.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export class WorkerB extends WorkerEntrypoint {
  async add(a, b) { return a + b; }
}
```

Which the following Worker declares a binding to:

```toml
---
filename: wrangler.toml
---
name = "worker_a"
main = "./src/workerA.js"
services = [
  { binding = "WORKER_B", service = "worker_b" }
]
```

And then calls as an async method:

```js
---
filename: workerA.js
---
export default {
  async fetch(request, env) {
    const result = await env.WORKER_B.add(1, 2);
    return new Response(result);
  }
}
```

This provides you with a [RPC (Remote Procedure Call)](https://en.wikipedia.org/wiki/Remote_procedure_call) interface, but without the need to learn, implement, or think about special protocols. The client, in this case Worker A, calls Worker B and tells it to execute a specific procedure using specific arguments that the client provides. This is accomplished with simple JavaScript classes.

## `WorkerEntrypoint`

When you write Workers that expose RPC methods, you must extend the `WorkerEntrypoint` class, as in the example below:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class MyWorker extends WorkerEntrypoint {
  async add(a, b) { return a + b; }
}
```

A new instance of the class `WorkerB` is created every time the Worker is called. Note that even though the Worker is implemented as a class, it is still stateless. The class instance is destroyed when the invocation of the Worker ends. If you need to persist or coordinate state in Workers, you should use [Durable Objects](/durable-objects).

### Bindings (`env`)

The [`env`](/workers/runtime-apis/bindings/#what-is-a-binding) object is exposed as a class property of the `Work
erEntrypoint` class.

For example, a Worker that declares a binding to the [environment variable](/workers/configuration/environment-variables/) `GREETING`:

```toml
---
filename: wrangler.toml
---
name = "my-worker"

[vars]
GREETING = "Hello"
```

Can access it by calling `this.env.GREETING`:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class MyWorker extends WorkerEntrypoint {
  async greet(name) {
    return this.env.GREETING + name;
  }
}
```

You can use any type of [binding](/workers/runtime-apis/bindings/#what-is-a-binding) this way.

#### Lifecycle methods (`ctx`)

The [`ctx`](/workers/runtime-apis/handlers/fetch/#lifecycle-methods) object is exposed as a class property of the `WorkerEntrypoint` class.

You can extend the lifetime of the invocation context by calling the `waitUntil()` method of the context object, [`ctx`](/workers/runtime-apis/handlers/fetch/#contextwaituntil). `waitUntil()` accepts a Promise-based task that is executed before the invocation context is terminated.

Use this when you want to perform other work without blocking giving a response to the client Worker that called your Entrypoint Worker. For example, you might return a response immediately, but fire off an event to an analytics provider:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class MyWorker extends WorkerEntrypoint {
  async signup(email, name) {
    // sendEvent() will continue running, even after this method returns a value to the caller
    this.ctx.waitUntil(sendEvent("signup", email))
    // Perform any other work
    return "Success";
  }

  private async sendEvent(eventName, email) {
    // Send event by making a subrequest with fetch()
  }
}
```

{{<Aside type="note">}}
[Cloudflare Queues](/queues/) and [Tail Workers](/workers/observability/logging/tail-workers/) are purpose-built options for performing work out-of-band, without blocking returning a response back to the client Worker. In many cases, you can use them instead of `ctx.waitUntil()`.
{{</Aside>}}

## Compatible Types

### Basic types

Any type that is [Structured Cloneable](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types) can be used as a parameter or return value of an RPC method. This includes most basic "value" types in JavaScript, including objects, arrays, strings and numbers.

You can also send and receive functions, class instances, ReadableStream, WriteableStream, Request and Response objects.

### Functions

#### Return functions from RPC methods

RPC methods can return functions. In the example below, `newCounter()` returns a function:

```js
---
filename: counterService.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export class CounterService extends WorkerEntrypoint {
  async newCounter() {
    let value = 0;
    return (increment = 0) => {
      value += increment;
      return value;
    }
  }
}
```

This function can then be called by the client Worker:

```toml
---
filename: wrangler.toml
---
name = "client_worker"
main = "./src/clientWorker.js"
services = [
  { binding = "COUNTER_SERVICE", service = "counter-service" }
]
```

```js
---
filename: clientWorker.js
---
export default {
  async fetch(request, env) {
    using f = await env.COUNTER_SERVICE.newCounter();
    await f(2);   // returns 2
    await f(1);   // returns 3
    const count = await f(-5);  // returns -2

    return new Response(count);
  }
}
```

Notice how the function keeps its state. The function is a closure that has captured the local variable value.

How does this work? The Workers runtime does not serialize the function itself. The function always runs as part of the Worker that defines `CounterService`, regardless of who called it.

Under the hood, the caller is not really calling the function itself, but calling a what is called a "stub". A "stub" is a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object that allows the client to call the remote service as if it were local, running in the same Worker. Behind the scenes, it calls back to the Worker that implements `CounterService` and asks it to execute the function closure that had been returned earlier.

Note that:

- Communication over Service bindings is always asyncrhonous. Even if the method declared on `CounterService` is not async, the client must call it as an async method.
- Only [compatible types](#compatible-types) can be passed as parameters or returned from the function.

#### Send functions as parameters of RPC methods

You can also send a function in the parameters of an RPC. This enables the "server" to call back to the "client", reversing the direction of the relationship.

Because of this, the words "client" and "server" can be ambiguous when talking about RPC. The "server" is a Durable Object or WorkerEntrypoint, and the "client" is the Worker that invoked the server via a binding. But, RPCs can flow both ways between the two. When talking about an individual RPC, you should instead use the words "caller" and "callee".

#### Return objects with methods

You can return objects from RPC methods that have methods that can be called by the client Worker. This allows you to provide the caller with a remote object that it can perform work with, and provide interfaces that are simple to work with, like [Durable Objects](/durable-objects), even if your state lives elsewhere, outside of Cloudflare.

Consider the following example:

```js
---
filename: company.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export class Company extends WorkerEntrypoint {
  async getCompanyByName(id) {
    // TODO: Maybe show example here that doesn't use D1 — to illustrate point about
    // how to use this to provide an SDK-like interface for remote state that is outside of DO/D1/etc..
    this.id = id;
    const stmt = this.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?!").bind(id);
    const values = await stmt.first();
    return {
      ...values,
      sendEmail: () => {
        //...
      }
  }
}
```

And then calls as an async method:

```js
---
filename: clientWorker.js
---
export default {
  async fetch(request, env) {
    const company = await env.COMPANY.getCompanyByName(name);
    await company.sendEmail();
    return new Response("Email sent!");
  }
}
```

### Class Instances

Objects which are instances of user-defined classes, with custom prototypes, can only be used as a parameter or return value of an RPC method if they extend the built-in `RpcTarget` class. Attempting to send a class instance that does not extend `RpcTarget` will throw an exception.

Consider the following example:

```toml
---
filename: wrangler.toml
---
name = "counter"
main = "./src/counter.js"
```

```js
---
filename: counter.js
---
import { WorkerEntrypoint, RpcTarget } from "cloudflare:workers";

class Counter extends RpcTarget {
  #value = 0;

  increment(amount) {
    this.#value += amount;
    return this.#value;
  }

  get value() {
    return this.#value;
  }
}

export class CounterService extends WorkerEntrypoint {
  async newCounter() {
    return new Counter();
  }
}
```

The method `increment` can be called directly by the client, as can the public property `value`:

```toml
---
filename: wrangler.toml
---
name = "client-worker"
main = "./src/clientWorker.js"
services = [
  { binding = "COUNTER_SERVICE", service = "counter" }
]
```

```js
---
filename: clientWorker.js
---
export default {
  async fetch(request, env) {
    using counter = await env.COUNTER_SERVICE.newCounter();

    await counter.increment(2);   // returns 2
    await counter.increment(1);   // returns 3
    await counter.increment(-5);  // returns -2

    const count = await counter.value;  // returns -2

    return new Response(count);
  }
}
```

Classes extending RpcTarget work a lot like functions: the object itself is not serialized, but is instead replaced by a stub. In this case, the stub itself is not callable, but its methods are. Calling any method on the stub actually makes an RPC back to the original object, where it was created.

As shown above, you can also access properties of classes. Properties are sort of like RPC methods that don't take any arguments. You can simply await a property to asynchronously fetch its current value. Note that the act of awaiting the property (which, behind the scenes, calls .then() on it) is what initiates the property fetch; if you don't await it, it won't be fetched.

Returning a class instance may be compared against returning an object containing several functions. Both ways can be used to create similar interfaces from the caller's point of view. However, if you return an object containing, say, five functions, then you are creating five stubs. If you return a class instance, where the class declares five methods, you are only returning a single stub. Returning a single stub is often more efficient and easier to reason about. Additionally, when returning an object, non-function properties of the object will be transmitted at the time the object itself is transmitted; they cannot be fetched asynchronously on-demand.


### ReadableStream, WriteableStream, Request, Response

You can send and receive [`ReadableStream`](/workers/runtime-apis/streams/readablestream/), [`WriteableStream`](/workers/runtime-apis/streams/writablestream/), [`Request`](/workers/runtime-apis/request/), and [`Response`](/workers/runtime-apis/response/) using RPC methods. When doing so, bytes in the body are automatically streamed with appropriate flow control.

Only byte-oriented streams are supported. TODO — explain clearly.

In all cases, ownership of the stream is transferred to the recipient. The sender can no longer read/write the stream after sending it. If the sender wishes to keep its own copy, it can use the [`tee()` method of `ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee) or the [`clone()` method of `Request` or `Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone). Keep in mind that doing this may force the system to buffer bytes and lose the benefits of flow control.

## Promise pipelining
<!-- TODO: Better heading title? -->

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

## Visibility of Methods and Properties

### Private properties

[Private properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties) of classes that extend either `WorkerEntrypoint` or `RpcTarget` are not exposed to the caller, and cannot be called.

#### Class instance properties

When you send an instance of a class that extends `WorkerEntrypoint` or `RpcTarget`, the recipient can only access methods and properties declared on the class, not properties of the instance. For example:

```js
class Foo extends RpcTarget {
  constructor() {
    super();

    // i CANNOT be accessed over RPC
    this.i = 0;

    // funcProp CANNOT be called over RPC
    this.funcProp = () => {}
  }

  // value CAN be accessed over RPC
  get value() {
    return this.i;
  }

  // method CAN be called over RPC
  method() {}
}
```

This behavior is intentional —  it is intended to protect you from accidentally exposing private class internals. Generally, instance properties should be declared private, [by prefixing them with `#`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties). However, private properties are a relatively new feature of JavaScript, and are not consistently used.

The RPC interface between two of your Workers may be a security boundary, we need to be extra-careful, so instance properties are always private when communicating between Workers using RPC, whether or not they have the `#` prefix. You can always declare an explicit getter at the class level if you wish to expose the property, as shown above.

These visibility rules apply only to objects that extend `RpcTarget`, `WorkerEntrypoint`, or `DurableObject`, and do not apply to plain objects. Plain objects are passed "by value", sending all of their "own" properties.

#### "Own" properties of functions

When you pass a function over RPC, the caller can access the "own" properties of the function object itself.

```js
someRpcMethod() {
  let func = () => {};
  func.prop = 123;  // `prop` is visible over RPC
  return func;
}
```

Such properties on a function are accessed asynchronously, like class properties of an RpcTarget. But, unlike the `RpcTarget` example above, the function's instance properties that are accessible to the caller. In practice, properties are rarely added to functions.



## Reserved methods

### `fetch()`

The `fetch()` method of the `WorkerEntrypoint` class is treated specially — it can only be used to handle an HTTP request — equivalent to the [fetch handler](/workers/runtime-apis/handlers/fetch/).

You may implement a `fetch()` method in your class that extends `WorkerEntrypoint` — but it must accept only one parameter of type [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), and must return an instance of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

The caller may pass one or two parameters to `fetch()`. If the caller does not simply pass a single Request object, then a new Request is implicitly constructed, passing the parameters to its constructor, and that request is what is actually sent to the server.

Some properties of Request control the behavior of fetch() on the client side and are not actually sent to the server. For example, the property `redirect: "auto"` (which is the default) instructs `fetch()` that if the server returns a redirect response, it should automatically be followed, resulting in an HTTP request to the public internet. The point is, fetch() makes an HTTP request according to the Fetch API standard.

### `connect()`

The `connect()` method of the `WorkerEntrypoint` class is reserved for opening a socket-like connection to your Worker. This is currently not implemented or supported — though you can [open a TCP socket from a Worker](/workers/runtime-apis/tcp-sockets/) or connect directly to databases over a TCP socket with [Hyperdrive](/hyperdrive/get-started/).

## TypeScript

## Error handling & stacktraces

## Security Model

The Workers RPC system is intended to allow safe communications between Workers that do not trust each other. The system does not allow either side of an RPC session to access arbitrary objects on the other side, much less invoke arbitrary code. Instead, each side can only invoke the objects and functions for which they have explicitly received stubs via previous calls.

This security model is commonly known as Object Capabilities, or Capability-Based Security. Workers RPC is built on [Cap'n Proto RPC](https://capnproto.org/rpc.html), which in turn is based on CapTP, the object transport protocol used by the [distributed programming language E](https://www.crockford.com/ec/etut.html).