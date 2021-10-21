---
order: 1000
type: example
summary: Block other websites from linking to your content. This is useful for protecting images.
tags:
  - Security
  - Headers
pcx-content-type: configuration
---

# Hot-link protection

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// The URL to redirect hotlinked requests to
const HOMEPAGE_URL = "https://tutorial.cloudflareworkers.com/";
export default {
  async fetch(request) {
    // Fetch the original request
    let response = await fetch(request);
    let referer = request.headers.get("Referer");
    let contentType = response.headers.get("Content-Type") || "";
    // Ensure any "image/*" content is only served to ourselves
    if (referer && contentType.startsWith("image/")) {
      // If the hostnames do not match, it's a hotlink
      if (new URL(referer).hostname !== new URL(request.url).hostname) {
        response = Response.redirect(HOMEPAGE_URL, 302);
      }
    }
    // If there is no mismatch in hostname, return response
    return response;
  },
};
```
