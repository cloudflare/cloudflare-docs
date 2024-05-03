---
pcx_content_type: concept
title: Puppeteer
weight: 10
---

# Puppeteer

[Puppeteer](https://pptr.dev/) is one of the most popular libraries that abstract the lower-level DevTools protocol from developers and provides a high-level API that you can use to easily instrument Chrome/Chromium and automate browsing sessions. Puppeteer is used for tasks like creating screenshots, crawling pages, and testing web applications.

Puppeteer typically connects to a local Chrome or Chromium browser using the DevTools port. Refer to the [Puppeteer API documentation on the `Puppeteer.connect()` method](https://pptr.dev/api/puppeteer.puppeteer.connect) for more information.

The Workers team forked a version of Puppeteer and patched it to connect to the Workers Browser Rendering API instead. The [changes between Workers Puppeteer fork and the Puppeteer core](https://github.com/cloudflare/puppeteer/blob/main/src/puppeteer-core.ts) are minimal. After connecting, the developers can then use the full [Puppeteer API](https://github.com/cloudflare/puppeteer/blob/main/docs/api/index.md) as they would on a standard setup.

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
	async fetch(request, env): Promise<Response> {
		const browser = await puppeteer.launch(env.MYBROWSER);
		const page = await browser.newPage();
		await page.goto("https://example.com");
		const metrics = await page.metrics();
		await browser.close();
		return Response.json(metrics);
	},
} satisfies ExportedHandler<Env>;
```
{{</tab>}}
{{</tabs>}}

This script [launches](https://pptr.dev/api/puppeteer.puppeteernode.launch) the `env.MYBROWSER` browser, opens a [new page](https://pptr.dev/api/puppeteer.browser.newpage), [goes to](https://pptr.dev/api/puppeteer.page.goto) https://example.com/, gets the page load [metrics](https://pptr.dev/api/puppeteer.page.metrics), [closes](https://pptr.dev/api/puppeteer.browser.close) the browser and prints metrics in JSON.

### Keep Alive

If users omit the `browser.close()` statement, it will stay open, ready to be connected to again and [re-used](../../get-started/reuse-sessions/) but it will, by default, close automatically after 1 minute of inactivity. Users can optionally extend this idle time up to 10 minutes, by using the `keep_alive` option, set in milliseconds:

```
const browser = await puppeteer.launch(env.MYBROWSER, { keep_alive: 600000 });
```

Using the above, the browser will stay open for up to 10 minutes, even if inactive.

## Session management

In order to facilitate browser session management, we've added new methods to `puppeteer`:

### List open sessions

`puppeteer.sessions()` lists the current running sessions. It will return an output similar to this:

```
[
   {
      "connectionId": "2a2246fa-e234-4dc1-8433-87e6cee80145",
      "connectionStartTime": 1711621704607,
      "sessionId": "478f4d7d-e943-40f6-a414-837d3736a1dc",
      "startTime": 1711621703708
   },
   {
      "sessionId": "565e05fb-4d2a-402b-869b-5b65b1381db7",
      "startTime": 1711621703808
   }
]
```

Notice that the session `478f4d7d-e943-40f6-a414-837d3736a1dc` has an active worker connection (`connectionId=2a2246fa-e234-4dc1-8433-87e6cee80145`), while session `565e05fb-4d2a-402b-869b-5b65b1381db7` is free. While a connection is active, no other workers may connect to that session.

### List recent sessions

`puppeteer.history()` lists recent sessions, both open and closed. It's useful to get a sense of your current usage.

```
[
   {
      "closeReason": 2,
      "closeReasonText": "BrowserIdle",
      "endTime": 1711621769485,
      "sessionId": "478f4d7d-e943-40f6-a414-837d3736a1dc",
      "startTime": 1711621703708
   },
   {
      "closeReason": 1,
      "closeReasonText": "NormalClosure",
      "endTime": 1711123501771,
      "sessionId": "2be00a21-9fb6-4bb2-9861-8cd48e40e771",
      "startTime": 1711123430918
   }
]
```

Session `2be00a21-9fb6-4bb2-9861-8cd48e40e771` was closed explicitly with `browser.close()` by the client, while session `478f4d7d-e943-40f6-a414-837d3736a1dc` was closed due to reaching the maximum idle time (check [limits](../limits/)).

You should also be able to access this information in the dashboard, albeit with a slight delay.

### Active limits

`puppeteer.limits()` lists your active limits:

```
{
   "activeSessions": ["478f4d7d-e943-40f6-a414-837d3736a1dc", "565e05fb-4d2a-402b-869b-5b65b1381db7"],
   "allowedBrowserAcquisitions": 1,
   "maxConcurrentSessions": 2,
   "timeUntilNextAllowedBrowserAcquisition": 0
}
```

- `activeSessions` lists the IDs of the current open sessions
- `maxConcurrentSessions` defines how many browsers can be open at the same time
- `allowedBrowserAcquisitions` specifies if a new browser session can be opened according to the rate [limits](../limits/) in place
- `timeUntilNextAllowedBrowserAcquisition` defines the waiting period before a new browser can be launched.

## Puppeteer API

The full Puppeteer API can be found in the [Cloudflare's fork of Puppeteer](https://github.com/cloudflare/puppeteer/blob/main/docs/api/index.md).
