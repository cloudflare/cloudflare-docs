---
type: example
summary: Block other websites from linking to your content. This is useful for
  protecting images.
tags:
  - Security
  - Headers
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: configuration
title: Hot-link protection
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    const HOMEPAGE_URL = "https://tutorial.cloudflareworkers.com/";
    const PROTECTED_TYPE = "image/";

    // Fetch the original request
    const response = await fetch(request);

    // If it's an image, engage hotlink protection based on the
    // Referer header.
    const referer = request.headers.get("Referer");
    const contentType = response.headers.get("Content-Type") || "";

    if (referer && contentType.startsWith(PROTECTED_TYPE)) {
      // If the hostnames don't match, it's a hotlink
      if (new URL(referer).hostname !== new URL(request.url).hostname) {
        // Redirect the user to your website
        return Response.redirect(HOMEPAGE_URL, 302);
      }
    }

    // Everything is fine, return the response normally.
    return response;
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    const HOMEPAGE_URL = "https://tutorial.cloudflareworkers.com/";
    const PROTECTED_TYPE = "image/";

    // Fetch the original request
    const response = await fetch(request);

    // If it's an image, engage hotlink protection based on the
    // Referer header.
    const referer = request.headers.get("Referer");
    const contentType = response.headers.get("Content-Type") || "";

    if (referer && contentType.startsWith(PROTECTED_TYPE)) {
      // If the hostnames don't match, it's a hotlink
      if (new URL(referer).hostname !== new URL(request.url).hostname) {
        // Redirect the user to your website
        return Response.redirect(HOMEPAGE_URL, 302);
      }
    }

    // Everything is fine, return the response normally.
    return response;
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, URL, fetch

async def on_fetch(request):
    homepage_url = "https://tutorial.cloudflareworkers.com/"
    protected_type = "image/"

    # Fetch the original request
    response = await fetch(request)

    # If it's an image, engage hotlink protection based on the referer header
    referer = request.headers["Referer"]
    content_type = response.headers["Content-Type"] or ""

    if referer and content_type.startswith(protected_type):
        # If the hostnames don't match, it's a hotlink
        if URL.new(referer).hostname != URL.new(request.url).hostname:
            # Redirect the user to your website
            return Response.redirect(homepage_url, 302)

    # Everything is fine, return the response normally
    return response
```

{{</tab>}}
{{</tabs>}}