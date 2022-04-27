---
updated: 2020-08-13
difficulty: Beginner
pcx-content-type: tutorial
title: Migrating from Workers Sites to Pages
---

# Migrating from Workers Sites to Pages

In this tutorial, you will learn how to migrate an existing [Cloudflare Workers Sites](https://workers.cloudflare.com/sites) application to Cloudflare Pages.

As a prerequisite, you should have a Cloudflare Workers Sites project, created with [Wrangler](https://github.com/cloudflare/wrangler).

Cloudflare Pages provides built-in defaults for every aspect of serving your site. You can port custom behaviour in your Workers script — such as custom caching logic — to your Cloudflare Pages project using [Functions](/pages/platform/functions/). This enables an easy to use file-based routing system. You can also migrate your custom headers and redirects to Pages. 

You may already have a reasonably complex Worker and/or it would be tedious to splice it up into Pages' file-based routing system. For these cases, Pages offers developers the ability to define a `_worker.js` file in the output directory of your Pages project. 

{{<Aside type="note">}}

When using a `_worker.js` file, the entire `/functions` directory is ignored – this includes its routing and middleware characteristics. Instead, the `_worker.js` file is deployed as is and must be written using the [Module Worker syntax](/workers/runtime-apis/fetch-event/#syntax-module-worker).

{{</Aside>}}

By Migrating to Cloudflare Pages, you will be able to access features like [preview deployments](/pages/platform/preview-deployments/) and automatic branch deploys with no extra configuration needed.

## Removing unnecessary code

Workers Sites projects consist of the following pieces:

1.  An application built with a [static site tool](/pages/how-to/) or a static collection of HTML, CSS and JavaScript
2. If using a static site tool, a build directory (called `bucket` in `wrangler.toml`) where the static project builds HTML, CSS, and JS
3. A Workers application for serving that directory

When moving to Cloudflare Pages, remove the Workers application and any associated `wrangler.toml` configuration files or build output. Instead, note and record your **build command** (if you have one), and the `bucket` field, or **build directory**, from the `wrangler.toml` file in your project's directory.

## Migrating Headers and Redirects.

You can migrate your redirects to Pages, by creating a `_redirects` file in your publish directory. Cloudflare currently offers limited support for advanced redirects. More support will be added in the future. Refer to the documentaion for a [list of supported types](/pages/platform/redirects/). 

{{<Aside type="note">}}

A project is limited to 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects. Each redirect declaration has a 1,000-character limit. Malformed definitions are ignored. If there are multiple redirects for the same source path, the topmost redirect is applied. 

Make sure that static redirects are before dynamic redirects in your `_redirects` file.

{{</Aside>}}

In addition to an `_redirects` file, Cloudflare Pages currently offers [Bulk Redirects (beta)](/pages/how-to/use-bulk-redirects/), which handles redirects that surpasses the 1,100 redirect rules limit set by Pages.


Your custom headers can also be moved into a `_headers` file in your publish directory. It is important to note that custom headers defined in the `_headers` file are not currently applied to responses from Functions, even if the Function route matches the URL pattern. To learn more about handling headers, refer to [Headers](/pages/platform/headers/).



## Creating a new Pages project

After you have recorded your **build command** and **build directory** in a separate location, remove everything else from your application, and push the new version of your project up to GitHub. Follow the ["Get started" guide](/pages/get-started/) to add your project to Cloudflare Pages, using the **build command** and **build directory** that you saved earlier.

If you choose to use a custom domain for your Pages project, you can set it to the same custom domain as your currently deployed Workers application. Follow the steps for [adding a custom domain](/pages/get-started/#adding-a-custom-domain) to your Pages project. 

{{<Aside type="note">}}

Before you deploy, you will need to delete the Workers application to start sending requests to Cloudflare Pages.

{{</Aside>}}
## Cleaning up your old application and assigning the domain

After you have deployed your application, navigate to [Workers](https://dash.cloudflare.com/?to=/:account/workers) and remove your old Workers project by going to your **Workers project** > **Settings** > **Delete**.

With your Workers application removed, requests will go to your Pages application. You have successfully migrated your Workers Sites project to Cloudflare Pages by completing this guide.
