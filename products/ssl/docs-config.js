module.exports = {
  product: "SSL",
  pathPrefix: "/ssl",
  productIconKey: "ssl",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/ssl",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:ssl"]'}
  },
  siteMetadata: {
    title: "Cloudflare SSL docs",
    description: "Cloudflare wants to encrypt as much web traffic as possible to prevent data theft and other tampering. We are the first Internet performance and security company to offer free SSL protection.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/ssl",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
