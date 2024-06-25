---
type: example
summary: Redirect requests to certain URLs based on a mapped object to the
  request's URL.
goal:
  - Routing
operation:
  - Redirect
product:
  - Snippets
pcx_content_type: example
title: Bulk redirect based on a map object
layout: example
---

```js
export default {
  async fetch(request) {
    const externalHostname = "examples.cloudflareworkers.com";

    //Define the map object replacing the source and target paths
    const redirectMap = new Map([
      ["/path1", "https://" + externalHostname + "/redirect1"],
      ["/path2", "https://" + externalHostname + "/redirect2"],
      ["/path3", "https://" + externalHostname + "/redirect3"],
      ["/path4", "https://example.com"],
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