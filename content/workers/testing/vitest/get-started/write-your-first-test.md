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
- Install [Vitest](https://vitest.dev/) `1.1.3` or later

## Install `@cloudflare/vitest-pool-workers`

Open a terminal window and make sure you are in your project's root directory. Once you have confirmed that, run:

```sh
$ npm install @cloudflare/vitest-pool-workers --save-dev
```

This will add the package to your `package.json` file and install it as a dev dependency.

## Define Vitest Configuration

Next, if you don't already have a `vitest.config` file setup, you'll need to create one. In that file, you'll need the following `import` statements:

```js
import { defineWorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";
import { defineConfig } from "vitest/config";
```

Then, you will add the following within `defineConfig` to define the pool and its options:

```js
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

This tells Vitest which pool you are using (ie. `@cloudflare/vitest-pool-workers`). Next, we will add options via `defineWorkersPoolOptions` to support our first test:

```js
---
highlight: [6-7]
---
export default defineConfig({
  test: {
    pool: "@cloudflare/vitest-pool-workers",
    poolOptions: {
      workers: defineWorkersPoolOptions({
        main: "../src/worker.ts",
        isolatedStorage: true
      }),
    },
  },
});
```

`main` should be the path to the main entrypoint for your worker. `isolatedStorage` ensures that any writes to storage performed in a test will be undone at the end of the test.

### Configure Bindings

[Miniflare](https://miniflare.dev), which also powers [Wrangler's](/workers/wrangler/) local bindings, can be used for advanced configuration.

For example, to add bindings that will be used in tests, you can add `miniflare` to `defineWorkersPoolOptions` like this:

```js
---
highlight: [8-10]
---
export default defineConfig({
  test: {
    pool: "@cloudflare/vitest-pool-workers",
    poolOptions: {
      workers: defineWorkersPoolOptions({
        isolatedStorage: true,
        main: "./src/index.ts",
        miniflare: {
          kvNamespaces: ["TEST_NAMESPACE"],
        },
      }),
    },
  },
});
```

This configuration would add a KV namespace `TEST_NAMESPACE` for you to use in tests. 

{{<Aside type="note">}}

Additional configuration options like Durable Objects and service bindings can be found in the `@cloudflare/vitest-pool-workers` [repo examples](https://github.com/cloudflare/workers-sdk/tree/main/packages/vitest-pool-workers/test).

{{</Aside>}}

## Define Types

If you're using TypeScript, you'll need to define types for Cloudflare and `cloudflare:test` to make sure they are detected appropriately. Add a `tsconfig.json` in the same folder as your tests and add the following:

```js
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



## Related resources

- More examples of tests using this package can be found in the `@cloudflare/vitest-pool-workers` [repo](https://github.com/cloudflare/workers-sdk/tree/main/packages/vitest-pool-workers/test)
