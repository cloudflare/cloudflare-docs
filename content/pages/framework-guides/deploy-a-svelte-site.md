---
pcx_content_type: how-to
title: Deploy a Svelte site
---

# Deploy a Svelte site

[Svelte](https://svelte.dev) is an increasingly popular, open-source framework for building user interfaces and web applications. Unlike most frameworks, Svelte is primarily a compiler that converts your component code into efficient JavaScript that surgically updates the DOM when your application state changes.

In this guide, you will create a new Svelte application and deploy it using Cloudflare Pages.
You will use [`SvelteKit`](https://kit.svelte.dev/), the official Svelte framework for building web applications of all sizes.

## Setting up a new project

Use the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate Svelte's official setup tool, and provide the option to deploy instantly.


To use `create-cloudflare` to create a new Svelte project, run the following command:

```sh
$ npm create cloudflare@latest my-svelte-app -- --framework=svelte
```

SvelteKit will prompt you for customization choices. For the template option, choose one of the application/project options. The remaining answers will not affect the rest of this guide. Choose the options that suit your project.

`create-cloudflare` will then install dependencies, including the [Wrangler](/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the `@sveltejs/adapter-cloudflare` adapter, and ask you setup questions.

After you have installed your project dependencies, start your application:

```sh
$ npm run dev
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository.md">}}

## SvelteKit Cloudflare configuration

To use SvelteKit with Cloudflare Pages, you need to add the [Cloudflare adapter](https://kit.svelte.dev/docs/adapter-cloudflare) to your application.

{{<render file="_c3-adapter.md">}}

1. Install the Cloudflare Adapter by running `npm i --save-dev @sveltejs/adapter-cloudflare` in your terminal.
2. Include the adapter in `svelte.config.js`:

```diff
---
filename: svelte.config.js
---
- import adapter from '@sveltejs/adapter-auto';
+ import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    // ... truncated ...
  }
};

export default config;
```

3. (Needed if you are using TypeScript) Include support for environment variables. The `env` object, containing KV namespaces and other storage objects, is passed to SvelteKit via the platform property along with context and caches, meaning you can access it in hooks and endpoints. For example:

```diff
---
filename:  src/app.d.ts
---

declare namespace App {
    interface Locals {}

+   interface Platform {
+       env: {
+           COUNTER: DurableObjectNamespace;
+       };
+       context: {
+           waitUntil(promise: Promise<any>): void;
+       };
+       caches: CacheStorage & { default: Cache }
+   }

    interface Session {}

    interface Stuff {}
}

```

4. Access the added KV or Durable objects (or generally any [binding](/pages/functions/bindings/)) in your endpoint with `env`:

```js
export async function post(context) {
  const counter = context.platform.env.COUNTER.idFromName("A");
}
```

{{<Aside type="note">}}

In addition to the Cloudflare adapter, review other adapters you can use in your project:

- [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto)

  SvelteKit's default adapter automatically chooses the adapter for your current environment. If you use this adapter, [no configuration is needed](https://kit.svelte.dev/docs/adapter-auto). However, the default adapter introduces a few disadvantages for local development because it has no way of knowing what platform the application is going to be deployed to.

To solve this issue, provide a `CF_PAGES` variable to SvelteKit so that the adapter can detect the Pages platform. For example, when locally building the application: `CF_PAGES=1 vite build`.

- [`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static)
  Only produces client-side static assets (no server-side rendering) and is compatible with Cloudflare Pages.
  Review the [official SvelteKit documentation](https://kit.svelte.dev/docs/adapter-static) for instructions on how to set up the adapter. Keep in mind that if you decide to use this adapter, the build directory, instead of `.svelte-kit/cloudflare`, becomes `build`. You must also configure your Cloudflare Pages application's build directory accordingly.

{{</Aside>}}

{{<Aside type="warning">}}

If you are using any adapter different from the default SvelteKit adapter, remember to commit and push your adapter setting changes to your GitHub repository before attempting the deployment.

{{</Aside>}}

## Deploy with Cloudflare Pages

{{<render file="_deploy-via-c3.md" withParameters="Svelte">}}

### Deploy via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this authorization to deploy your projects from your GitHub account. You may narrow Cloudflare's access to specific repositories. However, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in **Set up builds and deployments**, provide the following information:

<div>

{{<pages-build-preset framework="sveltekit">}}

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

## Functions setup

In SvelteKit, functions are written as endpoints. Functions contained in the `/functions` directory at the project's root will not be included in the deployment, which compiles to a single `_worker.js` file.

To have the functionality equivalent to Pages Functions [`onRequests`](/pages/functions/api-reference/#onrequests), you need to write standard request handlers in SvelteKit. For example, the following TypeScript file behaves like an `onRequestGet`:

```ts
---
filename: src/routes/random/+server.ts
---
import type { RequestHandler } from './$types';

export const GET = (({ url }) => {
  return new Response(String(Math.random()));
}) satisfies RequestHandler;
```

{{<Aside type= "note" header="SvelteKit API Routes">}}
For more information about SvelteKit API Routes, refer to the [SvelteKit documentation](https://kit.svelte.dev/docs/routing#server).
{{</Aside>}}

{{<render file="/_framework-guides/_learn-more.md" withParameters="Svelte">}}
