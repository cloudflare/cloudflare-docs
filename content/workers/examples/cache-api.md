---
type: example
summary: Use the Cache API to store responses in Cloudflare's cache.
tags:
  - Middleware
  - Caching
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Using the Cache API
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
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
interface Env {}
export default {
  async fetch(request, env, ctx): Promise<Response> {
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
} satisfies ExportedHandler<Env>;
```

{{</tab>}}
{{<tab label="py">}}

```py
from pyodide.ffi import create_proxy
from js import Response, Request, URL, caches, fetch

async def on_fetch(request, _env, ctx):
    cache_url = URL.new(request.url)

    # Construct the cache key from the cache URL
    cache_key = Request.new(cache_url.toString(), request)
    cache = caches.default

    # Check whether the value is already available in the cache
    # if not, you will need to fetch it from origin, and store it in the cache
    response = await cache.match(cache_key)

    if response is None:
        print(f"Response for request url: {request.url} not present in cache. Fetching and caching request.")
        # If not in cache, get it from origin
        response = await fetch(request)
        # Must use Response constructor to inherit all of response's fields
        response = Response.new(response.body, response)

        # Cache API respects Cache-Control headers. Setting s-max-age to 10
        # will limit the response to be in cache for 10 seconds s-maxage
        # Any changes made to the response here will be reflected in the cached value
        response.headers.append("Cache-Control", "s-maxage=10")
        ctx.waitUntil(create_proxy(cache.put(cache_key, response.clone())))
    else:
        print(f"Cache hit for: {request.url}.")
    return response
```

{{</tab>}}
{{</tabs>}}