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

### Recommendations

In most situations, you should avoid setting up any custom caching on your site. Pages comes with built in caching defaults that are optimized for caching as much as possible, while providing the most up to date content. Every time you deploy an asset to Pages, the asset remains cached on the Cloudflare CDN until your next deployment.

Therefore, if you add caching to your [custom domain](/pages/configuration/custom-domains/), it may lead to stale assets being served after a deployment.

In addition, adding caching to your custom domain may cause issues with [Pages redirects](/pages/configuration/redirects/) or [Pages functions](/pages/functions/). These issues can occur because the cached response might get served to your end user before Pages can act on the request.

However, there are some situations where [Cache Rules](/cache/how-to/cache-rules/) on your custom domain does make sense. For example, you may have easily cacheable locations for immutable assets, such as CSS or JS files with content hashes in their file names. Custom caching can help in this case, speeding up the user experience until the file (and associated filename) changes. Just make sure that your caching does not interfere with any redirects or Functions.

{{<Aside type="note" header="Purging the cache">}}

If you notice stale assets being served after a new deployment, go to your zone and then **Caching** > **Configuration** > [**Purge Everything**](/cache/how-to/purge-cache/purge-everything/) to ensure the latest deployment gets served.

{{</Aside>}}

### Behavior

For browser caching, Pages always sends `Etag` headers for `200 OK` responses, which the browser then returns in an `If-None-Match` header on subsequent requests for that asset. Pages compares the `If-None-Match` header from the request with the `Etag` it's planning to send, and if they match, Pages instead responds with a `304 Not Modified` that tells the browser it's safe to use what is stored in local cache.

Pages currently returns `200` responses for HTTP range requests; however, the team is working on adding spec-compliant `206` partial responses.

Pages will also serve Gzip and Brotli responses whenever possible.

## Asset retention

We will insert assets into the cache on a per-data center basis. Assets have a time-to-live (TTL) of one week but can also disappear at any time. If you do a new deploy, the assets could exist in that data center up to one week.

## Headers

By default, Pages automatically adds several [HTTP response headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header), including:

```txt
---
header: Headers always added
---
Access-Control-Allow-Origin: *
Referrer-Policy: strict-origin-when-cross-origin
```

```txt
---
header: Headers sometimes added
---
// if content-type header is given
X-Content-Type-Options: nosniff

// if deployment ID is set
X-Deployment-ID: $DEPLOYMENT_ID

// if content is encoded
Cache-Control: no-transform
Content-Encoding: $CONTENT_ENCODING

// if Cacheable
Cache-Control: public, max-age=0, must-revalidate

// if preview
X-Robots-Tag: noindex
```

To modify the headers added by Cloudflare Pages - perhaps to add [Early Hints](/pages/configuration/early-hints/) - update the [_headers file](/pages/configuration/headers/) in your project.