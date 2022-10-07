---
pcx_content_type: how-to
title: Bundling
weight: 5
---

# Wrangler's bundling

{{<Aside type="note">}}
We recommend using Wrangler's inbuilt bundling, but we understand there are cases where you'll need a bit more flexibility. We've built an escape hatch in the form of [Custom Builds](/workers/wrangler/custom-builds/), which let you replace Wrangler's built-in build step with your own.
{{</Aside>}}

By default, Wrangler bundles your Worker code using [`esbuild`](https://esbuild.github.io/). This means that Wrangler has built in support for importing modules from [npm](https://www.npmjs.com/) defined in your `package.json`. If you'd like to see the exact code that Wrangler will upload to Cloudflare, you can run `wrangler publish --dry-run --outdir dist`, which will show your Worker code post Wrangler's bundling.

## Files which won't be bundled

The effect of bundling your Worker code is to take multiple modules and bundle them into one. Sometimes, however, that isn't the behaviour you want. There might be modules that _shouldn't_ be inlined directly into the bundle. For instance, bundling a WASM file into your Javascript Worker wouldn't make a whole lot of sense—that's something you want to upload as a separate module that can be imported at runtime. Wrangler supports this out of the box for the following file types:

- `.txt`
- `.html`
- `.bin`
- `.wasm`

See the [rules configuration](/workers/wrangler/configuration/#bundling) to customise these file types.

This means that for an import like the following:

```js
import data from "example.html"; // Where `example.html` is a file in your local directory
```

the variable `data` will be a string containing the contents of `test.html`.

This is also the basis of WASM support with Wrangler. To use a WASM module in a Worker developed with Wrangler, add the following to your Worker:

```js
import wasm from "./example.wasm"; // Where `example.wasm` is a file in your local directory

export default {
  fetch(request) {
    const module = WebAssembly.instantiate(wasm);
  },
};
```

{{<Aside type="warning">}}
Cloudflare Workers doesn't support `WebAssembly.instantiateStreaming()`
{{</Aside>}}
