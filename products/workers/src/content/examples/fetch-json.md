---
order: 3
type: example
summary: Send a GET request and read in JSON from the response. Use to fetch external data.
tags:
  - Originless
pcx-content-type: configuration
---

# Fetch JSON

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// The host to send the request to
// @NOTE Replace w/ the host you wish to send requests to
const someHost = "https://examples.cloudflareworkers.com/demos";
// The URL to send the request to
const url = someHost + "/static/json";
/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 */
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes("application/text")) {
    return response.text();
  } else if (contentType.includes("text/html")) {
    return response.text();
  } else {
    return response.text();
  }
}
export default {
  async fetch() {
    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    const response = await fetch(url, init);
    const results = await gatherResponse(response);
    return new Response(results, init);
  },
};
```
