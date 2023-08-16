---
pcx_content_type: how-to
title: Deploy a Gatsby site
---

# Deploy a Gatsby site

[Gatsby](https://www.gatsbyjs.com/) is an open-source React framework for creating websites and apps. In this guide, you will create a new Gatsby application and deploy it using Cloudflare Pages. You will be using the `gatsby` CLI to create a new Gatsby site.

## Install Gatsby

Install the `gatsby` CLI by running the following command in your terminal:

```sh
$ npm install -g gatsby-cli
```

## Create a new project

With Gatsby installed, you can create a new project using `gatsby new`. The `new` command accepts a GitHub URL for using an existing template. As an example, use the `gatsby-starter-lumen` template by running the following command in your terminal. You can find more in [Gatsby's Starters section](https://www.gatsbyjs.com/starters/?v=2):

```sh
$ npx gatsby new my-gatsby-site https://github.com/alxshelepenok/gatsby-starter-lumen
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="gatsby">}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `gatsby`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Gatsby site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Dynamic routes

If you are using [dynamic routes](https://www.gatsbyjs.com/docs/reference/functions/routing/#dynamic-routing) in your Gatsby project, set up a [proxy redirect](/pages/platform/redirects/#proxying) for these routes to take effect.

If you have a dynamic route, such as `/users/[id]`, create your proxy redirect by referring to the following example:

```
/users/* /users/[id] 200
```

{{<render file="_learn-more.md" withParameters="Gatsby">}}