---
pcx_content_type: how-to
title: Deploy an Astro site
---

# Deploy an Astro site

[Astro](https://astro.build) is an all-in-one web framework for building fast, content-focused websites. By default, Astro builds websites that have zero JavaScript runtime code.

Refer to the [Astro Docs](https://docs.astro.build/) to learn more about Astro or for assistance with an Astro project.

In this guide, you will create a new Astro application and deploy it using Cloudflare Pages.


{{<Aside type="note">}}

Want to migrate an existing project? Jump to [set up with an existing project](/pages/framework-guides/deploy-an-astro-site/#set-up-with-an-existing-astro-project).

{{</Aside>}}

## Create a new project

Use C3 ([create-cloudflare-cli](/pages/get-started/c3/)) to create a new Astro project by running:

```sh
$ npm create cloudflare@latest
```

### Base config

Complete the following steps to get started:
1. **In which directory do you want to create your application?** -  Enter your project name or leave blank and we'll generate one for you.
2. **What type of applicaiton do you want to create?** -  Select `Website or web app`.
3. **Which development framework do you want to use?** -  Select `Astro`.


### Astro config
Astro will ask a few questions about project type, if you want to use TypeScript, etc. Those are all up to you and won't effect the rest of this tutorial.

They will ask if you want to initialize a git repository. We recommend you select `No`, as C3 will cover that next.

### Add git + deploy 🚀
C3 will guide you through a few additional steps to set up git and optionally deploy.


## Deploying with Cloudflare Pages + git
Do you want to use git for version control?

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

{{<pages-build-preset framework="astro">}}

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

{{<Aside type="warning" header="Important">}}

Astro requires Node.js version `16.12.0` or later to build successfully. When creating your Pages project, you must expand the **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `16.12.0` or greater.

{{</Aside>}}

After completing configuration, select **Save and Deploy**.

You will see your first deployment in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

### Modes

There are currently two modes supported when using Pages Functions with the [`@astrojs/cloudflare`](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare#readme) adapter.

1. [**Advanced**](/pages/platform/functions/advanced-mode/) mode: This mode is used when you want to run your Function in `advanced` mode. This mode picks up the `_worker.js` in `dist`, or a directory mode where Pages will compile the Worker out of a Functions folder in the project root.

{{<Aside type="note">}}

If no mode is set, the default is `"advanced"`.

{{</Aside>}}

2. **Directory** mode: This mode is used when you want to run your Pages Function in `directory` mode. In this mode, the adapter will compile the client-side part of your application the same way, but it will move the Worker into a `functions` folder in the project root. The adapter will allow you to access your Pages Functions from your `functions` folder. This allows you to add [Pages Plugins](/pages/platform/functions/plugins/) and [Middleware](/pages/platform/functions/middleware/) which can be checked into version control.

To use `directory` mode, modify your `astro.config.mjs` file to add `mode: "directory"` to the adapter configuration:

```js
---
filename: astro.config.mjs
highlight: [6]
---
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ mode: "directory" }),
});
```

## Use bindings in your Astro application

A [binding](/pages/platform/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/workers/learning/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

In Astro you can add server-side code via [endpoints](https://docs.astro.build/en/core-concepts/endpoints/), in such endpoints you can then use the `getRuntime()` method to access Cloudflare's environment and consecutively any bindings set for your application.

The following code block shows an example of accessing a KV namespace in Astro.

```typescript
---
filename: src/my-endpoint.ts
highlight: [2, 5, 6, 7]
---
import type { APIContext } from "astro";
import { getRuntime } from "@astrojs/cloudflare/runtime";

export async function get({request}: APIContext) => {
  const runtime = getRuntime(request);
  // the type KVNamespace comes from the @cloudflare/workers-types package
  const { MY_KV } = (runtime.env as { MY_KV: KVNamespace }));

  return {
    // ...
  };
};
```

## Set up an existing Astro project

You can deploy an Astro Server-side Rendered (SSR) site to Cloudflare Pages using the [`@astrojs/cloudflare\` adapter](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare#readme). SSR sites render on Pages Functions and allow for dynamic functionality and customizations.

To enable an SSR site and deploy to Cloudflare Pages, add the [`@astrojs/cloudflare\` adapter](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare#readme) to your project's `package.json` by running:

```sh
$ npm run astro add cloudflare
```

{{<render file="_learn-more.md" withParameters="Astro">}}