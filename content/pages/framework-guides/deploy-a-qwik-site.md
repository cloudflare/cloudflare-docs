---
pcx_content_type: how-to
title: Deploy a Qwik site
---

# Deploy a Qwik site

[Qwik](https://github.com/builderio/qwik) is an open-source, DOM-centric, resumable web application framework designed for best possible time to interactive by focusing on [resumability](https://qwik.builder.io/docs/concepts/resumable/), server-side rendering of HTML and [fine-grained lazy-loading](https://qwik.builder.io/docs/concepts/progressive/#lazy-loading) of code.

In this guide, you will create a new Qwik application implemented via [Qwik City](https://qwik.builder.io/qwikcity/overview/) (Qwik's meta-framework) and deploy it using Cloudflare Pages.

## Creating a new project

Create a new project by running the following command in your terminal:

```sh
$ npm create qwik@latest
```

You will need to provide a directory for your project (this guide will assume you chose `./qwik-app`) and select a starter from a provided list. Choose any of the QwikCity available options.

The command will also ask you if you would like to install npm dependencies, choose yes.

Next, add the [Qwik cloudflare-pages adaptor](https://qwik.builder.io/integrations/deployments/cloudflare-pages/#cloudflare-pages-adaptor) with the following commands:

```sh
$ cd qwik-app
$ npm run qwik add cloudflare-pages
```

Note that as part of the `cloudflare-pages` adaptor installation, a `functions/[[path]].ts` file will be created. The `[[path]]` filename indicates that this file will handle requests to all incoming URLs. Refer to [Path segments](/pages/platform/functions/routing/#dynamic-routes) to learn more.

After selecting your server option, change the directory to your project and render your project by running the following command:

```sh
$ npm start
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="qwik">}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Qwik site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, to preview how changes look to your site before deploying them to production.

## Use bindings in your Qwik application

A [binding](/pages/platform/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/workers/learning/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

In QwikCity, add server-side code via [routeLoaders](https://qwik.builder.io/qwikcity/route-loader/) and [actions](https://qwik.builder.io/qwikcity/action/). Then access bindings set for your application via the `platform` object provided by the framework.

The following code block shows an example of accessing a KV namespace in QwikCity.

```typescript
---
filename: src/routes/index.tsx
highlight: [4, 5]
---
// ...

export const useGetServerTime = routeLoader$(({ platform }) => {
  // the type `KVNamespace` comes from the @cloudflare/workers-types package
  const { MY_KV } = (platform as { MY_KV: KVNamespace }));

  return {
    // ....
  }
});
```

{{<render file="_learn-more.md" withParameters="Qwik">}}