---
type: example
summary: Inspects the incoming request's TLS version and blocks if under TLSv1.2.
tags:
  - Security
  - Middleware
pcx_content_type: configuration
title: Block on TLS
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
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
const handler: ExportedHandler = {
  async fetch(request: Request) {
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

export default handler;
```

{{</tab>}}
{{</tabs>}}
