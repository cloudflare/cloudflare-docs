module.exports = {
  product: "API Shield",
  pathPrefix: "/api-shield",
  productLogoPathD: require('./src/content/icons/api-shield').pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/api-shield",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "",
    apiKey: "",
    algoliaOptions: { facetFilters: '' },
  },
  siteMetadata: {
    title: "Cloudflare API Shield docs",
    description:
      "Protect your APIs from simple and sophisticated attacks using Cloudflare API Shield products.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/api-shield",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
