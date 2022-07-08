---
pcx-content-type: how-to
title: Configuration
weight: 3
---

# Configure `wrangler.toml`

Wrangler optionally uses a `wrangler.toml` configuration file to customize the development and publishing setup for a Worker. This document serves as a reference for all the fields and acceptable values in this configuration file.

The configuration for a Worker can become complex when you can define different [environments](/workers/platform/environments/), and each environment has its own configuration.
There is a default (top-level) environment and named environments that provide environment-specific configuration.

```toml
---
filename: wrangler.toml
---

# The name of your Worker. Alphanumeric values and dashes only.
name = "worker"

# The entrypoint/path to the file that will be executed.
main = "./some-entrypoint"

# This is the ID of the account associated with your zone.
# You might have more than one account, so make sure to use
# the ID of the account associated with the zone/route you
# provide, if you provide one. It can also be specified through
# the CLOUDFLARE_ACCOUNT_ID environment variable.
account_id = ""

# Whether you use `<NAME>.<SUBDOMAIN>.workers.dev` to
# test and deploy your Worker.
# @default `true`
workers_dev = true

# Specifies the Usage Model for your Worker. There are two options -
# [bundled](https://developers.cloudflare.com/workers/platform/limits#bundled-usage-model) and
# [unbound](https://developers.cloudflare.com/workers/platform/limits#unbound-usage-model).
# For newly created Workers, if the Usage Model is omitted
# it will be set to the [default Usage Model set on the account](https://dash.cloudflare.com/?account=workers/default-usage-model).
# For existing Workers, if the Usage Model is omitted, it will be
# set to the Usage Model configured in the Cloudflare dashboard for that Worker.
usage_model = "bundled" | "unbound"

# A list of routes that your Worker should be published to.
# Only one of `routes` or `route` is required.
# Only required when `workers_dev` is false, and there is no scheduled Worker (refer to `triggers`)
routes = ["routes"] | [{ pattern = "*", zone_id = "ZONE_ID" }] | [{ pattern = "*", zone_name = "ZONE_NAME" }]

# The same as routes, but only one.
route = "routes" | { pattern = "*", zone_id = "ZONE_ID" } | { pattern = "*", zone_name = "ZONE_NAME" }

# Lets you call Workers periodically, much like a cron job.
# More details: https://developers.cloudflare.com/workers/platform/cron-triggers
# @default `{crons:[]}`
[triggers]
crons = ["1 * * * *"]

# A map of environment variables to set when deploying your Worker.
# @default `{}`
# not inherited
[vars]
KEY = "value"

# These specify any Workers KV Namespaces you want to
# access from inside your Worker.
# To learn more about KV namespaces, refer to:
# https://developers.cloudflare.com/workers/learning/how-kv-works
# @default `[]`
# @param {string} binding The binding name used to refer to the KV namespace
# @param {string} id The ID of the KV namespace at the edge
# @param {string} preview_id The ID of the KV namespace used during `wrangler dev`
# not inherited
kv_namespaces = [
  { binding = "TEST_NAMESPACE", id = "", preview_id = "" }
]

# A list of Durable Objects that your Worker should be bound to.
# To learn more about Durable Objects, refer to:
# https://developers.cloudflare.com/workers/learning/using-durable-objects
# @default `{bindings:[]}`
# @param {string} name The name of the binding used to refer to the Durable Object
# @param {string} class_name The exported class name of the Durable Object
# @param {string} script_name The script where the Durable Object is defined (if it is external to this Worker)
# not inherited
[durable_objects]
  bindings = [
    { name = "TEST_OBJECT", class_name = "", script_name = "" }
  ]

# A list of migrations that should be uploaded with your Worker.
# These define changes in your Durable Object declarations.
# More details: https://developers.cloudflare.com/workers/learning/using-durable-objects#configuring-durable-object-classes-with-migrations
[[migrations]]
  # A unique identifier for this migration.
  tag = ""
  # The new Durable Objects being defined.
  new_classes = [""]
  # The Durable Objects being renamed.
  renamed_classes = [{from = "DurableObjectExample", to = "UpdatedName" }]
  # The Durable Objects being removed.
  deleted_classes = ["DeprecatedClass"]

# Specifies R2 buckets that are bound to this Worker environment.
# @default `[]`
# @param {string} binding The binding name used to refer to the R2 bucket in the Worker.
# @param {string} bucket_name The name of this R2 bucket at the edge.
# @param {string} preview_bucket_name The preview name of this R2 used during `wrangler dev`
# not inherited
r2_buckets  = [
  { binding = "TEST_BUCKET", bucket_name = "", preview_bucket_name =  "" }
]

# Configures a custom build step to be run by Wrangler when building your Worker.
# Refer to the [custom builds documentation](https://developers.cloudflare.com/workers/cli-wrangler/configuration#build)
# for more details.
# @default {}
[build]
  # The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows.
  # The `&&` and `||` shell operators may be used.
  command = "npm run build"
  # The directory in which the command is executed.
  cwd = "build_cwd"
  # The directory to watch for changes while using `wrangler dev`, defaults to the current working directory
  watch_dir = "build_watch_dir"

# An ordered list of rules that define which modules to import,
# and what type to import them as. You will need to specify rules
# to use `Text`, `Data`, and `CompiledWasm` modules, or when you wish to
# have a .js file be treated as an ESModule instead of CommonJS.
[[rules]]
  type = "Text"
  globs = ["**/*.md"]
  fallthrough = true

# A list of text files that your Worker should be bound to. This is
# the legacy way of binding to a text file. ES module Workers should
# do proper module imports.
[text_blobs]
  TEXT = ""

# A list of wasm modules that your Worker should be bound to. This is
# the legacy way of binding to a wasm module. ES module Workers should
# do proper module imports.
[wasm_modules]
  MODULE = "module.wasm"

# A list of data files that your Worker should be bound to. This is
# the legacy way of binding to a data file. ES module Workers should
# do proper module imports.
[data_blobs]
  DATA = ""

# Path to a custom tsconfig
tsconfig = "./tsconfig.json"

# Minify the script before uploading.
minify = false

# Add polyfills for node builtin modules and globals
node_compat = false

# Options to configure the development server that your Worker will use.
[dev]
  # IP address for the local dev server to listen on,
  # @default `localhost`
  ip = ""
  # Port for the local dev server to listen on
  # @default `8787`
  port = 4321
  # Protocol that local wrangler dev server listens to requests on.
  # @default `http`
  local_protocol = "http" | "https"
  # Host to forward requests to, defaults to the host of the first route of project
  host = # see route in Environments

# The definition of a Worker Site, a feature that lets you upload
# static assets with your Worker.
# Learn more here about sites: https://developers.cloudflare.com/workers/platform/sites
[site]
  # The directory containing your static assets.
  # It must be a path relative to your `wrangler.toml` file.
  # If there is a `site` field then it must contain this `bucket` field.
  bucket = "./public"
  # An exclusive list of `.gitignore`-style patterns that match file
  # or directory names from your bucket location.
  # Only matched items will be uploaded.
  include = ["upload_dir"]
  # Match files or directories in your bucket
  # that should be excluded from uploads.
  exclude = ["ignore_dir"]


#  The `env` section defines overrides for the configuration for different environments.
#  All environment fields can be specified at the top level of the config indicating the default environment settings.
#  - Some fields are inherited and overridable in each environment.
#  - But some are not inherited and must be explicitly specified in every environment, if they are specified at the top level.
[env]
  # Refer to Environments: https://developers.cloudflare.com/workers/platform/environments/

# A date in the form yyyy-mm-dd, which will be used to determine
# which version of the Workers runtime is used.
compatibility_date = "2021-11-12"

# A list of flags that enable features from upcoming features of
# the Workers runtime, usually used together with `compatibility_flags`.
compatibility_flags = [
    "formdata_parser_supports_files"
]

# A list of other Cloudflare services bound to this service.
# @default `[]`
# @param {string} binding The binding name used to refer to the bound service.
# @param {string} service The name of the service.
# @param {string} environment The environment of the service (For example, production, staging, etc) (optional).
services = [
  { binding = "TEST_BINDING", service = "", environment = "" }
]
```

## Proxy support

When using Wrangler in corporate environments that require the use of a VPN or HTTP proxy, you may come across a `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` error.

You can use Wrangler with your VPN or HTTP proxy via environment variables. 

To use Wrangler behind a proxy, you'll need to set an environment variable pointing to your proxy.

Wrangler supports the following environment variable names:
- `https_proxy`
- `HTTPS_PROXY`
- `http_proxy`
- `HTTP_PROXY`

The first non-empty environment variable in this list will be used when wrangler makes outgoing requests.

For example, on macOS this can be done by adding `HTTP_PROXY=http://<YOUR_PROXY_HOST>:<YOUR_PROXY_PORT>` before your wrangler commands, as shown below:

```bash
HTTP_PROXY=http://localhost:8080 wrangler dev
```
