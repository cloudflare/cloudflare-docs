---
pcx-content-type: how-to
title: Configuration
weight: 3
---

## Configuring `wrangler.toml`

`wrangler` optionally uses a `wrangler.toml` configuration file to customise the development and publishing setup for a Worker. This document serves as a reference for all the fields and acceptable values in this configuration file.

The configuration for a Worker is can become complex since we can define different "environments", and each environment can have its own configuration.
There is a default ("top-level") environment and then named environments that provide environment specific configuration.

Additionally there are three kinds of environment configurations non-overridable, inheritable, and non-inheritable.

Top-level:
@non-overridable
: These values are defined once in the top-level configuration, apply to all environments and cannot be overridden by an environment.

</br>

```toml
---
filename: wrangler.toml
---

# A boolean to enable "legacy" style wrangler environments (from wrangler 1).
# These have been superseded by Services, but there may be projects that won't
# (or can't) use them. If you're using a legacy environment, you can set this
# to `true` to enable it.
legacy_env = true

# Options to configure the development server that your worker will use.
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
  # Protocol that wrangler dev forwards requests on
  # Setting this to `http` is not currently implemented.
  # See https://github.com/cloudflare/wrangler2/issues/583
  # @default `https`
  upstream_protocol = "https" | "http";
  # Host to forward requests to, defaults to the host of the first route of project
  host = # see route in Environments

# A list of migrations that should be uploaded with your Worker.
# These define changes in your Durable Object declarations.
# More details at https://developers.cloudflare.com/workers/learning/using-durable-objects#configuring-durable-object-classes-with-migrations
# @default `[]`
[[migrations]]
  # A unique identifier for this migration.
  tag = ""
  # The new Durable Objects being defined.
  new_classes = [""]
  # The Durable Objects being renamed.
  renamed_classes = [{from = "DurableObjectExample", to = "UpdatedName" }]
  # The Durable Objects being removed.
  deleted_classes = ["DeprecatedClass"]

# The definition of a Worker Site, a feature that lets you upload
# static assets with your Worker.
# Learn more here about sites https://developers.cloudflare.com/workers/platform/sites
[site]
  # The directory containing your static assets.
  # It must be a path relative to your wrangler.toml file.
  # If there is a `site` field then it must contain this `bucket` field.
  bucket = "./public"
  # An exclusive list of .gitignore-style patterns that match file
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
#  For more information, see the documentation at https://developers.cloudflare.com/workers/cli-wrangler/configuration#environments
#  @default `{}`
[env]
  # See Environments


# A list of text files that your worker should be bound to. This is
# the "legacy" way of binding to a text file. ES module workers should
# do proper module imports.
[text_blobs]
  TEXT = ""

# A list of data files that your worker should be bound to. This is
# the "legacy" way of binding to a data file. ES module workers should
# do proper module imports.
[data_blobs]
  DATA = ""

# A list of wasm modules that your worker should be bound to. This is
# the "legacy" way of binding to a wasm module. ES module workers should
# do proper module imports.
[wasm_modules]
  MODULE = "module.wasm"
```

</br>

Environments:
@inheritable
: These values can be defined at the top-level but can also be overridden by environment specific values.
Named environments do not need to provide their own values, in which case they inherit the value from the top-level.

@non-inheritable
: These values must be explicitly defined in each environment if they are defined at the top-level.
Named environments do not inherit such configuration and must provide their own values.

