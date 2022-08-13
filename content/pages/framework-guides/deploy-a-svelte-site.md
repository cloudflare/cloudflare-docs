---
pcx_content_type: how-to
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
| Environment Variables | `NODE_VERSION: 17` |

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

{{<Aside type="warning">}}

**Important:** SvelteKit requires Node.js >=16.9 or later to build successfully. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) > **Pages** > **Settings** > **Environment Variables** section and add a `NODE_VERSION` variable with a value of `17` or greater.

{{</Aside>}}

### SvelteKit Configuration

Currently, SvekteKit has three available adapters that you can use to deploy a SvelteKit project to Cloudflare Pages.

1. [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto)
2. [`@sveltejs/adapter-cloudflare`](https://www.npmjs.com/package/@sveltejs/adapter-cloudflare)
3. [`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static)

You will need to pick the one that best suits your use case.

### SvelteKit Adapter Auto

The SvelteKit project's default configuration uses [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto), which automatically chooses the adapter for your current environment. While you can use this default adapter when deploying to Cloudflare Pages by setting your **Build directory** to `.svelte-kit/cloudflare`, local development has a few disadvantages.

When building locally, [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto) has no way to know what platform you are going to deploy to. This will cause the build to fail. Since the environment variables are not set, you cannot use Cloudflare Pages features, like Direct Uploads or Functions, locally.

{{<Aside type= "note" header="Optional configuration">}}

SvelteKit detects Pages via the `CF_PAGES` environment variable. You can use the auto adapter and still get all the benefits of testing and building locally by updating your build command to `CF_PAGES=1 vite build`.

{{</Aside>}}

To deploy your Sveltekit application in production, update the **Build directory** to `.svelte-kit/cloudflare`. This lets the [`@sveltejs/adapter-auto` package](https://www.npmjs.com/package/@sveltejs/adapter-auto) know you are deploying to a Cloudflare Pages environment.

### SvelteKit Cloudflare

[`@sveltejs/adapter-cloudflare`](https://www.npmjs.com/package/@sveltejs/adapter-cloudflare) supports all SvelteKit features and builds for Cloudflare Pages. The Cloudflare adapter is recommended because it supports expected local development and production behaviours.

### Usage

To add the SvelteKit Cloudflare adapter to your application:

1. Install the Cloudflare Adapter by running `npm i --save-dev @sveltejs/adapter-cloudflare` in your terminal.
2. Include the adapter in `svelte.config.js`:

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

3. Include support for environment variables. The `env` object, containing KV namespaces and other storage objects, is passed to SvelteKit via the platform property along with context and caches, meaning you can access it in hooks and endpoints. For example:

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

4. Access the added KV or Durable objects namespace in your endpoint with `env` :

```js
export async function post({ request, platform }) {
	const counter = platform.env.COUNTER.idFromName('A');
}
```

When deploying with [`@sveltejs/adapter-cloudflare`](https://www.npmjs.com/package/@sveltejs/adapter-cloudflare) or [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto), select the new GitHub repository that you created and, in **Set up builds and deployments** of your Pages project setup, provide the following information:

<div>

| Configuration option  | Value                    |
| --------------------- | ------------------------ |
| Production branch     | `main`                   |
| Build command         | `npm run build`          |
| Build directory       | `.svelte-kit/cloudflare` |
| Environment Variables | `NODE_VERSION: 17 `      |

</div>

### SvelteKit Static adapter

The static adapter only produces client-side static assets (no server-side rendering) and is compatible with Cloudflare Pages. To use this adapter, install the [`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static) package:

```sh
$ npm install @sveltejs/adapter-static@next --save-dev
```

Then, in the `svelte.config.js` file, update the adapter selection:

```diff
---
filename:  svelte.config.js
---

++ import adapter from '@sveltejs/adapter-static';
++
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
++  adapter: adapter(
++  {
++     // default options are shown. On some platforms
++    // these options are set automatically — see below
++    pages: 'build',
++    assets: 'build',
++    fallback: null,
++    precompress: false
++  }
++),
++ prerender: {
++     // This can be false if you're using a fallback (i.e. SPA mode)
++      default: true
++  }

  }
};

export default config;
```

When deploying a SvelteKit application using [`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static) set the **Build directory** to `build`.

{{<Aside type="note">}}

**Important:** Remember to commit and push these changes to your GitHub repository.

{{</Aside>}}

### Finalize Setup

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

## Functions setup

In SvelteKit, functions are written as endpoints. Functions contained in the `/functions` directory at the project's root will not be included in the deployment, which compiles to a single `_worker.js` file.

When writing your endpoints in SvelteKit, attach the corresponding `onRequest` handler to your SvelteKit endpoint. For example:

```js
---
filename: src/routes/random.js
---
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	return {
		status: 200,
		headers: {
			'access-control-allow-origin': '*',
		},
		body: {
			number: Math.random(),
		},
	};
}
```

The `GET` request handler here will correspond to an `onRequestGet` in Pages Functions.
{{<Aside type= "note" header="SvelteKit Endpoints">}}
For more information about SvelteKit Endpoints, see the [SvelteKit docs](https://kit.svelte.dev/docs/routing#endpoints).
{{</Aside>}}

### Functions error logging

Logs are not available as Pages Functions is currently in beta. A third-party alternative, such as Sentry, can be used for logging with Pages Functions.

## Related resources

By completing this guide, you have successfully deployed your Svelte site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
