---
order: 4
---

# Webpack

Out of the box, Wrangler allows you to develop modern ES6 applications with support for modules. This is because of the 🧙‍♂️ magic of [webpack](https://webpack.js.org/). This document describes how Wrangler uses webpack to build your Workers, and how you can bring your own configuration.

<Aside>

__Note:__ You must set `type = "webpack"` in your `wrangler.toml` in order for Wrangler to use webpack to bundle your worker scripts. No other types will build your script with webpack.

</Aside>

<Aside>

If you’re seeing warnings about specifying `webpack_config`, see [backwards compatibility](#backwards-compatibility).

</Aside>

## Sensible defaults

This is the default webpack configuration that Wrangler uses to build your worker:

```js
module.exports = {
  target: "webworker",
  entry: "./index.js" // inferred from "main" in package.json
}
```

Our default configuration sets `target` to `webworker`. From the [webpack docs](https://webpack.js.org/concepts/targets/):

> Because JavaScript can be written for both server and browser, webpack offers multiple deployment targets that you can set in your webpack configuration.

Cloudflare Workers are built to match the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), so we set our `target` to `webworker`.

The `entry` field is taken directly from the `main` field in your `package.json`. Learn [more about the `entry` property](https://webpack.js.org/concepts/entry-points/) on the webpack site.

## Bring your own configuration

You can tell Wrangler to use a custom webpack configuration file by setting `webpack_config` in your `wrangler.toml`. You’ll want to make sure that `target` is always `webworker`.

### Example

```js
---
filename: webpack.config.js
---
module.exports = {
  target: "webworker",
  entry: "./index.js",
  mode: "production"
}
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
  target: "webworker",
  devtool: "cheap-module-source-map", // avoid "eval": Workers environment doesn’t allow it
  entry: "./index.js",
  mode: "development"
}
```

```js
---
filename: webpack.production.js
---
module.exports = {
  target: "webworker",
  entry: "./index.js",
  mode: "production"
}
```

### Using with Workers Sites

Wrangler commands are run from the project root, so ensure your `entry` and `context` are set appropriately. For a project with structure:

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

`webpack.config.js` should look like this:

```js
---
filename: webpack.config.js
---
module.exports = {
  context: __dirname,
  target: "webworker",
  entry: "./index.js",
  mode: "production"
}
```

## Shimming globals

Sometimes you want to bring your own implementation of an existing global API. You can do this by [shimming](https://webpack.js.org/guides/shimming/#shimming-globals) a third party module in its place as a webpack plugin.

For example, to replace the runtime global `URL` class with the npm package `url-polyfill` — or your choice of third party package — `npm i` the package to install it locally and add it to your worker’s package.json, then add a plugin entry to your webpack config.

### Example with webpack plugin

```js
---
filename: webpack.config.js
highlight: [1, 7, 8, 9, 10, 11]
---
const webpack = require("webpack")

module.exports = {
  target: "webworker",
  entry: "./index.js",
  mode: "production",
  plugins: [
    new webpack.ProvidePlugin({
      URL: "url-polyfill",
    }),
  ],
}
```

## Backwards compatibility

If you are using a version of Wrangler before 1.6.0, worker projects will simply use any `webpack.config.js` that is in the root of your project. This is not always obvious, so we plan to require that you specify `webpack_config` in your `wrangler.toml` if you would like to use it. If you’re seeing this warning and would like to use your `webpack.config.js`, simply add `webpack_config = "webpack.config.js"` to your wrangler.toml.

If you are using Workers Sites and want to specify your own webpack configuration, you will always need to specify this. By default, Wrangler will not assume the `webpack.config.js` at the root of your project is meant to be used for building your Worker.
