---
order: 1000
type: example
summary: Fetch and modify response properties which are immutable by creating a copy first.
tags:
  - Middleware
  - Headers
pcx-content-type: configuration
---

# Modify response

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// Original header to get the new value from
const headerNameSrc = "foo"; //"Orig-Header"
// The header to set based off of value in src
const headerNameDest = "Last-Modified";
export default {
  async fetch(req) {
    /**
     * NOTE: Response properties are immutable.
     * To change them, construct a `new Response` and pass the
     * modified `status` or `statusText` in the new `ResponseInit`.
     * Response headers can be modified through the headers `set` method.
     */
    const original = await fetch(req);
    // Change status and statusText, but preserve body and headers
    let response = new Response(original.body, {
      status: 500,
      statusText: "some message",
      headers: original.headers,
    });
    // Change response body by adding the foo prop
    const originalBody = await original.json();
    const body = JSON.stringify({ foo: "bar", ...originalBody });
    response = new Response(body, response);
    // Add a header using set method
    response.headers.set("foo", "bar");
    // Set destination header to the value of the source header
    const src = response.headers.get(headerNameSrc);
    if (src != null) {
      response.headers.set(headerNameDest, src);
      console.log(`Response header "${headerNameDest}" was set to "${src}"`);
    }
    return response;
  },
};
```