```toml
---
filename: wrangler.toml
---
# The name of your worker. Alphanumeric + dashes only.
# @inheritable
name = "worker"

# This is the ID of the account associated with your zone.
# You might have more than one account, so make sure to use
# the ID of the account associated with the zone/route you
# provide, if you provide one. It can also be specified through
# the CLOUDFLARE_ACCOUNT_ID environment variable.
# @inheritable
account_id = ""

# A date in the form yyyy-mm-dd, which will be used to determine
# which version of the Workers runtime is used.
# @inheritable
compatibility_date = "2021-11-12"

# A list of flags that enable features from upcoming features of
# the Workers runtime, usually used together with compatibility_flags.
# @inheritable
compatibility_flags = [
    "formdata_parser_supports_files"
]

# The entrypoint/path to the file that will be executed.
main = "./some-entrypoint"

# Whether we use <name>.<subdomain>.workers.dev to
# test and deploy your worker.
# @default `true`
# @inheritable
workers_dev = true

# A list of routes that your worker should be published to.
# Only one of `routes` or `route` is required.
# Only required when workers_dev is false, and there's no scheduled worker (see `triggers`)
# @inheritable
routes = ["routes"] | [{ pattern = "*", zone_id = "ZONE_ID" }] | [{ pattern = "*", zone_name = "ZONE_NAME" }]

# The same as routes, but only one.
# @inheritable
route = "routes" | { pattern = "*", zone_id = "ZONE_ID" } | { pattern = "*", zone_name = "ZONE_NAME" }

# Path to a custom tsconfig
# @inheritable
tsconfig = "./tsconfig.json"

# Minify the script before uploading.
# @inheritable
minify = false

# Add polyfills for node builtin modules and globals
# @inheritable
node_compat = false

# Specifies the Usage Model for your Worker. There are two options -
# [bundled](https://developers.cloudflare.com/workers/platform/limits#bundled-usage-model) and
# [unbound](https://developers.cloudflare.com/workers/platform/limits#unbound-usage-model).
# For newly created Workers, if the Usage Model is omitted
# it will be set to the [default Usage Model set on the account](https://dash.cloudflare.com/?account=workers/default-usage-model).
# For existing Workers, if the Usage Model is omitted, it will be
# set to the Usage Model configured in the dashboard for that Worker.
# @inheritable
usage_model = "bundled" | "unbound"

# An ordered list of rules that define which modules to import,
# and what type to import them as. You will need to specify rules
# to use Text, Data, and CompiledWasm modules, or when you wish to
# have a .js file be treated as an ESModule instead of CommonJS.
# @inheritable
[[rules]]
  type = "Text"
  globs = ["**/*.md"]
  fallthrough = true

# Lets you call workers periodically, much like a cron job.
# More details here https://developers.cloudflare.com/workers/platform/cron-triggers
# @default `{crons:[]}`
# @inheritable
[triggers]
crons = ["1 * * * *"]

# Configures a custom build step to be run by Wrangler when building your Worker.
# Refer to the [custom builds documentation](https://developers.cloudflare.com/workers/cli-wrangler/configuration#build)
# for more details.
# @inheritable
# @default {}
[build]
  # The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows.
  # The `&&` and `||` shell operators may be used.
  command = "npm run build"
  # The directory in which the command is executed.
  cwd = "build_cwd"
  # The directory to watch for changes while using wrangler dev, defaults to the current working directory
  watch_dir = "build_watch_dir"

# These specify any Workers KV Namespaces you want to
# access from inside your Worker.
# To learn more about KV Namespaces see:
# https://developers.cloudflare.com/workers/learning/how-kv-works
# @default `[]`
# @nonInheritable
kv_namespaces = [{
  # The binding name used to refer to the KV Namespace
  binding = "TEST_NAMESPACE",
  # The ID of the KV namespace at the edge
  id = "",
  # The ID of the KV namespace used during `wrangler dev`
  preview_id = ""
  }]

# A list of durable objects that your worker should be bound to.
# To learn more about durable objects see:
# https://developers.cloudflare.com/workers/learning/using-durable-objects
# @default `{bindings:[]}`
# @nonInheritable
[durable_objects]
  bindings = [{
    # The name of the binding used to refer to the Durable Object
    name = "TEST_OBJECT",
    # The exported class name of the Durable Object
    class_name = "",
    # The script where the Durable Object is defined (if it's external to this worker)
    script_name = ""
  }]


# Specifies R2 buckets that are bound to this Worker environment.
# @default `[]`
# @nonInheritable
r2_buckets  = [{
  # The binding name used to refer to the R2 bucket in the worker.
  binding = "TEST_BUCKET",
  # The name of this R2 bucket at the edge.
  bucket_name = "",
  # The preview name of this R2 used during `wrangler dev`
  preview_bucket_name =  ""
}]

# A map of environment variables to set when deploying your worker.
# @default `{}`
# @nonInheritable
[vars]
KEY = "value"

# "Unsafe" tables for features that aren't directly supported by wrangler.
# @default `{ bindings: [] }`
# @nonInheritable
[unsafe]
  # A set of bindings that should be put into a Worker's upload metadata without changes. These
  # can be used to implement bindings for features that haven't released and aren't supported
  # directly by wrangler or miniflare.
  # @default []
  bindings = [{
    name = "",
    type = "",
    "some-key": {} # any data
  }]
```
