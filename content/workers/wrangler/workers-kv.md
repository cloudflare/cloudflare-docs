---
pcx_content_type: how-to
title: Workers KV
weight: 3
---

# Workers KV

Workers KV is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare's data centers after access. 

To learn more about how KV works, refer to [How KV works](/workers/learning/how-kv-works).

To review the API spec, refer to the [KV in Runtime API](/workers/runtime-apis/kv).

You can interact with KV via Wrangler and the Cloudflare dashboard. This page will guide you through creating your KV namespace, writing a new value to your namespace and interacting with [environments](/workers/platform/environments/).

## Create a KV namespace with Wrangler

Wrangler allows you to create, list, and delete KV namespaces. It also allows you to put, list, get, and delete entries within your KV namespace.

KV operations are scoped to your account. To use Workers KV with your Worker, the first thing you must do is create a KV namespace. This is done with the `kv:namespace` subcommand. 

To create a KV namespace with Wrangler:

1. Run `wrangler kv:namespace create <YOUR_NAMESPACE>` in your terminal.

The `kv:namespace` subcommand takes a new binding name as its argument. A Workers KV namespace will be created using a concatenation of your Worker’s name (from your `wrangler.toml` file) and the binding name you provide:

```sh
$ wrangler kv:namespace create <YOUR_NAMESPACE>
🌀  Creating namespace with title <YOUR_WORKER-YOUR_NAMESPACE>
✨  Success!
Add the following to your configuration file:
kv_namespaces = [
  { binding = <YOUR_BINDING>, id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

2. In your `wrangler.toml` file, add the following with the values generated in your terminal:

```bash
kv_namespaces = [
    { binding = "<YOUR_BINDING>", id = "<YOUR_ID>" }
]
```

Note that binding names do not need to correspond to the namespace you created. It is an entirely new value that you assign.

{{<Aside type="note" header="Bindings">}}

A binding is a how your Worker interacts with external resources such as [KV Namespaces](/workers/runtime-apis/kv/), [Durable Objects](/workers/runtime-apis/durable-objects/), or [R2 Buckets](/r2/data-access/bindings/bindings-reference/). A binding is a runtime variable that the Workers runtime provides to your code. You can declare a variable name in your `wrangler.toml` file that will be bound to these resources at runtime, and interact with them through this variable. Every binding's variable name and behavior is determined by you when deploying the Worker. Refer to the [Environment Variables](/workers/platform/environment-variables) documentation for more information.

A binding is defined in the `wrangler.toml` file of your Worker project's directory.

{{</Aside>}}

## Interact with your KV namespace

To write a value to your empty KV namespace using Wrangler, run the `wrangler kv:key put` subcommand and input your key and value respectively:

```sh
$ wrangler kv:key put --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
Writing the value "<VALUE>" to key "<KEY>" on namespace e29b263ab50e42ce9b637fa8370175e8.
```

You can now access the binding from within a Worker. In your Worker, use the KV `.get()` command to fetch the data you stored in your KV database:

```js
let value = await <YOUR_BINDING>.get("KEY");
```

Instead of `--binding`, you may use `--namespace-id` to specify which KV namespace should receive the operation:

```sh
$ wrangler kv:key put --namespace-id=e29b263ab50e42ce9b637fa8370175e8 "<KEY>" "<VALUE>"
Writing the value "<VALUE>" to key "<KEY>" on namespace e29b263ab50e42ce9b637fa8370175e8.
```

To summarize, a namespace can be specified in two ways:

1.  With a `--binding`:

    ```sh
    $ wrangler kv:key get --binding=<YOUR_BINDING> "<KEY>"
    ```

    - This can be combined with `--preview` flag to interact with a preview namespace instead of a production namespace.

2.  With a `--namespace-id`:

    ```sh
    $ wrangler kv:key get --namespace-id=<YOUR_ID> "<KEY>"
    ```

Refer to the [`kv:bulk` documentation](/workers/wrangler/cli-wrangler/commands/#kvbulk) to write a file of multiple key-value pairs to a given namespace.

## Use environments with KV namespaces

KV namespaces can be used with environments. This is useful for when you have code in your Worker that refers to a KV binding like `MY_KV`, and you want to be able to have these bindings point to different namespaces (like one for staging and one for production).

A `wrangler.toml` file with two environments that have two different namespaces with the same binding name:

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

Using the same binding name for two different namespaces keeps your Worker code simple. In the `staging` environment, `MY_KV.get("KEY")` will read from the namespace ID `e29b263ab50e42ce9b637fa8370175e8`. In the `production` environment, `MY_KV.get("KEY")` will read from the namespace ID `a825455ce00f4f7282403da85269f8ea`.

To insert a value into a `staging` KV namespace, use:

```sh
$ wrangler kv:key put --env=staging --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
```

Since `--namespace-id` is always unique (unlike binding names), you do not need to specify an `--env` argument:

```sh
$ wrangler kv:key put --namespace-id=<YOUR_ID> "<KEY>" "<VALUE>"
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
$ wrangler kv:key get --binding "MY_KV" --env=production "<KEY>"
```

## Related resources

* [Environments](/workers/platform/environments/)
* [`kv` command documentation](/workers/wrangler/commands#kv)
* [`wrangler.toml` configuration documentation](/workers/wrangler/configuration)
