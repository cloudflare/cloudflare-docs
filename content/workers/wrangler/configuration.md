---
pcx_content_type: configuration
title: Configuration
meta:
  title: Configuration - Wrangler
  description: Use a `wrangler.toml` configuration file to customize the development and deployment setup for your Worker project and other Developer Platform products.
---

# Configure `wrangler.toml`

Wrangler optionally uses a `wrangler.toml` configuration file to customize the development and deployment setup for a Worker.

{{<Aside type="warning">}}
Wrangler currently supports an `--experimental-json-config` flag, which will read your configuration from a `wrangler.json` file, rather than `wrangler.toml`. The format of this file is exactly the same as the `wrangler.toml` configuration file, except that the syntax is `JSON` rather than `TOML`. This is experimental, and is not recommended for production use.
{{</Aside>}}

It is best practice to treat `wrangler.toml` as the [source of truth](#source-of-truth) for configuring a Worker.

## Sample `wrangler.toml` configuration

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
  { binding = "<MY_NAMESPACE>", id = "<KV_ID>" }
]

[env.staging]
name = "my-worker-staging"
route = { pattern = "staging.example.org/*", zone_name = "example.org" }

kv_namespaces = [
  { binding = "<MY_NAMESPACE>", id = "<STAGING_KV_ID>" }
]
```

## Environments

The configuration for a Worker can become complex when you define different [environments](/workers/wrangler/environments/), and each environment has its own configuration.
There is a default (top-level) environment and named environments that provide environment-specific configuration.

These are defined under `[env.name]` keys, such as `[env.staging]` which you can then preview or deploy with the `-e` / `--env` flag in the `wrangler` commands like `npx wrangler deploy --env staging`.

The majority of keys are inheritable, meaning that top-level configuration can be used in environments. [Bindings](/workers/runtime-apis/bindings/), such as `vars` or `kv_namespaces`, are not inheritable and need to be defined explicitly.

Further, there are a few keys that can *only* appear at the top-level.

## Top-level only keys

Top-level keys apply to the Worker as a whole (and therefore all environments). They cannot be defined within named environments.

{{<definitions>}}

- `keep_vars` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether Wrangler should keep variables configured in the dashboard on deploy. Refer to [source of truth](#source-of-truth).

- `send_metrics` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether Wrangler should send usage metrics to Cloudflare for this project.

- `site` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - See the [Workers Sites](#workers-sites) section below for more information. Cloudflare Pages is preferred over this approach.

{{</definitions>}}

## Inheritable keys

Inheritable keys are configurable at the top-level, and can be inherited (or overridden) by environment-specific configuration.

{{<Aside type="note">}}
At a minimum, the `name`, `main` and `compatibility_date` keys are required to deploy a Worker.
{{</Aside>}}

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of your Worker. Alphanumeric characters (`a`,`b`,`c`, etc.) and dashes (`-`) only. Do not use underscores (`_`).

- `main` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The path to the entrypoint of your Worker that will be executed. For example: `./src/index.ts`.

- `compatibility_date` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - A date in the form `yyyy-mm-dd`, which will be used to determine which version of the Workers runtime is used. Refer to [Compatibility dates](/workers/configuration/compatibility-dates/).

- `account_id` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the zone/route you provide, if you provide one. It can also be specified through the `CLOUDFLARE_ACCOUNT_ID` environment variable.

- `compatibility_flags` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of flags that enable features from upcoming features of the Workers runtime, usually used together with `compatibility_date`. Refer to [compatibility dates](/workers/configuration/compatibility-dates/).

- `workers_dev` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Enables use of `*.workers.dev` subdomain to test and deploy your Worker. If you have a Worker that is only for `scheduled` events, you can set this to `false`. Defaults to `true`.

- `route` {{<type-link href="#types-of-routes">}}Route{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A route that your Worker should be deployed to. Only one of `routes` or `route` is required. Refer to [types of routes](#types-of-routes).

- `routes` {{<type-link href="#types-of-routes">}}Route[]{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - An array of routes that your Worker should be deployed to. Only one of `routes` or `route` is required. Refer to [types of routes](#types-of-routes).

- `tsconfig` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Path to a custom `tsconfig`.

- `triggers` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Cron definitions to trigger a Worker's `scheduled` function. Refer to [triggers](#triggers).

- `rules`  {{<type-link href="#bundling">}}Rule{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - An ordered list of rules that define which modules to import, and what type to import them as. You will need to specify rules to use `Text`, `Data` and `CompiledWasm` modules, or when you wish to have a `.js` file be treated as an `ESModule` instead of `CommonJS`.

- `build` {{<type-link href="#custom-builds">}}Build{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Configures a custom build step to be run by Wrangler when building your Worker. Refer to [Custom builds](#custom-builds).

- `no_bundle` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Skip internal build steps and directly deploy your Worker script. You must have a plain JavaScript Worker with no dependencies.

- `minify` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Minify the Worker script before uploading.

- `node_compat` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Add polyfills for Node.js built-in modules and globals. Refer to [Node compatibility](#node-compatibility).

- `preserve_file_names` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Determines whether Wrangler will preserve the file names of additional modules bundled with the Worker.
    The default is to prepend filenames with a content hash.
    For example, `34de60b44167af5c5a709e62a4e20c4f18c9e3b6-favicon.ico`.

- `logpush` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Enables Workers Trace Events Logpush for a Worker. Any scripts with this property will automatically get picked up by the Workers Logpush job configured for your account. Defaults to `false`.

- `limits` {{<type-link href="#limits">}}Limits{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Configures limits to be imposed on execution at runtime. Refer to [Limits](#limits).

{{</definitions>}}

### Usage model

As of March 1, 2024 the [usage model](/workers/platform/pricing/#workers) configured in your Worker's `wrangler.toml` will be ignored. The [Standard](/workers/platform/pricing/#example-pricing-standard-usage-model) usage model applies.

Some Workers Enterprise customers maintain the ability to change usage models. Your usage model must be configured through the Cloudflare dashboard by going to **Workers & Pages** > select your Worker > **Settings** > **Usage Model**.


## Non-inheritable keys

Non-inheritable keys are configurable at the top-level, but cannot be inherited by environments and must be specified for each environment.

{{<definitions>}}

- `define` {{<type>}}Record<string, string>{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A map of values to substitute when deploying your Worker.

- `vars` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A map of environment variables to set when deploying your Worker. Refer to [Environment variables](/workers/configuration/environment-variables/).

- `durable_objects` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of Durable Objects that your Worker should be bound to. Refer to [Durable Objects](#durable-objects).

- `kv_namespaces` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of KV namespaces that your Worker should be bound to. Refer to [KV namespaces](#kv-namespaces).

- `r2_buckets` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of R2 buckets that your Worker should be bound to. Refer to [R2 buckets](#r2-buckets).

- `vectorize` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of Vectorize indexes that your Worker should be bound to.. Refer to [Vectorize indexes](#vectorize-indexes).

- `services` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of service bindings that your Worker should be bound to. Refer to [service bindings](#service-bindings).

- `tail_consumers` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of the Tail Workers your Worker sends data to. Refer to [Tail Workers](/workers/observability/logging/tail-workers/).

{{</definitions>}}

## Types of routes

There are three types of [routes](/workers/configuration/routing/): [Custom Domains](/workers/configuration/routing/custom-domains/), [routes](/workers/configuration/routing/routes/), and [`workers.dev`](/workers/configuration/routing/workers-dev/).

### Custom Domains

[Custom Domains](/workers/configuration/routing/custom-domains/) allow you to connect your Worker to a domain or subdomain, without having to make changes to your DNS settings or perform any certificate management.

{{<definitions>}}

- `pattern` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The pattern that your Worker should be run on, for example, `"example.com"`.

- `custom_domain` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether the Worker should be on a Custom Domain as opposed to a route. Defaults to `false`.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
route = { pattern = "example.com", custom_domain = true }

# or

routes = [
	{ pattern = "shop.example.com", custom_domain = true }
]
```

