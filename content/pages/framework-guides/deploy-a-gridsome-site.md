---
pcx_content_type: how-to
title: Deploy a Gridsome site
---

# Deploy a Gridsome site

[Gridsome](https://gridsome.org) is a Vue.js powered Jamstack framework for building static generated websites and applications that are fast by default. In this guide, you will create a new Gridsome project and deploy it using Cloudflare Pages. You will use the [`@gridsome/cli`](https://github.com/gridsome/gridsome/tree/master/packages/cli), a command line tool for creating new Gridsome projects.

## Installing Gridsome

Install the `@gridsome/cli` by running the following command in your terminal:

```sh
$ npm install --global @gridsome/cli 
```

## Set up a new project

With Gridsome installed, you can set up a new project by running `gridsome create`. The `create` command accepts a name that defines the directory of the project created and an optional starter kit name. You can find out more in the [Gridsome starters section](https://gridsome.org/docs/starters/).

```sh
$ gridsome create my-gridsome-website
```

{{<render file="_tutorials-before-you-start.md">}}

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). When creating your repository, do not select to add a README file, `.gitignore` template or a license as these selections will cause the push to GitHub to fail. After your repository is set up, push your application to GitHub by running the following commands in your terminal:

```sh
$ git init
$ git add -A
$ git commit -m "<YOUR_COMMIT_MESSAGE>"
$ git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
$ git branch -M main
$ git push -u origin main
```

## Deploy with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** dashboard and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, the following information will be provided:

<div>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `gridsome build` |
| Build directory      | `dist`          |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `vuepress`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Gridsome project, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes to your site look before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Gridsome site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
