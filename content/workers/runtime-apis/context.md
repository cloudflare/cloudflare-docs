---
pcx_content_type: configuration
title: Context (ctx)
meta:
  description: The Context API in Cloudflare Workers, including waitUntil and passThroughOnException.
---

# Context (`ctx`)

The Context API provides methods to manage the lifecycle of your Worker or Durable Object.

Context is exposed via the following places:

- As the third parameter in all [handlers](/workers/runtime-apis/handlers/), including the [`fetch()` handler](/workers/runtime-apis/handlers/fetch/). (`fetch(request, env, ctx)`)
- As a class property of the [`WorkerEntrypoint` class](/workers/runtime-apis/bindings/service-bindings/rpc)

## `waitUntil`

`ctx.waitUntil()` extends the lifetime of your Worker, allowing you to perform work without blocking a returned response. It accepts a `Promise`, which the Workers runtime will continue executing, even after a response has been returned by the Worker's [handler](/workers/runtime-apis/handlers/).

`waitUntil` is commonly used to:

- Fire off events to external analytics providers. (note that when you use [Workers Analytics Engine](/analytics/analytics-engine/), you do not need to use `waitUntil`)
- Put items into cache using the [Cache API](/workers/runtime-apis/cache/)

{{<Aside type="note" header="Alternatives to waitUntil">}}
If you are using `waitUntil()` to emit logs or exceptions, we recommend using [Tail Workers](/workers/observability/logging/tail-workers/) instead. Even if your Worker throws an uncaught exception, the Tail Worker will execute, ensuring that you can emit logs or exceptions regardless of the Worker's invocation status.

[Cloudflare Queues](/queues/) is purpose-built for performing work out-of-band, without blocking a returned response to the client Worker.
{{</Aside>}}

You can call `waitUntil()` multiple times. Similar to `Promise.allSettled`, even if a promise passed to one `waitUntil` call is rejected, promises passed to other `waitUntil()` calls will still continue to execute.

For example:

```js
export default {
  async fetch(request, env, ctx) {
    // Forward / proxy original request
    let res = await fetch(request);

    // Add custom header(s)
    res = new Response(res.body, res);
    res.headers.set('x-foo', 'bar');

    // Cache the response
    // NOTE: Does NOT block / wait
    ctx.waitUntil(caches.default.put(request, res.clone()));

    // Done
    return res;
  },
};
```

## `passThroughOnException`

{{<Aside type="warning" header="Reuse of body">}}
The Workers Runtime uses streaming for request and response bodies. It does not buffer the body. Hence, if an exception occurs after the body has been consumed, `passThroughOnException()` cannot send the body again.

If this causes issues, we recommend cloning the request body and handling exceptions in code. This will protect against uncaught code exceptions. However some exception times such as exceed CPU or memory limits will not be mitigated.
{{</Aside>}}

The `passThroughOnException` method allows a Worker to [fail open](https://community.microfocus.com/cyberres/b/sws-22/posts/security-fundamentals-part-1-fail-open-vs-fail-closed), and pass a request through to an origin server when a Worker throws an unhandled exception. This can be useful when using Workers as a layer in front of an existing service, allowing the service behind the Worker to handle any unexpected error cases that arise in your Worker.

```js
export default {
  async fetch(request, env, ctx) {
    // Proxy to origin on unhandled/uncaught exceptions
    ctx.passThroughOnException();
    throw new Error('Oops');
  },
};
```
