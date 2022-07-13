---
pcx-content-type: how-to
title: Configuration
weight: 3
---

# Configure `wrangler.toml`

Wrangler optionally uses a `wrangler.toml` configuration file to customize the development and publishing setup for a Worker. This document serves as a reference for all the fields and acceptable values in this configuration file.

The configuration for a Worker can become complex when you can define different [environments](/workers/platform/environments/), and each environment has its own configuration.
There is a default (top-level) environment and named environments that provide environment-specific configuration.

## Environments

Environments allow you to configure different configurations for different environments.

These are defined under `[env.name]` keys, such as `[env.staging]` which you can then preview or publish
with the `-e` / `--env` flag in the `wrangler` commands like `wrangler publish --env staging`.

Whilst the majority of keys are inheritable, meaning that top-level configuration can be used in environments,
bindings such as `vars` or `kv_namespaces` are not inheritable and need to be defined explicitly.

## Inheritable keys

Inheritable keys are configurable at the top-level, and can be inherited (or overridden)
by environment-specific configuration.

{{<Aside type="note">}}
At a minimum, `name`, `main` and `compatibility_date` are required to publish a Worker.
{{</Aside>}}

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of your Worker. Alphanumeric + dashes only.

- `main` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The entrypoint/path to the JavaScript file that will be executed.

- `compatibility_date` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - A date in the form `yyyy-mm-dd`, which will be used to determine which version of the Workers
    runtime is used. Refer to [compatibility dates](/workers/platform/compatibility-dates/).

- `account_id` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - This is the ID of the account associated with your zone. You might have more than one account,
    so make sure to use the ID of the account associated with the zone/route you provide, if you
    provide one. It can also be specified through the `CLOUDFLARE_ACCOUNT_ID` environment variable.

- `compatibility_flags` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of flags that enable features from upcoming features of the Workers runtime, usually
    used together with `compatibility_date`. Refer to [compatibility dates](/workers/platform/compatibility-dates/).

- `workers_dev` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether we use `<name>.<subdomain>.workers.dev` to test and deploy your Worker. If you have a Worker that
    is only for `scheduled` events, you can set this to `false`. Defaults to `true`.

