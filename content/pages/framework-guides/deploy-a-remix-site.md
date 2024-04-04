---
pcx_content_type: how-to
title: Deploy a Remix site
---

# Deploy a Remix site

[Remix](https://remix.run/) is a framework that is focused on fully utilizing the power of the web. Like Cloudflare Workers, it uses modern JavaScript APIs, and it places emphasis on web fundamentals such as meaningful HTTP status codes, caching and optimizing for both usability and performance.

In this guide, you will create a new Remix application and deploy to Cloudflare Pages.

## Setting up a new project

Use the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate Remix's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Remix project, run the following command:

```sh
$ npm create cloudflare@latest my-remix-app -- --framework=remix
```

`create-cloudflare` will install additional dependencies, including the [Wrangler](/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and any necessary adapters, and ask you setup questions.

{{<Aside type="warning" header="Before you deploy">}}
Your Remix project will include a `functions/[[path]].ts` file. The `[[path]]` filename indicates that this file will handle requests to all incoming URLs. Refer to [Path segments](/pages/functions/routing/#dynamic-routes) to learn more.

The `functions/[[path]].ts` will not function as expected if you attempt to deploy your site before running `remix vite:build`.
{{</Aside>}}

After setting up your project, change the directory and render your project by running the following command:

```sh
# choose Cloudflare Pages
$ cd my-remix-app
$ npm run dev
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository_no_init.md">}}

## Deploy with Cloudflare Pages

{{<render file="_deploy-via-c3.md" withParameters="Remix">}}

### Deploy via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="remix">}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Remix site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

### Deploy via the Wrangler CLI

If you use [`create-cloudflare`(C3)](https://www.npmjs.com/package/create-cloudflare) to create your new Remix project, C3 will automatically scaffold your project with [`wrangler`](/workers/wrangler/). To deploy your project, run the following command:

```sh
$ npm run deploy
```

## Create and add a binding to your Remix application

To add a binding to your Remix application, refer to [Bindings](/pages/functions/bindings/).
A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV namespaces](/kv/reference/how-kv-works/), [Durable Objects](/durable-objects/), [R2 storage buckets](/r2/), and [D1 databases](/d1/).

### Binding resources in local development

Remix uses uses wrangler's [`getPlatformProxy`](/workers/wrangler/api/#getplatformproxy) to simulate the Cloudflare environment locally. This is configured via the [`cloudflareDevProxyVitePlugin`](https://remix.run/docs/en/main/future/vite#cloudflare-proxy) in `vite.config.ts`.

To bind resources in local development, you need to configure the bindings in the `wrangler.toml` file. Refer to [wrangler bindings](/workers/wrangler/configuration/#bindings) to learn more.

Once you have configured the bindings in the `wrangler.toml` file, the proxies are then available within `context.cloudflare` in your `loader` or `action` functions:

```typescript
export const loader = ({ context }: LoaderFunctionArgs) => {
  const { env, cf, ctx } = context.cloudflare;
  env.MY_BINDING // Access bound resources here
  // ... more loader code here...
};
```

#### Correcting env types

You may notice that `context.cloudflare.env` may not be typed correctly when you add additional bindings in `wrangler.toml`. This is because the env types need to manually altered.

Let's say you have a KV namespace binding in `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "PRODUCTS_KV"
id = "<NAMESPACE_ID>"
```

First we need to run `wrangler types` to generate the types for the bindings:

```sh
$ wrangler types
 ⛅️ wrangler 3.45.0
-------------------
interface Env {
  PRODUCTS_KV: KVNamespace;
}
```

Now just copy the `Env` interface given by `wrangler types` into the `load-context.ts` file at the root of your Remix project

```typescript
---
filename: load-context.ts
---
import { type PlatformProxy } from 'wrangler';

// Add the interface generated by wrangler types
interface Env {
  PRODUCTS_KV: KVNamespace;
}

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
```

### Binding resources in production

To bind resources in production you need to configure the bindings in the Cloudflare dashboard. Refer to the [Bindings](/pages/functions/bindings/) documentation to learn more.

## Example: Accessing your D1 database in a Remix application

Let's put the steps above into practice by accessing a D1 database in a Remix application.

1. Create a D1 database. Refer to the [D1 documentation](/d1/) to learn more.
2. Configure the bindings in the `wrangler.toml` file:

```toml
[[ d1_databases ]]
binding = "DB"
database_name = "<your-db-name>"
database_id = "<your-db-id>"
```
3. Run `wrangler types` to generate the types for the bindings:

```sh
$ wrangler types
 ⛅️ wrangler 3.45.0
-------------------
interface Env {
  DB: D1Database;
}
```
4. Copy the `Env` interface generated by `wrangler types` into the `load-context.ts` file at the root of your Remix project:

```typescript
---
filename: load-context.ts
---
import { type PlatformProxy } from 'wrangler';

// Add the interface generated by wrangler types
interface Env {
  DB: D1Database;
}

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
```

5. Access the D1 database in your `loader` function:

```typescript
---
filename: app/routes/products/$productId.tsx
---
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = ({ context, params }: LoaderFunctionArgs) => {
  const { env, cf, ctx } = context.cloudflare;
  let { results } = await env.DB.prepare(
    "SELECT * FROM products where id = ?1"
  ).bind(params.productId).all();
  return json(results);
};

export default function Index() {
  const results = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>
        A value from D1:
        <pre>{JSON.stringify(results)}</pre>
      </div>
    </div>
  );
}
```

{{<render file="/_framework-guides/_learn-more.md" withParameters="Remix">}}