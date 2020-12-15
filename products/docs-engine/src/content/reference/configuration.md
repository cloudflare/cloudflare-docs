---
order: 0
---

# Configuration

The Docs Engine is designed to allow customization by each Cloudflare product team.

Every docs site must include a `docs-config.js` file. This file is used by Docs Engine to customize the docs site’s title, logo, external links menu, site metadata, search, and more.

## Properties

Create a `docs-config.js` file which exports (by setting `module.exports`) a JavaScript object containing the following properties:

<Definitions>

- `product` <Type>string</Type> <PropMeta>required</PropMeta>
  - The title of the project, e.g. `"My Docs"`. Displayed inside the sidebar navigation on desktop, the header on mobile, and concatenated into a few tooltips.

- `pathPrefix` <Type>string</Type> <PropMeta>optional</PropMeta>
  - A proxy to the Gatsby [property of the same name](https://www.gatsbyjs.com/docs/path-prefix/). Specifies a URL path prefix, e.g. `"/example"`, to deploy the site to. Specifying the empty string (`""`) to deploy to the root. Development is done at the root (`localhost:8000`) regardless of the value.

- `productIconKey` <Type>string</Type> <PropMeta>optional</PropMeta>
  - The logo for the docs site, specified as product icon found by key from [@cloudflare/cloudflare-brand-assets](https://github.com/cloudflare/cloudflare-brand-assets). One of `productIconKey` or `productLogoPathD` is required.

- `productLogoPathD` <Type>string</Type> <PropMeta>optional</PropMeta>
  - The logo for the docs site, specified directly as the SVG `<path/>` [`d` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) for an inline SVG element with `viewBox="0 0 48 48"`. The example `"M8 8h32v32h-32v-32z"` would draw a solid `32px` square centered inside the `48px` square space. One of `productLogoPathD` or `productIconKey` is required.

- `contentRepo` <Type>string</Type> <PropMeta>required</PropMeta>
  - The GitHub repo (e.g. `"cloudflare/cloudflare-docs"`) used to for example construct the the “Edit on GitHub” links displayed in each docs page’s footer.

- `contentRepoFolder` <Type>string</Type> <PropMeta>optional</PropMeta>
  - By default the engine assumes that a docs site’s structure is placed in the root of a project repo. However, this whole structure can also be placed inside any sub-folder by setting this property. For example, this site’s content is inside the [`products/docs-engine` folder](https://github.com/cloudflare/cloudflare-docs/tree/4fd3a4af9507b20bb23fea4d7c4f4cd349c0f463/products/docs-engine) of [@cloudflare/cloudflare-docs](https://github.com/cloudflare/cloudflare-docs) so its `"products/docs-engine"`.

- `externalLinks` <Type>array</Type> <PropMeta>required</PropMeta>
  - An array of objects each specifying a `title` <Type>string</Type> and `url` <Type>string</Type>. Used to construct the external links menu inside the sidebar nav on desktop.

- `search` <Type>object</Type> <PropMeta>required</PropMeta>
  - Adds a search to the site, powered by Algolia DocSearch. To hide search, set `search.indexName` and `search.apiKey` to the empty string, e.g.:

    ```js
    search: {
      indexName: "",
      apiKey: ""
    }
    ```

    For an example of a project using search, see the [Workers config](https://github.com/cloudflare/cloudflare-docs/blob/e72247549d20f649786251d0368de19560d1bbb2/products/workers/docs-config.js#L21-L24).

- `siteMetadata` <Type>object</Type> <PropMeta>required</PropMeta>
  - A proxy to the Gatsby [property of the same name](https://www.gatsbyjs.com/docs/gatsby-config/#sitemetadata). Sub-properties:

    <Definitions>

    - `title` <Type>string</Type>
      - Used in meta tags for SEO.

    - `description` <Type>string</Type>
      - Used in description meta tags for SEO.

    - `author` <Type>string</Type>
      - Used in author meta tags for SEO.

    - `url` <Type>string</Type>
      - The URL of the final resulting site (including appending `pathPrefix`). Used to construct `rel="canonical"` meta tags for SEO.

    - `image` <Type>string</Type>
      - Used for the `og:image` meta tag for SEO and social media.

    </Definitions>

</Definitions>

--------------------------------

## Examples

Here’s the `docs-config.js` file for the [example project](https://github.com/adamschwartz/docs-engine-example):

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

([Source](https://github.com/adamschwartz/docs-engine-example/blob/c45fa9f0a8affc68baf5d3517f8b890ba0522531/docs-config.js))

--------------------------------

Here’s the `docs-config.js` file for [these docs](https://github.com/cloudflare/cloudflare-docs/tree/production/products/docs-engine):

```js
---
filename: docs-config.js
---
module.exports = {
  product: "Docs Engine",
  pathPrefix: "/docs-engine",
  productIconKey: "docs-engine",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/docs-engine",
  externalLinks: [
    {
      title: "Docs Engine on GitHub",
      url: "https://github.com/cloudflare/cloudflare-docs-engine"
    },
    {
      title: "Cloudflare Developer documentation",
      url: "https://developers.cloudflare.com/docs"
    },
  ],
  search: {
    indexName: "",
    apiKey: "",
  },
  siteMetadata: {
    title: "Cloudflare Docs Engine docs",
    description: "Documentation for the open-source Cloudflare Documentation engine which powers Cloudflare's open-source documentation.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/docs-engine",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=",
  }
}
```

([Source](https://github.com/cloudflare/cloudflare-docs/blob/production/products/docs-engine/docs-config.js))
