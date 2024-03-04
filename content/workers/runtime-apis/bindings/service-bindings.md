---
pcx_content_type: configuration
title: Service bindings
meta:
  title: Service bindings - Runtime APIs
  description: Facilitate Worker-to-Worker communication.
---

# Service bindings

## About Service bindings

[Service bindings](/workers/runtime-apis/bindings/service-bindings/) facilitate Worker-to-Worker communication. A Service binding allows Worker A to call a method on Worker B, or to forward a request from Worker A to Worker B.

Service bindings provide the separation of concerns that microservice or service-oriented architectures provide, without configuration pain, performance overhead or need to learn RPC protocols.

- **Service bindings are fast.** When you use Service Bindings, communication between two Workers stays within Cloudflare. When one Worker invokes another, there is no network delay and the request is executed immediately.
- **Service bindings are not just HTTP.** Worker A can expose methods that can be directly called by Worker B. Communicating between services only requires writing JavaScript methods and classes.

![Service bindings are a zero-cost abstraction](/images/workers/platform/bindings/service-bindings-comparison.png)

Service bindings are commonly used to:

- **Provide a shared internal service to multiple Workers.** For example, you can deploy an authentication service as its own Worker, and then have any number of separate Workers communicate with it via Service bindings.
- **Isolate services from the public Internet.** You can deploy a Worker that is not reachable via the public Internet, and can only be reached via an explicit Service binding that another Worker declares.
- **Allow teams to deploy code independently.** Team A can deploy their Worker on their own release schedule, and Team B can deploy their Worker separately.

## Configuration

You add a Service binding by modifying the `wrangler.toml` of the caller — the Worker that you want to be able to initiate requests.

For example, if you want Worker A to be able to call Worker B — you'd add the following to the `wrangler.toml` for Worker A:
```toml
---
filename: wrangler.toml
---
services = [
  { binding = "<BINDING_NAME>", service = "<WORKER_NAME>" }
]
```

* `binding`: The name of the key you want to expose on the `env` object.
* `service`: The name of the target Worker you would like to communicate with. This Worker must be on your Cloudflare account.

## Interfaces

Worker A that declares a Service binding to Worker B can call Worker B in two different ways:

- *RPC* By calling any public method on the class that Worker B exports (`await env.BINDING_NAME.myMethod(arg1)`)
- *HTTP* By calling the `fetch()` method on the binding (`env.BINDING_NAME.fetch(request)`)

### RPC (`WorkerEntrypoint`)

If you write your Worker as a JavaScript class that extends the built-in `WorkerEntrypoint` class, public methods on the class you export are exposed via Service Bindings and can be called.

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

This is a remote procedure call (RPC) protocol, without having to think about the protocol. The client, in this case Worker A, calls Worker B and tells it to execute a specific procedure using specific arguments that the client provides. But with Service bindings, there is no need to learn, implement or interact with a specific RPC protocol. It's just JavaScript.

#### Remote objects

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

#### Durable Objects

You can also expose methods on [Durable Objects](/durable-objects/) that can be called remotely on any of your Workers that declare a binding to the Durable Object namespace. Refer to <TODO> docs for more.

#### Error handling & stacktraces

<TODO>

### HTTP (`fetch()`)

Worker A that declares a Service binding to Worker B can forward a [`Request`](/workers/runtime-apis/request/) object to Worker B, by calling the `fetch()` method that is exposed on the binding object.

For example, consider the following Worker that implements a [`fetch()` handler](/workers/runtime-apis/handlers/fetch/):

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
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  }
}
```

The following Worker declares a binding to the Worker above:

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

And then forwards a request to:

```js
---
filename: workerA.js
---
export default {
	async fetch(request, env) {
		return await env.BINDING_NAME.fetch(request);
	},
};
```

## Lifecycle

The Service bindings API is asynchronous — you must `await` any method you call. If Worker A invokes Worker B via a Service binding, and Worker A does not await the completion of Worker B, Worker B will be terminated early.

## Local development

Local development is supported for Service bindings. For each Worker, open a new terminal and use [`wrangler dev`](/workers/wrangler/commands/#dev) in the relevant directory or use the `SCRIPT` option to specify the relevant Worker's entrypoint.
## Smart Placement

[Smart Placement](/workers/configuration/smart-placement) automatically places your Worker in an optimal location that minimizes latency.

You can use Smart Placement together with Service bindings to split your Worker into two services:

![Smart Placement and Service Bindings](/images/workers/platform/smart-placement-service-bindings.png)

Refer to the [docs on Smart Placement](/workers/configuration/smart-placement/#best-practices) for more.

## Limits

Service bindings have the following limits:

* Each request to a Worker via a Service binding counts toward your [subrequest limit](/workers/platform/limits/#subrequests).
* A single request has a maximum of 32 Worker invocations, and each call to a Service binding counts towards this limit. Subsequent calls will throw an exception.
* Calling a service binding does not count towards [simultaneous open connection limits](/workers/platform/limits/#simultaneous-open-connections)
