---
type: example
summary: Redirect requests to certain URLs based on a mapped object to the
  request's URL.
tags:
  - Middleware
  - Redirects
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Bulk redirects
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
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
export default {
  async fetch(request): Promise<Response> {
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
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch, URL

async def on_fetch(request):
    external_hostname = "examples.cloudflareworkers.com"

    redirect_map = {
      "/bulk1": "https://" + external_hostname + "/redirect2",
      "/bulk2": "https://" + external_hostname + "/redirect3",
      "/bulk3": "https://" + external_hostname + "/redirect4",
      "/bulk4": "https://google.com",
      }

    url = URL.new(request.url)
    location = redirect_map.get(url.pathname, None)

    if location:
        return Response.redirect(location, 301)

    # If request not in map, return the original request
    return fetch(request)
```

{{</tab>}}
{{</tabs>}}
