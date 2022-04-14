---
pcx-content-type: how-to
title: Ejecting Webpack
weight: 9
---

## Migrating webpack projects to `wrangler v2`

Previous versions of `wrangler` offered rudimentary support for [webpack](https://webpack.js.org/) with the `type` and `webpack_config` keys in [`wrangler.toml`](configuration.md). Starting with version 2, `wrangler` no longer supports the `type` and `webpack_config` keys, but you can still use webpack with your workers!

Odds are, you (an intrepid developer using webpack with Workers) fall into one of four categories:

1. [I use `[build]` to run webpack (or another bundler) external to wrangler.](#i-use-build-to-run-webpack-or-another-bundler-external-to-wrangler)

2. [I use `type = webpack`, but don't provide my own configuration and let `wrangler` take care of it.](#i-use-type--webpack-but-dont-provide-my-own-configuration-and-let-wrangler-take-care-of-it)

3. [I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to handle JSX, Typescript, WebAssembly, HTML files, and other non-standard filetypes.](#i-use-type--webpack-and-webpack_config--pathtowebpackconfigjs-to-handle-jsx-typescript-webassembly-html-files-and-other-non-standard-filetypes)

4. [I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to perform code-transforms and/or other code-modifying functionality.](#i-use-type--webpack-and-webpack_config--pathtowebpackconfigjs-to-perform-code-transforms-andor-other-code-modifying-functionality)

If you don't fall into any of those categories, please [file an issue](https://github.com/cloudflare/wrangler2/issues/new/choose) so we can help you out and improve our documentation!

### I use `[build]` to run webpack (or another bundler) external to wrangler.

`wrangler` 2 supports the `[build]` key, so your workers will continue to build using your own setup.

### I use `type = webpack`, but don't provide my own configuration and let `wrangler` take care of it.

Good news! `wrangler` will continue to take care of it. Simply remove `type = webpack` from your `wrangler.toml`.

### I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to handle JSX, Typescript, WebAssembly, HTML files, and other non-standard filetypes.

New versions of `wrangler` ship with built-in support for this usecase thanks to our [module system](module-system.md).

We'll handle JSX and Typescript, and you can simply `import` any modules you need into your code and we'll include them in the built worker automatically.

You should remove the `type` and `webpack_config` keys from your `wrangler.toml`.

### I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to perform code-transforms and/or other code-modifying functionality.

`wrangler` 2 drops support for project types, including `type = webpack` and configuration via the `webpack_config` key. If your webpack configuration does things beyond adding loaders for e.g. Typescript, you'll need to maintain your custom Webpack configuration. In the long term, you should [migrate to an external `[build]` process](custom-builds.md), but in the short term it's still possible to reproduce `wrangler` 1's build steps in newer versions of `wrangler` by following the steps below.

1. Add [wranglerjs-compat-webpack-plugin](TODO: npm link) as a `devDependency`

[wrangler-js](https://www.npmjs.com/package/wrangler-js), shipped as a separate library from [wrangler 1](https://www.npmjs.com/package/@cloudflare/wrangler/v/1.19.11), is a simple Node script that configures and executes [webpack 4](https://unpkg.com/browse/wrangler-js@0.1.11/package.json) for you. When you set `type = webpack`, wrangler 1 would execute this script for you. We've ported the functionality over to a new package, [wranglerjs-compat-webpack-plugin](TODO: link), which you can use as a [webpack plugin](https://v4.webpack.js.org/configuration/plugins/).

To do that, you'll need to add it as a dependency:

```sh
npm install --save-dev webpack@^4.46.0 webpack-cli wranglerjs-compat-webpack-plugin
# or
yarn add --dev webpack@4.46.0 webpack-cli wranglerjs-compat-webpack-plugin
```

You should see this reflected in your package.json:

```json
{
  "name": "my-worker",
  "version": "x.y.z",
  // ...
  "devDependencies": {
    // ...
    "wranglerjs-compat-webpack-plugin": "^x.y.z",
    "webpack": "^4.46.0",
    "webpack-cli": "^x.y.z"
  }
}
```

2. Add [wranglerjs-compat-webpack-plugin] to `webpack.config.js`

Modify your `webpack.config.js` file to include the plugin you just installed.

```js
const {
  WranglerJsCompatWebpackPlugin,
} = require("wranglerjs-compat-webpack-plugin");

module.exports = {
  // ...
  plugins: [new WranglerJsCompatWebpackPlugin()],
};
```

2. Add a build script your `package.json`

```json
{
  "name": "my-worker",
  "verion": "2.0.0",
  // ...
  "scripts": {
    "build": "webpack" // <-- Add this line!
    // ...
  }
}
```

3. Remove unsupported entries from your `wrangler.toml`

Remove the `type` and `webpack_config` keys from your `wrangler.toml`, as they're not supported anymore.

```toml
# Remove these!
type = "webpack"
webpack_config = "webpack.config.js"
```

4. Tell wrangler how to bundle your worker

Wrangler no longer has any knowledge of how to build your worker, so you'll need to tell it how to call webpack and where to look for webpack's output. This translates into two fields:

```toml
main = "./worker/script.js" # by default, or whatever file webpack outputs
[build]
command = "npm run build" # or "yarn build"
# ...
```

5. Test it out!

Try running `npx wrangler publish`, and verify that things work as expected.
