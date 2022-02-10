---
title: Set caching levels
pcx-content-type: concept
---

# Caching levels

Caching levels determine how much of your website’s static content Cloudflare should cache. Cloudflare’s CDN caches static content according to the levels below.

- **No Query String**: Delivers resources from cache when there is no query string. Example URL: `example.com/pic.jpg`
- **Ignore Query String**: Delivers the same resource to everyone independent of the query string. Example URL: `example.com/pic.jpg?ignore=this-query-string`
- **Standard (Default)**: Delivers a different resource each time the query string changes. Example URL: `example.com/pic.jpg?with=query`

You can adjust the caching level from the dashboard under **Caching** > **Configuration** > **Caching level**.

<Aside type="note" header="Note">

Ignore Query String only disregards the query string for static file extensions. For example, Cloudflare serves the `style.css resource` to requests for either `style.css?this` or `style.css?that`.

</Aside>

## API Caching level values

If you are using the API to change the cache level, the values will differ from those shown in the dashboard. Refer to the table below to see how the API values map to the values shown in the dashboard.

| Dashboard       | API |
|-----------------|------| 
| No Query String | Basic|
| Ignore Query String | Simplified |
| Standard (Default) | Aggressive |
