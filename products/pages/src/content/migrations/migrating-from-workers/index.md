---
updated: 2020-08-13
difficulty: Beginner
---

# Migrating from Workers Sites to Pages

In this tutorial, you'll learn how to migrate an existing [Cloudflare Workers Sites](https://workers.cloudflare.com/sites) application to Cloudflare Pages.

As a prerequisite, you should have a Cloudflare Workers Sites project, created with [Wrangler](https://github.com/cloudflare/wrangler).

Cloudflare Pages provides built-in defaults for every aspect of serving your site. Currently, you can't port custom behavior in your Workers script—such as custom caching logic—over to your Cloudflare Pages, so if you need that behavior, you should keep using your Cloudflare Workers application.

If you're building a straightforward static site, and haven't ever considered adding custom behavior to our Workers Sites templates, moving to Pages is a great fit. You'll get added benefits like [preview deployments](/platform/preview-deployments) and automatic branch deploys with no extra configuration needed.

## Removing unnecessary code

Workers Sites projects consist of the following pieces:

1. An application built with a [static site tool](/how-to) or a static collection of HTML, CSS and JavaScript
2. (If using a static site tool) a build directory (called `bucket` in `wrangler.toml`) where the static project builds HTML, CSS, and JS
3. A Workers application for serving that directory

When moving to Cloudflare Pages, you can remove the Workers application, and any associated `wrangler.toml` configuration files or build output. Instead, you should write down both your **build command** (if you have one), and the `bucket` field, or **build directory**, from `wrangler.toml`.

## Creating a new Pages project

Once you have these written down, you can remove everything else from your application, and push the new version of your project up to GitHub. You can use the ["Getting started" guide](/getting-started) to add your project to Cloudflare Pages, using the **build command** and **build directory** that you saved earlier.

If you choose to use a custom domain for your Pages, you can set it to the same custom domain as your currently deployed Workers application. When Pages finishes the initial deploy of your site, you will need to delete the Workers application to start sending requests to Cloudflare Pages.

## Cleaning up your old application and assigning the domain

Once you've deployed your application, you should go into the [Workers dashboard](https://dash.cloudflare.com/?to=/:account/workers) and remove your old Workers project.

With your Workers application removed, requests will go to your Pages application. Congrats! You've migrated your Workers Sites project to Cloudflare Pages.
