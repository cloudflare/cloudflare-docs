module.exports = {
  product: "Magic Firewall",
  pathPrefix: "/magic-firewall",
  productIconKey: "firewall",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/magic-firewall",
  externalLinks: [
    {
      title: "Magic Transit home",
      url: "https://www.cloudflare.com/magic-transit/"
    },
    {
      title: "Blog: Magic WAN & Magic Firewall",
      url: "https://blog.cloudflare.com/introducing-magic-firewall/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:magic-firewall"]'}
  },
  siteMetadata: {
    title: "Cloudflare Magic Firewall docs",
    description: "Magic Firewall a network-level firewall delivered through Cloudflare to secure your enterprise.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/magic-firewall",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
