---
pcx_content_type: how-to
title: Deploy a Next.js site
---

# Deploy a Next.js site

[Next.js](https://nextjs.org) is an open-source React framework for creating websites and apps. In this guide, you will create a new Next.js application and deploy it using Cloudflare Pages.

## Consider if you need the Edge Runtime

Cloudflare Pages supports full-stack Next.js projects which use the [Edge Runtime](https://nextjs.org/docs/app/api-reference/edge), or any projects which can be [statically exported](https://nextjs.org/docs/app/building-your-application/deploying/static-exports). The Edge Runtime allows applications to use server-side features such as [Edge API Routes](https://nextjs.org/docs/api-routes/edge-api-routes), server-side rendering (SSR) pages with [`getServerSideProps()`](https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props), [Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components), and [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware).

For more information about the Edge Runtime, refer to [the official Next.js documentation](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) which explains the differences between the Edge Runtime and traditional Node.js servers, or [read the Cloudflare announcement blog post](https://blog.cloudflare.com/next-on-pages).

{{<render file="_tutorials-before-you-start.md">}}

## Using the Edge Runtime

### 1. Select your Next.js app

If you already have a Next.js project that you wish to deploy, change to its directory and proceed to the next step. Otherwise, you can use `create-next-app` to start a new one.

```sh
$ npx create-next-app my-app
```

After creating your project, a new `my-app` directory will be generated using the official default template. Switch to this directory to continue.

```sh
$ cd my-app
```

### 2. Configure the application to use the Edge Runtime

The default template uses traditional Node.js-powered routes that are not supported on Cloudflare Pages. To run your application, you need to opt into the Edge Runtime for any routes that have server-side functionality (e.g. API routes or pages that use `getServerSideProps`). To do this, you need to export a `runtime` [route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime) option from each route's file.

```js
export const runtime = "edge";
```

As an example, an [Edge Route Handler](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes) might look like this:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: app/api/hello/route.js
---
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function GET(request) {
	const cookieStore = cookies();
	const token = cookieStore.get('token');

	return new Response('Hello, Next.js!', {
		status: 200,
		headers: { 'Set-Cookie': `token=${token}` },
	});
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: app/api/hello/route.ts
---
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function GET(request: Request) {
	const cookieStore = cookies();
	const token = cookieStore.get('token');

	return new Response('Hello, Next.js!', {
		status: 200,
		headers: { 'Set-Cookie': `token=${token}` },
	});
}
```

{{</tab>}}
{{</tabs>}}

For more examples of this and for Next.js versions prior to v13.3.1, take a look at the `@cloudflare/next-on-pages` [examples document](https://github.com/cloudflare/next-on-pages/blob/main/docs/examples.md). Additionally, ensure that your application is not using any [unsupported APIs](https://nextjs.org/docs/app/api-reference/edge#unsupported-apis) or [features](https://github.com/cloudflare/next-on-pages/blob/main/docs/supported.md).

{{<render file="_create-github-repository_no_init.md">}}

### 3. Deploy your application to Cloudflare Pages

To deploy your application to Cloudflare Pages, you need to install the `@cloudflare/next-on-pages` package. This library builds your Next.js project in a format that can be deployed to Pages, and handles the runtime logic for your application.

```sh
$ npm install @cloudflare/next-on-pages --save-dev
```

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Next.js_ as your **Framework preset**. Your selection will provide the following information.

   {{<table-wrap>}}

   | Configuration option | Value                              |
   | -------------------- | ---------------------------------- |
   | Production branch    | `main`                             |
   | Build command        | `npx @cloudflare/next-on-pages@v1` |
   | Build directory      | `.vercel/output/static`            |

   {{</table-wrap>}}

4. Next.js requires Node.js v16 or later to build successfully. To set your Node version, go to **Settings** in your Pages project > **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `16` or greater.
5. Click on **Save and Deploy** to start the deployment (this first deployment won't be fully functional as the next step is also necessary).
6. Go to the **Pages project settings** page (_Settings_ > _Functions_ > _Compatibility Flags_), **add the `nodejs_compat` flag** for both production and preview, and make sure that the **Compatibility Date** for both production and preview is set to at least `2022-11-30`.

{{<Aside type="note" header="Note">}}

The `@cloudflare/next-on-pages` CLI transforms the Edge Runtime components of your project into a `_worker.js` file which is deployed with [Pages Functions](/pages/platform/functions/advanced-mode/). The library attempts to deduplicate code that would otherwise result in your project quickly hitting the [script size limit](/workers/platform/limits/#worker-size). If you notice any bugs, please let us know by filing a [GitHub issue](https://github.com/cloudflare/next-on-pages/issues/).

{{</Aside>}}

## Using a Static Export

### 1. Select your Next.js app

If you already have a Next.js project that you wish to deploy, ensure that it is [configured for static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports), change to its directory, and proceed to the next step. Otherwise, you can use `create-next-app` to start a new one.

```sh
$ npx create-next-app --example with-static-export my-app
```

After creating your project, a new `my-app` directory will be generated using the official [`with-static-export`](https://github.com/vercel/next.js/tree/canary/examples/with-static-export) example as a template. Switch to this directory to continue.

```sh
$ cd my-app
```

{{<render file="_create-github-repository_no_init.md">}}

### 2. Deploy your application to Cloudflare Pages

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Next.js (Static HTML Export)_ as your **Framework preset**. Your selection will provide the following information.

   {{<table-wrap>}}

   | Configuration option | Value           |
   | -------------------- | --------------- |
   | Production branch    | `main`          |
   | Build command        | `npm run build` |
   | Build directory      | `out`           |

   {{</table-wrap>}}

4. Next.js requires Node.js v16 or later to build successfully. To set your Node version, go to **Settings** in your Pages project > **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `16` or greater.

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `next`, your project dependencies, and building your site before deploying it.

## Preview your site

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Next.js site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

## Use bindings in your Next.js application

A [binding](/pages/platform/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/workers/learning/how-kv-works/), [Durable Object](/workers/learning/using-durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

In Next.js, add server-side code via [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes), [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/router-handlers), and [getServerSideProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props). Then, access bindings set for your application by accessing them in your code via `process.env`.

The following code block shows an example of accessing a KV namespace in Next.js.

```typescript
---
filename: app/api/hello/route.js
highlight: [4, 5]
---
// ...

export async function GET(request: Request) {
  // the type `KVNamespace` comes from the @cloudflare/workers-types package
  const { MY_KV } = (process.env as { MY_KV: KVNamespace }));

  return new Response(
    // ...
	);
};
```

{{<render file="_learn-more.md" withParameters="Next.js">}}