- `route` {{<type-link href="#route-type">}}Route{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A route that your Worker should be published to. Only one of `routes` or `route` is required. Refer to [route type](#route-type).

- `routes` {{<type-link href="#route-type">}}Route[]{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - An array of routes that your Worker should be published to. Only one of `routes` or `route` is required. Refer to [route type](#route-type).

- `tsconfig` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Path to a custom tsconfig.

- `triggers` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Cron definitions to trigger a Worker's `scheduled` function. Refer to [triggers](#triggers)

- `usage_model` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The usage model of your Worker. Refer to [usage models](/workers/platform/pricing/#usage-models).

- `build` {{<type-link href="#build">}}Build{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Configures a custom build step to be run by Wrangler when building your Worker. Refer to [build](#build).

- `no_bundle` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Skip internal build steps and directly publish script, such as if you have a plain JavaScript Worker with
    no dependencies.

- `minify` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Minify the script before uploading.

- `node_compat` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Add polyfills for node builtin modules and globals. Refer to [node compatibility](#node-compatibility).

{{</definitions>}}

## Non-inheritable keys

Non-inheritable keys are configurable at the top-level, but cannot be inherited by environments and must be
specified for each environment.

{{<definitions>}}

- `define` {{<type>}}Record<string, string>{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A map of values to substitute when deploying your Worker.

- `vars` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A map of environment variables to set when deploying your Worker.

- `durable_objects` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of Durable Objects that your Worker should be bound to. Refer to [Durable Objects](#durable-objects).

- `kv_namespaces` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of KV namespaces that your Worker should be bound to. Refer to [KV namespaces](#kv-namespaces).

- `r2_buckets` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of R2 buckets that your Worker should be bound to. Refer to [R2 buckets](#r2-buckets).

- `services` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of service bindings that your Worker should be bound to. Refer to [service bindings](#service-bindings).

{{</definitions>}}

## Types of routes

There are four types of routes.

#### Simple Route

This is a simple route, which you will be accustomed to using from Wrangler 1.

Example: `"example.com/*"`

#### Zone ID Route

{{<definitions>}}

- `pattern` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The pattern that your Worker should be run on, e.g. `"example.com/*"`.

- `zone_id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the zone that your `pattern` is associated with.
    Refer to [find zone and account IDs](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/)

- `custom_domain` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether the `pattern` is an SSL for SaaS custom hostname. Defaults to `false`.

{{</definitions>}}

Example: `{ pattern = "example.com/*", zone_id = "foo" }`

#### Zone Name Route

{{<definitions>}}

- `pattern` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The pattern that your Worker should be run on, e.g. `"example.com/*"`.

- `zone_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the zone that your `pattern` is associated with.
    If you are using API tokens, this will require the `Account` scope.

- `custom_domain` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether the `pattern` is an SSL for SaaS custom hostname. Defaults to `false`.

{{</definitions>}}

Example: `{ pattern = "example.com/*", zone_id = "foo" }`

#### Custom Domain Route

This is a route that is associated with an SSL for SaaS custom hostname. If you are not using
SSL for SaaS, this is effectively a simple route.

{{<definitions>}}

- `pattern` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The pattern that your Worker should be run on, e.g. `"example.com/*"`.

- `custom_domain` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether the `pattern` is an SSL for SaaS custom hostname. Defaults to `false`.

{{</definitions>}}

Example:

```toml
route = { pattern = "example.com/*", custom_domain: true }
```

## Triggers

Triggers allow you to define the `cron` expression to invoke your Worker's `scheduled` function.
Refer to [supported cron expressions](/workers/platform/cron-triggers/#supported-cron-expressions).

{{<definitions>}}

- `cron` {{<type>}}string[]{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - An array of `cron` expressions.

{{</definitions>}}

Example:

```toml
[triggers]
crons = ["1 * * * *"]
```

## Custom Builds

You can configure a custom build step that will be run before your Worker is published.
Refer to [custom builds](/workers/wrangler/custom-builds/).

{{<definitions>}}

- `command` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell
    and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.

- `cwd` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory in which the command is executed.

- `watch_dir` {{<type>}}string | string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory to watch for changes while using `wrangler dev`. Defaults to the current working directory.

{{</definitions>}}

Example:

```toml
[build]
command = "npm run build"
cwd = "build_cwd"
watch_dir = "build_watch_dir"
```

## Bindings

### Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform.
Refer to [using Durable Objects](/workers/learning/using-durable-objects/).

To bind Durable Objects to your Worker, assign an array of the below object to the `durable_objects.bindings` key.

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the binding used to refer to the Durable Object.

- `class_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The exported class name of the Durable Object.

- `script_name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The script where the Durable Object is defined, if it's external to this Worker.

- `environment` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The service environment of the `script_name` to bind to.


{{</definitions>}}

Example:

```toml
durable_objects.bindings = [
  { name = "TEST_OBJECT", class_name = "TEST_CLASS" }
]
```

### KV Namespaces

Workers KV is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers,
then caches that data in Cloudflare’s data centers after access.
Refer to [KV](/workers/runtime-apis/kv/).

To bind KV namespaces to your Worker, assign an array of the below object to the `kv_namespaces` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the KV namespace.

- `id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the KV namespace

- `preview_id` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The ID of the KV namespace used during `wrangler dev`

{{</definitions>}}

Example:

```toml
kv_namespaces = [
  { binding = "TEST_NAMESPACE", id = "TEST_ID" }
]
```

### R2 Buckets

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.
Refer to [R2](/r2).

To bind R2 buckets to your Worker, assign an array of the below object to the `r2_buckets` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the R2 bucket.

- `bucket_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of this R2 bucket.

- `preview_bucket_name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The preview name of this R2 bucket used during `wrangler dev`.

{{</definitions>}}

Example:

```toml
r2_buckets  = [
  { binding = "TEST_BUCKET", bucket_name = "TEST_BUCKET"}
]
```

### Service Bindings

A Service binding allows you to send HTTP requests to another Worker without those requests going over the Internet.
The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service.
Refer to [About Service Bindings](/workers/platform/bindings/about-service-bindings/).

To bind other Workers to your Worker, assign an array of the below object to the `services` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the bound service.

- `service` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the service.

- `environment` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  -  The environment of the service (e.g. `production`, `staging`, etc). Refer to [Service Environments](/workers/platform/environments/).

{{</definitions>}}

Example:

```toml
services = [
  { binding = "TEST_BINDING", service = "TEST_WORKER" }
]
```

## Local development settings

You can configure various aspects of local development, such as the local protocol or port.

{{<definitions>}}

- `ip` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - IP address for the local dev server to listen on. Defaults to `localhost`.

- `port` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Port for the local dev server to listen on. Defaults to `8787`.

- `local_protocol` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  -  Protocol that local dev server listens to requests on. Defaults to `http`.

- `upstream_protocol` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  -  Protocol that the local dev server forwards requests on. Defaults to `https`.

- `host` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  -  Host to forward requests to, defaults to the host of the first `route` of the Worker.

{{</definitions>}}

Example:

```toml
[dev]
ip = "192.168.1.1"
port = "8080"
local_protocol = "http"
```

{{<definitions>}}

## Node compatibility

You can add experimental Node compatibility to your Worker by adding the `node_compat` key to your `wrangler.toml`
or by passing the `--node-compat` flag to `wrangler`.

It's not possible to polyfill all Node APIs or behaviours, but it's possible to polyfill some of them. APIs such as `fs`
can't be replicated as Workers has no concept of a filesystem.

This is currently powered by `@esbuild-plugins/node-globals-polyfill`
which in itself is powered by [rollup-plugin-node-polyfills](https://github.com/ionic-team/rollup-plugin-node-polyfills/).

## Example configuration

```toml
---
filename: wrangler.toml
---
# Top-level configuration
name = "my-worker"
main = "src/index.js"
compatibility_date = "2022-07-12"

workers_dev = false
route = { pattern = "example.org/*", zone_name = "example.org" }

kv_namespaces = [
  { binding = "MY_NAMESPACE", id = "KV_ID" }
]

[env.staging]
name = "my-worker-staging"
route = { pattern = "staging.example.org/*", zone_name = "example.org" }

kv_namespaces = [
  { binding = "MY_NAMESPACE", id = "STAGING_KV_ID" }
]
```
