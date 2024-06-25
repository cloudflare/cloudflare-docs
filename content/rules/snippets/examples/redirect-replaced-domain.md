---
type: example
summary: Redirect all requests from one domain to another domain.
goal:
  - Routing
operation:
  - Redirect
product:
  - Snippets
pcx_content_type: example
title: Redirect from one domain to another
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