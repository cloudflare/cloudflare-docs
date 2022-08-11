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
To ensure Early Hints are enabled, go to the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/:zone/speed/optimization) under Your Domain -> Speed -> Optimization and enable the Early Hints toggle.

{{<Aside type="note">}}

At the time of writing, 103 Early Hints are only supported in Chrome 103 or later. To view up-to-date info on which browsers support Early Hints, check [here](https://caniuse.com/mdn-http_status_103).

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
