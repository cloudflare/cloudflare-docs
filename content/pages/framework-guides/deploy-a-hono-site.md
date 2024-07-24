---
pcx_content_type: how-to
title: Hono
---

# Hono

[Hono](https://honojs.dev/) is a small, simple, ultrafast web framework for Cloudflare Pages and Workers, Deno, and Bun. In this guide, you will create and deploy a new Hono application using Cloudflare Pages.

## Create a new project

Use the [`create-hono`](https://www.npmjs.com/package/create-hono) CLI to create a new project.

To use `create-hono` to create a new Hono project, run the following command:

```sh
$ npm create hono@latest my-hono-app
```

Hono will ask:

1. Which template do you want to use? Select `cloudflare-pages`
2. Do you want to install project dependencies? Choose yes (y)
3. Which package manager do you want to use? Select your choice of package manager

In your project open the `src/index.tsx` file, and you should see the following

```ts
import { Hono } from "hono";
import { renderer } from "./renderer";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello!</h1>);
});

export default app;
```

## Run in local dev

Start your dev workflow by running:

```shell
$ npm run dev
```

You should be able to review your generated web application at `http://localhost:5174`.

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository.md">}}

## Deploy with Cloudflare Pages

### Deploy via npm command

In package.json, `$npm_execpath` needs to be changed to your package manager of choice. Then run:

```shell
$ npm run deploy
```

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

{{<render file="/_framework-guides/_learn-more.md" withParameters="Hono">}}
