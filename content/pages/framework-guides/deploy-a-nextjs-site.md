---
pcx_content_type: how-to
title: Deploy a Next.js site
---

# Deploy a Next.js site

[Next.js](https://nextjs.org) is an open-source React framework for creating websites and applications. In this guide, you will create a new Next.js application and deploy it using Cloudflare Pages.

This guide will instruct you how to deploy a:

* Full-stack Next.js project which uses the [Edge Runtime](https://nextjs.org/docs/app/api-reference/edge). 
* Static site Next.js project with [static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).

{{<render file="_tutorials-before-you-start.md">}}

## Consider if you need the Edge Runtime

The Edge Runtime allows applications to use server-side features such as [Edge API Routes](https://nextjs.org/docs/api-routes/edge-api-routes), server-side rendering (SSR) pages with [`getServerSideProps()`](https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props), [Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components), and [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware).

For more information about the Edge Runtime, refer to [the official Next.js documentation](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) which explains the differences between the Edge Runtime and traditional Node.js servers, or [read the Cloudflare announcement blog post](https://blog.cloudflare.com/next-on-pages).

## Use the Edge Runtime

### Select your Next.js project

If you already have a Next.js project that you wish to deploy, change to its directory and proceed to the next step. Otherwise, use `create-next-app` to create a new Next.js project:

```sh
$ npx create-next-app my-app
```

After creating your project, a new `my-app` directory will be generated using the official default template. Change to this directory to continue.

```sh
$ cd my-app
```

### Configure the application to use the Edge Runtime

The default template uses traditional Node.js-powered routes that are not supported on Cloudflare Pages. To run your application, you need to opt into the Edge Runtime for any routes that have server-side functionality (for example, API routes or pages that use `getServerSideProps`). To do this, you need to export a `runtime` [route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime) option from each route's file.

```js
export const runtime = 'edge';
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

For more examples of this and for Next.js versions prior to v13.3.1, refer to [`@cloudflare/next-on-pages` examples](https://github.com/cloudflare/next-on-pages/blob/main/docs/examples.md). Additionally, ensure that your application is not using any [unsupported APIs](https://nextjs.org/docs/app/api-reference/edge#unsupported-apis) or [features](https://github.com/cloudflare/next-on-pages/blob/main/docs/supported.md).

### Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
git remote add origin https://github.com/<GH_USERNAME>/<REPOSITORY_NAME>
git branch -M main
git push -u origin main
```

### Deploy your application to Cloudflare Pages

To deploy your application to Cloudflare Pages, you need to install the `@cloudflare/next-on-pages` package. This library builds your Next.js project in a format that can be deployed to Pages, and handles the runtime logic for your application.

```sh
$ npm install --save-dev @cloudflare/next-on-pages
```

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Next.js_ as your **Framework preset**. Your selection will provide the following information.

{{<pages-build-preset framework="next-js">}}

4. Next.js requires a specific Node.js version to build successfully. Refer to [System Requirements in Next.js Installation guide](https://nextjs.org/docs/getting-started/installation) to review the required Node.js version. To set your Node.js version, go to your Pages project > **Settings** > **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of the required version. For example, if the required Node.js version on Next.js's Installation guide is Node.js `16.8` or later, your environment variable value must be set to `16` or greater.
5. Click on **Save and Deploy** to start the deployment. This first deployment will not be fully functional as the next step is also necessary.
6. In your Pages project, go to **Settings** > **Functions** > **Compatibility Flags**.
7. Configure a `nodejs_compat` flag for both production and preview.
8. Above **Compatibility Flags**, go to **Compatibility Date**  and configure a compatibility date that is at least `2022-11-30` for both production and preview.

{{<Aside type="note">}}

The `@cloudflare/next-on-pages` CLI transforms the Edge Runtime components of your project into a `_worker.js` file which is deployed with [Pages Functions](/pages/platform/functions/advanced-mode/). The library attempts to deduplicate code that would otherwise result in your project quickly hitting the [script size limit](/workers/platform/limits/#worker-size). If you notice any bugs, file a [GitHub issue](https://github.com/cloudflare/next-on-pages/issues/).

{{</Aside>}}

## Use a static export

### Select your Next.js project

If you already have a Next.js project that you wish to deploy, ensure that it is [configured for static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports), change to its directory, and proceed to the next step. Otherwise, use `create-next-app` to create a new Next.js project.

```sh
$ npx create-next-app --example with-static-export my-app
```

After creating your project, a new `my-app` directory will be generated using the official [`with-static-export`](https://github.com/vercel/next.js/tree/canary/examples/with-static-export) example as a template. Change to this directory to continue.

```sh
$ cd my-app
```

### Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
git remote add origin https://github.com/<GH_USERNAME>/<REPOSITORY_NAME>
git branch -M main
git push -u origin main
```

### Deploy your application to Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Next.js (Static HTML Export)_ as your **Framework preset**. Your selection will provide the following information.

{{<pages-build-preset framework="next-js-static">}}

4. Next.js requires a specific Node.js version to build successfully. Refer to [System Requirements in Next.js Installation guide](https://nextjs.org/docs/getting-started/installation) to review the required Node.js version. To set your Node.js version, go to your Pages project > **Settings** > **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of the required version. For example, if the required Node.js version on Next.js's Installation guide is Node.js `16.8` or later, your environment variable value must be set to `16` or greater.

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `next`, your project dependencies, and building your site before deploying it.

## Preview your site

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Next.js site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

## Use bindings in your Next.js application

A [binding](/pages/platform/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/workers/learning/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](/d1/).

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

## Statically imported images on Pages

Pages does not currently support the default Next.js image optimization API. As a result, static imports of images break.

```js
import Image from 'next/image';
import MyImage from './myImage.png';

const MyImage = props => {
  return (
    <Image
      src={MyImage} // <- Not supported
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
};
```

To use image assets, upload your statically imported images to a remote provider like [Cloudflare Images](https://www.cloudflare.com/en-gb/products/cloudflare-images/) or [R2](https://www.cloudflare.com/en-gb/products/r2/).

To serve optimized images, define a global [loaderFile](/images/image-resizing/integration-with-frameworks/) for your app and integrate on-demand resizing with [flexible image variants](/images/cloudflare-images/transform/flexible-variants/) (for Cloudflare Images) or [Image Resizing](/images/image-resizing/url-format/) (for all other remote sources).

{{<render file="_learn-more.md" withParameters="Next.js">}}