module.exports = {
  product: "API",
  pathPrefix: "/api",
  productIconKey: "api",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/api",
  externalLinks: [
    {
      title: "Full API docs",
      url: "https://api.cloudflare.com/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:api"]'}
  },
  siteMetadata: {
    title: "Cloudflare API docs",
    description: "Cloudflare’s API tokens allow you to make calls to our API to alter different settings.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/api",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