### Routes

[Routes](/workers/configuration/routing/routes/) allow users to map a URL pattern to a Worker. A route can be configured as a zone ID route, a zone name route, or a simple route.

#### Zone ID route

{{<definitions>}}

- `pattern` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The pattern that your Worker can be run on, for example,`"example.com/*"`.

- `zone_id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the zone that your `pattern` is associated with. Refer to [Find zone and account IDs](/fundamentals/setup/find-account-and-zone-ids/).

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
routes = [
	{ pattern = "subdomain.example.com/*", zone_id = "<YOUR_ZONE_ID>" }
]
```

#### Zone name route

{{<definitions>}}

- `pattern` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The pattern that your Worker should be run on, for example, `"example.com/*"`.

- `zone_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the zone that your `pattern` is associated with. If you are using API tokens, this will require the `Account` scope.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
routes = [
	{ pattern = "subdomain.example.com/*", zone_name = "example.com" }
]
```

#### Simple route

This is a simple route that only requires a pattern.

Example:

```toml
---
header: wrangler.toml
---
route = "example.com/*"
```

### `workers.dev`

Cloudflare Workers accounts come with a `workers.dev` subdomain that is configurable in the Cloudflare dashboard.

{{<definitions>}}

- `workers_dev` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether the Worker runs on a custom `workers.dev` account subdomain. Defaults to `true`.

