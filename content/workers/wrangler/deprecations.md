---
pcx-content-type: how-to
title: Deprecations
weight: 11
---

# [WIP] Deprecations

This document describes the difference between `wrangler` 1.x and v2, specifically deprecations and breaking changes.

## Configuration

`wrangler` v2 introduces a few new fields for configuration, while also deprecating a few redundant fields.

### New fields

- **`main`**: _string_, optional

  The `main` field is used to specify an entry point to the Worker. It may be in the established service worker format[`], or the newer, preferred modules format[`]. An entry point is now explicitly required, and can be configured either via the `main` field, or passed directly as a command line argument; e.g. `wrangler dev index.js`. This field replaces the legacy `build.upload.main` field (which only applied to modules format Workers). Read more at (ref:)[]

- **`rules`**: _array_, optional

  The `rules` field is an array of mappings between module types and file patterns. It instructs `wrangler` to interpret specific files differently than JavaScript. For example, this is useful for reading text-like content as text files, or compiled WASM as ready to instantiate and execute. These rules can apply to Workers of both the established service worker format, and the newer modules format. This field replaces the legacy `build.upload.rules` field (which only applied to modules format Workers). Read more at (ref:)[]

- **`legacy_env`**: _boolean_, optional. default: `true`

  The `legacy_env` field toggles how environments are handled by `wrangler`.

  - When `legacy_env` is `true`, it uses the legacy-style environments, where each environment is treated as a separate Worker in the dashboard, and environment names are appended to the `name` when published.
  - When `legacy_env` is `false`, it uses the newer service environments, where scripts for a given Worker are grouped under the same same script name in the Cloudflare Workers dashboard, and environments are subdomains for a given published script (when `workers_dev = true`).
    Read more at (ref:)[]

- **`services`**: TODO

- **`node-compat`**: TODO

- **`public`**: TODO

### Non-mandatory fields

A few configuration fields which were previously required, are now non-mandatory in particular situations; they can either be inferred, or added as an optimisation. (Indeed, _no_ fields are mandatory anymore when starting, and you can gradually add configuration as the need arises.)

- **`name`**: _string_

  The `name` configuration field is now not mandatory for `wrangler dev`, or any of the `wrangler kv:*` commands. Further, it can also be passed as a command line argument as `--name <name>`. It is still required for `wrangler publish`.

- **`account_id`**: _string_

  The `account_id` field is not mandatory for any of the commands. Any relevant commands will check if you're logged in, and if not, will prompt you to log in. Once logged in it will use your account ID, and will not prompt you again until your login session expires. If you multiple account IDs, you will be presented with a list of accounts to choose from.

  You can still configure `account_id` in your `wrangler.toml` file, or as an environment variable `CLOUDFLARE_ACCOUNT_ID`; this will make startup faster, and bypass the list of choices if you have multiple IDs. By also setting the `CLOUDFLARE_API_TOKEN` environment variable, this configuration is useful in scenarios like CI/CD where you won't be able to interactively login.

- **`workers_dev`** _boolean_, default: `true` when no routes are present

  The `workers_dev` field is used to indicate that the Worker should be published to `workers.dev`. For example, for a script named "my-worker" and a previously configured workers.dev subdomain "username", the Worker will get published to https://my-worker.username.workers.dev.com. This field is not mandatory, and defaults to `true` when `route` or `routes` are not configured. When routes are present, it defaults to `false`. If you want to neither publish it to a `workers.dev` subdomain nor any routes, you can set workers_dev to `false`. This useful when you're publishing a Worker as a standalone service that can only be accessed from another Worker with (`services`)[TODO:link/to/services/docs] bindings.

### Deprecated fields (non-breaking)

A few configuration fields are deprecated, but their presence is not a breaking change yet. It is recommended to read the warning messages and follow the instructions to migrate to the new configuration. They will be removed and stop working in a future version.

- **`zone_id`**: _string_, deprecated

  The `zone_id` field is deprecated, and will be removed in a future release. It is now inferred from `route`/`routes`, and optionally from `dev.host` when using `wrangler dev`. This also makes it simpler to deploy a single Worker to multiple domains.

- **`build.upload`**: _object_, deprecated

  The `build.upload` field is deprecated, and will be removed in a future release. It's usage results in a warning with suggestions on rewriting the configuration file to remove the warnings.

  - `build.upload.main`/`build.upload.dir` are replaced by the `main` fields, and is applicable to both service worker format and modules format Workers.
  - `build.upload.rules` is replaced by the `rules` field, and is applicable to both service worker format and modules format Workers.
  - `build.upload.format` is no longer specified, and is automatically inferred by `wrangler`.

### Deprecated fields (breaking)

A few configuration fields are deprecated and will not work as expected anymore. It is recommended to read the error messages and follow the instructions to migrate to the new configuration.

- **`site.entry-point`**: `string`, deprecated

  The `site.entry-point` configuration was used to specify an entry point for Workers with a `[site]` configuration. This has been replaced by the top level `main` field.

- **`type`**: `rust` | `javascript` | `webpack`, deprecated

  The `type` configuration was used to specify the type of Worker; it has since been made redundant and is now inferred from usage. If you were using `type = "webpack"` (and the optional `webpack_config` field), you should read the [TODO: webpack migration guide](#todo/webpack-migration.md) to modify your project and use a custom build instead.

## Deprecated commands

The following commands are deprecated in `wrangler` v2.

### build:

`wrangler` will implicitly build the script when necessary.

### config:

use `wrangler login` / `wrangler logout`

### preview:

use `wrangler dev`

### subdomain:

you can create workers.dev subdomain on your Workers dashboard

### generate:

(TODO: a guide on using degit)

### route:

configure routes in `wrangler.toml`

## Other deprecated behaviour

- `wrangler` will no longer use `index.js` in the directory where `wrangler dev` is called as the entry point to a worker. Use the `main` configuration field, or explicitly pass it as a command line argument. Example: `wrangler dev index.js`.

- `wrangler` will no longer assume that bare specifiers are file names if they're not represented as a path. For example, in a folder like so:

  ```
  project
  ├── index.js
  └── some-dependency.js
  ```

  where the content of `index.js` is:

  ```jsx
  import SomeDependency from "some-dependency.js";

  addEventListener("fetch", (event) => {
    // ...
  });
  ```

  `wrangler` 1.x would resolve `import SomeDependency from "some-dependency.js";` to the file `some-dependency.js`. This will also work in wrangler 2.0, but will also log a deprecation warning; in the future, this will break with an error. Instead, you should rewrite the import to specifiy that it's a relative path, like so:

  ```diff
  - import SomeDependency from "some-dependency.js";
  + import SomeDependency from "./some-dependency.js";
  ```
