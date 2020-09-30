---
order: 1000
type: example
summary: Send two GET request to two urls and aggregates the responses into one response.
tags:
  - JSON
  - HTML
---

# Aggregate requests

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * someHost is set up to return JSON responses
 * Replace url1 and url2 with the hosts you wish to send requests to
 * @param {string} url the URL to send the request to
 */
const someHost = "https://examples.cloudflareworkers.com/demos"
const url1 = someHost + "/requests/json"
const url2 = someHost + "/requests/json"
const type = "application/json;charset=UTF-8"

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}

async function handleRequest() {
  const init = {
    headers: {
      "content-type": type,
    },
  }
  const responses = await Promise.all([fetch(url1, init), fetch(url2, init)])
  const results = await Promise.all([
    gatherResponse(responses[0]),
    gatherResponse(responses[1]),
  ])
  return new Response(results.join(), init)
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest())
})
```
