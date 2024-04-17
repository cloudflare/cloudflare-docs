---
type: example
summary: Send a GET request and read in JSON from the response. Use to fetch
  external data.
tags:
  - Originless
pcx_content_type: configuration
title: Fetch JSON
weight: 4
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    const url = "https://jsonplaceholder.typicode.com/todos/1";

    // gatherResponse returns both content-type & response body as a string
    async function gatherResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return { contentType, result: JSON.stringify(await response.json()) };
      }
      return { contentType, result: response.text() };
    }

    const response = await fetch(url);
    const { contentType, result } = await gatherResponse(response);

    const options = { headers: { "content-type": contentType } };
    return new Response(result, options);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request, env, ctx) {
    const url = "https://jsonplaceholder.typicode.com/todos/1";

    // gatherResponse returns both content-type & response body as a string
    async function gatherResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return { contentType, result: JSON.stringify(await response.json()) };
      }
      return { contentType, result: response.text() };
    }

    const response = await fetch(url);
    const { contentType, result } = await gatherResponse(response);

    const options = { headers: { "content-type": contentType } };
    return new Response(result, options);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch, Headers, JSON

async def on_fetch(request):
    url = "https://jsonplaceholder.typicode.com/todos/1"

    # gather_response returns both content-type & response body as a string
    async def gather_response(response):
        headers = response.headers
        content_type = headers["content-type"] or ""

        if "application/json" in content_type:
            return (content_type, JSON.stringify(await response.json()))
        return (content_type, await response.text())

    response = await fetch(url)
    content_type, result = await gather_response(response)


    headers = Headers.new({"content-type": content_type}.items())
    return Response.new(result, headers=headers)
```

{{</tab>}}
{{</tabs>}}
