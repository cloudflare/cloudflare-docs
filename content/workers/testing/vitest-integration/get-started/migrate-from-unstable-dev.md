---
title: Migrate from unstable_dev
weight: 3
pcx_content_type: concept
meta:
  description: Test your Worker in local development.
---

# Migrate from unstable_dev

The [`unstable_dev`](/workers/wrangler/api/#unstable_dev) API has been a recommended approach for users wanting to run integration tests against their Workers. The `@cloudflare/vitest-pool-workers` package provides a more ergonomic API and better developer experience for users wanting to write a wide variety of tests.

This guide demonstrates key differences between tests written with the `unstable_dev` API and the Workers Vitest integration. For more information on writing tests with the Workers Vitest integration read [this guide](/workers/testing/vitest/get-started/write-your-first-test/).

## Referencing a Worker for Integration Testing

With `unstable_dev`, to trigger a `fetch` event, you would do this:

```js
---
filename: index.spec.js
---
import { unstable_dev } from "wrangler"

it("dispatches fetch event", () => {
  const worker = await unstable_dev("src/index.ts");
  const resp = await worker.fetch("http://example.com");
  ...
})
```

With the Workers Vitest integration, now you can do the same thing using the `SELF` fetcher from `cloudflare:test`:

```js
---
filename: index.spec.ts
---
import { SELF } from "cloudflare:test";
import "../src/"; // Currently required to automatically rerun tests when `main` changes

it("dispatches fetch event", async () => {
	const response = await SELF.fetch("http://example.com");
	...
});
```

## Stopping a Worker

With the Workers Vitest integration there is no need to stop a Worker via `worker.stop()`. This is handled automatically after tests run.

## Importing Wrangler Config

Via the `unstable_dev` API, you can reference a `wrangler.toml` config file by adding it as an option like this:

```js
---
filename: index.spec.ts
---
await unstable_dev("src/index.ts", {
  	config: "wrangler.toml",
});
```

With the Workers Vitest integration, you can now set this in `vitest.config.js` for all of your tests.

```js
---
filename: vitest.config.js
highlight: [7-9]
---
export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: defineWorkersPoolOptions({
        isolatedStorage: true,
        wrangler: {
          configPath: "wrangler.toml",
        },
      }),
    },
  },
});
---
```

## Testing Service Workers

Unlike the `unstable_dev` API, Workers Vitest integration does not support testing Workers using the Service Worker format. You will need to first [migrate to the ES modules format](/workers/reference/migrate-to-module-workers/) in order to use it.

## Define types

You can remove `UnstableDevWorker` imports from your code. Instead, follow [Write your first test guide](/workers/testing/vitest/get-started/write-your-first-test/#define-types) to define types for all of your tests.

```diff
---
filename: index.spec.ts
---
- import { unstable_dev } from "wrangler";
- import type { UnstableDevWorker } from "wrangler";
+ import worker from "src/index.ts";

describe("Worker", () => {
- let worker: UnstableDevWorker;
...
});
```

## Related resources

- [Write your first test](/workers/testing/vitest/get-started/write-your-first-test/#define-types) - Write unit tests against Workers.