---
type: example
summary: Allow a client to request static assets while waiting for the HTML response.
tags:
  - Middleware
  - Headers
pcx_content_type: configuration
title: 103 Early Hints
weight: 1001
layout: example
---
To ensure Early Hints are enabled:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com) and select your account and website.
2. Go to **Speed** -> **Optimization**.
3. Enable the **Early Hints** toggle to on.

{{<Aside type="note">}}

Currently, `103 Early Hints` are only supported in Chrome 103 or later. To view up-to-date information on which browsers support Early Hints, refer to [caniuse.com](https://caniuse.com/mdn-http_status_103).

{{</Aside>}}

```js
const CSS = `body { color: red; }`;
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

async function handleRequest(request) {
  // If request is for test.css, serve the raw CSS
  if (/test\.css$/.test(request.url)) {
    return new Response(CSS, {
      headers: {
        'content-type': 'text/css',
      },
    });
  } else {
    // Serve raw HTML using Early Hints for the CSS file
    return new Response(HTML, {
      headers: {
        'content-type': 'text/html',
        'Link': '</test.css>; rel=preload; as=style',
      },
    });
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
```
