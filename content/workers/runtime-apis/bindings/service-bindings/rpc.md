---
pcx_content_type: configuration
title: RPC (WorkerEntrypoint)
meta:
  title: Service bindings - RPC (WorkerEntrypoint)
  description: Facilitate Worker-to-Worker communication via RPC
---

# Service Bindings — RPC

[Service bindings](/workers/runtime-apis/bindings/service-bindings) allow one Worker to call into another, without going through a publicly-accessible URL.

You can use Service bindings to create your own internal APIs that your Worker makes available to other Workers. This is done by extending the built-in `WorkerEntrypoint` class, and adding your own public methods. These public methods can then be directly called by other Workers on your Cloudflare account that declare a [binding](/workers/runtime-apis/bindings) to this Worker.

The [RPC system in Workers](/workers/runtime-apis/rpc) is designed feel as similar as possible to calling a JavaScript function in the same Worker. In most cases, you should be able to write code in the same way you would if everything was in a single Worker.

{{<Aside type="note">}}
You can also use RPC to communicate between Workers and [Durable Objects](/durable-objects/).
{{</Aside>}}

## Example

For example, the following Worker implements the public method `add(a, b)`:

{{<render file="_service-binding-rpc-example.md" productFolder="workers">}}

You do not need to learn, implement, or think about special protocols to use the RPC system. The client, in this case Worker A, calls Worker B and tells it to execute a specific procedure using specific arguments that the client provides. This is accomplished with standard JavaScript classes.

## `WorkerEntrypoint`

To provide RPC methods from your Worker, you must extend the `WorkerEntrypoint` class, as shown in the example below:

```js
---
filename: index.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export class MyWorker extends WorkerEntrypoint {
  async add(a, b) { return a + b; }
}
```

A new instance of the class `MyWorker` is created every time the Worker is called. Note that even though the Worker is implemented as a class, it is still stateless — the class instance only lasts for the duration of the invocation. If you need to persist or coordinate state in Workers, you should use [Durable Objects](/durable-objects).

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

## Further reading

{{<directory-listing folderDirectory="/workers/runtime-apis/rpc/" >}}