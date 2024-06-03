---
type: example
summary: Redirect requests from one URL to another.
goal:
 - Routing
operation:
 - Redirect
product:
 - Snippets
pcx_content_type: configuration
title: Redirect to one URL
weight: 1001
layout: example
---

```js

export default {
  async fetch(request) {
    const destinationURL = "https://example.com";
    const statusCode = 301;
    return Response.redirect(destinationURL, statusCode);
  },
};
```