---
title: Integration testing
weight: 3
pcx_content_type: concept
meta:
  description: Test multiple units of your Worker working together.
---

# Integration testing

Integration tests test multiple units of your Worker together by sending HTTP requests to your Worker and asserting on the HTTP responses. As an example, consider the following Worker:

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

An integration test for this Worker might look like the following example:

```js
// Start Worker HTTP server on port 8787 running `index.mjs` then...
const response = await fetch("http://localhost:8787/?a=1&b=2");

assert((await response.text()) === "3");
```

In the above example, instead of importing the `add` function as a unit test would do, you make a direct call to the endpoint, testing that the Worker responds at the endpoint with the appropriate response.

## Vitest integration

The recommended way to write integration tests for your Workers is by using [the Workers Vitest integration](/workers/testing/vitest/get-started/). Vitest can be configured to run integrations against a single Worker or multiple Workers.

### Testing via `SELF`

If testing a single Worker, you can use the `SELF` fetcher provided by the [`@cloudflare/test` API](/workers/testing/vitest-integration/test-apis/). 

```js
---
filename: index.spec.js
---
import { SELF } from "cloudflare:test";

it("dispatches fetch event", async () => {
  const response = await SELF.fetch("https://example.com");
  expect(await response.text()).toMatchInlineSnapshot(...);
});
```

When using `SELF` for integration tests, your worker code runs in the same context as the test runner. This means you can use global mocks to control your worker, but also means your worker uses the same subtly different module resolution behavior provided by Vite. 

Usually this isn't a problem, but if you'd like to run your worker in a fresh environment that's as close to production as possible, using an auxiliary worker may be a good idea - although auxiliary Workers have some DX limitations.

### Testing via auxiliary Workers

It is also possible to configure Workers for integration testing via `vitest.config.js`. An [example `vitest.config.js` configuration file](https://github.com/cloudflare/workers-sdk/blob/bcoll/vitest-pool-workers-examples/fixtures/vitest-pool-workers-examples/basics-integration-auxiliary/vitest.config.ts) on GitHub.

The Worker can then be referenced like the following example:

```js
---
import { env } from "cloudflare:test";
import { expect, it } from "vitest";

it("dispatches fetch event", async () => {
	const response = await env.WORKER.fetch("http://example.com");
	expect(await response.text()).toBe("👋");
});
```

Instead of running the Worker-under-test in the same Worker as the test runner like `SELF`, this example defines the Worker-under-test as an _auxiliary_ Worker. This means the Worker runs in a separate isolate to the test runner, with a different global scope. The Worker-under-test runs in an environment closer to production, but Vite transformations and hot-module-reloading aren't applied to the Worker—you must compile your TypeScript to JavaScript beforehand.

Auxiliary Workers cannot be configured from `wrangler.toml` files. You must use Miniflare [`WorkerOptions`](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) in `vite.config.ts`.

{{<Aside type="note">}}

This method can be useful when you're testing multiple workers. You can define multiple Workers by different names in `vitest.config.js` and reference them via `env`.

{{</Aside>}}


## Wrangler's `unstable_dev()` API

If you do not want to use Vitest and would like to write integration tests for a single Worker, consider using [Wrangler's `unstable_dev()` API](/workers/wrangler/api/#unstable_dev). `unstable_dev` allows you to start an HTTP server similar to [`wrangler dev`](/workers/wrangler/commands/#dev) that you can send HTTP requests to. `unstable_dev()` will automatically load options from your Wrangler configuration file. Note that `unstable_dev` is an experimental API subject to breaking changes.

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

{{<Aside type="note">}}

If you have been using `unstable_dev()` for integration testing and want to migrate to Cloudflare's Vitest integration, refer to the [Migrate from `unstable_dev` migration guide](/workers/testing/vitest-integration/get-started/migrate-from-unstable-dev/) for more information.

{{</Aside>}}

## Miniflare's API

If you would like to write integration tests for multiple workers, need direct access to bindings outside your worker in tests, or have another advanced use case, consider using [Miniflare's API](https://github.com/cloudflare/workers-sdk/blob/main/packages/miniflare/README.md) directly. Miniflare is the foundation for the other solutions on this page, exposing a JavaScript API for the [`workerd` runtime](https://github.com/cloudflare/workerd) and local simulators for the other Developer Platform products. Unlike `unstable_dev()`, Miniflare does not automatically load options from your Wrangler configuration file.

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

{{<Aside type="note">}}

If you have been using the test environments from Minflare 2 for integration testing and want to migrate to our Vitest integration, read this [migration guide](/workers/testing/vitest-integration/get-started/migrate-from-miniflare-2/) for more information.

{{</Aside>}}

## Related Resources

- More examples of integration tests can be found on the Vitest [Recipes page](/workers/testing/vitest-integration/recipes).
