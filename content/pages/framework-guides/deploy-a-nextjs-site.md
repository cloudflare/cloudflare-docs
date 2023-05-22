---
pcx_content_type: how-to
title: Deploy a Next.js site
---

# Deploy a Next.js site

[Next.js](https://nextjs.org/) is an open-source React framework for creating websites and apps. In this guide, you will create a new Next.js application and deploy it using Cloudflare Pages.

## Consider if you need the Edge Runtime

Cloudflare Pages supports full-stack Next.js projects which use the [Edge Runtime](https://nextjs.org/docs/api-reference/edge-runtime) or any projects which can be [statically exported](https://nextjs.org/docs/advanced-features/static-html-export). The Edge Runtime allows applications to use server-side features such as [Edge API Routes](https://nextjs.org/docs/api-routes/edge-api-routes), server-side rendering (SSR) pages with [`getServerSideProps()`](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props) and [Middleware](https://nextjs.org/docs/advanced-features/middleware).

For more information about the Edge Runtime, refer to [the official Next.js documentation](https://nextjs.org/docs/advanced-features/react-18/switchable-runtime) which explains the differences between the Edge Runtime and traditional Node.js servers, or [read the Cloudflare announcement blog post](https://blog.cloudflare.com/next-on-pages).

{{<render file="_tutorials-before-you-start.md">}}

## Create a new project using the Edge Runtime

Create a new project using `npx` or `yarn` by running either of the following commands in your terminal:

```sh
$ npx create-next-app my-app
# or
$ yarn create next-app my-app
```

After creating your project, a new `my-app` directory will be generated using the official default template.

### Configure the project to use the Edge Runtime

The default template includes a traditional Node.js-powered API route (`pages/api/hello.js`). Delete this file. It is incompatible with the Edge Runtime. To use API routes, refer to Next.js' [Edge API Routes documentation](https://nextjs.org/docs/api-routes/edge-api-routes), which offers a standards-based equivalent.

As an example, the existing `pages/api/hello.js` file re-written as an Edge API Route would look like this:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: pages/api/hello.js
---
// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes

export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  return new Response(JSON.stringify({ name: 'John Doe' }))
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: pages/api/hello.ts
---
// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes

import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  return new Response(JSON.stringify({ name: 'John Doe' }))
}
```

{{</tab>}}
{{</tabs>}}

Next, you must configure the rest of the project to use the Edge Runtime.

You can opt in on individual pages by exporting the following from each page:

```js
export const config = {
  runtime: "edge",
};
```

Or configure the whole application to use the Edge Runtime by setting the runtime globally:

```js
---
filename: next.config.js
---
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'edge',
  }
}

module.exports = nextConfig
```

Refer to [Next.js' documentation about the Edge Runtime](https://nextjs.org/docs/advanced-features/react-18/switchable-runtime) for more information.

{{<render file="_create-github-repository_no_init.md">}}

### Deploy with Cloudflare Pages

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Next.js_ as your **Framework preset**. Your selection will provide the following information.

   {{<table-wrap>}}

   | Configuration option | Value                                                 |
   | -------------------- | ----------------------------------------------------- |
   | Production branch    | `main`                                                |
   | Build command        | `npx @cloudflare/next-on-pages --experimental-minify` |
   | Build directory      | `.vercel/output/static`                               |

   {{</table-wrap>}}

4. Next.js requires Node.js v16 or later to build successfully. To set your Node version, go to **Settings** in your Pages project > **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `16` or greater.

{{<Aside type="note" header="Note">}}

The `@cloudflare/next-on-pages` CLI transforms the Edge Runtime components of your project into a `_worker.js` file which is deployed with [Pages Functions](/pages/platform/functions/advanced-mode/). The `--experimental-minify` argument attempts to deduplicate code that would otherwise result in your project quickly hitting the [script size limit](/workers/platform/limits/#worker-size). If you notice any bugs in this feature, please let us know by filing a [GitHub issue](https://github.com/cloudflare/next-on-pages/issues/).

{{</Aside>}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `@cloudflare/next-on-pages`, your project dependencies, and building your site before deploying it.

## Create a new static project

Create a new project using `npx` or `yarn` by running either of the following commands in your terminal:

```sh
$ npx create-next-app --example with-static-export my-app
# or
$ yarn create next-app --example with-static-export my-app
```

After creating your project, a new `my-app` directory will be generated using the official [`with-static-export`](https://github.com/vercel/next.js/tree/canary/examples/with-static-export) example as a template.

{{<render file="_create-github-repository_no_init.md">}}

### Deploy with Cloudflare Pages

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Next.js (Static HTML Export)_ as your **Framework preset**. Your selection will provide the following information.

   {{<table-wrap>}}

   | Configuration option | Value            |
   | -------------------- | ---------------- |
   | Production branch    | `main`           |
   | Build command        | `npm run export` |
   | Build directory      | `out`            |

   {{</table-wrap>}}

4. Next.js requires Node.js v12.22.0 or later to build successfully. To set your Node version, go to **Settings** in your Workers project > **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `12.22.0` or greater.

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `next`, your project dependencies, and building your site before deploying it.

## Preview your site

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Next.js site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

## Use bindings in your Next.js application

A [binding](/pages/platform/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/workers/learning/how-kv-works/), [Durable Object](/workers/learning/using-durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

In Next.js, add server-side code via [API Routes](https://nextjs.org/docs/api-routes/introduction) and [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props). Then access bindings set for your application by accessing them in your code via `process.env`.

The following code block shows an example of accessing a KV namespace in Next.js.

```typescript
---
filename: src/index.tsx
highlight: [4, 5]
---
// ...

export async function getServerSideProps({ req }: GetServerSidePropsContext) => {
  // the type `KVNamespace` comes from the @cloudflare/workers-types package
  const { MY_KV } = (process.env as { MY_KV: KVNamespace }));

  return {
    // ...
  };
};
```

{{<render file="_learn-more.md" withParameters="Next.js">}}
