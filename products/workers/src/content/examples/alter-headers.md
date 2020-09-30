---
order: 1000
type: example
summary: Change the headers sent in a request or returned in a response.
tags:
  - Security
---

# Alter headers

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
async function handleRequest(request) {
  // Make the headers mutable by re-constructing the Request.
  request = new Request(request)
  request.headers.set("x-my-header", "custom value")
  const URL = "https://examples.cloudflareworkers.com/demos/static/html"

  // URL is set up to respond with dummy HTML
  let response = await fetch(URL, request)

  // Make the headers mutable by re-constructing the Response.
  response = new Response(response.body, response)
  response.headers.set("x-my-header", "custom value")
  return response
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```

