---
pcx-content-type: configuration
---

# FetchEvent

## Background

In Workers, any incoming HTTP requests are referred to as "fetch" events. A Worker will respond to the HTTP request with the handler method that was assigned to the "fetch" event.

Both the [Service Worker](#syntax-service-worker) and [Module Worker](#syntax-module-worker) formats are able to handle "fetch" events, but with significant differences in their authoring syntax.


## Syntax: Service Worker

In the Service Worker format, events are handled by using `addEventListener` to assign a handler to an event name. Additionally, the Service Worker specification assgins network requests to the `"fetch"` event, using the [`FetchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent) interface.

Incoming HTTP requests can be handled by assigning a "fetch" event handler:

```js
addEventListener("fetch", event => {
  event.respondWith(
    new Response("Hello")
  )
})
```

### Supported `FetchEvent` Properties

<Definitions>

- `event.type` <Type>string</Type>
    - The type of event. This will always return `"fetch"`.

- `event.request` <TypeLink href="/runtime-apis/request">Request</TypeLink>
    - The incoming HTTP request.

-  <Code>event.respondWith(response<TypeLink href="/runtime-apis/response">Response</TypeLink>|<span style={{marginLeft:"-6px"}}><ParamType>Promise</ParamType></span>)</Code> <Type>void</Type>

    - See [`respondWith`](#respondWith).

- <Code>event.waitUntil(promise<ParamType>Promise</ParamType>)</Code> <Type>void</Type>

    - See [`waitUntil`](#waitUntil).

- <Code>event.passThroughOnException()</Code> <Type>void</Type>

    - See [`passThroughOnException`](#passThroughOnException).

</Definitions>

### Bindings

When a Worker is deployed using the Service Worker syntax, any [bindings](/platform/environment-variables) will be made available as global runtime variables.


## Syntax: Module Worker

In the Module Worker format, events are handled by defining and exporting an object with method handlers corresponding to event names.

While an incoming HTTP request is still given the "fetch" name, a Module Worker does not surface the `FetchEvent` interface. Instead, Module Workers receive the [`Request`](/runtime-apis/request) and must reply with a [`Response`](/runtime-apis/response) directly.

```js
export default {
  fetch(request, env, context) {
    return new Response("Hello")
  }
}
```

### Parameters

<Definitions>

- `request` <TypeLink href="/runtime-apis/request">Request</TypeLink>
    - The incoming HTTP request.

- `env` <Type>object</Type>
    - The [bindings](/platform/environment-variables) assigned to the Worker.

- <Code>context.waitUntil(promise<ParamType>Promise</ParamType>)</Code> <Type>void</Type>

    - See [`waitUntil`](#waitUntil).

- <Code>context.passThroughOnException()</Code> <Type>void</Type>

    - See [`passThroughOnException`](#passThroughOnException).


### Bindings

When deploying a Module Worker, any [bindings](/platform/environment-variables) **will not** be available as global runtime variables. Instead, they are passed to the handler as a [parameter](#patameters) – see `env`.


## Lifecycle Methods

When responding to a HTTP request, the fetch handler may use any of the following methods to augment or control how the request is handled.

### `respondWith`

<Aside type="warning" header="Service Worker Only">

The `respondWith` method is only applicable to the **Service Worker** format.

With the Module Worker format, return a `Response` from the handler directly.

</Aside>

Intercepts the request and allows the Worker to send a custom response.

If a `fetch` event handler does not call `respondWith`, the runtime delivers the event to the next registered `fetch` event handler. In other words, while not recommended, this means it's possible to add multiple "fetch" event handlers within a Worker.

If no `fetch` event handler calls `respondWith`, then the runtime forwards the request to the origin as if the Worker did not. However, if there is no origin – or the Worker itself is your origin server, which is always true for `*.workers.dev` domains – then you must call `respondWith` for a valid response.

```js
// Format: Service Worker
addEventListener("fetch", event => {
  let { pathname } = new URL(event.request.url)

  // Allow "/ignore/*" URLs to hit origin
  if (pathname.startsWith("/ignore/")) return

  // Otherwise, respond with something
  event.respondWith(
    handler(event)
  )
})
```


### `waitUntil`

Extends the lifetime of the "fetch" event. Accepts a `Promise`-based task which the Workers runtime will execute before the handler terminates but without blocking the response. For example, this is ideal for [caching responses](/runtime-apis/cache#put) or handling logging.

With the Service Worker format, `waitUntil` is available within the `event` because it is a native `FetchEvent` property.

With the Module Worker format, `waitUntil` is moved and available on the `context` parameter object.

```js
---
filename: service-worker.js
---
// Format: Service Worker
addEventListener("fetch", event => {
  event.respondWith(
    handler(event)
  )
})

async function handler(event) {
  // Forward / Proxy original request
  let res = await fetch(event.request)

  // Add custom header(s)
  res = new Response(res.body, res)
  res.headers.set("x-foo", "bar")

  // Cache the response
  // NOTE: Does NOT block / wait
  event.waitUntil(
    caches.default.put(
      event.request,
      res.clone()
    )
  )

  // Done
  return res;
}
```

```js
---
filename: module-worker.mjs
---
// Format: Module Worker
export default {
  async fetch(request, env, context) {
    // Forward / Proxy original request
    let res = await fetch(request)

    // Add custom header(s)
    res = new Response(res.body, res)
    res.headers.set("x-foo", "bar")

    // Cache the response
    // NOTE: Does NOT block / wait
    context.waitUntil(
      caches.default.put(
        request,
        res.clone()
      )
    )

    // Done
    return res;
  }
}
```


### `passThroughOnException`

Prevents a runtime error response when the Worker script throws an unhandled exception. Instead, the script will ["fail open"](https://community.microfocus.com/t5/Security-Blog/Security-Fundamentals-Part-1-Fail-Open-vs-Fail-Closed/ba-p/283747), which will proxy the request to the origin server as though the Worker was never invoked.

To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException()` causes the Workers runtime to yield control to the origin server.

With the Service Worker format, `passThroughOnException` is added to the `FetchEvent` interface, making it availabled within the `event`.

With the Module Worker format, `passThroughOnException` is available on the `context` parameter object.

```js
---
filename: service-worker.js
---
// Format: Service Worker
addEventListener("fetch", event => {
  // Proxy to origin on unhandled/uncaught exceptions
  event.passThroughOnException()
  throw new Error("Oops")
})
```

```js
---
filename: module-worker.mjs
---
// Format: Module Worker
export default {
  async fetch(request, env, context) {
    // Proxy to origin on unhandled/uncaught exceptions
    context.passThroughOnException()
    throw new Error("Oops")
  }
}
```
