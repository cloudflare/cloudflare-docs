---
pcx-content-type: how-to
title: Workers KV
weight: 3
---

## Workers KV

The Wrangler `kv:...` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using [Workers KV](https://www.cloudflare.com/products/workers-kv/).

KV operations are scoped to your account, so in order to use any of these commands, you must:

- Configure an `account_id` in your project's `wrangler.toml` file or set the `CLOUDFLARE_ACCOUNT_ID` environment variable.
- Run all `wrangler kv:<command>` operations in your terminal from the project's root directory.

### Get started

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

Refer to the [`kv` command documentation](/workers/wrangler/commands#kv) and [`wrangler.toml` configuration documentation](/workers/wrangler/configuration) for more details.
