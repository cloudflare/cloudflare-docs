---
pcx_content_type: configuration
title: Bundling
meta:
  description: Review Wrangler's default bundling.
---

# Bundling

By default, Wrangler bundles your Worker code using [`esbuild`](https://esbuild.github.io/) before uploading your Worker to Cloudflare. To review the exact code that Wrangler will upload to Cloudflare, run `npx wrangler deploy --dry-run --outdir dist`, which will show your Worker code after Wrangler’s bundling—this command will not deploy your Worker. By default, Wrangler will look at your `wrangler.toml` file and read the `main` field. This will be passed to ESBuild as the [entrypoint](https://esbuild.github.io/api/#entry-points) to your build. You can override this by passing a positional `script` argument to `wrangler dev` or `wrangler deploy`, which overrides the `main` value in your `wrangler.toml` file.

Content on this page is relevant to all Wrangler users. If you'r authoring a library that you'd like to work with Wrangler, make sure to review [Notes for Library Authors](/workers/wrangler/bundling/#notes-for-library-authors).

## Bundling TypeScript & JavaScript modules

When authoring a Worker with Wrangler, you're able to use multiple source modules (i.e. multiple TypeScript files in your source directory). You're also able to import from `npm` packages which you've installed. When Wrangler runs ESBuild, ESBuild will bundle all of these JavaScript and TypeScript modules into a single JavaScript file, which is what will be uploaded to the Cloudflare network as your Worker. You can see the exact bundled JavaScript file that's run by the Workers runtime by opening the Quick Editor on your uploaded Worker, which will display the bundled file.

> Why does Wrangler bundle? The Workers runtime supports uploading multiple JS modules, but Wrangler bundles your code by default to support TypeScript and to reduce the size of your Worker by leveraging e.g. tree-shaking

## Support for non-JavaScript module types

Often you'll have modules in your app that aren't JavaScript or TypeScript. WASM is most common here, but this could also include text or HTML files that you want to import from your Worker code. Since these modules aren't JS or TS, these can't be bundled into your Worker's JS with ESBuild, and so Wrangler has specific logic for handling them. Wrangler supports this for the following file types:

- `.txt`
- `.html`
- `.bin`
- `.wasm` and `.wasm?module`

Refer to [Bundling configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#bundling) to customize these file types.

For example, if your code contains the following import of an HTML file:

```
import data from "./example.html"; // Where `example.html` is a file in your local directory
```

Wrangler will upload _two_ modules to the Cloudflare platform; one containing your bundled JS code (with the above import statement intact), and one containing the file `example.html`. When your Worker is run by the Workers runtime, the runtime will recognise that the import matches a module that was uploaded alongside your worker, and will load the contents and make it available to your JS code. In this case (since the file is a text file), importing the module will result in a `string` (i.e. the `data` variable will contain the string contents of `example.com`) but that's not always the case. For imports from a `*.bin` file, the Workers runtime will provide the value to your Worker as a `ArrayBuffer`, and for imports from a `.wasm` or `.wasm?module` file the Workers runtime will provide the value as an `ArrayBuffer` representing the binary WASM code. To turn a WASM import into callable code, you need to use the [`WebAssembly.instantiate()` API](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiate_static). For example:

```
import wasm from "./example.wasm"; // Where `example.wasm` is a file in your local directory
const instance = await WebAssembly.instantiate(wasm); // Instantiate Wasm modules in global scope, not within the fetch() handler

export default {  fetch(request) {    const result = instance.exports.exported_func();  },
};
```

Cloudflare Workers does not support `WebAssembly.instantiateStreaming()`.

## Non-Bundled JavaScript modules

> Caution, this is an advanced use case of Wrangler. You probably don't need it!

In some cases, you'll also want to make sure Wrangler doesn't bundle some of your JavaScript modules, as well as just non-JavaScript modules. This will result in Wrangler uploading multiple _JavaScript_ modules to the Workers runtime (where imports between them will be resolved at runtime), rather than uploading a single bundled JavaScript module containing all your Worker's code. This is primarily to support dynamic imports and code-splitting, which can improve your Worker's startup time by reducing the size of the entrypoint JavaScript module. There are two options—disabling bundling entirely, or disabling it partially:

### Completely disable bundling

When the `--no-bundle` flag is set, Wrangler has support for uploading additional modules alongside the entrypoint. This will allow modules to be imported at runtime on Cloudflare's Edge. This respects Wrangler's [module rules](https://developers.cloudflare.com/workers/wrangler/configuration/#bundling) configuration, which means that only imports of non-JS modules will trigger an upload by default. For instance, the following code will now work with `--no-bundle` (assuming the `example.wasm` file exists at the correct path):

```js
// index.js
import wasm from './example.wasm'

export default {
  async fetch() {
    await WebAssembly.instantiate(wasm, ...)
    ...
  }
}
```

For JS modules, it's necessary to specify an additional [module rule](https://developers.cloudflare.com/workers/wrangler/configuration/#bundling) (or rules) in your `wrangler.toml` to configure your modules as ES modules or Common JS modules. For instance, to upload additional JavaScript files as ES modules, add the following module rule to your `wrangler.toml`, which tells Wrangler that all `**/*.js` files are ES modules.

```toml
rules = [
  { type = "ESModule", globs = ["**/*.js"]},
]
```

If you have Common JS modules, you'd configure Wrangler with a CommonJS rule (the following rule tells Wrangler that all `.cjs` files are Common JS modules):

```toml
rules = [
  { type = "CommonJS", globs = ["**/*.cjs"]},
]
```

In most projects, adding a single rule will be sufficient. However, for advanced usecases where you're mixing ES modules and Common JS modules, you'll need to use multiple rule definitions. For instance, the following set of rules will match all `.mjs` files as ES modules, all `.cjs` files as Common JS modules, and the `nested/say-hello.js` file as Common JS.

```toml
rules = [
  { type = "CommonJS", globs = ["nested/say-hello.js", "**/*.cjs"]},
  { type = "ESModule", globs = ["**/*.mjs"]}
]
```

If multiple rules overlap, Wrangler will log a warning about the duplicate rules, and will discard additional rules that matches a module. For example, the following rule configuration classifies `dep.js` as both a Common JS module and an ES module:

```toml
rules = [
  { type = "CommonJS", globs = ["dep.js"]},
  { type = "ESModule", globs = ["dep.js"]}
]
```

Wrangler will treat `dep.js` as a Common JS module, since that was the first rule that matched, and will log the following warning:

```
▲ [WARNING] Ignoring duplicate module: dep.js (esm)
```

This also adds a new configuration option to `wrangler.toml`: `base_dir`. Defaulting to the directory of your Worker's main entrypoint, this tells Wrangler where your additional modules are located, and determines the module paths against which your module rule globs are matched.

For instance, given the following directory structure:

```
- wrangler.toml
- src/
  - index.html
  - vendor/
    - dependency.js
  - js/
    - index.js
```

If your `wrangler.toml` had `main = "src/js/index.js"`, you would need to set `base_dir = "src"` in order to be able to import `src/vendor/dependency.js` and `src/index.html` from `src/js/index.js`.

### Partially disabling bundling

Setting `find_additional_modules` to `true` in your configuration file will instruct Wrangler to look for files in your `base_dir` that match your configured `rules`, and deploy them as unbundled, external modules with your Worker. `base_dir` defaults to the directory containing your `main` entrypoint.

Files are bundled into a single Worker entry-point file unless `find_additional_modules` is `true`, and the file matches one of the configured `rules`.

## Notes for Library Authors

### Conditional exports

Wrangler respects the [conditional `exports` field](https://nodejs.org/api/packages.html#conditional-exports)

in `package.json`. This allows developers to implement isomorphic libraries that have different implementations depending on the JavaScript runtime they are running in. When bundling, Wrangler will try to load the [`workerd` key](https://runtime-keys.proposal.wintercg.org/#workerd). Refer to the Wrangler repository for [an example isomorphic package](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/isomorphic-random-example). If you're building a library that supports the Workers runtime, we recommend adding the `workerd` `exports` field to indicate the correct configuration of your package for Wrangler to load.

### Feature detection

If you're writing a library that needs to know whether or not it's running in the Workers runtime, make sure you use the user agent for feature detection (i.e. `navigator.userAgent === "Cloudflare-Workers`). For example, you could write this `randomBytes()` function that will work in both Node.js and Workers:

```
export function randomBytes(length: number) {
	if (navigator.userAgent !== "Cloudflare-Workers") {
		return new Uint8Array(require("node:crypto").randomBytes(length));
	} else {
		return crypto.getRandomValues(new Uint8Array(length));
	}
}
```

Using `navigator.userAgent` for feature detection will allow Wrangler to tree-shake the dead code branches from your library, reducing the size of Workers which depend on it.
