---
pcx_content_type: how-to
title: API
weight: 12
---

## Wrangler API

Wrangler offers an API to programmatically manage your Cloudflare Workers

- [`unstable_dev`](#unstable_dev) - Start a local server for running integration tests against your Worker.


### unstable_dev

Start a local server for testing your Worker.

{{<Aside type="note">}}

The `unstable_dev` function has an `unstable_` prefix because the API may change in the future. There are no known bugs at the moment and it is safe to use. If you discover any issues, please do report them as a [GitHub Issue](https://github.com/cloudflare/wrangler2/issues/new/choose) and we will patch them as soon as possible.


{{</Aside>}}

```js
//src/index.test.js
import { unstable_dev } from 'wrangler'

describe("worker", () => {
	it("should return Hello World", async () => {
		const worker = await unstable_dev(
			"src/index.js",
			{},
			{ disableExperimentalWarning: true }
		);
		const resp = await worker.fetch();
		if (resp) {
			const text = await resp.text();
			expect(text).toMatchInlineSnapshot(`"Hello World!"`);
		}
		await worker.stop();
	});
});
```

