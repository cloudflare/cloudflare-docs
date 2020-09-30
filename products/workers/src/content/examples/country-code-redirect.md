---
order: 1000
type: example
summary: Redirect a response based on the country code in the header of a visitor.
tags:
  - Security
  - Originless
---

# Country code redirect

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * Returns a redirect determined by the country code
 * @param {Request} request
 */
async function redirect(request) {
  // The `cf-ipcountry` header is not supported in the preview
  const country = request.headers.get("cf-ipcountry")

  if (country != null && country in countryMap) {
    const url = countryMap[country]
    return Response.redirect(url)
  }
  else {
    return await fetch(request)
  }
}

/**
 * A map of the URLs to redirect to
 * @param {Object} countryMap
 */
const countryMap = {
  US: "https://example.com/us",
  EU: "https://eu.example.com/",
}

async function handleRequest(request) {
  return redirect(request)
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```