{{</definitions>}}

```toml
---
header: wrangler.toml
---
workers_dev = false
```


## Triggers

Triggers allow you to define the `cron` expression to invoke your Worker's `scheduled` function. Refer to [Supported cron expressions](/workers/configuration/cron-triggers/#supported-cron-expressions).

{{<definitions>}}

- `crons` {{<type>}}string[]{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - An array of `cron` expressions.
  - To disable a Cron Trigger, set `crons = []`. Commenting out the `crons` key will not disable a Cron Trigger.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[triggers]
crons = ["* * * * *"]
```

## Custom builds

You can configure a custom build step that will be run before your Worker is deployed. Refer to [Custom builds](/workers/wrangler/custom-builds/).

{{<definitions>}}

- `command` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.

- `cwd` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory in which the command is executed.

- `watch_dir` {{<type>}}string | string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory to watch for changes while using `wrangler dev`. Defaults to the current working directory.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[build]
command = "npm run build"
cwd = "build_cwd"
watch_dir = "build_watch_dir"
```

## Limits

You can impose limits on your Worker's behavior at runtime. Limits are only supported for the [Standard Usage Model](/workers/platform/pricing/#example-pricing-standard-usage-model). Limits are only enforced when deployed to Cloudflare's network, not in local development. The CPU limit can be set to a maximum of 30,000 milliseconds (30 seconds).

{{<render file="_isolate-cpu-flexibility">}}
<br/>


{{<definitions>}}

- `cpu_ms` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum CPU time allowed per invocation, in milliseconds.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[limits]
cpu_ms = 100
```

## Bindings

### Browser Rendering

The [Workers Browser Rendering API](/browser-rendering/) allows developers to programmatically control and interact with a headless browser instance and create automation flows for their applications and products.

A [browser binding](/workers/runtime-apis/bindings/) will provide your Worker with an authenticated endpoint to interact with a dedicated Chromium browser instance.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the D1 database. The value (string) you set will be used to reference this database in your Worker. The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_DB"` or `binding = "productionDB"` would both be valid names for the binding.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
browser = { binding = "<BINDING_NAME>" }

# or

[browser]
binding = "<BINDING_NAME>"
```

### D1 databases

[D1](/d1/) is Cloudflare's serverless SQL database. A Worker can query a D1 database (or databases) by creating a [binding](/workers/runtime-apis/bindings/) to each database for D1's [client API](/d1/build-with-d1/d1-client-api/).

To bind D1 databases to your Worker, assign an array of the below object to the `[[d1_databases]]` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the D1 database. The value (string) you set will be used to reference this database in your Worker. The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_DB"` or `binding = "productionDB"` would both be valid names for the binding.

- `database_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the database. This is a human-readable name that allows you to distinguish between different databases, and is set when you first create the database.

- `database_id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the database. The database ID is available when you first use `wrangler d1 create` or when you call `wrangler d1 list`, and uniquely identifies your database.

- `preview_database_id` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The preview ID of this D1 database. If provided, `wrangler dev` will use this ID. Otherwise, it will use `database_id`. This option is required when using `wrangler dev --remote`.

  - The ID of the database. The database ID is available when you first use `wrangler d1 create` or when you call `wrangler d1 list`, and uniquely identifies your database.

{{</definitions>}}

{{<Aside type="note">}}

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production database. Refer to [Local development and testing](/workers/testing/local-development/) for more details.

{{</Aside>}}

Example:

```toml
---
header: wrangler.toml
---
d1_databases = [
  { binding = "<BINDING_NAME>", database_name = "<DATABASE_NAME>", database_id = "<DATABASE_ID>" }
]

# or

[[d1_databases]]
binding = "<BINDING_NAME>"
database_name = "<DATABASE_NAME>"
database_id = "<DATABASE_ID>"
```

### Dispatch namespace bindings (Workers for Platforms)

Dispatch namespace bindings allow for communication between a [dynamic dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dynamic-dispatch-worker) and a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace). Dispatch namespace bindings are used in [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/). Workers for Platforms helps you deploy serverless functions programmatically on behalf of your customers.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name. The value (string) you set will be used to reference this database in your Worker. The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_NAMESPACE"` or `binding = "productionNamespace"` would both be valid names for the binding.

