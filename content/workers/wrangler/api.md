---
pcx_content_type: how-to
title: API
weight: 12
---

# Wrangler API

Wrangler offers an experimental API to programmatically manage your Cloudflare Workers.

- [`unstable_dev`](#unstable_dev) - Start a local server for running integration tests against your Worker.


## unstable_dev

Start a local HTTP server for testing your Worker. 

Once called, `unstable_dev` will return a `fetch()` function for invoking your Worker without needing to know the address or port, as well as a `stop()` function to shut down the HTTP server.

{{<Aside type="note">}}

The `unstable_dev()` function has an `unstable_` prefix because the API may change in the future. 

There are no known bugs at the moment and it is safe to use. If you discover any bugs, please open a [GitHub Issue](https://github.com/cloudflare/wrangler2/issues/new/choose) and we will review the issue.


{{</Aside>}}

### Constructor

```js
const worker = await unstable_dev(script, options, apiOptions)
```

### Parameters

{{<definitions>}}

*   `script` {{<type>}}string{{</type>}}

    *   A string containing a path to your Worker script.

*   `options` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Optional options object containing `wrangler dev` configuration settings.

*   `apiOptions` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Optional API options object containing `disableExperimentalWarning`. Set `disableExperimentalWarning` to true to disable Wrangler's warning about using `unstable_` prefixed APIs.

{{</definitions>}}

### Return Type

`unstable_dev()` returns an object containing the following methods:

{{<definitions>}}

*   `fetch()` {{<type>}}Promise\<Response>{{</type>}}

    *   Send a request to your Worker. Returns a Promise that resolves with a [`Response`](/workers/runtime-apis/response) object.

*   `stop()` {{<type>}}Promise\<void>{{</type>}}

    *   Shuts down the dev server. 

{{</definitions>}}

### Usage

When initiating each test suite, use a `beforeAll()` function to start `unstable_dev()`. The `beforeAll()` function is used to minimize overhead: starting the dev server takes a few hundred milliseconds, starting and stopping for each individual test adds up quickly, slowing your tests down.

In each test case, call `await worker.fetch()`, and check that the response is what you expect. 

To wrap up a test suite, call `await worker.stop()` in an `afterAll` function.

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
		worker = await unstable_dev(
			"src/index.js",
			{},
			{ disableExperimentalWarning: true }
		);
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
		worker = await unstable_dev(
			"src/index.ts",
			{},
			{ disableExperimentalWarning: true }
		);
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

