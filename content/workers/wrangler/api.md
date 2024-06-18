---
pcx_content_type: configuration
title: API
weight: 2
meta:
  description: A set of programmatic APIs that can be integrated with local Cloudflare Workers-related workflows.
---

# Wrangler API

Wrangler offers APIs to programmatically interact with your Cloudflare Workers.

- [`unstable_dev`](#unstable_dev) - Start a server for running either end-to-end (e2e) or integration tests against your Worker.
- [`getPlatformProxy`](#getplatformproxy) - Get proxies and values for emulating the Cloudflare Workers platform in a Node.js process.

## `unstable_dev`

Start an HTTP server for testing your Worker.

Once called, `unstable_dev` will return a `fetch()` function for invoking your Worker without needing to know the address or port, as well as a `stop()` function to shut down the HTTP server.

By default, `unstable_dev` will perform integration tests against a local server. If you wish to perform an e2e test against a preview Worker, pass `local: false` in the `options` object when calling the `unstable_dev()` function. Note that e2e tests can be significantly slower than integration tests.

{{<Aside type="note">}}

The `unstable_dev()` function has an `unstable_` prefix because the API is experimental and may change in the future.

`unstable_dev()` has no known bugs and is safe to use. If you discover any bugs, open a [GitHub issue](https://github.com/cloudflare/workers-sdk/issues/new/choose).

{{</Aside>}}

### Constructor

```js
const worker = await unstable_dev(script, options)
```

### Parameters

{{<definitions>}}

*   `script` {{<type>}}string{{</type>}}

    *   A string containing a path to your Worker script, relative to your Worker project's root directory.

*   `options` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Optional options object containing `wrangler dev` configuration settings.
    *   Include an `experimental` object inside `options` to access experimental features such as `disableExperimentalWarning`.
        *   Set `disableExperimentalWarning` to `true` to disable Wrangler's warning about using `unstable_` prefixed APIs.

{{</definitions>}}

### Return Type

`unstable_dev()` returns an object containing the following methods:

{{<definitions>}}

*   `fetch()` {{<type>}}Promise\<Response>{{</type>}}

    *   Send a request to your Worker. Returns a Promise that resolves with a [`Response`](/workers/runtime-apis/response) object.
    *   Refer to [`Fetch`](/workers/runtime-apis/fetch/).


*   `stop()` {{<type>}}Promise\<void>{{</type>}}

    *   Shuts down the dev server.

{{</definitions>}}

### Usage

When initiating each test suite, use a `beforeAll()` function to start `unstable_dev()`. The `beforeAll()` function is used to minimize overhead: starting the dev server takes a few hundred milliseconds, starting and stopping for each individual test adds up quickly, slowing your tests down.

In each test case, call `await worker.fetch()`, and check that the response is what you expect.

To wrap up a test suite, call `await worker.stop()` in an `afterAll` function.

#### Single Worker example

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: src/index.test.js
---
const { unstable_dev } = require("wrangler");

describe("Worker", () => {
  let worker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.js", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return Hello World", async () => {
    const resp = await worker.fetch();
    const text = await resp.text();
    expect(text).toMatchInlineSnapshot(`"Hello World!"`);
  });
});
```
{{</tab>}}
{{<tab label="ts" >}}
```ts
---
filename: src/index.test.ts
---
import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return Hello World", async () => {
    const resp = await worker.fetch();
    const text = await resp.text();
    expect(text).toMatchInlineSnapshot(`"Hello World!"`);
  });
});
```
{{</tab>}}
{{</tabs>}}


#### Multi-Worker example

You can test Workers that call other Workers. In the below example, we refer to the Worker that calls other Workers as the parent Worker, and the Worker being called as a child Worker.

If you shut down the child Worker prematurely, the parent Worker will not know the child Worker exists and your tests will fail.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: src/index.test.js
---
import { unstable_dev } from "wrangler";

describe("multi-worker testing", () => {
  let childWorker;
  let parentWorker;

  beforeAll(async () => {
    childWorker = await unstable_dev("src/child-worker.js", {
      config: "src/child-wrangler.toml",
      experimental: { disableExperimentalWarning: true },
    });
    parentWorker = await unstable_dev("src/parent-worker.js", {
      config: "src/parent-wrangler.toml",
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await childWorker.stop();
    await parentWorker.stop();
  });

  it("childWorker should return Hello World itself", async () => {
    const resp = await childWorker.fetch();
    const text = await resp.text();
    expect(text).toMatchInlineSnapshot(`"Hello World!"`);
  });

  it("parentWorker should return Hello World by invoking the child worker", async () => {
    const resp = await parentWorker.fetch();
    const parsedResp = await resp.text();
    expect(parsedResp).toEqual("Parent worker sees: Hello World!");
  });
});
```
{{</tab>}}
{{<tab label="ts" >}}
```ts
---
filename: src/index.test.ts
---
import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";

describe("multi-worker testing", () => {
  let childWorker: UnstableDevWorker;
  let parentWorker: UnstableDevWorker;

  beforeAll(async () => {
    childWorker = await unstable_dev("src/child-worker.js", {
      config: "src/child-wrangler.toml",
      experimental: { disableExperimentalWarning: true },
    });
    parentWorker = await unstable_dev("src/parent-worker.js", {
      config: "src/parent-wrangler.toml",
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await childWorker.stop();
    await parentWorker.stop();
  });

  it("childWorker should return Hello World itself", async () => {
    const resp = await childWorker.fetch();
    const text = await resp.text();
    expect(text).toMatchInlineSnapshot(`"Hello World!"`);
  });

  it("parentWorker should return Hello World by invoking the child worker", async () => {
    const resp = await parentWorker.fetch();
    const parsedResp = await resp.text();
    expect(parsedResp).toEqual("Parent worker sees: Hello World!");
  });
});
```
{{</tab>}}
{{</tabs>}}

