module.exports = {
  product: "DNS",
  pathPrefix: "/dns",
  productLogoPathD: require('./src/content/icons/dns').pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/dns",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "",
    apiKey: "",
    algoliaOptions: { 'facetFilters': ''}
  },
  siteMetadata: {
    title: "Cloudflare DNS docs",
    description: "Choose Cloudflare DNS for the fastest response time, unparalleled redundancy, and advanced security with built-in DDoS mitigation and DNSSEC.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/dns",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
