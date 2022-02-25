---
updated: 2020-08-13
difficulty: Beginner
pcx-content-type: tutorial
title: Migrating from Workers Sites to Pages
---

# Migrating from Workers Sites to Pages

In this tutorial, you will learn how to migrate an existing [Cloudflare Workers Sites](https://workers.cloudflare.com/sites) application to Cloudflare Pages.

As a prerequisite, you should have a Cloudflare Workers Sites project, created with [Wrangler](https://github.com/cloudflare/wrangler).

Cloudflare Pages provides built-in defaults for every aspect of serving your site. Currently, you cannot port custom behavior in your Workers script — such as custom caching logic — over to your Cloudflare Pages. If you need that behavior, keep using your Cloudflare Workers application.

If you did not need to customize a Workers Sites template, migrating your static site to Cloudflare Pages will be easy to do. You will be able to access features like [preview deployments](/pages/platform/preview-deployments/) and automatic branch deploys with no extra configuration needed.

## Removing unnecessary code

Workers Sites projects consist of the following pieces:

1.  An application built with a [static site tool](/pages/how-to/) or a static collection of HTML, CSS and JavaScript
2.  If using a static site tool, a build directory (called `bucket` in `wrangler.toml`) where the static project builds HTML, CSS, and JS
3.  A Workers application for serving that directory

When moving to Cloudflare Pages, remove the Workers application, and any associated `wrangler.toml` configuration files or build output. Instead, note and record your **build command** (if you have one), and the `bucket` field, or **build directory**, from the `wrangler.toml` file in your project's directory.

## Creating a new Pages project

After you have recorded your **build command** and **build directory** in a separate location, remove everything else from your application, and push the new version of your project up to GitHub. Follow the ["Get started" guide](/pages/get-started/) to add your project to Cloudflare Pages, using the **build command** and **build directory** that you saved earlier.

If you choose to use a custom domain for your Pages, you can set it to the same custom domain as your currently deployed Workers application. When Pages finishes the initial deploy of your site, you will need to delete the Workers application to start sending requests to Cloudflare Pages.

## Cleaning up your old application and assigning the domain

After you have deployed your application, navigate to [Workers](https://dash.cloudflare.com/?to=/:account/workers) and remove your old Workers project by going to your **Workers project** > **Settings** > **Delete**.

With your Workers application removed, requests will go to your Pages application. By completing this guide, you have successfully migrated your Workers Sites project to Cloudflare Pages.
