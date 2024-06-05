---
pcx_content_type: how-to
title: Full-stack deployment
meta:
  description: Deploy a full-stack Next.js site (recommended).
---

# Next.js

[Next.js](https://nextjs.org) is an open-source React framework for creating websites and applications. In this guide, you will create a new Next.js application and deploy it using Cloudflare Pages.

This guide will instruct you how to deploy a full-stack Next.js project which uses the [Edge Runtime](https://nextjs.org/docs/app/api-reference/edge), via the [`next-on-pages`](https://github.com/cloudflare/next-on-pages/tree/main/packages/next-on-pages/docs) adapter.

## Create a new project using the `create-cloudflare` CLI (C3)

The [`create-cloudflare` CLI (C3)](/pages/get-started/c3/) will configure your Next.js site for Cloudflare Pages. Run the following command in your terminal to create a new Next.js site:

```sh
$ npm create cloudflare@latest my-next-app -- --framework=next
```

C3 will ask you a series of setup questions. C3 will also install necessary dependencies, including the [Wrangler](/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the `@cloudflare/next-on-pages` adapter.

After creating your project, C3 will generate a new `my-next-app` directory using the default Next.js template, updated to be fully compatible with Cloudflare Pages.

When creating your new project, C3 will give you the option of deploying an initial version of your application via [Direct Upload](/pages/how-to/use-direct-upload-with-continuous-integration/). You can redeploy your application at any time by running following command inside your project directory:

```sh
$ npm run deploy
```

{{<Aside type="note" header="Git integration">}}

The initial deployment created via C3 is referred to as a [Direct Upload](/pages/get-started/direct-upload/). To set up a deployment via the Pages Git integration, refer to the [Git Integration](#git-integration) section below.

{{</Aside>}}

## Configure and deploy a project without C3

If you already have a Next.js project or wish to manually create and deploy one without using C3, Cloudflare recommends that you use `@cloudflare/next-on-pages` and refer to its [README](https://github.com/cloudflare/next-on-pages/tree/main/packages/next-on-pages) for instructions and additional information to help you develop and deploy your project.

{{<render file="/_framework-guides/_git-integration.md">}}

### Create a new GitHub repository

{{<render file="/_framework-guides/_create-gh-repo.md">}}

```sh
# Skip the following three commands if you have built your application
# using C3 or already committed your changes
$ git init
$ git add .
$ git commit -m "Initial commit"

$ git branch -M main
$ git remote add origin https://github.com/<your-gh-username>/<repository-name>
$ git push -u origin main
```
### Connect your application to the GitHub repository via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer. However, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="next-js">}}

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

4. After completing configuration, select **Save and Deploy**.

You will be able to review your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified. Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying your changes to production.

## Use bindings in your Next.js application

{{<render file="/_framework-guides/_bindings_definition.md">}}

### Set up bindings for local development

{{<Aside type="note">}}

Projects created with C3 have bindings for local development set up by default.

{{</Aside>}}

To set up bindings for use in local development, you will use the `setupDevPlatform` function provided by [`@cloudflare/next-on-pages/next-dev`](https://github.com/cloudflare/next-on-pages/tree/main/internal-packages/next-dev). `setupDevPlatform` sets up a platform emulation based on your project's [`wrangler.toml`](/workers/wrangler/configuration/) file that your Next.js application can make use of locally.

For example, to work with a KV binding locally, open the Next.js configuration file and add:

{{<tabs labels="next.config.mjs | next.config.(js|cjs)">}}
{{<tab label="next.config.mjs">}}

```js
---
filename: next.config.mjs
highlight: [1-7]
---
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

// note: the if statement is present because you
//       only need to use the function during development
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
```

{{</tab>}}
{{<tab label="next.config.(js|cjs)">}}

```js
---
filename: next.config.js / next.config.cjs
highlight: [1-6]
---
// note: the if statement is present because you
//       only need to use the function during development
if (process.env.NODE_ENV === "development") {
  const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev")
  setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
```

{{</tab>}}
{{</tabs>}}

Make sure to have a `wrangler.toml` file at the root of your project with a declaration for a KV binding named `MY_KV`:

```toml
---
filename: wrangler.toml
highlight: [5-7]
---
name = "my-next-app"

compatibility_flags = ["nodejs_compat"]

[[kv_namespaces]]
binding = "MY_KV"
id = "<YOUR_KV_NAMESPACE_ID>"
```

### Set up bindings for a deployed application

To access bindings in a deployed application, you will need to [configure](/pages/functions/bindings/) any necessary bindings and connect them to your project via your project's settings page in the Cloudflare dashboard.

### Add bindings to Typescript projects

If your project is using TypeScript, you will want to set up proper type support so you can access your bindings in a type-safe and convenient manner.

To get proper type support, you need to create a new `env.d.ts` file in your project and extend the `CloudflareEnv` (used by `getRequestContext`) interface with your [bindings](/pages/functions/bindings/).

{{<Aside type="note">}}

Projects created with C3 have a default `env.d.ts` file.

{{</Aside>}}

The following is an example of how to add a `KVNamespace` binding:

```ts
---
filename: env.d.ts
highlight: [7]
---
interface CloudflareEnv {
  // The KV Namespace binding type used here comes
  // from `@cloudflare/workers-types`. To use it in such
  // a way make sure that you have installed the package
  // as a dev dependency and you have added it to your
  //`tsconfig.json` file under `compilerOptions.types`.
  MY_KV: KVNamespace
}
```

### Access bindings in the application

Local and remote bindings can be accessed using the [`getRequestContext` function](https://github.com/cloudflare/next-on-pages/blob/3846730c4a0d12/packages/next-on-pages/README.md#cloudflare-platform-integration) exposed by `@cloudflare/next-on-pages`. The following code example shows how to access them in a `hello` API route of an App Router application.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: app/api/hello/route.js
highlight: [1, 9]
---
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

// ...

export async function GET(request) {
  // this is the KV binding you defined in the wrangler.toml file
  const myKv = getRequestContext().env.MY_KV

  // get a value from the namespace
  const kvValue = await myKv.get(`kvTest`) || false

  return new Response(`The value of kvTest in MY_KV is: ${kvValue}`)
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: app/api/hello/route.ts
highlight: [2, 10]
---
import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

// ...

export async function GET(request: NextRequest) {
  // this is the KV binding you defined in the wrangler.toml file
  const myKv = getRequestContext().env.MY_KV

  // get a value from the namespace
  const kvValue = await myKv.get(`kvTest`) || false

  return new Response(`The value of kvTest in MY_KV is: ${kvValue}`)
}
```

{{</tab>}}
{{</tabs>}}

## `Image` component

The Cloudflare network does not provide the same image optimization support as the Vercel network does. Because of this, the Next.js' `<Image />` component behaves differently from how it would in the Vercel network.

- If you build your application as a static site, the `<Image />` component will not serve any images.

- If you build your application using `@cloudflare/next-on-pages`, the component will work but it will not perform any image optimization (regardless of the [props](https://react.dev/learn/passing-props-to-a-component) you pass to it).

Both cases can be improved by setting up proper [loaders](https://nextjs.org/docs/pages/api-reference/components/image#loader) for the `<Image />` component, which allow you to use any image optimization service you want. To use [Cloudflare Images](/images/), refer to [resize with Cloudflare Workers](/images/transform-images/transform-via-workers/).

## Recommended development workflow

When developing a `next-on-pages` application, this is the development workflow that Cloudflare recommends:

### Develop using the standard Next.js dev server

The [standard development server provided by Next.js](https://nextjs.org/docs/getting-started/installation#run-the-development-server) is the best available option for a fast and polished development experience. The `next-dev` submodule (as described in the [local bindings](#set-up-bindings-for-local-development) section) makes it possible to use Next.js' standard development server while still having access to your Cloudflare bindings.

### Build and preview your application locally

To ensure that your application is being built in a manner that is fully compatible with Cloudflare Pages, before deploying it, or whenever you are comfortable checking the correctness of the application during your development process, you will want to build and preview it locally using Cloudflare's `workerd` JavaScript runtime.

If you have created your project with C3, do this by running:

```sh
$ npm run preview
```

If you have created your project without C3, run:

```sh
$ npx @cloudflare/next-on-pages@1
```

And preview your project by running:

```sh
$ npx wrangler pages dev .vercel/output/static
```

{{<Aside type="note">}}

The [`wrangler pages dev`](/workers/wrangler/commands/#dev-1) command needs to run the application using the [`nodejs_compat`](/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) compatibility flag. The `nodejs_compat` flag can be specified in either your project's `wrangler.toml` file or provided to the command as an inline argument: `--compatibility-flag=nodejs_compat`.

{{</Aside>}}


### Deploy your application and iterate

After you have previewed your application locally, you can deploy it to Cloudflare Pages (both via [Direct Uploads](/pages/get-started/direct-upload/) or [Git integration](/pages/configuration/git-integration/)) and iterate over the process to make new changes.

## Troubleshooting
Review common mistakes and issues that you might encounter when developing a Next.js application using `next-on-pages`.

{{<Aside type="note" header="Tip">}}

Using the official [next-on-pages ESLint plugin](https://www.npmjs.com/package/eslint-plugin-next-on-pages) (especially with the `recommended` rules)
helps you avoid issues like the ones presented in this section, giving you helpful and actionable feedback directly in your IDE.

{{</Aside>}}


### Edge runtime

All server-side routes in your Next.js project must be configured as Edge runtime routes when running on Cloudflare Pages. You must add `export const runtime = 'edge'` to each individual server-side route.


{{<Aside type="note">}}

If you are using the Pages router, for page routes, you need to use `'experimental-edge'` instead of `'edge'`.

{{</Aside>}}

### App router

#### Not found

Next.js generates a `not-found` route for your application under the hood during the build process. In some circumstances, Next.js can detect that the route requires server-side logic (particularly if computation is being performed in the root layout component) and Next.js might create a Node.js serverless function (which, as such, is incompatible with `@cloudflare/next-on-pages`).

To prevent this incompatibility, Cloudflare recommends to always provide a custom `not-found` route which explicitly opts in the edge runtime:

```ts
---
filename: (src/)app/not-found.(jsx|tsx)
---

export const runtime = 'edge'

export default async function NotFound() {
    // ...
    return (
        // ...
    )
}
```

{{<Aside type="note">}}

Projects created with C3 have a default custom `not-found` page already created for them.

{{</Aside>}}

#### `generateStaticParams`

When doing static site generation (SSG) in the [`/app` directory](https://nextjs.org/docs/getting-started/project-structure) and using the [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) function, Next.js by default tries to handle requests for non statically generated routes on-demand via Node.js serverless functions which, as such, are incompatible with `@cloudflare/next-on-pages`.

To avoid such problem make sure to have your route opted in the edge runtime as mentioned [above](#edge-runtime) (which however nullifies SSG since currently Next.js does not support SSG with the edge runtime).

Or alternatively you can opt out of the dynamic routes handling by specifying a `false` [`dynamicParams`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams):

```diff
---
filename: app/my-example-page/[slug]/page.jsx
---
+ export const dynamicParams = false

// ...
```

#### Top-level `getRequestContext`

The `getRequestContext` function cannot be called at the top level of a route file or in any manner that triggers the function call as part of the file's initialization.

`getRequestContext` must be called inside the request handling process logic and not in a global/unconditional manner that gets triggered as soon as the file is imported.

For example, the following is an incorrect usage of `getRequestContext`:

```js
---
filename: app/api/myvar/route.js
highlight: [5]
---
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

const myVariable = getRequestContext().env.MY_VARIABLE

export async function GET(request) {
  return new Response(myVariable)
}
```

The above example can be fixed in the following way:

```js
---
filename: app/api/myvar/route.js
highlight: [6]
---
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request) {
  const myVariable = getRequestContext().env.MY_VARIABLE
  return new Response(myVariable)
}
```

### Pages router

#### `getStaticPaths`

When doing static site generation (SSG) in the [`/pages` directory](https://nextjs.org/docs/getting-started/project-structure) and using the [`getStaticPaths`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths) function, Next.js by default tries to handle requests for non statically generated routes on-demand via Node.js serverless functions which, as such, are incompatible with `@cloudflare/next-on-pages`.

To avoid such problem make sure to have your route opted in the edge runtime as mentioned [above](#edge-runtime) (which however nullifies SSG since currently Next.js does not support SSG with the edge runtime).

Or alternatively you can opt out of the dynamic routes handling by specifying a [false `fallback`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-false):


```diff
---
filename: pages/my-example-page/[slug].jsx
---
// ...

export async function getStaticPaths() {
    // ...

    return {
        paths,
+       fallback: false,
	}
}
```

{{<Aside type="warning">}}

When opting for the latter please keep in mind that the `paths` array cannot be empty since an empty `paths` array causes Next.js to ignore the provided `fallback` value. At build time, make sure that at least one entry is present in the array.

{{</Aside>}}

{{<render file="/_framework-guides/_learn-more.md" withParameters="Next.js">}}