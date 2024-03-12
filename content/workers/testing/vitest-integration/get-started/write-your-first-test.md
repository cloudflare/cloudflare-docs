---
title: Write your first test
weight: 1
pcx_content_type: concept
meta:
  description: Write unit tests against Workers.
---

# Write your first test

This guide will guide you through install and setup of the `@cloudflare/vitest-pool-workers` package, and will help you get started writing tests against your Workers using Vitest. The `@cloudflare/vitest-pool-workers` package works by running code inside a Cloudflare Worker that Vitest would usually run inside a [Node.js worker thread](https://nodejs.org/api/worker_threads.html).

## Prerequisites

- Open your Worker project's root folder or create a new project via [Workers Get started guide](/workers/get-started/guide/#1-create-a-new-worker-project)

- In your project's `wrangler.toml` configuration file, define a [compatibility date](/workers/configuration/compatibility-dates/) of `2022-10-31` or higher, and include `nodejs_compat` in your [compatibility flags](/workers/wrangler/configuration/#use-runtime-apis-directly).

## Install Vitest and `@cloudflare/vitest-pool-workers`

Open a terminal window and make sure you are in your project's root directory. Once you have confirmed that, run:

```sh
$ npm install vitest@1.3.0 --save-dev --save-exact
$ npm install @cloudflare/vitest-pool-workers --save-dev
```

The above commands will add the packages to your `package.json` file and install them as dev dependencies.

{{<Aside type="note">}}

The `@cloudflare/vitest-pool-workers` package only works with Vitest 1.3.0.

{{</Aside>}}

## Define Vitest configuration

If you do not already have a `vitest.config` file setup, you need to create one. In the `vitest.config` file, you will need the following `import` statements:

```js
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
```

Then, you will add the following within `defineWorkersConfig` to define the pool and its options:

```js
---
filename: vitest.config.js
---
export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: defineWorkersPoolOptions({
        isolatedStorage: true,
        wrangler: { configPath: "./wrangler.toml" },
      }),
    },
  },
});
```

Next, you will add configuration options via `defineWorkersPoolOptions` to support our tests.

### Add configuration options via Wrangler

You can reference a `wrangler.toml` file to leverage its `main` entry point, its compatibility settings, and its {<glossary-tooltip term_id="binding" link="/workers/configuration/bindings/">}}bindings{{</glossary-tooltip>}}.

```js
---
filename: vitest.config.js
highlight: [6]
---
export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: defineWorkersPoolOptions({
        isolatedStorage: true,
        wrangler: { configPath: "../wrangler.toml" },
      }),
    },
  },
});
```

{{<Aside type="note">}}

For a full list of available configuration options, refer to [Configuration](/workers/testing/vitest/configuration/).

{{</Aside>}}

### Add configuration options via Miniflare

Under the hood, the Workers Vitest integration uses [Miniflare](https://miniflare.dev), the same simulator that powers [`wrangler dev`'s](/workers/wrangler/commands/#dev) local mode. Options can be passed directly to Miniflare for advanced configuration.

For example, to add bindings that will be used in tests, you can add `miniflare` to `defineWorkersPoolOptions`:

```js
---
filename: vitest.config.js
highlight: [8-10]
---
export default defineWorkersConfig({
  test: {
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

For a full list of available Miniflare options, refer to the [Miniflare `WorkersOptions` API documentation](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions).

{{</Aside>}}

## Define types

If you are using TypeScript, you will need to define types for Cloudflare Workers and `cloudflare:test` to make sure they are detected appropriately. Add a `tsconfig.json` in the same folder as your tests (that is, `test`) and add the following:

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

Save this file, and you are ready to write your first test.

## Write tests

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

This Worker receives a request, and returns a response of `'Hello World!'`. In order to test this, create a `test` folder with the following test file:

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

Add functionality to handle a `404` path on the Worker. This functionality will return the text `Not found` as well as the status code `404`.

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

To test this, add the following to your test file:

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

- [`@cloudflare/vitest-pool-workers` GitHub repository](https://github.com/cloudflare/workers-sdk/tree/main/packages/vitest-pool-workers/test) - Examples of tests using the `@cloudflare/vitest-pool-workers` package.