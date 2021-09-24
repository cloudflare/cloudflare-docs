module.exports = {
  product: "Firewall",
  pathPrefix: "/firewall",
  productIconKey: "firewall",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/firewall",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:firewall"]'}
  },
  siteMetadata: {
    title: "Cloudflare Firewall Rules docs",
    description: "Create rules that examine incoming HTTP traffic against a set of powerful filters to block, challenge, log, or allow matching requests.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/firewall",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
