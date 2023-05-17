---
type: example
summary: Send Additional Cache Tags using Workers
tags:
  - Caching
  - Cache Tags
pcx_content_type: configuration
title: Cache Tags using Workers
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    const requestUrl = new URL(request.url);
    const params = requestUrl.searchParams;
    const tags =
      params && params.has("tags") ? params.get("tags").split(",") : [];
    const url =
      params && params.has("uri") ? JSON.parse(params.get("uri")) : "";
    if (!url) {
      const errorObject = {
        error: "URL cannot be empty",
      };
      return new Response(JSON.stringify(errorObject), { status: 400 });
    }
    const init = {
      cf: {
        cacheTags: tags,
      },
    };
    return fetch(url, init)
      .then((result) => {
        const cacheStatus = result.headers.get("cf-cache-status");
        const lastModified = result.headers.get("last-modified");
        const response = {
          cache: cacheStatus,
          lastModified: lastModified,
        };
        return new Response(JSON.stringify(response), {
          status: result.status,
        });
      })
      .catch((err) => {
        const errorObject = {
          error: err.message,
        };
        return new Response(JSON.stringify(errorObject), { status: 500 });
      });
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    const requestUrl = new URL(request.url);
    const params = requestUrl.searchParams;
    const tags =
      params && params.has("tags") ? params.get("tags").split(",") : [];
    const url =
      params && params.has("uri") ? JSON.parse(params.get("uri")) : "";
    if (!url) {
      const errorObject = {
        error: "URL cannot be empty",
      };
      return new Response(JSON.stringify(errorObject), { status: 400 });
    }
    const init = {
      cf: {
        cacheTags: tags,
      },
    };
    return fetch(url, init)
      .then((result) => {
        const cacheStatus = result.headers.get("cf-cache-status");
        const lastModified = result.headers.get("last-modified");
        const response = {
          cache: cacheStatus,
          lastModified: lastModified,
        };
        return new Response(JSON.stringify(response), {
          status: result.status,
        });
      })
      .catch((err) => {
        const errorObject = {
          error: err.message,
        };
        return new Response(JSON.stringify(errorObject), { status: 500 });
      });
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
