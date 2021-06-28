module.exports = {
  product: "Waiting Room",
  pathPrefix: "/waiting-room",
  productIconKey: "waiting-room",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/waiting-room",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:waiting-room"]'}
  },
  siteMetadata: {
    title: "Cloudflare Waiting Room docs",
    description: "Cloudflare Waiting Rooms redirect visitors to virtual waiting rooms when they are trying to access web pages that have high volumes of traffic.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/waiting-room",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
