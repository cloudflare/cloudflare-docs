---
type: example
summary: Redirect requests from one URL to another or from one set of URLs to
  another set.
tags:
  - Middleware
  - Redirects
languages:
  - JavaScript
  - TypeScript
  - Python
  - Rust
preview:
  - true
pcx_content_type: example
title: Redirect
weight: 6
layout: example
---

## Redirect all requests to one URL

{{<tabs labels="js | ts | py | rs">}}
{{<tab label="js" default="true">}}

{{<render file="_redirect-example-js.md">}}

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
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
{{<tab label="rs">}}

```rs
use worker::*;

#[event(fetch)]
async fn fetch(_req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let destination_url = Url::parse("https://example.com")?;
    let status_code = 301;
    Response::redirect_with_status(destination_url, status_code)
}

```

{{</tab>}}
{{</tabs>}}

## Redirect requests from one domain to another

{{<tabs labels="js | ts | py | rs">}}
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
  async fetch(request): Promise<Response> {
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
{{<tab label="rs">}}

```rs
use worker::*;

#[event(fetch)]
async fn fetch(req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let mut base = Url::parse("https://example.com")?;
    let status_code = 301;

    let url = req.url()?;

    base.set_path(url.path());
    base.set_query(url.query());

    console_log!("{:?}", base.to_string());

    Response::redirect_with_status(base, status_code)
}

```

{{</tab>}}
{{</tabs>}}
