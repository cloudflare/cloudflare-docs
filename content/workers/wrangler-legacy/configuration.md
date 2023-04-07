---
pcx_content_type: configuration
title: Configuration
weight: 4
---

# Configuration

{{<render file="_wrangler-v1-deprecation.md">}}

## Background

Your project will need some configuration before you can publish your Worker. Configuration is done through changes to keys and values stored in a `wrangler.toml` file located in the root of your project directory. You must manually edit this file to edit your keys and values before you can publish.

---

## Environments

The top-level configuration is the collection of values you specify at the top of your `wrangler.toml` file. These values will be inherited by all environments, unless otherwise defined in the environment.

The layout of a top-level configuration in a `wrangler.toml` file is displayed below:

```toml
---
your-worker.toml
---
name = "your-worker"
type = "javascript"
account_id = "your-account-id"

# This field specifies that the Worker
# will be deployed to a *.workers.dev domain
workers_dev = true

# -- OR --

# These fields specify that the Worker
# will deploy to a custom domain
zone_id = "your-zone-id"
routes = ["example.com/*"]
```

Environment configuration {{<prop-meta>}}(optional){{</prop-meta>}}: the configuration values you specify under an `[env.name]` in your `wrangler.toml` file.

Environments allow you to deploy the same project to multiple places under multiple names. These environments are utilized with the `--env` or `-e` flag on the [commands](/workers/wrangler-legacy/commands/) that are deploying live Workers:

- `build`
- `dev`
- `preview`
- `publish`
- `secret`

