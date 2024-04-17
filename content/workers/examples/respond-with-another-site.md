---
type: example
summary: Respond to the Worker request with the response from another website
  (example.com in this example).
demo: https://respond-with-another-site.workers-sites-examples.workers.dev
tags:
  - Middleware
pcx_content_type: configuration
title: Respond with another site
weight: 12
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

{{<render file="_respond-another-site-example-js.md">}}

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request) {
    async function MethodNotAllowed(request) {
      return new Response(`Method ${request.method} not allowed.`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
    }
    // Only GET requests work with this proxy.
    if (request.method !== "GET") return MethodNotAllowed(request);
    return fetch(`https://example.com`);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch, Headers

def on_fetch(request):
    def method_not_allowed(request):
        msg = f'Method {request.method} not allowed.'
        headers = Headers.new({"Allow": "GET"}.items)
        return Response.new(msg, headers=headers, status=405)

    # Only GET requests work with this proxy.
    if request.method != "GET":
        return method_not_allowed(request)

    return fetch("https://example.com")
```

{{</tab>}}
{{</tabs>}}
