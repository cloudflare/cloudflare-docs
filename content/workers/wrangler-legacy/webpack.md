---
pcx_content_type: configuration
title: Webpack
weight: 5
---

# Webpack

{{<render file="_wrangler-v1-deprecation.md">}}

Wrangler allows you to develop modern ES6 applications with support for modules. This support is possible because of Wrangler's [webpack](https://webpack.js.org/) integration. This document describes how Wrangler uses webpack to build your Workers and how you can bring your own configuration.

{{<Aside type="note" header="Configuration and webpack version">}}

Wrangler includes `webpack@4`. If you want to use `webpack@5`, or another bundler like esbuild or Rollup, you must set up [custom builds](/workers/wrangler-legacy/configuration/#build) in your `wrangler.toml` file.

You must set `type = "webpack"` in your `wrangler.toml` file to use Wrangler's webpack integration. If you are encountering warnings about specifying `webpack_config`, refer to [backwards compatibility](#backwards-compatibility).

{{</Aside>}}

## Sensible defaults

This is the default webpack configuration that Wrangler uses to build your Worker:

```js
module.exports = {
  target: "webworker",
  entry: "./index.js", // inferred from "main" in package.json
};
```

The `"main"` field in the `package.json` file determines the `entry` configuration value. When undefined or missing, `"main"` defaults to `index.js`, meaning that `entry` also defaults to `index.js`.

The default configuration sets `target` to `webworker`. This is the correct value because Cloudflare Workers are built to match the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). Refer to the [webpack documentation](https://webpack.js.org/concepts/targets/) for an explanation of this `target` value.

## Bring your own configuration

You can tell Wrangler to use a custom webpack configuration file by setting `webpack_config` in your `wrangler.toml` file. Always set `target` to `webworker`.

### Example

```js
---
filename: webpack.config.js
---
module.exports = {
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
};
```

```toml
---
filename: wrangler.toml
---
type = "webpack"
name = "my-worker"
account_id = "12345678901234567890"
workers_dev = true
webpack_config = "webpack.config.js"
```

### Example with multiple environments

It is possible to use different webpack configuration files within different [Wrangler environments](/workers/platform/environments/). For example, the `"webpack.development.js"` configuration file is used during `wrangler dev` for development, but other, more production-ready configurations are used when building for the staging or production environments:

```toml
---
filename: wrangler.toml
---
type = "webpack"
name = "my-worker-dev"
account_id = "12345678901234567890"
workers_dev = true
webpack_config = "webpack.development.js"

[env.staging]
name = "my-worker-staging"
webpack_config = "webpack.staging.js"

[env.production]
name = "my-worker-production"
webpack_config = "webpack.production.js"
```

```js
---
filename: webpack.development.js
---
module.exports = {
  target: 'webworker',
  devtool: 'cheap-module-source-map', // avoid "eval": Workers environment doesn’t allow it
  entry: './index.js',
  mode: 'development',
};
```

```js
---
filename: webpack.production.js
---
module.exports = {
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
};
```

### Using with Workers Sites

Wrangler commands are run from the project root. Ensure your `entry` and `context` are set appropriately. For a project with structure:

```txt
.
├── public
│   ├── 404.html
│   └── index.html
├── workers-site
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── webpack.config.js
└── wrangler.toml
```

The corresponding `webpack.config.js` file should look like this:

```js
---
filename: webpack.config.js
---
module.exports = {
  context: __dirname,
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
};
```

## Shimming globals

When you want to bring your own implementation of an existing global API, you may [shim](https://webpack.js.org/guides/shimming/#shimming-globals) a third-party module in its place as a webpack plugin.

For example, you may want to replace the `URL` global class with the `url-polyfill` npm package. After defining the package as a dependency in your `package.json` file and installing it, add a plugin entry to your webpack configuration.

### Example with webpack plugin

```js
---
filename: webpack.config.js
highlight: [1, 7, 8, 9, 10, 11]
---
const webpack = require('webpack');

module.exports = {
  target: 'webworker',
  entry: './index.js',
  mode: 'production',
  plugins: [
    new webpack.ProvidePlugin({
      URL: 'url-polyfill',
    }),
  ],
};
```

## Backwards compatibility

If you are using `wrangler@1.6.0` or earlier, a `webpack.config.js` file at the root of your project is loaded automatically. This is not always obvious, which is why versions of Wrangler after `wrangler@1.6.0` require you to specify a `webpack_config` value in your `wrangler.toml` file.

When [upgrading from `wrangler@1.6.0`](/workers/wrangler-legacy/install-update/#update), you may encounter webpack configuration warnings. To resolve this, add `webpack_config = "webpack.config.js"` to your `wrangler.toml` file.
