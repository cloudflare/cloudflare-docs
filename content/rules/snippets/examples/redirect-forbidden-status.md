---
type: example
summary: If origin responded with `403 Forbidden` error code, redirect to different page.
goal:
  - Routing
operation:
  - Redirect
product:
  - Snippets
pcx_content_type: example
title: Redirect `403 Forbidden` to a different page
layout: example
---

```js
export default {
    async fetch(request) {
        // Send original request to the origin
        const response = await fetch(request);
        // Check if origin responded with 403 status code
        if (response.status == 403) {
            // If so, redirect to this URL
            const destinationURL = "https://example.com";
            // With this status code
            const statusCode = 301;
            // Serve redirect
            return Response.redirect(destinationURL, statusCode);
        }
        // Otherwise, serve origin's response
        else {
            return response;
        }
    },
};
```