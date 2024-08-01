---
pcx_content_type: how-to
title: Hono
tags: [Hono]
---

# Hono

[Hono](https://honojs.dev/) is a small, simple, and ultrafast web framework for Cloudflare Pages and Workers, Deno, and Bun. In this guide, you will create a new Hono application and deploy it using Cloudflare Pages.

## Create a new project

Use the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to create a new project. C3 will create a new project directory, initiate Hono's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Hono project, run the following command:

```sh
$ npm create cloudflare@latest my-hono-app -- --framework=hono
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
  return await ctx.env.ASSETS.fetch(ctx.req.raw);
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

Then, run the following command.

```sh
$ npm install npm-run-all --save-dev
```

Installing `npm-run-all` enables you to use a single command (`npm run dev`) to run `npm run dev:wrangler` and `npm run dev:esbuild` simultaneously in watch mode.

## Run in local dev

Start your dev workflow by running:

```shell
$ npm run dev
```

You should be able to review your generated web application at `http://localhost:8788`.

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository.md">}}

## Deploy with Cloudflare Pages

{{<render file="_deploy-via-c3.md" withParameters="Hono">}}

### Deploy via the Cloudflare dashboard

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
Every time you commit new code to your Hono site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Related resources

### Tutorials

For more tutorials involving Hono, refer to the following resources:

{{<resource-by-selector tags="Hono" resource_type="tutorial" show_description=false >}}

### Demo apps

For demo applications using Hono, refer to the following resources:

{{<external-resources resource_type="apps" tags="Hono">}}