## `getPlatformProxy`

The `getPlatformProxy` function provides a way to obtain an object containing proxies (to **local** `workerd` bindings) and emulations of Cloudflare Workers specific values, allowing the emulation of such in a Node.js process.

{{<Aside type="warning">}}

`getPlatformProxy` is, by design, to be used exclusively in Node.js applications. `getPlatformProxy` cannot be run inside the Workers runtime.

{{</Aside>}}

One general use case for getting a platform proxy is for emulating bindings in applications targeting Workers, but running outside the Workers runtime (for example, framework local development servers running in Node.js), or for testing purposes (for example, ensuring code properly interacts with a type of binding).

{{<Aside type="note">}}

Binding proxies provided by this function are a best effort emulation of the real production bindings. Although they are designed to be as close as possible to the real thing, there might be slight differences and inconsistencies between the two.

{{</Aside>}}

### Syntax

```js
const platform = await getPlatformProxy(options);
```

### Parameters

{{<definitions>}}

*   `options` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Optional options object containing preferences for the bindings:

        * `environment` {{<type>}}string{{</type>}}

          The environment to use.

        * `configPath` {{<type>}}string{{</type>}}

          The path to the configuration object to use (default `wrangler.toml`).

        * `experimentalJsonConfig` {{<type>}}boolean{{</type>}}

          If `true`, allows the utility to read a JSON config file (for example, `wrangler.json`).

        * `persist` {{<type>}}boolean | { path: string }{{</type>}}

          Indicates if and where to persist the bindings data. If `true` or `undefined`, defaults to the same location used by Wrangler, so data can be shared between it and the caller. If `false`, no data is persisted to or read from the filesystem.

          **Note:** If you use `wrangler`'s `--persist-to` option, note that this option adds a sub directory called `v3` under the hood while `getPlatformProxy`'s `persist` does not. For example, if you run `wrangler dev --persist-to ./my-directory`, to reuse the same location using `getPlatformProxy`, you will have to specify: `persist: "./my-directory/v3"`.

{{</definitions>}}

### Return Type

`getPlatformProxy()` returns a `Promise` resolving to an object containing the following fields.

{{<definitions>}}

