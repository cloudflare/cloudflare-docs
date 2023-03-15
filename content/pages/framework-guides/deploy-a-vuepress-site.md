---
pcx_content_type: how-to
title: Deploy a Vuepress site
---

# Deploy a Vuepress site

[VuePress](https://vuepress.vuejs.org/) is a minimalistic static site generator with a Vue-powered theming system and Plugin API. It is well optimized for writing technical documentation and was created to power Vue's own sub projects.

In this guide, you will create a new Vuepress project and deploy it using Cloudflare Pages. You will use the [`create-vuepress-site-generator`](https://github.com/vuepress/create-vuepress-site), a generator for creating new Vuepress projects.

## Set up a new project

Scaffold a Vuepress site using the `create-vuepress-site` tool to set up a new project, you can use `npx` or `yarn` by passing in `create-vuepress-site` and the name of the directory where you want the project to live:

```sh
$ npx create-vuepress-site [optionalDirectoryName]
```

The command will interactively prompt for details to configure your VuePress site’s metadata such the project name, description, maintainer's email and repository URL.

Once this is done, a scaffolded documentation site will be created in the `docs` directory and ready for you to customize or deploy. 

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploy with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** dashboard and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, the following information will be provided:

<div>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `dist`          |

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `vuepress`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Vuepress project, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes to your site look before deploying them to production.

{{<render file="_learn-more.md" withParameters="Vuepress">}}
