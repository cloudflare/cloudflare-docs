module.exports = {
  product: "DDoS Protection",
  pathPrefix: "/ddos-protection",
  productLogoPathD: require("./src/content/icons/ddos-protection").pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/ddos-protection",
  externalLinks: [
    {
      title: "Cloudflare DDoS Protection homepage",
      url: "https://www.cloudflare.com/ddos/",
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:ddos-protection"]' },
  },
  siteMetadata: {
    title: "Cloudflare DDoS Protection docs",
    description:
      "Cloudflare DDoS protection secures websites, applications, and entire networks while ensuring the performance of legitimate traffic is not compromised.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/ddos-protection",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
