---
order: 1000
type: example
summary: Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.
tags:
  - Security
  - JAMstack
  - Originless
---

# Extract cookie value

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const COOKIE_NAME = "__uid"

/**
 * Returns a cookie value or null.
 * @param {Request} request incoming request
 * @param {string}  key of the cookie to get
 * @returns {string} value of the cookie or null
 */
function getCookie(request, key) {
  // No cookies were found in the request headers.
  if ( ! request.headers.has('Cookie') )
    return null

  // Search for the cookie key in the header.
  const str = request.headers.get('Cookie'),
     search = `${key}=`
     starts = str.indexOf(search)

  // The cookie could not be found.
  if (starts === -1)
    return null

  // Parse the cookie value.
  const val = str.substr(starts + search.length, str.length),
        end = val.indexOf(';')

  return (end === -1) ? val : val.substr(0, end)
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
