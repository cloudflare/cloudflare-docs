---
pcx_content_type: how-to
title: Deploy a Qwik site
---

# Deploy a Qwik site

[Qwik](https://github.com/builderio/qwik) is an open-source, DOM-centric, resumable web application framework designed for best possible time to interactive by focusing on [resumability](https://qwik.builder.io/docs/concepts/resumable/), server-side rendering of HTML and [fine-grained lazy-loading](https://qwik.builder.io/docs/concepts/progressive/#lazy-loading) of code.

In this guide, you will create a new Qwik application implemented via [Qwik City](https://qwik.builder.io/qwikcity/overview/) (Qwik's meta-framework) and deploy it using Cloudflare Pages.

## Creating a new project

Use the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to create a new project. C3 will create a new project directory, initiate Qwik's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Qwik project, run the following command:

```sh
$ npm create cloudflare@latest my-qwik-app -- --framework=qwik
```

`create-cloudflare` will install additional dependencies, including the [Wrangler CLI](/workers/wrangler/install-and-update/#check-your-wrangler-version) and any necessary adapters, and ask you setup questions.

As part of the `cloudflare-pages` adapter installation, a `functions/[[path]].ts` file will be created. The `[[path]]` filename indicates that this file will handle requests to all incoming URLs. Refer to [Path segments](/pages/functions/routing/#dynamic-routes) to learn more.

After selecting your server option, change the directory to your project and render your project by running the following command:

```sh
$ npm start
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploy with Cloudflare Pages

{{<render file="_deploy-via-c3.md" withParameters="Qwik">}}

### Deploy via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="qwik">}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Qwik site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, to preview how changes look to your site before deploying them to production.

## Use bindings in your Qwik application

A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/kv/reference/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

In QwikCity, add server-side code via [routeLoaders](https://qwik.builder.io/qwikcity/route-loader/), [actions](https://qwik.builder.io/qwikcity/action/) and more. In all cases you can access Cloudflare bindings via the `platform` object that QwikCity exposes to you.

The following code examples show how to access a KV binding called `MY_KV` in QwikCity applications written in JavaScript and TypeScript respectively.

### Javascript example

Access the binding directly from the `platform` object:

```javascript
---
filename: src/routes/greet/index.js
highlight: [2]
---
export const onRequest = async ({ platform }) => {
  const myKv = platform.env.MY_KV;

  // ...
};
```

### Typescript example

Firstly, install the `@cloudflare/workers-types` package:
```sh
$ npm install --save-dev @cloudflare/workers-types
```

Augment the `entry.cloudflare-pages.tsx` file with by declaring the `MY_KV` binding:
```diff
---
filename: src/entry.cloudflare-pages.tsx
highlight: [9]
---
// ...

+import type { KVNamespace } from "@cloudflare/workers-types";

declare global {
-  interface QwikCityPlatform extends PlatformCloudflarePages {}
+  interface QwikCityPlatform extends PlatformCloudflarePages {
+    env: {
+      MY_KV: KVNamespace;
+    }
+  }
}

// ...
```

Then access the binding directly from the `platform` object:

```typescript
---
filename: src/routes/greet/index.ts
highlight: [4]
---
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = ({ platform }) => {
  const myKv = platform.env.MY_KV;

  //...
};
```

{{<render file="_learn-more.md" withParameters="Qwik">}}