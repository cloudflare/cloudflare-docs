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
Your Remix Project will generate a `functions/[[path]].js` file the first time you run `remix dev` or `remix build`. The `[[path]]` filename indicates that this file will handle requests to all incoming URLs. Refer to [Path segments](/pages/functions/routing/#dynamic-routes) to learn more.

The `functions/[[path]].js` will not function as expected if you attempt to deploy your site before running `remix dev` or `remix build`.
{{</Aside>}}

After setting up your project, change the directory and render your project by running the following command:

```sh
$ cd my-remix-app
$ npm run dev
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

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

## Create and add a binding to your Remix application

To add a binding to your Remix application, refer to [Bindings](/pages/functions/bindings/).
A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV namespaces](/kv/reference/how-kv-works/), [Durable Objects](/durable-objects/), [R2 storage buckets](/r2/), and [D1 databases](/d1/).

## Use bindings in your Nuxt application

A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/kv/learning/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).


To access bound resources within a Remix application, you need to configure a [Remix `loader` function](https://remix.run/docs/en/main/route/loader).

The following code examples show how to access a KV binding called `MY_KV` in Remix applications written in JavaScript and TypeScript respectively, making the assumption that your loader function is: `(context) => ({ env: context.env })`.


### Javascript example

Access the binding directly from a loader's `context`:

```javascript
---
filename: app/routes/_index.jsx
highlight: [4]
---
// ...

export const loader = async ({context }: LoaderFunctionArgs) => {
  const myKv = context.env.MY_KV;

  return (
    // ...
  );
};
```

### Typescript example

Firstly, if it's not already installed, install the `@cloudflare/workers-types` package:
```sh
$ npm install --save-dev @cloudflare/workers-types
```

Afterwords use its types to augment the `remix.env.d.ts` file:
```typescript
filename: remix.env.d.ts
highlight: [3-10]
---
/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />

import type { KVNamespace } from '@cloudflare/workers-types';

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    // IMPORTANT: this interface depends on the getLoadContext defined in server.ts
    env: {
      MY_KV: KVNamespace;
    };
  }
}
```

Then access the binding directly from a loader's `context`:

```javascript
filename: app/routes/_index.tsx
highlight: [4]
---
// ...

export const loader = async ({context }: LoaderFunctionArgs) => {
  const myKv = context.env.MY_KV;

  return (
    // ...
  );
};
```


{{<render file="_learn-more.md" withParameters="Remix">}}