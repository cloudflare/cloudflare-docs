---
pcx_content_type: configuration
title: FetchEvent
---

# FetchEvent

## Background

In Workers, any incoming HTTP requests are referred to as `"fetch"` events. A Worker will respond to the HTTP request with the handler method that was assigned to the `"fetch"` event.

Both the [Service Worker](#syntax-service-worker) and [ES modules](#syntax-es-modules) formats are able to handle `"fetch"` events, but with significant differences in their authoring syntax.

---

## Syntax: Service Worker

In the Service Worker format, events are handled by using `addEventListener` to assign a handler to an event name. Additionally, the Service Worker specification assigns network requests to the `"fetch"` event, using the [`FetchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent) interface.

Incoming HTTP requests can be handled by assigning a `"fetch"` event handler:

```js
addEventListener('fetch', event => {
  event.respondWith(new Response('Hello'));
});
```

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

### Bindings

When a Worker is deployed using the Service Worker syntax, any [bindings](/workers/configuration/environment-variables/) will be made available as global runtime variables.

---

## Syntax: ES modules

In the [ES modules format](/workers/learning/migrate-to-module-workers/), events are handled by defining and exporting an object with method handlers corresponding to event names.

While an incoming HTTP request is still given the `"fetch"` name, a Worker using ES modules format does not surface the `FetchEvent` interface. Instead, Workers using ES modules format receive the [`Request`](/workers/runtime-apis/request/) and must reply with a [`Response`](/workers/runtime-apis/response/) directly.

```js
export default {
  fetch(request, env, context) {
    return new Response('Hello');
  },
};
```

### Parameters

{{<definitions>}}

- `request` {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}}

  - The incoming HTTP request.

- `env` {{<type>}}object{{</type>}}

  - The [bindings](/workers/configuration/environment-variables/) assigned to the Worker. As long as the environment has not changed, the same object (equal by identity) is passed to all requests.

- {{<code>}}context.waitUntil(promise{{<param-type>}}Promise{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Refer to [`waitUntil`](#waituntil).

- {{<code>}}context.passThroughOnException(){{</code>}} : {{<type>}}void{{</type>}}

  - Refer to [`passThroughOnException`](#passthroughonexception).

{{</definitions>}}

### Bindings

When deploying a Worker using ES modules, any [bindings](/workers/configuration/environment-variables/) will not be available as global runtime variables. Instead, they are passed to the handler as a [parameter](#parameters) – refer to `env` in [Parameters](#parameters).

---

## Lifecycle methods

When responding to a HTTP request, the fetch handler may use any of the following methods to augment or control how the request is handled.

### `respondWith`

Intercepts the request and allows the Worker to send a custom response.

{{<Aside type="warning" header="Service Worker format only">}}

The `respondWith` method is only applicable to the Service Worker format.

With the ES modules format, return a `Response` from the handler directly.

{{</Aside>}}

If a `fetch` event handler does not call `respondWith`, the runtime delivers the event to the next registered `fetch` event handler. In other words, while not recommended, this means it is possible to add multiple `"fetch"` event handlers within a Worker.

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

```js
---
filename: module-worker.mjs
---
// Format: ES modules
export default {
  async fetch(request, env, context) {
    // Forward / Proxy original request
    let res = await fetch(request);

    // Add custom header(s)
    res = new Response(res.body, res);
    res.headers.set('x-foo', 'bar');

    // Cache the response
    // NOTE: Does NOT block / wait
    context.waitUntil(caches.default.put(request, res.clone()));

    // Done
    return res;
  },
};
```

### `passThroughOnException`

The `passThroughOnException` command prevents a runtime error response when the Worker script throws an unhandled exception. Instead, the script will [fail open](https://community.microfocus.com/cyberres/b/sws-22/posts/security-fundamentals-part-1-fail-open-vs-fail-closed), which will proxy the request to the origin server as though the Worker was never invoked.

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

```js
---
filename: module-worker.mjs
---
// Format: ES modules
export default {
  async fetch(request, env, context) {
    // Proxy to origin on unhandled/uncaught exceptions
    context.passThroughOnException();
    throw new Error('Oops');
  },
};
```
