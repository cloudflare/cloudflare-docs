---
order: 1000
type: example
summary: Inspects the incoming request's TLS version and blocks if under TLSv1.2.
tags:
  - Originless
  - Security
---

# Block on TLS

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
async function handleRequest(request) {
  try {
    const tlsVersion = request.cf.tlsVersion

    // Allow only TLS versions 1.2 and 1.3
    if (tlsVersion != "TLSv1.2" && tlsVersion != "TLSv1.3") {
      return new Response("Please use TLS version 1.2 or higher.", {
        status: 403,
      })
    }

    return fetch(request)
  }
  catch (err) {
    console.error(
      "request.cf does not exist in the previewer, only in production",
    )
    return new Response("Error in workers script" + err.message, {
      status: 500,
    })
  }
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```
