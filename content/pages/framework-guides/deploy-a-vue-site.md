---
pcx_content_type: how-to
title: Deploy a Vue site
---

# Deploy a Vue site

[Vue](https://vuejs.org/) is a progressive JavaScript framework for building user interfaces. A core principle of Vue is incremental adoption: this makes it easy to build Vue applications that live side-by-side with your existing code.

In this guide, you will create a new Vue application and deploy it using Cloudflare Pages. You will use `vue-cli`, a batteries-included tool for generating new Vue applications.

## Setting up a new project

First, install the Vue CLI using npm, and then run `vue create` in your terminal to create a new project called `my-vue-app`:

```sh
$ npx @vue/cli create my-vue-app
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

{{<pages-build-preset framework="vue">}}

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `vue`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Vue application, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

{{<render file="_learn-more.md" withParameters="Vue">}}