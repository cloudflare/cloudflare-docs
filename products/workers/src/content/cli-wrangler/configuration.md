---
order: 3
pcx-content-type: configuration
---

# Configuration

## Background

Your project will need some configuration before you can publish your Worker. Configuration is done through changes to keys and values stored in a `wrangler.toml` file. You must manually edit this file to edit your keys and values before you can publish.

---

## Environments

Top level configuration: the configuration values you specify at the top of your `wrangler.toml` will be applied to all environments if not otherwise specified in the environment.

The layout of a top level configuration in a `wrangler.toml` file is displayed below:

```toml
-
your-worker.toml
-
name = "your-worker"
type = "javascript"
account_id = "your-account-id"

# This field speficies that the Worker
# will be deployed to *.workers.dev domain
workers_dev = true

# -- OR --

# These fields specify that the Worker
# will deploy to a custom domain
zone_id = "your-zone-id"
routes = ["example.com/*"]
```

Environment configuration <PropMeta>(optional)</PropMeta>: the configuration values you specify under an `[env.name]` in your `wrangler.toml` file.

Environments is a feature that allows you to deploy the same project to multiple places under multiple names. These environments are utilized with the `--env` or `-e` flag on the commands that are deploying live Worker scripts:

- `build`
- `dev`
- `preview`
- `publish`
- `secret`

An example syntax would look like this: `wrangler publish --env "environment name"`.

