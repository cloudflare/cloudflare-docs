---
updated: 2020-09-23
difficulty: Beginner
pcx_content_type: tutorial
title: Migrating from Vercel to Pages
---

# Migrating from Vercel to Pages

In this tutorial, you will learn how to deploy your Vercel application to Cloudflare Pages.

{{<Aside type="note">}}

You should already have an existing project deployed on Vercel that you would like to host on Cloudflare Pages. Features such as Vercel's serverless functions are currently not supported in Cloudflare Pages.

{{</Aside>}}

## Finding your build command and build directory

To move your application to Cloudflare Pages, you will need to find your build command and build directory. Cloudflare Pages will use this information to build your application and deploy it.

In your Vercel Dashboard, find the project that you want to deploy. It should be configured to deploy from a GitHub repository.

![Selecting a site in the Vercel Dashboard](/images/pages/migrations/vercel-deploy-1.png)

Inside of your site dashboard, select **Settings**, then **General**.

![Selecting Site Settings in site dashboard](/images/pages/migrations/vercel-deploy-2.png)

Find the **Build & Development settings** panel, which will have the **Build Command** and **Output Directory** fields. If you are using a framework, these values may not be filled in, but will show the defaults used by the framework. Save these for deploying to Cloudflare Pages. In the below image, the **Build Command** is `npm run build`, and the **Output Directory** is `build`.

![Finding the Build Command and Output Directory fields](/images/pages/migrations/vercel-deploy-3.png)

## Creating a new Pages project

After you have found your build directory and build command, you can move your project to Cloudflare Pages.

The [Get started guide](/pages/get-started/) will instruct you how to add your GitHub project to Cloudflare Pages.

## Adding a custom domain

To use a custom domain for your Pages project, [add a custom domain](/pages/configuration/custom-domains/) that is the same custom domain as your currently deployed Vercel application. When Pages finishes the initial deploy of your site, you will need to delete the Vercel application to start sending requests to Cloudflare Pages.

{{<Aside type="note">}}

Cloudflare does not provide IP addresses for your Pages project because we do not require `A` or `AAAA` records to link your domain to your project. Instead, Cloudflare uses `CNAME` records.

For more details, refer to [Custom domains](/pages/configuration/custom-domains/).

{{</Aside>}}

## Cleaning up your old application and assigning the domain

In your DNS settings for your domain, make sure that you have updated the CNAME record for your domain from Vercel to Cloudflare Pages. With your DNS record updated, requests will go to your Pages application.

By completing this guide, you have successfully migrated your Vercel project to Cloudflare Pages.
