---
type: example
summary: Allow or deny a request based on a known pre-shared key in a header.
  This is not meant to replace the WebCrypto API.
tags:
  - Authentication
  - WebCrypto
pcx_content_type: configuration
title: Auth with headers
weight: 1001
layout: example
---

{{<Aside type="warning" header="Caution when using in production">}}

This code is provided as a sample, and is not suitable for production code without protecting against timing attacks. To learn how to implement production-safe code, refer to the [`timingSafeEqual` example](/workers/examples/protect-against-timing-attacks/) for more information on how to mitigate against timing attacks in your Workers code.

{{</Aside>}}

{{<tabs labels="js | ts">}}
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
const handler: ExportedHandler = {
  async fetch(request: Request) {
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

export default handler;
```

{{</tab>}}
{{</tabs>}}
