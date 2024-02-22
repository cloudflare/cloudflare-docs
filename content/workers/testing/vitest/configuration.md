---
title: Configuration
pcx_content_type: reference
weight: 4
---

# Configuration

The Workers Vitest pool provides additional configuration on top of Vitest's usual options.
All configuration exists under the `poolOptions.workers` key.
The `defineWorkersPoolOptions()` function from the `@cloudflare/vitest-pool-workers/config` module can optionally be used for type checking and completions.
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

Use the [`poolMatchGlobs` option](https://vitest.dev/config/#poolmatchglobs-0-29-4) to only use the Workers Vitest pool for certain tests.

{{</Aside>}}

{{<Aside type="warning">}}

Custom `environment`s or `runner`s are not supported when using the Workers Vitest pool.

{{</Aside>}}

## Functions

These are exported from the `@cloudflare/vitest-pool-workers/config` module.

{{<definitions>}}

- {{<code>}}defineWorkersPoolOptions(options:{{<param-type>}}WorkersPoolOptions | ((ctx: WorkersPoolOptionsContext) => WorkersPoolOptions | Promise\<WorkersPoolOptions>){{</param-type>}}): {{<type>}}WorkersPoolOptions | ((ctx: WorkersPoolOptionsContext) => WorkersPoolOptions | Promise\<WorkersPoolOptions>){{</type>}}{{</code>}}

  - An identity function that returns its input. This function exists to provide type checking and completions for `WorkersPoolOptions`, similar to `defineConfig()` from Vitest.

{{</definitions>}}

## `WorkersPoolOptions` definition

{{<definitions>}}

- {{<code>}}main: {{<type>}}string{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Entrypoint to Worker run in the same isolate/context as tests. This is required to use `import { SELF } from "cloudflare:test"`, or Durable Objects without an explicit `scriptName`. Note this goes through Vite transforms and can be a TypeScript file. Note also `import module from "<path-to-main>"` inside tests gives exactly the same `module` instance as is used internally for the `SELF` and Durable Object bindings. If `wrangler.configPath` is defined and this option isn't, it will be read from the `main` field in that configuration file.

- {{<code>}}isolatedStorage: {{<type>}}boolean{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Enables per-test isolated storage. If enabled, any writes to storage performed in a test will be undone at the end of the test. The test's storage environment is copied from the containing suite, meaning `beforeAll()` hooks can be used to seed data. If this is disabled, all tests will share the same storage. `.concurrent` tests are not supported when isolated storage is enabled. Defaults to `false`. Refer to the [Internal details](/workers/testing/vitest/internal-details/) page for more information on the isolation model.

    <details>
    <summary>Illustrative example</summary>

    ```ts
    import { env } from "cloudflare:test";
    import { beforeAll, beforeEach, describe, test, expect } from "vitest";

    // Get the current list stored in a KV namespace
    async function get(): Promise<string[]> {
      return await env.COUNTER.get("list", "json") ?? [];
    }
    // Add an item to the end of the list
    async function append(item: string) {
      const value = await get();
      value.push(item);
      await env.COUNTER.put("list", JSON.stringify(value));
    }

    beforeAll(() => append("all"));
    beforeEach(() => append("each"));

    test("one", async () => {
      // Each test gets it's own storage environment copied from the parent
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

- {{<code>}}singleWorker: {{<type>}}boolean{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Runs all tests in this project serially in the same Worker, using the same module cache. This can significantly speed up execution if you have lots of small test files. Defaults to `false`. Refer to the [Internal details](/workers/testing/vitest/internal-details/) page for more information on the isolation model.

- {{<code>}}miniflare: {{<type>}}SourcelessWorkerOptions & { workers?: WorkerOptions[]; }{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Miniflare sourceless-[`WorkerOptions`](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) for configuring bindings and compatibility settings. Use the `main` option above to configure the entrypoint.<br><br>
    Auxiliary Workers can be configured using the `workers` array, containing regular Miniflare [`WorkerOptions`](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) objects. Note that auxiliary Workers cannot have TypeScript entrypoints—you must compile them to JavaScript first.

- {{<code>}}wrangler: {{<type>}}{ configPath?: string; }{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Path to Wrangler configuration file to load `main`, compatibility settings and bindings from. These options will be merged with the `miniflare` option above, with `miniflare` values taking precedence. For example, if your Wrangler configuration defined a service binding named `SERVICE` to a worker named `service`, but you included `serviceBindings: { SERVICE(request) { return new Response("body"); } }` in the `miniflare` option, all requests to `SERVICE` in tests would return `body`. Note `configPath` accepts both `.toml` and `.json` files.

{{</definitions>}}

{{<Aside type="warning">}}

You must define a compatibility date of `2022-10-31` or higher, and include `nodejs_compat` in your compatibility flags to use the Workers Vitest pool.

{{</Aside>}}

## `WorkersPoolOptionsContext` definition

{{<definitions>}}

- {{<code>}}inject: {{<type>}}typeof import("vitest").inject{{</type>}}{{</code>}}

  - The same `inject()` function usually imported from the `vitest` module inside tests. This allows you to define `miniflare` config based on injected values from [`globalSetup`](https://vitest.dev/config/#globalsetup) scripts. For example, a global setup script might start an upstream server on a random port. This port could be `provide()`d and then `inject()`ed in the configuration for an external service binding or Hyperdrive.

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

## `SourcelessWorkerOptions` definition

Refer to the Miniflare [`WorkerOptions`](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) type for more details.

```ts
type SourcelessWorkerOptions = Omit<
	WorkerOptions,
	"script" | "scriptPath" | "modules" | "modulesRoot" | "modulesRule"
>;
```