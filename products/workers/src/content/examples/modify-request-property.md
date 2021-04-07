---
order: 1000
type: example
summary: Create a modified request with edited properties based off of an incoming request.
tags:
  - Originless
  - API
  - JSON
---

# Modify request property

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * Example someHost is set up to return raw JSON
 * @param {string} someUrl the URL to send the request to, since we are setting hostname too only path is applied
 * @param {string} someHost the host the request will resolve too
 */
const someHost = "example.com"
const someUrl = "https://foo.example.com/api.js"

async function handleRequest(request) {
  /**
   * The best practice is to only assign new properties on the request
   * object (i.e. RequestInit props) using either a method or the constructor
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
  }

  // Change just the host
  const url = new URL(someUrl)

  url.hostname = someHost

  // Best practice is to always use the original request to construct the new request
  // to clone all the attributes. Applying the URL also requires a constructor
  // since once a Request has been constructed, its URL is immutable.
  const newRequest = new Request(
    url.toString(),
    new Request(request, newRequestInit),
  )

  // Set headers using method
  newRequest.headers.set("X-Example", "bar")
  newRequest.headers.set("Content-Type", "application/json")
  try {
    return await fetch(newRequest)
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```
