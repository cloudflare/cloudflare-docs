---
order: 1000
type: example
summary: Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.
tags:
  - Headers
pcx-content-type: configuration
---

# Cookie parsing

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
import { parse } from "cookie"
// OR
import { parse } from "worktop/cookie"

// The name of the cookie
const COOKIE_NAME = "__uid"

function handleRequest(request) {
  const cookie = parse(request.headers.get("Cookie") || "")

  if (cookie[COOKIE_NAME] != null) {
    // Respond with the cookie value
    return new Response(cookie[COOKIE_NAME])
  }

  return new Response("No cookie with name: " + COOKIE_NAME)
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```

<Aside type="note" header="External Dependencies">

This example is set up to depend on [`cookie@0.4.1`](https://www.npmjs.com/package/cookie/v/0.4.1) or [`worktop@0.7.1`](https://www.npmjs.com/package/worktop/v/0.7.1). You may pick either package, as they both work the same way.

</Aside>