Some environment properties can be [_inherited_](#keys) from the top-level configuration, but if new values are configured in an environment, they will always override those at the top level.

An example of an `[env.name]` configuration looks like this:

```toml
---
filename: wrangler.toml
---
type = "javascript"

name = "your-worker"
account_id = "your-account-id"

[vars]
FOO = "default FOO value"
BAR = "default BAR value"

kv_namespaces = [
  { binding = "FOO", id = "1a...", preview_id = "1b..." }
]

[env.helloworld]
# Now adding configuration keys for the "helloworld" environment.
# These new values will override the top-level configuration.
name = "your-worker-helloworld"
account_id = "your-other-account-id"

[vars]
FOO = "env-helloworld FOO value"
BAR = "env-helloworld BAR value"

kv_namespaces = [
  # Redeclare kv namespace bindings for each environment
  # NOTE: In this case, passing new IDs because new `account_id` value.
  { binding = "FOO", id = "888...", preview_id = "999..." }
]
```

To deploy this example Worker to the `helloworld` environment, you would run `wrangler publish --env helloworld`.

---

## Keys

There are three types of keys in a `wrangler.toml` file:

- Top level only keys are required to be configured at the top level of your `wrangler.toml` file only; multiple environments on the same project must share this key's value.

- Inherited keys can be configured at the top level and/or environment. If the key is defined only at the top level, the environment will use the key's value from the top level. If the key is defined in the environment, the environment value will override the top-level value.

- Non-inherited keys must be defined for every environment individually.

{{<definitions>}}

- `name` {{<type>}}inherited{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of your Worker script. If inherited, your environment name will be appended to the top level.

- `type` {{<type>}}top level{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - Specifies how `wrangler build` will build your project. There are three options: `javascript`, `webpack`, and `rust`. `javascript` checks for a build command specified in the `[build]` section, `webpack` builds your project using webpack v4, and `rust` compiles the Rust in your project to WebAssembly.

{{<Aside type="note">}}

Cloudflare will continue to support `rust` and `webpack` project types, but recommends using the `javascript` project type and specifying a custom [`build`](#build) section.

{{</Aside>}}

- `account_id` {{<type>}}inherited{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one. It can also be specified through the `CF_ACCOUNT_ID` environment variable.

- `zone_id` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - This is the ID of the zone or domain you want to run your script on. It can also be specified through the `CF_ZONE_ID` environment variable. This key is optional if you are using only a `*.workers.dev` subdomain.

- `workers_dev` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - This is a boolean flag that specifies if your Worker will be deployed to your [`*.workers.dev`](https://workers.dev) subdomain. If omitted, it defaults to false.

- `route` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A route, specified by URL pattern, on your zone that you would like to run your Worker on. <br />`route = "http://example.com/*"`. A `route` OR `routes` key is only required if you are not using a [`*.workers.dev`](https://workers.dev) subdomain.

- `routes` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of routes you would like to use your Worker on. These follow exactly the same rules a `route`, but you can specify a list of them.<br />`routes = ["http://example.com/hello", "http://example.com/goodbye"]`. A `route` OR `routes` key is only required if you are not using a `*.workers.dev` subdomain.

- `webpack_config` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - This is the path to a custom webpack configuration file for your Worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. Refer to the [Wrangler webpack page](/workers/wrangler-legacy/webpack/) for more information.

- `vars` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - An object containing text variables that can be directly accessed in a Worker script.

- `kv_namespaces` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - These specify any [Workers KV](#kv_namespaces) Namespaces you want to access from inside your Worker.

- `site` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Determines the local folder to upload and serve from a Worker.

- `dev` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Arguments for `wrangler dev` that configure local server.

- `triggers` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Configures cron triggers for running a Worker on a schedule.

- `usage_model` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specifies the [Usage Model](/workers/platform/pricing/#usage-models) for your Worker. There are two options - [`bundled`](/workers/platform/limits/#bundled-usage-model) and [`unbound`](/workers/platform/limits/#unbound-usage-model). For newly created Workers, if the Usage Model is omitted it will be set to the [default Usage Model set on the account](https://dash.cloudflare.com/?account=workers/default-usage-model). For existing Workers, if the Usage Model is omitted, it will be set to the Usage Model configured in the dashboard for that Worker.

- `build` {{<type>}}top level{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Configures a custom build step to be run by Wrangler when building your Worker. Refer to the [custom builds documentation](#build) for more details.

{{</definitions>}}

### vars

The `vars` key defines a table of [environment variables](/workers/platform/environment-variables/) provided to your Worker script. All values are plaintext values.

Usage:

```toml
[vars]
FOO = "some value"
BAR = "some other string"
```

The table keys are available to your script as global variables, which will contain their associated values.

```js
// Worker code:
console.log(FOO);
//=> "some value"

console.log(BAR);
//=> "some other string"
```

Alternatively, you can define `vars` using an inline table format. This style should not include any new lines to be considered a valid TOML configuration:

```toml
vars = { FOO = "some value", BAR = "some other string" }
```

{{<Aside type="note">}}

Secrets should be handled using the [`wrangler secret`](/workers/wrangler-legacy/commands/#secret) command.

{{</Aside>}}

### kv_namespaces

`kv_namespaces` defines a list of KV namespace bindings for your Worker.

Usage:

```toml
kv_namespaces = [
  { binding = "FOO", id = "0f2ac74b498b48028cb68387c421e279", preview_id = "6a1ddb03f3ec250963f0a1e46820076f" },
  { binding = "BAR", id = "068c101e168d03c65bddf4ba75150fb0", preview_id = "fb69528dbc7336525313f2e8c3b17db0" }
]
```

Alternatively, you can define `kv namespaces` like so:

```toml
[[kv_namespaces]]
binding = "FOO"
preview_id = "abc456"
id = "abc123"

[[kv_namespaces]]
binding = "BAR"
preview_id = "xyz456"
id = "xyz123"
```

Much like environment variables and secrets, the `binding` names are available to your Worker as global variables.

```js
// Worker script:

let value = await FOO.get("keyname");
//=> gets the value for "keyname" from
//=> the FOO variable, which points to
//=> the "0f2ac...e279" KV namespace
```

{{<definitions>}}

- `binding` {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the global variable your code will reference. It will be provided as a [KV runtime instance](/workers/runtime-apis/kv/).

- `id` {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the KV namespace that your `binding` should represent. Required for `wrangler publish`.

- `preview_id` {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the KV namespace that your `binding` should represent during `wrangler dev` or `wrangler preview`. Required for `wrangler dev` and `wrangler preview`.

{{</definitions>}}

{{<Aside type="note">}}

Creating your KV namespaces can be handled using Wrangler’s [KV Commands](/workers/wrangler-legacy/commands/#kv).

You can also define your `kv_namespaces` using an [alternative TOML syntax](https://github.com/toml-lang/toml/blob/master/toml.md#user-content-table).

{{</Aside>}}

### site

A [Workers Site](/workers/platform/sites/) generated with [`wrangler generate --site`](/workers/wrangler-legacy/commands/#generate) or [`wrangler init --site`](/workers/wrangler-legacy/commands/#init).

Usage:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
```

{{<definitions>}}

- `bucket` {{<prop-meta>}}required{{</prop-meta>}}

  - The directory containing your static assets. It must be a path relative to your `wrangler.toml` file. Example: `bucket = "./public"`

- `entry-point` {{<prop-meta>}}optional{{</prop-meta>}}

  - The location of your Worker script. The default location is `workers-site`. Example: `entry-point = "./workers-site"`

- `include` {{<prop-meta>}}optional{{</prop-meta>}}

  - An exclusive list of `.gitignore`-style patterns that match file or directory names from your `bucket` location. Only matched items will be uploaded. Example: `include = ["upload_dir"]`

- `exclude` {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of `.gitignore`-style patterns that match files or directories in your `bucket` that should be excluded from uploads. Example: `exclude = ["ignore_dir"]`

{{</definitions>}}

You can also define your `site` using an [alternative TOML syntax](https://github.com/toml-lang/toml/blob/master/toml.md#user-content-inline-table).

#### Storage Limits

For exceptionally large pages, Workers Sites may not be ideal. There is a 25 MiB limit per page or file. Additionally, Wrangler will create an asset manifest for your files that will count towards your script’s size limit. If you have too many files, you may not be able to use Workers Sites.

#### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, add an `include` field to your
`[site]` section of your `wrangler.toml` file:

```toml
[site]
bucket = "./public"
entry-point = "workers-site"
include = ["included_dir"] # must be an array.
```

Wrangler will only upload files or directories matching the patterns in the `include` array.

#### Excluding files/directories

If you want to exclude files or directories in your `bucket`, add an `exclude` field to your `[site]` section of your `wrangler.toml` file:

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

Refer to the [gitignore documentation](https://git-scm.com/docs/gitignore) to learn more about the standard matching patterns.

#### Customizing your Sites Build

Workers Sites projects use webpack by default. Though you can [bring your own webpack configuration](/workers/wrangler-legacy/webpack/#using-with-workers-sites), be aware of your `entry` and `context` settings.

You can also use the `[build]` section with Workers Sites, as long as your build step will resolve dependencies in `node_modules`. Refer to the [custom builds](#build) section for more information.

### triggers

A set of cron triggers used to call a Worker on a schedule.

Usage:

```toml
[triggers]
crons = ["0 0 * JAN-JUN FRI", "0 0 LW JUL-DEC *"]
```

{{<definitions>}}

- `crons` {{<prop-meta>}}optional{{</prop-meta>}}
  - A set of [cron expressions](https://crontab.guru/), where each expression is a separate schedule to run the Worker on.

{{</definitions>}}

### dev

Arguments for `wrangler dev` can be configured here so you do not have to repeatedly pass them.

Usage:

```toml
[dev]
port = 9000
local_protocol = "https"
```

{{<definitions>}}

- `ip` {{<prop-meta>}}optional{{</prop-meta>}}

  - IP address for the local `wrangler dev` server to listen on, defaults to `127.0.0.1`.

- `port` {{<prop-meta>}}optional{{</prop-meta>}}

  - Port for local `wrangler dev` server to listen on, defaults to `8787`.

- `local_protocol` {{<prop-meta>}}optional{{</prop-meta>}}

  - Protocol that local `wrangler dev` server listen to requests on, defaults to `http`.

- `upstream_protocol` {{<prop-meta>}}optional{{</prop-meta>}}

  - Protocol that `wrangler dev` forwards requests on, defaults to `https`.

{{</definitions>}}

### build

A custom build command for your project. There are two configurations based on the format of your Worker: `service-worker` and `modules` (beta).

#### Service Workers

This section is for customizing Workers with the `service-worker` format. These Workers use `addEventListener` and look like the following:

```js
addEventListener("fetch", (event) => {
  event.respondWith(new Response("I'm a service Worker!"));
});
```

Usage:

```toml
[build]
command = "npm install && npm run build"

[build.upload]
format = "service-worker"
```

##### `[build]`

{{<definitions>}}

- `command` {{<prop-meta>}}optional{{</prop-meta>}}

  - The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.

- `cwd` {{<prop-meta>}}optional{{</prop-meta>}}

  - The working directory for commands, defaults to the project root directory.

- `watch_dir` {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory to watch for changes while using `wrangler dev`, defaults to the `src` relative to the project root directory.

{{</definitions>}}

##### `[build.upload]`

{{<definitions>}}

- `format` {{<prop-meta>}}required{{</prop-meta>}}

  - The format of the Worker script, must be `"service-worker"`.

{{</definitions>}}

{{<Aside type="note">}}

Ensure the `main` field in your `package.json` references the Worker script you want to publish.

{{</Aside>}}

#### Modules

Workers now supports the ES Modules syntax. Modules support in Cloudflare Workers is currently in beta. This format allows you to export a collection of files and/or modules, unlike the Service Worker format which requires a single file to be uploaded.

Module Workers `export` their event handlers instead of using `addEventListener` calls.

Modules receive all bindings (KV Namespaces, Environment Variables, and Secrets) as arguments to the exported handlers. With the Service Worker format, these bindings are available as global variables.

{{<Aside type="note">}}

Refer to the [`FetchEvent` documentation](/workers/runtime-apis/fetch-event) to learn more about the differences between the Service Worker and Module worker formats.

{{</Aside>}}

An uploaded module may `import` other uploaded ES Modules. If using the CommonJS format, you may `require` other uploaded CommonJS modules.

```js
import html from "./index.html";

export default {
  // * request is the same as `event.request` from the service worker format
  // * waitUntil() and passThroughOnException() are accessible from `ctx` instead of `event` from the service worker format
  // * env is where bindings like KV namespaces, Durable Object namespaces, Config variables, and Secrets
  // are exposed, instead of them being placed in global scope.
  async fetch(request, env, ctx) {
    const headers = { "Content-Type": "text/html;charset=UTF-8" };
    return new Response(html, { headers });
  },
};
```

To create a Workers project using Wrangler and Modules, add a `[build]` section:

```toml
[build]
command = "npm install && npm run build"

[build.upload]
format = "modules"
main = "./worker.mjs"
```

##### `[build]`

{{<definitions>}}

- `command` {{<prop-meta>}}optional{{</prop-meta>}}

  - The command used to build your Worker. On Linux and macOS system, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.

- `cwd` {{<prop-meta>}}optional{{</prop-meta>}}

  - The working directory for commands, defaults to the project root directory.

- `watch_dir` {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory to watch for changes while using `wrangler dev`, defaults to the `src` relative to the project root directory.

{{</definitions>}}

##### `[build.upload]`

{{<definitions>}}

- `format` {{<prop-meta>}}required{{</prop-meta>}}

  - The format of the Workers script, must be `"modules"`.

- `dir` {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory you wish to upload your modules from, defaults to the `dist` relative to the project root directory.

- `main` {{<prop-meta>}}required{{</prop-meta>}}

  - The relative path of the main module from `dir`, including the `./` prefix. The main module must be an ES module. For projects with a build script, this usually refers to the output of your JavaScript bundler.

{{<Aside type="note">}}

If your project is written using CommonJS modules, you will need to re-export your handlers and Durable Object classes using an ES module shim. Refer to the [modules-webpack-commonjs](https://github.com/cloudflare/modules-webpack-commonjs) template as an example.

{{</Aside>}}

- `rules` {{<prop-meta>}}optional{{</prop-meta>}}

  - An ordered list of rules that define which modules to import, and what type to import them as.
    You will need to specify rules to use Text, Data, and CompiledWasm modules, or when you wish to
    have a `.js` file be treated as an `ESModule` instead of `CommonJS`.

Defaults:

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

  - `type` {{<prop-meta>}}required{{</prop-meta>}}

    - The module type, see the table below for acceptable options:
      <div class="DocsMarkdown--table-wrap">
        <div class="DocsMarkdown--table-wrap-inner">
          <table>
            <thead>
              <tr>
                <th>
                  <code>type</code>
                </th>
                <th>JavaScript type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ESModule</td>
                <td>-</td>
              </tr>
              <tr>
                <td>CommonJS</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <code>String</code>
                </td>
              </tr>
              <tr>
                <td>Data</td>
                <td>
                  <code>ArrayBuffer</code>
                </td>
              </tr>
              <tr>
                <td>CompiledWasm</td>
                <td>
                  <code>WebAssembly.Module</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

  - `globs` {{<prop-meta>}}required{{</prop-meta>}}

    - Unix-style [glob rules](https://docs.rs/globset/0.4.6/globset/#syntax) that are used to determine the module type to use for a given file in `dir`. Globs are matched against the module's relative path from `build.upload.dir` without the `./` prefix. Rules are evaluated in order, starting at the top.

  - `fallthrough` {{<prop-meta>}}optional{{</prop-meta>}}

    - This option allows further rules for this module type to be considered if set to true. If not specified or set to false, further rules for this module type will be ignored.

{{</definitions>}}

---

## Example

To illustrate how these levels are applied, here is a `wrangler.toml` file using multiple environments:

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
