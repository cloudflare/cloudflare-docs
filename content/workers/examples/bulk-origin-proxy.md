---
type: example
summary: Resolve requests to your domain to a set of proxy third-party origin URLs.
tags:
  - Middleware
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Bulk origin override
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    /**
     * An object with different URLs to fetch
     * @param {Object} ORIGINS
     */
    const ORIGINS = {
      "starwarsapi.yourdomain.com": "swapi.dev",
      "google.yourdomain.com": "www.google.com",
    };

    const url = new URL(request.url);

    // Check if incoming hostname is a key in the ORIGINS object
    if (url.hostname in ORIGINS) {
      const target = ORIGINS[url.hostname];
      url.hostname = target;
      // If it is, proxy request to that third party origin
      return fetch(url.toString(), request);
    }
    // Otherwise, process request as normal
    return fetch(request);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    /**
     * An object with different URLs to fetch
     * @param {Object} ORIGINS
     */
    const ORIGINS = {
      "starwarsapi.yourdomain.com": "swapi.dev",
      "google.yourdomain.com": "www.google.com",
    };

    const url = new URL(request.url);

    // Check if incoming hostname is a key in the ORIGINS object
    if (url.hostname in ORIGINS) {
      const target = ORIGINS[url.hostname];
      url.hostname = target;
      // If it is, proxy request to that third party origin
      return fetch(url.toString(), request);
    }
    // Otherwise, process request as normal
    return fetch(request);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import fetch, URL

async def on_fetch(request):
    # A dict with different URLs to fetch
    ORIGINS = {
      "starwarsapi.yourdomain.com": "swapi.dev",
      "google.yourdomain.com": "www.google.com",
    }

    url = URL.new(request.url)

    # Check if incoming hostname is a key in the ORIGINS object
    if url.hostname in ORIGINS:
        url.hostname = ORIGINS[url.hostname]
        # If it is, proxy request to that third party origin
        return fetch(url.toString(), request)

    # Otherwise, process request as normal
    return fetch(request)
```

{{</tab>}}
{{</tabs>}}
