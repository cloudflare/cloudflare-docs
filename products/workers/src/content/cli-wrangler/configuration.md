---
order: 3
---

# Configuration

## Background

Your project will need some configuration before you can publish your worker. These values are stored in a `wrangler.toml` file. You will need to manually edit this file to add these values before you can publish.

--------------------------------

## Environments

Top level configuration: the configuration values you specify at the top of your `wrangler.toml` will be applied to all environments if not otherwise specified in the environment.

Environment configuration <PropMeta>(optional)</PropMeta>: the configuration values you specify under an `[env.name]` in your `wrangler.toml`

Environments is a feature that allows you to deploy the same project to multiple places under multiple names. These environments are utilized with the `--env` or `-e` flag on the commands that are deploying live Worker scripts:

- `build`
- `preview`
- `publish`

Some environment properties can be [*inherited*](#keys) from the top level configuration, but values in an environment will always override those at the top level.

--------------------------------

## Keys

Keys to configure per project in your `wrangler.toml`.

**Top level only**: required to be configured at the top level of your wrangler.toml only; multiple environments on the same project must share this property

**Inherited**: Can be configured at the top level and/or environment. If the property is defined *only* at the top level, the environment will use the property value from the top level. If the property is defined in the environment, the environment value will override the top level value.

**Not inherited**: Must be defined for every environment individually.

<Definitions>

- `name` <Type>inherited</Type> <PropMeta>required</PropMeta>
  -  The name of your Worker script. If inherited, your environment name with be appended to the top level.

- `type` <Type>top level</Type> <PropMeta>required</PropMeta>
  -  Specifies how `wrangler build` will build your project. There are currently three options (`webpack`, `javascript`, and `rust`).

- `zone_id` <Type>inherited</Type> <PropMeta>optional</PropMeta>
  - This is the ID of the "zone" or domain you want to run your script on. It can also be specified through the `CF_ZONE_ID` environment variable. This key is optional if you are using only a [workers.dev](https://workers.dev) subdomain.

- `account_id` <Type>inherited</Type> <PropMeta>required</PropMeta>
  - This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one. It can also be specified through the `CF_ACCOUNT_ID` environment variable.

- `workers_dev` <Type>inherited</Type> <PropMeta>optional</PropMeta>
  - This is a boolean flag that specifies if your worker will be deployed to your [workers.dev](https://workers.dev) subdomain. If omitted defaults to false.

- `route` <Type>not inherited</Type> <PropMeta>optional</PropMeta>
  - A route, specified by URL pattern, on your zone that you would like to run your Worker on. <br />`route = "http://example.com/*"`. A `route` OR `routes` key is only required if you are not using a [workers.dev](https://workers.dev) subdomain.

- `routes` <Type>not inherited</Type> <PropMeta>optional</PropMeta>
  - A list of routes you’d like to use your worker on. These follow exactly the same rules a `route`, but you can specify a list of them.<br />`routes = ["http://example.com/hello", "http://example.com/goodbye"]`. A `route` OR `routes` key is only required if you are not using a [workers.dev](https://workers.dev) subdomain.

- `webpack_config` <Type>inherited</Type> <PropMeta>optional</PropMeta>
  - This is the path to a custom webpack configuration file for your worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. Visit the [Wrangler webpack page](/cli-wrangler/webpack) for more information.

- `vars` <Type>not inherited</Type> <PropMeta>optional</PropMeta>
  - An object containing text variables that can be directly accessed in a Worker script.

- `kv_namespaces` <Type>not inherited</Type> <PropMeta>optional</PropMeta>
  - These specify any [Workers KV](#kv_namespaces) Namespaces you want to access from inside your Worker.

- `site` <Type>inherited</Type> <PropMeta>optional</PropMeta>
  - Determines the local folder to upload and serve from a Worker

- `dev` <Type>not inherited</Type> <PropMeta>optional</PropMeta>
  - Arguments for `wrangler dev`, configure local server

- `triggers` <Type>inherited</Type> <PropMeta>optional</PropMeta>
  - Configures cron triggers for executing a Worker on a schedule

</Definitions>

### vars

Values to use in your Worker script as a text environment variables.

Usage:

```toml
vars = { FOO = "some value", BAR = "some other string" }
```

<Definitions>

- `FOO`
  - The variable to access in your Worker script

- `"some value"`
  - The string value the variable resolves to

</Definitions>

<Aside>

__Note:__ Using secrets should be handled using [wrangler secret](/cli-wrangler/commands#secret). The `vars` definition in your `wrangler.toml` must not contain newlines in order to be valid TOML.

</Aside>

### kv_namespaces

KV namespaces bind to your Worker and reference in your script.

Usage:

```toml
kv_namespaces = [
  { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279", preview_id = "6a1ddb03f3ec250963f0a1e46820076f" },
  { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0", preview_id = "fb69528dbc7336525313f2e8c3b17db0" }
]
```

<Definitions>

- `binding` <PropMeta>required</PropMeta>
  - After you’ve created a namespace, you must bind it to your Worker  so it is accessible from within the Worker script via a variable name you specify.

- `id` <PropMeta>required</PropMeta>
  - The ID of the namespace you wish to bind to the Worker’s global scope when it is deployed. Required for `wrangler publish`.

- `preview_id` <PropMeta>required</PropMeta>
  - The ID of the namespace you wish to bind to the Worker’s global scope when it is previewed . Required for `wrangler dev` and `wrangler preview`.

</Definitions>

<Aside>

__Note:__ Creating your KV Namespaces can be handled using Wrangler’s [KV Commands](/cli-wrangler/commands#kv).

You can also define your `kv_namespaces` using [alternative TOML syntax](https://github.com/toml-lang/toml#user-content-table).

</Aside>

### site

A Workers Site generated with [`wrangler generate --site`](/cli-wrangler/commands#generate) or [`wrangler init --site`](/cli-wrangler/commands#init).

Usage:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
```

<Definitions>

- `bucket` <PropMeta>required</PropMeta>
  - The directory containing your static assets, path relative to your `wrangler.toml`. Example: `bucket = "./public"`

- `entry-point` <PropMeta>optional</PropMeta>
  - The location of your Worker script, default is `workers-site`. Example: `entry-point = "./workers-site"`

- `include` <PropMeta>optional</PropMeta>
  - A list of gitignore-style patterns for files or directories in `bucket` you exclusively want to upload. Example: `include = ["upload_dir"]`

- `exclude` <PropMeta>optional</PropMeta>
  - A list of gitignore-style patterns for files or directories in `bucket` you want to exclude from uploads. Example: `exclude = ["ignore_dir"]`

</Definitions>

To learn more about the optional `include` and `exclude` fields, visit [Ignoring Subsets of Static Assets](#ignoring-subsets-of-static-assets).

You can also define your `site` using [alternative TOML syntax](https://github.com/toml-lang/toml#user-content-inline-table).

#### Storage Limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 25MB limit per page or file. Additionally, Wrangler will create an asset manifest for your files that will count towards your script’s size limit. If you have too many files, you may not be able to use Workers Sites.

#### Ignoring Subsets of Static Assets

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) — make sure to be on the [latest version](/cli-wrangler/install-update#update) — and the Workers [Bundled plan](https://workers.cloudflare.com/sites#plans).

There are cases where users may not want to upload certain static assets to their Workers Sites.
In this case, Workers Sites can also be configured to ignore certain files or directories using logic
similar to [Cargo’s optional include and exclude fields](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).
This means that we use gitignore semantics when declaring which directory entries to include or ignore in uploads.

#### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
include = ["included_dir"] # must be an array.
```

Wrangler will only upload files or directories matching the patterns in the `include` array.

#### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your
`[site]` section of `wrangler.toml`:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
exclude = ["excluded_dir"] # must be an array.
```

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

#### Include > Exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

#### Default ignored entries

Wrangler will always ignore:

- `node_modules`
- Hidden files and directories
- Symlinks

#### More about include/exclude patterns

You can learn more about the standard patterns used for include and exclude in the [gitignore documentation](https://git-scm.com/docs/gitignore).

#### Customizing your Build

Workers Sites projects use webpack by default. You can [bring your own webpack config](/cli-wrangler/webpack#using-with-workers-sites), however it is important to be cognizant of your `entry` and `context` settings.

### triggers

A set of cron triggers used to call a Worker on a schedule.

Usage:

```toml
[triggers]
crons = ["0 0 * JAN-JUN FRI", "0 0 LW JUL-DEC *"]
```

- `crons` optional
  - A set of cron expressions, where each expression is a separate schedule to run the Worker on.

### dev

Arguments for `wrangler dev` can be configured here so you don't have to repeatedly pass them.

Usage:

```toml
[dev]
port=9000
local_protocol="https"
```

<Definitions>

- `ip` <PropMeta>optional</PropMeta>
  - Ip for local `wrangler dev` server to listen on, defaults to 127.0.0.1

- `port` <PropMeta>optional</PropMeta>
  - Port for local `wrangler dev` server to listen on, defaults to 8787

- `local_protocol` <PropMeta>optional</PropMeta>
  - Protocol that local `wrangler dev` server listen to requests on, defaults to http

- `upstream_protocol` <PropMeta>optional</PropMeta>
  - Protocol that `wrangler dev` forwards requests on, defaults to https

</Definitions>

--------------
## Example

To illustrate how these levels are applied, here is a wrangler.toml using multiple environments:

```toml
---
filename: wrangler.toml
---
# top level configuration
type = "webpack"
name = "my-worker-dev"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "dev.example.com/*"
kv_namespaces = [
  { binding = "FOO", id = "b941aabb520e61dcaaeaa64b4d8f8358", preview_id = "03c8c8dd3b032b0528f6547d0e1a83f3" },
  { binding = "BAR", id = "90e6f6abd5b4f981c748c532844461ae", preview_id = "e5011a026c5032c09af62c55ecc3f438" }
]

[site]
bucket = "./public"
entry-point = "workers-site"

[dev]
ip = "0.0.0.0"
port = 9000
local_protocol="http"
upstream_protocol="https"

# environment configuration
[env.staging]
name = "my-worker-staging"
route = "staging.example.com/*"
kv_namespaces = [
  { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279" },
  { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0" }
]

# environment configuration
[env.production]
workers_dev= true
kv_namespaces = [
  { binding = "FOO", id = "0d2ac74b498b48028cb68387c421e233" },
  { binding = "BAR", id = "0d8c101e168d03c65bddf4ba75150f33" }
]
```

<Aside>

__Note:__ Global user was configured with the `wrangler login`, `wrangler config`, or environment variables.

</Aside>
