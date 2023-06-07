---
pcx_content_type: how-to
title: Deploy a Hono site
---

# Deploy a Hono site

[Hono](https://honojs.dev/) is a small, simple, and ultrafast web framework for Cloudflare Pages and Workers, Deno, and Bun. In this guide, you will create a new Hono application and deploy it using Cloudflare Pages.

## Create a new project

Create a new project by running the following commands in your terminal:

```sh
$ mkdir my-hono-app
$ cd my-hono-app
$ npm init -y

# Make sure Hono is installed
$ npm install hono

# Install the required dependencies
# ESBuild is needed to bundle the hono app code
# npm-run-all enables us to run multiple npm commands at once
$ npm install --save-dev wrangler esbuild npm-run-all
```

If you want your application to use TypeScript, you need to generate a `tsconfig.json` file. To generate a `tsconfig.json` file, run:

```sh
$ npm install --save-dev typescript
$ npx tsc --init
```

Open your project and create a `src/server.js` file (or `src/server.ts` if you are using TypeScript). Add the following content to your file:

```javascript
import { Hono } from "hono";
const app = new Hono();

app.get("/", (ctx) => ctx.text("Hello world, this is Hono!!"));

export default app;
```

To serve static files like CSS, image or JavaScript files, add the following to your `src/server.js/ts` file:

```javascript
app.get("/public/*", async (ctx) => {
  return await ctx.env.ASSETS.fetch(ctx.req);
});
```

This will cause all the files in the `public` folder within `dist` to be served in your application.

{{<Aside type="note">}}

The `dist` directory is created and used during the bundling process. You will need to create a `public` directory in the `dist` directory. Having `public` inside `dist` is not generally wanted as `dist` is not a directory to commit to your repository whilst `public` is.

There are different alternatives to fix this issue. For example, you can configure your `.gitignore` file to include the `dist` directory, but ignore all its context except the `public` directory. Alternatively, you can create a `public` directory somewhere else and copy it inside `dist` as part of the bundling process.

{{</Aside>}}

Open your `package.json` file and update the `scripts` section:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```json
---
filename: package.json
---
    "scripts": {
        "dev": "run-p dev:*",
        "dev:wrangler": "wrangler pages dev dist --live-reload",
        "dev:esbuild": "esbuild --bundle src/server.js --format=esm --watch --outfile=dist/_worker.js",
        "build": "esbuild --bundle src/server.js --format=esm --outfile=dist/_worker.js",
        "deploy": "wrangler pages publish dist"
    },
```

{{</tab>}}
{{<tab label="ts">}}

```json
---
filename: package.json
---
    "scripts": {
        "dev": "run-p dev:*",
        "dev:wrangler": "wrangler pages dev dist --live-reload",
        "dev:esbuild": "esbuild --bundle src/server.ts --format=esm --watch --outfile=dist/_worker.js",
        "build": "esbuild --bundle src/server.ts --format=esm --outfile=dist/_worker.js",
        "deploy": "wrangler pages publish dist"
    },
```

{{</tab>}}
{{</tabs>}}

In the above example, `npm-run-all` enables you to use a single command (`npm run dev`) to run `npm run dev:wrangler` and `npm run dev:esbuild` simultaneously in watch mode.

## Run in local dev

Start your dev workflow by running:

```shell
$ npm run dev
```

You should be able to review your generated web application at `http://localhost:8788`.

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `dist`          |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `my-hono-app`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Hono site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

{{<render file="_learn-more.md" withParameters="Hono">}}
