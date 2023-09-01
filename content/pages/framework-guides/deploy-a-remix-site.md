---
pcx_content_type: how-to
title: Deploy a Remix site
---

# Deploy a Remix site

[Remix](https://remix.run/) is a framework that is focused on fully utilizing the power of the web. Like Cloudflare Workers, it uses modern JavaScript APIs, and it places emphasis on web fundamentals such as meaningful HTTP status codes, caching and optimizing for both usability and performance.

In this guide, you will create a new Remix application and deploy to Cloudflare Pages.

## Setting up a new project

Start by installing the latest version of Remix. Create a new project directory and then initialize a Remix project by running:

```sh
$ npx create-remix@latest

```

After running `npx create-remix@latest`, you will be prompted to answer configuration questions and select your deploy method. This guide uses Cloudflare Pages.

After selecting _Cloudflare Pages_ as your deployment option in the terminal drop-down menu, your Remix Project will generate a `functions/[[path]].js` file. The `[[path]]` filename indicates that this file will handle requests to all incoming URLs. Refer to [Path segments](/pages/platform/functions/routing/#dynamic-routes) to learn more.

{{<Aside type="warning" header="Before you deploy">}}
The `functions/[[path]].js` file will not be generated until you interact with Remix the first time, via `remix dev` or `remix build`. The `functions/[[path]].js` will not function as expected if you attempt to deploy your site before running `remix dev` or `remix build`.
{{</Aside>}}

After selecting your deployment option, change the directory to your project and render your project by running the following command:

```sh
# choose Cloudflare Pages
$ cd <YOUR_PROJECT>
$ npm run dev
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="remix">}}

{{<Aside type="warning">}}

Currently Cloudflare uses Node `12.18.0` in the Pages build environment, but Remix requires a newer node version greater than `14.0.0` to build on Cloudflare Pages. To set the Node version, go to your Pages project > **Settings** > **Environment Variables** > **Production** and add `NODE_VERSION` environment variable with a value of `14` or greater in your Production option.

{{</Aside>}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Remix site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Create and add a binding to your Remix application

To add a binding to your Remix application, refer to [Bindings](/pages/platform/functions/bindings/).
A [binding](/pages/platform/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV namespaces](/workers/learning/how-kv-works/), [Durable Objects](/durable-objects/), [R2 storage buckets](/r2/), and [D1 databases](/d1/).

### Binding resources to your Remix application

To access bound resources within a Remix application, you need to configure a [Remix `loader` function](https://remix.run/docs/en/main/route/loader).

The following example uses a KV namespace called `PRODUCTS_KV` [bound to a Pages Function](/pages/platform/functions/bindings/#kv-namespaces). The `PRODUCTS_KV` binding is accessible on the `context` parameter passed to a `LoaderFunction` as `context.env.<BINDING_NAME>`.

The following example shows a Remix `LoaderFunction` accessing a KV namespace in Remix:

```typescript
---
filename: app/routes/products/$productId.tsx
highlight: 9-13,17,24
---
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

// Define the bindings associated with our Function
// so that they are typed
interface Env {
  PRODUCTS_KV: KVNamespace;
}

export const loader: LoaderFunction = async ({
  context,
  params,
}) => {
  // Bindings are accessible on context.env
  let env = context.env as Env
  return json(
    await env.PRODUCTS_KV.get<{ name: string }>(`product-${params.productId}`, {
      type: "json",
    })
  );
};

export default function Product() {
  const product = useLoaderData<typeof loader>();

  if (!product) throw new Response(null, { status: 404 })

  return (
    <div>
      <p>Product</p>
      {product.name}
      <p>Products</p>
      {/* ... */}
    </div>
  );
}
```

Refer to the [Remix documentation](https://remix.run/docs/en/main/guides/data-loading) to learn more about data loading within a Remix application.

#### Durable Objects

Accessing Durable Objects bindings from within Cloudflare Pages requires a separate Worker function to define the [Durable Objects class](/durable-objects/get-started/#3-write-a-class-to-define-a-durable-object).

```ts
export const loader = async ({ context, params }: LoaderArgs) => {
  const id = context.PRODUCTS_DO.idFromName(params.productId);
  const stub = context.PRODUCTS_DO.get(id);
  const response = await stub.fetch(request);
  const data = (await response.json()) as { name: string };
  return json(data);
};
```

Refer to the Durable Objects documentation to learn about deploying a [Durable Object](/durable-objects/).

{{<render file="_learn-more.md" withParameters="Remix">}}