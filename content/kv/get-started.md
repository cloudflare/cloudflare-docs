---
weight: 1
title: Get started
pcx_content_type: get-started
---

# Get started

This guide will instruct you through:

- Creating a KV namespace.
- Interacting with your KV namespace.

## Prerequisites

1. A [Cloudflare account](/fundamentals/account-and-billing/account-setup/), if you do not have one already. 
2. [Wrangler](/workers/wrangler/install-and-update/) installed.

## 1. Enable Workers KV in the dashboard

Enable Workers KV for your account by purchasing the Workers Paid plan:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Workers & Pages** > **Plans**.
3. Select **Purchase Workers Paid** and complete the payment process to enable Workers KV.

## 2. Create a KV namespace 

A [KV namespace](/kv/learning/kv-namespaces/) is a key-value database replicated to Cloudflare’s global network.

You can create a KV namespace via Wrangler or the dashboard.

### Create a KV namespace via Wrangler

[Wrangler](/workers/wrangler/) allows you to put, list, get, and delete entries within your KV namespace.

{{<Aside type="note">}}
KV operations are scoped to your account.
{{</Aside>}}

To create a KV namespace via Wrangler:

1. Open your terminal and run `wrangler kv:namespace create <YOUR_NAMESPACE>`.

The `kv:namespace` subcommand takes a new binding name as its argument. A KV namespace will be created using a concatenation of your Worker’s name (from your `wrangler.toml` file) and the binding name you provide:

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
---
filename: wrangler.toml
---
kv_namespaces = [
    { binding = "<YOUR_BINDING>", id = "<YOUR_ID>" }
]
```

Binding names do not need to correspond to the namespace you created. It is an entirely new value that you assign.

{{<Aside type="note" header="Bindings">}}

A binding is how your Worker interacts with external resources such as [KV Namespaces](/kv/learning/kv-namespaces/). A binding is a runtime variable that the Workers runtime provides to your code. You can declare a variable name in your `wrangler.toml` file that will be bound to these resources at runtime, and interact with them through this variable. Every binding's variable name and behavior is determined by you when deploying the Worker. 

Refer to the [Environment Variables documentation](/workers/platform/environment-variables) for more information.

{{</Aside>}}

### Create a KV namespace via the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select **Workers & Pages** > **KV**.
3. Select **Create a namespace**. 
4. Enter a name for your namespace. 
5. Select **Add**.

## 3. Interact with your KV namespace

You can interact with your KV namespace via Wrangler or via a Worker.

### Interact with your KV namespace via Wrangler

To write a value to your empty KV namespace using Wrangler, run the `wrangler kv:key put` subcommand in your terminal, and input your key and value respectively:

```sh
$ wrangler kv:key put --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
Writing the value "<VALUE>" to key "<KEY>" on namespace e29b263ab50e42ce9b637fa8370175e8.
```

You can now access the binding from within a Worker. In your Worker script, use the KV `get()` method to fetch the data you stored in your KV database:

```js
let value = await <YOUR_BINDING>.get("KEY");
```

Instead of using `--binding`, you may use `--namespace-id` to specify which KV namespace should receive the operation:

```sh
$ wrangler kv:key put --namespace-id=e29b263ab50e42ce9b637fa8370175e8 "<KEY>" "<VALUE>"
Writing the value "<VALUE>" to key "<KEY>" on namespace e29b263ab50e42ce9b637fa8370175e8.
```

A KV namespace can be specified in two ways:

1.  With a `--binding`:

    ```sh
    $ wrangler kv:key get --binding=<YOUR_BINDING> "<KEY>"
    ```

  This can be combined with `--preview` flag to interact with a preview namespace instead of a production namespace.

2.  With a `--namespace-id`:

    ```sh
    $ wrangler kv:key get --namespace-id=<YOUR_ID> "<KEY>"
    ```

Refer to the [`kv:bulk`](/kv/platform/kv-commands/#kvbulk) documentation to write a file of multiple key-value pairs to a given KV namespace.

## Interact with your KV namespace via a Worker

You can now access the binding from within a Worker. In your Worker script, use the KV `get()` method to fetch the data you stored in your KV database:

```js
let value = await <YOUR_BINDING>.get("KEY");
```

At the end of this tutorial, you have learned how to create and interact with a KV namespace.

## Related resources

* [Workers KV API](/kv/workers-kv-api/)
* [Environments](/kv/platform/environments/)
* [`kv` command documentation](/kv/platform/kv-commands/)