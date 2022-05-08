---
pcx-content-type: how-to
title: Commands
weight: 2
---

## Wrangler commands

These are the global flags that work on every single command.

```sh
Flags:
  `-c`, `--config`      Path to `.toml` configuration file  [string]
  `-h`, `--help`        Show help  [boolean]
  `-v`, `--version`     Show version number  [boolean]
```

---

## init

Create a skeleton Wrangler project, including the `wrangler.toml` file, into a specified directory.

```sh
$ wrangler init [$NAME] [-y / --yes]
```

Default values indicated by {{<type>}}=value{{</type>}}.

{{<definitions>}}

- `$NAME` {{<type>}}=(Name of working directory){{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of the Workers project. This is both the directory name and `name` property in the generated `wrangler.toml` [configuration](/workers/wrangler/configuration/) file.

- `--yes`

  - Answer yes to any prompts for new projects

{{</definitions>}}

---

## login

Authorize Wrangler with your Cloudflare account using OAuth. This will open a login page in your browser and request your account access permissions.

```sh
$ wrangler login [--scopes-list] [--scopes $SCOPES]
```

All of the arguments and flags to this command are optional:

{{<definitions>}}

- `--scopes-list` {{<prop-meta>}}optional{{</prop-meta>}}
  - List all the available OAuth scopes with descriptions.
- `--scopes $SCOPES` {{<prop-meta>}}optional{{</prop-meta>}}
  - Allows to choose your set of OAuth scopes. The set of scopes must be entered in a whitespace-separated list,
    for example, `$ wrangler login --scopes account:read user:read`.

{{</definitions>}}

`wrangler login` uses all the available scopes by default if no flags are provided.

---

## logout

Remove Wrangler's authorization for accessing your account. This command will invalidate your current OAuth token.

```sh
$ wrangler logout
```

If you are using `CLOUDFLARE_API_TOKEN` instead of OAuth, and wish to delete your API token, log into the Cloudflare dashboard and go to **Overview** > **Get your API token** in the right side menu > select the three-dot menu on your Wrangler token and select **Delete** if you wish to delete your API token.

---

## publish

Publish your Worker to Cloudflare. Several keys in your `wrangler.toml` file determine whether you are publishing to a `*.workers.dev` subdomain or a custom domain. However, custom domains must be proxied (orange-clouded) through Cloudflare. Refer to the [Get started guide](/workers/get-started/guide/#optional-configure-for-deploying-to-a-registered-domain) for more information.

```sh
$ wrangler publish 
```


{{<Aside>}}

mention compat date being required

{{</Aside>}}

```sh
Options:
      --env                                        Perform on a specific environment  [string]
      --name                                       Name of the worker  [string]
      --format                                     Choose an entry type  [choices: "modules", "service-worker"]
      --compatibility-date                         Date to use for compatibility checks  [string]
      --compatibility-flags, --compatibility-flag  Flags to use for compatibility checks  [array]
      --latest                                     Use the latest version of the worker runtime  [boolean] [default: false]
      --experimental-public                        Static assets to be served  [string]
      --site                                       Root folder of static assets for Workers Sites  [string]
      --site-include                               Array of .gitignore-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded.  [array]
      --site-exclude                               Array of .gitignore-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded.  [array]
      --triggers, --schedule, --schedules          cron schedules to attach  [array]
      --routes, --route                            Routes to upload  [array]
```

---

## dev

`wrangler dev` is a command that establishes a connection between `localhost` and an edge server that operates your Worker in development. A tunnel forwards all requests to the edge server, which continuously updates as your Worker code changes. This allows full access to Workers KV, Durable Objects, etc. This is a great way to easily test your Worker while developing.

```sh
$ wrangler dev [--env $ENVIRONMENT_NAME] [--ip <ip>] [--port <port>] [--host <host>] [--local-protocol <http|https>] [--upstream-protocol <http|https>]
```

{{<definitions>}}

- `--env` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, Wrangler will load the matching environment's configuration. Refer to [Environments](/workers/platform/environments/) for more information.

- `--ip` {{<prop-meta>}}optional{{</prop-meta>}}

  - The IP to listen on, defaults to `127.0.0.1`.

- `--port` {{<prop-meta>}}optional{{</prop-meta>}}

  - The port to listen on, defaults to `8787`.

- `--host` {{<prop-meta>}}optional{{</prop-meta>}}

  - The host to forward requests to, defaults to the zone of the project or to `tutorial.cloudflareworkers.com` if unauthenticated.

- `--local-protocol` {{<prop-meta>}}optional{{</prop-meta>}}

  - The protocol to listen to requests on, defaults to `http`.

- `--upstream-protocol` {{<prop-meta>}}optional{{</prop-meta>}}

  - The protocol to forward requests to host on, defaults to `https`.

{{</definitions>}}

These arguments can also be set in your `wrangler.toml` file. Refer to the [`wrangler dev` configuration](/workers/wrangler/configuration/#dev) documentation for more information.

### Usage

You should run `wrangler dev` from your Worker directory. Wrangler will run a local server accepting requests, executing your Worker, and forwarding them to a host. If you want to emulate another host other than your zone or `tutorials.cloudflare.com`, you can specify with `--host example.com`.

```sh
~/my-worker $ wrangler dev
⬣ Listening at http://localhost:8787
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ [b] open a browser, [d] open Devtools, [l] turn on local mode, [c] clear console, [x] to exit                        │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

With `wrangler dev` running, you can send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see `console.log` messages and exceptions appearing in your terminal.

---

## tail

Start a session to livestream logs from a deployed Worker.

```sh
$ wrangler tail NAME
```

{{<definitions>}}

- `--format $FORMAT` {{<type>}}json|pretty{{</type>}}
  - The format of the log entries.
- `--status $STATUS`
  - Filter by invocation status \[possible values: `ok`, `error`, `canceled`].
- `--header $HEADER`
  - Filter by HTTP header.
- `--method $METHOD`
  - Filter by HTTP method.
- `--sampling-rate $RATE`
  - Add a percentage of requests to log sampling rate.
- `--search $SEARCH`
  - Filter by a text match in `console.log` messages.

{{</definitions>}}

After starting `wrangler tail`, you will receive a live feed of console and exception logs for each request your Worker receives.

---

## secret

Interact with your secrets.

### `put`

Create or replace a secret.

```sh
$ wrangler secret put <name> --env ENVIRONMENT_NAME
Enter the secret text you’d like assigned to the variable name on the script named my-worker-ENVIRONMENT_NAME:
```

You will be prompted to input the secret's value. This command can receive piped input, so the following example is also possible:

```sh
$ echo "-----BEGIN PRIVATE KEY-----\nM...==\n-----END PRIVATE KEY-----\n" | wrangler secret put PRIVATE_KEY
```

{{<definitions>}}

- `name`

  - The variable name to be accessible in the script.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}
  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

{{</definitions>}}

### `delete`

Delete a secret from a specific script.

```sh
$ wrangler secret delete <name> --env ENVIRONMENT_NAME
```

{{<definitions>}}

- `name`

  - The variable name to be accessible in the script.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}
  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

{{</definitions>}}

### `list`

List all the secret names bound to a specific script.

```sh
$ wrangler secret list --env ENVIRONMENT_NAME
```

{{<definitions>}}

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}
  - If defined, only the specified environment's secrets will be listed. Refer to [Environments](/workers/platform/environments/) for more information.

{{</definitions>}}

---

## kv

The `kv` subcommand allows you to store application data in the Cloudflare network to be accessed from Workers using [Workers KV](https://www.cloudflare.com/products/workers-kv/). KV operations are scoped to your account, so in order to use any of these commands, you:

- must configure and `account_id` in your project's `wrangler.toml` file or set the `CLOUDFLARE_ACCOUNT_ID` environment variable.
- run all `wrangler kv:<command>` operations in your terminal from the project's root directory.

### Getting started

To use Workers KV with your Worker, the first thing you must do is create a KV namespace. This is done with the `kv:namespace` subcommand.

The `kv:namespace` subcommand takes as a new binding name as its argument. A Workers KV namespace will be created using a concatenation of your Worker’s name (from your `wrangler.toml` file) and the binding name you provide:

```sh
$ wrangler kv:namespace create "MY_KV"
🌀  Creating namespace with title "my-site-MY_KV"
✨  Success!
Add the following to your configuration file:
kv_namespaces = [
  { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

Successful operations will print a new configuration block that should be copied into your `wrangler.toml` file. Add the output to the existing `kv_namespaces` configuration if already present. You can now access the binding from within a Worker:

```js
let value = await MY_KV.get("my-key");
```

To write a value to your KV namespace using Wrangler, run the `wrangler kv:key put` subcommand.

```sh
$ wrangler kv:key put --binding=MY_KV "key" "value"
✨  Success
```

Instead of `--binding`, you may use `--namespace-id` to specify which KV namespace should receive the operation:

```sh
$ wrangler kv:key put --namespace-id=e29b263ab50e42ce9b637fa8370175e8 "key" "value"
✨  Success
```

Additionally, KV namespaces can be used with environments. This is useful for when you have code that refers to a KV binding like `MY_KV`, and you want to be able to have these bindings point to different namespaces (like one for staging and one for production).

A `wrangler.toml` file with two environments:

```toml
[env.staging]
kv_namespaces = [
  { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]

[env.production]
kv_namespaces = [
  { binding = "MY_KV", id = "a825455ce00f4f7282403da85269f8ea" }
]
```

To insert a value into a specific KV namespace, use:

```sh
$ wrangler kv:key put --env=staging --binding=MY_MV "key" "value"
✨  Success
```

Since `--namespace-id` is always unique (unlike binding names), you do not need to specify an `--env` argument.

### Concepts

Most `kv` commands require you to specify a namespace. A namespace can be specified in two ways:

1.  With a `--binding`:

    ```sh
    $ wrangler kv:key get --binding=MY_KV "my key"
    ```

    - This can be combined with `--preview` flag to interact with a preview namespace instead of a production namespace.

2.  With a `--namespace-id`:

    ```sh
    $ wrangler kv:key get --namespace-id=06779da6940b431db6e566b4846d64db "my key"
    ```

Most `kv` subcommands also allow you to specify an environment with the optional `--env` flag. This allows you to publish Workers running the same code but with different namespaces. For example, you could use separate staging and production namespaces for KV data in your `wrangler.toml` file:

```toml
type = "webpack"
name = "my-worker"
account_id = "<account id here>"
route = "staging.example.com/*"
workers_dev = false

kv_namespaces = [
  { binding = "MY_KV", id = "06779da6940b431db6e566b4846d64db" }
]

[env.production]
route = "example.com/*"
kv_namespaces = [
  { binding = "MY_KV", id = "07bc1f3d1f2a4fd8a45a7e026e2681c6" }
]
```

With the `wrangler.toml` file above, you can specify `--env production` when you want to perform a KV action on the namespace `MY_KV` under `env.production`. For example, with the `wrangler.toml` file above, you can get a value out of a production KV instance with:

```sh
$ wrangler kv:key get --binding "MY_KV" --env=production "my key"
```

To learn more about environments, refer to [Environments](/workers/platform/environments/).

### `kv:namespace`

#### `create`

Create a new namespace.

```sh
$ wrangler kv:namespace create $NAME [--env=$ENVIRONMENT_NAME] [--preview]
```

{{<definitions>}}

- `$NAME`

  - The name of the new namespace.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

- `--preview` {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace (the `preview_id` value) instead of production.

{{</definitions>}}

##### Usage

```sh
$ wrangler kv:namespace create "MY_KV"
🌀  Creating namespace with title "worker-MY_KV"
✨  Add the following to your wrangler.toml:
kv_namespaces = [
  { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

```sh
$ wrangler kv:namespace create "MY_KV" --preview
🌀  Creating namespace with title "my-site-MY_KV_preview"
✨  Success!
Add the following to your wrangler.toml:
kv_namespaces = [
  { binding = "MY_KV", preview_id = "15137f8edf6c09742227e99b08aaf273" }
]
```

#### `list`

List all KV namespaces associated with an account ID.

```sh
$ wrangler kv:namespace list
```

##### Usage

This example passes the Wrangler command through the `jq` command:

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

#### `delete`

Delete a given namespace.

```sh
$ wrangler kv:namespace delete --binding= [--namespace-id=]
```

{{<definitions>}}

- `--binding` {{<prop-meta>}}required (if no {{<code>}}--namespace-id{{</code>}}){{</prop-meta>}}

  - The name of the namespace to delete.

- `--namespace-id` {{<prop-meta>}}required (if no {{<code>}}--binding{{</code>}}){{</prop-meta>}}

  - The ID of the namespace to delete.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

- `--preview` {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

##### Usage

```sh
$ wrangler kv:namespace delete --binding=MY_KV
Are you sure you want to delete namespace f7b02e7fc70443149ac906dd81ec1791? [y/n]
yes
🌀  Deleting namespace f7b02e7fc70443149ac906dd81ec1791
✨  Success
```

```sh
$ wrangler kv:namespace delete --binding=MY_KV --preview
Are you sure you want to delete namespace 15137f8edf6c09742227e99b08aaf273? [y/n]
yes
🌀  Deleting namespace 15137f8edf6c09742227e99b08aaf273
✨  Success
```

### `kv:key`

#### `put`

Write a single key-value pair to a particular namespace.

```sh
$ wrangler kv:key put --binding= [--namespace-id=] $KEY $VALUE
✨  Success
```

{{<definitions>}}

- `$KEY` {{<prop-meta>}}required{{</prop-meta>}}

  - The key to write to.

- `$VALUE` {{<prop-meta>}}required{{</prop-meta>}}

  - The value to write.

- `--binding` {{<prop-meta>}}required (if no {{<code>}}--namespace-id{{</code>}}){{</prop-meta>}}

  - The name of the namespace to write to.

- `--namespace-id` {{<prop-meta>}}required (if no {{<code>}}--binding{{</code>}}){{</prop-meta>}}

  - The ID of the namespace to write to.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

- `--preview` {{<prop-meta>}}optional{{</prop-meta>}}

  - Interact with a preview namespace instead of production. Pass this to the `wrangler.toml` file’s `kv_namespaces.preview_id` instead of `kv_namespaces.id`.

- `--ttl` {{<prop-meta>}}optional{{</prop-meta>}}

  - The lifetime (in number of seconds) the key-value pair should exist before expiring. Must be at least `60` seconds. This option takes precedence over the `expiration` option.

- `--expiration` {{<prop-meta>}}optional{{</prop-meta>}}

  - The timestamp, in UNIX seconds, indicating when the key-value pair should expire.

- `--path` {{<prop-meta>}}optional{{</prop-meta>}}
  - When defined, Wrangler the value is loaded from the file at `--path`. This is ideal for security-sensitive operations because it avoids saving keys and values into your terminal history.

{{</definitions>}}

##### Usage

```sh
$ wrangler kv:key put --binding=MY_KV "key" "value"
✨  Success
```

```sh
$ wrangler kv:key put --binding=MY_KV --preview "key" "value"
✨  Success
```

```sh
$ wrangler kv:key put --binding=MY_KV "key" "value" --ttl=10000
✨  Success
```

```sh
$ wrangler kv:key put --binding=MY_KV "key" --path=value.txt
✨  Success
```

#### `list`

Output a list of all keys in a given namespace.

```sh
$ wrangler kv:key list --binding= [--namespace-id=] [--prefix] [--env]
```

{{<definitions>}}

- `--binding` {{<prop-meta>}}required (if no {{<code>}}--namespace-id{{</code>}}){{</prop-meta>}}

  - The name of the namespace to list.

- `--namespace-id` {{<prop-meta>}}required (if no {{<code>}}--binding{{</code>}}){{</prop-meta>}}

  - The ID of the namespace to list.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, the operation will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

- `--prefix` {{<prop-meta>}}optional{{</prop-meta>}}
  - A prefix to filter listed keys.

{{</definitions>}}

##### Usage

This example passes the Wrangler command through the `jq` command:

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

#### `get`

Read a single value by key from the given namespace.

```sh
$ wrangler kv:key get --binding= [--env=] [--preview] [--namespace-id=] "$KEY"
```

{{<definitions>}}

- `$KEY` {{<prop-meta>}}required{{</prop-meta>}}

  - The key value to get.

- `--binding` {{<prop-meta>}}required (if no {{<code>}}--namespace-id{{</code>}}){{</prop-meta>}}

  - The name of the namespace to get from.

- `--namespace-id` {{<prop-meta>}}required (if no {{<code>}}--binding{{</code>}}){{</prop-meta>}}

  - The ID of the namespace to get from.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, the operation will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

- `--preview` {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml` file’s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

{{</definitions>}}

##### Usage

```sh
$ wrangler kv:key get --binding=MY_KV "key"
value
```

#### `delete`

Removes a single key value pair from the given namespace.

```sh
$ wrangler kv:key delete --binding= [--env=] [--preview] [--namespace-id=] "$KEY"
```

{{<definitions>}}

- `$KEY` {{<prop-meta>}}required{{</prop-meta>}}

  - The key value to delete.

- `--binding` {{<prop-meta>}}required (if no {{<code>}}--namespace-id{{</code>}}){{</prop-meta>}}

  - The name of the namespace to delete from.

- `--namespace-id` {{<prop-meta>}}required (if no {{<code>}}--binding{{</code>}}){{</prop-meta>}}

  - The id of the namespace to delete from.

- `--env` {{<prop-meta>}}optional{{</prop-meta>}}

  - Perform on a specific environment specified as `$ENVIRONMENT_NAME`.

- `--preview` {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml`’s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

{{</definitions>}}

##### Usage

```sh
$ wrangler kv:key delete --binding=MY_KV "key"
Are you sure you want to delete key "key"? [y/n]
yes
🌀  Deleting key "key"
✨  Success
```

### `kv:bulk`

#### `put`

Write a file full of key-value pairs to the given namespace.

```sh
$ wrangler kv:bulk put --binding= [--env=] [--preview] [--namespace-id=] $FILENAME
```

{{<definitions>}}

- `$FILENAME` {{<prop-meta>}}required{{</prop-meta>}}

  - The file to write to the namespace

- `--binding` {{<prop-meta>}}required (if no {{<code>}}--namespace-id{{</code>}}){{</prop-meta>}}

  - The name of the namespace to put to.

- `--namespace-id` {{<prop-meta>}}required (if no {{<code>}}--binding{{</code>}}){{</prop-meta>}}

  - The id of the namespace to put to.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

- `--preview` {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml` file’s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

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

In order to save JSON data, cast `value` to a string:

```json
[
  {
    "key": "test_key",
    "value": "{\"name\": \"test_value\"}",
    "expiration_ttl": 3600
  }
]
```

The schema below is the full schema for key-value entries uploaded via the bulk API:

{{<definitions>}}

- `key` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The key’s name. The name may be 512 bytes maximum. All printable, non-whitespace characters are valid.

- `value` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The UTF-8 encoded string to be stored, up to 10 MB in length.

- `expiration` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The time, measured in number of seconds since the UNIX epoch, at which the key should expire.

- `expiration_ttl` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The number of seconds the document should exist before expiring. Must be at least `60` seconds.

- `base64` {{<type>}}bool{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - When true, the server will decode the value as base64 before storing it. This is useful for writing values that would otherwise be invalid JSON strings, such as images. Defaults to `false`.

{{</definitions>}}

If both `expiration` and `expiration_ttl` are specified for a given key, the API will prefer `expiration_ttl`.

##### Usage

```sh
$ wrangler kv:bulk put --binding=MY_KV allthethingsupload.json
🌀  uploading 1 key value pairs
✨  Success
```

#### `delete`

Delete all specified keys within a given namespace.

```sh
$ wrangler kv:bulk delete --binding= [--env=] [--preview] [--namespace-id=] $FILENAME
```

{{<definitions>}}

- `$FILENAME` {{<prop-meta>}}required{{</prop-meta>}}

  - The file with keys to delete.

- `--binding` {{<prop-meta>}}required (if no {{<code>}}--namespace-id{{</code>}}){{</prop-meta>}}

  - The name of the namespace to delete from.

- `--namespace-id` {{<prop-meta>}}required (if no {{<code>}}--binding{{</code>}}){{</prop-meta>}}

  - The ID of the namespace to delete from.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

- `--preview` {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml` file’s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

{{</definitions>}}

This command takes a JSON file as an argument with a list of keys to delete. An example of JSON input:

```json
["test_key_1", "test_key_2"]
```

##### Usage

```sh
$ wrangler kv:bulk delete --binding=MY_KV allthethingsdelete.json
Are you sure you want to delete all keys in allthethingsdelete.json? [y/n]
y
🌀  deleting 1 key value pairs
✨  Success
```
