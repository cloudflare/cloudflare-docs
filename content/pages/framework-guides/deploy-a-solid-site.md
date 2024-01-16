---
pcx_content_type: how-to
title: Deploy a Solid site
---

# Deploy a Solid Site

[Solid](https://www.solidjs.com/) is an open-source web application framework focused on generating performant applications with a modern developer experience based on JSX.

In this guide, you will create a new Solid application implemented via [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart) (Solid's meta-framework) and deploy it using Cloudflare Pages.

{{<Aside type="warning" header="Important">}}

At the time of writing SolidStart is in beta, this may make the following guide inaccurate in the event of a breaking change.

{{</Aside>}}

## Create a new project

Use the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate Solid's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Solid project, run the following command:

```sh
$ npm create cloudflare@latest my-solid-app -- --framework=solid
```

You will be prompted to select a starter. Choose any of the available options. You will then be asked if you want to enable Server Side Rendering. Reply `yes`. Finally, you will be asked if you want to use TypeScript, choose either `yes` or `no`.

`create-cloudflare` will then install dependencies, including the [Wrangler](/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the SolidStart Cloudflare Pages adapter, and ask you setup questions.

After you have installed your project dependencies, start your application:

```sh
$ npm run dev
```

## SolidStart Cloudflare configuration

{{<render file="_c3-adapter.md">}}

In order to use SolidStart with Cloudflare Pages, add the [SolidStart Cloudflare Pages adapter](https://github.com/solidjs/solid-start/tree/main/packages/start-cloudflare-pages) to your application:

```sh
$ npm install --save-dev solid-start-cloudflare-pages
```

Next, use the adapter in your the `vite.config.(ts/js)` file:

```diff
---
filename: vite.config.ts
---
import solid from "solid-start/vite";
import { defineConfig } from "vite";
+ import cloudflare from "solid-start-cloudflare-pages";

export default defineConfig({
-  plugins: [solid()],
+  plugins: [solid({ adapter: cloudflare({}) })],
});
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploy with Cloudflare Pages

{{<render file="_deploy-via-c3.md" withParameters="Solid">}}

### Deploy via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in **Set up builds and deployments**, provide the following information:

<div>

| Configuration option  | Value              |
| --------------------- | ------------------ |
| Production branch     | `main`             |
| Build command         | `npm run build`    |
| Build directory       | `dist/public`      |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Solid repository, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, to preview how changes look to your site before deploying them to production.

## Use bindings in your Solid application

A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/kv/reference/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

To add a binding in your SolidStart application, add the binding to the Cloudflare adapter. This allows you to access your bindings during development, and test your application before deploying it.

The following code examples show how to access a KV binding called `MY_KV` in SolidStart applications written in JavaScript and TypeScript respectively.

### Local setup

First of all before using the KV namespace binding we want to configure it in the vite solid plugin, this allows us to be able to access such binding locally when running the solid dev server, in order to do so update the adapter's use in your `vite.config.(ts/js)` file in the following way:

```diff
---
filename: vite.config.ts
---
import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflare from "solid-start-cloudflare-pages";

export default defineConfig({
-  plugins: [solid({ adapter: cloudflare({}) })],
+  plugins: [
+   solid({
+     adapter: cloudflare({
+       kvNamespaces: ["MY_KV"],
+     }),
+   }),
+  ],
});
```

### Javascript example

Simply access the binding in the SolidStart provided `env` object. For example, in a [`createServerData$`](https://start.solidjs.com/api/createServerData) loader:

```javascript
---
filename: src/routes/index.jsx
highlight: [2]
---
export function routeData() {
  return createServerData$(async (_, { env }) => {
    const myKv = env.MY_KV;
    // ...
  });
}

// ...
```

### Typescript example

Firstly, install the `@cloudflare/workers-types` package:
```sh
$ npm install --save-dev @cloudflare/workers-types
```

Afterwords use its types to augment the `global.d.ts` file:
```diff
filename: global.d.ts
highlight: [2-11]
---
/// <reference types="solid-start/env" />
+import { type KVNamespace } from '@cloudflare/workers-types'
+
+declare global {
+  interface Env {
+    MY_KV: KVNamespace;
+  }
+}
```

Then access the binding directly from the solid `env` object:

```typescript
---
filename: src/routes/index.tsx
highlight: [4]
---
// ...

export default function Page() {
  const data = createServerData$(async (_, { env }) => {
    const myKv = env.MY_KV;

    // ...
  });

  // ...
};
```

You can then access the binding in the SolidStart provided `env` object. For example, in a [`createServerData$`](https://start.solidjs.com/api/createServerData) loader:


```typescript
---
filename: src/routes/index.tsx
highlight: [2]
---
export function routeData() {
  return createServerData$(async (_, { env }) => {
    const myKv = env.MY_KV;
    // ...
  });
}

// ...
```

{{<Aside type="note">}}

The Cloudflare adapter accepts the same options as [Miniflare](https://miniflare.dev/). Review the available options in this [Miniflare API Reference](https://miniflare.dev/get-started/api#reference).

{{</Aside>}}

After setting up the binding locally, you only need to set the binding in the Cloudflare dashboard as well and it will be available for your Solid application on your next deployment. To add the binding there, refer to [Bindings](/pages/functions/bindings/).

{{<render file="_learn-more.md" withParameters="Solid">}}
