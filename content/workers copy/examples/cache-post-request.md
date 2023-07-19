---
type: example
summary: Cache POST requests using the Cache API.
tags:
  - Middleware
  - Caching
  - Cache API
pcx_content_type: configuration
title: Cache POST requests
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    async function sha256(message) {
      // encode as UTF-8
      const msgBuffer = await new TextEncoder().encode(message);
      // hash the message
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      // convert bytes to hex string
      return [...new Uint8Array(hashBuffer)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    try {
      if (request.method.toUpperCase() === "POST") {
        const body = await request.clone().text();
        // Hash the request body to use it as a part of the cache key
        const hash = await sha256(body);
        const cacheUrl = new URL(request.url);
        // Store the URL in cache by prepending the body's hash
        cacheUrl.pathname = "/posts" + cacheUrl.pathname + hash;
        // Convert to a GET to be able to cache
        const cacheKey = new Request(cacheUrl.toString(), {
          headers: request.headers,
          method: "GET",
        });

        const cache = caches.default;
        // Find the cache key in the cache
        let response = await cache.match(cacheKey);
        // Otherwise, fetch response to POST request from origin
        if (!response) {
          response = await fetch(request);
          ctx.waitUntil(cache.put(cacheKey, response.clone()));
        }
        return response;
      }
      return fetch(request);
    } catch (e) {
      return new Response("Error thrown " + e.message);
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request, env, ctx) {
    async function sha256(message) {
      // encode as UTF-8
      const msgBuffer = await new TextEncoder().encode(message);
      // hash the message
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      // convert bytes to hex string
      return [...new Uint8Array(hashBuffer)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    try {
      if (request.method.toUpperCase() === "POST") {
        const body = await request.clone().text();
        // Hash the request body to use it as a part of the cache key
        const hash = await sha256(body);
        const cacheUrl = new URL(request.url);
        // Store the URL in cache by prepending the body's hash
        cacheUrl.pathname = "/posts" + cacheUrl.pathname + hash;
        // Convert to a GET to be able to cache
        const cacheKey = new Request(cacheUrl.toString(), {
          headers: request.headers,
          method: "GET",
        });

        const cache = caches.default;
        // Find the cache key in the cache
        let response = await cache.match(cacheKey);
        // Otherwise, fetch response to POST request from origin
        if (!response) {
          response = await fetch(request);
          ctx.waitUntil(cache.put(cacheKey, response.clone()));
        }
        return response;
      }
      return fetch(request);
    } catch (e) {
      return new Response("Error thrown " + e.message);
    }
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
