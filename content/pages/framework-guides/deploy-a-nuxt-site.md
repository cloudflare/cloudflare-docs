---
pcx_content_type: how-to
title: Deploy a Nuxt site
meta:
  description: Web framework making Vue.js-based development simple and powerful.
---

# Deploy a Nuxt site

[Nuxt](https://nuxt.com) is a web framework making Vue.js-based development simple and powerful.

In this guide, you will create a new Nuxt application and deploy it using Cloudflare Pages.

## Create a new project using the `create-cloudflare` CLI (C3)

The [`create-cloudflare` CLI (C3)](/pages/get-started/c3/) configures your Nuxt site for Cloudflare Pages. Run the following command in your terminal to create a new Nuxt site:

```sh
$ npm create cloudflare@latest my-nuxt-app -- --framework=nuxt
```

C3 will ask you a series of setup questions and create a new project with [`nuxi` (the official Nuxt CLI)](https://github.com/nuxt/cli). C3 will also install the necessary adapters along with the [Wrangler CLI](/workers/wrangler/install-and-update/#check-your-wrangler-version).

After you have answered all the setup questions, C3 will generate a new `my-nuxt-app` directory using the default Nuxt template, updated to be fully compatible with Cloudflare Pages.

When creating your new project, C3 will give you the option of deploying an initial version of your application via [Direct Upload](/pages/how-to/use-direct-upload-with-continuous-integration/). You can redeploy your application at any time by running following command inside your project directory:

```sh
$ npm run deploy
```

{{<Aside type="note" header="Git integration">}}

The initial deployment created via C3 is referred to as a [Direct Upload](/pages/get-started/direct-upload/). To set up a deployment via the Pages Git integration, refer to the [Git Integration](#git-integration) section below.

{{</Aside>}}

## Configure and deploy a project without C3

To deploy a Nuxt project without C3, follow the [Nuxt Get Started guide](https://nuxt.com/docs/getting-started/installation).After you have set up your Nuxt project, choose either the [Git integration guide](/pages/get-started/guide/) or [Direct Upload guide](/pages/get-started/direct-upload/) to deploy your Nuxt project on Cloudflare Pages.

{{<render file="/_framework-guides/_git-integration.md">}}

### Create a GitHub repository

{{<render file="/_framework-guides/_create-gh-repo.md">}}

```sh
# Skip the following 3 commands if you have built your application
# using C3 or already committed your changes
$ git init
$ git add .
$ git commit -m "Initial commit"

$ git branch -M main
$ git remote add origin https://github.com/<YOUR_GH_USERNAME>/<REPOSITORY_NAME>
$ git push -u origin main
```

### Create a Pages project

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Navigate to [Workers & Pages > Create application > Pages > Connect to Git](https://dash.cloudflare.com/?to=/:account/pages/new/provider/github) and create a new pages project.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="nuxt-js">}}

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, click the **Save and Deploy** button. Review your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified. Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

## Use bindings in your Nuxt application

{{<render file="/_framework-guides/_bindings_definition.md">}}

### Set up bindings for local development

Projects created via C3 come with `nitro-cloudflare-dev`, a `nitro` module that simplifies the process of working with bindings during development:

```typescript
---
filename: nuxt.config.ts
highlights: [2]
---
export default defineNuxtConfig({
  modules: ["nitro-cloudflare-dev"],
});
```

This module is powered by the [`getPlatformProxy` helper function](/workers/wrangler/api#getplatformproxy). `getPlatformProxy` will automatically detect any bindings defined in the `wrangler.toml` file and emulate them in local development. Review [Wrangler configuration information on bindings](/workers/wrangler/configuration/#bindings) for more information on how to configure bindings in `wrangler.toml`.

{{<Aside type="note">}}

`wrangler.toml` is currently **only** used for local development. Bindings specified in it are not available remotely.

{{</Aside>}}

In order to access bindings in a deployed application, you will need to [configure your bindings](/pages/functions/bindings/) in the Cloudflare dashboard.

### Add bindings to Typescript projects

To get proper type support, you need to create a new `env.d.ts` file in the root of your project and declare a [binding](/pages/functions/bindings/).

The following is an example of adding a `KVNamespace` binding:

```ts
---
filename: env.d.ts
highlight: [10]
---
import { CfProperties, Request, ExecutionContext, KVNamespace } from '@cloudflare/workers-types';

declare module 'h3' {
    interface H3EventContext {
        cf: CfProperties,
        cloudflare: {
          request: Request,
          env: {
            MY_KV: KVNamespace,
          }
          context: ExecutionContext,
        };
    }
}
```

### Access bindings in your Nuxt application

In Nuxt, add server-side code via [Server Routes and Middleware](https://nuxt.com/docs/guide/directory-structure/server#server-directory). The `defineEventHandler()` method is used to define your API endpoints in which you can access Cloudflare's context via the provided `context` field. The `context` field allows you to access any bindings set for your application.

The following code block shows an example of accessing a KV namespace in Nuxt.


{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```javascript
---
filename: server/api/hello.js
highlight: [2]
---
export default defineEventHandler(({ context }) => {
  const MY_KV = context.cloudflare.env.MY_KV;

  return {
    // ...
  };
});
```

{{</tab>}}
{{<tab label="ts">}}

```typescript
---
filename: server/api/hello.ts
highlight: [2]
---
export default defineEventHandler(({ context }) => {
  const MY_KV = context.cloudflare.env.MY_KV;

  return {
    // ...
  };
});
```

{{</tab>}}
{{</tabs>}}

{{<render file="/_framework-guides/_learn-more.md" withParameters="Nuxt">}}
