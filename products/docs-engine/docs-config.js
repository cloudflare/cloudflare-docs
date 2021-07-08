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
    algoliaOptions: { "facetFilters": "" }
  },
  siteMetadata: {
    title: "Cloudflare Docs Engine docs",
    description: "Documentation for the open-source Cloudflare Documentation engine which powers Cloudflare's open-source documentation.",
    author: "@cloudflare",
    url: "http://developers.cloudflare.com/docs-engine",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  }
}
