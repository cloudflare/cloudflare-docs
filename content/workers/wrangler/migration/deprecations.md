---
pcx_content_type: how-to
title: Deprecations
weight: 2
---

# Deprecations

This document describes the difference between Wrangler 1 and 2, specifically deprecations and breaking changes.

Wrangler 2 introduces some new fields for configuration, while also deprecating some redundant fields.

## Common deprecations

Here are common fields that are no longer required.

- `type` is no longer required. Wrangler will infer the correct project type automatically.
- `zone_id` is no longer required. It can be deduced from the routes directly.
- `build.upload.format` is no longer used. The format is now inferred automatically from the code.
- `build.upload.main` and `build.upload.dir` are no longer required. Use the top level `main` field, which now serves as the entry-point for the Worker.
- `site.entry-point` is no longer required. The entry point should be specified through the `main` field.
- `webpack_config` and `webpack` properties are no longer supported. Refer to [Ejecting Webpack](/workers/wrangler/migration/eject-webpack/).
  Here are the Wrangler 1 commands that are no longer supported:
- `wrangler preview` - Use the `wrangler dev` command, for running your worker in your local environment.
- `wrangler generate` - If you want to use a starter template, clone its GitHub repository and manually initialize it.
- `wrangler route` - Routes are defined in the `wrangler.toml` configuration file.
- `wrangler report` - If you find a bug please report it at [Wrangler issues](https://github.com/cloudflare/wrangler2/issues/new/choose).
- `wrangler build` - If you wish to access the output from bundling your Worker use `wrangler publish --outdir=path/to/output`.

### New fields

These are new fields that can be added to your `wrangler.toml`.

- **`main`**: `string`, optional

  The `main` field is used to specify an entry point to the Worker. It may be in the established service worker format, or the newer, preferred modules format. An entry point is now explicitly required, and can be configured either via the `main` field, or passed directly as a command line, for example, `wrangler dev index.js`. This field replaces the legacy `build.upload.main` field (which only applied to modules format Workers).

- **`rules`**: `array`, optional

  The `rules` field is an array of mappings between module types and file patterns. It instructs Wrangler to interpret specific files differently than JavaScript. For example, this is useful for reading text-like content as text files, or compiled WASM as ready to instantiate and execute. These rules can apply to Workers of both the established service worker format, and the newer modules format. This field replaces the legacy `build.upload.rules` field (which only applied to modules format Workers).

<!-- - **`legacy_env`**: _boolean_, optional. default: `true`

  The `legacy_env` field toggles how environments are handled by `wrangler`.

  - When `legacy_env` is `true`, it uses the legacy-style environments, where each environment is treated as a separate Worker in the dashboard, and environment names are appended to the `name` when published.
  - When `legacy_env` is `false`, it uses the newer service environments, where scripts for a given Worker are grouped under the same script name in the Cloudflare Workers dashboard, and environments are subdomains for a given published script (when `workers_dev = true`).
    Read more at (ref:)[] -->

<!-- - **`services`**: TODO

- **`node-compat`**: TODO

- **`public`**: TODO -->

### Non-mandatory fields

A few configuration fields which were previously required, are now optional in particular situations. They can either be inferred, or added as an optimization. No fields are required anymore when starting with Wrangler 2, and you can gradually add configuration as the need arises.

- **`name`**: `string`

  The `name` configuration field is now not required for `wrangler dev`, or any of the `wrangler kv:*` commands. Further, it can also be passed as a command line argument as `--name <name>`. It is still required for `wrangler publish`.

- **`account_id`**: `string`

  The `account_id` field is not required for any of the commands. Any relevant commands will check if you are logged in, and if not, will prompt you to log in. Once logged in, it will use your account ID and will not prompt you again until your login session expires. If you have multiple account IDs, you will be presented with a list of accounts to choose from.

  You can still configure `account_id` in your `wrangler.toml` file, or as an environment variable `CLOUDFLARE_ACCOUNT_ID`; this will make startup faster, and bypass the list of choices if you have multiple IDs. The `CLOUDFLARE_API_TOKEN` environment variable is also useful for situations where it is not possible to login interactively - refer to [Running in CI/CD](/workers/wrangler/ci-cd).

- **`workers_dev`** `boolean`, default: `true` when no routes are present

  The `workers_dev` field is used to indicate that the Worker should be published to a `*.workers.dev` subdomain. For example, for a Worker named `my-worker` and a previously configured `*.workers.dev` subdomain `username`, the Worker will get published to `my-worker.username.workers.dev.com`. This field is not mandatory, and defaults to `true` when `route` or `routes` are not configured. When routes are present, it defaults to `false`. If you want to neither publish it to a `*.workers.dev` subdomain nor any routes, set `workers_dev` to `false`. This useful when you are publishing a Worker as a standalone service that can only be accessed from another Worker with (`services`).

### Deprecated fields (non-breaking)

A few configuration fields are deprecated, but their presence is not a breaking change yet. It is recommended to read the warning messages and follow the instructions to migrate to the new configuration. They will be removed and stop working in a future version.

- **`zone_id`**: `string`, deprecated

  The `zone_id` field is deprecated and will be removed in a future release. It is now inferred from `route`/`routes`, and optionally from `dev.host` when using `wrangler dev`. This also makes it simpler to deploy a single Worker to multiple domains.

- **`build.upload`**: `object`, deprecated

  The `build.upload` field is deprecated and will be removed in a future release. Its usage results in a warning with suggestions on rewriting the configuration file to remove the warnings.

  - `build.upload.main`/`build.upload.dir` are replaced by the `main` fields and are applicable to both service worker format and modules format Workers.
  - `build.upload.rules` is replaced by the `rules` field and is applicable to both service worker format and modules format Workers.
  - `build.upload.format` is no longer specified and is automatically inferred by `wrangler`.

### Deprecated fields (breaking)

A few configuration fields are deprecated and will not work as expected anymore. It is recommended to read the error messages and follow the instructions to migrate to the new configuration.

- **`site.entry-point`**: `string`, deprecated

  The `site.entry-point` configuration was used to specify an entry point for Workers with a `[site]` configuration. This has been replaced by the top-level `main` field.

- **`type`**: `rust` | `javascript` | `webpack`, deprecated

  The `type` configuration was used to specify the type of Worker. It has since been made redundant and is now inferred from usage. If you were using `type = "webpack"` (and the optional `webpack_config` field), you should read the [webpack migration guide](/workers/wrangler/migration/eject-webpack/) to modify your project and use a custom build instead.

## Deprecated commands

The following commands are deprecated in Wrangler as of Wrangler 2.

### `build`

The `wrangler build` command is no longer available for building the Worker.

The equivalent functionality can be achieved by `wrangler publish --dry-run --outdir=path/to/build`.

### `config`

The `wrangler config` command is no longer available for authenticating via an API token.

Use `wrangler login` / `wrangler logout` to manage OAuth authentication, or provide an API token via the `CLOUDFLARE_API_TOKEN` environment variable.

### `preview`

The `wrangler preview` command is no longer available for creating a temporary preview instance of the Worker.

Try using `wrangler dev` to try out a worker during development.

### subdomain

The `wrangler subdomain` command is no longer available for creating a `workers.dev` subdomain.

Create the `workers.dev` subdomain on your Workers dashboard.

### generate

The `wrangler generate` command is no longer available to initialize a Worker from a template repository.

Initialize a basic Worker project via `wrangler init`, which provides a good starting point for most projects.

Alternatively, try cloning the template repository and initializing it manually.

### route

The `wrangler route` command is no longer available to configure a route for a Worker.

Routes are specified in the `wrangler.toml` configuration file.

## Other deprecated behaviour

- Cloudflare dashboard-defined routes will not be added alongside Wrangler-defined routes. Wrangler-defined routes are the `route` or `routes` key in your `wrangler.toml`. If both are defined, only routes defined in `wrangler.toml` will be valid. To manage routes via the Cloudflare dashboard only, remove any `route` and `routes` keys from and add `workers_dev = false` to your `wrangler.toml` file.

- Wrangler will no longer use `index.js` in the directory where `wrangler dev` is called as the entry point to a Worker. Use the `main` configuration field, or explicitly pass it as a command line argument, for example: `wrangler dev index.js`.

- Wrangler will no longer assume that bare specifiers are file names if they are not represented as a path. For example, in a folder like so:

  ```
  project
  ├── index.js
  └── some-dependency.js
  ```

  where the content of `index.js` is:

  ```js
  import SomeDependency from "some-dependency.js";

  addEventListener("fetch", (event) => {
    // ...
  });
  ```

  Wrangler 1 would resolve `import SomeDependency from "some-dependency.js";` to the file `some-dependency.js`. This will also work in Wrangler 2, but will also log a deprecation warning. In the future, this will break with an error. Instead, you should rewrite the import to specifiy that it is a relative path, like so:

  ```diff
  - import SomeDependency from "some-dependency.js";
  + import SomeDependency from "./some-dependency.js";
  ```
