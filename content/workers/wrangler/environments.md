---
pcx_content_type: concept
title: Environments
---

# Environments

## Background

Wrangler allows you to deploy the same Worker application with different configuration for each environment. You must configure environments in your Worker application's `wrangler.toml` file.

Review the following environments flow:

1. You have created a Worker application named `my-worker`.
2. You create an environment, for example, `dev`, in the Worker's `wrangler.toml` configuration file.
3. In `wrangler.toml`, you configure the `dev` environment by [adding bindings](/workers/platform/bindings/) and/or [routes](/workers/platform/triggers/routes/).
4. You deploy the Worker using `npx wrangler deploy -e dev`.
5. In the background, Wrangler creates a new Worker named `my-worker-dev`.
6. You can now change your `my-worker` Worker code and configuration, and choose which environment to deploy your changes to.

Environments are used with the `--env` or `-e` flag on `wrangler dev`, `wrangler deploy`, and `wrangler secret`.

---

## Configuration

To create an environment:

1. Open your Worker's `wrangler.toml` file.
2. Add `[env.<NAME>]` and change `<NAME>` to the desired name of your environment.
3. Repeat step 2 to create multiple environments.

Be careful when naming your environments that they do not contain sensitive information, such as, `migrating-service-from-company1-to-company2` or `company1-acquisition-load-test`.

Review the layout of an example `[env.dev]` environment that sets up a custom `dev.example.com` route:

```toml
---
filename: wrangler.toml
---
name = "your-worker"
route = "example.com"

[env.dev]
route = "dev.example.com"
```

You cannot specify multiple environments with the same name.

Wrangler appends the environment name to the top-level name to deploy a Worker. For example, a Worker project named `my-worker` with an environment `[env.dev]` would deploy a Worker named `my-worker-dev`.

{{<Aside type="warning" header="Inheritable keys and bindings">}}

Review [Wrangler Environments Configuration documentation](/workers/wrangler/configuration/#environments) to learn more about inheritable keys in top-level configuration.

{{</Aside>}}

After you have configured your environment, run `npx wrangler deploy` in your Worker project directory for the changes to take effect.

---

## Examples

### Staging and production environments

The following `wrangler.toml` file adds two environments, `[env.staging]` and `[env.production]`, to the `wrangler.toml` file. If you are deploying to a [Custom Domain](/workers/platform/triggers/custom-domains/) or [route](/workers/platform/triggers/routes/), you must provide a [`route` or `routes` key](/workers/wrangler/configuration/) for each environment.

```toml
---
filename: wrangler.toml
---
name = "my-worker"
route = "dev.example.com/*"
vars = { ENVIRONMENT = "dev" }

[env.staging]
vars = { ENVIRONMENT = "staging" }
route = "staging.example.com/*"

[env.production]
vars = { ENVIRONMENT = "production" }
routes = [
  "example.com/foo/*",
  "example.com/bar/*"
]
```

In order to use environments with this configuration, you can pass the name of the environment via the `--env` flag.

With this configuration, Wrangler will behave in the following manner:

```sh
~/my-worker $ npx wrangler deploy
Uploaded my-worker
Published my-worker
  dev.example.com/*
```

```sh
~/my-worker $ npx wrangler deploy --env staging
Uploaded my-worker-staging
Published my-worker-staging
  staging.example.com/*
```

```sh
~/my-worker $ wrangler deploy --env production
Uploaded my-worker-production
Published my-worker-production
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

### Staging environment with \*.workers.dev

To deploy your code to your `*.workers.dev` subdomain, include `workers_dev = true` in the desired environment. Your `wrangler.toml` file may look like this:

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
~/my-worker $ npx wrangler deploy
Uploaded my-worker
Published my-worker
  example.com/*
```

```sh
~/my-worker $ npx wrangler deploy --env staging
Uploaded my-worker
Published my-worker
  https://my-worker-staging.<YOUR_SUBDOMAIN>.workers.dev
```

{{<Aside type="warning">}}

When you create a Worker or environment, Cloudflare automatically registers an SSL certification for it. SSL certifications are discoverable and a matter of public record. Be careful when naming your Services and Environments that they do not contain sensitive information, such as, `migrating-service-from-company1-to-company2` or `company1-acquisition-load-test`.

{{</Aside>}}

