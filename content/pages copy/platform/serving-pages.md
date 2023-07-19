---
pcx_content_type: concept
title: Serving Pages
---

# Serving Pages

Cloudflare Pages includes a number of defaults for serving your Pages sites. This page details some of those decisions, so you can understand how Pages works, and how you might want to override some of the default behaviors.

## Route matching

If an HTML file is found with a matching path to the current route requested, Pages will serve it. Pages will also redirect HTML pages to their extension-less counterparts: for instance, `/contact.html` will be redirected to `/contact`, and `/about/index.html` will be redirected to `/about/`.

## Not Found behavior

You can define a custom page to be displayed when Pages cannot find a requested file by creating a `404.html` file. Pages will then attempt to find the closest 404 page. If one is not found in the same directory as the route you are currently requesting, it will continue to look up the directory tree for a matching `404.html` file, ending in `/404.html`. This means that you can define custom 404 paths for situations like `/blog/404.html` and `/404.html`, and Pages will automatically render the correct one depending on the situation.

## Single-page application (SPA) rendering

If your project does not include a top-level `404.html` file, Pages assumes that you are deploying a single-page application. This includes frameworks like React, Vue, and Angular. Pages' default single-page application behavior matches all incoming paths to the root (`/`), allowing you to capture URLs like `/about` or `/help` and respond to them from within your SPA.

## Caching and performance

Pages comes with built in caching defaults that are optimized for caching as much as possible, while providing the most up to date content. Every time you deploy an asset to Pages, the asset remains cached on the Cloudflare CDN until your next deployment. Therefore, you should avoid setting Page Rules or custom caching on your site.

{{<Aside type="note" header="Purging the cache">}}

If Page Rules or other cache settings are used on your custom domain, that may lead to stale assets being served after a new build. You can resolve this by selecting **Caching** > **Configuration** > <a href="/cache/how-to/purge-cache/purge-everything/">**Purge Everything**</a> in the dashboard to ensure the latest build gets served.

{{</Aside>}}

For browser caching, Pages always sends `Etag` headers for `200 OK` responses, which the browser then returns in an `If-None-Match` header on subsequent requests for that asset. Pages compares the `If-None-Match` header from the request with the `Etag` it's planning to send, and if they match, Pages instead responds with a `304 Not Modified` that tells the browser it's safe to use what is stored in local cache.

Pages currently returns `200` responses for HTTP range requests; however, the team is working on adding spec-compliant `206` partial responses.

Pages will also serve Gzip and Brotli responses whenever possible.

## Asset retention

We will insert assets into the cache on a per-data center basis. Assets have a time-to-live (TTL) of one week but can also disappear at any time. If you do a new deploy, the assets could exist in that data center up to one week.
