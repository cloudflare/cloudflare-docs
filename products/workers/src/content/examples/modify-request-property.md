---
order: 1000
type: example
summary: Create a modified request with edited properties based off of an incoming request.
tags:
  - Middleware
  - Headers
pcx-content-type: configuration
---

# Modify request property

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// The URL to sent the request to
// NOTE: Example modifies the hostname, so "foo.example.com" is irrelevant
const someUrl = "https://foo.example.com/api.js";
// The new URL host to resovle to
const someHost = "example.com";
export default {
  fetch(req) {
    /**
     * You should only assign new values via the `RequestInit` argument
     */
    const newRequestInit = {
      // Change method
      method: "POST",
      // Change body
      body: JSON.stringify({ bar: "foo" }),
      // Change the redirect mode.
      redirect: "follow",
      // Change headers, note this method will erase existing headers
      headers: {
        "Content-Type": "application/json",
      },
      // Change a Cloudflare feature on the outbound response
      cf: { apps: false },
    };
    // Change the URL host
    const url = new URL(someUrl);
    url.hostname = someHost;
    // Best practice is to always use the original request to construct the new request
    // to clone all the attributes. Applying the URL also requires a constructor
    // since once a Request has been constructed, its URL is immutable.
    const attrs = new Request(req, newRequestInit);
    const newRequest = new Request(url.href, attrs);
    // Set headers using method
    newRequest.headers.set("X-Example", "bar");
    newRequest.headers.set("Content-Type", "application/json");
    return fetch(newRequest).catch((err) => {
      let error = err.message;
      let body = JSON.stringify({ error });
      return new Response(body, { status: 500 });
    });
  },
};
```
