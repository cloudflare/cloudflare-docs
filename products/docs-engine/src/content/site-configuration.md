---
order: 2
---

# Site configuration

<Aside type="warning">

__Warning:__ The process for building a docs site using the Cloudflare Docs Engine is currently in flux. Please hold off on using the Docs Engine until this notice is removed.

</Aside>

The Cloudflare Docs Engine is designed to allow customization by each Cloudflare product team.

--------------------------------

## docs-config.js

Documentation for `docs-config.js` is currently in flux. For now, here’s an example file:

```js
---
filename: docs-config.js
---
module.exports = {
  product: "Example",
  pathPrefix: "",
  productLogoPathD: "M8 8v32h32V26H22V8zm18-2h16v16H26z",
  contentRepo: "adamschwartz/docs-engine-example",
  externalLinks: [
    {
      title: "Adam Schwartz website",
      url: "https://adamschwartz.co"
    },
    {
      title: "Docs Engine on GitHub",
      url: "https://github.com/adamschwartz/cloudflare-docs-engine"
    },
    {
      title: "example.com",
      url: "https://example.com"
    },
  ],
  search: {
    indexName: "",
    apiKey: "",
  },
  siteMetadata: {
    title: "Example docs",
    description: "These docs are an example of of a docs site built with https://github.com/cloudflare/workers-docs-engine.",
    author: "@adamschwartz",
    url: "http://adamschwartz.co/docs-engine-example",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=",
  },
}
```
