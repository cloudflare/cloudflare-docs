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

Create a new project (`my-solid-app`) by running the following command in your terminal:

```sh
$ mkdir my-solid-app
$ cd my-solid-app
$ npm init solid@latest
```

You will be prompted to select a starter. Choose any of the available options. You will then be asked if you want to enable Server Side Rendering. Reply `yes`. Finally, you will be asked if you want to use TypeScript, choose either `yes` or `no`.

Then, install the application's dependencies:

```sh
$ npm install
```

After installing dependencies, run your application:

```sh
$ npm run dev
```

## SolidStart Cloudflare configuration

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

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in **Set up builds and deployments**, provide the following information:

<div>

| Configuration option  | Value              |
| --------------------- | ------------------ |
| Production branch     | `main`             |
| Build command         | `npm run build`    |
| Build directory       | `dist/public`      |
| Environment Variables | `NODE_VERSION: 17` |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Solid repository, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, to preview how changes look to your site before deploying them to production.

## Use bindings in your Solid application

A [binding](/pages/platform/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/workers/learning/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

To add a binding in your SolidStart, add the binding to the Cloudflare adapter. This allows you to access your bindings during development, and test your application before deploying it.

The following example configuration supposes you are using a KV namespace binding named `"MY_KV"`. You will need to update the adapter's use in your `vite.config.(ts/js)` file in the following way:

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

You can then access the binding in the environment variable provided to you by SolidStart. For example, in a [`createServerData$`](https://start.solidjs.com/api/createServerData) loader:

```ts
export function routeData() {
  return createServerData$(async (_, { env }) => {
    const { MY_KV } = (env as { MY_KV: KVNamespace }));
    // ...
  });
}
```

{{<Aside type="note">}}

The Cloudflare adapter accepts the same options as [Miniflare](https://miniflare.dev/). Review the available options in this [Miniflare API Reference](https://miniflare.dev/get-started/api#reference).

{{</Aside>}}

After setting up the binding locally, you only need to set the binding in the Cloudflare dashboard as well and it will be available for your Solid application on your next deployment. To add the binding there, refer to [Bindings](/pages/platform/functions/bindings/).

{{<render file="_learn-more.md" withParameters="Solid">}}
