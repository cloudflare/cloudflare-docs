---
type: example
summary: Redirect requests from one set of URLs to another set.
goal:
 - Routing
operation:
 - Redirect
product:
 - Snippets
pcx_content_type: configuration
title: Redirect from one domain to another
weight: 1001
layout: example
---

```js
export default {
  async fetch(request) {
    const base = "https://example.com";
    const statusCode = 301;

    const url = new URL(request.url);
    const { pathname, search } = url;

    const destinationURL = `${base}${pathname}${search}`;
    console.log(destinationURL);

    return Response.redirect(destinationURL, statusCode);
  },
};
```