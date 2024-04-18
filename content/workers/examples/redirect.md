---
type: example
summary: Redirect requests from one URL to another or from one set of URLs to
  another set.
tags:
  - Middleware
pcx_content_type: configuration
title: Redirect
weight: 6
layout: example
---

## Redirect all requests to one URL

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

{{<render file="_redirect-example-js.md">}}

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request: Request) {
    const destinationURL = "https://example.com";
    const statusCode = 301;
    return Response.redirect(destinationURL, statusCode);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response

def on_fetch(request):
    destinationURL = "https://example.com"
    statusCode = 301
    return Response.redirect(destinationURL, statusCode)
```

{{</tab>}}
{{</tabs>}}

## Redirect requests from one domain to another

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    const base = "https://example.com";
    const statusCode = 301;

    const url = new URL(request.url);
    const { pathname, search } = url;

    const destinationURL = `${base}${pathname}${search}`;
    console.log(destinationURL);

    return Response.redirect(destinationURL, statusCode);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request) {
    const base = "https://example.com";
    const statusCode = 301;

    const url = new URL(request.url);
    const { pathname, search } = url;

    const destinationURL = `${base}${pathname}${search}`;
    console.log(destinationURL);

    return Response.redirect(destinationURL, statusCode);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, URL

async def on_fetch(request):
    base = "https://example.com"
    statusCode = 301

    url = URL.new(request.url)

    destinationURL = f'{base}{url.pathname}{url.search}'
    print(destinationURL)

    return Response.redirect(destinationURL, statusCode)
```

{{</tab>}}
{{</tabs>}}
