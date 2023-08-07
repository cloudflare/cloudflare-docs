---
pcx_content_type: how-to
title: Deploy a Gridsome site
---

# Deploy a Gridsome site

[Gridsome](https://gridsome.org) is a Vue.js powered Jamstack framework for building static generated websites and applications that are fast by default. In this guide, you will create a new Gridsome project and deploy it using Cloudflare Pages. You will use the [`@gridsome/cli`](https://github.com/gridsome/gridsome/tree/master/packages/cli), a command line tool for creating new Gridsome projects.

## Install Gridsome

Install the `@gridsome/cli` by running the following command in your terminal:

```sh
$ npm install --global @gridsome/cli
```

## Set up a new project

With Gridsome installed, set up a new project by running `gridsome create`. The `create` command accepts a name that defines the directory of the project created and an optional starter kit name. You can review more starters in the [Gridsome starters section](https://gridsome.org/docs/starters/).

```sh
$ npx gridsome create my-gridsome-website
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, the following information will be provided:

{{<pages-build-preset framework="gridsome">}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `vuepress`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Gridsome project, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes to your site look before deploying them to production.

{{<render file="_learn-more.md" withParameters="Gridsome">}}