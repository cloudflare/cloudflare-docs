---
pcx_content_type: how-to
title: Full-stack (SSR)
meta:
  description: Deploy a full-stack Next.js app to Cloudflare Pages
---

# Next.js

[Next.js](https://nextjs.org) is an open-source React.js framework for building full-stack applications. This guide will instruct you how to deploy a full-stack Next.js project to Cloudflare Pages using [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages/tree/main/packages/next-on-pages/docs).

## Get Started

```sh
$ npm create cloudflare@latest my-next-app -- --framework=next
```

## Bring an existing Next.js app to Cloudflare Pages

**1. Install [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages)**

```sh
$ npm install --save-dev @cloudflare/next-on-pages
```

**2. Add a [`wrangler.toml`](/pages/functions/wrangler-configuration/) file to the root directory of your Next.js app:**

```toml
name = "my-app"
compatibility_date = "2024-07-29"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

This is where you'll configure your Pages project and define what resources it can access via [bindings](/workers/runtime-apis/bindings/).

**3. Add the following to `next.config.mjs`:**

```diff
+ import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {};

+ if (process.env.NODE_ENV === 'development') {
+   await setupDevPlatform();
+ }

export default nextConfig;
```

This allows you to access [bindings](/workers/runtime-apis/bindings/) in local development.

**4. Add the following to the scripts field of your `package.json`:**

```json
"pages:build": "npx @cloudflare/next-on-pages",
"preview": "npm run pages:build && wrangler pages dev",
"deploy": "npm run pages:build && wrangler pages deploy"
```

- `npm run pages:build` runs `next build`, and then transforms its output to be compatible with Cloudflare Pages.
- `npm run preview` builds your app, and runs it locally in [workerd](https://github.com/cloudflare/workerd), the open-source Workers Runtime. (`next dev` will only run your app in Node.js)
- `npm run deploy` builds your app, and then deploys it to Cloudflare

**5. Deploy to Cloudflare Pages**

Either deploy via the command line:

```sh
$ npm run deploy
```

Or [connect a Github or Gitlab repository](/pages/configuration/git-integration/), and Cloudflare will automatically build and deploy each pull request you merge to your production branch.

**6. (Optional) Add `eslint-plugin-next-on-pages`**

```sh
$ npm install --save-dev eslint-plugin-next-on-pages
```

Add the following to `.eslintrc.json`:

```diff
{
  "extends": [
    "next/core-web-vitals",
+    "plugin:eslint-plugin-next-on-pages/recommended"
  ],
  "plugins": [
+    "eslint-plugin-next-on-pages"
  ]
}
```

This plugin will lint your Next.js app to ensure it is configured correctly to run on Cloudflare Pages.

## Using bindings in your Next.js app

Once you have configured your `next.config.mjs` for local development (refer to step 3 above), you can access [bindings](/workers/runtime-apis/bindings/) from any route of your Next.js app via `getRequestContext`:

```js
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request) {
  let responseText = "Hello World";

  const myKv = getRequestContext().env.MY_KV_NAMESPACE;
  await myKv.put("foo", "bar");
  const foo = await myKv.get("foo");

  return new Response(foo);
}
```

You can add bindings to your Pages project by [adding them to your `wrangler.toml` configuration file](/pages/functions/wrangler-configuration/).

## Troubleshooting

### Edge runtime

You must configure all server-side routes in your Next.js project as [Edge runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) routes, by adding the following to each route::

```js
export const runtime = "edge";
```

{{<Aside type="note">}}
If you are still using the Next.js [Pages router](https://nextjs.org/docs/pages), for page routes, you must use `'experimental-edge'` instead of `'edge'`.
{{</Aside>}}

### App router

#### Not found

Next.js generates a `not-found` route for your application under the hood during the build process. In some circumstances, Next.js can detect that the route requires server-side logic (particularly if computation is being performed in the root layout component) and Next.js automatically creates a [Node.js runtime serverless function](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) that is not compatible with Cloudflare Pages.

To prevent this, you can provide a custom `not-found` route that explicitly uses the edge runtime:

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

#### `generateStaticParams`

When you use [static site generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) in the [`/app` directory](https://nextjs.org/docs/getting-started/project-structure) and also use the [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) function, Next.js tries to handle requests for non statically generated routes automatically, and creates a [Node.js runtime serverless function](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) that is not compatible with Cloudflare Pages.

You can opt out of this behavior by setting [`dynamicParams`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams) to `false`:

```diff
---
filename: app/my-example-page/[slug]/page.jsx
---
+ export const dynamicParams = false

// ...
```

#### Top-level `getRequestContext`

You must call `getRequestContext` within the function that handles your route — it cannot be called in global scope.

Don't do this:

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

Instead, do this:

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

When you use [static site generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) in the [`/pages` directory](https://nextjs.org/docs/getting-started/project-structure) and also use the [`getStaticPaths`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths) function, Next.js by default tries to handle requests for non statically generated routes automatically, and creates a [Node.js runtime serverless function](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) that is not compatible with Cloudflare Pages.

You can opt out of this behavior by specifying a [false `fallback`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-false):

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

Note that the `paths` array cannot be empty since an empty `paths` array causes Next.js to ignore the provided `fallback` value.

{{</Aside>}}
