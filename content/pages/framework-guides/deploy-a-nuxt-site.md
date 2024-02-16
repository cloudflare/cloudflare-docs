---
pcx_content_type: how-to
title: Deploy a Nuxt site
meta:
  description: 
---

# Deploy a Nuxt site

[Nuxt](https://nuxt.com) is a web framework making web Vue.js-based development simple and powerful.

In this guide, you will create a new Nuxt application and deploy it using Cloudflare Pages.

## Create a new project using the `create-cloudflare` CLI (C3)

Open up your terminal and run the following command to create a new Nuxt site. Your Nuxt site is configured for Cloudflare Pages using the [`create-cloudflare` CLI (C3)](/pages/get-started/c3/).

```sh
$ npm create cloudflare@latest my-nuxt-app -- --framework=nuxt
```

C3 will create a new project with [`nuxi` (the official Nuxt CLI)](https://github.com/nuxt/cli) and install the necessary adapters along with the [Wrangler CLI](/workers/wrangler/install-and-update/#check-your-wrangler-version). C3 will ask you a series of setup questions.

After creating your project, a new `my-nuxt-app` directory will be generated using the default Nuxt template, updated to be fully compatible with Cloudflare Pages.

When creating your new project, C3 will give you the option of deploying an initial version of your application via [Direct Upload](/pages/how-to/use-direct-upload-with-continuous-integration/). You can re-deploy your application at any time by running following command inside your project directory:

```sh
$ npm run deploy
```

{{<Aside type="note" header="Git integration">}}

The initial deployment created via C3 is referred to as a [Direct Upload](/pages/get-started/direct-upload/). To set up a deployment via the Pages Git integration, refer to the [Git Integration](#git-integration) section below.

Git integration cannot currently be added to existing Pages applications. If you have already deployed your application (using C3, for example), you need to create a new Pages application in order to add Git integration to it.

{{</Aside>}}

## Configure and deploy a project without C3

To deploy a Nuxt project without C3, follow the [Nuxt Get Started guide](https://nuxt.com/docs/getting-started/installation). After you have set up your Nuxt project, choose either the [dashboard guide](/pages/get-started/guide/) or [Direct Upload guide](/pages/get-started/direct-upload/) to deploy your Nuxt project on Cloudflare Pages.

## Git integration

[Connect a GitHub or Gitlab repository](/pages/configuration/git-integration) to your Pages project so that new versions of your project are built and deployed when changes to your Git repository are detected.

In addition to [Direct Upload](/pages/get-started/direct-upload/) deployments, you can make use of the Pages Git integration, which allows you to connect a GitHub repository to your Pages application and have the application automatically built and deployed after each new commit is pushed to it.

{{<Aside type="note">}}

Git integration cannot currently be added to existing Pages applications. If you have already deployed your application (using C3 for example), you need to create a new Pages application in order to add the Git integration to it.

{{</Aside>}}

Setup requires a basic understanding of [Git](https://git-scm.com/). If you are new to Git, refer to GitHub's [summarized Git handbook](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

### Create a new GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, go to your newly created project directory to prepare and push your local application to GitHub by running the following commands in your terminal:

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

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

## Use bindings in your Nuxt application

A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/kv/), [Durable Objects](/durable-objects/), [R2](/r2/), and [D1](/d1/).

If you intend to use bindings in your project, you must first set up your bindings for local and remote development.

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

This module is powered by the `getPlatformProxy` [helper function](/workers/wrangler/api#getplatformproxy) will automatically detect any bindings defined in the `wrangler.toml` file and emulate them in local development. Review [Wrangler configuration information on bindings](workers/wrangler/configuration/#bindings) for more information on how to configure bindings in `wrangler.toml`.

{{<Aside type="note">}}

`wrangler.toml` is currently **only** used for local development. Bindings specified in it are not available remotely.

{{</Aside>}}

In order to access bindings in a deployed application, you will need to [configure your bindings](/pages/functions/bindings/) in the Cloudflare dashboard.

### Access bindings in your Nuxt application

In Nuxt, add server-side code via [Server Routes and Middleware](https://nuxt.com/docs/guide/directory-structure/server#server-directory). The `defineEventHandler()` method is used to define your API endpoints in which you can access Cloudflare's context via the provided `context` field. The `context` field allows you to access any bindings set for your application.

The following code block shows an example of accessing a KV namespace in Nuxt.

```typescript
---
filename: src/my-endpoint.get.ts
highlight: [2, 3]
---
export default defineEventHandler(({ context }) => {
  // the type `KVNamespace` comes from the @cloudflare/workers-types package
  const MY_KV: KVNamespace = context.cloudflare.env.MY_KV;

  return {
    // ...
  };
});
```

{{<render file="_learn-more.md" withParameters="Nuxt">}}
