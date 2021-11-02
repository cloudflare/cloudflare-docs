---
order: 1000
type: example
summary: Redirect requests to certain URLs based on a mapped object to the request's URL.
tags:
  - Middleware
pcx-content-type: configuration
---

# Bulk redirects

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const Redirects = {
  "/bulk1": "https://examples.cloudflareworkers.com/redirect2",
  "/bulk2": "https://examples.cloudflareworkers.com/redirect3",
  "/bulk3": "https://examples.cloudflareworkers.com/redirect4",
  "/bulk4": "https://google.com",
};
export default {
  async fetch(request) {
    let { pathname } = new URL(request.url);
    if (pathname.startsWith("/redirect/")) {
      let key = pathname.substring(9); // remove "/redirect"
      let location = Redirects[key];
      if (location) {
        return Response.redirect(location, 301);
      }
    }
    // If URL did not start with "/redirect/"
    // or was not defined in `Redirects`, then
    // respond with the original request
    return fetch(request);
  },
};
```
