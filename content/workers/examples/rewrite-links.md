---
type: example
summary: Rewrite URL links in HTML using the HTMLRewriter. This is useful for
  JAMstack websites.
tags:
  - HTMLRewriter
pcx-content-type: configuration
title: Rewrite links
weight: 1001
layout: example
---

```js
const OLD_URL = "developer.mozilla.org"
const NEW_URL = "mynewdomain.com"

async function handleRequest(req) {
  const res = await fetch(req)
  const contentType = res.headers.get("Content-Type")

  // If the response is HTML, it can be transformed with
  // HTMLRewriter -- otherwise, it should pass through
  if (contentType.startsWith("text/html")) {
    return rewriter.transform(res)
  } else {
    return res
  }
}

class AttributeRewriter {
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  element(element) {
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        attribute.replace(OLD_URL, NEW_URL),
      )
    }
  }
}

const rewriter = new HTMLRewriter()
  .on("a", new AttributeRewriter("href"))
  .on("img", new AttributeRewriter("src"))

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```
