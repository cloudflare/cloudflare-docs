---
title: Write Your First Test
weight: 1
pcx_content_type: concept
meta:
  description: A guide to help you get set up to write unit tests against Workers.
---

# Write Your First Test

This tutorial will guide you through install and setup of the [`@cloudflare/vitest-pool-workers`](https://workers.cloudflare.com) package, and will help you get started writing tests against your Workers using Vitest.

## Prerequisites

- Open your Worker project's root folder or create a new project via our [Get Started guide](/workers/get-started/guide/#1-create-a-new-worker-project)

- In your project's `wrangler.toml` configuration file, define a [compatibility date](/workers/configuration/compatibility-dates/) of `2022-10-31` or higher, and include `nodejs_compat` in your [compatibility flags](/workers/wrangler/configuration/#use-runtime-apis-directly).

## Install Vitest and `@cloudflare/vitest-pool-workers`

Open a terminal window and make sure you are in your project's root directory. Once you have confirmed that, run:

```sh
$ npm install vitest@1.3.0 --save-dev --save-exact
$ npm install @cloudflare/vitest-pool-workers --save-dev
```

This will add the packages to your `package.json` file and install them as dev dependencies.

{{<Aside type="note">}}

The `@cloudflare/vitest-pool-workers` package _only_ works with Vitest 1.3.0.

{{</Aside>}}

## Define Vitest Configuration

Next, if you don't already have a `vitest.config` file setup, you'll need to create one. In that file, you'll need the following `import` statements:

```js
import { defineWorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";
import { defineConfig } from "vitest/config";
```

Then, you will add the following within `defineConfig` to define the pool and its options:

```js
---
filename: vitest.config.js
---
export default defineConfig({
  test: {
    pool: "@cloudflare/vitest-pool-workers",
    poolOptions: {
      workers: defineWorkersPoolOptions({
        // to be configured
      }),
    },
  },
});
```

This tells Vitest which pool you are using (ie. `@cloudflare/vitest-pool-workers`). Next, we will add configuration options via `defineWorkersPoolOptions` to support our tests.

### Add Configuration Options via Wrangler

You can reference a `wrangler.toml` to leverage its `main` entrypoint, its compatibility settings, and its bindings.

```js
---
filename: vitest.config.js
highlight: [6-9]
---
export default defineConfig({
  test: {
    pool: "@cloudflare/vitest-pool-workers",
    poolOptions: {
      workers: defineWorkersPoolOptions({
        isolatedStorage: true,
        wrangler: {
          configPath: "../wrangler.toml",
        },
      }),
    },
  },
});
```

{{<Aside type="note">}}

For a full list of available configuration options, read the [Configuration guide](/workers/testing/vitest/configuration/).

{{</Aside>}}

### Add Configuration Options via Miniflare

Under the hood, the Workers Vitest integration uses [Miniflare](https://miniflare.dev), the same simulator that powers [`wrangler dev`'s](/workers/wrangler/) local mode. Options can be passed directly to Miniflare for advanced configuration.

For example, to add bindings that will be used in tests, you can add `miniflare` to `defineWorkersPoolOptions` like this:

```js
---
filename: vitest.config.js
highlight: [8-10]
---
export default defineConfig({
  test: {
    pool: "@cloudflare/vitest-pool-workers",
    poolOptions: {
      workers: defineWorkersPoolOptions({
        isolatedStorage: true,
        main: "../src/index.ts",
        miniflare: {
          kvNamespaces: ["TEST_NAMESPACE"],
        },
      }),
    },
  },
});
```

This configuration would add a KV namespace `TEST_NAMESPACE` that was only accessible in tests. Using this method, you can add or override existing bindings like Durable Objects or service bindings.

{{<Aside type="note">}}

For a full list of available Miniflare options, read the Miniflare [WorkersOptions API docs](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions).

{{</Aside>}}

## Define Types

If you're using TypeScript, you'll need to define types for Cloudflare Workers and `cloudflare:test` to make sure they are detected appropriately. Add a `tsconfig.json` in the same folder as your tests (ie. `test`) and add the following:

```js
---
filename: tsconfig.json
---
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "types": [
      "@cloudflare/workers-types/experimental",
      "@cloudflare/vitest-pool-workers"
    ]
  },
  "include": ["./**/*.ts", "../src/env.d.ts"]
}
```

Save this file, and you're ready to write your first test.

## Write Tests

If you created a basic Worker via the guide listed above, you should have the following fetch handler in the `src` folder:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: index.js
---
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello World!');
  },
};
```
{{</tab>}}
{{<tab label="ts">}}
```ts
---
filename: index.ts
---
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
```
{{</tab>}}
{{</tabs>}}

This Worker receives a request, and returns a response of "Hello World!". In order to test this, create a `test` folder with the following test file:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: index.spec.js
---
import { env, createExecutionContext, waitOnExecutionContext() } from "cloudflare:test";
import { describe, it, expect } from "vitest";
// Could import any other source file/function here
import worker from "../src";

describe("Hello World worker", () => {
  it("displays Hello World!", async () => {
    const request = new Request("http://example.com");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext()(ctx);
    expect(await response.text()).toBe("Hello World!");
  });
});
```
{{</tab>}}
{{<tab label="ts">}}
```ts
---
filename: index.spec.ts
---
import { env, createExecutionContext, waitOnExecutionContext() } from "cloudflare:test";
import { describe, it, expect } from "vitest";
// Could import any other source file/function here
import worker from "../src";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

escribe("Hello World worker", () => {
  it("displays Hello World!", async () => {
    const request = new IncomingRequest("http://example.com");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext()(ctx);
    expect(await response.text()).toBe("Hello World!");
  });
});
```
{{</tab>}}
{{</tabs>}}

Let's add functionality to handle a `404` path on the Worker. This will return the text `Not found` as well as the status code `404`.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: index.js
---
export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if(pathname === "/404") {
      return new Response('Not found', { status: 404 });
    }

    return new Response('Hello World!');
  },
};
```
{{</tab>}}
{{<tab label="ts">}}
```ts
---
filename: index.ts
---
export default {
	async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if(pathname === "/404") {
      return new Response('Not found', { status: 404 });
    }

		return new Response('Hello World!');
	}
} satisfies ExportedHandler<Env>;
```
{{</tab>}}
{{</tabs>}}

To test this, we would add the following to our test file:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: index.spec.js
---
it("displays not found and proper status for /404", async () => {
    const request = new Request("http://example.com/404");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext()(ctx);
    expect(await response.text()).toBe("Not found");
    expect(await response.status).toBe(404);
  });
```
{{</tab>}}
{{<tab label="ts">}}
```ts
---
filename: index.spec.ts
---
it("displays not found and proper status for /404", async () => {
    const request = new IncomingRequest("http://example.com/404");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext()(ctx);
    expect(await response.text()).toBe("Not found");
    expect(await response.status).toBe(404);
  });
```
{{</tab>}}
{{</tabs>}}

## Related resources

- More examples of tests using this package can be found in the `@cloudflare/vitest-pool-workers` [repo](https://github.com/cloudflare/workers-sdk/tree/main/packages/vitest-pool-workers/test)
