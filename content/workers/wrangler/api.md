---
pcx_content_type: configuration
title: API
weight: 2
meta:
  description: An experimental API to programmatically manage your Cloudflare Workers.
---

# Wrangler API

Wrangler offers APIs to programmatically interact with your Cloudflare Workers.

- [`unstable_dev`](#unstable_dev) - Start a server for running either end-to-end (e2e) or integration tests against your Worker.
- [`getBindingsProxy`](#getbindingsproxy) - Get [bindings](/workers/configuration/bindings/) via Wrangler and use them in your code.

## `unstable_dev`

Start an HTTP server for testing your Worker.

Once called, `unstable_dev` will return a `fetch()` function for invoking your Worker without needing to know the address or port, as well as a `stop()` function to shut down the HTTP server.

By default, `unstable_dev` will perform integration tests against a local server. If you wish to perform an e2e test against a preview Worker, pass `local: false` in the `options` object when calling the `unstable_dev()` function. Note that e2e tests can be significantly slower than integration tests.

{{<Aside type="note">}}

The `unstable_dev()` function has an `unstable_` prefix because the API may change in the future.

There are no known bugs at the moment and it is safe to use. If you discover any bugs, please open a [GitHub Issue](https://github.com/cloudflare/workers-sdk/issues/new/choose) and we will review the issue.


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

## `getBindingsProxy`

The `getBindingsProxy` function is used to get a proxy for **local** `workerd` bindings that can be then used in code running via Node.js processes for Workers and Pages projects.

This can be useful for emulating bindings access for applications that would otherwise not have it during local development (such as full stack applications running in a Node.js dev server) or for testing purposes (such as for making sure that a certain function properly interacts with a certain type of binding).

{{<Aside type="note">}}

Please keep in mind that the binding proxies provided by the function are a best effort emulation of the real production bindings, although they are made to be as close as possible to the real thing there might be slight differences and inconsistencies between the two.

{{</Aside>}}

### Syntax

```js
const bindingsProxy = await getBindingsProxy(options);
```

### Parameters

{{<definitions>}}

*   `options` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Optional options object containing preferences for the bindings, such are:
        * `configPath` {{<type>}}string{{</type>}}

          The path to the config object to use (default `wrangler.toml`)

        * `experimentalJsonConfig` {{<type>}}boolean{{</type>}}

          Flag requiring the utility to read a json config file (`wrangler.json`), if present, instead of the toml one (`wrangler.toml`)

        * `persist` {{<type>}}boolean | { path: string }{{</type>}}

          Indicates if and where to persist the bindings data, if not present or `true` it defaults to the same location
          used by wrangler v3: `.wrangler/state/v3` (so that the same data can be easily used by the caller and wrangler).
          If `false` is specified no data is persisted on the filesystem.

{{</definitions>}}

### Return Type

`getBindingsProxy()` returns a promise to an object containing the following fields:

{{<definitions>}}

*   `bindings` {{<type>}}Record<string, unknown>{{</type>}}

    *   The actual bindings proxies, such can be used exactly in the same manner production bindings would. They proxy to binding implementations run inside a `workerd` instance (run by Miniflare).
    *   Typescript Tip: `getBindingsProxy` is a generic function, you can specify to it the shape of the bindings record in order to have a more proper type without `unknown` values.

*   `caches` {{<type>}}object{{</type>}}

    *   Emulation of the [workers `caches` runtime API](https://developers.cloudflare.com/workers/runtime-apis/cache/).
    *   For the time being such emulation is a no-operation one, a more accurate emulation will be made available soon.

*   `dispose()` {{<type>}}() => Promise\<void>{{</type>}}

    *   Function to be called to terminate the underlying workerd process.
    *   Only needed after the bindings proxy is no longer required the the program, if you are running a long running process (such as a dev server) that can indefinitely make sure of the bindings you don't need to use this function.

{{</definitions>}}


### Usage

The `getBindingsProxy` function uses bindings found in `wrangler.toml`. For example, if you have an [environment variable](/workers/configuration/environment-variables/#add-environment-variables-via-wrangler) configuration set up in `wrangler.toml`:

```js
[vars]
MY_VARIABLE = "test"
```

You can access the bindings by importing `getBindingsProxy` like this:

```js
import { getBindingsProxy } from "wrangler";

const { bindings } = await getBindingsProxy();
```

To access the value of the `MY_VARIABLE` binding add the following to your code:

```js
console.log(`MY_VARIABLE = ${bindings['MY_VARIABLE']}`);
```

which would print the following output: `MY_VARIABLE = test`

### Supported bindings

All supported bindings found in your `wrangler.toml` are available to you via `bindings`.

The bindings supported by `getBindingsProxy` are:

 * [Environmental variables](/workers/wrangler/configuration/#environmental-variables)

 * [Service bindings](/workers/configuration/bindings/#service-bindings)

 * [KV namespace bindings](/workers/configuration/bindings/#kv-namespace-bindings)

 * [Durable Object bindings](/workers/configuration/bindings/#durable-object-bindings)

 * [R2 bucket bindings](/workers/configuration/bindings/#r2-bucket-bindings)

 * [Queue bindings](/workers/configuration/bindings/#queue-bindings)

 * [D1 database bindings](/workers/configuration/bindings/#d1-database-bindings)

 * [Workers AI bindings](/workers/configuration/bindings/#workers-ai-bindings)

    * __Important__: When using the AI binding locally, computation still happens on the Cloudflare servers in
      the exact same way it would happen for an actual deployment, thus usage of this particular binding
      incurs usage charges even in local development

    * In order to use the `AI` binding you will need to set up two environment variables:
      `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`, which values are, respectively,
      your Cloudflare [account ID](/fundamentals/setup/find-account-and-zone-ids/) and a Workers AI enabled API token (which you can generate as presented in the [Workers AI documentation](/workers-ai/get-started/rest-api/#1-get-an-api-token))

