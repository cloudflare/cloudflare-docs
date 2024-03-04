---
title: Testing options
pcx_content_type: overview
weight: 3
---

# Testing options

There are many ways of testing Workers and Pages projects. This page gives an overview of the different types of tests and which methods are most appropriate for each.

## Types of tests

In a Workers context, a unit test imports and directly calls functions from your Worker then asserts on their return values. By contrast, an integration test sends HTTP requests to your Worker and asserts on the HTTP responses. For an illustrative example, consider the following Worker:

```js
---
filename: index.mjs
---
export function add(a, b) {
  return a + b;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const a = parseInt(url.searchParams.get("a"));
    const b = parseInt(url.searchParams.get("b"));
    return new Response(add(a, b));
  }
}
```

A unit test might look like...

```js
import { add } from "./index.mjs";
assert(add(1, 2) === 3);
```

...whereas an integration test might look like...

```js
// Start Worker HTTP server on port 8787 running `index.mjs` then...
const response = await fetch("http://localhost:8787/?a=1&b=2");
assert((await response.text()) === "3");
```

Note whilst we're not limited to the HTTP abstraction with unit tests, we could call the `fetch` handler directly for an _integration-like_ unit test. Unit tests may be considered more expressive than integration tests, but integration tests usually provide a more accurate environment.

```js
import worker from "./my-worker.mjs";
const request = new Request("http://example.com/?a=1&b=2");
const response = await worker.fetch(request);
assert((await response.text()) === "3");
```

## Vitest with Workers pool

For most users, Cloudflare recommends using our [custom Vitest pool](/workers/testing/vitest/get-started/) for testing Workers and [Pages Functions](/pages/functions/) projects. [Vitest](https://vitest.dev/) is a popular JavaScript testing framework featuring a very fast watch mode, Jest compatibility, and out-of-the-box support for TypeScript. Cloudflare provides a custom pool that allows your Vitest tests to run _inside_ the Workers runtime. Get started with the pool [here](/workers/testing/vitest/get-started/), and check out the [recipes for testing different types of Workers](/workers/testing/vitest/recipes/).

- ✅ Supports both **unit tests** and **integration tests**
- 📚 Provides direct access to Workers runtime APIs and bindings
- 📦 Implements isolated per-test storage
- 🔥 Runs tests fully-locally using [Miniflare](https://miniflare.dev/)
- ⚡️ Leverages Vitest's hot-module reloading for near instant reruns
- ↩️ Provides a declarative interface for mocking outbound requests
- 🧩 Supports projects with multiple workers

{{<Aside type="warning">}}

The Workers Vitest integration does not support testing Workers using the Service Worker format. Please [migrate to the ES modules format](/workers/reference/migrate-to-module-workers/) first.

{{</Aside>}}

```js
import {
  env,
  SELF,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { it, expect } from "vitest";
import worker, { add } from "./index.mjs";

it("adds via function call", () => {
  expect(add(1, 2)).toBe(3);
});
it("adds via request (unit style)", () => {
  const request = new Request("http://example.com/?a=1&b=2");
  const ctx = createExecutionContext();
  const response = await worker.fetch(request, env, ctx);
  await waitOnExecutionContext(ctx);
  expect(await response.text()).toBe("3");
});
it("adds via request (integration style)", () => {
  const response = await SELF.fetch("http://example.com/?a=1&b=2");
  expect(await response.text()).toBe("3");
});
```

## Wrangler's `unstable_dev()` API

If you do not want to use Vitest and would like to write **integration tests** for a single worker, consider using [Wrangler's `unstable_dev()` API](/workers/wrangler/api/#unstable_dev). This allows you to start an HTTP server similar to `wrangler dev` that you can send HTTP requests to. `unstable_dev()` will automatically load options from your Wrangler configuration file. Note this is an experimental API subject to breaking changes.

```js
import assert from "node:assert";
import { unstable_dev } from "wrangler";

const worker = await unstable_dev("./index.mjs");
try {
  const response = await worker.fetch("/?a=1&b=2");
  assert.strictEqual(await response.text(), "3");
} finally {
  await worker.stop();
}
```

## Miniflare's API

If you would like to write **integration tests** for multiple workers, need direct access to bindings outside your worker in tests, or have another advanced use case, consider using [Miniflare's API](https://github.com/cloudflare/workers-sdk/blob/main/packages/miniflare/README.md) directly. Miniflare is the foundation for the other solutions on this page, exposing a JavaScript API for the [`workerd` runtime](https://github.com/cloudflare/workerd) and local simulators for the other Developer Platform products. Unlike `unstable_dev()`, Miniflare does not automatically load options from your Wrangler configuration file.

```js
import assert from "node:assert";
import { Miniflare } from "miniflare";

const mf = new Miniflare({
  modules: true,
  scriptPath: "./index.mjs",
});
try {
  const response = await mf.dispatchFetch("http://example.com/?a=1&b=2");
  assert.strictEqual(await response.text(), "3");
} finally {
  await mf.dispose();
}
```

## Comparison matrix

| Feature                                   | Vitest&nbsp;Pool | `unstable_dev()` | Miniflare's&nbsp;API |
| ----------------------------------------- | ---------------- | ---------------- | -------------------- |
| Unit testing                              | ✅               | ❌               | ❌                   |
| Integration testing                       | ✅               | ✅               | ✅                   |
| Loading Wrangler configuration files      | ✅               | ✅               | ❌                   |
| Bindings directly in tests                | ✅               | ❌               | ✅                   |
| Isolated per-test storage                 | ✅               | ❌               | ❌                   |
| Outbound request mocking                  | ✅               | ❌               | ✅                   |
| Multiple Workers support                  | ✅               | 🚧[^1]           | ✅                   |
| Direct access to Durable Object instances | ✅               | ❌               | ❌                   |
| Run Durable Object alarms immediately     | ✅               | ❌               | ❌                   |
| List Durable Objects                      | ✅               | ❌               | ❌                   |
| Testing Service Workers                   | ❌               | ✅               | ✅                   |

[^1]: Support for multiple workers in `unstable_dev()` relies on `wrangler dev`'s service registry which can be unreliable when running multiple tests in parallel.
