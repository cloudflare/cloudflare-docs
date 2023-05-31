---
pcx_content_type: configuration
title: Bundling
weight: 5
---

# Bundling

By default, Wrangler bundles your Worker code using [`esbuild`](https://esbuild.github.io/). This means that Wrangler has built-in support for importing modules from [npm](https://www.npmjs.com/) defined in your `package.json`. To review the exact code that Wrangler will upload to Cloudflare, run `wrangler publish --dry-run --outdir dist`, which will show your Worker code after Wrangler's bundling.

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
Disabling bundling is not recommended and has a number of major tradeoffs that are detailed below. Most users should be able to ignore this section.
{{</Aside>}}

Opt out of bundling by using the `--no-bundle` command line flag: `wrangler publish --no-bundle`. If you opt out of bundling, Wrangler will not process your code and a number of features will not be available. You can use [Custom Builds](/workers/wrangler/custom-builds/) to customize what Wrangler will bundle and upload to the Cloudflare global network when you use `wrangler dev` and `wrangler deploy`.

### D1 bindings

During the [beta period for D1](/workers/platform/betas/), D1 bindings will not be available to a Worker published with `--no-bundle`.

### Editing via the Cloudflare dashboard

It is not possible to edit your Worker in the Cloudflare dashboard when you use the `--no-bundle` flag. The Cloudflare dashboard does not support Workers with multiple modules. If you use a Custom Build script, which bundles your Worker into a single module, this limitation can be bypassed.
