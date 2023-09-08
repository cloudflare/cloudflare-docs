---
pcx_content_type: concept
title: Puppeteer
weight: 10
---

# Puppeteer

[Puppeteer](https://pptr.dev/) is one of the most popular libraries that abstract the lower-level DevTools protocol from developers and provides a high-level API that you can use to easily instrument Chrome/Chromium and automate browsing sessions. Puppeteer is used for tasks like creating screenshots, crawling pages, and testing web applications.

Puppeteer typically connects to a local Chrome or Chromium browser using the DevTools port. Refer to the [Puppeteer API documentation on the `Puppeteer.connect()` method](https://pptr.dev/api/puppeteer.puppeteer.connect) for more information.

The Workers team forked a version of Puppeteer and patched it to connect to the Workers Browser Rendering API instead. Review the The [changes between Workers Puppeteer fork and the Puppeteer core](https://github.com/cloudflare/puppeteer/blob/main/src/puppeteer-core.ts) are minimal. After connecting, the developers can then use the full [Puppeteer API](https://github.com/cloudflare/puppeteer/blob/main/docs/api/index.md) as they would on a standard setup.

Our version is open sourced and can be found in [Cloudflare's fork of Puppeteer](https://github.com/cloudflare/puppeteer). The npm can be installed from [npmjs](https://www.npmjs.com/) as [@cloudflare/puppeteer](https://www.npmjs.com/package/@cloudflare/puppeteer):

```javascript
npm install @cloudflare/puppeteer --save-dev
```

## Use Puppeteer in a Worker

Once the [browser binding](/browser-rendering/platform/wrangler/#bindings) is configured and the `@cloudflare/puppeteer` library is installed, Puppeteer can be used in a Worker:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
import puppeteer from "@cloudflare/puppeteer";

export default {
	async fetch(request, env) {
		const browser = await puppeteer.launch(env.MYBROWSER);
		const page = await browser.newPage();
		await page.goto("https://example.com");
		const metrics = await page.metrics();
		await browser.close();
		return Response.json(metrics);
	},
};
```
{{</tab>}}
{{<tab label="ts">}}
```ts
import puppeteer from "@cloudflare/puppeteer";

interface Env {
	MYBROWSER: Fetcher;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const browser = await puppeteer.launch(env.MYBROWSER);
		const page = await browser.newPage();
		await page.goto("https://example.com");
		const metrics = await page.metrics();
		await browser.close();
		return Response.json(metrics);
	},
};
```
{{</tab>}}
{{</tabs>}}

This script [launches](https://pptr.dev/api/puppeteer.puppeteernode.launch) the `env.MYBROWSER` browser, opens a [new page](https://pptr.dev/api/puppeteer.browser.newpage), [goes to](https://pptr.dev/api/puppeteer.page.goto) https://example.com/, gets the page load [metrics](https://pptr.dev/api/puppeteer.page.metrics), [closes](https://pptr.dev/api/puppeteer.browser.close) the browser and prints metrics in JSON.

## Puppeteer API

The full Puppeteer API can be found in the [Cloudflare's fork of Puppeteer](https://github.com/cloudflare/puppeteer/blob/main/docs/api/index.md).


