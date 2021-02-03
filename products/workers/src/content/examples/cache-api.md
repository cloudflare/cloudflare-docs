---
order: 1000
type: example
summary: Cache using Cloudflare's Cache API. This example can cache POST requests as well.
tags:
  - API
  - Middleware
  - JAMstack
---

# Cache API

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const someOtherHostname = "my.herokuapp.com"

async function handleRequest(event) {
  const request = event.request
  const cacheUrl = new URL(request.url)

  // Hostname for a different zone
  cacheUrl.hostname = someOtherHostname

  const cacheKey = new Request(cacheUrl.toString(), request)
  const cache = caches.default

  // Get this request from this zone's cache
  let response = await cache.match(cacheKey)

  if (!response) {
    // If not in cache, get it from origin
    response = await fetch(request)

    // Must use Response constructor to inherit all of response's fields
    response = new Response(response.body, response)

    // Cache API respects Cache-Control headers. Setting max-age to 10
    // will limit the response to be in cache for 10 seconds max
    response.headers.append("Cache-Control", "max-age=10")

    // Store the fetched response as cacheKey
    // Use waitUntil so computational expensive tasks don"t delay the response
    event.waitUntil(cache.put(cacheKey, response.clone()))
  }
  return response
}

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
    return event.respondWith(handleRequest(event))
  } catch (e) {
    return event.respondWith(new Response("Error thrown " + e.message))
  }
})
```
