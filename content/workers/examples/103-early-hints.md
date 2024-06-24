---
type: example
summary: Allow a client to request static assets while waiting for the HTML response.
tags:
  - Middleware
  - Headers
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: 103 Early Hints
weight: 1001
layout: example
---

`103` Early Hints is an HTTP status code designed to speed up content delivery. When enabled, Cloudflare can cache the `Link` headers marked with preload and/or preconnect from HTML pages and serve them in a `103` Early Hints response before reaching the origin server. Browsers can use these hints to fetch linked assets while waiting for the origin’s final response, dramatically improving page load speeds.

To ensure Early Hints are enabled on your zone:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com) and select your account and website.
2. Go to **Speed** > **Optimization** > **Content Optimization**.
3. Enable the **Early Hints** toggle to on.

You can return `Link` headers from a Worker running on your zone to speed up your page load times.

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
const CSS = "body { color: red; }";
const HTML = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Early Hints test</title>
    <link rel="stylesheet" href="/test.css">
</head>
<body>
    <h1>Early Hints test page</h1>
</body>
</html>
`;

export default {
  async fetch(req) {
    // If request is for test.css, serve the raw CSS
    if (/test\.css$/.test(req.url)) {
      return new Response(CSS, {
        headers: {
          "content-type": "text/css",
        },
      });
    } else {
      // Serve raw HTML using Early Hints for the CSS file
      return new Response(HTML, {
        headers: {
          "content-type": "text/html",
          link: "</test.css>; rel=preload; as=style",
        },
      });
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```js
const CSS = "body { color: red; }";
const HTML = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Early Hints test</title>
    <link rel="stylesheet" href="/test.css">
</head>
<body>
    <h1>Early Hints test page</h1>
</body>
</html>
`;

export default {
  async fetch(req): Promise<Response> {
    // If request is for test.css, serve the raw CSS
    if (/test\.css$/.test(req.url)) {
      return new Response(CSS, {
        headers: {
          "content-type": "text/css",
        },
      });
    } else {
      // Serve raw HTML using Early Hints for the CSS file
      return new Response(HTML, {
        headers: {
          "content-type": "text/html",
          link: "</test.css>; rel=preload; as=style",
        },
      });
    }
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
import re
from js import Response, Headers

CSS = "body { color: red; }"
HTML = """
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Early Hints test</title>
    <link rel="stylesheet" href="/test.css">
</head>
<body>
    <h1>Early Hints test page</h1>
</body>
</html>
"""
def on_fetch(request):
    if re.search("test.css", request.url):
        headers = Headers.new({"content-type": "text/css"}.items())
        return Response.new(CSS, headers=headers)
    else:
        headers = Headers.new({"content-type": "text/html","link": "</test.css>; rel=preload; as=style"}.items())
        return Response.new(HTML, headers=headers)
```

{{</tab>}}
{{</tabs>}}
