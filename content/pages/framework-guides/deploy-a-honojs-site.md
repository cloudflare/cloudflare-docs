---
pcx_content_type: how-to
title: Deploy a Honojs site
---

# Deploy a Honojs site

[Hono](https://honojs.dev/) - [炎] means flame🔥 in Japanese - is a small, simple, and ultrafast web framework for Cloudflare Workers, Deno, Bun, and others. Fast, but not only fast.  In this guide, you will create a new Honojs application and deploy it using Cloudflare Pages.

## Creating a new project

Create a new project by running the following commands in your terminal:

```sh
$ mkdir my-hono-app
$ cd my-hono-app
$ npm init -y

# Install the required dependencies. 
# ESBuild is needed to bundle the hono app code
# npm-run-all enables us to run multiple npm commands at once 
$ npm i --save-dev wrangler hono esbuild npm-run-all 
```

Now open the project in your cod editor of choice. For, example, we will use VS Code in this tutorial.

```shell
$ code .
```

In the project, add a `src/server.js` file.

Add the following content to the file.

```javascript
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hello world, this is Hono!!'))

export default app
```

Now, open your `package.json` file and update the `scripts` section.

```json
    "scripts": {
        "dev": "run-p dev:*",
        "dev:wrangler": "wrangler pages dev dist --live-reload",
        "dev:esbuild": "esbuild --bundle src/server.js --format=esm --watch --outfile=dist/_worker.js",
        "build": "esbuild --bundle src/server.js --format=esm --outfile=dist/_worker.js",
        "deploy": "wrangler pages publish dist"
    },
```

Here `npm-run-all` enables us to use a single command `npm run dev` to run `npm run dev:wrangler` and `npm run dev:esbuild` together simultaneously in watch mode.

## Running in local

Start your dev workflow using

```shell
$ npm run dev
```

You should be able to see the generated web app in http://localhost:8788

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
$ git remote add origin https://github.com/<yourgithubusername>/my-hono-app
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value         |
| -------------------- | ------------- |
| Production branch    | `main`        |
| Build command        | `npm run dev` |
| Build directory      | `dist`        |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `my-hono-app`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Honojs site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Next.js site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
