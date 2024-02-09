---
pcx_content_type: how-to
title: Deploy a Qwik site
---

# Deploy a Qwik site

[Qwik](https://github.com/builderio/qwik) is an open-source, DOM-centric, resumable web application framework designed for best possible time to interactive by focusing on [resumability](https://qwik.builder.io/docs/concepts/resumable/), server-side rendering of HTML and [fine-grained lazy-loading](https://qwik.builder.io/docs/concepts/progressive/#lazy-loading) of code.

In this guide, you will create a new Qwik application implemented via [Qwik City](https://qwik.builder.io/qwikcity/overview/) (Qwik's meta-framework) and deploy it using Cloudflare Pages.

## Creating a new project using C3

The easiest way to get started is by using the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) CLI (also known as C3). To do so, open a terminal and run:

```sh
$ npm create cloudflare@latest my-qwik-app -- --framework=qwik
```

C3 will create a new project with `create-qwik` (Qwik's official project creation tool) and install the necessary adapters along with the [Wrangler CLI](/workers/wrangler/install-and-update/#check-your-wrangler-version).

## Migrating an existing Qwik application

If you have an existing Qwik project which you'd like to deploy to Cloudflare, simply add the `cloudflare-pages` adapter via the `qwik` cli.

From the terminal, run the following command in your project directory:

```sh
$ npm run qwik add cloudflare-pages
```

Please refer to the documentation of the [Cloudflare Pages Adapter](https://qwik.dev/docs/deployments/cloudflare-pages/) for more information on basic configuration and support for advanced use cases.

## Deploy your project

After creating your new project, C3 will give you the option of deploying an initial version of your application via [Direct Upload](/pages/how-to/use-direct-upload-with-continuous-integration/). You can re-deploy your application at any time by running following command inside your project directory:

```sh
$ npm run deploy
```

You can instead [connect a GitHub or Gitlab repository](/pages/configuration/git-integration) to your Pages project so that new versions of your project are built and deployed when changes to your git repository are detected. To do so, choose “No” when C3 asks if you’d like to deploy and refer to the guide below.

{{<Aside type="note">}}

This requires a basic understanding of [Git](https://git-scm.com/). If you are new to Git, refer to this [summarized Git handbook](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

{{</Aside>}}

### Create a new GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). Next, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
# Skip the following 3 commands if you've built your application
# using C3 or already committed your changes
$ git init
$ git add .
$ git commit -m "Initial commit"

$ git branch -M main
$ git remote add origin https://github.com/<your-gh-username>/<repository-name>
$ git push -u origin main
```

### Create a Pages project

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Navigate to [Workers & Pages > Create application > Pages > Connect to Git](https://dash.cloudflare.com/?to=/:account/pages/new/provider/github) and create a new pages project.

{{<Aside type="note">}}

Note that git integration cannot currently be added to existing Pages applications, so if you've already deployed your application via Direct Upload (using C3 for example), you will still need to create a new Pages application in order to proceed.

{{</Aside>}}

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="qwik">}}

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

## Bindings

A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/kv/reference/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](https://blog.cloudflare.com/introducing-d1/).

If you intend to use bindings in your project, you must first set them up for local and remote development.

Projects created via C3 come with a custom `vite` configuration that simplifies the process of working with bindings during development:

```typescript
---
filename: vite.config.ts
---
// ...
let env = {};

if(process.env.NODE_ENV === 'development') {
  const { getBindingsProxy } = await import('wrangler');
  const { bindings } = await getBindingsProxy();
  env = bindings;
}

export default defineConfig((): UserConfig => {
  return {
    // ....
    plugins: [
      qwikCity({ platform: { env } }),
      // ....
    ]
  };
});
```

The `getBindingsProxy` [helper function](/workers/wrangler/api#getbindingsproxy) will automatically detect any bindings defined in the `wrangler.toml` file and emulate them in local development. See [Wrangler configuration](workers/wrangler/configuration/#bindings) for more information on how to configure bindings in `wrangler.toml`.

{{<Aside type="note">}}
`wrangler.toml` is currently **only** used for local development. Bindings specified in it are not available remotely.
{{</Aside>}}

In order to access bindings in a deployed application, you will need to [configure them](/pages/functions/bindings/) in the Cloudflare dashboard on your project's settings page.

### Accessing bound resources in your application

In QwikCity, bindings can be accessed from server-side code via the `platform` object provided on [routeLoaders](https://qwik.builder.io/qwikcity/route-loader/) and [actions](https://qwik.builder.io/qwikcity/action/). The following code block shows an example of accessing a KV namespace in QwikCity.

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
