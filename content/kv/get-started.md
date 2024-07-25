---
weight: 2
title: Get started
pcx_content_type: get-started
---

# Get started

Workers KV provides low-latency, high-throughput global storage to your [Cloudflare Workers](/workers/) applications. Workers KV is ideal for storing user configuration data, routing data, A/B testing configurations and authentication tokens, and is well suited for read-heavy workloads.

This guide will instruct you through:

- Creating a KV namespace.
- Writing key-value pairs to your KV namespace from a Cloudflare Worker.
- Reading key-value pairs from a KV namespace.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [`npm`](https://docs.npmjs.com/getting-started).
3. Install [`Node.js`](https://nodejs.org/en/). Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/) requires a Node version of `16.13.0` or later.
4. Update your [Wrangler](/workers/wrangler/install-and-update/) installation to the most updated version.

## 1. Create a Worker project

{{<Aside type="note" header="New to Workers?">}}

Refer to [How Workers works](/workers/reference/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](/workers/get-started/guide/) to set up your first Worker.

{{</Aside>}}

Create a new Worker to read and write to your KV namespace.

Create a new project named `kv-tutorial` by running:

```sh
$ npm create cloudflare@latest kv-tutorial

```

When setting up your `kv-tutorial` Worker, answer the questions as below:

- Your directory has been titled `kv-tutorial`.
- Choose `"Hello World" Worker` for the type of application.
- Select `yes` to using TypeScript.
- Select `yes` to using Git.
- Select `no` to deploying.

This will create a new `kv-tutorial` directory. Your new `kv-tutorial` directory will include:

- A `"Hello World"` [Worker](/workers/get-started/guide/#3-write-code) at `src/index.ts`.
- A [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. `wrangler.toml` is how your `kv-tutorial` Worker will access your kv database.

{{<Aside type="note" heading="Familiar with Workers?">}}
If you are familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, initialize a new project non-interactively by setting `CI=true` as an environmental variable when running `create cloudflare@latest`.

For example: `CI=true npm create cloudflare@latest kv-tutorial --type=simple --git --ts --deploy=false` will create a basic "Hello World" project ready to build on.

{{</Aside>}}

## 2. Create a KV namespace

A [KV namespace](/kv/reference/kv-namespaces/) is a key-value database replicated to Cloudflare’s global network.

You can create a KV namespace via Wrangler or the dashboard.

### Create a KV namespace via Wrangler

[Wrangler](/workers/wrangler/) allows you to put, list, get, and delete entries within your KV namespace.

{{<Aside type="note">}}
KV operations are scoped to your account.
{{</Aside>}}

To create a KV namespace via Wrangler:

1. Open your terminal and run the following command:

```sh
$ npx wrangler kv namespace create <YOUR_NAMESPACE>
```

The `npx wrangler kv namespace create <YOUR_NAMESPACE>` subcommand takes a new binding name as its argument. A KV namespace will be created using a concatenation of your Worker’s name (from your `wrangler.toml` file) and the binding name you provide. The `id` will be randomly generated for you.

```sh
$ npx wrangler kv namespace create <YOUR_NAMESPACE>
🌀  Creating namespace with title <YOUR_WORKER-YOUR_NAMESPACE>
✨  Success!
Add the following to your configuration file:
kv_namespaces = [
  { binding = <YOUR_BINDING>, id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```

2. In your `wrangler.toml` file, add the following with the values generated in your terminal:

```toml
---
filename: wrangler.toml
---
kv_namespaces = [
    { binding = "<YOUR_BINDING>", id = "<YOUR_ID>" }
]
```

Binding names do not need to correspond to the namespace you created. Binding names are only a reference.  Specifically:

- The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker. In this tutorial, name your binding `DB`.
- The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_KV"` or `binding = "routingConfig"` would both be valid names for the binding.
- Your binding is available in your Worker at `env.<BINDING_NAME>` from within your Worker.

{{<Aside type="note" header="Bindings">}}

A binding is how your Worker interacts with external resources such as [KV namespaces](/kv/reference/kv-namespaces/). A binding is a runtime variable that the Workers runtime provides to your code. You can declare a variable name in your `wrangler.toml` file that will be bound to these resources at runtime, and interact with them through this variable. Every binding's variable name and behavior is determined by you when deploying the Worker.

Refer to [Environment](/kv/reference/environments/) for more information.

{{</Aside>}}

### Create a KV namespace via the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select **Workers & Pages** > **KV**.
3. Select **Create a namespace**.
4. Enter a name for your namespace.
5. Select **Add**.

{{<Aside type="note">}}
KV namespaces prior to version 7 cannot be edited via the Cloudflare dashboard. To edit KV namespaces, use the [KV API](/kv/api/).
{{</Aside>}}

## 3. Interact with your KV namespace with Wrangler

You can interact with your KV namespace via [Wrangler](/workers/wrangler/install-and-update/) or directly from your [Workers](/workers/) application.

### Write a value via Wrangler

To write a value to your empty KV namespace using Wrangler, run the `wrangler kv key put` subcommand in your terminal, and input your key and value respectively.  `<KEY>` and `<VALUE>` are values of your choice.

```sh
$ npx wrangler kv key put --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
Writing the value "<VALUE>" to key "<KEY>" on namespace e29b263ab50e42ce9b637fa8370175e8.
```

Instead of using `--binding`, you may use `--namespace-id` to specify which KV namespace should receive the operation:

```sh
$ npx wrangler kv key put --namespace-id=e29b263ab50e42ce9b637fa8370175e8 "<KEY>" "<VALUE>"
Writing the value "<VALUE>" to key "<KEY>" on namespace e29b263ab50e42ce9b637fa8370175e8.
```

To create a key and a value in local mode, use the `--local` flag:

```sh
$ npx wrangler kv key put --namespace-id=xxxxxxxxxxxxxxxx "<KEY>" "<VALUE>" --local
```

### Get a value via Wrangler

To access the value using Wrangler, run the `wrangler kv key get` subcommand in your terminal, and input your key value:

```sh
$ npx wrangler kv key get <KEY> [OPTIONS] # Replace [OPTIONS] with --binding or --namespace-id
```

A KV namespace can be specified in two ways:

-  With a `--binding`:

  ```sh
  $ npx wrangler kv key get --binding=<YOUR_BINDING> "<KEY>"
  ```

This can be combined with `--preview` flag to interact with a preview namespace instead of a production namespace.

-  With a `--namespace-id`:

  ```sh
  $ npx wrangler kv key get --namespace-id=<YOUR_ID> "<KEY>"
  ```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

Refer to the [`kv bulk` documentation](/kv/reference/kv-commands/#kvbulk) to write a file of multiple key-value pairs to a given KV namespace.

## 4. Access your KV namespace from a Worker

You can access the binding from within your Worker.

{{<Aside type="note">}}

When using [`wrangler dev`](/workers/wrangler/commands/#dev) to develop locally, wrangler will default to using a local version of KV to avoid interfering with any of your live production data in KV. This means that reading keys that you have not written locally will return null.

To have `wrangler dev` connect to your Workers KV namespace running on Cloudflare's global network, call `wrangler dev --remote` instead.

{{</Aside>}}

In your Worker script, add your KV namespace in the `Env` interface:

```ts
interface Env {
	YOUR_KV_NAMESPACE: KVNamespace;
  // ... other binding types
}
```

Use the `put()` method on `YOUR_KV_NAMESPACE` to create a new key-value pair, or to update the value for a particular key:

```ts
let value = await env.YOUR_KV_NAMESPACE.put(key, value);
```

Use the KV `get()` method to fetch the data you stored in your KV database:

```ts
let value = await env.YOUR_KV_NAMESPACE.get("KEY");
```

Your Worker code should look like this:

```ts
---
filename: src/index.ts
---
export interface Env {
  	YOUR_KV_NAMESPACE: KVNamespace;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
    try {
      await env.YOUR_KV_NAMESPACE.put("KEY", "VALUE");       
      const value = await env.YOUR_KV_NAMESPACE.get("KEY");       
      if (value === null) {           
        return new Response("Value not found", { status: 404 });       
      }       
      return new Response(value);
    } catch (err) {
      // In a production application, you could instead choose to retry your KV
      // read or fall back to a default code path.
      console.error(`KV returned error: ${err}`)
      return new Response(err, { status: 500 })
    }
	},
} satisfies ExportedHandler<Env>;
```

The code above:

1. Writes a key to `YOUR_KV_NAMESPACE` using KV's `put()` method.
2. Reads the same key using KV's `get()` method, and returns an error if the key is null (or in case the key is not set, or does not exist).
3. Uses JavaScript's [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) exception handling to catch potential errors. When writing or reading from any service, such as Workers KV or external APIs using `fetch()`, you should expect to handle exceptions explicitly.

To run your project locally, enter the following command within your project directory:

```sh
$ npx wrangler dev
```

When you run `wrangler dev`, Wrangler will give you a URL (usually a `localhost:8787`) to review your Worker. After you visit the URL Wrangler provides, you will see your value printed on the browser.


## 5. Deploy your KV

Run the following command to deploy KV to Cloudflare's global network:

```sh
$ npx wrangler deploy
```

You can now visit the URL for your newly created Workers KV application.

For example, if the URL of your new Worker is `kv-tutorial.<YOUR_SUBDOMAIN>.workers.dev`, accessing `https://kv-tutorial.<YOUR_SUBDOMAIN>.workers.dev/` will send a request to your Worker that writes (and reads) from Workers KV.

By finishing this tutorial, you have created a KV namespace, a Worker that writes and reads from that namespace, and deployed your project globally.

## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.cloudflare.com).

* Learn more about the [KV API](/kv/api/).
* Understand how to use [Environments](/kv/reference/environments/) with Workers KV.
* Read the wrangler [`kv` command documentation](/kv/reference/kv-commands/).
