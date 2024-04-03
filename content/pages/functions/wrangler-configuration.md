---
pcx_content_type: how-to
title: Configuration
weight: 6
---

# Configuration via `wrangler.toml`

Pages Functions can be configured two ways, either via the [Cloudflare dashboard](https://dash.cloudflare.com) or `wrangler.toml`, a configuration file used to customize the development and deployment setup for Workers and Pages Functions.

This guide will focus on configuring your project via `wrangler.toml`.

{{<Aside type="note" header="Configuration via wrangler.toml is in open beta.">}}

We’d love your feedback. Join the #functions channel in the Cloudflare Developers Discord and let us know what you’d like to see next.

{{</Aside>}}

`wrangler.toml` allows you to configure things like [bindings](/pages/functions/bindings/), [environment variables](/pages/functions/bindings/#environment-variables), and [local development settings](#local-development-settings), and should be placed in your project's root directory.

Using this file allows you to:

- **store your configuration file in source control** - keep your configuration in your repo alongside the rest of your code
- **edit your config via your code editor** - remove the need to switch back and forth between interfaces
- **write configuration that is shared across environments** - define config like bindings and environment variables for local, preview, and production in one file
- **ensure better access control** - by using a configuration file in your repo, you can control who has access to make changes without giving access to your Cloudflare dashboard

## Example `wrangler.toml` file

```toml
---
filename: wrangler.toml
---
name = "my-pages-app"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"

[[d1_databases]]
binding = "DB"
database_name = "northwind-demo"
database_id = "<DATABASE_ID>"

[vars]
API_KEY = "1234567asdf"
```

## Migrating from dashboard configuration

If you have existing Pages projects with configuration setup via the dashboard you can use the following Wrangler command to download your existing configuration and provide you with a valid `wrangler.toml` file:

```sh
$ npx wrangler pages download config <PROJECT_NAME>
```

Run the command, add the file to your project’s root directory, make changes as needed, and create a new deployment either via git integration or direct upload to begin leveraging `wrangler.toml` for your configuration.

## Differences using `wrangler.toml` for Pages Functions and Workers

If you have used [Workers](/workers), you may already be familiar with [`wrangler.toml`](/workers/wrangler/configuration/). There are a few key differences to be aware of when using `wrangler.toml` with your Pages Functions project:

- the configuration fields **do not match exactly** between this file and the Workers equivalent
- the concept of [environments](/pages/functions/wrangler-configuration/#configure-environments) and configuration inheritance in this file **is not** the same as Workers
- this file becomes the [source of truth](/pages/functions/wrangler-configuration/#source-of-truth) when used, meaning that you **can not edit the same fields in the dashboard** once you are using this file.

## Configure environments

With `wrangler.toml` you can quickly set configuration across your local environment, preview deployments, and production.

### Local development

`wrangler.toml` works locally when using `wrangler pages dev`. This means that you can test out configuration changes quickly without a need to login to the Cloudflare dashboard. Refer to the following config file for an example:

```toml
---
filename: wrangler.toml
---
name = "my-pages-app"
pages_build_output_dir = "./dist"
compatibility_date = "2023-10-12"
compatibility_flags = ["nodejs_compat"]

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"
```

This config file adds the `nodejs_compat` compatibility flag and a KV namespace binding to your project. Running `wrangler pages dev` in a directory with this config file will apply the `nodejs_compat` compatibility flag locally, and expose the `KV` binding in your Pages Function code at `context.env.KV`.

{{<Aside type="note">}}

For a full list of configuration keys refer to [inheritable keys](#inheritable-keys) and [non-inheritable keys](#non-inheritable-keys).

{{</Aside>}}

### Production and Preview Deployments

Once you are ready to deploy your project, you can set the configuration for production and preview deployments by creating a new deployment containing a `wrangler.toml` file.

{{<Aside type="note">}}

For the following commands, if you are using git it is important to remember the branch that you set as your [production branch](/pages/configuration/branch-build-controls/#production-branch-control) as well as your [preview branch settings](/pages/configuration/branch-build-controls/#preview-branch-control).

{{</Aside>}}

To use the example above as your configuration for production, make a new production deployment using:

```sh
$ npx wrangler pages deploy
```

or more specifically:

```sh
$ npx wrangler pages deploy --branch <PRODUCTION BRANCH>
```

To deploy the configuration for preview deployments, you can run the same command as above while on a branch you have configured to work with [preview deployments](/pages/configuration/branch-build-controls/#preview-branch-control). This will set the configuration for all preview deployments, not just the deployments from a specific branch. Pages does not currently support branch-based configuration.

{{<Aside type="note">}}

The `--branch` flag is optional with `wrangler pages deploy`. If you use git integration, Wrangler will infer the branch you are on from the repo you are currently in and implicitly add it to the command.

{{</Aside>}}

### Environment-specific overrides

There are times that you might want to use different configuration across local, preview deployments, and production. It is possible to override configuration for production and preview deployments by using `[env.production]` or `[env.preview]`.

{{<Aside type="note">}}

Unlike [Workers Environments](/workers/wrangler/configuration/#environments), `production` and `preview` are the only two options available via `[env.<ENVIRONMENT>]`.

{{</Aside>}}

Refer to the following `wrangler.toml` configuration file for an example of how to override preview deployment configuration:

```toml
---
filename: wrangler.toml
---
name = "my-pages-site"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_KEY = "1234567asdf"

[[env.preview.kv_namespaces]]
binding = "KV"
id = "<PREVIEW_NAMESPACE_ID>"

[[env.preview.vars]]
API_KEY = "8901234bfgd"
```

If you deployed this file via `wrangler pages deploy`, `name`, `pages_build_output_dir`, `kv_namespaces`, and `vars` would apply the configuration to local and production, while `env.preview` would override `kv_namespaces` and `vars` for preview deployments.

If you wanted to have configuration values apply to local and preview, but override production, your file would look like this:

```toml
---
filename: wrangler.toml
---
name = "my-pages-site"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_KEY = "1234567asdf"

[[env.production.kv_namespaces]]
binding = "KV"
id = "<PRODUCTION_NAMESPACE_ID>"

[[env.production.vars]]
API_KEY = "8901234bfgd"
```

You can always be explicit and override both preview and production:

```toml
---
filename: wrangler.toml
---
name = "my-pages-site"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_KEY = "1234567asdf"

[[env.preview.kv_namespaces]]
binding = "KV"
id = "<PREVIEW_NAMESPACE_ID>"

[[env.preview.vars]]
API_KEY = "8901234bfgd"

[[env.production.kv_namespaces]]
binding = "KV"
id = "<PRODUCTION_NAMESPACE_ID>"

[[env.production.vars]]
API_KEY = "6567875fvgt"
```

## Inheritable keys

Inheritable keys are configurable at the top-level, and can be inherited (or overridden) by environment-specific configuration.

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of your Pages project. Alphanumeric and dashes only.

- `pages_build_output_dir` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The path to your project's build output folder. For example: `./dist`.

- `compatibility_date` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - A date in the form `yyyy-mm-dd`, which will be used to determine which version of the Workers runtime is used. Refer to [Compatibility dates](/workers/configuration/compatibility-dates/).

- `compatibility_flags` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of flags that enable features from upcoming features of the Workers runtime, usually used together with `compatibility_date`. Refer to [compatibility dates](/workers/configuration/compatibility-dates/).

- `send_metrics` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether Wrangler should send usage metrics to Cloudflare for this project.

- `limits` {{<type-link href="#limits">}}Limits{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Configures limits to be imposed on execution at runtime. Refer to [Limits](#limits).

- `placement` {{<type-link href="#placement">}}Placement{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specify how Pages Functions should be located to minimize round-trip time. Refer to [Smart Placement](/workers/configuration/smart-placement/).

{{</definitions>}}

## Non-inheritable keys

Non-inheritable keys are configurable at the top-level, but, if any one non-inheritable key is overridden for any environment (for example,`[[env.production.kv_namespaces]]`), all non-inheritable keys must also be specified in the environment configuration and overridden.

For example, this configuration will not work:

```toml
---
filename: wrangler.toml
---
name = "my-pages-site"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_KEY = "1234567asdf"

[[env.production.vars]]
API_KEY = "8901234bfgd"
```

`[[env.production.vars]]` is set to override `[vars]`. Because of this `[[kv_namespaces]]` must also be overridden by defining `[[env.production.kv_namespaces]]`.

This will work for local development, but will fail to validate when you try to deploy.

{{<definitions>}}

- `vars` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A map of environment variables to set when deploying your Function. Refer to [Environment variables](/pages/functions/bindings/#environment-variables).

- `d1_databases` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of D1 databases that your Function should be bound to. Refer to [D1 databases](/pages/functions/bindings/#d1-databases).

- `durable_objects` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of Durable Objects that your Function should be bound to. Refer to [Durable Objects](/pages/functions/bindings/#durable-objects).

- `hyperdrive` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specifies Hyperdrive configs that your Function should be bound to. Refer to [Hyperdrive](/pages/functions/bindings/#r2-buckets).

- `kv_namespaces` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of KV namespaces that your Function should be bound to. Refer to [KV namespaces](/pages/functions/bindings/#kv-namespaces).

- `queues.producers` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specifies Queues Producers that are bound to this Function. Refer to [Queues Producers](/queues/get-started/#4-set-up-your-producer-worker).

- `r2_buckets` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of R2 buckets that your Function should be bound to. Refer to [R2 buckets](/pages/functions/bindings/#r2-buckets).

- `vectorize` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of Vectorize indexes that your Function should be bound to. Refer to [Vectorize indexes](/vectorize/get-started/intro/#3-bind-your-worker-to-your-index).

- `services` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of service bindings that your Function should be bound to. Refer to [service bindings](/pages/functions/bindings/#service-bindings).

- `analytics_engine_datasets` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specifies analytics engine datasets that are bound to this Function. Refer to [Workers Analytics Engine](/analytics/analytics-engine/get-started/#2-configure-your-dataset-and-binding-in-wrangler).

- `ai` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specifies an AI binding to this Function. Refer to [Workers AI](/pages/functions/bindings/#workers-ai).
{{</definitions>}}

## Limits

You can configure limits for your Pages project in the same way you can for Workers. Read [this guide](/workers/wrangler/configuration/#limits) for more details.

## Bindings

A [binding](/pages/functions/bindings/) enables your Pages Functions to interact with resources on the Cloudflare Developer Platform. Use bindings to integrate your Pages Functions with Cloudflare resources like [KV](/kv/), [Durable Objects](/durable-objects/), [R2](/r2/), and [D1](/d1/). You can set bindings for both production and preview environments.

### D1 databases

[D1](/d1/) is Cloudflare's serverless SQL database. A Function can query a D1 database (or databases) by creating a [binding](/workers/configuration/bindings/) to each database for D1's [client API](/d1/build-with-d1/d1-client-api/).

{{<Aside type="note">}}

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production database. Refer to [Local development](/workers/testing/local-development/) for more details.

{{</Aside>}}

- Configure D1 database bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#d1-databases) the same way they are configured with Cloudflare Workers.
- Interact with your [D1 Database binding](/pages/functions/bindings/#d1-databases).

### Durable Objects

[Durable Objects](/durable-objects/) provide low-latency coordination and consistent storage for the Workers platform.

- Configure Durable Object namespace bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#durable-objects) the same way they are configured with Cloudflare Workers.
- Interact with your [Durable Object namespace binding](/pages/functions/bindings/#durable-objects).

### Environment variables

[Environment variables](/workers/configuration/environment-variables/) are a type of binding that allow you to attach text strings or JSON values to your Pages Function.

- Configure environment variables via your [`wrangler.toml` file](/workers/wrangler/configuration/#environment-variables) the same way they are configured with Cloudflare Workers.
- Interact with your [environment variables](/pages/functions/bindings/#environment-variables).

### Hyperdrive

[Hyperdrive](/hyperdrive/) bindings allow you to interact with and query any Postgres database from within a Pages Function.

- Configure Hyperdrive bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#hyperdrive) the same way they are configured with Cloudflare Workers.

### KV namespaces

[Workers KV](/kv/api/) is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare’s data centers after access.

{{<Aside type="note">}}

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production namespace. Refer to [Local development](/workers/testing/local-development/) for more details.

{{</Aside>}}

- Configure KV namespace bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#kv-namespaces) the same way they are configured with Cloudflare Workers.
- Interact with your [KV namespace binding](/pages/functions/bindings/#kv-namespaces).

### Queues Producers

[Queues](/queues/) is Cloudflare's global message queueing service, providing [guaranteed delivery](/queues/reference/delivery-guarantees/) and [message batching](/queues/reference/batching-retries/). [Queue Producers](/queues/reference/javascript-apis/#producer) enable you to send messages into a queue within your Pages Function.

{{<Aside type="note">}}

You cannot currently configure a [queues consumer](/queues/reference/how-queues-works/#consumers) with Pages Functions.

{{</Aside>}}

- Configure Queues Producer bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#queues) the same way they are configured with Cloudflare Workers.
- Interact with your [Queues Producer binding](/pages/functions/bindings/#queue-producers).

### R2 buckets

[Cloudflare R2 Storage](/r2) allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{<Aside type="note">}}

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production bucket. Refer to [Local development](/workers/testing/local-development/) for more details.

{{</Aside>}}

- Configure R2 bucket bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#r2-buckets) the same way they are configured with Cloudflare Workers.
- Interact with your [R2 bucket bindings](/pages/functions/bindings/#r2-buckets).

### Vectorize indexes

A [Vectorize index](/vectorize/) allows you to insert and query vector embeddings for semantic search, classification and other vector search use-cases.

- Configure Vectorize bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#vectorize) the same way they are configured with Cloudflare Workers.

### Service bindings

A service binding allows you to call a Worker from within your Pages Function. Binding a Pages Function to a Worker allows you to send HTTP requests to the Worker without those requests going over the Internet. The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service. Refer to [About Service bindings](/workers/configuration/bindings/about-service-bindings/).

- Configure service bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#service-bindings) the same way they are configured with Cloudflare Workers.
- Interact with your [service bindings](/pages/functions/bindings/#service-bindings).

### Analytics Engine Datasets

[Workers Analytics Engine](/analytics/analytics-engine/) provides analytics, observability and data logging from Pages Functions. Write data points within your Pages Function binding then query the data using the [SQL API](/analytics/analytics-engine/sql-api/).

- Configure Analytics Engine Dataset bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#analytics-engine-datasets) the same way they are configured with Cloudflare Workers.
- Interact with your [Analytics Engine Dataset](/pages/functions/bindings/#analytics-engine).

### Workers AI

[Workers AI](/workers-ai/) allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via REST API.

{{<render file="_ai-local-usage-charges.md" productFolder="workers">}}

Unlike other bindings, this binding is limited to one AI binding per Pages Function project.

- Configure Workers AI bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#workers-ai) the same way they are configured with Cloudflare Workers.
- Interact with your [Workers AI binding](/pages/functions/bindings/#workers-ai).

## Local development settings

The local development settings that you can configure are the same for Pages Functions and Cloudflare Workers. Read [this guide](/workers/wrangler/configuration/#local-development-settings) for more details.

## Users with existing `wrangler.toml` files

Before you could define your preview and production configuration in `wrangler.toml` — it was possible to use `wrangler.toml` to define which bindings should be available to your Pages project in local development. That means you may already have a file in your project that looks like this:


```toml
---
filename: wrangler.toml
---
[[ kv_namespaces ]]
binding = "KV"
id = "<NAMESPACE_ID>"
```

You can continue to use this file as-is. However when you run `wrangler pages deploy` you will see a warning message telling you that fields are missing and that the file will continue to be used for local development only.

If you would like to use this file for production and preview deployments add the missing fields, update the file as needed, and deploy again.

## Source of truth

When used in your Pages Functions projects, your `wrangler.toml` file is the source of truth. You will be able to see, but not edit, the same fields when you log into the Cloudflare dashboard.

If you decide that you don't want to use `wrangler.toml` for configuration, you can safely delete it and create a new deployment. Configuration values from your last deployment will still apply and you will be able to edit them from the dashboard.