---
order: 1000
type: example
summary: Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.
tags:
  - Headers
---

# Cookie parsing

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const COOKIE_NAME = "__uid"

/**
 * Returns a cookie value or null.
 * @param {Request} request incoming request
 * @param {string}  key of the cookie to get
 * @returns {string|void} value of the cookie if found
 */
function getCookie(request, key) {
  const cookie = request.headers.get('Cookie')
  
  // No cookie found
  if (!cookie) return

  // Search for the cookie key in the header.
  const search = `${key}=`
  const starts = cookie.indexOf(search)

  // The cookie could not be found.
  if (starts === -1) return

  // Parse the cookie value.
  const value = cookie.substring(starts + search.length, cookie.length)
  const end = value.indexOf(';')

  return end === -1 ? value : value.substring(0, end)
}

function handleRequest(request) {
  const cookie = getCookie(request, COOKIE_NAME)
  if (cookie) {
    // Respond with the cookie value
    return new Response(cookie)
  }
  return new Response("No cookie with name: " + COOKIE_NAME)
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```
