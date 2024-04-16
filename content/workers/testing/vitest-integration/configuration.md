---
title: Configuration
pcx_content_type: reference
weight: 4
---

# Configuration

The Workers Vitest integration provides additional configuration on top of Vitest's usual options. To configure the Workers Vitest integration, use the `poolOptions.workers` key. Use the [`defineWorkersConfig()`](/workers/testing/vitest-integration/configuration/#functions) function from the `@cloudflare/vitest-pool-workers/config` module for type checking and completions.

An example configuration would be:

```ts
---
filename: vitest.config.ts
---
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: {
          configPath: "./wrangler.toml"
        },
      },
    },
  },
});
```

{{<Aside type="note">}}

Use [Vitest Workspaces](https://vitest.dev/guide/workspace) to only use the Workers Vitest integration for certain tests.

{{</Aside>}}

{{<Aside type="warning">}}

Custom `environment`s or `runner`s are not supported when using the Workers Vitest integration.

{{</Aside>}}

## Functions

The following functions are exported from the `@cloudflare/vitest-pool-workers/config` module.

{{<definitions>}}

- {{<code>}}defineWorkersConfig(options:{{<param-type>}}UserConfig & { test?: { poolOptions?: { workers?: WorkersPoolOptions | ((ctx: WorkerPoolOptionsContext) => Awaitable\<WorkersPoolOptions>) } } }{{</param-type>}}){{</code>}}

  - Ensures Vitest is configured to use the Workers integration with the correct module resolution settings, and provides type checking for `WorkersPoolOptions`. This should be used in place of the [`defineConfig()`](https://vitest.dev/config/file.html) function from Vitest. The `defineWorkersConfig()` function also accepts a `Promise` of `options`, or an optionally-`async` function returning `options`.

- {{<code>}}defineWorkersProject(options:{{<param-type>}}UserWorkspaceConfig & { test?: { poolOptions?: { workers?: WorkersPoolOptions | ((ctx: WorkerPoolOptionsContext) => Awaitable\<WorkersPoolOptions>) } } }{{</param-type>}}){{</code>}}

  - Ensures Vitest is configured to use the Workers integration with the correct module resolution settings, and provides type checking for `WorkersPoolOptions`. This should be used in place of the [`defineProject()`](https://vitest.dev/guide/workspace) function from Vitest. The `defineWorkersProject()` function also accepts a `Promise` of `options`, or an optionally-`async` function returning `options`.

- {{<code>}}readD1Migrations(migrationsPath:{{<param-type>}}string{{</param-type>}}){{</code>}}: {{<type>}}D1Migration[]{{</type>}}

  - Reads all [D1 migrations](/d1/reference/migrations/) stored at `migrationsPath` and returns them ordered by migration number. Each migration will have its contents split into an array of individual SQL queries. Call the [`applyD1Migrations()`](/workers/testing/vitest-integration/test-apis/#d1) function inside a test or [setup file](https://vitest.dev/config/#setupfiles) to apply migrations. Refer to the [D1&nbsp;recipe](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/d1) for an example project using migrations.

{{</definitions>}}

## `WorkersPoolOptions`

{{<definitions>}}

- {{<code>}}main{{</code>}}: {{<type>}}string{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}

  - Entry point to Worker run in the same isolate/context as tests. This option is required to use `import { SELF } from "cloudflare:test"` for integration tests, or Durable Objects without an explicit `scriptName` if classes are defined in the same Worker. This file goes through Vite transforms and can be TypeScript. Note that `import module from "<path-to-main>"` inside tests gives exactly the same `module` instance as is used internally for the `SELF` and Durable Object bindings. If `wrangler.configPath` is defined and this option is not, it will be read from the `main` field in that configuration file.

- {{<code>}}isolatedStorage{{</code>}}: {{<type>}}boolean{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}

  - Enables per-test isolated storage. If enabled, any writes to storage performed in a test will be undone at the end of the test. The test's storage environment is copied from the containing suite, meaning `beforeAll()` hooks can be used to seed data. If this option is disabled, all tests will share the same storage. `.concurrent` tests are not supported when isolated storage is enabled. Refer to the [Isolation and concurrency](/workers/testing/vitest-integration/isolation-and-concurrency/) page for more information on the isolation model.

  - Defaults to `true`.

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

- {{<code>}}singleWorker{{</code>}}: {{<type>}}boolean{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}

  - Runs all tests in this project serially in the same Worker, using the same module cache. This can significantly speed up execution if you have lots of small test files. Refer to the [Isolation and concurrency](/workers/testing/vitest-integration/isolation-and-concurrency/) page for more information on the isolation model.

  - Defaults to `false`.

- {{<code>}}miniflare{{</code>}}: {{<type>}}SourcelessWorkerOptions & { workers?: WorkerOptions[]; }{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}

  - Use this to provide configuration information that is typically stored within the Wrangler configuration file, such as [bindings](/workers/runtime-apis/bindings/), [compatibility dates](/workers/configuration/compatibility-dates/), and [compatibility flags](/workers/configuration/compatibility-dates/#compatibility-flags). The `WorkerOptions` interface is defined [here](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions). Use the `main` option above to configure the entry point, instead of the Miniflare `script`, `scriptPath`, or `modules` options.

  - If your project makes use of multiple Workers, you can configure auxiliary Workers that run in the same `workerd` process as your tests and can be bound to. Auxiliary Workers are configured using the `workers` array, containing regular Miniflare [`WorkerOptions`](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare#interface-workeroptions) objects. Note that unlike the `main` Worker, auxiliary Workers:
    - Cannot have TypeScript entrypoints. You must compile auxiliary Workers to JavaScript first. You can use the [`wrangler deploy --dry-run --outdir dist`](/workers/wrangler/commands/#deploy) command for this.
    - Use regular Workers module resolution semantics. Refer to the [Isolation and concurrency](/workers/testing/vitest-integration/isolation-and-concurrency/#modules) page for more information.
    - Cannot access the [`cloudflare:test`](/workers/testing/vitest-integration/test-apis/) module.
    - Do not require specific compatibility dates or flags.
    - Can be written with the [Service Worker syntax](/workers/reference/migrate-to-module-workers/#service-worker-syntax).
    - Are not affected by global mocks defined in your tests.

- {{<code>}}wrangler{{</code>}}: {{<type>}}{ configPath?: string; }{{</type>}}{{<prop-meta>}}optional{{</prop-meta>}}

  - Path to Wrangler configuration file to load `main`, [compatibility settings](/workers/configuration/compatibility-dates/) and [bindings](/workers/runtime-apis/bindings/) from. These options will be merged with the `miniflare` option above, with `miniflare` values taking precedence. For example, if your Wrangler configuration defined a [service binding](/workers/runtime-apis/bindings/service-bindings/) named `SERVICE` to a Worker named `service`, but you included `serviceBindings: { SERVICE(request) { return new Response("body"); } }` in the `miniflare` option, all requests to `SERVICE` in tests would return `body`. Note `configPath` accepts both `.toml` and `.json` files.

{{</definitions>}}

{{<Aside type="warning">}}

You must define a compatibility date of `2022-10-31` or higher, and include [`nodejs_compat` in your compatibility flags](/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) to use the Workers Vitest integration.

{{</Aside>}}

## `WorkersPoolOptionsContext`

{{<definitions>}}

- {{<code>}}inject{{</code>}}: {{<type>}}typeof import("vitest").inject{{</type>}}

  - The same `inject()` function usually imported from the `vitest` module inside tests. This allows you to define `miniflare` configuration based on injected values from [`globalSetup`](https://vitest.dev/config/#globalsetup) scripts. Use this if you have a value in your configuration that is dynamically generated and only known at runtime of your tests. For example, a global setup script might start an upstream server on a random port. This port could be `provide()`d and then `inject()`ed in the configuration for an external service binding or [Hyperdrive](/hyperdrive/). Refer to the [Hyperdrive&nbsp;recipe](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/hyperdrive) for an example project using this provide/inject approach.

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
    import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
    export default defineWorkersConfig({
      test: {
        globalSetup: ["./global-setup.ts"],
        pool: "@cloudflare/vitest-pool-workers",
        poolOptions: {
          workers: ({ inject }) => ({
            miniflare: {
              hyperdrives: {
                DATABASE: `postgres://user:pass@example.com:${inject("port")}/db`,
              },
            },
          }),
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
	"script" | "scriptPath" | "modules" | "modulesRoot"
>;
```
