---
pcx_content_type: how-to
title: Static deployment
meta:
  description: Deploy a static Next.js site with static exports.
---

# Deploy a static Next.js site

{{<Aside type="note">}}

Do not use this guide unless you have a specific use case for static exports. Cloudflare recommends using the [Deploy a Next.js site](/pages/framework-guides/nextjs/deploy-a-nextjs-site/) guide.

{{</Aside>}}

[Next.js](https://nextjs.org) is an open-source React framework for creating websites and applications. In this guide, you will create a new Next.js application and deploy it using Cloudflare Pages.

This guide will instruct you how to deploy a static site Next.js project with [static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).

{{<render file="_tutorials-before-you-start.md">}}

## Select your Next.js project

If you already have a Next.js project that you wish to deploy, ensure that it is [configured for static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports), change to its directory, and proceed to the next step. Otherwise, use `create-next-app` to create a new Next.js project.

```sh
$ npx create-next-app --example with-static-export my-app
```

After creating your project, a new `my-app` directory will be generated using the official [`with-static-export`](https://github.com/vercel/next.js/tree/canary/examples/with-static-export) example as a template. Change to this directory to continue.

```sh
$ cd my-app
```

### Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
git remote add origin https://github.com/<GH_USERNAME>/<REPOSITORY_NAME>
git branch -M main
git push -u origin main
```

### Deploy your application to Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Next.js (Static HTML Export)_ as your **Framework preset**. Your selection will provide the following information.

{{<pages-build-preset framework="next-js-static">}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `next`, your project dependencies, and building your site before deploying it.

## Preview your site

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Next.js site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).