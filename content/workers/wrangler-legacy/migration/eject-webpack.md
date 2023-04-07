---
pcx_content_type: how-to
title: Ejecting webpack
weight: 3
---

# Migrate webpack projects from Wrangler version 1

Previous versions of Wrangler offered rudimentary support for [webpack](https://webpack.js.org/) with the `type` and `webpack_config` keys in [`wrangler.toml`](/workers/wrangler/configuration/). Starting with Wrangler v2, Wrangler no longer supports the `type` and `webpack_config` keys, but you can still use webpack with your Workers.

As a developer using webpack with Workers, you may be in one of four categories:

1. [I use `[build]` to run webpack (or another bundler) external to `wrangler`.](#i-use-build-to-run-webpack-or-another-bundler-external-to-wrangler).

2. [I use `type = webpack`, but do not provide my own configuration and let Wrangler take care of it.](#i-use-type--webpack-but-do-not-provide-my-own-configuration-and-let-wrangler-take-care-of-it).

3. [I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to handle JSX, Typescript, WebAssembly, HTML files, and other non-standard filetypes.](#i-use-type--webpack-and-webpack_config--pathtowebpackconfigjs-to-handle-jsx-typescript-webassembly-html-files-and-other-non-standard-filetypes).

4. [I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to perform code-transforms and/or other code-modifying functionality.](#i-use-type--webpack-and-webpack_config--pathtowebpackconfigjs-to-perform-code-transforms-andor-other-code-modifying-functionality).

If you do not see yourself represented, [file an issue](https://github.com/cloudflare/workers-sdk/issues/new/choose) and we can assist you with your specific situation and improve this guide for future readers.

### I use `[build]` to run webpack (or another bundler) external to Wrangler.

Wrangler v2 supports the `[build]` key, so your Workers will continue to build using your own setup.

### I use `type = webpack`, but do not provide my own configuration and let Wrangler take care of it.

Wrangler will continue to take care of it. Remove `type = webpack` from your `wrangler.toml` file.

### I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to handle JSX, TypeScript, WebAssembly, HTML files, and other non-standard filetypes.

As of Wrangler v2, Wrangler has built-in support for this use case. Refer to [Bundling](/workers/wrangler/bundling/) for more details.

The Workers runtime handles JSX and TypeScript. You can `import` any modules you need into your code and the Workers runtime includes them in the built Worker automatically.

You should remove the `type` and `webpack_config` keys from your `wrangler.toml` file.

### I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to perform code-transforms and/or other code-modifying functionality.

Wrangler v2 drops support for project types, including `type = webpack` and configuration via the `webpack_config` key. If your webpack configuration performs operations beyond adding loaders (for example, for TypeScript) you will need to maintain your custom webpack configuration. In the long term, you should [migrate to an external `[build]` process](/workers/wrangler/custom-builds/). In the short term, it is still possible to reproduce Wrangler v1's build steps in newer versions of Wrangler by following the instructions below.

1. Add [wranglerjs-compat-webpack-plugin](https://www.npmjs.com/package/wranglerjs-compat-webpack-plugin) as a `devDependency`.

[wrangler-js](https://www.npmjs.com/package/wrangler-js), shipped as a separate library from [Wrangler v1](https://www.npmjs.com/package/@cloudflare/wrangler/v/1.19.11), is a Node script that configures and executes [webpack 4](https://unpkg.com/browse/wrangler-js@0.1.11/package.json) for you. When you set `type = webpack`, Wrangler v1 would execute this script for you. We have ported the functionality over to a new package, [wranglerjs-compat-webpack-plugin](https://www.npmjs.com/package/wranglerjs-compat-webpack-plugin), which you can use as a [webpack plugin](https://v4.webpack.js.org/configuration/plugins/).

To do that, you will need to add it as a dependency:

```
npm install --save-dev webpack@^4.46.0 webpack-cli wranglerjs-compat-webpack-plugin
# or
yarn add --dev webpack@4.46.0 webpack-cli wranglerjs-compat-webpack-plugin
```

You should see this reflected in your `package.json` file:

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

2. Add `wranglerjs-compat-webpack-plugin` to `webpack.config.js`.

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

3. Add a build script your `package.json`.

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

4. Remove unsupported entries from your `wrangler.toml`.

Remove the `type` and `webpack_config` keys from your `wrangler.toml` file, as they are not supported anymore.

```toml
# Remove these!
type = "webpack"
webpack_config = "webpack.config.js"
```

5. Tell Wrangler how to bundle your Worker.

Wrangler no longer has any knowledge of how to build your Worker. You will need to tell it how to call webpack and where to look for webpack's output. This translates into two fields:

```toml
main = "./worker/script.js" # by default, or whatever file webpack outputs
[build]
command = "npm run build" # or "yarn build"
# ...
```

6. Test your project.

Try running `wrangler publish` to test that your configuration works as expected.
