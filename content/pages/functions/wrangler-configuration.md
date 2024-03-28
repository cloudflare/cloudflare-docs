---
pcx_content_type: how-to
title: Wrangler Configuration
weight: 6
---

# Configure `wrangler.toml`

Pages Functions can be configured via a `wrangler.toml` file in your project's root directory. `wrangler.toml` allows you to configure things like: bindings, environment variables, development settings, and runtime settings alongside the rest of your code. 

Using this file allows you to:

- **store your configuration file in source control** - keep your configuration in your repo alongside the rest of your code
- **edit your config via your code editor** - remove the need to switch back and forth between interfaces
- **write configuration that is shared across environments** - define config like bindings and environment variables for local, preview, and production in one file
- **ensure better access control** - by using a configuration file in your repo, you can control who has access to make changes without giving access to your Cloudflare dashboard

If you have used Workers in the past, you may already be familiar with [this file](/workers/wrangler/configuration/). It should be noted that there are differences with the way this file behaves for Pages Functions, and that the configuration fields do not match exactly between this file and the Workers equivalent.

## Example `wrangler.toml` file

```toml
---
filename: wrangler.toml
---
name = "my-pages-app"
pages_build_output_dir = “./dist”

[[ kv_namespaces ]]
binding = "KV"
id = "<NAMESPACE_ID>"

[[ d1_databases ]]
binding = "DB"
database_name = "northwind-demo"
database_id = "<DATABASE_ID>"

[vars]
API_KEY = "1234567asdf"
```

## Environments

With `wrangler.toml` you can quickly set default configuration across your local environment, preview deployments, and production.

### Local development

Top-level config is always available locally via `wrangler pages dev`, meaning that you can test out config changes quickly without going to the Cloudflare dashboard. For example, look at the following config file:

```toml
---
filename: wrangler.toml
---
name = "my-pages-app"
pages_build_output_dir = “./dist”
compatibility_date = "2023-10-12"
compatibility_flags = [“nodejs_compat”]

[[ kv_namespaces ]]
binding = "KV"
id = "<NAMESPACE_ID>"
```

This adds compatibility settings like `nodejs_compat` and a KV namespace binding to the project. Once saved, run `wrangler pages dev` and the compatibility settings will apply locally. You can access the KV binding in your Pages Function code at `context.env.KV`.

{{<Aside type="note">}}

