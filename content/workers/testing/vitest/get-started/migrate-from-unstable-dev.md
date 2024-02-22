---
title: Migrate from unstable_dev
weight: 3
pcx_content_type: concept
meta:
  description: Test your Worker in local development.
---

# Migrate from unstable_dev

The [`unstable_dev`](/workers/wrangler/api/#unstable_dev) API has been a recommended approach for users wanting to run integration tests against their Workers. The `@cloudflare/vitest-pool-workers` package provides a more ergonomic API and better developer experience for users wanting to write a wide variety of tests.

This guide demonstrates key differences between tests written with the `unstable_dev` API and the Workers Vitest pool. For more information on writing tests with the Workers Vitest pool read [this guide](/workers/testing/vitest/get-started/write-your-first-test/).

## Starting and Stopping Workers

With the Workers Vitest pool, Workers and their functions can be imported and referenced like any other module. There is no need to stop a Worker via `worker.stop()` either. This is handled automatically after tests run.

```diff
---
filename: index.spec.js
---
- import { unstable_dev } from "wrangler"
+ import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
+ import { describe, it, expect } from "vitest";
+ import worker from "src/index.js";

describe("worker", async () => {
  it("returns hello world", () => {
-   const worker = await unstable_dev("src/index.ts");
+   const request = new Request("http://example.com/");
+   const ctx = createExecutionContext();

-   const response = await worker.fetch();
+   const response = await worker.fetch(request, env, ctx);
+   await waitOnExecutionContext(ctx);

    expect(response).not.toBe(undefined);

    if (response) {
      const text = await response.text();
      expect(text).toMatchInlineSnapshot(`"Hello World!"`);
    }

-   worker.stop();
  })
}
```

## Importing Wrangler Config

Via the `unstable_dev` API, users could reference a `wrangler.toml` config file by adding it as an option like this:

```js
---
filename: index.spec.ts
---
await unstable_dev("src/index.ts", {
  	config: "wrangler.toml",
});
```

With the Workers Vitest pool, you can now set this in `vitest.config.js` for all of your tests.

```js
---
filename: vitest.config.js
highlight: [7-9]
---
export default defineConfig({
  test: {
    pool: "@cloudflare/vitest-pool-workers",
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

Unlike the `unstable_dev` API, Workers Vitest pool does not support testing Workers using the Service Worker format. You will need to first [migrate to the ES modules format](/workers/reference/migrate-to-module-workers/) in order to use it.

## Defining Types

You can remove `UnstableDevWorker` imports from your code. Instead, follow [the guide](/workers/testing/vitest/get-started/write-your-first-test/#define-types) to define types for all of your tests.

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
