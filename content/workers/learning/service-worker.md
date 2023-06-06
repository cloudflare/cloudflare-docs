---
pcx_content_type: concept
title: Using Service Worker syntax
weight: 10
---

# Using Service Worker syntax

A Worker written in Service Worker syntax consists of two parts:

1.  An [event listener](/workers/runtime-apis/add-event-listener/) that listens for [`FetchEvents`](/workers/runtime-apis/fetch-event/), and
2.  An event handler that returns a [Response](/workers/runtime-apis/response/) object which is passed to the event’s `.respondWith()` method.

When a request is received on one of Cloudflare’s global network servers for a URL matching a Workers script, it passes the request to the Workers runtime. This dispatches a [`FetchEvent`](/workers/runtime-apis/fetch-event/) in the [isolate](/workers/learning/how-workers-works/#isolates) where the script is running.

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

2.  The call to [`.respondWith()`](/workers/runtime-apis/fetch-event/#respondwith) lets the Workers runtime intercept the request in order to send back a custom response (in this example, the plain text “Hello worker!”).

    - The `FetchEvent` handler typically culminates in a call to the method `.respondWith()` with either a [`Response`](/workers/runtime-apis/response/) or `Promise<Response>` that determines the response.

    - The `FetchEvent` object also provides [two other methods](/workers/runtime-apis/fetch-event/#lifecycle-methods) to handle unexpected exceptions and operations that may complete after a response is returned.

Learn more about [the `FetchEvent` lifecycle](/workers/runtime-apis/fetch-event/#lifecycle-methods).

## Bindings

[Bindings](/workers/platform/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform.

Module Workers do not rely on any global bindings. However, Service Worker syntax accesses bindings on the global scope.

Refer the following `TODO` KV namespace binding example. To create a `TODO` KV namespace binding:

kv namespace - ID
You worker - index.js
binding - exists in wrangler.toml
wrangler - binding: <TODO>, namespace: <ID>

### Bindings in Service Worker syntax

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

### Bindings in Module Worker syntax

In Module Worker syntax, bindings are only available inside the `env` parameter that is provided at the entrypoint to your Worker.

To access the `TODO` KV namespace binding in your module Worker code, the `env` parameter must be passed from the `fetch` handler in your module Worker to the `getTodos` function.

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
