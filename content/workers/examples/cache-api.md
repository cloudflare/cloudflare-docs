---
type: example
summary: Use the Cache API to store responses in Cloudflare's cache.
tags:
  - Cache API
  - Middleware
  - Caching
pcx_content_type: configuration
title: Using the Cache API
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    const cacheUrl = new URL(request.url);

    // Construct the cache key from the cache URL
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;

    // Check whether the value is already available in the cache
    // if not, you will need to fetch it from origin, and store it in the cache
    let response = await cache.match(cacheKey);

    if (!response) {
      console.log(
        `Response for request url: ${request.url} not present in cache. Fetching and caching request.`
      );
      // If not in cache, get it from origin
      response = await fetch(request);

      // Must use Response constructor to inherit all of response's fields
      response = new Response(response.body, response);

      // Cache API respects Cache-Control headers. Setting s-max-age to 10
      // will limit the response to be in cache for 10 seconds max

      // Any changes made to the response here will be reflected in the cached value
      response.headers.append("Cache-Control", "s-maxage=10");

      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    } else {
      console.log(`Cache hit for: ${request.url}.`);
    }
    return response;
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request, env, ctx) {
    const cacheUrl = new URL(request.url);

    // Construct the cache key from the cache URL
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;

    // Check whether the value is already available in the cache
    // if not, you will need to fetch it from origin, and store it in the cache
    let response = await cache.match(cacheKey);

    if (!response) {
      console.log(
        `Response for request url: ${request.url} not present in cache. Fetching and caching request.`
      );
      // If not in cache, get it from origin
      response = await fetch(request);

      // Must use Response constructor to inherit all of response's fields
      response = new Response(response.body, response);

      // Cache API respects Cache-Control headers. Setting s-max-age to 10
      // will limit the response to be in cache for 10 seconds max

      // Any changes made to the response here will be reflected in the cached value
      response.headers.append("Cache-Control", "s-maxage=10");

      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    } else {
      console.log(`Cache hit for: ${request.url}.`);
    }
    return response;
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
