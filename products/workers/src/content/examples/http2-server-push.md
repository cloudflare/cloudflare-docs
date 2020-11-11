---
order: 1000
type: example
summary: Push static assets to a client's browser without waiting for HTML to render.
tags:
  - Originless
  - JAMstack
  - HTML
---

# HTTP2 server push

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const CSS = `body { color: red; }`
const HTML = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Server push test</title>
    <link rel="stylesheet" href="http2_push/h2p/test.css">
</head>
<body>
    <h1>Server push test page</h1>
</body>
</html>
`

async function handleRequest(request) {
  // If request is for test.css, serve the raw CSS
  if (/test\.css$/.test(request.url)) {
    return new Response(CSS, {
      headers: {
        "content-type": "text/css",
      },
    })
  }
  else {
    // Serve raw HTML using HTTP/2 for the CSS file
    return new Response(HTML, {
      headers: {
        "content-type": "text/html",
        Link: "</http2_push/h2p/test.css>; rel=preload; as=style",
      },
    })
  }
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```