Some environment properties can be [_inherited_](#keys) from the top level configuration, but if new values are configured in an environment, they will always override those at the top level.

An example of a `[env.name]` configuration looks like this:

```toml
-
your-worker.toml
-
name = "your-worker"
type = "javascript"
account_id = "your-account-id"

[env.helloworld]
# These new values will override the top level configuration.
name = "your-worker-helloworld"
account id = "your-other-account-id"

# Any additional keys, like environment variables, will be placed here.
vars = { FOO = "some value", BAR = "some other string" }
kv_namespaces = [
  { binding = "FOO", id = "1a2b3c4d5e", preview_id = "6e7f8g9h10i" }

```

---

## Keys

Keys to configure per project in your `wrangler.toml`.

// why is this here? are there any top level only keys?
**Top level only**: required to be configured at the top level of your `wrangler.toml` only; multiple environments on the same project must share this property.

**Inherited**: Can be configured at the top level and/or environment. If the property is defined _only_ at the top level, the environment will use the property value from the top level. If the property is defined in the environment, the environment value will override the top level value.

**Not inherited**: Must be defined for every environment individually.

<Definitions>

- `name` <Type>inherited</Type> <PropMeta>required</PropMeta>

  - The name of your Worker script. If inherited, your environment name will be appended to the top level.

- `type` <Type>top level</Type> <PropMeta>required</PropMeta>

  - Specifies how `wrangler build` will build your project. There are three options: `javascript`, `webpack`, and `rust`. `javascript` checks for a build command specified in the `[build]` section, `webpack` builds your project using webpack v4, and `rust` compiles the Rust in your project to WebAssembly.

<Aside>

  **Note:** We will continue to support `rust` and `webpack` project types, but we recommend using the `javascript` project type and specifying a custom [`build`](#build) section.

</Aside>

- `account_id` <Type>inherited</Type> <PropMeta>required</PropMeta>

  - This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one. It can also be specified through the `CF_ACCOUNT_ID` environment variable.

- `zone_id` <Type>inherited</Type> <PropMeta>optional</PropMeta>

  - This is the ID of the "zone" or domain you want to run your script on. It can also be specified through the `CF_ZONE_ID` environment variable. This key is optional if you are using only a [workers.dev](https://workers.dev) subdomain.

- `workers_dev` <Type>inherited</Type> <PropMeta>optional</PropMeta>

  - This is a boolean flag that specifies if your Worker will be deployed to your [workers.dev](https://workers.dev) subdomain. If omitted defaults to false.

- `route` <Type>not inherited</Type> <PropMeta>optional</PropMeta>

  - A route, specified by URL pattern, on your zone that you would like to run your Worker on. <br />`route = "http://example.com/*"`. A `route` OR `routes` key is only required if you are not using a [workers.dev](https://workers.dev) subdomain.

- `routes` <Type>not inherited</Type> <PropMeta>optional</PropMeta>

  - A list of routes you would like to use your Worker on. These follow exactly the same rules a `route`, but you can specify a list of them.<br />`routes = ["http://example.com/hello", "http://example.com/goodbye"]`. A `route` OR `routes` key is only required if you are not using a [workers.dev](https://workers.dev) subdomain.

- `webpack_config` <Type>inherited</Type> <PropMeta>optional</PropMeta>

  - This is the path to a custom webpack configuration file for your Worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. Visit the [Wrangler webpack page](/cli-wrangler/webpack) for more information.

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

- `usage_model` <Type>top level</Type> <PropMeta>optional</PropMeta>
  - Specifies the [Usage Model](/platform/pricing#usage-models) for your Worker. There are two options - [`bundled`](/platform/limits#bundled-usage-model) and [`unbound`](/platform/limits#unbound-usage-model). For newly created Workers, if the Usage Model is omitted it will be set to the [default Usage Model set on the account](https://dash.cloudflare.com/?account=workers/default-usage-model). For existing Workers, if the Usage Model is omitted, it will be set to the Usage Model configured in the dashboard for that Worker.

- `build` <Type>inherited</Type> <PropMeta>optional</PropMeta>

  - Allows configuring a custom build step to be run by Wrangler when building your Worker. See the [custom builds documentation](#build) for more details.


</Definitions>

### vars

Values to use in your Worker script as text environment variables.

Usage:

```toml
[vars]
FOO = "some value"
BAR = "some other string"
```

<Definitions>

- `FOO`

  - The [variable](/workers/platform/environments#environment-variables) to access in your Worker script

- `"some value"`
  - The string value the variable resolves to

</Definitions>

Alternatively, you can define `vars` using an "inline table" format. This style should not include any newlines to be considered valid TOML:

```toml
vars = { FOO = "some value", BAR = "some other string" }
```

<Aside>

**Note:** Using secrets should be handled using [wrangler secret](/cli-wrangler/commands#secret).

</Aside>

### kv_namespaces

KV namespaces bind to your Worker and may be referenced in your script.

Usage:

```toml
kv_namespaces = [
  { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279", preview_id = "6a1ddb03f3ec250963f0a1e46820076f" },
  { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0", preview_id = "fb69528dbc7336525313f2e8c3b17db0" }
]
```

<Definitions>

- `binding` <PropMeta>required</PropMeta>

  - After you’ve created a namespace, you must bind it to your Worker so it is accessible from within the Worker script via a variable name you specify.

- `id` <PropMeta>required</PropMeta>

  - The ID of the namespace you wish to bind to the Worker’s global scope when it is deployed. Required for `wrangler publish`.

- `preview_id` <PropMeta>required</PropMeta>
  - The ID of the namespace you wish to bind to the Worker’s global scope when it is previewed . Required for `wrangler dev` and `wrangler preview`.

</Definitions>

<Aside>

**Note:** Creating your KV Namespaces can be handled using Wrangler’s [KV Commands](/cli-wrangler/commands#kv).

You can also define your `kv_namespaces` using [alternative TOML syntax](https://github.com/toml-lang/toml/blob/master/toml.md#user-content-table).

</Aside>

### site

A [Workers Site](/platform/sites) generated with [`wrangler generate --site`](/cli-wrangler/commands#generate) or [`wrangler init --site`](/cli-wrangler/commands#init).

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

You can also define your `site` using [alternative TOML syntax](https://github.com/toml-lang/toml/blob/master/toml.md#user-content-inline-table).

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

#### Customizing your Sites Build

Workers Sites projects use webpack by default. You can [bring your own webpack config](/cli-wrangler/webpack#using-with-workers-sites), however it is important to be cognizant of your `entry` and `context` settings.

You can also use the `[build]` section with Workers Sites, as long as your build step will resolve dependencies in `node_modules`. See the [custom builds](#build) section for more information.

### triggers

A set of cron triggers used to call a Worker on a schedule.

Usage:

```toml
[triggers]
crons = ["0 0 * JAN-JUN FRI", "0 0 LW JUL-DEC *"]
```

- `crons` <PropMeta>optional</PropMeta>
  - A set of cron expressions, where each expression is a separate schedule to run the Worker on.

### dev

Arguments for `wrangler dev` can be configured here so you don't have to repeatedly pass them.

Usage:

```toml
[dev]
port = 9000
local_protocol = "https"
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

### build

Customize the command used to build your project. There are two configurations based on the format of your Worker: `service-worker` and `modules` _(in beta)_.

#### Service Workers

This section is for customizing Workers with the `service-worker` format. If you're not familar, these are Workers that use `addEventListener` and look like the following:

```js
addEventListener('fetch', function (event) {
  event.respondWith(new Response("I'm a service Worker!"))
})
```

Usage:

```toml
[build]
command = "npm install && npm run build"

[build.upload]
format = "service-worker"
```

#### `[build]`

<Definitions>

- `command` <PropMeta>optional</PropMeta>

  - The command to build your project which is executed in the shell of your machine: `sh` for Linux and MacOS, and `cmd` for Windows. You can also use shell operators such as `&&` and `|`

- `cwd` <PropMeta>optional</PropMeta>

  - The working directory for commands, defaults to the project root directory

- `watch_dir` <PropMeta>optional</PropMeta>

  - The directory to watch for changes while using `wrangler dev`, defaults to "src" relative to the project root directory

</Definitions>

#### `[build.upload]`

<Definitions>

  - `format` <PropMeta>required</PropMeta>

    - The format of the Worker script, must be "service-worker"

</Definitions>

<Aside>

  **Note:** Make sure the `main` field in your `package.json` references the Worker script you want to publish.

</Aside>

#### Modules

Cloudflare Workers now supports uploading scripts as a collection of modules, instead of a single file. Scripts uploaded in this fashion are written a bit differently -- they `export` their event handlers instead of registering them using the global `addEventListener('fetch', handler...)`. Modules also receive bindings (like KV Namespaces, Config Vargs, and Secrets) as arguments to their handlers, rather than global variables. Uploaded modules can `import` (for ES Modules) or `require()` (for CommonJS modules) other uploaded modules.

<Aside>

  **Note:** You currently need to opt-in to the [Durable Objects](/learning/using-durable-objects)
  open beta to be able to use the `modules` format. This restriction will be removed as modules are
  better supported in the Workers Dashboard.

</Aside>

```js
import html from './index.html'

export default {
  // * request is the same as `event.request` from the service worker format
  // * waitUntil() and passThroughOnException() are accessible from `ctx` instead of `event` from the service worker format
  // * env is where bindings like KV namespaces, Durable Object namespaces, Config variables, and Secrets
  // are exposed, instead of them being placed in global scope.
  async fetch(request, env, ctx) {
    const headers = { 'Content-Type': 'text/html;charset=UTF-8' }
    return new Response(html, { headers })
  }
}
```

In the future, Modules will become the default format for writing Workers scripts. Until then, Cloudflare is still working on "full" support, so consider Modules as a beta feature.

To create a Workers project using Wrangler and Modules, add a `[build]` section:

```toml
[build]
command = "npm install && npm run build"

[build.upload]
format = "modules"
main = "./worker.mjs"
```

##### `[build]`

<Definitions>

- `command` <PropMeta>optional</PropMeta>

  - The command to build your project which is executed in the shell of your machine: `sh` for Linux and MacOS, and `cmd` for Windows. You can also use shell operators such as `&&` and `||`

- `cwd` <PropMeta>optional</PropMeta>

  - The working directory for commands, defaults to the project root directory

- `watch_dir` <PropMeta>optional</PropMeta>

  - The directory to watch for changes while using `wrangler dev`, defaults to "src" relative to the project root directory

</Definitions>

##### `[build.upload]`

<Definitions>

- `format` <PropMeta>required</PropMeta>

  - The format of the Workers script, must be `"modules"`

- `dir` <PropMeta>optional</PropMeta>

  - The directory you wish to upload your modules from, defaults to "dist" relative to the project root directory

- `main` <PropMeta>required</PropMeta>

  - The relative path of the main module from `dir`, including the `./` prefix. The main module must be an ES module. For projects with a build script, this usually refers to the output of your JavaScript bundler.

<Aside>

  **Note:** If your project is written using CommonJS modules, you will need to re-export your handlers and Durable Object classes using an ES module shim. See the [modules-webpack-commonjs](https://github.com/cloudflare/modules-webpack-commonjs) template as an example.

</Aside>

- `rules` <PropMeta>optional</PropMeta>

  - An ordered list of rules that define which modules to import, and what type to import them as.
    You will need to specify rules to use Text, Data, and CompiledWasm modules, or when you wish to
    have a `.js` file be treated as an `ESModule` instead of `CommonJS`.

  - Defaults:

    ```toml
    [build.upload]
    format = "modules"
    main = "./worker.mjs"

    # You do not need to include these default rules in your `wrangler.toml`, they are implicit.
    # The default rules are treated as the last two rules in the list.

    [[build.upload.rules]]
    type = "ESModule"
    globs = ["**/*.mjs"]

    [[build.upload.rules]]
    type = "CommonJS"
    globs = ["**/*.js", "**/*.cjs"]
    ```

  - <Definitions>

    - `type` <PropMeta>required</PropMeta>

      - The module type, see the table below for acceptable options

      <TableWrap>

        | `type`       | JavaScript type      |
        | ------------ | -------------------- |
        | ESModule     | -                    |
        | CommonJS     | -                    |
        | Text         | `String`             |
        | Data         | `ArrayBuffer`        |
        | CompiledWasm | `WebAssembly.Module` |

      </TableWrap>

    - `globs` <PropMeta>required</PropMeta>

      - Unix-style [glob rules](https://docs.rs/globset/0.4.6/globset/#syntax) that are used to determine the module type to use for a given file in `dir`. Globs are matched against the module's relative path from `build.upload.dir` without the `./` prefix. Rules are evaluated in order, starting at the top.

    - `fallthrough` <PropMeta>optional</PropMeta>

      - This option allows further rules for this module type to be considered if set to true. If not specified or set to false, further rules for this module type will be ignored.

    </Definitions>

</Definitions>

---

## Example

To illustrate how these levels are applied, here is a wrangler.toml using multiple environments:

```toml
---
filename: wrangler.toml
---
# top level configuration
type = "javascript"
name = "my-worker-dev"
account_id = "12345678901234567890"
zone_id = "09876543210987654321"
route = "dev.example.com/*"
usage_model = "unbound"
kv_namespaces = [
  { binding = "FOO", id = "b941aabb520e61dcaaeaa64b4d8f8358", preview_id = "03c8c8dd3b032b0528f6547d0e1a83f3" },
  { binding = "BAR", id = "90e6f6abd5b4f981c748c532844461ae", preview_id = "e5011a026c5032c09af62c55ecc3f438" }
]

[build]
command = "webpack"
[build.upload]
format = "service-worker"

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

**Note:** Global user was configured with the `wrangler login`, `wrangler config`, or environment variables.

</Aside>
