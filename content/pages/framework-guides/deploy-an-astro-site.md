---
pcx_content_type: how-to
title: Deploy an Astro site
---

# Deploy an Astro site

[Astro](https://astro.build) is an all-in-one web framework for building fast, content-focused websites. By default, Astro builds websites that have zero JavaScript runtime code.

Refer to the [Astro Docs](https://docs.astro.build/) to learn more about Astro or for assistance with an Astro project.

In this guide, you will create a new Astro application and deploy it using Cloudflare Pages.

## Set up a new project

To use `create-cloudflare` to create a new Astro project, run the following command:

```sh
$ npm create cloudflare@latest my-astro-app -- --framework=astro
```

Astro will ask:

1. Which project type you would like to set up. Your answers will not affect the rest of this tutorial. Select an answer ideal for your project.

2. If you want to initialize a Git repository. We recommend you to select `No` and follow this guide's [Git instructions](/pages/framework-guides/deploy-an-astro-site/#create-a-github-repository) below. If you select `Yes`, do not follow the below Git instructions precisely but adjust them to your needs.

`create-cloudflare` will then install dependencies, including the [Wrangler](/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the `@astrojs/cloudflare` adapter, and ask you setup questions.

### Astro configuration

You can deploy an Astro Server-side Rendered (SSR) site to Cloudflare Pages using the [`@astrojs/cloudflare` adapter](https://github.com/withastro/adapters/tree/main/packages/cloudflare#readme). SSR sites render on Pages Functions and allow for dynamic functionality and customizations.

{{<render file="_c3-adapter.md">}}

Add the [`@astrojs/cloudflare` adapter](https://github.com/withastro/adapters/tree/main/packages/cloudflare#readme) to your project's `package.json` by running:

```sh
$ npm run astro add cloudflare
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository.md">}}

## Deploy with Cloudflare Pages

{{<render file="_deploy-via-c3.md" withParameters="Astro">}}

### Deploy via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

{{<pages-build-preset framework="astro">}}

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, select **Save and Deploy**.

You will see your first deployment in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

### Local runtime

Local runtime support is configured via the `platformProxy` option:

```js
---
filename: astro.config.mjs
highlight: [6]
---
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
```

## Use bindings in your Astro application

A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/kv/reference/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

Use bindings in Astro components and API routes by using `context.locals` from [Astro Middleware](https://docs.astro.build/en/guides/middleware/) to access the Cloudflare runtime which amongst other fields contains the Cloudflare's environment and consecutively any bindings set for your application.

Refer to the following example of how to access a KV namespace with TypeScript.

First, you need to define Cloudflare runtime and KV type by updating the `env.d.ts`:

```typescript
---
filename: src/env.d.ts
---
/// <reference types="astro/client" />

type KVNamespace = import("@cloudflare/workers-types").KVNamespace;
type ENV = {
  // replace `MY_KV` with your KV namespace
  MY_KV: KVNamespace;
};

// use a default runtime configuration (advanced mode).
type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
  interface Locals extends Runtime {}
}
```

You can then access your KV from an API endpoint in the following way:

```typescript
---
filename: src/pages/my-endpoint.ts
highlight: [3, 4, 5]
---
import type { APIContext } from "astro";

export async function get({locals}: APIContext) => {
  // the type KVNamespace comes from the @cloudflare/workers-types package
  const { MY_KV } = locals.runtime.env;

  return {
    // ...
  };
};
```

Besides endpoints, you can also use bindings directly from your Astro components:

```typescript
---
filename: src/pages/index.astro
highlight: [2, 3]
---
---
const myKV = Astro.locals.runtime.env.MY_KV;
const value = await myKV.get("key");
---
<div>{value}</div>
```

To learn more about the Astro Cloudflare runtime, refer to the [Access to the Cloudflare runtime](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#access-to-the-cloudflare-runtime) in the Astro documentation.

{{<render file="/_framework-guides/_learn-more.md" withParameters="Astro">}}