For a full list of configuration keys read about [inheritable keys](#inheritable-keys) and [non-inheritable keys](#non-inheritable-keys).

{{</Aside>}}

### Production and Preview Deployments

Once you are ready to deploy your project, you can set the configuration for production and preview deployments by creating a new deployment containing a `wrangler.toml` file. This can be the same configuration you use locally or you can specify overrides.

{{<Aside type="note">}}

For the following commands, it is important to remember the branch that you set as your [production branch](/pages/configuration/branch-build-controls/#production-branch-control) as well as your [preview branch settings](/pages/configuration/branch-build-controls/#preview-branch-control).

{{</Aside>}}

To use the configuration example above for production configuration, you can run:

```sh
$ npx wrangler pages deploy --branch <PRODUCTION BRANCH>
```

If you haven't set `pages_build_output_dir` locally, you will need to run:

```sh
$ npx wrangler pages deploy <BUILD_OUTPUT_DIRECTORY> --branch <PRODUCTION BRANCH>
```

To deploy the configuration for preview deployments, you can run the same command as above, and change the `--branch` name to any branch besides the one you set as the production branch. 

This will set the configuration for all preview deployments, not just the deployments from a specific branch. We do not currently offer branch-based configuration.

{{<Aside type="note">}}

`--branch` is optional. If you omit it, Wrangler will infer the branch you are on from the repo you are currently in and implicitly add it to the command.

{{</Aside>}}

### Environment-specific overrides

There are times that you might want to use different configuration across local, preview, and production. You can override configuration for production and preview deployments by using `[env.production]` or `[env.preview]`.

{{<Aside type="note">}}

Unlike [Workers Environments](/workers/wrangler/configuration/#environments), `production` and `preview` are the only two options available via `[env.name]`.

{{</Aside>}}

Using the example above, here’s how you would override just preview deployments:

```toml
---
filename: wrangler.toml
---
name = "my-pages-site"
pages_build_output_dir = “./dist”

[[ kv_namespaces ]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_KEY = "1234567asdf"

[env.preview.kv_namespaces]
binding = "KV"
id = "<PREVIEW_NAMESPACE_ID>"

[env.preview.vars]
API_KEY = "8901234bfgd"
```

If you deployed this file via `wrangler pages deploy`, the top-level configuration would apply to local and production, while `env.preview` would override the configuration for preview deployments.

If you wanted to have top-level configuration apply to local and preview, but override production, your file would look like this:

```toml
---
filename: wrangler.toml
---
name = "my-pages-site"
pages_build_output_dir = “./dist”

[[ kv_namespaces ]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_KEY = "1234567asdf"

[env.production.kv_namespaces]
binding = "KV"
id = "<PRODUCTION_NAMESPACE_ID>"

[env.production.vars]
API_KEY = "8901234bfgd"
```

You can always be explicit and override preview and production:

```toml
---
filename: wrangler.toml
---
name = "my-pages-site"
pages_build_output_dir = “./dist”

[[ kv_namespaces ]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_KEY = "1234567asdf"

[env.preview.kv_namespaces]
binding = "KV"
id = "<PREVIEW_NAMESPACE_ID>"

[env.preview.vars]
API_KEY = "8901234bfgd"

[env.production.kv_namespaces]
binding = "KV"
id = "<PRODUCTION_NAMESPACE_ID>"

[env.production.vars]
API_KEY = "6567875fvgt"
```

### Important reminder for overrides

If you’re using `[env.name]` to override values, you must specify overrides for all [non-inheritable properties](#non-inheritable-keys) like bindings and variables. It is not possible to override some values and not others.

This means this configuration will not work:

```toml
---
filename: wrangler.toml
---
name = "my-pages-site"
pages_build_output_dir = “./dist”

[[ kv_namespaces ]]
binding = "KV"
id = "<NAMESPACE_ID>"

[vars]
API_KEY = "1234567asdf"

[env.production.vars]
API_KEY = "8901234bfgd"
```

This configuration file is missing the production override for `kv_namespaces`, and will fail to validate on deployment.

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

Non-inheritable keys are configurable at the top-level, but, if an environment override is present, these must all be overridden for the environment.

{{<definitions>}}

- `vars` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A map of environment variables to set when deploying your Function. Refer to [Environment variables](/workers/configuration/environment-variables/).

- `d1_databases` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of D1 databases that your Function should be bound to. Refer to [D1 databases](/pages/functions/bindings/#d1-databases).

- `durable_objects` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of Durable Objects that your Function should be bound to. Refer to [Durable Objects](/pages/functions/bindings/#durable-object-namespacess).

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

  - Specifies an AI binding to this Function. Refer to [Workers AI](/workers-ai/configuration/bindings/).


{{</definitions>}}

## Limits

You can impose limits on your Function's behavior at runtime. Limits are only supported for the [Standard Usage Model](/workers/platform/pricing/#example-pricing-standard-usage-model). Limits are only enforced when deployed to Cloudflare's network, not in local development. The CPU limit can be set to a maximum of 30,000 milliseconds (30 seconds).

Limits have some built-in flexibility to allow for cases where your Function infrequently runs over the configured limit. If your Function starts hitting the limit consistently, its execution will be terminated according to the limit configured.

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

Bindings are powerful tools that enhance the functionality of your application by connecting it to additional products and resources on the Cloudflare developer platform.

### D1 databases

[D1](/d1/) is Cloudflare's serverless SQL database. A Function can query a D1 database (or databases) by creating a [binding](/workers/configuration/bindings/) to each database for D1's [client API](/d1/build-with-d1/d1-client-api/).

To bind D1 databases to your Pages Functions project, assign an array of the below object to the `[[d1_databases]]` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the D1 database. The value (string) you set will be used to reference this database in your Function. The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_DB"` or `binding = "productionDB"` would both be valid names for the binding.

- `database_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the database. This is a human-readable name that allows you to distinguish between different databases, and is set when you first create the database.

- `database_id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

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

### Durable Objects

[Durable Objects](/durable-objects/) provide low-latency coordination and consistent storage for the Workers platform.

To bind Durable Objects to your Worker, assign an array of the below object to the `durable_objects.bindings` key.

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the binding used to refer to the Durable Object.

- `class_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The exported class name of the Durable Object.

- `script_name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of the Worker where the Durable Object is defined, if it is external to this Function. While developing locally, to interact with a Durable Object namespace, run the Worker exporting the Durable object via `wrangler dev` and in parallel, run `wrangler pages dev`.

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

### Environment variables

[Environment variables](/workers/configuration/environment-variables/) are a type of binding that allow you to attach text strings or JSON values to your Pages Function.

Example:

{{<render file="_envvar-example.md">}}

### Hyperdrive

[Hyperdrive](/hyperdrive/) bindings allow you to interact with and query any Postgres database from within a Pages Function.

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

[[hyperdrive]]
binding = "<BINDING_NAME>"
id = "<ID>"
```

### KV namespaces

[Workers KV](/kv/api/) is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare’s data centers after access.

To bind KV namespaces to your Pages Function, assign an array of the below object to the `kv_namespaces` key.

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
  { binding = "<BINDING_NAME2>", id = "<NAMESPACE_ID2>"
]

# or

[[kv_namespaces]]
binding = "<BINDING_NAME1>"
id = "<NAMESPACE_ID1>"

[[kv_namespaces]]
binding = "<BINDING_NAME2>"
id = "<NAMESPACE_ID2>"
```

### Queues Producers

[Queues](/queues/) is Cloudflare's global message queueing service, providing [guaranteed delivery](/queues/reference/delivery-guarantees/) and [message batching](/queues/reference/batching-retries/). [Queue Producers](https://developers.cloudflare.com/queues/reference/javascript-apis/#producer) enable you to send messages into a Queue within your Pages Function.

{{<Aside type="note">}}

Queues Consumers can not currently be bound to Pages Functions

{{</Aside>}}

To add a Queue producer binding to your Pages Function, assign an array of the below object to the `[[queues.producers]]` key.

{{<definitions>}}

- `queue` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the queue, used on the Cloudflare dashboard.

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the queue in your Worker. The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_QUEUE"` or `binding = "productionQueue"` would both be valid names for the binding.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[[queues.producers]]
  binding = "<BINDING_NAME>"
  queue = "<QUEUE_NAME>"
```

### R2 buckets

[Cloudflare R2 Storage](/r2) allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

To bind R2 buckets to your Pages Function, assign an array of the below object to the `r2_buckets` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the R2 bucket.

- `bucket_name` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of this R2 bucket.

- `jurisdiction` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The jurisdiction where this R2 bucket is located, if a jurisdiction has been specified. Refer to [Jurisdictional Restrictions](/r2/reference/data-location/#jurisdictional-restrictions).

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

To bind Vectorize indexes to your Pages Function, assign an array of the below object to the `vectorize` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the bound index from your Pages Function code.

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

A service binding allows you to call a Worker from within your Pages Function. This sends HTTP requests to the Worker without those requests going over the Internet. The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service. Refer to [About Service Bindings](/workers/configuration/bindings/about-service-bindings/).

To add a service binding to your Pages Function, assign an array of the below object to the `services` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the bound Worker.

- `service` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the Worker.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
services = [
  { binding = "<BINDING_NAME>", service = "<WORKER_NAME>" }
]

# or

[[services]]
binding = "<BINDING_NAME>"
service = "<WORKER_NAME>"
```

### Analytics Engine Datasets

[Workers Analytics Engine](/analytics/analytics-engine/) provides analytics, observability and data logging from Pages Functions. Write data points within your Pages Function binding then query the data using the [SQL API](/analytics/analytics-engine/sql-api/).

To bind Analytics Engine datasets to your Pages Function, assign an array of the below object to the `analytics_engine_datasets` key.

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
analytics_engine_datasets = { binding = "<BINDING_NAME>", dataset = "<DATASET_NAME>" }

# or

[[analytics_engine_datasets]]
binding = "<BINDING_NAME>"
dataset = "<DATASET_NAME>"
```

### mTLS Certificates

To communicate with origins that require client authentication, a Pages Function can present a certificate for mTLS in subrequests. Wrangler provides the `mtls-certificate` [command](/workers/wrangler/commands#mtls-certificate) to upload and manage these certificates.

To create a [binding](/workers/configuration/bindings/) to an mTLS certificate for your Pages Function, assign an array of objects with the following shape to the `mtls_certificates` key.

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

Unlike other bindings, this binding is limited to one AI binding per Pages Function project.

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
binding = "AI" # available in your Pages Functions code on `context.env.AI`
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

## Migrating from dashboard configuration

If you have existing Pages projects with configuration setup via the dashboard we provide a Wrangler command that will download your existing configuration and provide you with a valid `wrangler.toml` file.

```sh
$ npx wrangler pages download config <PROJECT_NAME>
```

Run the command, add the file to your project’s root directory, make changes as needed, and deploy to begin leveraging `wrangler.toml` in your project.

## Users with existing `wrangler.toml` files

It has been possible to use `wrangler.toml` for development with local bindings. That means you may have a file in your project that looks like this:


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
