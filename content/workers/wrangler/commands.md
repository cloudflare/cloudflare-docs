---
pcx_content_type: how-to
title: Commands
weight: 2
---

## Wrangler commands

Wrangler offers a number of commands to manage your Cloudflare Workers.

- [`init`](#init) - Create a skeleton Wrangler project, including the `wrangler.toml` file.
- [`generate`](#generate) - Create a Wrangler project using an existing [Workers template](https://github.com/cloudflare/worker-template).
- [`dev`](#dev) - Start a local server for developing your Worker.
- [`publish`](#publish) - Publish your Worker to Cloudflare.
- [`kv:namespace`](#kvnamespace) - Manage Workers KV namespaces.
- [`kv:key`](#kvkey) - Manage key-value pairs within a Workers KV namespace.
- [`kv:bulk`](#kvbulk) - Manage multiple key-value pairs within a Workers KV namespace in batches.
- [`r2 bucket`](#r2-bucket) - Manage Workers R2 buckets.
- [`secret`](#secret) - Manage the secret variables for a Worker.
- [`secret:bulk`](#secretbulk) - Manage multiple secret variables for a Worker.
- [`tail`](#tail) - Start a session to livestream logs from a deployed Worker.
- [`pages`](#pages) - Configure Cloudflare Pages.
- [`login`](#login) - Authorize Wrangler with your Cloudflare account using OAuth.
- [`logout`](#logout) - Remove Wrangler’s authorization for accessing your account.
- [`whoami`](#whoami) - Retrieve your user information and test your authentication configuration.

{{<Aside type="note">}}

The following global flags work on every command.

Flags:

{{<definitions>}}

- `--config` {{<type>}}string{{</type>}}
  - Path to `.toml` configuration file.
- `--help` {{<type>}}boolean{{</type>}}
  - Show help.
- `--version` {{<type>}}boolean{{</type>}}
  - Show version number.

{{</definitions>}}

{{</Aside>}}

---

## init

Create a skeleton Wrangler project, including the `wrangler.toml` file.

```sh
$ wrangler init [NAME] [-y / --yes] [--from-dash]
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} {{<prop-meta>}}(default: name of working directory){{</prop-meta>}}
  - The name of the Workers project. This is both the directory name and `name` property in the generated `wrangler.toml` [configuration](/workers/wrangler/configuration/) file.
- `--yes` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Answer yes to any prompts for new projects.
- `--from-dash` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Fetch a Worker initialized from the dashboard. This is done by passing the flag and the Worker name. `wrangler init --from-dash <WORKER_NAME>`
  - The `--from-dash` command will not automatically sync changes made to the dashboard after the command is used. Therefore, it is recommended that you continue using the CLI.
    {{</definitions>}}

---

## generate

Create a Wrangler project using an existing [Workers template](https://github.com/cloudflare/worker-template).

```sh
$ wrangler generate [name] [template]
```

{{<definitions>}}

- `name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}} {{<prop-meta>}}(default: name of working directory){{</prop-meta>}}
  - The name of the Workers project. This is both the directory name and `name` property in the generated `wrangler.toml` [configuration](/workers/wrangler/configuration/) file.
- `template` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The URL of a GitHub template, with a default [worker-template](https://github.com/cloudflare/worker-template). Browse a list of available templates on [cloudflare/templates](https://github.com/cloudflare/templates) repository.

{{</definitions>}}

---

## dev

Start a local server for developing your Worker.

```sh
$ wrangler dev [SCRIPT] [OPTIONS]
```

{{<Aside type="note">}}

None of the options for this command are required. Many of these options can be set in your `wrangler.toml` file. Refer to the [`wrangler.toml` configuration](/workers/wrangler/configuration) documentation for more information.

{{</Aside>}}

{{<definitions>}}

- `SCRIPT` {{<type>}}string{{</type>}}
  - The path to an entry point for your Worker.
- `--name` {{<type>}}string{{</type>}}
  - Name of the Worker.
- `--no-bundle` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}}
  - Skip Wrangler's build steps and show a preview of the script without modification. Particularly useful when using custom builds.
- `--env` {{<type>}}string{{</type>}}
  - Perform on a specific environment.
- `--compatibility-date` {{<type>}}string{{</type>}}
  - A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used.
- `--compatibility-flags`, `--compatibility-flag` {{<type>}}boolean[]{{</type>}}
  - Flags to use for compatibility checks.
- `--latest` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}}
  - Use the latest version of the Workers runtime.
- `--ip` {{<type>}}string{{</type>}}
  - IP address to listen on, defaults to `localhost`.
- `--port` {{<type>}}number{{</type>}}
  - Port to listen on.
- `--inspector-port` {{<type>}}number{{</type>}}
  - Port for devtools to connect to.
- `--routes`, `--route` {{<type>}}string[]{{</type>}}
  - Routes to upload. 
  - For example: `--route example.com/*`
- `--host` {{<type>}}string{{</type>}}
  - Host to forward requests to, defaults to the zone of project.
- `--local-protocol` {{<type>}}"http"|"https"{{</type>}} {{<prop-meta>}}(default: http){{</prop-meta>}}
  - Protocol to listen to requests on.
- `--local-upstream` {{<type>}}string{{</type>}}
  - Host to act as origin in local mode, defaults to `dev.host` or route.
- `--assets` {{<type>}}string{{</type>}}
  - Root folder of static assets to be served. Unlike `--site`, `--assets` does not require a Worker script to serve your assets.
  - Use in combination with `--name` and `--latest` for basic static file hosting. For example: `wrangler dev --name personal_blog --assets dist/ --latest`.
- `--site` {{<type>}}string{{</type>}}
  - Root folder of static assets for Workers Sites.
- `--site-include` {{<type>}}string[]{{</type>}}
  - Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded.
- `--site-exclude` {{<type>}}string[]{{</type>}}
  - Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded.
- `--upstream-protocol` {{<type>}}"http"|"https"{{</type>}} {{<prop-meta>}}(default: https){{</prop-meta>}}
  - Protocol to forward requests to host on.
- `--var` {{<type>}}key:value[]{{</type>}}
  - Array of `key:value` pairs to inject as variables into your code. The value will always be passed as a string to your Worker.
  - For example, `--var git_hash:$(git rev-parse HEAD) test:123` makes the `git_hash` and `test` variables available in your Worker's `env`.
  - This flag is an alternative to defining [`vars`](/workers/wrangler/configuration/#non-inheritable-keys) in your `wrangler.toml`. If defined in both places, this flag's values will be used.
- `--define` {{<type>}}key:value[]{{</type>}}
  - Array of `key:value` pairs to replace global identifiers in your code. 
  - For example, `--define GIT_HASH:$(git rev-parse HEAD)` will replace all uses of `GIT_HASH` with the actual value at build time.
  - This flag is an alternative to defining [`define`](/workers/wrangler/configuration/#non-inheritable-keys) in your `wrangler.toml`. If defined in both places, this flag's values will be used.
- `--tsconfig` {{<type>}}string{{</type>}}
  - Path to a custom `tsconfig.json` file.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}}

  - Run the preview of the Worker directly on your local machine.

    {{<Aside type="warning">}}

This runs an ephemeral local version of your Worker, and will not be able to access data stored on Cloudflare's Edge (for instance, this includes your data stored on KV). If you'd like to persist data locally, the experimental option `--experimental-enable-local-persistence` will store data in the `wrangler-local-state` subdirectory.

{{</Aside>}}

- `--experimental-local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}}
  - Run the preview of the Worker directly on your local machine using the [open source Cloudflare Workers runtime](https://github.com/cloudflare/workerd).
- `--minify` {{<type>}}boolean{{</type>}}
  - Minify the script.
- `--node-compat` {{<type>}}boolean{{</type>}}
  - Enable node.js compatibility.
- `--persist` {{<type>}}boolean{{</type>}}
  - Enable persistence for local mode, using default path: `.wrangler/state`.
- `--persist-to` {{<type>}}string{{</type>}}
  - Specify directory to use for local persistence. Setting this flag implicitly enables `--persist`.
- `--test-scheduled` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}}
  - Exposes a `/__scheduled` fetch route which will trigger a scheduled event (cron trigger) for testing during development. To simulate different cron patterns, a `cron` query parameter can be passed in: `/__scheduled?cron=*+*+*+*+*`.
- `--log-level` {{<type>}}"debug"|"info"|"log"|"warn"|"error"|"none"{{</type>}} {{<prop-meta>}}(default: log){{</prop-meta>}}
  - Specify Wrangler's logging level.

{{</definitions>}}

The `wrangler dev` command that establishes a connection between `localhost` and a Cloudflare server that hosts your Worker in development. This allows full access to Workers KV and Durable Objects. `wrangler dev` is a way to easily test your Worker while developing.

```sh

~/my-worker $ wrangler dev
⬣ Listening at http://localhost:8787
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ [b] open a browser, [d] open Devtools, [l] turn on local mode, [c] clear console, [x] to exit                        │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

With `wrangler dev` running, you can send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see `console.log` messages and exceptions appearing in your terminal.

---

## publish

Publish your Worker to Cloudflare.

```sh
$ wrangler publish [SCRIPT] [OPTIONS]
```

{{<Aside type="note">}}

None of the options for this command are required. Also, many can be set in your `wrangler.toml` file. Refer to the [`wrangler.toml` configuration](/workers/wrangler/configuration/) documentation for more information.

{{</Aside>}}

{{<definitions>}}

- `SCRIPT` {{<type>}}string{{</type>}}
  - The path to an entry point for your Worker.
- `--name` {{<type>}}string{{</type>}}
  - Name of the Worker.
- `--no-bundle` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}}
  - Skip Wrangler's build steps and directly publish script without modification. Particularly useful when using custom builds.
- `--env` {{<type>}}string{{</type>}}
  - Perform on a specific environment.
- `--outdir` {{<type>}}string{{</type>}}
  - Path to directory where Wrangler will write the bundled Worker files.
- `--compatibility-date` {{<type>}}string{{</type>}}
  - A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used.
- `--compatibility-flags`, `--compatibility-flag` {{<type>}}boolean[]{{</type>}}
  - Flags to use for compatibility checks.
- `--latest` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}}
  - Use the latest version of the Workers runtime.
- `--assets` {{<type>}}string{{</type>}}
  - Root folder of static assets to be served. Unlike `--site`, `--assets` does not require a Worker script to serve your assets.
  - Use in combination with `--name` and `--latest` for basic static file hosting. For example: `wrangler publish --name personal_blog --assets dist/ --latest`.
- `--site` {{<type>}}string{{</type>}}
  - Root folder of static assets for Workers Sites.
- `--site-include` {{<type>}}string[]{{</type>}}
  - Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded.
- `--site-exclude` {{<type>}}string[]{{</type>}}
  - Array of `.gitignore`-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded.
- `--var` {{<type>}}key:value[]{{</type>}}
  - Array of `key:value` pairs to inject as variables into your code. The value will always be passed as a string to your Worker.
  - For example, `--var git_hash:$(git rev-parse HEAD) test:123` makes the `git_hash` and `test` variables available in your Worker's `env`.
  - This flag is an alternative to defining [`vars`](/workers/wrangler/configuration/#non-inheritable-keys) in your `wrangler.toml`. If defined in both places, this flag's values will be used.
- `--define` {{<type>}}key:value[]{{</type>}}
  - Array of `key:value` pairs to replace global identifiers in your code. 
  - For example, `--define GIT_HASH:$(git rev-parse HEAD)` will replace all uses of `GIT_HASH` with the actual value at build time.
  - This flag is an alternative to defining [`define`](/workers/wrangler/configuration/#non-inheritable-keys) in your `wrangler.toml`. If defined in both places, this flag's values will be used.
- `--triggers`, `--schedule`, `--schedules` {{<type>}}string[]{{</type>}}
  - Cron schedules to attach to the published Worker. Refer to [cron trigger examples](/workers/platform/cron-triggers/#examples).
- `--routes`, `--route` {{<type>}}string[]{{</type>}}
  - Routes where this Worker will be published. 
  - For example: `--route example.com/*`
- `--tsconfig` {{<type>}}string{{</type>}}
  - Path to a custom `tsconfig.json` file.
- `--minify` {{<type>}}boolean{{</type>}}
  - Minify the bundled script before publishing.
- `--node-compat` {{<type>}}boolean{{</type>}}
  - Enable node.js compatibility.
- `--dry-run` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}}
  - Compile a project without actually publishing to live servers. Combined with `--outdir`, this is also useful for testing the output of `wrangler publish`. It also gives developers a chance to upload our generated sourcemap to a service like Sentry, so that errors from the Worker can be mapped against source code, but before the service goes live.
- `--keep-vars` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}}
  - It is recommended best practice to treat your Wrangler developer environment as a source of truth for your Worker configuration, and avoid making changes via the Cloudflare dashboard. 
  - If you change your environment variables or bindings in the Cloudflare dashboard, Wrangler will override them the next time you deploy. If you want to disable this behaviour set `keep-vars` to `true`.

{{</definitions>}}

---

## `kv:namespace`

Manage Workers KV namespaces.

{{<Aside type="note">}}
The `kv:...` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [Workers KV](https://www.cloudflare.com/products/workers-kv/). Learn more about using Workers KV with Wrangler in the [Workers KV guide](/workers/wrangler/workers-kv).
{{</Aside>}}

### `create`

Create a new namespace.

```sh
$ wrangler kv:namespace create <NAMESPACE> [OPTIONS]
```

{{<definitions>}}

- `NAMESPACE` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the new namespace.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace (the `preview_id` value).

{{</definitions>}}

{{<Aside type="note">}}
Below is an example of using the `create` command to create a KV namespace called `MY_KV`.

```sh
$ wrangler kv:namespace create "MY_KV"
🌀  Creating namespace with title "worker-MY_KV"
✨  Add the following to your wrangler.toml:
kv_namespaces = [
  { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

{{</Aside>}}

{{<Aside type="note">}}
Below is an example of using the `create` command to create a preview KV namespace called `MY_KV`.

```sh
$ wrangler kv:namespace create "MY_KV" --preview
🌀  Creating namespace with title "my-site-MY_KV_preview"
✨  Success!
Add the following to your wrangler.toml:
kv_namespaces = [
  { binding = "MY_KV", preview_id = "15137f8edf6c09742227e99b08aaf273" }
]
```

{{</Aside>}}

### list

List all KV namespaces associated with the current account ID.

```sh
$ wrangler kv:namespace list
```

{{<Aside type="note">}}
Below is an example that passes the Wrangler command through the `jq` command:

```sh
$ wrangler kv:namespace list | jq "."
[
  {
    "id": "06779da6940b431db6e566b4846d64db",
    "title": "TEST_NAMESPACE"
  },
  {
    "id": "32ac1b3c2ed34ed3b397268817dea9ea",
    "title": "STATIC_CONTENT"
  }
]
```

{{</Aside>}}

### delete

Delete a given namespace.

```sh
$ wrangler kv:namespace delete [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

{{<Aside type="note">}}
Below is an example of deleting a KV namespace called MY_KV.

```sh
$ wrangler kv:namespace delete --binding=MY_KV
Are you sure you want to delete namespace f7b02e7fc70443149ac906dd81ec1791? [y/n]
yes
🌀  Deleting namespace f7b02e7fc70443149ac906dd81ec1791
✨  Success
```

{{</Aside>}}

{{<Aside type="note">}}
Below is an example of deleting a preview KV namespace called MY_KV.

```sh
$ wrangler kv:namespace delete --binding=MY_KV --preview
Are you sure you want to delete namespace 15137f8edf6c09742227e99b08aaf273? [y/n]
yes
🌀  Deleting namespace 15137f8edf6c09742227e99b08aaf273
✨  Success
```

{{</Aside>}}

## `kv:key`

Manage key-value pairs within a Workers KV namespace.

{{<Aside type="note">}}
The `kv:...` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [Workers KV](https://www.cloudflare.com/products/workers-kv/). Learn more about using Workers KV with Wrangler in the [Workers KV guide](/workers/wrangler/workers-kv).
{{</Aside>}}

### `put`

Write a single key-value pair to a particular namespace.

```sh
$ wrangler kv:key put <KEY> [VALUE] [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.

Exactly one of `VALUE` or `--path` is required.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key to write to.
- `VALUE` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The value to write.
- `--path` {{<prop-meta>}}optional{{</prop-meta>}}
  - When defined, the value is loaded from the file at `--path` rather than reading it from the `VALUE` argument. This is ideal for security-sensitive operations because it avoids saving keys and values into your terminal history.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--ttl` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The lifetime (in number of seconds) that the key-value pair should exist before expiring. Must be at least `60` seconds. This option takes precedence over the `expiration` option.
- `--expiration` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The timestamp, in UNIX seconds, indicating when the key-value pair should expire.

{{</definitions>}}

{{<Aside type="note">}}
Below is an example that puts a key-value into the namespace with binding name of `MY_KV`.

```sh
$ wrangler kv:key put --binding=MY_KV "my-key" "some-value"
✨  Success
```

{{</Aside>}}

{{<Aside type="note">}}
Below is an example that puts a key-value into the preview namespace with binding name of `MY_KV`.

```sh
$ wrangler kv:key put --binding=MY_KV --preview "my-key" "some-value"
✨  Success
```

{{</Aside>}}

{{<Aside type="note">}}
Below is an example that puts a key-value into a namespace, with a time-to-live value of `10000` seconds.

```sh
$ wrangler kv:key put --binding=MY_KV "my-key" "some-value" --ttl=10000
✨  Success
```

{{</Aside>}}

{{<Aside type="note">}}
Below is an example that puts a key-value into a namespace, where the value is read from the `value.txt` file.

```sh
$ wrangler kv:key put --binding=MY_KV "my-key" --path=value.txt
✨  Success
```

{{</Aside>}}

### list

Output a list of all keys in a given namespace.

```sh
$ wrangler kv:key list [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--prefix` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Only list keys that begin with the given prefix.

{{</definitions>}}

{{<Aside type="note">}}
Below is an example that passes the Wrangler command through the `jq` command:

```sh
$ wrangler kv:key list --binding=MY_KV --prefix="public" | jq "."
[
  {
    "name": "public_key"
  },
  {
    "name": "public_key_with_expiration",
    "expiration": "2019-09-10T23:18:58Z"
  }
]
```

{{</Aside>}}

### `get`

Read a single value by key from the given namespace.

```sh
$ wrangler kv:key get <KEY> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key value to get.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

{{<Aside type="note">}}
Here is an example that gets the value of the `"my-key"` key from the KV namespace with binding name `MY_KV`.

```sh
$ wrangler kv:key get --binding=MY_KV "my-key"
value
```

{{</Aside>}}

### `delete`

Remove a single key value pair from the given namespace.

```sh
$ wrangler kv:key delete <KEY> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key value to get.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

{{<Aside type="note">}}
Below is an example that deletes the key-value pair with key `"my-key"` from the KV namespace with binding name `MY_KV`.

```sh
$ wrangler kv:key delete --binding=MY_KV "my-key"
Are you sure you want to delete key "my-key"? [y/n]
yes
🌀  Deleting key "my-key"
✨  Success
```

{{</Aside>}}

## `kv:bulk`

Manage multiple key-value pairs within a Workers KV namespace in batches.

{{<Aside type="note">}}
The `kv:...` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [Workers KV](https://www.cloudflare.com/products/workers-kv/). Learn more about using Workers KV with Wrangler in the [Workers KV guide](/workers/wrangler/workers-kv).
{{</Aside>}}

### `put`

Write a JSON file containing an array of key-value pairs to the given namespace.

```sh
$ wrangler kv:bulk put <FILENAME> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file containing an array of key-value pairs to write to the namespace.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

This command takes a JSON file as an argument with a list of key-value pairs to upload. An example of JSON input:

```json
[
  {
    "key": "test_key",
    "value": "test_value",
    "expiration_ttl": 3600
  }
]
```

KV namespace values can only store strings. In order to save complex a value, stringify it to JSON:

```json
[
  {
    "key": "test_key",
    "value": "{\"name\": \"test_value\"}",
    "expiration_ttl": 3600
  }
]
```

Here is the full schema for key-value entries uploaded via the bulk API:

{{<definitions>}}

- `key` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key’s name. The name may be 512 bytes maximum. All printable, non-whitespace characters are valid.
- `value` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The UTF-8 encoded string to be stored, up to 10 MB in length.
- `expiration` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The time, measured in number of seconds since the UNIX epoch, at which the key should expire.
- `expiration_ttl` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The number of seconds the document should exist before expiring. Must be at least `60` seconds.
- `base64` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - When true, the server will decode the value as base64 before storing it. This is useful for writing values that would otherwise be invalid JSON strings, such as images. Defaults to `false`.

{{</definitions>}}

{{<Aside type="note">}}
If both `expiration` and `expiration_ttl` are specified for a given key, the API will prefer `expiration_ttl`.
{{</Aside>}}

{{<Aside type="note">}}
Here is an example of writing all the key-value pairs found in the `allthethingsupload.json` file.

```sh
$ wrangler kv:bulk put --binding=MY_KV allthethingsupload.json
🌀  uploading 1 key value pairs
✨  Success
```

{{</Aside>}}

### `delete`

Delete all keys read from a JSON file within a given namespace.

```sh
$ wrangler kv:bulk delete <FILENAME> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file containing an array of keys to delete from the namespace.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

This command takes a JSON file as an argument containing an array of keys to delete.
Here is an example of the JSON input:

```json
["test_key_1", "test_key_2"]
```

{{<Aside type="note">}}
Below is an example of deleting all the keys found in the `allthethingsdelete.json` file.

```sh
$ wrangler kv:bulk delete --binding=MY_KV allthethingsdelete.json
Are you sure you want to delete all keys in allthethingsdelete.json? [y/n]
y
🌀  deleting 1 key value pairs
✨  Success
```

{{</Aside>}}

---

## r2 bucket

Interact with buckets in an R2 store.

{{<Aside type="note">}}
The `r2 bucket` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [the R2 API](/r2/data-access/workers-api/workers-api-reference).
{{</Aside>}}

### `create`

Create a new R2 bucket.

```sh
$ wrangler r2 bucket create <NAME>
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the new R2 bucket.

{{</definitions>}}

### `delete`

Delete an R2 bucket.

```sh
$ wrangler r2 bucket delete <NAME>
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the R2 bucket to delete.

{{</definitions>}}

### `list`

List R2 bucket in the current account.

```sh
$ wrangler r2 bucket list
```

---

## secret

Manage the secret variables for a Worker.

### put

Create or replace a secret for a Worker.

```sh
$ wrangler secret put <KEY> [OPTIONS]
```

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The variable name for this secret to be accessed in the Worker.

- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific Worker script rather than inheriting from `wrangler.toml`.

- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.

{{</definitions>}}

{{<Aside type="note">}}
You will be prompted to input the secret's value. For example:

```sh
$ wrangler secret put FOO
Enter a secret value: ***
🌀 Creating the secret for script worker-app
✨ Success! Uploaded secret FOO
```

{{</Aside>}}

{{<Aside type="note">}}
The `put` command can also receive piped input. For example:

```sh
$ echo "-----BEGIN PRIVATE KEY-----\nM...==\n-----END PRIVATE KEY-----\n" | wrangler secret put PRIVATE_KEY
```

{{</Aside>}}

### delete

Delete a secret for a Worker.

```sh
$ wrangler secret delete <KEY> [OPTIONS]
```

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The variable name for this secret to be accessed in the Worker.
- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific Worker script rather than inheriting from `wrangler.toml`.

- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.

{{</definitions>}}

### list

List the names of all the secrets for a Worker.

```sh
$ wrangler secret list [OPTIONS]
```

{{<definitions>}}

- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific Worker script rather than inheriting from `wrangler.toml`.

- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment

{{</definitions>}}

{{<Aside type="note">}}
Below is an example of listing the secrets for the current Worker.

```sh
$ wrangler secret list
[
  {
    "name": "FOO",
    "type": "secret_text"
  }
]
```

{{</Aside>}}

---

## `secret:bulk`

Manage multiple secrets for a Worker.

### `json`

The path to a JSON file containing secrets in key-value pairs to upload.

```sh
$ wrangler secret:bulk json <FILE> [OPTIONS]
```

{{<definitions>}}

- `JSON` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file of key-value pairs to upload, in form {"key": value, ...}
- `--name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific Worker script rather than inheriting from `wrangler.toml`.

- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific environment
    {{</definitions>}}

  {{<Aside type="note">}}
  Below is an example of uploading secrets from a JSON file.

  ```json
  {
    "secret-name-1": "secret-value-1",
    "secret-name-2": "secret-value-2"
  }
  ```

  {{</Aside>}}
  {{<Aside type="note">}}
  When complete the output summary will show the number of secrets uploaded and number failed.

  ```
  🌀 Creating the secrets for the Worker "script-name"
  ✨ Successfully created secret for key: secret-name-1
  ...
  🚨 Error uploading secret for key: secret-name-1
  ✨ Successfully created secret for key: secret-name-2

  Finished processing secrets JSON file:
  ✨ 1 secrets successfully uploaded
  🚨 1 secrets failed to upload
  ```

  {{</Aside>}}

## tail

Start a session to livestream logs from a deployed Worker.

```sh
$ wrangler tail <NAME> [OPTIONS]
```

{{<definitions>}}

- `NAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
- `--format` {{<type>}}"json"|"pretty"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The format of the log entries.
- `--status` {{<type>}}"ok"|"error"|"canceled"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by invocation status.
- `--header` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by HTTP header.
- `--method` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by HTTP method.
- `--sampling-rate` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Add a fraction of requests to log sampling rate (between `0` and `1`).
- `--search` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by a text match in `console.log` messages.
- `--ip` {{<type>}}(string|"self")[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Filter by the IP address the request originates from. Use `"self"` to show only messages from your own IP.

{{</definitions>}}

{{<Aside type="note">}}
Filtering with `--ip self` will allow tailing a Worker beyond the normal request per second limits.
{{</Aside>}}

After starting `wrangler tail`, you will receive a live feed of console and exception logs for each request your Worker receives.

---

## pages

Configure Cloudflare Pages.

{{<Aside type="warning">}}
The `wrangler pages ...` commands are in beta.<br>
Report any issues to https://github.com/cloudflare/wrangler2/issues/new/choose.
{{</Aside>}}

### `dev`

Develop your full stack Pages application locally.

```sh
$ wrangler pages dev [<DIRECTORY>] [OPTIONS] [-- <COMMAND..>]
```

{{<definitions>}}

- `DIRECTORY` {{<type>}}string{{</type>}}
  - The directory of static assets to serve.
- `COMMAND..` {{<type>}}string{{</type>}}
  - The proxy command(s) to run.
- `--local` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}}
  - Run on your local machine.
- `--port` {{<type>}}number{{</type>}} {{<prop-meta>}}(default: 8788){{</prop-meta>}}
  - The port to listen on (serve from).
- `--proxy` {{<type>}}number{{</type>}}
  - The port to proxy (where the static assets are served).
- `--script-path` {{<type>}}string{{</type>}} {{<prop-meta>}}(default: "\_worker.js"){{</prop-meta>}}
  - The location of the single Worker script if not using functions.
- `--binding` {{<type>}}string[]{{</type>}}
  - Bind variable/secret (KEY=VALUE).
- `--kv` {{<type>}}string[]{{</type>}}
  - KV namespace to bind.
- `--do` {{<type>}}string[]{{</type>}}
  - Durable Object to bind (NAME=CLASS).
- `--live-reload` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: false){{</prop-meta>}}
  - Auto reload HTML pages when change is detected.

{{</definitions>}}

### `project list`

List your Pages projects.

```sh
$ wrangler pages project list
```

### `project create`

Create a new Cloudflare Pages project.

```sh
$ wrangler pages project create [PROJECT-NAME] [OPTIONS]
```

{{<definitions>}}

- `PROJECT-NAME` {{<type>}}string{{</type>}}
  - The name of your Pages project.
- `--production-branch` {{<type>}}string{{</type>}}
  - The name of the production branch of your project.

{{</definitions>}}

### `deployment list`

List deployments in your Cloudflare Pages project.

```sh
$ wrangler pages deployment list [OPTIONS]
```

{{<definitions>}}

- `--project-name` {{<type>}}string{{</type>}}
  - The name of the project you would like to list deployments for.

{{</definitions>}}

### `publish`

Deploy a directory of static assets as a Pages deployment.

```sh
$ wrangler pages publish [DIRECTORY] [OPTIONS]
```

{{<definitions>}}

- `DIRECTORY` {{<type>}}string{{</type>}}
  - The directory of static files to upload.
- `--project-name` {{<type>}}string{{</type>}}
  - The name of the project you want to deploy to.
- `--branch` {{<type>}}string{{</type>}}
  - The name of the branch you want to deploy to.
- `--commit-hash` {{<type>}}string{{</type>}}
  - The SHA to attach to this deployment.
- `--commit-message` {{<type>}}string{{</type>}}
  - The commit message to attach to this deployment.
- `--commit-dirty` {{<type>}}boolean{{</type>}}
  - Whether or not the workspace should be considered dirty for this deployment.

{{</definitions>}}

{{<Aside type="note">}}

Your site is deployed to `<PROJECT_NAME>.pages.dev`. If you do not provide the `--project-name` argument, you will be prompted to enter <PROJECT_NAME> in your terminal after you run the command.

{{</Aside>}}

{{<Aside type="note">}}

This command has an alias of `wrangler pages deploy create`.

{{</Aside>}}

---

## login

Authorize Wrangler with your Cloudflare account using OAuth. Wrangler will attempt to automatically open your web browser to login with your Cloudflare account.

If you prefer to use API tokens for authentication, such as in headless or continuous integration environments, refer to [Running Wrangler in CI/CD](/workers/wrangler/ci-cd/).

```sh
$ wrangler login [OPTIONS]
```

{{<definitions>}}

- `--scopes-list` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - List all the available OAuth scopes with descriptions.
- `--scopes $SCOPES` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Allows to choose your set of OAuth scopes. The set of scopes must be entered in a whitespace-separated list,
    for example, `$ wrangler login --scopes account:read user:read`.

{{</definitions>}}

{{<Aside type="note">}}
`wrangler login` uses all the available scopes by default if no flags are provided.
{{</Aside>}}

If Wrangler fails to open a browser, you can copy and paste the URL generated by `wrangler login` in your terminal into a browser and log in.

{{<Aside type="note">}}

### Using `wrangler login` on a remote machine

If you are using Wrangler from a remote machine, but run the login flow from your local browser, you will receive the following error message after logging in:`This site can't be reached`.

To finish the login flow, run `wrangler login` and go through the login flow in the browser:

```sh
$ wrangler login
 ⛅️ wrangler 2.1.6
-------------------
Attempting to login via OAuth...
Opening a link in your default browser: https://dash.cloudflare.com/oauth2/auth?xyz...
```

The browser login flow will redirect you to a `localhost` URL on your machine.

Leave the login flow active. Open a second terminal session. In that second terminal session, use `curl` or an equivalent request library on the remote machine to fetch this `localhost` URL. Copy and paste the `localhost` URL that was generated during the `wrangler login` flow and run:

```sh
$ curl <LOCALHOST_URL>
```

{{</Aside>}}

---

## logout

Remove Wrangler's authorization for accessing your account. This command will invalidate your current OAuth token.

```sh
$ wrangler logout
```

If you are using `CLOUDFLARE_API_TOKEN` instead of OAuth, and you can logout by deleting your API token in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Go to **Overview** > **Get your API token** in the right-side menu.
3. Select the three-dot menu on your Wrangler token.
4. Select **Delete**.

---

## whoami

Retrieve your user information and test your authentication configuration.

```sh
$ wrangler whoami
```
