---
pcx_content_type: how-to
title: Deploy a Next.js site
---

# Deploy a Next.js site

[Next.js](https://nextjs.org) is an open-source React framework for creating websites and applications. In this guide, you will create a new Next.js application and deploy it using Cloudflare Pages.

This guide will instruct you how to deploy a full-stack Next.js project which uses the [Edge Runtime](https://nextjs.org/docs/app/api-reference/edge).

## Create a new project using the `create-cloudflare` CLI (C3)

To create a new Next.js site, open up your terminal and run:

```sh
$ npm create cloudflare@latest my-next-app -- --framework=next
```

`create-cloudflare` will:

- install necessary dependencies, including the [Wrangler](/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the `@cloudflare/next-on-pages` adapter
- ask you a series of setup questions
- allow you to setup a new git repo
- allow you to deploy your new project

After creating your project, a new `my-next-app` directory will be generated using the official default template, and will be fully compatible with Cloudflare.

Change to this directory to continue development.

```sh
$ cd my-next-app
```

If you chose to deploy, you will receive a unique subdomain for your project on `*.pages.dev`, and you can access it almost immediately.

## Configure and deploy a project without C3

If you already have a Next.js project or wish to manually create and deploy one without using c3, we recommend that you use `@cloudflare/next-on-pages` and refer to its [README](https://github.com/cloudflare/next-on-pages/tree/main/packages/next-on-pages#cloudflarenext-on-pages) for instructions and additional information to help you develop and deploy your project.

## Preview your site

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Next.js site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Use bindings in your Next.js application

A [binding](/pages/functions/bindings/) allows your application to interact with Cloudflare developer products, such as [KV](/kv/reference/how-kv-works/), [Durable Object](/durable-objects/), [R2](/r2/), and [D1](/d1/).

Cloudflare bindings must be set up for local and remote development.

### Set up bindings for local development

{{<Aside type="note">}}

Projects created with create-cloudflare have local bindings set up by default.

{{</Aside>}}

To set up bindings for use in local development, you will use the `setupDevBindings` function provided by [`@cloudflare/next-on-pages/next-dev`](https://github.com/cloudflare/next-on-pages/tree/main/internal-packages/next-dev). This function allows you to specify bindings that work locally, and are accessed the same way remote bindings are.

For example to work with a KV binding locally, you need to open `next.config.js` and add:

```js
// we only need to use the utility during development so we can check NODE_ENV
// (note: this check is recommended but completely optional)
if (process.env.NODE_ENV === "development") {
  // import the utility from the next-dev submodule
  const { setupDevBindings } = require("@cloudflare/next-on-pages/next-dev");

  // call the utility with the bindings you want to have access to
  setupDevBindings({
    bindings: {
      MY_KV: {
        type: "kv",
        id: "MY_KV",
      },
    },
  });
}
```

### Set up bindings for a deployed application

In orer to access bindings in a deployed application, you will need to [configure](/pages/functions/bindings/) any necessary bindings and connect them to your project via your project's settings page in the Cloudflare Dashboard.

### Access bindings in the application

Local and remote bindings can be accessed directly from `process.env`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: app/api/hello/route.js
highlight: [3]
---
export async function GET(request) {
  // this is the KV binding you defined in next.config.js
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
  // this is the KV binding you defined in next.config.js
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

Projects created with create-cloudflare have a default `env.d.ts` file.

{{</Aside>}}

In order to get proper type support, you'll need to create a new `env.d.ts` file in your project and declare a [binding](/pages/functions/bindings/).

The following is an example of adding a `KVNamespace` binding:

```ts
---
filename: env.d.ts
highlight: [5-11]
---
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
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

## Recommended development workflow

When developing a `next-on-pages` application, this is the development workflow that we recommend:

### Develop using the standard Next.js dev server

The [standard development server provided by Next.js](https://nextjs.org/docs/getting-started/installation#run-the-development-server) is the best available option for a fast and polished development experience. The `next-dev` submodule (as described in the [local bindings section](#set-up-bindings-for-local-development) above makes it possible to use Next.js' standard development server while still having access to your Cloudflare bindings.

### Build and preview your worker locally

In order to make sure that your application is being built in a manner that is fully compatible with Cloudflare Pages, before deploying it, or whenever you're comfortable checking the correctness of the application during your development process you'll want to build your worker and preview it locally using Cloudflare's `workerd` JavaScript runtime.

If you have created your project with C3, you can do this by running `npm run pages:build && npm run pages:dev`.

If you have created your project manually, you will need to run `npx @cloudflare/next-on-pages --watch` and preview it by running `wrangler pages dev .vercel/output/static --compatibility-flag=nodejs_compat`.

By doing this, you can run your application locally to make sure everything is working as you expect it to.

### Deploy your app and iterate

Once you've previewed your application locally then you can deploy it to Cloudflare Pages (both via [direct uploads](pages/get-started/direct-upload/) or git integration) and iterate over the process to make new changes.

## `Image` component

The Cloudflare network does not provide the same image optimization support as the Vercel network does, because of this the Next.js' `<Image />` component behaves differently from how it would in the Vercel network.

- If you build your application as a static site, the `<Image />` component will not serve any images.

- If you build your application using `@cloudflare/next-on-pages`, the component will work but it will not perform any image optimization (regardless of the [props](https://react.dev/learn/passing-props-to-a-component) you pass to it).

Both cases can be improved by setting up proper [loaders](https://nextjs.org/docs/pages/api-reference/components/image#loader) for the `<Image />` component, which allow you to use any image optimization service you want. To use [Cloudflare Images](/images/cloudflare-images/), refer to the [Next.js image resizing integration guide](/images/image-resizing/integration-with-frameworks/#nextjs).

{{<render file="_learn-more.md" withParameters="Next.js">}}
