---
type: example
summary: Redirect requests to certain URLs based on a mapped object to the
  request's URL.
tags:
  - Middleware
pcx_content_type: configuration
title: Bulk redirects
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    const externalHostname = "examples.cloudflareworkers.com";

    const redirectMap = new Map([
      ["/bulk1", "https://" + externalHostname + "/redirect2"],
      ["/bulk2", "https://" + externalHostname + "/redirect3"],
      ["/bulk3", "https://" + externalHostname + "/redirect4"],
      ["/bulk4", "https://google.com"],
    ]);

    const requestURL = new URL(request.url);
    const path = requestURL.pathname;
    const location = redirectMap.get(path);

    if (location) {
      return Response.redirect(location, 301);
    }
    // If request not in map, return the original request
    return fetch(request);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    const externalHostname = "examples.cloudflareworkers.com";

    const redirectMap = new Map([
      ["/bulk1", "https://" + externalHostname + "/redirect2"],
      ["/bulk2", "https://" + externalHostname + "/redirect3"],
      ["/bulk3", "https://" + externalHostname + "/redirect4"],
      ["/bulk4", "https://google.com"],
    ]);

    const requestURL = new URL(request.url);
    const path = requestURL.pathname;
    const location = redirectMap.get(path);

    if (location) {
      return Response.redirect(location, 301);
    }
    // If request not in map, return the original request
    return fetch(request);
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
