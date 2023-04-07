---
pcx_content_type: concept
title: Environments
---

# Environments

## Background

Environments are different contexts that your code runs in. The Workers platform allows you to create and manage different environments. Through environments, you can deploy the same project to multiple places under multiple names.

These environments are utilized with the `--env` or `-e` flag on `wrangler build`, `wrangler dev`, `wrangler preview`, `wrangler publish`, and `wrangler secret`.

---

### Naming

You cannot specify multiple environments with the same name. If this were allowed, publishing each environment would overwrite your previously deployed Worker and the behavior would not be clear.

For this reason, Wrangler appends the environment name to the top-level name to publish a Worker. For example, a Worker project named `my-worker` with an environment `[env.dev]` would become `my-worker-dev`.

The layout of an example `[env.dev]` environment is displayed below:

```toml
---
filename: wrangler.toml
---
name = "your-worker"

[env.dev]
name = "your-worker-dev"
route = "your-custom-route"
```

---

## Examples

### Top-level configuration

#### Publishing to a custom domain

This `wrangler.toml` file has no environments defined and will publish `my-worker` to `example.com/*`.
The `workers_dev` key is missing from this example, but because a route is specified, the inferred value of `workers_dev` is `false`.

```toml
---
filename: wrangler.toml
---
name = "my-worker"

# These fields specify that the Worker
# will deploy to a custom domain
route = "example.com/*"
```

To deploy this Worker, run the `wrangler publish` command in your terminal:

```sh
~/my-worker $ wrangler publish
Uploaded my-worker
Published my-worker
  example.com/*
```

#### Publishing to \*.workers.dev

Your `*.workers.dev` subdomain allows you to deploy Workers [without attaching a custom domain as a Cloudflare zone](https://blog.cloudflare.com/announcing-workers-dev/). To claim a `*.workers.dev` subdomain, such as `my-subdomain.workers.dev`, select the **Workers** icon on your account home, or **Workers** then **Manage Workers** on your zone's dashboard, and begin setup on the right side of the Workers dashboard under **Your subdomain**.

This `wrangler.toml` file has no environments defined and will publish `my-worker` to `my-worker.<your-subdomain>.workers.dev`:

```toml
---
filename: wrangler.toml
---
name = "my-worker"

# By not specifying any routes, the Worker
# should be deployed to *.workers.dev
```

This example will publish to your `*.workers.dev` subdomain because `workers_dev` has been set to `true`.

Run `wrangler publish` as normal to deploy your Worker:

```sh
~/my-worker $ wrangler publish
Uploaded my-worker
Published my-worker
  https://my-worker.<your-subdomain>.workers.dev
```

### Introducing environments

Environments enable you to write and deploy projects to multiple places.

You can define an environment by specifying an `[env.name]` block with its own values in your `wrangler.toml` file. Values within this block may override top-level configuration values with the same key.

The `wrangler.toml` file below adds two environments, `[env.staging]` and `[env.production]`, to the `wrangler.toml` file. If you are deploying to a custom domain, you must provide a [`route` or `routes` key](/workers/wrangler/configuration/) for each environment.

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"
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
Uploaded my-worker-dev
Published my-worker-dev
  dev.example.com/*
```

```sh
~/my-worker $ wrangler publish --env staging
Uploaded my-worker-staging
Published my-worker-staging
  staging.example.com/*
```

```sh
~/my-worker $ wrangler publish --env production
Uploaded my-worker
Published my-worker
  example.com/*
```

Any defined [environment variables](/workers/platform/environment-variables/) (the [`vars`](/workers/wrangler/configuration/) key) are exposed as global variables to your Worker.

With this configuration, the `ENVIRONMENT` variable can be used to call specific code depending on the given environment:

```js
if (ENVIRONMENT === "staging") {
  // staging-specific code
} else if (ENVIRONMENT === "production") {
  // production-specific code
}
```

### Staging Environment with workers.dev

In order to deploy your code to your `*.workers.dev` subdomain, include `workers_dev = true` in the desired environment. Your `wrangler.toml` file may look like this:

```toml
---
filename: wrangler.toml
---
name = "my-worker"
route = "example.com/*"

[env.staging]
workers_dev = true
```

With this configuration, Wrangler will behave in the following manner:

```sh
~/my-worker $ wrangler publish
Uploaded my-worker
Published my-worker
  example.com/*
```

```sh
~/my-worker $ wrangler publish --env staging
Uploaded my-worker
Published my-worker
  https://my-worker-staging.<your-subdomain>.workers.dev
```

### workers.dev as a first-class target

If you want to connect multiple environments to your `*.workers.dev` subdomain, you must assign a different `name` per environment. This allows your Worker to be uploaded as different scripts, each given its own set of [environment variables](/workers/platform/environment-variables/), secrets, and KV namespaces. Configure your `wrangler.toml` file like the example below:

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"

[env.production]
name = "my-worker"

[env.staging]
name = "my-worker-staging"
```

With this configuration, deploy each environment by attaching a `--env` or `-e` flag and the name of the environment like the examples below:

```sh
~/my-worker $ wrangler publish
Uploaded my-worker-dev
Published my-worker-dev
  https://my-worker-dev.<your-subdomain>.workers.dev
```

```sh
~/my-worker $ wrangler publish --env staging
Uploaded my-worker-staging
Published my-worker-staging
  https://my-worker-staging.<your-subdomain>.workers.dev
```

```sh
~/my-worker $ wrangler publish --env production
Uploaded my-worker
Published my-worker
  https://my-worker.<your-subdomain>.workers.dev
```

{{<Aside type="note">}}

When you create a Service or Environment, Cloudflare automatically registers an SSL certification for it. SSL certifications are discoverable and a matter of public record. Be careful when naming your Services and Environments that they do not contain sensitive information i.e `migrating-service-from-company1-to-company2` or `company1-acquisition-load-test`.

{{</Aside>}}
