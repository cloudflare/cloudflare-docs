---
pcx_content_type: configuration
title: Commands
weight: 3
---

# Commands

{{<render file="_wrangler-v1-deprecation.md">}}

Complete list of all commands available for [`wrangler`](https://github.com/cloudflare/wrangler-legacy), the Workers CLI.

---

## generate

Scaffold a Cloudflare Workers project from a public GitHub repository.

```sh
$ wrangler generate [$NAME] [$TEMPLATE] [--type=$TYPE] [--site]
```

Default values indicated by {{<type>}}=value{{</type>}}.

{{<definitions>}}

- `$NAME` {{<type>}}=worker{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of the Workers project. This is both the directory name and `name` property in the generated `wrangler.toml` [configuration](/workers/wrangler-legacy/configuration/) file.

- `$TEMPLATE` {{<type>}}=https://github.com/cloudflare/worker-template{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The GitHub URL of the [repository to use as the template](https://github.com/cloudflare/worker-template) for generating the project.

- `--type=$TYPE` {{<type>}}=webpack{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The type of project; one of `webpack`, `javascript`, or `rust`.

- `--site` {{<prop-meta>}}optional{{</prop-meta>}}
  - When defined, the default `$TEMPLATE` value is changed to [`cloudflare/workers-sdk/templates/worker-sites`](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-sites). This scaffolds a [Workers Site](/workers/platform/sites/) project.

{{</definitions>}}

---

## init

Create a skeleton `wrangler.toml` in an existing directory. This command can be used as an alternative to `generate` if you prefer to clone a template repository yourself or you already have a JavaScript project and would like to use Wrangler.

```sh
$ wrangler init [$NAME] [--type=$TYPE] [--site]
```

Default values indicated by {{<type>}}=value{{</type>}}.

{{<definitions>}}

- `$NAME` {{<type>}}=(Name of working directory){{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The name of the Workers project. This is both the directory name and `name` property in the generated `wrangler.toml` [configuration](/workers/wrangler-legacy/configuration/) file.

- `--type=$TYPE` {{<type>}}=webpack{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The type of project; one of `webpack`, `javascript`, or `rust`.

- `--site` {{<prop-meta>}}optional{{</prop-meta>}}
  - When defined, the default `$TEMPLATE` value is changed to [`cloudflare/workers-sdk/templates/worker-sites`](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-sites). This scaffolds a [Workers Site](/workers/platform/sites/) project.

{{</definitions>}}

---

## build

Build your project (if applicable). This command looks at your `wrangler.toml` file and reacts to the [`"type"` value](/workers/wrangler-legacy/configuration/#keys) specified.

When using `type = "webpack"`, Wrangler will build the Worker using its internal webpack installation. When using `type = "javascript"` , the [`build.command`](/workers/wrangler-legacy/configuration/#build-1), if defined, will run.

```sh
$ wrangler build [--env $ENVIRONMENT_NAME]
```

{{<definitions>}}

- `--env` {{<prop-meta>}}optional{{</prop-meta>}}
  - If defined, Wrangler will load the matching environment's configuration before building. Refer to [Environments](/workers/platform/environments/) for more information.

{{</definitions>}}

---

## login

Authorize Wrangler with your Cloudflare account. This will open a login page in your browser and request your account access permissions. This command is the alternative to `wrangler config` and it uses OAuth tokens.

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

Remove Wrangler's authorization for accessing your account. This command will invalidate your current OAuth token and delete the configuration file, if present.

```sh
$ wrangler logout
```

This command only invalidates OAuth tokens acquired through the `wrangler login` command. However, it will try to delete the configuration file regardless of your authorization method.

If you wish to delete your API token, log in to the Cloudflare dashboard and go to **Overview** > **Get your API token** in the right side menu > select the three-dot menu on your Wrangler token and select **Delete** if you wish to delete your API token.

---

## config

Configure Wrangler so that it may acquire a Cloudflare API Token or Global API key, instead of OAuth tokens, in order to access and manage account resources.

```sh
$ wrangler config [--api-key]
```

{{<definitions>}}

- `--api-key` {{<prop-meta>}}optional{{</prop-meta>}}
  - To provide your email and global API key instead of a token. (This is not recommended for security reasons.)

{{</definitions>}}

You can also use environment variables to authenticate, or `wrangler login` to authorize with OAuth tokens.

---

## publish

Publish your Worker to Cloudflare. Several keys in your `wrangler.toml` file determine whether you are publishing to a `*.workers.dev` subdomain or a custom domain. However, custom domains must be proxied (orange-clouded) through Cloudflare. Refer to the [Get started guide](/workers/platform/triggers/custom-domains/) for more information.

```sh
$ wrangler publish [--env $ENVIRONMENT_NAME]
```

{{<definitions>}}

- `--env` {{<prop-meta>}}optional{{</prop-meta>}}
  - If defined, Wrangler will load the matching environment's configuration before building and deploying. Refer to [Environments](/workers/platform/environments/) for more information.

{{</definitions>}}

To use this command, the following fields are required in your `wrangler.toml` file:

{{<definitions>}}

- `name` {{<type>}}string{{</type>}}

  - The name of the Workers project. This is both the directory name and `name` property in the generated `wrangler.toml` [configuration](/workers/wrangler-legacy/configuration/) file.

- `type` {{<type>}}string{{</type>}}

  - The type of project; one of `webpack`, `javascript`, or `rust`.

- `account_id` {{<type>}}string{{</type>}}
  - The Cloudflare account ID. This can be found in the Cloudflare dashboard, for example, `account_id = "a655bacaf2b4cad0e2b51c5236a6b974"`.

{{</definitions>}}

You can publish to [\<your-worker>.\<your-subdomain>.workers.dev](https://workers.dev) or to a custom domain.

When you publish changes to an existing Worker script, all new requests will automatically route to the updated version of the Worker without downtime. Any inflight requests will continue running on the previous version until completion. Once all inflight requests have finished complete, the previous Worker version will be purged and will no longer handle requests.

### Publishing to workers.dev

To publish to [`*.workers.dev`](https://workers.dev), you will first need to have a subdomain registered. You can register a subdomain by executing the [`wrangler subdomain`](#subdomain) command.

After you have registered a subdomain, add `workers_dev` to your `wrangler.toml` file.

{{<definitions>}}

- `workers_dev` {{<type>}}bool{{</type>}}
  - When `true`, indicates that the Worker should be deployed to a `*.workers.dev` domain.

{{</definitions>}}

### Publishing to your own domain

To publish to your own domain, specify these three fields in your `wrangler.toml` file.

{{<definitions>}}

- `zone_id` {{<type>}}string{{</type>}}

  - The Cloudflare zone ID, for example, `zone_id = "b6558acaf2b4cad1f2b51c5236a6b972"`, which can be found in the [Cloudflare dashboard](https://dash.cloudflare.com).

- `route` {{<type>}}string{{</type>}}

  - The route you would like to publish to, for example, `route = "example.com/my-worker/*"`.

- `routes` {{<type>}}Array{{</type>}}
  - The routes you would like to publish to, for example, `routes = ["example.com/foo/*", example.com/bar/*]`.

{{</definitions>}}

{{<Aside type="note">}}

Make sure to use only `route` or `routes`, not both.

{{</Aside>}}

### Publishing the same code to multiple domains

To publish your code to multiple domains, refer to the [documentation for environments](/workers/platform/environments/).

---

## dev

`wrangler dev` is a command that establishes a connection between `localhost` and a global network server that operates your Worker in development. A `cloudflared` tunnel forwards all requests to the global network server, which continuously updates as your Worker code changes. This allows full access to Workers KV, Durable Objects and other Cloudflare developer platform products. The `dev` command is a way to test your Worker while developing.

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

These arguments can also be set in your `wrangler.toml` file. Refer to the [`wrangler dev` configuration](/workers/wrangler-legacy/configuration/#dev) documentation for more information.

### Usage

You should run `wrangler dev` from your Worker directory. Wrangler will run a local server accepting requests, executing your Worker, and forwarding them to a host. If you want to use another host other than your zone or `tutorials.cloudflare.com`, you can specify with `--host example.com`.

```sh
$ wrangler dev
💁  JavaScript project found. Skipping unnecessary build!
💁  watching "./"
👂  Listening on http://127.0.0.1:8787
```

With `wrangler dev` running, you can send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see `console.log` messages and exceptions appearing in your terminal. If either of these things do not happen, or you think the output is incorrect, [file an issue](https://github.com/cloudflare/wrangler-legacy).

---

## tail

Start a session to livestream logs from a deployed Worker.

```sh
$ wrangler tail [--format $FORMAT] [--status $STATUS] [OPTIONS]
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

After starting `wrangler tail` in a directory with a project, you will receive a live feed of console and exception logs for each request your Worker receives.

Like all Wrangler commands, run `wrangler tail` from your Worker’s root directory (the directory with your `wrangler.toml` file).

{{<Aside type="warning" header="Legacy issues with existing cloudflared configuration">}}

`wrangler tail` versions older than version 1.19.0 use `cloudflared` to run. Update to the [latest Wrangler version](/workers/wrangler-legacy/install-update/#update) to avoid any issues.

{{</Aside>}}

---

## preview

Preview your project using the [Cloudflare Workers preview service](https://cloudflareworkers.com/).

```sh
$ wrangler preview [--watch] [--env $ENVIRONMENT_NAME] [ --url $URL] [$METHOD] [$BODY]
```

Default values indicated by {{<type>}}=value{{</type>}}.

{{<definitions>}}

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, Wrangler will load the matching environment's configuration. Refer to [Environments](/workers/platform/environments/) for more information.

- `--watch` {{<prop-meta>}}recommended{{</prop-meta>}}

  - When enabled, any changes to the Worker project will continually update the preview service with the newest version of your project. By default, `wrangler preview` will only bundle your project a single time.

- `$METHOD` {{<type>}}="GET"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The type of request to preview your Worker with (`GET`, `POST`).

- `$BODY` {{<type>}}="Null"{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The body string to post to your preview Worker request. For example, `wrangler preview post hello=hello`.

{{</definitions>}}

### kv_namespaces

If you are using [kv_namespaces](/workers/wrangler-legacy/configuration/#kv_namespaces) with `wrangler preview`, you will need to specify a `preview_id` in your `wrangler.toml` file before you can start the session. This is so that you do not accidentally write changes to your production namespace while you are developing. You may make `preview_id` equal to `id` if you would like to preview with your production namespace, but you should ensure that you are not writing values to KV that would break your production Worker.

To create a `preview_id` run:

```sh
$ wrangler kv:namespace create --preview "NAMESPACE"
```

### Previewing on Windows Subsystem for Linux (WSL 1/2)

#### Setting $BROWSER to your browser binary

WSL is a Linux environment, so Wrangler attempts to invoke `xdg-open` to open your browser. To make `wrangler preview` work with WSL, you should set your `$BROWSER` to the path of your browser binary:

```sh
$ export BROWSER="/mnt/c/tools/firefox.exe"
$ wrangler preview
```

Spaces in filepaths are not common in Linux, and some programs like `xdg-open` will break on [paths with spaces](https://github.com/microsoft/WSL/issues/3632#issuecomment-432821522). You can work around this by linking the binary to your `/usr/local/bin`:

```sh
$ ln -s "/mnt/c/Program Files/Mozilla Firefox/firefox.exe" firefox
$ export BROWSER=firefox
```

#### Setting $BROWSER to `wsl-open`

Another option is to install [wsl-open](https://github.com/4U6U57/wsl-open#standalone) and set the `$BROWSER` env variable to `wsl-open` via `wsl-open -w`. This ensures that `xdg-open` uses `wsl-open` when it attempts to open your browser.

If you are using WSL 2, you will need to install `wsl-open` following their [standalone method](https://github.com/4U6U57/wsl-open#standalone) rather than through `npm`. This is because their npm package has not yet been updated with WSL 2 support.

---

## `route`

List or delete a route associated with a domain:

```sh
$ wrangler route list [--env $ENVIRONMENT_NAME]
```

Default values indicated by {{<type>}}=value{{</type>}}.

{{<definitions>}}

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}
  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

{{</definitions>}}

This command will forward the JSON response from the [List Routes API](/api/operations/worker-routes-list-routes). Each object within the JSON list will include the route id, route pattern, and the assigned Worker name for the route. Piping this through a tool such as `jq` will render the output nicely.

```sh
$ wrangler route delete $ID [--env $ENVIRONMENT_NAME]
```

Default values indicated by {{<type>}}=value{{</type>}}.

{{<definitions>}}

- `$ID` {{<prop-meta>}}required{{</prop-meta>}}

  - The hash of the route ID to delete.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}
  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

{{</definitions>}}

---

## subdomain

Create or change your [`*.workers.dev`](https://workers.dev) subdomain.

```sh
$ wrangler subdomain <name>
```

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

- must configure an `account_id` in your project's `wrangler.toml` file.
- run all `wrangler kv:<command>` operations in your terminal from the project's root directory.

### Getting started

To use Workers KV with your Worker, the first thing you must do is create a KV namespace. This is done with
the `kv:namespace` subcommand.

The `kv:namespace` subcommand takes a new binding name as its argument. A Workers KV namespace will be created using a concatenation of your Worker’s name (from your `wrangler.toml` file) and the binding name you provide:

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

Additionally, KV namespaces can be used with environments. This is useful for when you have code that refers to
a KV binding like `MY_KV`, and you want to be able to have these bindings point to different namespaces (like
one for staging and one for production).

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

To insert a value into a specific KV namespace, you can use:

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

  - The lifetime (in number of seconds) the document should exist before expiring. Must be at least `60` seconds. This option takes precedence over the `expiration` option.

- `--expiration` {{<prop-meta>}}optional{{</prop-meta>}}

  - The timestamp, in UNIX seconds, indicating when the key-value pair should expire.

- `--path` {{<prop-meta>}}optional{{</prop-meta>}}
  - When defined, Wrangler reads the `--path` file location to upload its contents as KV documents. This is ideal for security-sensitive operations because it avoids saving keys and values into your terminal history.

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
$ wrangler kv:key put --binding=MY_KV "key" value.txt --path
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

  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

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

  - The UTF-8 encoded string to be stored, up to 25 MB in length.

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

  - The file with key-value pairs to delete.

- `--binding` {{<prop-meta>}}required (if no {{<code>}}--namespace-id{{</code>}}){{</prop-meta>}}

  - The name of the namespace to delete from.

- `--namespace-id` {{<prop-meta>}}required (if no {{<code>}}--binding{{</code>}}){{</prop-meta>}}

  - The ID of the namespace to delete from.

- `--env $ENVIRONMENT_NAME` {{<prop-meta>}}optional{{</prop-meta>}}

  - If defined, the changes will only apply to the specified environment. Refer to [Environments](/workers/platform/environments/) for more information.

- `--preview` {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production. Pass this to use your `wrangler.toml` file’s `kv_namespaces.preview_id` instead of `kv_namespaces.id`

{{</definitions>}}

This command takes a JSON file as an argument with a list of key-value pairs to delete. An example of JSON input:

```json
[
  {
    "key": "test_key",
    "value": ""
  }
]
```

{{<definitions>}}

- `key` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The key’s name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid.

- `value` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - This field must be specified for deserialization purposes, but is unused because the provided keys are being deleted, not written.

{{</definitions>}}

##### Usage

```sh
$ wrangler kv:bulk delete --binding=MY_KV allthethingsdelete.json
Are you sure you want to delete all keys in allthethingsdelete.json? [y/n]
y
🌀  deleting 1 key value pairs
✨  Success
```

---

## Environment variables

Wrangler supports any `wrangler.toml` keys passed in as environment variables. This works by passing in `CF_` + any uppercased TOML key. For example:

`CF_NAME=my-worker CF_ACCOUNT_ID=1234 wrangler dev`

---

## --help

```sh
$ wrangler --help
👷 ✨  wrangler 1.12.3
The Wrangler Team <wrangler@cloudflare.com>

USAGE:
    wrangler [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    kv:namespace    🗂️  Interact with your Workers KV Namespaces
    kv:key          🔑  Individually manage Workers KV key-value pairs
    kv:bulk         💪  Interact with multiple Workers KV key-value pairs at once
    route           ➡️  List or delete worker routes.
    secret          🤫  Generate a secret that can be referenced in the worker script
    generate        👯  Generate a new worker project
    init            📥  Create a wrangler.toml for an existing project
    build           🦀  Build your worker
    preview         🔬  Preview your code temporarily on cloudflareworkers.com
    dev             👂  Start a local server for developing your worker
    publish         🆙  Publish your worker to the orange cloud
    config          🕵️  Authenticate Wrangler with a Cloudflare API Token or Global API Key
    subdomain       👷  Configure your workers.dev subdomain
    whoami          🕵️  Retrieve your user info and test your auth config
    tail            🦚  Aggregate logs from production worker
    login           🔓  Authorize Wrangler with your Cloudflare username and password
    logout          ⚙️  Remove authorization from Wrangler.
    help            Prints this message or the help of the given subcommand(s)
```
