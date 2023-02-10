---
pcx_content_type: how-to
title: Deploy a Qwik site
---

# Deploy a Qwik site

[Qwik](https://github.com/builderio/qwik) is an open-source, DOM-centric, resumable web application framework designed for best possible time to interactive by focusing on [resumability](https://qwik.builder.io/docs/concepts/resumable/), server-side rendering of HTML and [fine-grained lazy-loading](https://qwik.builder.io/docs/concepts/progressive/#lazy-loading) of code.

In this guide, you will create a new Qwik application implemented via [Qwik City](https://qwik.builder.io/qwikcity/overview/) (Qwik's meta-framework) and deploy it using Cloudflare Pages.

## Creating a new project

Create a new project by running the following command in your terminal:

```sh
$ npm create qwik@latest
```

You will need to provide a directory for your project (this guide will assume you chose `./qwik-app`) and select a starter from a provided list. Choose any of the QwikCity available options.

The command will also ask you if you would like to install npm dependencies, choose yes.

Next, add the [Qwik cloudflare-pages adaptor](https://qwik.builder.io/integrations/deployments/cloudflare-pages/#cloudflare-pages-adaptor) with the following commands:

```sh
$ cd qwik-app
$ npm run qwik add cloudflare-pages
```

Note that as part of the `cloudflare-pages` adaptor installation, a `functions/[[path]].ts` file will be created. The `[[path]]` filename indicates that this file will handle requests to all incoming URLs. Refer to [Path segments](/pages/platform/functions/#path-segments) to learn more.

After selecting your server option, change the directory to your project and render your project by running the following command:

```sh
$ npm start
```

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
$ git init
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git add .
$ git commit -m "Initial commit"
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

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Qwik site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, to preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Qwik site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
