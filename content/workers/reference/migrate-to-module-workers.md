---
pcx_content_type: concept
title: Migrate from Service Workers to ES Modules
meta:
  description: Write your Worker code in ES modules syntax for an optimized experience.
---

# Migrate from Service Workers to ES Modules

This guide will show you how to migrate your Workers from the [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) format to the [ES modules](https://blog.cloudflare.com/workers-javascript-modules/) format.

## Advantages of migrating

There are several reasons to migrate your Workers to the ES modules format:

1.  Many products within Cloudflare's Developer Platform, such as [Durable Objects](/durable-objects/), and other features of Cloudflare Workers, require the ES modules format.
2.  Workers using ES modules format do not rely on any global bindings. This means the Workers runtime does not need to set up fresh execution contexts, making Workers safer and faster to run.
3.  Workers using ES modules format can be shared and published to `npm`. Workers using ES modules format can be imported by and composed within other Workers that use ES modules format.
4.  You can [gradually deploy changes to your Worker](/workers/configuration/versions-and-deployments/gradual-deployments/) when you use the ES modules format.

## Migrate a Worker

The following example demonstrates a Worker that redirects all incoming requests to a URL with a `301` status code.

With the Service Worker syntax, the example Worker looks like:

```js
async function handler(request) {
  const base = 'https://example.com';
  const statusCode = 301;

  const destination = new URL(request.url, base);
  return Response.redirect(destination.toString(), statusCode);
}

// Initialize Worker
addEventListener('fetch', event => {
  event.respondWith(handler(event.request));
});
```

Workers using ES modules format replace the `addEventListener` syntax with an object definition, which must be the file's default export (via `export default`). The previous example code becomes:

```js
export default {
  fetch(request) {
    const base = 'https://example.com';
    const statusCode = 301;

    const destination = new URL(request.url, base);
    return Response.redirect(destination.toString(), statusCode);
  },
};
```

## Bindings

[Bindings](/workers/configuration/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform.

Workers using ES modules format do not rely on any global bindings. However, Service Worker syntax accesses bindings on the global scope.

To understand bindings, refer the following `TODO` KV namespace binding example. To create a `TODO` KV namespace binding, you will:

1. Create a KV namespace named `My Tasks` and receive an ID that you will use in your binding.
2. Create a Worker.
3. Find your Worker's `wrangler.toml` configuration file and add a KV namespace binding:

```toml
kv_namespaces = [
  { binding = "TODO", id = "<ID>" }
]
```

In the following sections, you will use your binding in Service Worker and ES modules format.

{{<Aside type="note" header="Reference KV from Durable Objects and Workers">}}

To learn more about how to reference KV from Workers, refer to the [KV bindings documentation](/kv/reference/kv-bindings/).

{{</Aside>}}

### Bindings in Service Worker format

In Service Worker syntax, your `TODO` KV namespace binding is defined in the global scope of your Worker. Your `TODO` KV namespace binding is available to use anywhere in your Worker application's code.

```js
---
filename: index.js
---
addEventListener("fetch", async (event) => {
  return await getTodos()
});

async function getTodos() {
  // Get the value for the "to-do:123" key
  // NOTE: Relies on the TODO KV binding that maps to the "My Tasks" namespace.
  let value = await TODO.get("to-do:123");

  // Return the value, as is, for the Response
  event.respondWith(new Response(value));
}
```

### Bindings in ES modules format

In ES modules format, bindings are only available inside the `env` parameter that is provided at the entry point to your Worker.

To access the `TODO` KV namespace binding in your Worker code, the `env` parameter must be passed from the `fetch` handler in your Worker to the `getTodos` function.

```js
---
filename: index.js
---
import { getTodos } from './todos'

export default {
  async fetch(request, env, ctx) {
    // Passing the env parameter so other functions
    // can reference the bindings available in the Workers application
    return await getTodos(env)
  },
};
```

The following code represents a `getTodos` function that calls the `get` function on the `TODO` KV binding.

```js
---
filename: todos.js
---
async function getTodos(env) {
  // NOTE: Relies on the TODO KV binding which has been provided inside of 
  // the env parameter of the `getTodos` function
  let value = await env.TODO.get("to-do:123");
  return new Response(value);
}

export { getTodos }
```

## Environment variables

[Environment variables](/workers/configuration/environment-variables/) are accessed differently in code written in ES modules format versus Service Worker format.

Review the following example environment variable configuration in `wrangler.toml`:

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"

# Define top-level environment variables
# under the `[vars]` block using
# the `key = "value"` format
[vars]
API_ACCOUNT_ID = "<EXAMPLE-ACCOUNT-ID>"
```

### Environment variables in Service Worker format

In Service Worker format, the `API_ACCOUNT_ID` is defined in the global scope of your Worker application. Your `API_ACCOUNT_ID` environment variable is available to use anywhere in your Worker application's code.

```js
addEventListener("fetch", async (event) => {
  console.log(API_ACCOUNT_ID) // Logs "<EXAMPLE-ACCOUNT-ID>"
  return new Response("Hello, world!")
})
```

### Environment variables in ES modules format

In ES modules format, environment variables are only available inside the `env` parameter that is provided at the entrypoint to your Worker application.

```js
export default {
  async fetch(request, env, ctx) {
    console.log(env.API_ACCOUNT_ID) // Logs "<EXAMPLE-ACCOUNT-ID>"
    return new Response("Hello, world!")
  },
};
```

## Cron Triggers

To handle a [Cron Trigger](/workers/configuration/cron-triggers/) event in a Worker written with ES modules syntax, implement a [`scheduled()` event handler](/workers/runtime-apis/handlers/scheduled/#syntax), which is the equivalent of listening for a `scheduled` event in Service Worker syntax.

This example code:

```js
addEventListener("scheduled", (event) => {
  // ...
});
```

Then becomes:

```js
export default {
  async scheduled(event, env, ctx) {
    // ...
  },
};
```

## Access `event` or `context` data

Workers often need access to data not in the `request` object. For example, sometimes Workers use [`waitUntil`](/workers/runtime-apis/handlers/fetch/#contextwaituntil) to delay execution. Workers using ES modules format can access `waitUntil` via the `context` parameter. Refer to [ES modules parameters](/workers/runtime-apis/handlers/fetch/#parameters) for  more information.

This example code:

```js
async function triggerEvent(event) {
  // Fetch some data
  console.log('cron processed', event.scheduledTime);
}

// Initialize Worker
addEventListener('scheduled', event => {
  event.waitUntil(triggerEvent(event));
});
```

Then becomes:

```js
async function triggerEvent(event) {
  // Fetch some data
  console.log('cron processed', event.scheduledTime);
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(triggerEvent(event));
  },
};
```

## Service Worker syntax

A Worker written in Service Worker syntax consists of two parts:

1.  An event listener that listens for `FetchEvents`.
2.  An event handler that returns a [Response](/workers/runtime-apis/response/) object which is passed to the event’s `.respondWith()` method.

When a request is received on one of Cloudflare’s global network servers for a URL matching a Worker, Cloudflare's server passes the request to the Workers runtime. This dispatches a `FetchEvent` in the [isolate](/workers/reference/how-workers-works/#isolates) where the Worker is running.

```js
---
filename: ~/my-worker/index.js
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  });
}
```

Below is an example of the request response workflow:

1.  An event listener for the `FetchEvent` tells the script to listen for any request coming to your Worker. The event handler is passed the `event` object, which includes `event.request`, a [`Request`](/workers/runtime-apis/request/) object which is a representation of the HTTP request that triggered the `FetchEvent`.

2.  The call to `.respondWith()` lets the Workers runtime intercept the request in order to send back a custom response (in this example, the plain text `'Hello worker!'`).

    - The `FetchEvent` handler typically culminates in a call to the method `.respondWith()` with either a [`Response`](/workers/runtime-apis/response/) or `Promise<Response>` that determines the response.

    - The `FetchEvent` object also provides [two other methods](/workers/runtime-apis/handlers/fetch/#lifecycle-methods) to handle unexpected exceptions and operations that may complete after a response is returned.

Learn more about [the lifecycle methods of the `fetch()` handler](/workers/runtime-apis/handlers/fetch/#lifecycle-methods).


### Supported `FetchEvent` properties

{{<definitions>}}

- `event.type` {{<type>}}string{{</type>}}

  - The type of event. This will always return `"fetch"`.

- `event.request` {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}}

  - The incoming HTTP request.

- {{<code>}}event.respondWith(response{{<type-link href="/runtime-apis/response">}}Response{{</type-link>}}|<span style="margin-left:-6px">{{<param-type>}}Promise{{</param-type>}}</span>){{</code>}} : {{<type>}}void{{</type>}}

  - Refer to [`respondWith`](#respondwith).

- {{<code>}}event.waitUntil(promise{{<param-type>}}Promise{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Refer to [`waitUntil`](#waituntil).

- {{<code>}}event.passThroughOnException(){{</code>}} : {{<type>}}void{{</type>}}

  - Refer to [`passThroughOnException`](#passthroughonexception).

{{</definitions>}}

### `respondWith`

Intercepts the request and allows the Worker to send a custom response.

If a `fetch` event handler does not call `respondWith`, the runtime delivers the event to the next registered `fetch` event handler. In other words, while not recommended, this means it is possible to add multiple `fetch` event handlers within a Worker.

If no `fetch` event handler calls `respondWith`, then the runtime forwards the request to the origin as if the Worker did not. However, if there is no origin – or the Worker itself is your origin server, which is always true for `*.workers.dev` domains – then you must call `respondWith` for a valid response.

```js
// Format: Service Worker
addEventListener('fetch', event => {
  let { pathname } = new URL(event.request.url);

  // Allow "/ignore/*" URLs to hit origin
  if (pathname.startsWith('/ignore/')) return;

  // Otherwise, respond with something
  event.respondWith(handler(event));
});
```

### `waitUntil`

The `waitUntil` command extends the lifetime of the `"fetch"` event. It accepts a `Promise`-based task which the Workers runtime will execute before the handler terminates but without blocking the response. For example, this is ideal for [caching responses](/workers/runtime-apis/cache/#put) or handling logging.

With the Service Worker format, `waitUntil` is available within the `event` because it is a native `FetchEvent` property.

With the ES modules format, `waitUntil` is moved and available on the `context` parameter object.

```js
---
filename: service-worker.js
---
// Format: Service Worker
addEventListener('fetch', event => {
  event.respondWith(handler(event));
});

async function handler(event) {
  // Forward / Proxy original request
  let res = await fetch(event.request);

  // Add custom header(s)
  res = new Response(res.body, res);
  res.headers.set('x-foo', 'bar');

  // Cache the response
  // NOTE: Does NOT block / wait
  event.waitUntil(caches.default.put(event.request, res.clone()));

  // Done
  return res;
}
```

### `passThroughOnException`

The `passThroughOnException` method prevents a runtime error response when the Worker throws an unhandled exception. Instead, the script will [fail open](https://community.microfocus.com/cyberres/b/sws-22/posts/security-fundamentals-part-1-fail-open-vs-fail-closed), which will proxy the request to the origin server as though the Worker was never invoked.

To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException()` causes the Workers runtime to yield control to the origin server.

With the Service Worker format, `passThroughOnException` is added to the `FetchEvent` interface, making it available within the `event`.

With the ES modules format, `passThroughOnException` is available on the `context` parameter object.

```js
---
filename: service-worker.js
---
// Format: Service Worker
addEventListener('fetch', event => {
  // Proxy to origin on unhandled/uncaught exceptions
  event.passThroughOnException();
  throw new Error('Oops');
});
```
