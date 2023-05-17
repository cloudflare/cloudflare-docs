---
type: example
summary: Given the cookie name, get the value of a cookie. You can also use
  cookies for A/B testing.
tags:
  - Headers
pcx_content_type: configuration
title: Cookie parsing
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
import { parse } from "cookie";
export default {
  async fetch(request) {
    // The name of the cookie
    const COOKIE_NAME = "__uid";
    const cookie = parse(request.headers.get("Cookie") || "");
    if (cookie[COOKIE_NAME] != null) {
      // Respond with the cookie value
      return new Response(cookie[COOKIE_NAME]);
    }
    return new Response("No cookie with name: " + COOKIE_NAME);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    // The name of the cookie
    const COOKIE_NAME = "__uid";
    const cookie = parse(request.headers.get("Cookie") || "");
    if (cookie[COOKIE_NAME] != null) {
      // Respond with the cookie value
      return new Response(cookie[COOKIE_NAME]);
    }
    return new Response("No cookie with name: " + COOKIE_NAME);
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}

{{<Aside type="note" header="External dependencies">}}

This example requires the npm package [`cookie`](https://www.npmjs.com/package/cookie) to be installed in your JavaScript project.

{{</Aside>}}
