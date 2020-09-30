---
order: 2
type: example
summary: Send a request to a remote server, read HTML from the response, and serve that HTML.
tags:
  - JSON
  - API
---

# Fetch HTML

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * Example someHost at url is set up to respond with HTML
 * Replace url with the host you wish to send requests to
 */
const someHost = "https://examples.cloudflareworkers.com/demos"
const url = someHost + "/static/html"

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
      "content-type": "text/html;charset=UTF-8",
    },
  }
  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  return new Response(results, init)
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest())
})
```