- `namespace` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace).

- `outbound` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - `service` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}} The name of the [outbound Worker](/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/) to bind to.
  - `parameters` {{<type>}}array{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} A list of parameters to pass data from your [dynamic dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dynamic-dispatch-worker) to the [outbound Worker](/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/).


{{</definitions>}}

```toml
---
header: wrangler.toml
---
[[dispatch_namespaces]]
binding = "<BINDING_NAME>"
namespace = "<NAMESPACE_NAME>"
outbound = {service = "<WORKER_NAME>", parameters = ["params_object"]}

```

### Durable Objects

[Durable Objects](/durable-objects/) provide low-latency coordination and consistent storage for the Workers platform.

To bind Durable Objects to your Worker, assign an array of the below object to the `durable_objects.bindings` key.

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the binding used to refer to the Durable Object.

- `class_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The exported class name of the Durable Object.

- `script_name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of the Worker where the Durable Object is defined, if it is external to this Worker. This option can be used both in local and remote development. In local development, you must run the external Worker in a separate process (via `wrangler dev`). In remote development, the appropriate remote binding must be used.

- `environment` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The environment of the `script_name` to bind to.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
durable_objects.bindings = [
  { name = "<BINDING_NAME>", class_name = "<CLASS_NAME>" }
]

# or

[[durable_objects.bindings]]
name = "<BINDING_NAME>"
class_name = "<CLASS_NAME>"

```

#### Migrations

When making changes to your Durable Object classes, you must perform a migration. Refer to [Durable Object migrations](/durable-objects/reference/durable-objects-migrations/).

{{<definitions>}}

- `tag` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - A unique identifier for this migration.

- `new_classes` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The new Durable Objects being defined.

- `renamed_classes` {{<type>}}{from: string, to: string}[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The Durable Objects being renamed.

- `deleted_classes` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The Durable Objects being removed.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["DurableObjectExample"] # Array of new classes

[[migrations]]
tag = "v2"
renamed_classes = [{from = "DurableObjectExample", to = "UpdatedName" }] # Array of rename directives
deleted_classes = ["DeprecatedClass"] # Array of deleted class names
```

### Email bindings

{{<render file="_send-emails-workers-intro.md" productFolder="/email-routing/" withParameters="Then, assign an array to the object `send_email` with the type of email binding you need.">}}


