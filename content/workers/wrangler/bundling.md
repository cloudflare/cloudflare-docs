---
pcx_content_type: configuration
title: Bundling
meta:
  description: Review Wrangler's default bundling.
---

# Bundling

By default, Wrangler bundles your Worker code using [`esbuild`](https://esbuild.github.io/). This means that Wrangler has built-in support for importing modules from [npm](https://www.npmjs.com/) defined in your `package.json`. To review the exact code that Wrangler will upload to Cloudflare, run `npx wrangler deploy --dry-run --outdir dist`, which will show your Worker code after Wrangler's bundling.

{{<Aside type="note">}}
We recommend using Wrangler's inbuilt bundling, but we understand there are cases where you will need more flexibility. We have built an escape hatch in the form of [Custom Builds](/workers/wrangler/custom-builds/), which lets you run your own build before Wrangler's built-in one.
{{</Aside>}}

## Files which will not be bundled

Bundling your Worker code takes multiple modules and bundles them into one. Sometimes, you might have modules that should not be inlined directly into the bundle. For example, instead of bundling a Wasm file into your JavaScript Worker, you would want to upload the Wasm file as a separate module that can be imported at runtime. Wrangler supports this for the following file types:

- `.txt`
- `.html`
- `.bin`
- `.wasm` and `.wasm?module`

Refer to [Bundling configuration](/workers/wrangler/configuration/#bundling) to customize these file types.

For example, with the following import, the variable `data` will be a string containing the contents of `example.html`:

```js
import data from "./example.html"; // Where `example.html` is a file in your local directory
```

This is also the basis of Wasm support with Wrangler. To use a Wasm module in a Worker developed with Wrangler, add the following to your Worker:

```js
import wasm from "./example.wasm"; // Where `example.wasm` is a file in your local directory
const instance = await WebAssembly.instantiate(wasm); // Instantiate Wasm modules in global scope, not within the fetch() handler

export default {
  fetch(request) {
    const result = instance.exports.exported_func();
  },
};
```

{{<Aside type="warning">}}
Cloudflare Workers does not support `WebAssembly.instantiateStreaming()`.
{{</Aside>}}

## Conditional exports

Wrangler respects the [conditional `exports` field](https://nodejs.org/api/packages.html#conditional-exports) in `package.json`. This allows developers to implement isomorphic libraries that have different implementations depending on the JavaScript runtime they are running in. When bundling, Wrangler will try to load the [`workerd` key](https://runtime-keys.proposal.wintercg.org/#workerd). Refer to the Wrangler repository for [an example isomorphic package](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/isomorphic-random-example).

## Disable bundling

{{<Aside type="warning">}}
Disabling bundling is not recommended in most scenarios. Use this option only when deploying code pre-processed by other tooling.
{{</Aside>}}

If your build tooling already produces build artifacts suitable for direct deployment to Cloudflare, you can opt out of bundling by using the `--no-bundle` command line flag: `npx wrangler deploy --no-bundle`. If you opt out of bundling, Wrangler will not process your code and some features introduced by Wrangler bundling (for example minification, and polyfills injection) will not be available.

Use [Custom Builds](/workers/wrangler/custom-builds/) to customize what Wrangler will bundle and upload to the Cloudflare global network when you use [`wrangler dev`](/workers/wrangler/commands/#dev) and [`wrangler deploy`](/workers/wrangler/commands/#deploy).
