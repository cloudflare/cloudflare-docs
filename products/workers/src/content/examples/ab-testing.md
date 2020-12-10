---
order: 1000
type: example
summary: Set up an A/B test by controlling what response is served based on cookies.
tags:
  - JAMstack
  - Originless
---

# A/B testing

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
function handleRequest(request) {
  const NAME = "experiment-0"

  // The Responses below are placeholders. You can set up a custom path for each test (e.g. /control/somepath ).
  const TEST_RESPONSE = new Response("Test group") // e.g. await fetch("/test/sompath", request)
  const CONTROL_RESPONSE = new Response("Control group") // e.g. await fetch("/control/sompath", request)

  // Determine which group this requester is in.
  const cookie = request.headers.get("cookie")
  if (cookie && cookie.includes(`${NAME}=control`)) {
    return CONTROL_RESPONSE
  }
  else if (cookie && cookie.includes(`${NAME}=test`)) {
    return TEST_RESPONSE
  }
  else {
    // If there is no cookie, this is a new client. Choose a group and set the cookie.
    const group = Math.random() < 0.5 ? "test" : "control" // 50/50 split
    const response = group === "control" ? CONTROL_RESPONSE : TEST_RESPONSE
    response.headers.append("Set-Cookie", `${NAME}=${group}; path=/`)

    return response
  }
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```
