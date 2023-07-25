---
pcx_content_type: configuration
title: Wrangler
weight: 20
---

# Wrangler

[Wrangler](/workers/wrangler/) is a command-line tool for building with Cloudflare developer products.

Use Wrangler to deploy projects that use the Workers Browser Rendering API.

## Install

To install Wrangler, refer to [Install and Update Wrangler](/workers/wrangler/install-and-update/).

## Bindings

[Bindings](/workers/configuration/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform. A browser binding will provide your Worker with an authenticated endpoint to interact with a dedicated Chromium browser instance.

To deploy a Browser Rendering Worker, you must declare a [browser binding](/workers/configuration/bindings/) in your Worker's `wrangler.toml` configuration file.

{{<Aside type="note" header="Wrangler configuration">}}
If you are using [Puppeteer](/browser-rendering/platform/puppeteer/) in your Worker code, then you also need to add `node_compat = true` to your Worker's `wrangler.toml` configuration.
{{</Aside>}}


```toml
---
filename: wrangler.toml
---
# Top-level configuration
name = "browser-rendering"
main = "src/index.ts"
node_compat = true
workers_dev = true

browser = { binding = "MYBROWSER" }
```

After the binding is declared, access the DevTools endpoint using `env.MYBROWSER` in your Worker code:

```javascript
const browser = await puppeteer.launch(env.BROWSER);
```
