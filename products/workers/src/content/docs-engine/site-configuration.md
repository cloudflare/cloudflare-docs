# Site configuration

<Aside type="warning">

__Warning:__ These APIs are a work in progress, and may change substantially before release.

</Aside>

The Cloudflare Docs engine uses is designed to allow customization by each Cloudflare product team. Though this API will likely change, this page documents how site configuration is currently applied.

--------------------------------

## Gatsby config

```js
module.exports = {
  // Standard Gatsby config property
  // https://www.gatsbyjs.org/docs/gatsby-config/#sitemetadata
  siteMetadata: {

    // SEO title/description
    title: "Cloudflare Workers Docs",
    description: "Documentation for Cloudflare Workers...",

    // The meat of the customization goes in `cloudflareDocs
    cloudflareDocs: {

      // The name of the Cloudflare product
      product: "Workers",

      // The SVG <path/> `d` attribute value to render
      // the product logo taken from the set on
      // https://developers.cloudflare.com/docs/
      productLogoPathD: "M13.112 9.832c.164-.276.362-[...]",

      // The GitHub repo where the Markdown files live,
      // currently only used for "Edit on GitHub" links
      contentRepo: "cloudflare/workers-docs",

      // Links to render in the vertical "..." menu
      // displayed next to the product name in the sidebar
      externalLinks: [
        {
          title: "Workers home",
          url: "https://workers.cloudflare.com"
        },
        {
          title: "Playground",
          url: "https://cloudflareworkers.com"
        },
        {
          title: "Pricing",
          url: "https://workers.cloudflare.com/#plans"
        },
      ]
    },
  },

  plugins: {
    // ...
  }
}
```
