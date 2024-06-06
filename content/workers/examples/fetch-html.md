---
type: example
summary: Send a request to a remote server, read HTML from the response, and
  serve that HTML.
languages:
  - JavaScript
  - TypeScript
  - Python
preview:
  - true
pcx_content_type: example
title: Fetch HTML
weight: 3
layout: example
updated: 2024-01-11
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

{{<render file="_fetch-html-example-js.md">}}

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request: Request): Promise<Response> {
    /**
     * Replace `remote` with the host you wish to send requests to
     */
    const remote = "https://example.com";

    return await fetch(remote, request);
  },
};
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import fetch

async def on_fetch(request):
    # Replace `remote` with the host you wish to send requests to
    remote = "https://example.com"
    return await fetch(remote, request)
```

{{</tab>}}
{{</tabs>}}
