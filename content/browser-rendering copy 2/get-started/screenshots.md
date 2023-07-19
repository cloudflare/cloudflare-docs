---
pcx_content_type: get-started
title: Deploy a Browser Rendering Worker
meta:
    title: Deploy a Screenshots Worker
weight: 1
---

# Deploy a Browser Rendering Worker

By following this guide, you will create a Worker that uses the Browser Rendering API to take screenshots from web pages. This is a common use case for browser automation. This guide assumes that you already have a Cloudflare account. If you do not have a Cloudflare account, [sign up](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.

## Create a Browser Rendering project

Install Wrangler and Cloudflare’s [fork of Puppeteer](/browser-rendering/platform/puppeteer/):

```bash
$ npm init -f
$ npm install wrangler --save-dev
$ npm install @cloudflare/puppeteer --save-dev
```

## Create a KV namespace

Browser Rendering can be used with other developer products. You might need a [relational database](https://developers.cloudflare.com/d1/), an [R2 bucket](https://developers.cloudflare.com/r2/) to archive your crawled pages and assets, or maybe use a [Durable Object](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/#durable-objects) to keep your browser instance alive and share it with multiple requests, or [queues](https://developers.cloudflare.com/queues/) to handle your jobs asynchronous.

For the purpose of this guide, you are going to use a [KV store](https://developers.cloudflare.com/workers/runtime-apis/kv/#kv) to cache your screenshots.

Create two namespaces, one for production, and one for development.

```bash
npx wrangler kv:namespace create BROWSER_KV_DEMO
npx wrangler kv:namespace create BROWSER_KV_DEMO --preview
```

Take note of the IDs.

## wrangler.toml

Let’s create the simplest possible wrangler.toml configuration file with the Browser Rendering API binding and the KV namespaces we just created:

```toml
---
filename: wrangler.toml
---
name = "browser-worker"
main = "src/index.ts"
compatibility_date = "2023-03-14"
node_compat = true
workers_dev = true

browser = { binding = "MYBROWSER", type = "browser" }
kv_namespaces = [
  { binding = "BROWSER_KV_DEMO", id = "22cf855786094a88a6906f8edac425cd", preview_id = "e1f8b68b68d24381b57071445f96e623" }
]
```

## Code

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
Create `src/index.js` with your Worker code:

```js
import puppeteer from "@cloudflare/puppeteer";

export default {
	async fetch(request, env) {
		const { searchParams } = new URL(request.url);
		let url = searchParams.get("url");
		let img;
		if (url) {
			url = new URL(url).toString(); // normalize
			img = await env.BROWSER_KV_DEMO.get(url, { type: "arrayBuffer" });
			if (img === null) {
				const browser = await puppeteer.launch(env.MYBROWSER);
				const page = await browser.newPage();
				await page.goto(url);
				img = await page.screenshot();
				await env.BROWSER_KV_DEMO.put(url, img, {
					expirationTtl: 60 * 60 * 24,
				});
				await browser.close();
			}
			return new Response(img, {
				headers: {
					"content-type": "image/jpeg",
				},
			});
		} else {
			return new Response(
				"Please add an ?url=https://example.com/ parameter"
			);
		}
	},
};
```
{{</tab>}}
{{<tab label="ts">}}
Create `src/index.ts` with your Worker code:

```ts
import puppeteer from "@cloudflare/puppeteer";

interface Env {
	MYBROWSER: Fetcher;
	BROWSER_KV_DEMO: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const { searchParams } = new URL(request.url);
		let url = searchParams.get("url");
		let img: Buffer;
		if (url) {
			url = new URL(url).toString(); // normalize
			img = await env.BROWSER_KV_DEMO.get(url, { type: "arrayBuffer" });
			if (img === null) {
				const browser = await puppeteer.launch(env.MYBROWSER);
				const page = await browser.newPage();
				await page.goto(url);
				img = (await page.screenshot()) as Buffer;
				await env.BROWSER_KV_DEMO.put(url, img, {
					expirationTtl: 60 * 60 * 24,
				});
				await browser.close();
			}
			return new Response(img, {
				headers: {
					"content-type": "image/jpeg",
				},
			});
		} else {
			return new Response(
				"Please add an ?url=https://example.com/ parameter"
			);
		}
	},
};
```
{{</tab>}}
{{</tabs>}}

This Worker instantiates a browser using Puppeteer, opens a new page, navigates to whatever you put in the "url" parameter, takes a screenshot of the page, stores the screenshot in KV, closes the browser, and responds with the JPEG image of the screenshot. If the same "url" is requested again, it will use the cached version in KV instead, unless it expired.

## Test and deploy

Run `npx wrangler dev --remote` to test your Worker, and `npx wrangler publish` to publish it.

## Related resources

* Other [Puppeteer examples](https://github.com/cloudflare/puppeteer/tree/main/examples)
