---
order: 1000
type: example
summary: Resolve requests to your domain to a set of proxy third-party origin URLs.
tags:
  - Middleware
pcx-content-type: configuration
---

# Bulk origin override

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * An object with different URLs to fetch
 */
const ORIGINS = {
  "starwarsapi.yourdomain.com": "swapi.dev",
  "google.yourdomain.com": "www.google.com",
};
function handleRequest(request) {
  const url = new URL(request.url);
  // Check if incoming hostname is a key in the ORIGINS object
  if (url.hostname in ORIGINS) {
    url.hostname = ORIGINS[url.hostname];
    // If it is, proxy request to that third party origin
    return fetch(url.toString(), request);
  }
  // Otherwise, process request as normal
  return fetch(request);
}
export default {
  fetch(request) {
    return handleRequest(request);
  },
};
```
