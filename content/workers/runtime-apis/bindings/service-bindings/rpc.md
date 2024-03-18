---
pcx_content_type: configuration
title: Service bindings
meta:
  title: Service bindings - Runtime APIs
  description: Facilitate Worker-to-Worker communication via RPC
---

# Service Bindings — RPC

[Service bindings](/workers/runtime-apis/bindings/service-bindings) allow one Worker to call into another, without going through a publicly-accessible URL.

You can use Service bindings to create your own internal APIs that your Worker makes available to other Workers. This is done by extending the built-in `WorkerEntrypoint` class, and adding your own public methods. These public methods can then be directly called by other Workers on your Cloudflare account that declare a [binding](/workers/runtime-apis/bindings) to this Worker.

The RPC system is designed feel as similar as possible to calling a JavaScript function in the same Worker. In most cases, you should be able to write code in the same way you would if everything was in a single Worker.

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

## Worker Entrypoints (`WorkerEntrypoint`)

When you write Workers that expose RPC methods, you must extend the `WorkerEntrypoint` class, as in the example below:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class MyWorker extends WorkerEntrypoint {
  async add(a, b) { return a + b; }
}
```

A new instance of the class `WorkerB` is created every time the Worker is called. Note that even though the Worker is implemented as a class, it is still stateless. The class instance is destroyed when the invocation of the Worker ends. If you need to persist or coordinate state in Workers, you should use [Durable Objects](/durable-objects).

### Bindings and lifecycle methods

The [`env`](/workers/runtime-apis/bindings/#what-is-a-binding) and [`ctx`](/workers/runtime-apis/handlers/fetch/#lifecycle-methods) objects are made available as properties of the `WorkerEntrypoint` class.

#### `env`

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

#### `ctx`

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

You can also send functions, class instances, ReadableStream, WriteableStream, Request and Response objects.

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
    await f(-5);  // returns -2

    // ...
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

## Remote objects

Objects that Worker A receives back from Worker B can expose methods. These methods can be called from within Worker A. Consider the following example:

```js
---
filename: workerB.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export class WorkerB extends WorkerEntrypoint {
  async foo() {
    return {
      bar: () => Math.random(),
  }
}
```

And then calls as an async method:

```js
---
filename: workerA.js
---
export default {
  async fetch(request, env) {
    const foo = await env.WORKER_B.foo();
    const bar = await foo.bar();
    return new Response(bar);
  }
}
```

### TypeScript


### Sending Class Instances

There is one exception to the above — objects which are instances of user-defined classes, with custom prototypes are not compatible, unless they extend the `RpcTarget` class. Attempting to send a class instance will throw an exception.



#### Durable Objects

You can also expose methods on [Durable Objects](/durable-objects/) that can be called remotely on any of your Workers that declare a binding to the Durable Object namespace. Refer to <TODO> docs for more.



#### Error handling & stacktraces


<TODO>