---
title: Integration Testing
weight: 3
pcx_content_type: concept
meta:
  description: Test multiple units of your Worker working together.
---

# Integration Testing

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

An integration test might look like...

```js
// Start Worker HTTP server on port 8787 running `index.mjs` then...
const response = await fetch("http://localhost:8787/?a=1&b=2");

assert((await response.text()) === "3");
```

Here, instead of importing the `add` function as a unit test would do, you make a direct call to the endpoint, testing that the Worker responds at the endpoint with the appropriate response.

## Vitest Integration

The recommended way to write integration tests for your Workers is by using our [custom Vitest integration](/workers/testing/vitest/get-started/). Vitest can be configured to run integrations against a single worker or multiple workers.

### Testing via `SELF`

If testing a single worker, you can use the `SELF` fetcher provided by the [`@cloudflare/test` API](/workers/testing/vitest-integration/test-apis/). 

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

### Testing via auxilliary workers

It's also possible to configure Workers for integration testing via `vitest.config.js`. An example config file can be seen [here](https://github.com/cloudflare/workers-sdk/blob/bcoll/vitest-pool-workers-examples/fixtures/vitest-pool-workers-examples/basics-integration-auxiliary/vitest.config.ts).

The Worker can then be referenced like this: 

```js
---
import { env } from "cloudflare:test";
import { expect, it } from "vitest";

it("dispatches fetch event", async () => {
	const response = await env.WORKER.fetch("http://example.com");
	expect(await response.text()).toBe("👋");
});
```

This method is useful when you're testing multiple workers.

## Wrangler's `unstable_dev()` API

If you do not want to use Vitest and would like to write integration tests for a single worker, consider using [Wrangler's `unstable_dev()` API](/workers/wrangler/api/#unstable_dev). This allows you to start an HTTP server similar to `wrangler dev` that you can send HTTP requests to. `unstable_dev()` will automatically load options from your Wrangler configuration file. Note this is an experimental API subject to breaking changes.

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

If you have been using `unstable_dev()` for integration testing and want to migrate to our Vitest integration, read this [migration guide](/workers/testing/vitest-integration/get-started/migrate-from-unstable-dev/) for more information.

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
