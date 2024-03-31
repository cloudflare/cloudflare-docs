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

A new instance of the class `WorkerB` is created every time the Worker is called. Note that even though the Worker is implemented as a class, it is still stateless — the class instance only lasts for the duration of the invocation. If you need to persist or coordinate state in Workers, you should use [Durable Objects](/durable-objects).

### Bindings (`env`)

The [`env`](/workers/runtime-apis/bindings/#what-is-a-binding) object is exposed as a class property of the `WorkerEntrypoint` class.

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

### Lifecycle methods (`ctx`)

The [`ctx`](/workers/runtime-apis/context) object is exposed as a class property of the `WorkerEntrypoint` class.

You can extend the lifetime of the invocation context by calling the `waitUntil()` method of the context object, [`ctx`](/workers/runtime-apis/context/#waituntil). `waitUntil()` accepts a Promise-based task that is executed before the invocation context is terminated.

Use this when you want to perform other work without blocking giving a response to the client Worker that called your Entrypoint Worker. For example, you might return a response immediately, but fire off an event to an analytics provider:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class MyWorker extends WorkerEntrypoint {
  async signup(email, name) {
    // sendEvent() will continue running, even after this method returns a value to the caller
    this.ctx.waitUntil(this.#sendEvent("signup", email))
    // Perform any other work
    return "Success";
  }

  async #sendEvent(eventName, email) {
    // Send event by making a subrequest with fetch()
  }
}
```

{{<Aside type="note">}}
[Cloudflare Queues](/queues/) and [Tail Workers](/workers/observability/logging/tail-workers/) are purpose-built options for performing work out-of-band, without blocking returning a response back to the client Worker. In many cases, you can use them instead of `ctx.waitUntil()`.
{{</Aside>}}

## Reserved methods

### `fetch()`

The `fetch()` method of the `WorkerEntrypoint` class is treated specially — it can only be used to handle an HTTP request — equivalent to the [fetch handler](/workers/runtime-apis/handlers/fetch/).

You may implement a `fetch()` method in your class that extends `WorkerEntrypoint` — but it must accept only one parameter of type [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), and must return an instance of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

The caller may pass one or two parameters to `fetch()`. If the caller does not simply pass a single Request object, then a new Request is implicitly constructed, passing the parameters to its constructor, and that request is what is actually sent to the server.

Some properties of Request control the behavior of fetch() on the client side and are not actually sent to the server. For example, the property `redirect: "auto"` (which is the default) instructs `fetch()` that if the server returns a redirect response, it should automatically be followed, resulting in an HTTP request to the public internet. The point is, fetch() makes an HTTP request according to the Fetch API standard.

### `connect()`

The `connect()` method of the `WorkerEntrypoint` class is reserved for opening a socket-like connection to your Worker. This is currently not implemented or supported — though you can [open a TCP socket from a Worker](/workers/runtime-apis/tcp-sockets/) or connect directly to databases over a TCP socket with [Hyperdrive](/hyperdrive/get-started/).