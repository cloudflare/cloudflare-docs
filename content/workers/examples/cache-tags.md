---
type: example
summary: Send Additional Cache Tags using Workers
tags:
  - Caching
languages:
  - JavaScript
  - TypeScript
pcx_content_type: configuration
title: Cache Tags using Workers
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
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
export default {
  async fetch(request): Promise<Response> {
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
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
import json
from js import Response, URL, JSON, fetch

async def on_fetch(request):
    request_url = URL.new(request.url)
    params = request_url.searchParams
    tags = params["tags"].split(",") if "tags" in params
    url = params["uri"] or ""

    if url is None:
        error = json.dumps({"error": "URL cannot be empty"})
        return Response.json(JSON.parse(error), status=400)

    options = {"cf": {"cacheTags": tags}}

    result = await fetch(url, options)
    cache_status = result.headers.get("cf-cache-status")
    last_modified = result.headers.get("last-modified")

    response = json.dumps({"cache": cache_status, "lastModified": last_modified})
    return Response.json(JSON.parse(response), status=result.status)
```

{{</tab>}}
{{</tabs>}}