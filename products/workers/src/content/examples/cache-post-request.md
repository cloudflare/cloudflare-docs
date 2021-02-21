---
order: 1000
type: example
summary: Cache POST requests using the Cache API.
tags:
  - Middleware
  - Caching
---

# Cache POST requests

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("")
  return hashHex
}

async function handlePostRequest(event) {
  const request = event.request
  const body = await request.clone().text()

  // Hash the request body to use it as a part of the cache key
  const hash = await sha256(body)
  const cacheUrl = new URL(request.url)

  // Store the URL in cache by prepending the body's hash
  cacheUrl.pathname = "/posts" + cacheUrl.pathname + hash

  // Convert to a GET to be able to cache
  const cacheKey = new Request(cacheUrl.toString(), {
    headers: request.headers,
    method: "GET",
  })

  const cache = caches.default

  // Find the cache key in the cache
  let response = await cache.match(cacheKey)

  // Otherwise, fetch response to POST request from origin
  if (!response) {
    response = await fetch(request)
    event.waitUntil(cache.put(cacheKey, response.clone()))
  }
  return response
}

addEventListener("fetch", event => {
  try {
    const request = event.request
    if (request.method.toUpperCase() === "POST")
      return event.respondWith(handlePostRequest(event))
    return event.respondWith(fetch(request))
  } catch (e) {
    return event.respondWith(new Response("Error thrown " + e.message))
  }
})
```
