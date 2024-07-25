---
pcx_content_type: configuration
title: Performance and timers
meta:
  description: Measure timing, performance, and timing of subrequests and other operations.
---

# Performance

## Background

The Workers runtime supports a subset of the [`Performance` API](https://developer.mozilla.org/en-US/docs/Web/API/Performance), used to measure timing and performance, as well as timing of subrequests and other operations.

### `performance.now()`

The [`performance.now()` method](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) returns timestamp in milliseconds, representing the time elapsed since `performance.timeOrigin`.

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

### `performance.timeOrigin`

The [`performance.timeOrigin`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin) API is a read-only property that returns a baseline timestamp to base other measurements off of.

In the Workers runtime, the `timeOrigin` property returns 0.


