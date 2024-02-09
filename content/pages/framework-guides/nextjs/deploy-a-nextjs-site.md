---
pcx_content_type: how-to
title: Deploy a Next.js site
meta:
  description: Deploy a full-stack Next.js project.
---

# Deploy a Next.js site

[Next.js](https://nextjs.org) is an open-source React framework for creating websites and applications. In this guide, you will create a new Next.js application and deploy it using Cloudflare Pages.

This guide will instruct you how to deploy a full-stack Next.js project which uses the [Edge Runtime](https://nextjs.org/docs/app/api-reference/edge).

## Create a new project using the `create-cloudflare` CLI (C3)

Open up your terminal and run the following command to create a new Next.js site. Your Next.js site is configured for Cloudflare Pages using the [`create-cloudflare` CLI (C3)](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare).

```sh
$ npm create cloudflare@latest my-next-app -- --framework=next
```

C3 will install necessary dependencies, including the [Wrangler](/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the `@cloudflare/next-on-pages` adapter. C3 will also ask you a series of setup questions.

After creating your project, a new `my-next-app` directory will be generated using the default Next.js template, updated to be fully compatible with Cloudflare Pages.

Change to this directory to continue development.

```sh
$ cd my-next-app
```

If you chose to deploy, you will receive a unique subdomain for your project on `*.pages.dev`, and you can access it almost immediately.

To (re)deploy your application after having made changes, run the deployment command that C3 generates for you:

```sh
$ npm run pages:deploy
```

{{<Aside type="note" header="Git integration">}}

The initial deployment created via C3 is referred to as a [Direct Upload](/pages/get-started/direct-upload/). To set up a deployment via the Pages Git integration, refer to the [Git Integration](#git-integration) section below.

{{</Aside>}}

## Configure and deploy a project without C3

If you already have a Next.js project or wish to manually create and deploy one without using C3, Cloudflare recommends that you use `@cloudflare/next-on-pages` and refer to its [README](https://github.com/cloudflare/next-on-pages/tree/main/packages/next-on-pages#cloudflarenext-on-pages) for instructions and additional information to help you develop and deploy your project.

## Use bindings in your Next.js application

A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/kv/reference/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](/d1/).

If you intend to use bindings in your project, you must set them up for local and remote development.

### Set up bindings for local development

{{<Aside type="note">}}

Projects created with C3 have bindings for local development set up by default.

{{</Aside>}}

To set up bindings for use in local development, you will use the `setupDevBindings` function provided by [`@cloudflare/next-on-pages/next-dev`](https://github.com/cloudflare/next-on-pages/tree/main/internal-packages/next-dev). This function allows you to specify bindings that work locally, and are accessed the same way remote bindings are.

For example to work with a KV binding locally, you need to open `next.config.mjs` and add:

```js
---
filename: next.config.mjs
highlight: [1, 6-18]
---
import { setupDevBindings } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {};

// we only need to use the function during development so Cloudflare can check `NODE_ENV`
// (note: this check is recommended but completely optional)
if (process.env.NODE_ENV === 'development') {
  // call the function with the bindings you want to have access to
  await setupDevBindings({
    bindings: {
      MY_KV: {
        type: "kv",
        id: "MY_KV",
      },
    },
  });
}

export default nextConfig;
```

### Set up bindings for a deployed application

In order to access bindings in a deployed application, you will need to [configure](/pages/functions/bindings/) any necessary bindings and connect them to your project via your project's settings page in the Cloudflare dashboard.

### Access bindings in the application

Local and remote bindings can be accessed directly from `process.env`. The following code example requires you to indicate `Yes` to C3's `Would you like to use App Router? (recommended)` setup question.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: app/api/hello/route.js
highlight: [3]
---
export async function GET(request) {
  // this is the KV binding you defined in next.config.mjs
  const myKv = process.env.MY_KV;

  // get a value from the namespace
  const kvValue = await myKv.get(`kvTest`) || false;

  return new Response(`The value of kvTest in MY_KV is: ${kvValue}`)
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
---
filename: app/api/hello/route.ts
highlight: [3]
---
export async function GET(request: NextRequest) {
  // this is the KV binding you defined in next.config.mjs
  const myKv = process.env.MY_KV;

  // get a value from the namespace
  const kvValue = await myKv.get(`kvTest`) || false;

  return new Response(`The value of kvTest in MY_KV is: ${kvValue}`)
}
```

{{</tab>}}
{{</tabs>}}

### Add bindings to Typescript projects

{{<Aside type="note">}}

Projects created with C3 have a default `env.d.ts` file.

{{</Aside>}}

In order to get proper type support, you need to create a new `env.d.ts` file in your project and declare a [binding](/pages/functions/bindings/).

The following is an example of adding a `KVNamespace` binding:

```ts
---
filename: env.d.ts
highlight: [4-10]
---
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // The KV Namespace binding type used here comes
      // from `@cloudflare/workers-types`, in order to
      // use it like so, make sure that you have installed
      // the package as a dev dependency and you have added
      // it to your `tsconfig.json` file under
      // `compilerOptions.types`.
      MY_KV: KVNamespace;
    }
  }
}

export {};
```

## `Image` component

The Cloudflare network does not provide the same image optimization support as the Vercel network does, because of this the Next.js' `<Image />` component behaves differently from how it would in the Vercel network.

- If you build your application as a static site, the `<Image />` component will not serve any images.

- If you build your application using `@cloudflare/next-on-pages`, the component will work but it will not perform any image optimization (regardless of the [props](https://react.dev/learn/passing-props-to-a-component) you pass to it).

Both cases can be improved by setting up proper [loaders](https://nextjs.org/docs/pages/api-reference/components/image#loader) for the `<Image />` component, which allow you to use any image optimization service you want. To use [Cloudflare Images](/images/), refer to [resize with Cloudflare Workers](/images/transform-images/transform-via-workers/).

## Git integration

In addition to Direct Upload deployments, you can make use of the Pages [Git integration](/pages/configuration/git-integration), which allows you to connect a GitHub repository to your Pages application and have the application automatically built and deployed after each new commit is pushed to it.

This requires a basic understanding of [Git](https://git-scm.com/). If you are new to Git, refer to this [summarized Git handbook](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

### Create a new GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
# Skip the following 3 commands if you have built your application
# using C3 or already committed your changes
$ git init
$ git add .
$ git commit -m "Initial commit"

$ git branch -M main
$ git remote add origin https://github.com/<your-gh-username>/<repository-name>
$ git push -u origin main
```
### Connect your application to the GitHub repository via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.

{{<Aside type="note">}}

Note that the Git integration cannot currently be added to existing Pages applications. If you have already deployed your application (using C3 for example), you need to create a new Pages application in order to add the Git integration to it.

{{</Aside>}}

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer. However, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="next-js">}}

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

4. After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.
Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

## Recommended development workflow

When developing a `next-on-pages` application, this is the development workflow that Cloudflare recommends:

### Develop using the standard Next.js dev server

The [standard development server provided by Next.js](https://nextjs.org/docs/getting-started/installation#run-the-development-server) is the best available option for a fast and polished development experience. The `next-dev` submodule (as described in the [local bindings section](#set-up-bindings-for-local-development) above makes it possible to use Next.js' standard development server while still having access to your Cloudflare bindings.

### Build and preview your application locally

In order to make sure that your application is being built in a manner that is fully compatible with Cloudflare Pages, before deploying it, or whenever you are comfortable checking the correctness of the application during your development process you will want to build and preview it locally using Cloudflare's `workerd` JavaScript runtime.

If you have created your project with C3, do this by running:

```sh
$ npm run pages:build && npm run pages:dev
```

If you have created your project without C3, run:

```sh
$ npx @cloudflare/next-on-pages --watch
```

And preview your project by running:

```sh
$ npx wrangler pages dev .vercel/output/static --compatibility-flag=nodejs_compat
```

By doing this, you can run your application locally to make sure everything is working as you expect it to.

### Deploy your application and iterate

After you have previewed your application locally, you can deploy it to Cloudflare Pages (both via [Direct Uploads](/pages/get-started/direct-upload/) or Git integration) and iterate over the process to make new changes.

{{<render file="_learn-more.md" withParameters="Next.js">}}
