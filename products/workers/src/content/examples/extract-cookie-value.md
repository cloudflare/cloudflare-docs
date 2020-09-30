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
 * Gets the cookie with the name from the request headers
 * @param {Request} request incoming Request
 * @param {string} name of the cookie to get
 */
function getCookie(request, name) {
  let result = ""
  const cookieString = request.headers.get("Cookie")
  if (cookieString) {
    const cookies = cookieString.split(";")
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim()
      if (cookieName === name) {
        const cookieVal = cookie.split("=")[1]
        result = cookieVal
      }
    })
  }
  return result
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
