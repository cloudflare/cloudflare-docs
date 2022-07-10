---
pcx-content-type: how-to
title: Deploy a Svelte site
---

# Deploy a Svelte site

[Svelte](https://svelte.dev) is an increasingly popular, open-source framework for building user interfaces and web applications. Unlike most frameworks, Svelte is primarily a compiler that converts your component code into efficient JavaScript that surgically updates the DOM when your application state changes.

In this guide, you will create a new Svelte application and deploy it using Cloudflare Pages.
You will use [`SvelteKit`](https://kit.svelte.dev/), the official Svelte framework for building web applications of all sizes.

{{<Aside type="warning">}}

**Note:** At this guide's time of publication, SvelteKit is still in beta. However, the Svelte team is confident that the steps below are stable. This guide will be updated as needed, both during and after the beta phase.

{{</Aside>}}

## Setting up a new project

Create a new project by running the [`npm init`](https://docs.npmjs.com/cli/v6/commands/npm-init) command in your terminal, giving it a title:

```sh
$ npm init svelte@next my-svelte-app
$ cd my-svelte-app
```

During `init`, SvelteKit will prompt you for customization choices. Your answers will not affect the rest of this tutorial. Choose the option that is ideal for your project.

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
# Setup the local repository
$ git init
$ git remote add origin https://github.com/<username>/<repo>
$ git branch -M main

# Commit all initial files
$ git add -A
$ git commit -m "initial commit"

# Send commit to new GitHub repo
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option  | Value              |
| --------------------- | ------------------ |
| Production branch     | `main`             |
| Build command         | `npm run build`    |
| Build directory       | `build`            |
| Environment Variables | `NODE_VERSION: 16` |

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

{{<Aside type="warning">}}

**Important:** SvelteKit requires Node.js v16.x or later to build successfully. You must expand the **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `16` or greater.

{{</Aside>}}

### SvelteKit Configuration

Currently, SvekteKit has three available adapters that you can use to deploy a SvelteKit project to Cloudflare Pages. 

1. [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto)
2. [`@sveltejs/adapter-cloudflare`](https://www.npmjs.com/package/@sveltejs/adapter-cloudflare) 
3. [`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static)

You will need to pick the one that best suits your use case. 

### SvelteKit Adapter Auto

The SvelteKit project's default configuration uses [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto), which automatically chooses the adapter for your current environment. While you can use this default adapter when deploying to Cloudflare Pages by setting your **Build directory** to `.svelte-kit/cloudflare`, local development has a few drawbacks. 

When building locally, [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto) has no way to know what platform you're going to deploy to, so the build fails. Also, since the environment variables aren't set, you can not use Cloudflare Pages features like Direct uploads or use Functions locally. 

{{<Aside type= "note" header="Optional configuration">}}

SvelteKit detects Pages via the `CF_PAGES` environment variable. You can use the auto adapter and still get all the benefits of testing and building locally by updating your build command to `CF_PAGES=1 vite build`.

{{</Aside>}}

However, in production, to deploy your Sveltekit application on Pages, First update the **Build directory** to `.svelte-kit/cloudflare`; this lets the [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto) know you are deploying to a Cloudflare Pages environment.

### SvelteKit Cloudflare 

[`@sveltejs/adapter-cloudflare`](https://www.npmjs.com/package/@sveltejs/adapter-Cloudflare) supports all SvelteKit features and builds for Cloudflare Pages. The Cloudflare adapter is recommended because it supports expected local development and Production behaviours. 

### Usage

You can add this adapter to your application in the following steps: 

1. Install the Cloudflare Adapter by running `npm i --save-dev @sveltejs/adapter-Cloudflare in your terminal 

2. Include the adapter in the `svelte.config.js`

```diff
---
filename: svelte.config.js
---
++ import adapter from '@sveltejs/adapter-cloudflare';
++
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
++  adapter: adapter(),
    // ... truncated ...
  }
};

export default config;
```
3. Include support for environment variables; the `env` object containing KV namespaces etc, is passed to SvelteKit via the platform property along with context and caches, meaning you can access it in hooks and endpoints, for example:

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
In your component access bindings like KV and durable objects namespace with `env` : 

```js
export async function post({ request, platform }) {
  const counter = platform.env.COUNTER.idFromName('A');
}
```

### SvelteKit Static adapter
The static adapter only produces client-side static assets; compatible with Cloudflare Pages. To use this adapter first, install the [`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static) package:

```sh
$ npm install @sveltejs/adapter-static@next --save-dev
```

Then, in the `svelte.config.js` file, update the adapter selection:

```diff
++ import adapter from '@sveltejs/adapter-static';
++
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
++  adapter: adapter(),
    // ... truncated ...
  }
};

export default config;
```

Regardless of the adapter you pick, when deploying, select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option  | Value                   |
| --------------------- | ----------------------- |
| Production branch     | `main`                  |
| Build command         | `npm run build`         |
| Build directory       | `.svelte-kit/cloudflare`|
| Environment Variables | `NODE_VERSION: 16 or 14`|

</div>


### Finalize Setup

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

## Learn more

By completing this guide, you have successfully deployed your Svelte site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
