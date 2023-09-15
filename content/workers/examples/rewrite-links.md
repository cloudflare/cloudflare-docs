---
type: example
summary: Rewrite URL links in HTML using the HTMLRewriter. This is useful for
  JAMstack websites.
tags:
  - HTMLRewriter
pcx_content_type: configuration
title: Rewrite links
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
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
const handler: ExportedHandler = {
  async fetch(request: Request) {
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

export default handler;
```

{{</tab>}}
{{</tabs>}}
