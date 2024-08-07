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
    // Define a variable with the hostname that needs to be redirected.
    const externalHostname = "example.com";

    // Define the map object. Replace the sources (/pathX) and targets (/redirectX) with ones that apply to your case.
    const redirectMap = new Map([
      ["/path1", "https://" + externalHostname + "/redirect1"],
      ["/path2", "https://" + externalHostname + "/redirect2"],
      ["/path3", "https://" + externalHostname + "/redirect3"],
      ["/path4", "https://cloudflare.com"],
    ]);

    // Clone the original URL.
    const requestURL = new URL(request.url);

    // Check the request path against the map and redirect accordingly.
    const path = requestURL.pathname;
    const location = redirectMap.get(path);

    if (location) {
      return Response.redirect(location, 301);
    }

    // If request path not in map, return the original request.
    return fetch(request);
  },
};
```