---
type: example
summary: Access custom Cloudflare properties and control how Cloudflare features
  are applied to every request.
demo: https://accessing-the-cloudflare-object.workers-sites-examples.workers.dev
tags:
  - Originless
pcx-content-type: configuration
title: Accessing the  object
weight: 11
layout: example
---

```js
addEventListener("fetch", event => {
  const data =
    event.request.cf !== undefined ?
      event.request.cf :
      { error: "The `cf` object is not available inside the preview." }

  return event.respondWith(
    new Response(JSON.stringify(data, null, 2), {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  )
})
```