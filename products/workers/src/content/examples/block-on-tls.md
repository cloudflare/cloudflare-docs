---
order: 1000
type: example
summary: Inspects the incoming request's TLS version and blocks if under TLSv1.2.
tags:
  - Security
  - Middleware
pcx-content-type: configuration
---

# Block on TLS

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
export default {
  fetch(req) {
    const tlsVersion = req.cf?.tlsVersion || {
      error: "The `cf` object is not available inside the preview.",
    };
    // Only allow TLS versions 1.2 and 1.3
    if (tlsVersion != "TLSv1.2" && tlsVersion != "TLSv1.3") {
      return new Response("Please use TLS version 1.2 or higher.", {
        status: 403,
      });
    }
    return fetch(req);
  },
};
```
