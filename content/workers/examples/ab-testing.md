---
type: example
summary: Set up an A/B test by controlling what response is served based on
  cookies. This version supports passing the request through to test and control
  on the origin, bypassing random assignment.
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: configuration
title: A/B testing with same-URL direct access
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
const NAME = "myExampleWorkersABTest";

export default {
  async fetch(req) {
    const url = new URL(req.url);

    // Enable Passthrough to allow direct access to control and test routes.
    if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))
      return fetch(req);

    // Determine which group this requester is in.
    const cookie = req.headers.get("cookie");

    if (cookie && cookie.includes(`${NAME}=control`)) {
      url.pathname = "/control" + url.pathname;
    } else if (cookie && cookie.includes(`${NAME}=test`)) {
      url.pathname = "/test" + url.pathname;
    } else {
      // If there is no cookie, this is a new client. Choose a group and set the cookie.
      const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split
      if (group === "control") {
        url.pathname = "/control" + url.pathname;
      } else {
        url.pathname = "/test" + url.pathname;
      }
      // Reconstruct response to avoid immutability
      let res = await fetch(url);
      res = new Response(res.body, res);
      // Set cookie to enable persistent A/B sessions.
      res.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);
      return res;
    }
    return fetch(url);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const NAME = "myExampleWorkersABTest";

export default {
  async fetch(req): Promise<Response> {
    const url = new URL(req.url);
    // Enable Passthrough to allow direct access to control and test routes.
    if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))
      return fetch(req);
    // Determine which group this requester is in.
    const cookie = req.headers.get("cookie");
    if (cookie && cookie.includes(`${NAME}=control`)) {
      url.pathname = "/control" + url.pathname;
    } else if (cookie && cookie.includes(`${NAME}=test`)) {
      url.pathname = "/test" + url.pathname;
    } else {
      // If there is no cookie, this is a new client. Choose a group and set the cookie.
      const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split
      if (group === "control") {
        url.pathname = "/control" + url.pathname;
      } else {
        url.pathname = "/test" + url.pathname;
      }
      // Reconstruct response to avoid immutability
      let res = await fetch(url);
      res = new Response(res.body, res);
      // Set cookie to enable persistent A/B sessions.
      res.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);
      return res;
    }
    return fetch(url);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
import random
from urllib.parse import urlparse, urlunparse
from js import Response, Headers, fetch

NAME = "myExampleWorkersABTest"

async def on_fetch(request):
    url = urlparse(request.url)
    # Uncomment below when testing locally
    # url = url._replace(netloc="example.com") if "localhost" in url.netloc else url

    # Enable Passthrough to allow direct access to control and test routes.
    if url.path.startswith("/control") or url.path.startswith("/test"):
        return fetch(urlunparse(url))

    # Determine which group this requester is in.
    cookie = request.headers.get("cookie")

    if cookie and f'{NAME}=control' in cookie:
        url = url._replace(path="/control" + url.path)
    elif cookie and f'{NAME}=test' in cookie:
        url = url._replace(path="/test" + url.path)
    else:
        # If there is no cookie, this is a new client. Choose a group and set the cookie.
        group = "test" if random.random() < 0.5 else "control"
        if group == "control":
            url = url._replace(path="/control" + url.path)
        else:
            url = url._replace(path="/test" + url.path)

        # Reconstruct response to avoid immutability
        res = await fetch(urlunparse(url))
        headers = dict(res.headers)
        headers["Set-Cookie"] = f'{NAME}={group}; path=/'
        headers  = Headers.new(headers.items())
        return Response.new(res.body, headers=headers)

    return fetch(urlunparse(url))
```

{{</tab>}}
{{</tabs>}}
