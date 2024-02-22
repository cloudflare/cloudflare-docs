---
title: Migrate from Miniflare 2's test environments
weight: 2
pcx_content_type: concept
---

# Migrate from Miniflare 2's test environments

Miniflare 2 provided custom environments for Jest and Vitest in the `jest-environment-miniflare` and `vitest-environment-miniflare` packages respectively.
The `@cloudflare/vitest-pool-workers` package provides similar functionality using modern Miniflare versions and the [`workerd` runtime](https://github.com/cloudflare/workerd).

{{<Aside type="warning">}}

Cloudflare no longer provides a Jest testing environment for Workers. If you previously used Jest, you will need to [migrate to Vitest](https://vitest.dev/guide/migration.html#migrating-from-jest) first, then follow the rest of this guide.

{{</Aside>}}

{{<Aside type="warning">}}

The Workers Vitest pool does not support testing Workers using the Service Worker format. Please [migrate to the ES modules format](/workers/reference/migrate-to-module-workers/) first.

{{</Aside>}}

## Setting up the pool

First, you will need to uninstall the old _environment_ and install the new _pool_. Vitest environments can only customise the global scope, whereas pools can run tests using a completely different _runtime_. In this case, the pool runs your tests inside [`workerd`](https://github.com/cloudflare/workerd) instead of Node.js.

```sh
$ npm uninstall vitest-environment-miniflare
$ npm install --save-dev --save-exact vitest@1.3.0
$ npm install --save-dev @cloudflare/vitest-pool-workers
```

After that, update your Vitest configuration file to use the pool instead. Most Miniflare configuration previously specified `environmentOptions` can be moved to `poolOptions.workers.miniflare` instead. Refer to [Miniflare's `WorkerOptions` interface](https://github.com/cloudflare/workers-sdk/blob/main/packages/miniflare/README.md#interface-workeroptions) for supported options and the [Miniflare version 2 to 3 migration guide](https://miniflare.dev/get-started/migrating#api-changes) for more information. If you relied on configuration stored in a `wrangler.toml` file, set `wrangler.configPath` too.

```diff
---
filename: vitest.config.js
---
+ import { defineWorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";
  import { defineConfig } from "vitest/config";

  export default defineConfig({
    test: {
-     environment: "miniflare",
-     environmentOptions: { ... },
+     pool: "@cloudflare/vitest-pool-workers",
+     poolOptions: {
+       workers: defineWorkersPoolOptions({
+         miniflare: { ... },
+         wrangler: { configPath: "./wrangler.toml" },
+       }),
+     },
    },
  });
```

If you are using TypeScript, update your `tsconfig.json` to include the correct ambient `types`:

```diff
---
filename: tsconfig.json
---
  {
    "compilerOptions": {
      ...,
      "types": [
        "@cloudflare/workers-types/experimental"
-       "vitest-environment-miniflare/globals"
+       "@cloudflare/vitest-pool-workers"
      ]
    },
  }
```

## Accessing bindings and isolated storage

To access bindings in your tests, use the new `env` helper from the `cloudflare:test` module.

```diff
---
filename: index.spec.js
---
  import { it } from "vitest";
+ import { env } from "cloudflare:test";

  it("does something", () => {
-   const env = getMiniflareBindings();
    // ...
  });
```

If your are using TypeScript, add an ambient `.d.ts` declaration file defining a `ProvidedEnv` `interface` in the `cloudflare:test` module to control the type of `env`:

```ts
---
filename: env.d.ts
---
declare module "cloudflare:test" {
  interface ProvidedEnv {
    NAMESPACE: KVNamespace;
  }
  // ...or if you have an existing `Env` type...
  interface ProvidedEnv extends Env {}
}
```

If you were previously using isolated storage, enable the `isolatedStorage` option in your Vitest configuration file and remove `setupMiniflareIsolatedStorage()` from your tests:

```diff
---
filename: vitest.config.js
---
  import { defineWorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";
  import { defineConfig } from "vitest/config";

  export default defineConfig({
    test: {
      pool: "@cloudflare/vitest-pool-workers",
      poolOptions: {
        workers: defineWorkersPoolOptions({
+         isolatedStorage: true,
          miniflare: { ... },
        }),
      },
    },
  });
```

```diff
---
filename: index.spec.js
---
- const describe = setupMiniflareIsolatedStorage();
+ import { describe } from "vitest";
```

## Waiting for `waitUntil()`ed `Promise`s

The `new ExecutionContext()` constructor and `getMiniflareWaitUntil()` function are now `createExecutionContext()` and `waitOnExecutionContext()` respectively. Note `waitOnExecutionContext()` now returns an empty `Promise<void>` instead of a `Promise` resolving to the results of all `waitUntil()`ed `Promise`s.

```diff
---
filename: index.spec.js
---
+ import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";

  it("does something", () => {
    // ...
-   const ctx = new ExecutionContext();
+   const ctx = createExecutionContext();
    const response = worker.fetch(request, env, ctx);
-   await getMiniflareWaitUntil(ctx);
+   await waitOnExecutionContext(ctx);
  });
```

## Mocking outbound requests

The `getMiniflareFetchMock()` function has been replaced with the new `fetchMock` helper from the `cloudflare:test` module. This has the same type as the return type of `getMiniflareFetchMock()`. There are a couple of differences between `fetchMock` and the previous return value of `getMiniflareFetchMock()`:

- `fetchMock` is deactivated by default, whereas previously it would start activated. You will need to call `fetchMock.activate()` before calling `fetch()` to enable it.
- `fetchMock` is reset at the start of each test run, whereas previously interceptors added in previous runs would apply to the current one.

```diff
---
filename: index.spec.js
---
  import { beforeAll, afterAll } from "vitest";
+ import { fetchMock } from "cloudflare:test";

- const fetchMock = getMiniflareFetchMock();
  beforeAll(() => {
+   fetchMock.activate();
    fetchMock.disableNetConnect();
    fetchMock
      .get("https://example.com")
      .intercept({ path: "/" })
      .reply(200, "data");
  });
  afterAll(() => fetchMock.assertNoPendingInterceptors());
```

## Using Durable Object helpers

The `getMiniflareDurableObjectStorage()`, `getMiniflareDurableObjectState()`, `getMiniflareDurableObjectInstance()`, and `runWithMiniflareDurableObjectGates()` functions have all been replaced with a single `runInDurableObject()` function from the `cloudflare:test` module. This functions accepts a `DurableObjectStub` with a callback accepting the Durable Object instance and corresponding `DurableObjectState` as arguments. Refer to the [Test APIs page](/workers/testing/vitest/test-apis/) for more details.

```diff
---
filename: index.spec.js
---
+ import { env, runInDurableObject } from "cloudflare:test";

  it("does something", async () => {
-   const env = getMiniflareBindings();
    const id = env.OBJECT.newUniqueId();
+   const stub = env.OBJECT.get(id);

-   const storage = await getMiniflareDurableObjectStorage(id);
-   doSomethingWith(storage);
+   await runInDurableObject(stub, async (instance, state) => {
+     doSomethingWith(state.storage);
+   });

-   const state = await getMiniflareDurableObjectState(id);
-   doSomethingWith(state);
+   await runInDurableObject(stub, async (instance, state) => {
+     doSomethingWith(state);
+   });

-   const instance = await getMiniflareDurableObjectInstance(id);
-   await runWithMiniflareDurableObjectGates(state, async () => {
-     doSomethingWith(instance);
-   });
+   await runInDurableObject(stub, async (instance) => {
+     doSomethingWith(instance);
+   });
  });
```

The `flushMiniflareDurableObjectAlarms()` function has been replaced with the `runDurableObjectAlarm()` function from the `cloudflare:test` module. This function accepts a single `DurableObjectStub` and returns a `Promise` that resolves to `true` if an alarm was scheduled and the `alarm()` handler was executed, or `false` otherwise. To "flush" multiple instances' alarms, call `runDurableObjectAlarm()` in a loop.

```diff
---
filename: index.spec.js
---
+ import { env, runDurableObjectAlarm } from "cloudflare:test";

  it("does something", async () => {
-   const env = getMiniflareBindings();
    const id = env.OBJECT.newUniqueId();
-   await flushMiniflareDurableObjectAlarms([id]);
+   const stub = env.OBJECT.get(id);
+   const ran = await runDurableObjectAlarm(stub);
  });
```

Finally, the `getMiniflareDurableObjectIds()` function has been replaced with the `listDurableObjectIds()` function from the `cloudflare:test` module. This function now accepts a `DurableObjectNamespace` instance instead of a namespace `string`. Note this function now respects isolated storage. If enabled, IDs of objects created in other tests will not be returned.

```diff
---
filename: index.spec.js
---
+ import { env, listDurableObjectIds } from "cloudflare:test";

  it("does something", async () => {
-   const ids = await getMiniflareDurableObjectIds("OBJECT");
+   const ids = await listDurableObjectIds(env.OBJECT);
  });
```