*   `env` {{<type>}}Record<string, unknown>{{</type>}}

    *   Object containing proxies to bindings that can be used in the same way as production bindings. This matches the shape of the `env` object passed as the second argument to modules-format workers. These proxy to binding implementations run inside `workerd`.
    *   Typescript Tip: `getPlatformProxy<Env>()` is a generic function. You can pass the shape of the bindings record as a type argument to get proper types without `unknown` values.

*   `cf` {{<type-link href="/workers/runtime-apis/request/#incomingrequestcfproperties">}}IncomingRequestCfProperties{{</type-link>}} {{<prop-meta>}}read-only{{</prop-meta>}}

    * Mock of the `Request`'s `cf` property, containing data similar to what you would see in production.

*   `ctx` {{<type>}}object{{</type>}}

    * Mock object containing implementations of the [`waitUntil`](/workers/runtime-apis/context/#waituntil) and [`passThroughOnException`](/workers/runtime-apis/context/#passthroughonexception) functions that do nothing.

*   `caches` {{<type>}}object{{</type>}}

    *   Emulation of the [Workers `caches` runtime API](/workers/runtime-apis/cache/).
    *   For the time being, all cache operations do nothing. A more accurate emulation will be made available soon.

*   `dispose()` {{<type>}}() => Promise\<void>{{</type>}}

    *   Terminates the underlying `workerd` process.
    *   Call this after the platform proxy is no longer required by the program. If you are running a long running process (such as a dev server) that can indefinitely make use of the proxy, you do not need to call this function.

{{</definitions>}}


### Usage

The `getPlatformProxy` function uses bindings found in `wrangler.toml`. For example, if you have an [environment variable](/workers/configuration/environment-variables/#add-environment-variables-via-wrangler) configuration set up in `wrangler.toml`:

```js
[vars]
MY_VARIABLE = "test"
```

You can access the bindings by importing `getPlatformProxy` like this:

```js
import { getPlatformProxy } from "wrangler";

const { env } = await getPlatformProxy();
```

To access the value of the `MY_VARIABLE` binding add the following to your code:

```js
console.log(`MY_VARIABLE = ${env.MY_VARIABLE}`);
```

This will print the following output: `MY_VARIABLE = test`.

### Supported bindings

All supported bindings found in your `wrangler.toml` are available to you via `env`.

The bindings supported by `getPlatformProxy` are:

 * [Environment variables](/workers/configuration/environment-variables/)

 * [Service bindings](/workers/runtime-apis/bindings/service-bindings/)

 * [KV namespace bindings](/kv/api/)

 * [Durable Object bindings](/durable-objects/api/)

     * To use a Durable Object binding with `getPlatformProxy`, always [specify a `script_name`](/workers/wrangler/configuration/#durable-objects) and have the target Worker run in a separate terminal via [`wrangler dev`](/workers/wrangler/commands/#dev).

        For example, you might have the following file read by `getPlatformProxy`.

        ```toml
        ---
        filename: wrangler.toml
        ---
        [[durable_objects.bindings]]
        name = "MyDurableObject"
        class_name = "MyDurableObject"
        script_name = "my-worker"
        ```

        In order for this binding to be successfully proxied by `getPlatformProxy`, a worker named `my-worker`
        with a Durable Object declaration using the same `class_name` of `"MyDurableObject"` must be run
        separately via `wrangler dev`.


 * [R2 bucket bindings](/r2/api/workers/workers-api-reference/)

 * [Queue bindings](/queues/configuration/javascript-apis/)

 * [D1 database bindings](/d1/build-with-d1/d1-client-api/)

 * [Workers AI bindings](/workers-ai/get-started/workers-wrangler/#2-connect-your-worker-to-workers-ai)

    * To use the `AI` binding with `getPlatformProxy`, you need to set the `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` environment variables to your Cloudflare [account ID](/fundamentals/setup/find-account-and-zone-ids/) and a [Workers AI enabled API token](/workers-ai/get-started/rest-api/#1-get-api-token-and-account-id) respectively.

    {{<render file="_ai-local-usage-charges.md" productFolder="workers">}}

