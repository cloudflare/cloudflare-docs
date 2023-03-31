---
type: example
summary: Set up an A/B test by controlling what response is served based on
  cookies. This version supports passing the request through to test and control
  on the origin, bypassing random assignment.
tags:
  - Originless
pcx_content_type: configuration
title: A/B testing with same-URL direct access
weight: 1001
layout: example
---

{{<tabs labels="js/esm | ts/esm">}}
{{<tab label="js/esm" default="true">}}

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
{{<tab label="ts/esm">}}

```ts
const NAME = "myExampleWorkersABTest";

const handler: ExportedHandler = {
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

export default handler;
```

{{</tab>}}
{{</tabs>}}
