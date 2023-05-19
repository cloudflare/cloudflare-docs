---
pcx_content_type: concept
title: Puppeteer
weight: 10
---

# Puppeteer

[Puppeteer](https://pptr.dev/) is one of the most popular libraries that abstract the lower-level DevTools protocol from developers and provides a high-level API that you can use to easily instrument Chrome/Chromium and automate browsing sessions. It's widely used for things like creating screenshots, crawling pages, and testing web applications.

Puppeteer typically [connects](https://pptr.dev/api/puppeteer.puppeteer.connect) to a local Chrome or Chromium browser using the DevTools port.

We forked a version of Puppeteer and patched it to connect to the Workers Browser Rendering API instead. The [changes](https://github.com/cloudflare/puppeteer/blob/main/src/puppeteer-core.ts) are minimal; after connecting the developers can then use the full [Puppeteer API](https://github.com/cloudflare/puppeteer/blob/main/docs/api/index.md) as they would on a standard setup.

Our version is open sourced [here](https://github.com/cloudflare/puppeteer), and the npm can be installed from [npmjs](https://www.npmjs.com/) as [@cloudflare/puppeteer](https://www.npmjs.com/package/@cloudflare/puppeteer):

```javascript
npm install @cloudflare/puppeteer --save-dev
```

## Using Puppeteer in a Worker

Once the [binding](/browser-rendering/platform/wrangler/#bindings) is configured and the `@cloudflare/puppeteer` library is installed, it can be used in a Worker:

```javascript
import puppeteer from "@cloudflare/puppeteer";

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const browser = await puppeteer.launch(env.MYBROWSER);
        const page = await browser.newPage();
        await page.goto("https://example.com");
        const metrics = await page.metrics();
        await browser.close();
        return new Response(JSON.stringify(metrics));
    },
};
```

This script [launches](https://pptr.dev/api/puppeteer.puppeteernode.launch) the `env.MYBROWSER` browser, opens a [new page](https://pptr.dev/api/puppeteer.browser.newpage), [goes to](https://pptr.dev/api/puppeteer.page.goto) https://example.com/, gets the page load [metrics](https://pptr.dev/api/puppeteer.page.metrics), [closes](https://pptr.dev/api/puppeteer.browser.close) the browser and prints metrics in JSON.

## Puppeteer API

The full Puppeteer API can be found in the [here](https://github.com/cloudflare/puppeteer/blob/main/docs/api/index.md).


