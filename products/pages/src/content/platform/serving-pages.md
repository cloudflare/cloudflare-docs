# Serving Pages

Cloudflare Pages includes a number of "good defaults" for serving your Pages sites. This page details some of those decisions, so you can understand how Pages works, and how you might want to override some of the default behaviors.

## Route matching

If an HTML file is found with a matching path to the current route requested, Pages will serve it. Pages will also redirect HTML pages to their extension-less counterparts: for instance, `/about/index.html` will be redirect to `/about`, and `/contact.html` will be redirected to `/contact`.

## Single-page app (SPA) rendering

By default, Pages assumes that you're deploying a single-page application. This includes frameworks like React, Vue, and Angular. Pages' default single-page application behavior matches all incoming paths to the root (`/`), allowing you to capture URLs like `/about` or `/help` and respond to them from within your SPA. 

If you aren't deploying a SPA, you can provide a custom Not Found page (see the next section) to indicate to Pages that your application builds out static content at a number of HTML pages. This will tell Pages to serve assets based on corresponding HTML files, such as `/about` → `/about.html` and `/support` → `/support.html`.

## Not Found behavior

You can define a custom page to be displayed when Pages can't find a requested file by creating a `404.html` file. Pages will attempt to find the *closest* 404 page, that is, if one isn't found in the *same* directory as the route you're currently requesting, it will continue to look up the directory tree for a matching `404.html` file, ending in `/404.html`. This means that you can define custom 404 paths for situations like `/blog/404.html` *and* /`404.html`, and Pages will automatically render the correct one depending on the situation.

## Caching and performance

Pages includes good caching defaults. That means that every time you deploy an asset to Pages, it remains cached on our CDN until your next deploy. As much as possible, Pages sets `ETag` and `If-None-Match` headers to allow clients to also cache content in their browsers — for more details on these behaviors, check out the MDN ["HTTP Caching" page]([https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)). Pages will also serve Gzip and Brotli responses whenever possible.