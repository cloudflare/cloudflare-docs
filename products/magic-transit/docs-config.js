module.exports = {
  product: "Magic Transit",
  pathPrefix: "/magic-transit",
  productIconKey: "magic-transit",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/magic-transit",
  externalLinks: [
    {
      title: "Magic Transit home",
      url: "https://www.cloudflare.com/magic-transit/"
    },
    {
      title: "Magic Transit: DDoS Protection for Service Providers",
      url: "https://www.cloudflare.com/magic-transit/service-providers/"
    },
    {
      title: "Blog: Magic Transit",
      url: "https://blog.cloudflare.com/magic-transit/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:magic-transit"]'}
  },
  siteMetadata: {
    title: "Cloudflare Magic Transit docs",
    description: "Magic Transit delivers network functions at Cloudflare scale—DDoS protection, traffic acceleration, and much more from every Cloudflare data center—for on-premise, cloud-hosted, and hybrid networks.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/magic-transit",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
