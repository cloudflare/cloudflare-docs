module.exports = {
  product: "Load Balancing",
  pathPrefix: "/load-balancing",
  productLogoPathD: "dummy content",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/load-balancing",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:load-balancing"]'}
  },
  siteMetadata: {
    title: "Cloudflare Load Balancing",
    description: "Balance traffic loads, manage failovers, monitor server and pool health, and apply geographic control with Cloudflare Load Balancing",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/load-balancing",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
