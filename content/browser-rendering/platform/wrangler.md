---
pcx_content_type: configuration
title: Wrangler
weight: 20
---

# Wrangler Support

[Wrangler](/workers/wrangler/) is our command-line tool for configuring, building and deploying applications with Cloudflare developer products.

Use Wrangler to deploy projects that use the Workers Browser Rendering API.

## Installation

To install Wrangler, run:

```bash
$ npm install wrangler --save-dev
```

## Bindings

Bindings allow your Workers to interact with resources on the Cloudflare developer platform. In this case, they will provide your Worker script with an authenticated endpoint to interact with a dedicated Chromium browser instance.

To deploy a Browser Rendering Worker, you must declare the [browser binding](/workers/platform/bindings/) in your `wrangler.toml` configuration file.

Note: if you are using [Puppeteer](/browser-rendering/platform/puppeteer/) in your code, then you also need to add `node_compat = true` to the configuration.


```toml
---
filename: wrangler.toml
---
# Top-level configuration
name = "browser-rendering"
main = "src/index.ts"
node_compat = true
workers_dev = true

browser = { binding = "MYBROWSER", type = "browser" }
```

After the binding is declared, you can access the DevTools endpoint using `env.MYBROWSER` in your code:

```javascript
const browser = await puppeteer.launch(env.BROWSER);
```
