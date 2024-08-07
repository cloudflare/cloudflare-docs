---
type: example
summary: If response to the original request is not `200 OK` or a redirect, send to another origin.
goal:
  - Routing
operation:
  - Redirect
product:
  - Snippets
pcx_content_type: example
title: Route to a different origin based on origin response
layout: example
---

```js
export default {
    async fetch(request) {
        // Send original request to the origin
        const response = await fetch(request);

        // If response is not 200 OK or a redirect, send to another origin
        if (!response.ok && !response.redirected) {
          // First, clone the original request to construct a new request
          const newRequest = new Request(request);
          // Add a header to identify a re-routed request at the new origin
          newRequest.headers.set("X-Rerouted", "1");
          // Clone the original URL
          const url = new URL(request.url);
          // Send request to a different origin / hostname
          url.hostname = "example.com";
          // Serve response to the new request from the origin
          return await fetch(url, newRequest);
        }

      // If response is 200 OK or a redirect, serve it
      return response;
    },
};
```