---
pcx_content_type: how-to
title: Deploy a Nuxt site
---

# Deploy a Nuxt site

[Nuxt](https://nuxt.com) is a web framework making web Vue.js-based development simple and powerful.

In this guide, you will create a new Nuxt application and deploy it using Cloudflare Pages.

## Create a new project

Create a new project by running the following commands in your terminal:

```sh
$ npx nuxi init my-nuxt-app
$ cd my-nuxt-app
$ npm install
```

Next, run the application using the command:

```sh
$ npm run dev
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="nuxt-js">}}

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

## Use bindings in your Nuxt application

A [binding](/pages/platform/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/workers/learning/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

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