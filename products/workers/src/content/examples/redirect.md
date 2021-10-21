---
order: 5
type: example
summary: Redirect requests from one URL to another, or from one set of URLs to another set.
tags:
  - Middleware
pcx-content-type: configuration
---

# Redirect

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

## Redirect all requests to one URL

```js
export default {
  fetch(request) {
    const base = "https://example.com";
    const statusCode = 301;
    const url = new URL(request.url);
    const { pathname, search } = url;
    const destinationURL = base + pathname + search;
    return Response.redirect(destinationURL, statusCode);
  },
};
```
