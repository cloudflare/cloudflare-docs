---
pcx_content_type: configuration
title: Performance and timers
meta:
  description: Measure timing, performance, and timing of subrequests and other operations.
---

# Performance

## Background

The Workers runtime supports a subset of the [`Performance` API](https://developer.mozilla.org/en-US/docs/Web/API/Performance), used to measure timing and performance, as well as timing of subrequests and other operations.

## How time advances in Workers

When Workers are deployed to Cloudflare, as a security measure to [mitigate against Spectre attacks](/workers/reference/security-model/#step-1-disallow-timers-and-multi-threading), APIs that return timers, including [`performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) and [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now), only advance or increment after I/O occurs. Consider the following examples:

```typescript
---
header: Time is frozen — start will have the exact same value as end.
---
const start = performance.now();
for (let i = 0; i < 1e6; i++) {
  // do expensive work
}
const end = performance.now();
const timing = end - start; // 0
```

```typescript
---
header: Time advances, because a subrequest has occurred between start and end.
---
const start = performance.now();
const response = await fetch("https://developers.cloudflare.com/");
const end = performance.now();
const timing = end - start; // duration of the subrequest to developers.cloudflare.com
```

By wrapping a subrequest in calls to `performance.now()` or `Date.now()` APIs, you can measure the timing of a subrequest, fetching a key from KV, an object from R2, or any other form of I/O in your Worker.

In local development, however, timers will increment regardless of whether I/O happens or not. This means that if you need to measure timing of a piece of code that is CPU intensive, that does not involve I/O, you can run your Worker locally, via [Wrangler](/workers/wrangler/), which uses the open-source Workers runtime, [workerd](https://github.com/cloudflare/workerd) — the same runtime that your Worker runs in when deployed to Cloudflare.

### What counts as I/O?

In general, anything where you make a network request counts as I/O — and time advances, allowing you measure wall time execution. This includes:

- Subrequests made from your Worker (calling [`fetch()`](/workers/runtime-apis/fetch/))
- Reading, listing, writing or deleting keys from a [Workers KV](/kv/api/) namespace
- Reading or writing an object from an [R2](/r2/api/workers/workers-api-usage/) bucket
- Anything that initiates a network request

### What does not count as I/O?

Calling other Workers does not count as I/O. For examples:

- Calling another Worker via a [Service binding](/workers/configuration/bindings/about-service-bindings/)
- Dynamically dispatching to a User Worker, using [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/)

If you attempt to measure the execution time of a call to a Service binding, or a dispatch to a User Worker:

- If the Worker you are calling does not perform I/O, time will not increment
- If the Worker you are calling performs I/O, and then does some CPU intesnive work before returning a response, the timing you measure will not include the time spent doing the CPU intensive work.

#### Example

```toml
---
filename: wrangler.toml
---
name = "worker_b"
main = "./src/workerB.js"
kv_namespaces = [
    { binding = "MY_KV_NAMESPACE", id = "<ID>" }
]
```

```js
---
filename: workerB.js
---
export default {
  async fetch(request, env, ctx) {
    await env.MY_KV_NAMESPACE.put("foo", "bar"); // Assume this takes 20ms
    await performCpuIntensiveWork(); // Assume this takes 20ms
    return new Response("Hello World!");
  }
}
```

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

```js
---
filename: workerA.js
---
export default {
	async fetch(request, env) {
    const start = performance.now();
    const res = await env.BINDING_NAME.fetch(request);
    const end = performance.now();
		return await env.BINDING_NAME.fetch(request);
    return new Response(`${end - start} milliseconds`); // Returns 20 milliseconds, not 40 milliseconds
	},
};
```

### When does time "start" in a Worker?

Consider the following Worker:

```js
import expensiveTopLevelScope from "foo" // Assume this takes 50 milliseconds

export default {
  async fetch(request) {
    const start = Date.now();
    await env.MY_KV.get('bar'); // Assume this takes 20 milliseconds
    const end = Date.now();
    return new Response(`${end - start} milliseconds`);
  },
};
```

In Workers, time "starts" when the top-level (global) scope of the Worker is entered — not when the handler (`fetch()` in this example) is entered.

This means that the first time this Worker is called, it will returns "70 milliseconds" — the timing includes time spent evaluating top-level scope. But on subsequent requests, the top-level scope has already been evaluated, and the Worker returns "20 milliseconds".

The first time that the Worker is called, the tim

### `performance.now()`

The [`performance.now()` method](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) returns timestamp in milliseconds, representing the time elapsed since `performance.timeOrigin`.

### `performance.timeOrigin`

The [`performance.timeOrigin()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin) API is a read-only property that returns a baseline timestamp to base other measurements off of.

In the Workers runtime, calling `timeOrigin()` returns 0.


