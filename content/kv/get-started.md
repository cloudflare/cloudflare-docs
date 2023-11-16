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

1. A [Cloudflare account](/fundamentals/setup/account-setup/), if you do not have one already. 
2. [Wrangler](/workers/wrangler/install-and-update/) installed.

## 1. Enable Workers KV in the dashboard

Enable Workers KV for your account by purchasing the Workers Paid plan:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Workers & Pages** > **Plans**.
3. Select **Purchase Workers Paid** and complete the payment process to enable Workers KV.

## 2. Create a Worker project

To create a Worker, run:

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn create cloudflare
```

{{</tab>}}
{{</tabs>}}

Running `create cloudlfare` will install [Wrangler](/workers/wrangler/install-and-update/), the Workers CLI. You will use Wrangler to test and deploy your project.

In your terminal, you will be asked a series of questions related to your project:

1. Name your new Worker directory by specifying where you want to create your application.
2. Select `"Hello World" script` as the type of application you want to create.
3. Answer `yes` to using TypeScript.
4. Answer `no` to using Git.
5. Answer `no` to deploying your Worker.

This will create a new directory, which will include both a `src/index.ts` Worker code, and a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. 

## 3. Create a KV namespace 

A [KV namespace](/kv/learning/kv-namespaces/) is a key-value database replicated to Cloudflare’s global network.

You can create a KV namespace via Wrangler or the dashboard.

### Create a KV namespace via Wrangler

[Wrangler](/workers/wrangler/) allows you to put, list, get, and delete entries within your KV namespace.

{{<Aside type="note">}}
KV operations are scoped to your account.
{{</Aside>}}

To create a KV namespace via Wrangler:

1. Open your terminal and run the following command:

```sh
$ wrangler kv:namespace create <YOUR_NAMESPACE>
```

The `wrangler kv:namespace create <YOUR_NAMESPACE>` subcommand takes a new binding name as its argument. A KV namespace will be created using a concatenation of your Worker’s name (from your `wrangler.toml` file) and the binding name you provide. The `id` will be randomly generated for you. 

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

A binding is how your Worker interacts with external resources such as [KV namespaces](/kv/learning/kv-namespaces/). A binding is a runtime variable that the Workers runtime provides to your code. You can declare a variable name in your `wrangler.toml` file that will be bound to these resources at runtime, and interact with them through this variable. Every binding's variable name and behavior is determined by you when deploying the Worker. 

Refer to [Environment](/kv/platform/environments/) for more information.

{{</Aside>}}

### Create a KV namespace via the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select **Workers & Pages** > **KV**.
3. Select **Create a namespace**. 
4. Enter a name for your namespace. 
5. Select **Add**.

## 4. Interact with your KV namespace

You can interact with your KV namespace via Wrangler or via a Worker.

### Interact with your KV namespace via Wrangler

To write a value to your empty KV namespace using Wrangler, run the `wrangler kv:key put` subcommand in your terminal, and input your key and value respectively.  `<KEY>`and `<VALUE>` are values of your choice.

```sh
$ wrangler kv:key put --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
Writing the value "<VALUE>" to key "<KEY>" on namespace e29b263ab50e42ce9b637fa8370175e8.
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

To access the value using Wrangler, run the `wrangler kv:key get` subcommand in your terminal, and input your key value:

```sh
wrangler kv:key get <KEY> [OPTIONS] # Replace [OPTIONS] with --binding or --namespace-id
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

Refer to the [`kv:bulk` documentation](/kv/platform/kv-commands/#kvbulk) to write a file of multiple key-value pairs to a given KV namespace.

### Interact with your KV namespace via a Worker

You can access the binding from within a Worker. 

In your Worker script, add your KV namespace in the `Env` interface:

```js
	YOUR_KV_NAMESPACE: KVNamespace;
```

Use the KV `put()` method to create a new key-value pair, or to update the value for a particular key:

```js
let value = await NAMESPACE.put(key, value);
```

Use the KV `get()` method to fetch the data you stored in your KV database:

```js
let value = await <YOUR_BINDING>.get("KEY");
```

Your Worker code should look like this:

```js
export interface Env {
  	YOUR_KV_NAMESPACE: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

    await env.YOUR_KV_NAMESPACE.put("KEY", "VALUE");        
    const value = await env.YOUR_KV_NAMESPACE.get("KEY");        
    if (value === null) {            
      return new Response("Value not found", { status: 404 });        
      }        
    return new Response(value);    
	}, 	
};
```

## 5. Develop locally with Wrangler

While in your project directory, test your KV locally by running:

```sh
$ wrangler dev
```

When you run `wrangler dev`, Wrangler will give you a URL (usually a `localhost:8787`) to review your Worker. After you visit the URL Wrangler provides, you will see your value printed on the browser.

## 6. Deploy your KV

Run the following command to deploy KV to Cloudflare's global network:


```sh
$ npx wrangler deploy
```

Preview your Workers KV at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

At the end of this tutorial, you have learned how to create, test and a deploy a Workers KV globally.

## Related resources

* [KV API](/kv/api/)
* [Environments](/kv/platform/environments/)
* [`kv` command documentation](/kv/platform/kv-commands/)