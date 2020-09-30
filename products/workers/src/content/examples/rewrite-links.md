---
order: 1000
type: example
summary: Rewrite URL links in HTML using the HTMLRewriter. This is useful for JAMstack websites.
tags:
  - HTML
  - JAMstack
---

# Rewrite links

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const OLD_URL = "developer.mozilla.org"
const NEW_URL = "mynewdomain.com"

async function handleRequest(req) {
  const res = await fetch(req)
  return rewriter.transform(res)
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
