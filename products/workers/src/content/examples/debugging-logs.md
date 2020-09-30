---
order: 1000
type: example
summary: Send debugging information in an errored response to a logging service.
tags:
  - API
  - JSON
  - Middleware
  - Originless
---

# Debugging logs

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// Service configured to receive logs
const LOG_URL = "https://log-service.example.com/"

function postLog(data) {
  return fetch(LOG_URL, {
    method: "POST",
    body: data,
  })
}

async function handleRequest(event) {
  let response

  try {
    response = await fetch(event.request)
    if (!response.ok) {
      const body = await response.text()
      throw new Error(
        "Bad response at origin. Status: " +
          response.status +
          " Body: " +
          //Ensure the string is small enough to be a header
          body.trim().substring(0, 10),
      )
    }
  } catch (err) {
    // Without event.waitUntil(), our fetch() to our logging service may
    // or may not complete.
    event.waitUntil(postLog(err.toString()))
    const stack = JSON.stringify(err.stack) || err

    // Copy the response and initialize body to the stack trace
    response = new Response(stack, response)

    // Shove our rewritten URL into a header to find out what it was.
    response.headers.set("X-Debug-stack", stack)
    response.headers.set("X-Debug-err", err)
  }
  return response
}

addEventListener("fetch", event => {
  //Have any uncaught errors thrown go directly to origin
  event.passThroughOnException()
  event.respondWith(handleRequest(event))
})
```
