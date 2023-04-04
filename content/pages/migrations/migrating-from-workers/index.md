---
updated: 2020-08-13
difficulty: Beginner
pcx_content_type: tutorial
layout: single
title: Migrating from Workers Sites to Pages
---

# Migrating from Workers Sites to Pages

In this tutorial, you will learn how to migrate an existing [Cloudflare Workers Sites](https://workers.cloudflare.com/sites) application to Cloudflare Pages.

As a prerequisite, you should have a Cloudflare Workers Sites project, created with [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler).

Cloudflare Pages provides built-in defaults for every aspect of serving your site. You can port custom behavior in your Worker — such as custom caching logic — to your Cloudflare Pages project using [Functions](/pages/platform/functions/). This enables an easy-to-use, file-based routing system. You can also migrate your custom headers and redirects to Pages. 

You may already have a reasonably complex Worker and/or it would be tedious to splice it up into Pages' file-based routing system. For these cases, Pages offers developers the ability to define a `_worker.js` file in the output directory of your Pages project. 

{{<Aside type="note">}}

When using a `_worker.js` file, the entire `/functions` directory is ignored – this includes its routing and middleware characteristics. Instead, the `_worker.js` file is deployed as is and must be written using the [Module Worker syntax](/workers/runtime-apis/fetch-event/#syntax-module-worker).

{{</Aside>}}

By migrating to Cloudflare Pages, you will be able to access features like [preview deployments](/pages/platform/preview-deployments/) and automatic branch deploys with no extra configuration needed.

## Remove unnecessary code

Workers Sites projects consist of the following pieces:

1. An application built with a [static site tool](/pages/how-to/) or a static collection of HTML, CSS and JavaScript files.
2. If using a static site tool, a build directory (called `bucket` in `wrangler.toml`) where the static project builds your HTML, CSS, and JavaScript files.
3. A Worker application for serving that build directory. For most projects, this is likely to be the `workers-site` directory.

When moving to Cloudflare Pages, remove the Workers application and any associated `wrangler.toml` configuration files or build output. Instead, note and record your `build` command (if you have one), and the `bucket` field, or build directory, from the `wrangler.toml` file in your project's directory.

## Migrate headers and redirects

You can migrate your redirects to Pages, by creating a `_redirects` file in your output directory. Pages currently offers limited support for advanced redirects. More support will be added in the future. For a list of support types, refer to the [Redirects documentaion](/pages/platform/redirects/). 

{{<Aside type="note">}}

A project is limited to 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects. Each redirect declaration has a 1,000-character limit. Malformed definitions are ignored. If there are multiple redirects for the same source path, the topmost redirect is applied. 

Make sure that static redirects are before dynamic redirects in your `_redirects` file.

{{</Aside>}}

In addition to an `_redirects` file, Cloudflare also offers [Bulk Redirects (beta)](/pages/how-to/use-bulk-redirects/), which handles redirects that surpasses the 2,100 redirect rules limit set by Pages.

Your custom headers can also be moved into a `_headers` file in your output directory. It is important to note that custom headers defined in the `_headers` file are not currently applied to responses from Functions, even if the Function route matches the URL pattern. To learn more about handling headers, refer to [Headers](/pages/platform/headers/).


## Create a new Pages project

### Connect to your git provider

After you have recorded your **build command** and **build directory** in a separate location, remove everything else from your application, and push the new version of your project up to your git provider. Follow the [Get started guide](/pages/get-started/) to add your project to Cloudflare Pages, using the **build command** and **build directory** that you saved earlier.

If you choose to use a custom domain for your Pages project, you can set it to the same custom domain as your currently deployed Workers application. Follow the steps for [adding a custom domain](/pages/platform/custom-domains/#add-a-custom-domain) to your Pages project. 

{{<Aside type="note">}}

Before you deploy, you will need to delete your old Workers routes to start sending requests to Cloudflare Pages.

{{</Aside>}}

### Using Direct Upload

If your Workers site has its custom build settings, you can bring your prebuilt assets to Pages with [Direct Uploads](/pages/platform/direct-upload/). In addition, you can serve your website's assets right to the Cloudflare global network by either using the [Wrangler CLI](/workers/wrangler/install-and-update/) or the drag and drop option. 

These options allow you to create and name a new project from the CLI or dashboard. After your project deployment is complete, you can set the custom domain by following the [adding a custom domain](/pages/platform/custom-domains/#add-a-custom-domain) steps to your Pages project. 

## Cleaning up your old application and assigning the domain

After you have deployed your application, navigate to [Workers](https://dash.cloudflare.com/?to=/:account/workers) and remove your old Workers project by going to your **Workers project** > **Settings** > **Delete**.

With your Workers application removed, requests will go to your Pages application. You have successfully migrated your Workers Sites project to Cloudflare Pages by completing this guide.
