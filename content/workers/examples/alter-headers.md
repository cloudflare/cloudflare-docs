---
type: example
summary: Change the headers sent in a request or returned in a response.
tags:
  - Headers
  - Middleware
pcx-content-type: configuration
title: Alter headers
weight: 1001
layout: example
---

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)

  // Clone the response so that it's no longer immutable
  const newResponse = new Response(response.body, response)

  // Add a custom header with a value
  newResponse.headers.append("x-workers-hello", "Hello from Cloudflare Workers")

  // Delete headers
  newResponse.headers.delete("x-header-to-delete")
  newResponse.headers.delete("x-header2-to-delete")

  // Adjust the value for an existing header
  newResponse.headers.set("x-header-to-change", "NewValue")

  return newResponse
}
```

You can also use the [`custom-headers-example` template](https://github.com/signalnerve/custom-headers-example) to deploy this code to your custom domain.
