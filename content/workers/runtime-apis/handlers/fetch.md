---
pcx_content_type: configuration
title: Fetch Handler
---

# Fetch Handler

## Background

Incoming HTTP requests to a Worker are passed to the `fetch()` handler as a [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object. To respond to the request with a response, return a [`Response`](/workers/runtime-apis/response/) object:

```ts
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
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

---

## Lifecycle methods

When responding to a HTTP request, the fetch handler may use any of the following methods to augment or control how the request is handled.

### `context.waitUntil()`

The `waitUntil()` method extends the lifetime of the `"fetch"` event. It accepts a `Promise`-based task which the Workers runtime will execute before the handler terminates but without blocking the response. For example, this is ideal for [caching responses](/workers/runtime-apis/cache/#put) or handling logging.

```js
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

### `context.passThroughOnException()`

The `passThroughOnException` method allows a a Worker to [fail open](https://community.microfocus.com/cyberres/b/sws-22/posts/security-fundamentals-part-1-fail-open-vs-fail-closed), and pass a request through to an origin server when a Worker throws an unhandled exception. This can be useful when using Workers as a layer in front of an existing service, allowing the service behind the Worker to handle any unexpected error cases that arise in your Worker.

```js
export default {
  async fetch(request, env, context) {
    // Proxy to origin on unhandled/uncaught exceptions
    context.passThroughOnException();
    throw new Error('Oops');
  },
};
```
