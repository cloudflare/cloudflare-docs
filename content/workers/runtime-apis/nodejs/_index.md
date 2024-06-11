---
pcx_content_type: concept
title: Node.js compatibility
meta:
  description: Node.js APIs available in Cloudflare Workers
---

# Node.js compatibility

When you write a Worker, you may need to import packages from [npm](https://www.npmjs.com/). Many npm packages rely on APIs from the [Node.js runtime](https://nodejs.org/en/about), and will not work unless these Node.js APIs are available.

Cloudflare Workers provides a subset of Node.js APIs in two forms:

1. As built-in APIs provided by the Workers Runtime
2. As polyfills, added to your code by Wrangler (or by your own build tools)

To enable both built-in APIs and polyfills to your Worker, add the [`experimental:nodejs_compat_v2`](/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) [compatibility flag](/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) to your `wrangler.toml`:

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "experimental:nodejs_compat_v2" ]
```

{{<Aside type="note" header="Note">}}

When this ships, the opt-in mechanism will be:

1. Enable the `nodejs_compat` compatibility flag
2. Set your compatibility date after <date>

The `experimental:nodejs_compat_v2` flag is temporary, just for getting feedback.

{{</Aside>}}

## Built-in Node.js Runtime APIs

The following APIs from Node.js are provided directly by the Workers Runtime:

{{<directory-listing>}}

Unless otherwise specified, implementations of Node.js APIs in Workers are intended to match the implementation in the [Current release of Node.js](https://github.com/nodejs/release#release-schedule).

## Node.js API Polyfills

When you build your Worker with Wrangler, and enable the `experimental:nodejs_compat_v2` compatibility flag, in addition to enabling built-in Node.js APIs from the Workers Runtime, [Wrangler](/workers/wrangler/) will use [unenv](https://github.com/unjs/unenv) to automatically detect uses of Node.js APIs, and add polyfills where relevant.

Adding polyfills maximizes compatibility with existing npm packages, while recognizing that not all APIs from Node.js make sense in the context of serverless functions.

In cases where it is possible to provide a polyfill version of the relevant Node.js API, unenv will do so. In cases where it is not possible to provide a polyfill, such as the `fs` module, unenv adds the module and its methods to your Worker, but calling methods of the module will either noop, or will throw an error with a message like:

```
[unenv] <method name> is not implemented yet!

{{<Aside type="note" header="Note">}}

Instructions on how to opt out of the polyfills

{{</Aside>}}

## Adding polyfills to your Worker manually

If you do not use Wrangler to bundle your Worker, and instead use the build tooling provided by a framework such as Next.js, Remix, or Astro, you will need to add polyfills yourself. Follow the [unenv docs](https://github.com/unjs/unenv?tab=readme-ov-file#usage) for guidance on how to integrate unenv with your bundler or build tool of choice.

## Enable only AsyncLocalStorage

To enable the Node.js `AsyncLocalStorage` API only, use the `nodejs_als` compatibility flag.

```toml
---
header:wrangler.toml
---
compatibility_flags = [ "nodejs_als" ]
```
