---
type: example
summary: Inspects the incoming request's TLS version and blocks if under TLSv1.2.
tags:
  - Security
  - Middleware
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: configuration
title: Block on TLS
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    try {
      const tlsVersion = request.cf.tlsVersion;
      // Allow only TLS versions 1.2 and 1.3
      if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {
        return new Response("Please use TLS version 1.2 or higher.", {
          status: 403,
        });
      }
      return fetch(request);
    } catch (err) {
      console.error(
        "request.cf does not exist in the previewer, only in production"
      );
      return new Response(`Error in workers script ${err.message}`, {
        status: 500,
      });
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    try {
      const tlsVersion = request.cf.tlsVersion;
      // Allow only TLS versions 1.2 and 1.3
      if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {
        return new Response("Please use TLS version 1.2 or higher.", {
          status: 403,
        });
      }
      return fetch(request);
    } catch (err) {
      console.error(
        "request.cf does not exist in the previewer, only in production"
      );
      return new Response(`Error in workers script ${err.message}`, {
        status: 500,
      });
    }
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch

async def on_fetch(request):
    tls_version = request.cf.tlsVersion
    if tls_version not in ("TLSv1.2", "TLSv1.3"):
        return Response.new("Please use TLS version 1.2 or higher.", status=403)
    return fetch(request)
```

{{</tab>}}
{{</tabs>}}