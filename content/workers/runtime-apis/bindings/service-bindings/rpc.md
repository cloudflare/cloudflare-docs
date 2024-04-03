---
pcx_content_type: configuration
title: RPC (WorkerEntrypoint)
meta:
  title: Service bindings - RPC (WorkerEntrypoint)
  description: Facilitate Worker-to-Worker communication via RPC.
---

# Service Bindings — RPC

[Service bindings](/workers/runtime-apis/bindings/service-bindings) allow one Worker to call into another, without going through a publicly-accessible URL.

You can use Service bindings to create your own internal APIs that your Worker makes available to other Workers. This can be done by extending the built-in `WorkerEntrypoint` class, and adding your own public methods. These public methods can then be directly called by other Workers on your Cloudflare account that declare a [binding](/workers/runtime-apis/bindings) to this Worker.

The [RPC system in Workers](/workers/runtime-apis/rpc) is designed feel as similar as possible to calling a JavaScript function in the same Worker. In most cases, you should be able to write code in the same way you would if everything was in a single Worker.

{{<Aside type="note">}}
You can also use RPC to communicate between Workers and [Durable Objects](/durable-objects/best-practices/create-durable-object-stubs/#rpc-methods).
{{</Aside>}}

## Example

For example, the following Worker implements the public method `add(a, b)`:

{{<render file="_service-binding-rpc-example.md" productFolder="workers">}}

You do not need to learn, implement, or think about special protocols to use the RPC system. The client, in this case Worker A, calls Worker B and tells it to execute a specific procedure using specific arguments that the client provides. This is accomplished with standard JavaScript classes.

## The `WorkerEntrypoint` Class

To provide RPC methods from your Worker, you must extend the `WorkerEntrypoint` class, as shown in the example below:

```js
---
filename: index.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
  async add(a, b) { return a + b; }
}
```

A new instance of the class is created every time the Worker is called. Note that even though the Worker is implemented as a class, it is still stateless — the class instance only lasts for the duration of the invocation. If you need to persist or coordinate state in Workers, you should use [Durable Objects](/durable-objects).

### Bindings (`env`)

The [`env`](/workers/runtime-apis/bindings) object is exposed as a class property of the `WorkerEntrypoint` class.

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

export default class extends WorkerEntrypoint {
  fetch() { return new Response("Hello from my-worker"); }
  
  async greet(name) {
    return this.env.GREETING + name;
  }
}
```

You can use any type of [binding](/workers/runtime-apis/bindings) this way.

### Lifecycle methods (`ctx`)

The [`ctx`](/workers/runtime-apis/context) object is exposed as a class property of the `WorkerEntrypoint` class.

For example, you can extend the lifetime of the invocation context by calling the `waitUntil()` method:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
  fetch() { return new Response("Hello from my-worker"); }
  
  async signup(email, name) {
    // sendEvent() will continue running, even after this method returns a value to the caller
    this.ctx.waitUntil(this.#sendEvent("signup", email))
    // Perform any other work
    return "Success";
  }

  async #sendEvent(eventName, email) {
    //...
  }
}
```

## Named entrypoints

TODO: Example

## Further reading

{{<directory-listing folderDirectory="/workers/runtime-apis/rpc/"  showDescriptions="true">}}