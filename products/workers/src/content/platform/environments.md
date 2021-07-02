---
order: 6
pcx-content-type: concept
---

# Environments

<Aside>

__Note__: You can only interact with environments using [wrangler](/cli-wrangler).

</Aside>

## Background

Environments are different contexts that your code runs in. The Workers platform allows you to create and manage different environments. Through environments, users are able to deploy the same project to multiple places under multiple names.

These environments are utilized with the `--env` or `-e` flag on `wrangler build`, `wrangler dev`, `wrangler preview`, `wrangler publish` and `wrangler secret`.

--------------------------------

## Usage

The most common use case for environments is deploying to a staging subdomain before your production environment. `wrangler publish` will determine its destination by your top level configuration in your `wrangler.toml` file. Users can create other environments beneath the top level configuration in the `wrangler.toml` file through an [[env.name] configuration](/workers/cli-wrangler/configuration#environments) and specifying additional keys and values. For details on what keys are inherited by your environemnts from the top level configuration see [`wrangler.toml` configuration](/cli-wrangler/configuration#keys).

### Naming

You cannot specify multiple environments with the same name. If this were allowed, publishing each environment would overwrite your previously deployed Worker, and the behavior would not be clear.

For this reason, Wrangler **appends the environment name to the top-level name to publish a Worker script**. For example, a Worker project named `my-worker` with an environment `[env.dev]` would become `my-worker-dev`.

--------------------------------

## Examples

### Top level configuration

#### Routes

This `wrangler.toml` has no environments defined and will publish `my-worker` to `example.com/*`

```toml
---
filename: wrangler.toml
---
type = "webpack"
name = "my-worker"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"
```

```sh
~/my-worker $ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to example.com/*
```

#### workers.dev

This `wrangler.toml` has no environments defined and will publish `my-worker` to `my-worker.<your-subdomain>.workers.dev`

```toml
---
filename: wrangler.toml
---
type = "webpack"
name = "my-worker"
account_id = "12345678901234567890"

# this field specifies that the worker
# should be deployed to *.workers.dev
workers_dev = true
```

```sh
~/my-worker $ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker.<your-subdomain>.workers.dev
```

### Introducing environments

This `wrangler.toml` adds two environments, `[env.staging]` and `[env.production]`, to the `wrangler.toml` file. Note that you must provide a [route/routes key](/workers/cli-wrangler/configuration#keys) for each environment if you are deploying to a custom domain.

```toml
---
filename: wrangler.toml
---
type = "webpack"
name = "my-worker-dev"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "dev.example.com/*"
vars = { ENVIRONMENT = "dev" }

[env.staging]
name = "my-worker-staging"
vars = { ENVIRONMENT = "staging" }
route = "staging.example.com/*"

[env.production]
name = "my-worker"
vars = { ENVIRONMENT = "production" }
routes = [
  "example.com/foo/*",
  "example.com/bar/*"
]
```

In order to use environments with this configuration, you can pass the name of the environment via the `--env` flag.

With this configuration, Wrangler will behave in the following manner:

```sh
~/my-worker $ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to dev.example.com/*
```

```sh
~/my-worker $ wrangler publish --env staging
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to staging.example.com/*
```

```sh
~/my-worker $ wrangler publish --env production
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to example.com/*
```

Once a text variable is uploaded via [wrangler](/cli-wrangler) or in the UI, the string is exposed on the global namespace as type [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

With this configuration, the `ENVIRONMENT` variable can be used to call specific code depending on the given environment:

```js
if (ENVIRONMENT === "staging") {
  // staging-specific code
} else if (ENVIRONMENT === "production") {
  // production-specific code
}
```

### Staging Environment with workers.dev

In order to deploy your code to workers.dev, you must include `workers_dev = true` in the desired environment. Your `wrangler.toml` may look like this:

```toml
---
filename: wrangler.toml
---
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"

[env.staging]
workers_dev = true
```

With this configuration, Wrangler will behave in the following manner:

```sh
~/my-worker $ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to example.com/*
```

```sh
~/my-worker $ wrangler publish --env staging
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker-staging.<your-subdomain>.workers.dev
```

### workers.dev as a first class target

If you only want to deploy to workers.dev, you can configure Wrangler like so:

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"
type = "webpack"
account_id = "12345678901234567890"
workers_dev = true

[env.production]
name = "my-worker"

[env.staging]
name = "my-worker-staging"
```

With this configuration, Wrangler will behave in the following manner:

```sh
~/my-worker $ wrangler publish
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker-dev.<your-subdomain>.workers.dev
```

```sh
~/my-worker $ wrangler publish --env staging
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker-staging.<your-subdomain>.workers.dev
```

```sh
~/my-worker $ wrangler publish --env production
✨  Built successfully, built project size is 523 bytes.
✨  Successfully published your script to https://my-worker.<your-subdomain>.workers.dev
```

--------------------------------

## Custom webpack configurations

You can specify different webpack configurations for different environments.

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"
type = "webpack"
account_id = "12345678901234567890"
workers_dev = true
webpack_config = "webpack.dev.js"

[env.production]
name = "my-worker"
webpack_config = "webpack.config.js"

[env.staging]
name = "my-worker-staging"
```

Your default `wrangler build`, `wrangler preview`, and `wrangler publish` commands will all build with `webpack.dev.js`, as will `wrangler build -e staging`, `wrangler preview -e staging`, and `wrangler publish -e staging`.

The build commands `wrangler build -e production`, `wrangler preview -e production`, and `wrangler publish -e production` would all use your `webpack.config.js` file.

--------------------------------

## Environment variables

You can specify different KV namespaces, secrets, and text variables for different environments.

```toml
---
filename: wrangler.toml
---
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
workers_dev = true
kv_namespaces = [
  { binding = "KV", id = "06779da6940b431db6e566b4846d64db" }
]

[env.production]
kv_namespaces = [
  { binding = "KV", id = "bd46d6484b665e6bd134b0496ad97760" }
]
vars = {FOO = "some text"} # Creates & Sets Environment Variable FOO to "some text"
```

<Aside type="warning">

\* __Warning:__ We do not recommend using text variables to store secrets. If possible use the [`wrangler secret put`](/cli-wrangler/commands#secret) command instead.

</Aside>

<Aside>

__Note:__ Secret variables can only be assigned to specific environments by passing the `-e/--env <environment_name>` flag while using the [`wrangler secret put`](/cli-wrangler/commands#secret) command.

</Aside>

--------------------------------

## Invalid configurations

### Multiple types

You cannot specify a type for each environment, type must be specified at the top level of your `wrangler.toml`.

```toml
---
filename: wrangler.toml
---
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"
workers_dev = true

[env.staging]
type = "rust"
```

Wrangler will not error with this configuration, it will build with the `webpack` type.

### Same name for multiple environments

You cannot specify multiple environments with the same name. If this were allowed, publishing each environment would overwrite your previously deployed worker, and the behavior would not be clear.

```toml
---
filename: wrangler.toml
---
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"

[env.staging]
name = "my-worker"
workers_dev = true
```

```sh
~/my-worker $ wrangler publish
Error: ⚠️  Each name in your `wrangler.toml` must be unique, this name is duplicated: my-worker
```

```sh
~/my-worker $ wrangler publish --env staging
Error: ⚠️  Each name in your `wrangler.toml` must be unique, this name is duplicated: my-worker
```

### Defining workers_dev and route

```toml
name = "my-worker"
type = "webpack"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "example.com/*"
workers_dev = true

[env.staging]
workers_dev = true
route = "staging.example.com/*"
```

Wrangler will fail to publish to an environment where `route` is defined alongside `workers_dev = true`.

```sh
~/my-worker $ wrangler publish
Error: ⚠️  Your environment should only include `workers_dev` or `route`. If you are trying to publish to workers.dev, remove `route` from your wrangler.toml, if you are trying to publish to your own domain, remove `workers_dev`.
```

```sh
~/my-worker $ wrangler publish --env staging
Error: ⚠️  Your environment should only include `workers_dev` or `route`. If you are trying to publish to workers.dev, remove `route` from your wrangler.toml, if you are trying to publish to your own domain, remove `workers_dev`.
```
