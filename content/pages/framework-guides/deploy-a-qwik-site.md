---
pcx-content-type: how-to
title: Deploy a Qwik site
---

# Deploy a Qwik site

[Qwik](https://github.com/builderio/qwik) is an open-source, DOM-centric, resumable web application framework designed for best possible time to interactive by focusing on [resumability](https://github.com/BuilderIO/qwik/blob/main/docs/pages/guide/resumable-vs-replayable.mdx) of server-side rendering of HTML and [fine-grained lazy-loading](https://github.com/BuilderIO/qwik/blob/main/docs/pages/guide/lazy-loading.mdx) of code.

In this guide, you will create a new Qwik application and deploy it using Cloudflare Pages.

## Creating a new project

Create a new project by running the following command in your terminal:

```sh
$ npm create qwik@latest
```

You will be prompted to select a starter, of which you can choose any of the available options. Then you will be prompted to choose a server; this guide uses Cloudflare Pages.

By selecting _Cloudflare Pages_ as your server option in the terminal drop-down menu, your folder will have a `functions/[[path]].ts` file. The `[[path]]` filename indicates that this file will handle requests to all incoming URLs; refer to [Path segments](/pages/platform/functions/#path-segments) to learn more.

After selecting your server option, change the directory to your project and render your project by running the following command:

```sh
$ cd [whatever you named the project]
$ npm install
$ npm start
```

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Framework preset     | `Qwik`          |
| Build command        | `npm run build` |
| Build directory      | `dist`          |

</div>

{{<Aside type="warning">}}

Currently, Cloudflare uses Node `12.18.0` in the Pages build environment, but Qwik requires a newer node version >14.0.0 to build on Cloudflare Pages. To set the Node version, go to **Settings** in your Pages project > **Environment Variables** > **Production** and add `NODE_VERSION = v16.7.0` in your Production option.

{{</Aside>}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Qwik site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, to preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Qwik site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
