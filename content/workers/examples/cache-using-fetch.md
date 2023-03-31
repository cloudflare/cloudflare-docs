---
type: example
summary: Determine how to cache a resource by setting TTLs, custom cache keys,
  and cache headers in a fetch request.
tags:
  - Caching
  - Cache API
  - Middleware
pcx_content_type: configuration
title: Cache using fetch
weight: 1001
layout: example
---

{{<tabs labels="js/esm | ts/esm">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    // Only use the path for the cache key, removing query strings
    // and always store using HTTPS, for example, https://www.example.com/file-uri-here
    const someCustomKey = `https://${url.hostname}${url.pathname}`;
    let response = await fetch(request, {
      cf: {
        // Always cache this fetch regardless of content type
        // for a max of 5 seconds before revalidating the resource
        cacheTtl: 5,
        cacheEverything: true,
        //Enterprise only feature, see Cache API for other plans
        cacheKey: someCustomKey,
      },
    });
    // Reconstruct the Response object to make its headers mutable.
    response = new Response(response.body, response);
    // Set cache control headers to cache on browser for 25 minutes
    response.headers.set("Cache-Control", "max-age=1500");
    return response;
  },
};
```

{{</tab>}}
{{<tab label="ts/esm">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    const url = new URL(request.url);
    // Only use the path for the cache key, removing query strings
    // and always store using HTTPS, for example, https://www.example.com/file-uri-here
    const someCustomKey = `https://${url.hostname}${url.pathname}`;
    let response = await fetch(request, {
      cf: {
        // Always cache this fetch regardless of content type
        // for a max of 5 seconds before revalidating the resource
        cacheTtl: 5,
        cacheEverything: true,
        //Enterprise only feature, see Cache API for other plans
        cacheKey: someCustomKey,
      },
    });
    // Reconstruct the Response object to make its headers mutable.
    response = new Response(response.body, response);
    // Set cache control headers to cache on browser for 25 minutes
    response.headers.set("Cache-Control", "max-age=1500");
    return response;
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}

{{<content-column>}}

## Caching HTML resources

```js
// Force Cloudflare to cache an asset
fetch(event.request, { cf: { cacheEverything: true } });
```

Setting the cache level to **Cache Everything** will override the default cacheability of the asset. For time-to-live (TTL), Cloudflare will still rely on headers set by the origin.

## Custom cache keys

{{<Aside type="note">}}

This feature is available only to Enterprise customers.

{{</Aside>}}

A request's cache key is what determines if two requests are the same for caching purposes. If a request has the same cache key as some previous request, then Cloudflare can serve the same cached response for both. For more about cache keys, refer to the [Create custom cache keys](/cache/how-to/create-cache-keys/) documentation.

```js
// Set cache key for this request to "some-string".
fetch(event.request, { cf: { cacheKey: "some-string" } });
```

Normally, Cloudflare computes the cache key for a request based on the request's URL. Sometimes, though, you may like different URLs to be treated as if they were the same for caching purposes. For example, if your website content is hosted from both Amazon S3 and Google Cloud Storage - you have the same content in both places, and you can use a Worker to randomly balance between the two. However, you do not want to end up caching two copies of your content. You could utilize custom cache keys to cache based on the original request URL rather than the subrequest URL:

{{</content-column>}}

{{<tabs labels="js/esm | ts/esm">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request) {
    let url = new URL(request.url);

    if (Math.random() < 0.5) {
      url.hostname = "example.s3.amazonaws.com";
    } else {
      url.hostname = "example.storage.googleapis.com";
    }

    let newRequest = new Request(url, request);
    return fetch(newRequest, {
      cf: { cacheKey: request.url },
    });
  },
};
```

{{</tab>}}
{{<tab label="ts/esm">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    let url = new URL(request.url);

    if (Math.random() < 0.5) {
      url.hostname = "example.s3.amazonaws.com";
    } else {
      url.hostname = "example.storage.googleapis.com";
    }

    let newRequest = new Request(url, request);
    return fetch(newRequest, {
      cf: { cacheKey: request.url },
    });
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}

{{<content-column>}}

Workers operating on behalf of different zones cannot affect each other's cache. You can only override cache keys when making requests within your own zone (in the above example `event.request.url` was the key stored), or requests to hosts that are not on Cloudflare. When making a request to another Cloudflare zone (for example, belonging to a different Cloudflare customer), that zone fully controls how its own content is cached within Cloudflare; you cannot override it.

## Override based on origin response code

{{<Aside type="note">}}

This feature is available only to Enterprise customers.

{{</Aside>}}

```js
// Force response to be cached for 86400 seconds for 200 status
// codes, 1 second for 404, and do not cache 500 errors.
fetch(request, {
  cf: { cacheTtlByStatus: { "200-299": 86400, 404: 1, "500-599": 0 } },
});
```

This option is a version of the `cacheTtl` feature which chooses a TTL based on the response's status code and does not automatically set `cacheEverything: true`. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache directives sent by the origin. You can review [details on the `cacheTtl` feature on the Request page](/workers/runtime-apis/request/#requestinitcfproperties).

{{</content-column>}}
