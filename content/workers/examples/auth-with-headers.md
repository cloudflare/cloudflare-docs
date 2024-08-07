---
type: example
summary: Allow or deny a request based on a known pre-shared key in a header.
  This is not meant to replace the WebCrypto API.
tags:
  - Authentication
  - WebCrypto
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Auth with headers
weight: 1001
layout: example
---

{{<Aside type="warning" header="Caution when using in production">}}
The example code contains a generic header key and value of `X-Custom-PSK` and `mypresharedkey`. To best protect your resources, change the header key and value in the Workers editor before saving your code.
{{</Aside>}}

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    /**
     * @param {string} PRESHARED_AUTH_HEADER_KEY Custom header to check for key
     * @param {string} PRESHARED_AUTH_HEADER_VALUE Hard coded key value
     */
    const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";
    const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";
    const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);

    if (psk === PRESHARED_AUTH_HEADER_VALUE) {
      // Correct preshared header key supplied. Fetch request from origin.
      return fetch(request);
    }

    // Incorrect key supplied. Reject the request.
    return new Response("Sorry, you have supplied an invalid key.", {
      status: 403,
    });
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    /**
     * @param {string} PRESHARED_AUTH_HEADER_KEY Custom header to check for key
     * @param {string} PRESHARED_AUTH_HEADER_VALUE Hard coded key value
     */
    const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";
    const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";
    const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);

    if (psk === PRESHARED_AUTH_HEADER_VALUE) {
      // Correct preshared header key supplied. Fetch request from origin.
      return fetch(request);
    }

    // Incorrect key supplied. Reject the request.
    return new Response("Sorry, you have supplied an invalid key.", {
      status: 403,
    });
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch

async def on_fetch(request):
    PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK"
    PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey"

    psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY)

    if psk == PRESHARED_AUTH_HEADER_VALUE:
      # Correct preshared header key supplied. Fetch request from origin.
      return fetch(request)

    # Incorrect key supplied. Reject the request.
    return Response.new("Sorry, you have supplied an invalid key.", status=403);
```

{{</tab>}}
{{</tabs>}}
