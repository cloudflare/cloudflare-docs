---
title: Modules
pcx_content_type: configuration
meta:
  title: Modules
  description: The Workers Runtime support for ESM modules and CommonJS
---

# Modules

The Workers runtime supports [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) — commonly referred to as ES Modules or ESM.

ES Modules are the default, recommended module format in the Workers Runtime.

If you haven't already, need to migrate:
https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/

## Other module types

### CommonJS

By default, [Wrangler](/workers/wrangler/) bundles and uploads your code using the ES Modules format. When Wrangler bundles code, it transforms `require()` calls from [CommonJS](https://nodejs.org/api/modules.html) into code that can run on Workers in the ESM format. This allows you to use `require()` in your own code, or use libraries that are published as CommonJS — even though at runtime, `require()` and CommonJS are not supported from within an ES Module.

If you need to deploy code directly to Workers that directly uses the [CommonJS](https://nodejs.org/api/modules.html) format, and `require()` — it is possible to do so by [setting the module type in Wrangler to `CommonJS`](https://developers.cloudflare.com/workers/wrangler/configuration/#bundling). 

### CompiledWasm

### Text

### Data
