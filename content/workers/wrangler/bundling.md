---
pcx_content_type: how-to
title: Bundling
weight: 5
---

# Bundling

By default, Wrangler bundles your Worker code using [`esbuild`](https://esbuild.github.io/). This means that Wrangler has built-in support for importing modules from [npm](https://www.npmjs.com/) defined in your `package.json`. To review the exact code that Wrangler will upload to Cloudflare, run `wrangler publish --dry-run --outdir dist`, which will show your Worker code after Wrangler's bundling.

{{<Aside type="note">}}
We recommend using Wrangler's inbuilt bundling, but we understand there are cases where you will need more flexibility. We have built an escape hatch in the form of [Custom Builds](/workers/wrangler/custom-builds/), which let you run your own build before Wrangler's built-in one.
{{</Aside>}}

## Files which will not be bundled

Bundling your Worker code takes multiple modules and bundles them into one. Sometimes, you might have modules that should not be inlined directly into the bundle. For example, instead of bundling a WASM file into your JavaScript Worker, you would want to upload the WASM file as a separate module that can be imported at runtime. Wrangler supports this for the following file types:

- `.txt`
- `.html`
- `.bin`
- `.wasm`

Refer to [Bundling configuration](/workers/wrangler/configuration/#bundling) to customize these file types.

For example, with the following import, the variable `data` will be a string containing the contents of `example.html`:

```js
import data from "./example.html"; // Where `example.html` is a file in your local directory
```

This is also the basis of Wasm support with Wrangler. To use a Wasm module in a Worker developed with Wrangler, add the following to your Worker:

```js
import wasm from "./example.wasm"; // Where `example.wasm` is a file in your local directory

export default {
  fetch(request) {
    const module = WebAssembly.instantiate(wasm);
  },
};
```

{{<Aside type="warning">}}
Cloudflare Workers does not support `WebAssembly.instantiateStreaming()`.
{{</Aside>}}

## Disable bundling

{{<Aside type="warning">}}
Disabling bundling is not recommended and has a number of major tradeoffs that are detailed below. Most users should be able to ignore this section.
{{</Aside>}}

As well as using [Custom Builds](/workers/wrangler/custom-builds/) to customise what Wrangler will bundle and upload to the Cloudflare Edge when you use `wrangler dev` and `wrangler publish`, you can opt out of bundling entirely by using the `--no-bundle` command line flag (i.e. `wrangler publish --no-bundle`). Because this means that Wrangler won't process your code, a number of features aren't available.

### D1 bindings

During the [beta period for D1](/workers/platform/betas/), D1 bindings will not be available to a Worker published with `--no-bundle`.

### Editing via the Cloudflare dashboard

It is not possible to edit your Worker in the Cloudflare dashboard when you use the `--no-bundle` flag. The Cloudflare dashboard does not support Workers with multiple modules. If you use a Custom Build script, which bundles your Worker into a single module, this limitation can be bypassed.
