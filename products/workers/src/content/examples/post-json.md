---
order: 1000
type: example
summary: Send a POST request with JSON data. Use to share data with external servers.
tags:
  - Originless
pcx-content-type: configuration
---

# Post JSON

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// The URL to send the request to
// NOTE: Example endpoint is expecting to receive JSON
const url = "https://examples.cloudflareworkers.com/demos/requests/json";
// The JSON data to send
const body = {
  results: ["default data to send"],
  errors: null,
  msg: "I sent this to the fetch",
};
/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 */
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json());
  }
  if (contentType.includes("application/text")) {
    return response.text();
  }
  if (contentType.includes("text/html")) {
    return response.text();
  }
  return response.text();
}
export default {
  async fetch() {
    const init = {
      body: JSON.stringify(body),
      method: "POST",
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
