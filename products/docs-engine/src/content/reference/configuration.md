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

- `productLogoPathD` <Type>string</Type> <PropMeta>required</PropMeta>
  - The logo for the docs site, represented as the SVG `<path/>` [`d` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) for an inline SVG element with `viewBox="0 0 48 48"`. The example `"M8 8h32v32h-32v-32z"` would draw a solid `32px` square centered inside the `48px` square space.

- `contentRepo` <Type>string</Type> <PropMeta>required</PropMeta>
  - The GitHub repo (e.g. `"cloudflare/cloudflare-docs"`) used to for example construct the the “Edit on GitHub” links displayed in each docs page’s footer.

- `contentRepoFolder` <Type>string</Type> <PropMeta>optional</PropMeta>
  - By default the engine assumes that a docs site’s structure is placed in the root of a project repo. However, this whole structure can also be placed inside any sub-folder by setting this property. For example, this site’s content is inside the [`products/docs-engine` folder](https://github.com/cloudflare/cloudflare-docs/tree/4fd3a4af9507b20bb23fea4d7c4f4cd349c0f463/products/docs-engine) of [@cloudflare/cloudflare-docs](https://github.com/cloudflare/cloudflare-docs) so its `"products/docs-engine"`.

- `externalLinks` <Type>array</Type> <PropMeta>required</PropMeta>
  - An array of objects each specyfying a `title` <Type>string</Type> and `url` <Type>string</Type>. Used to construct the external links menu inside the sidebar nav on desktop.

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

Here’s the `docs-config.js` file for [these docs](https://github.com/cloudflare/cloudflare-docs/tree/master/products/docs-engine):

```js
---
filename: docs-config.js
---
module.exports = {
  product: "Docs Engine",
  pathPrefix: "/docs-engine",
  productLogoPathD: "M10 8h18c.7.07 1.37.37 1.88.88l4.24 4.24A3 3 0 0135 15L35 20h-3v-3h-6v-6H13v27h10l3 3H10V8zm5 13h8v1h-8v-1zm1 4h3v1h-3v-1zm0-2h5v1h-5v-1zm1 4h5v1h-5v-1zm-1 6h2v1h-2v-1zm-1 2h4v1h-4v-1zm3-6h3v1h-3v-1zm-1 2h3v1h-3v-1zm-2-18h8v3h-8v-3zm20.39 27.5c-.06.29-.32.5-.62.5h-2.54a.63.63 0 01-.62-.5l-.34-1.74c-.46-.14-.9-.32-1.32-.55l-1.47.98a.63.63 0 01-.8-.08l-1.8-1.79a.63.63 0 01-.07-.8l.98-1.47c-.23-.42-.41-.86-.55-1.32l-1.73-.34a.63.63 0 01-.51-.62v-2.54c0-.3.21-.56.5-.62l1.74-.34c.14-.46.32-.9.55-1.32l-.98-1.47a.63.63 0 01.08-.8l1.79-1.8a.63.63 0 01.8-.07l1.47.98c.42-.23.86-.41 1.32-.55l.34-1.73c.06-.3.32-.51.62-.51h2.54c.3 0 .56.21.62.5l.34 1.74c.46.14.9.32 1.32.55l1.48-.98a.63.63 0 01.8.08l1.79 1.79c.2.21.24.55.08.8l-.99 1.47c.23.42.41.86.55 1.32l1.73.34c.3.06.51.32.51.62v2.54c0 .3-.21.56-.5.62l-1.74.34c-.14.46-.32.9-.55 1.32l.98 1.48c.17.25.14.58-.08.8l-1.79 1.79a.63.63 0 01-.8.08l-1.47-.99c-.42.23-.86.41-1.32.55l-.34 1.73zm2.54-9a4.43 4.43 0 10-8.86 0 4.43 4.43 0 008.86 0z",
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
    url: "http://developers.cloudflare.com/docs-engine",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=",
  }
}
```

([Source](https://github.com/cloudflare/cloudflare-docs/blob/4fd3a4af9507b20bb23fea4d7c4f4cd349c0f463/products/docs-engine/docs-config.js))
