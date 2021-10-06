module.exports = {
  product: "Rules",
  pathPrefix: "/rules",
  productIconKey: "rules",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/rules",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:rules"]' }
  },
  siteMetadata: {
    title: "Cloudflare Rules docs",
    description: "Create rules that adjust incoming HTTP requests at the edge.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/rules",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
