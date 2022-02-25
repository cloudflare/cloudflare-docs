---
type: example
summary: Redirect a response based on the country code in the header of a visitor.
tags:
  - Originless
pcx-content-type: configuration
title: Country code redirect
weight: 1001
layout: example
---

# Country code redirect

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * A map of the URLs to redirect to
 * @param {Object} countryMap
 */
const countryMap = {
  US: "https://example.com/us",
  EU: "https://eu.example.com/",
}

/**
 * Returns a redirect determined by the country code
 * @param {Request} request
 */
function redirect(request) {
  // Use the cf object to obtain the country of the request
  // more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
  const country = request.cf.country

  if (country != null && country in countryMap) {
    const url = countryMap[country]
    return Response.redirect(url)
  } else {
    return fetch(request)
  }
}

addEventListener("fetch", event => {
  event.respondWith(redirect(event.request))
})
```
