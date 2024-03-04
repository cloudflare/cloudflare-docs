---
title: Configuration
pcx_content_type: reference
weight: 4
---

# Configuration

The Workers Vitest integration provides additional configuration on top of Vitest's usual options.
To configure the integration, use the `poolOptions.workers` key.
Use the `defineWorkersPoolOptions()` function from the `@cloudflare/vitest-pool-workers/config` module for type checking and completions.
An example configuration would be:

```ts
---
filename: vitest.config.ts
---
import { defineWorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    pool: "@cloudflare/vitest-pool-workers",
    poolOptions: {
      workers: defineWorkersPoolOptions({
        isolatedStorage: true,
        wrangler: {
          configPath: "./wrangler.toml"
        },
      }),
    },
  },
});
```

{{<Aside type="note">}}

Use the [`poolMatchGlobs` option](https://vitest.dev/config/#poolmatchglobs-0-29-4) to only use the Workers Vitest integration for certain tests.

{{</Aside>}}

{{<Aside type="warning">}}

Custom `environment`s or `runner`s are not supported when using the Workers Vitest integration.

{{</Aside>}}

## Functions

These are exported from the `@cloudflare/vitest-pool-workers/config` module.

{{<definitions>}}

- {{<code>}}defineWorkersPoolOptions(options:{{<param-type>}}WorkersPoolOptions | ((ctx: WorkersPoolOptionsContext) => WorkersPoolOptions | Promise\<WorkersPoolOptions>){{</param-type>}}){{</code>}}

  - Provide type checking and completions for `WorkersPoolOptions`, similar to [`defineConfig()`](https://vitest.dev/config/file.html) from Vitest.

{{</definitions>}}

## `WorkersPoolOptions`

{{<definitions>}}

- {{<code>}}main: {{<type>}}string{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Entrypoint to Worker run in the same isolate/context as tests. This is required to use `import { SELF } from "cloudflare:test"` for integration tests, or Durable Objects without an explicit `scriptName` if classes are defined in the same Worker. Note this goes through Vite transforms and can be a TypeScript file. Note also `import module from "<path-to-main>"` inside tests gives exactly the same `module` instance as is used internally for the `SELF` and Durable Object bindings. If `wrangler.configPath` is defined and this option isn't, it will be read from the `main` field in that configuration file.

- {{<code>}}isolatedStorage: {{<type>}}boolean{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}} — Defaults to `false`

  - Enables per-test isolated storage. If enabled, any writes to storage performed in a test will be undone at the end of the test. The test's storage environment is copied from the containing suite, meaning `beforeAll()` hooks can be used to seed data. If this is disabled, all tests will share the same storage. `.concurrent` tests are not supported when isolated storage is enabled. Refer to the [Isolation and concurrency](/workers/testing/vitest/internal-details/) page for more information on the isolation model.

    <details>
    <summary>Illustrative example</summary>

    ```ts
    import { env } from "cloudflare:test";
    import { beforeAll, beforeEach, describe, test, expect } from "vitest";

    // Get the current list stored in a KV namespace
    async function get(): Promise<string[]> {
      return await env.NAMESPACE.get("list", "json") ?? [];
    }
    // Add an item to the end of the list
    async function append(item: string) {
      const value = await get();
      value.push(item);
      await env.NAMESPACE.put("list", JSON.stringify(value));
    }

    beforeAll(() => append("all"));
    beforeEach(() => append("each"));

    test("one", async () => {
      // Each test gets its own storage environment copied from the parent
      await append("one");
      expect(await get()).toStrictEqual(["all", "each", "one"]);
    });
    // `append("each")` and `append("one")` undone
    test("two", async () => {
      await append("two");
      expect(await get()).toStrictEqual(["all", "each", "two"]);
    });
    // `append("each")` and `append("two")` undone

    describe("describe", async () => {
      beforeAll(() => append("describe all"));
      beforeEach(() => append("describe each"));

      test("three", async () => {
        await append("three");
        expect(await get()).toStrictEqual([
          // All `beforeAll()`s run before `beforeEach()`s
          "all", "describe all", "each", "describe each", "three"
        ]);
      });
      // `append("each")`, `append("describe each")` and `append("three")` undone
      test("four", async () => {
        await append("four");
        expect(await get()).toStrictEqual([
          "all", "describe all", "each", "describe each", "four"
        ]);
      });
      // `append("each")`, `append("describe each")` and `append("four")` undone
    });
    ```

    </details>

- {{<code>}}singleWorker: {{<type>}}boolean{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}} — Defaults to `false`

  - Runs all tests in this project serially in the same Worker, using the same module cache. This can significantly speed up execution if you have lots of small test files. Refer to the [Isolation and concurrency](/workers/testing/vitest/internal-details/) page for more information on the isolation model.

- {{<code>}}miniflare: {{<type>}}SourcelessWorkerOptions & { workers?: WorkerOptions[]; }{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Miniflare sourceless-[`WorkerOptions`](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) for configuring bindings and compatibility settings. Use the `main` option above to configure the entrypoint, instead of the Miniflare `script`, `scriptPath`, or `modules` options.<br><br>
    If your project makes use of multiple Workers, you can configure _auxiliary Workers_ that run in the same `workerd` process as your tests and can be bound to. Auxiliary Workers are configured using the `workers` array, containing regular Miniflare [`WorkerOptions`](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) objects. Note that unlike the `main` Worker, auxiliary Workers:
    - Cannot have TypeScript entrypoints—you must compile them to JavaScript first
    - Use regular Workers module resolution semantics—refer to the [Isolation and concurrency](/workers/testing/vitest/internal-details/#modules) page for more information
    - Cannot access the `cloudflare:test` module
    - Do not require specific compatibility dates or flags
    - Can be written with the [Service Worker syntax](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/#service-worker-syntax)
    - Are not affected by global mocks defined in your tests

- {{<code>}}wrangler: {{<type>}}{ configPath?: string; }{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Path to Wrangler configuration file to load `main`, compatibility settings and bindings from. These options will be merged with the `miniflare` option above, with `miniflare` values taking precedence. For example, if your Wrangler configuration defined a service binding named `SERVICE` to a worker named `service`, but you included `serviceBindings: { SERVICE(request) { return new Response("body"); } }` in the `miniflare` option, all requests to `SERVICE` in tests would return `body`. Note `configPath` accepts both `.toml` and `.json` files.

{{</definitions>}}

{{<Aside type="warning">}}

You must define a compatibility date of `2022-10-31` or higher, and include `nodejs_compat` in your compatibility flags to use the Workers Vitest integration.

{{</Aside>}}

## `WorkersPoolOptionsContext`

{{<definitions>}}

- {{<code>}}inject: {{<type>}}typeof import("vitest").inject{{</type>}}{{</code>}}

  - The same `inject()` function usually imported from the `vitest` module inside tests. This allows you to define `miniflare` config based on injected values from [`globalSetup`](https://vitest.dev/config/#globalsetup) scripts. Use this if you have a value in your configuration that is dynamically generated and only known at runtime of your tests. For example, a global setup script might start an upstream server on a random port. This port could be `provide()`d and then `inject()`ed in the configuration for an external service binding or Hyperdrive.

    <details>
    <summary>Illustrative example</summary>

    ```ts
    // env.d.ts
    declare module "vitest" {
      interface ProvidedContext {
        port: number;
      }
    }

    // global-setup.ts
    import type { GlobalSetupContext } from "vitest/node";
    export default function ({ provide }: GlobalSetupContext) {
      // Runs inside Node.js, could start server here...
      provide("port", 1337);
      return () => { /* ...then teardown here */ };
    }

    // vitest.config.ts
    import { defineWorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";
    import { defineConfig } from "vitest/config";
    export default defineConfig({
      test: {
        globalSetup: ["./global-setup.ts"],
        pool: "@cloudflare/vitest-pool-workers",
        poolOptions: {
          workers: defineWorkersPoolOptions(({ inject }) => ({
            miniflare: {
              hyperdrives: {
                DATABASE: `postgres://user:pass@example.com:${inject("port")}/db`,
              },
            },
          })),
        },
      },
    });
    ```

    </details>

{{</definitions>}}

## `SourcelessWorkerOptions`

Sourceless `WorkerOptions` type without `script`, `scriptPath`, or `modules` properties. Refer to the Miniflare [`WorkerOptions`](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) type for more details.

```ts
type SourcelessWorkerOptions = Omit<
	WorkerOptions,
	"script" | "scriptPath" | "modules" | "modulesRoot" | "modulesRule"
>;
```