{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name.

- `destination_address` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The [chosen email address](/email-routing/email-workers/send-email-workers/#types-of-bindings) you send emails to.

- `allowed_destination_addresses` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The [allowlist of email addresses](/email-routing/email-workers/send-email-workers/#types-of-bindings) you send emails to.

{{</definitions>}}

{{<render file="_types-bindings.md" productFolder="/email-routing/">}}

### Environment variables

[Environment variables](/workers/configuration/environment-variables/) are a type of binding that allow you to attach text strings or JSON values to your Worker.

Example:

{{<render file="_envvar-example.md">}}

### Hyperdrive

[Hyperdrive](/hyperdrive/) bindings allow you to interact with and query any Postgres database from within a Worker.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name.

- `id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the Hyperdrive configuration.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---

node_compat = true # required for database drivers to function

[[hyperdrive]]
binding = "<BINDING_NAME>"
id = "<ID>"
```


### KV namespaces

[Workers KV](/kv/api/) is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare’s data centers after access.

To bind KV namespaces to your Worker, assign an array of the below object to the `kv_namespaces` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the KV namespace.

- `id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the KV namespace.

- `preview_id` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The preview ID of this KV namespace. This option is **required** when using `wrangler dev --remote` to develop against remote resources. If developing locally (without `--remote`), this is an optional field. `wrangler dev` will use this ID for the KV namespace. Otherwise, `wrangler dev` will use `id`.

{{</definitions>}}

{{<Aside type="note">}}

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production namespace. Refer to [Local development and testing](/workers/testing/local-development/) for more details.

{{</Aside>}}

Example:

```toml
---
header: wrangler.toml
---
kv_namespaces = [
  { binding = "<BINDING_NAME1>", id = "<NAMESPACE_ID1>" },
  { binding = "<BINDING_NAME2>", id = "<NAMESPACE_ID2>" }
]

# or

[[kv_namespaces]]
binding = "<BINDING_NAME1>"
id = "<NAMESPACE_ID1>"

[[kv_namespaces]]
binding = "<BINDING_NAME2>"
id = "<NAMESPACE_ID2>"
```

### Queues

[Queues](/queues/) is Cloudflare's global message queueing service, providing [guaranteed delivery](/queues/reference/delivery-guarantees/) and [message batching](/queues/configuration/batching-retries/). To interact with a queue with Workers, you need a producer Worker to send messages to the queue and a consumer Worker to pull batches of messages out of the Queue. A single Worker can produce to and consume from multiple Queues.

To bind Queues to your producer Worker, assign an array of the below object to the `[[queues.producers]]` key.

{{<definitions>}}

- `queue` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the queue, used on the Cloudflare dashboard.

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the queue in your Worker. The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_QUEUE"` or `binding = "productionQueue"` would both be valid names for the binding.

- `delivery_delay` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The number of seconds to [delay messages sent to a queue](/queues/configuration/batching-retries/#delay-messages) for by default. This can be overridden on a per-message or per-batch basis.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[[queues.producers]]
  binding = "<BINDING_NAME>"
  queue = "<QUEUE_NAME>"
  delivery_delay = 60 # Delay messages by 60 seconds before they are delivered to a consumer
```

To bind Queues to your consumer Worker, assign an array of the below object to the `[[queues.consumers]]` key.

{{<definitions>}}

- `queue` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the queue, used on the Cloudflare dashboard.

- `max_batch_size` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of messages allowed in each batch.

- `max_batch_timeout` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of seconds to wait for messages to fill a batch before the batch is sent to the consumer Worker.

- `max_retries` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of retries for a message, if it fails or [`retryAll()`](/queues/configuration/javascript-apis/#messagebatch) is invoked.

- `dead_letter_queue` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of another queue to send a message if it fails processing at least `max_retries` times.
  - If a `dead_letter_queue` is not defined, messages that repeatedly fail processing will be discarded.
  - If there is no queue with the specified name, it will be created automatically.

- `max_concurrency` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The maximum number of concurrent consumers allowed to run at once. Leaving this unset will mean that the number of invocations will scale to the [currently supported maximum](/queues/platform/limits/).
  - Refer to [Consumer concurrency](/queues/configuration/consumer-concurrency/) for more information on how consumers autoscale, particularly when messages are retried.

- `retry_delay` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The number of seconds to [delay retried messages](/queues/configuration/batching-retries/#delay-messages) for by default, before they are re-delivered to the consumer. This can be overridden on a per-message or per-batch basis [when retrying messages](/queues/configuration/batching-retries/#explicit-acknowledgement-and-retries).

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[[queues.consumers]]
  queue = "my-queue"
  max_batch_size = 10
  max_batch_timeout = 30
  max_retries = 10
  dead_letter_queue = "my-queue-dlq"
  max_concurrency = 5
  retry_delay = 120 # Delay retried messages by 2 minutes before re-attempting delivery
```

### R2 buckets

[Cloudflare R2 Storage](/r2) allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

To bind R2 buckets to your Worker, assign an array of the below object to the `r2_buckets` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the R2 bucket.

- `bucket_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of this R2 bucket.

- `jurisdiction` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The jurisdiction where this R2 bucket is located, if a jurisdiction has been specified. Refer to [Jurisdictional Restrictions](/r2/reference/data-location/#jurisdictional-restrictions).

- `preview_bucket_name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The preview name of this R2 bucket. If provided, `wrangler dev` will use this name for the R2 bucket. Otherwise, it will use `bucket_name`. This option is required when using `wrangler dev --remote`.

{{<Aside type="note">}}

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production bucket. Refer to [Local development and testing](/workers/testing/local-development/) for more details.

{{</Aside>}}

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
r2_buckets  = [
  { binding = "<BINDING_NAME1>", bucket_name = "<BUCKET_NAME1>"},
  { binding = "<BINDING_NAME2>", bucket_name = "<BUCKET_NAME2>"}
]

# or

[[r2_buckets]]
binding = "<BINDING_NAME1>"
bucket_name = "<BUCKET_NAME1>"

[[r2_buckets]]
binding = "<BINDING_NAME2>"
bucket_name = "<BUCKET_NAME2>"
```

### Vectorize indexes

A [Vectorize index](/vectorize/) allows you to insert and query vector embeddings for semantic search, classification and other vector search use-cases.

To bind Vectorize indexes to your Worker, assign an array of the below object to the `vectorize` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the bound index from your Worker code.

- `index_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the index to bind.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
vectorize  = [
  { binding = "<BINDING_NAME>", index_name = "<INDEX_NAME>"}
]

# or

[[vectorize]]
binding = "<BINDING_NAME>"
index_name = "<INDEX_NAME>"
```
### Service bindings

A service binding allows you to send HTTP requests to another Worker without those requests going over the Internet. The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service. Refer to [About Service Bindings](/workers/runtime-apis/bindings/service-bindings/).

To bind other Workers to your Worker, assign an array of the below object to the `services` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the bound Worker.

- `service` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the Worker.

- `entrypoint` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of the [entrypoint](/workers/runtime-apis/bindings/service-bindings/rpc/#named-entrypoints) to bind to. If you do not specify an entrypoint, the default export of the Worker will be used.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
services = [
  { binding = "<BINDING_NAME>", service = "<WORKER_NAME>", entrypoint = "<ENTRYPOINT_NAME>" }
]

# or

[[services]]
binding = "<BINDING_NAME>"
service = "<WORKER_NAME>"
entrypoint = "<ENTRYPOINT_NAME>"
```

### Analytics Engine Datasets

[Workers Analytics Engine](/analytics/analytics-engine/) provides analytics, observability and data logging from Workers. Write data points to your Worker binding then query the data using the [SQL API](/analytics/analytics-engine/sql-api/).

To bind Analytics Engine datasets to your Worker, assign an array of the below object to the `analytics_engine_datasets` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the dataset.

- `dataset` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The dataset name to write to. This will default to the same name as the binding if it is not supplied.

{{</definitions>}}

Example:

```toml
---
filename: wrangler.toml
---
analytics_engine_datasets = [{ binding = "<BINDING_NAME>", dataset = "<DATASET_NAME>" }]

# or

[[analytics_engine_datasets]]
binding = "<BINDING_NAME>"
dataset = "<DATASET_NAME>"
```

### mTLS Certificates

To communicate with origins that require client authentication, a Worker can present a certificate for mTLS in subrequests. Wrangler provides the `mtls-certificate` [command](/workers/wrangler/commands#mtls-certificate) to upload and manage these certificates.

To create a [binding](/workers/runtime-apis/bindings/) to an mTLS certificate for your Worker, assign an array of objects with the following shape to the `mtls_certificates` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the certificate.

- `certificate_id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the certificate. Wrangler displays this via the `mtls-certificate upload` and `mtls-certificate list` commands.

{{</definitions>}}

Example of a `wrangler.toml` configuration that includes an mTLS certificate binding:

```toml
---
header: wrangler.toml
---
mtls_certificates = [
    { binding = "<BINDING_NAME1>", certificate_id = "<CERTIFICATE_ID1>" },
    { binding = "<BINDING_NAME2>", certificate_id = "<CERTIFICATE_ID2>" }
]

# or

[[mtls_certificates]]
binding = "<BINDING_NAME1>"
certificate_id = "<CERTIFICATE_ID1>"

[[mtls_certificates]]
binding = "<BINDING_NAME2>"
certificate_id = "<CERTIFICATE_ID2>"
```

mTLS certificate bindings can then be used at runtime to communicate with secured origins via their [`fetch` method](/workers/runtime-apis/bindings/mtls).

### Workers AI

[Workers AI](/workers-ai/) allows you to run machine learning models, on the Cloudflare network, from your own code –
whether that be from Workers, Pages, or anywhere via REST API.

{{<render file="_ai-local-usage-charges.md" productFolder="workers">}}

Unlike other bindings, this binding is limited to one AI binding per Worker project.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name.

{{</definitions>}}

Example:

```toml
---
filename: wrangler.toml
---
ai = { binding = "<AI>" }

# or

[ai]
binding = "AI" # available in your Worker code on `env.AI`
```

## Bundling

You can bundle assets into your Worker using the `rules` key, making these assets available to be imported when your Worker is invoked. The `rules` key will be an array of the below object.

{{<definitions>}}

- `type` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The type of asset. Must be one of: `ESModule`, `CommonJS`, `CompiledWasm`, `Text` or `Data`.

- `globs` {{<type>}}string[]{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - An array of glob rules (for example, `["**/*.md"]`). Refer to [glob](https://man7.org/linux/man-pages/man7/glob.7.html).

- `fallthrough` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - When set to `true` on a rule, this allows you to have multiple rules for the same `Type`.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
rules = [
  { type = "Text", globs = ["**/*.md"], fallthrough = true }
]
```

### Importing assets within a Worker

You can import and refer to these assets within your Worker, like so:

```js
---
  header: index.js
  highlight: [1]
---
import markdown from './example.md'

export default {
  async fetch() {
    return new Response(markdown)
  }
}
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
---
header: wrangler.toml
---
[dev]
ip = "192.168.1.1"
port = 8080
local_protocol = "http"
```

### Secrets

[Secrets](/workers/configuration/secrets/) are a type of binding that allow you to [attach encrypted text values](/workers/wrangler/commands/#secret) to your Worker.

{{<render file="_secrets-in-dev.md">}}

## Node compatibility

If you depend on Node.js APIs, either directly in your own code or via a library you depend on, you can either use a subset of Node.js APIs available directly in the Workers runtime, or add polyfills for a subset of Node.js APIs to your own code.

### Use runtime APIs directly

A [growing subset of Node.js APIs](/workers/runtime-apis/nodejs/) are available directly as [Runtime APIs](/workers/runtime-apis/nodejs), with no need to add polyfills to your own code. To enable these APIs in your Worker, add the [`nodejs_compat` ](/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) compatibility flag to your `wrangler.toml`:

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "nodejs_compat" ]
```

### Add polyfills using Wrangler

Add polyfills for a subset of Node.js APIs to your Worker by adding the `node_compat` key to your `wrangler.toml` or by passing the `--node-compat` flag to `wrangler`.

```toml
---
header: wrangler.toml
---
node_compat = true
```

It is not possible to polyfill all Node APIs or behaviors, but it is possible to polyfill some of them.

This is currently powered by `@esbuild-plugins/node-globals-polyfill` which in itself is powered by [rollup-plugin-node-polyfills](https://github.com/ionic-team/rollup-plugin-node-polyfills/).

## Source maps

[Source maps](/workers/observability/source-maps/) translate compiled and minified code back to the original code that you wrote. Source maps are combined with the stack trace returned by the JavaScript runtime to present you with a stack trace.


{{<definitions>}}

- `upload_source_maps` {{<type>}}boolean{{</type>}}

  - When `upload_source_maps` is set to `true`, Wrangler will automatically generate and upload source map files when you run [`wrangler deploy`](/workers/wrangler/commands/#deploy) or [`wrangler versions deploy`](/workers/wrangler/commands/#deploy-2).

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
upload_source_maps = true

```

## Workers Sites

{{<Aside type="note" header="Cloudflare Pages">}}
Consider using [Cloudflare Pages](/pages/) for hosting static applications instead of Workers Sites.
{{</Aside>}}

[Workers Sites](/workers/configuration/sites/) allows you to host static websites, or dynamic websites using frameworks like Vue or React, on Workers.

{{<definitions>}}

- `bucket` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The directory containing your static assets. It must be a path relative to your `wrangler.toml` file.

- `include` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - An exclusive list of `.gitignore`-style patterns that match file  or directory names from your bucket location. Only matched items will be uploaded.

- `exclude` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  -  A list of `.gitignore`-style patterns that match files or directories in your bucket that should be excluded from uploads.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[site]
bucket = "./public"
include = ["upload_dir"]
exclude = ["ignore_dir"]
```

## Proxy support

Corporate networks will often have proxies on their networks and this can sometimes cause connectivity issues. To configure Wrangler with the appropriate proxy details, use the below environmental variables:

- `https_proxy`
- `HTTPS_PROXY`
- `http_proxy`
- `HTTP_PROXY`

To configure this on macOS, add `HTTP_PROXY=http://<YOUR_PROXY_HOST>:<YOUR_PROXY_PORT>` before your Wrangler commands.

Example:

```sh
$ HTTP_PROXY=http://localhost:8080 wrangler dev
```

If your IT team has configured your computer's proxy settings, be aware that the first non-empty environment variable in this list will be used when Wrangler makes outgoing requests.

For example, if both `https_proxy` and `http_proxy` are set, Wrangler will only use `https_proxy` for outgoing requests.

## Source of truth

We recommend treating your `wrangler.toml` file as the source of truth for your Worker configuration, and to avoid making changes to your Worker via the Cloudflare dashboard if you are using Wrangler.

If you need to make changes to your Worker from the Cloudflare dashboard, the dashboard will generate a TOML snippet for you to copy into your `wrangler.toml` file, which will help ensure your `wrangler.toml` file is always up to date.

If you change your environment variables in the Cloudflare dashboard, Wrangler will override them the next time you deploy. If you want to disable this behavior, add `keep_vars = true` to your `wrangler.toml`.

If you change your routes in the dashboard, Wrangler will override them in the next deploy with the routes you have set in your `wrangler.toml`. To manage routes via the Cloudflare dashboard only, remove any route and routes keys from your `wrangler.toml` file. Then add `workers_dev = false` to your `wrangler.toml` file. For more information, refer to [Deprecations](/workers/wrangler/deprecations/#other-deprecated-behavior).

Wrangler will not delete your secrets (encrypted environment variables) unless you run `wrangler secret delete <key>`.
