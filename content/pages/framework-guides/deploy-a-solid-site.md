---
pcx_content_type: how-to
title: Deploy a Solid site
---

# Deploy a Solid Site

[Solid](https://www.solidjs.com/) is an open-source web application framework focused on generating performant applications with a modern developer experience based on JSX.

In this guide, you will create a new Solid application implemented via [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart) (Solid's meta-framework) and deploy it using Cloudflare Pages.

{{<Aside type="warning" header="Important">}}

At the time of writing SolidStart is in beta, this may make the following guide inaccurate in the event of a breaking change.

_Note: This guide is based on the [Beta 2 version](https://github.com/solidjs/solid-start/discussions/1052)_

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

In order to configure SolidStart so that it can be deployed to Cloudflare pages, update its config file like so:

```diff
---
filename: vite.config.(ts|js)
---
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
+  server: {
+    preset: "cloudflare-pages",

+    rollupConfig: {
+      external: ["node:async_hooks"]
+    }
+  }
});
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository.md">}}

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
| Build directory       | `dist`             |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Solid repository, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, to preview how changes look to your site before deploying them to production.

{{<render file="/_framework-guides/_learn-more.md" withParameters="Solid">}}
