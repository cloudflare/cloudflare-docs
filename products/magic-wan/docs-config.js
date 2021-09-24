module.exports = {
  product: "Magic WAN",
  pathPrefix: "/magic-wan",
  productIconKey: "magic-wan",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/magic-wan",
  externalLinks: [
    {
      title: "Magic WAN home",
      url: "https://www.cloudflare.com/magic-wan/"
    },
    {
      title: "Blog: Magic WAN & Magic Firewall",
      url: "https://blog.cloudflare.com/magic-wan-firewall/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:magic-wan"]'}
  },
  siteMetadata: {
    title: "Cloudflare Magic WAN docs",
    description: "Magic WAN replaces legacy WAN architectures with Cloudflare’s network, providing global connectivity, cloud-based security, performance, and control through one simple user interface.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/magic-wan",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
