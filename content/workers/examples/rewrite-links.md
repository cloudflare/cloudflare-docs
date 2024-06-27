---
type: example
summary: Rewrite URL links in HTML using the HTMLRewriter. This is useful for
  JAMstack websites.
tags:
  - HTMLRewriter
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Rewrite links
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    const OLD_URL = "developer.mozilla.org";
    const NEW_URL = "mynewdomain.com";

    class AttributeRewriter {
      constructor(attributeName) {
        this.attributeName = attributeName;
      }
      element(element) {
        const attribute = element.getAttribute(this.attributeName);
        if (attribute) {
          element.setAttribute(
            this.attributeName,
            attribute.replace(OLD_URL, NEW_URL)
          );
        }
      }
    }

    const rewriter = new HTMLRewriter()
      .on("a", new AttributeRewriter("href"))
      .on("img", new AttributeRewriter("src"));

    const res = await fetch(request);
    const contentType = res.headers.get("Content-Type");

    // If the response is HTML, it can be transformed with
    // HTMLRewriter -- otherwise, it should pass through
    if (contentType.startsWith("text/html")) {
      return rewriter.transform(res);
    } else {
      return res;
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    const OLD_URL = "developer.mozilla.org";
    const NEW_URL = "mynewdomain.com";

    class AttributeRewriter {
      constructor(attributeName) {
        this.attributeName = attributeName;
      }
      element(element) {
        const attribute = element.getAttribute(this.attributeName);
        if (attribute) {
          element.setAttribute(
            this.attributeName,
            attribute.replace(OLD_URL, NEW_URL)
          );
        }
      }
    }

    const rewriter = new HTMLRewriter()
      .on("a", new AttributeRewriter("href"))
      .on("img", new AttributeRewriter("src"));

    const res = await fetch(request);
    const contentType = res.headers.get("Content-Type");

    // If the response is HTML, it can be transformed with
    // HTMLRewriter -- otherwise, it should pass through
    if (contentType.startsWith("text/html")) {
      return rewriter.transform(res);
    } else {
      return res;
    }
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from pyodide.ffi import create_proxy
from js import HTMLRewriter, fetch

async def on_fetch(request):
    old_url = "developer.mozilla.org"
    new_url = "mynewdomain.com"

    class AttributeRewriter:
        def __init__(self, attr_name):
            self.attr_name = attr_name
        def element(self, element):
            attr = element.getAttribute(self.attr_name)
            if attr:
                element.setAttribute(self.attr_name, attr.replace(old_url, new_url))

    href = create_proxy(AttributeRewriter("href"))
    src = create_proxy(AttributeRewriter("src"))
    rewriter = HTMLRewriter.new().on("a", href).on("img", src)
    res = await fetch(request)
    content_type = res.headers["Content-Type"]

    # If the response is HTML, it can be transformed with
    # HTMLRewriter -- otherwise, it should pass through
    if content_type.startswith("text/html"):
        return rewriter.transform(res)
    return res
```

{{</tab>}}
{{</tabs>}}