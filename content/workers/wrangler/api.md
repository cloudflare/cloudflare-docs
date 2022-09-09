---
pcx_content_type: how-to
title: API
weight: 12
---

# Wrangler API

Wrangler offers an experimental API to programmatically manage your Cloudflare Workers

- [`unstable_dev`](#unstable_dev) - Start a local server for running integration tests against your Worker.


## unstable_dev

Start a local HTTP server for testing your Worker. 

Once called, `unstable_dev` will return a `fetch` function for invoking your Worker without needing to know the address or port, as well as a `stop` function to shut-down the HTTP server.

{{<Aside type="note">}}

The `unstable_dev` function has an `unstable_` prefix because the API may change in the future. There are no known bugs at the moment and it is safe to use. If you discover any bugs, please open a [GitHub Issue](https://github.com/cloudflare/wrangler2/issues/new/choose) and we'll fix them as soon as possible.


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

    *   Optional API options object containing `disableExperimentalWarning`. Set `disableExperimentalWarning` to true to disable wrangler's warning about using `unstable_` prefixed APIs.

{{</definitions>}}
### Usage

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: src/index.test.js
---
import { unstable_dev } from 'wrangler'

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
{{<tab label="ts">}}
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

