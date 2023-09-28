---
pcx_content_type: configuration
title: API
weight: 2
---

# Wrangler API

Wrangler offers an experimental API to programmatically manage your Cloudflare Workers.

- [`unstable_dev`](#unstable_dev) - Start a server for running either end-to-end (e2e) or integration tests against your Worker.


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
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Hello World!"`);
    }
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
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Hello World!"`);
    }
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
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Hello World!"`);
    }
  });

  it("parentWorker should return Hello World by invoking the child worker", async () => {
    const resp = await parentWorker.fetch();
    if (resp) {
      const parsedResp = await resp.text();
      expect(parsedResp).toEqual("Parent worker sees: Hello World!");
    }
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
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Hello World!"`);
    }
  });

  it("parentWorker should return Hello World by invoking the child worker", async () => {
    const resp = await parentWorker.fetch();
    if (resp) {
      const parsedResp = await resp.text();
      expect(parsedResp).toEqual("Parent worker sees: Hello World!");
    }
  });
});
```
{{</tab>}}
{{</tabs>}}

