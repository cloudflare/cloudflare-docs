---
type: example
summary: Given the cookie name, get the value of a cookie. You can also use
  cookies for A/B testing.
tags:
  - Headers
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Cookie parsing
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
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
import { parse } from "cookie";
export default {
  async fetch(request): Promise<Response> {
    // The name of the cookie
    const COOKIE_NAME = "__uid";
    const cookie = parse(request.headers.get("Cookie") || "");
    if (cookie[COOKIE_NAME] != null) {
      // Respond with the cookie value
      return new Response(cookie[COOKIE_NAME]);
    }
    return new Response("No cookie with name: " + COOKIE_NAME);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from http.cookies import SimpleCookie
from js import Response

async def on_fetch(request):
    # Name of the cookie
    cookie_name = "__uid"

    cookies = SimpleCookie(request.headers["Cookie"] or "")

    if cookie_name in cookies:
        # Respond with cookie value
        return Response.new(cookies[cookie_name].value)

    return Response.new("No cookie with name: " + cookie_name)
```

{{</tab>}}
{{</tabs>}}

{{<Aside type="note" header="External dependencies">}}

This example requires the npm package [`cookie`](https://www.npmjs.com/package/cookie) to be installed in your JavaScript project.

{{</Aside>}}
