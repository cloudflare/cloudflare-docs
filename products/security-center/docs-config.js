module.exports = {
  product: "Security Center",
  pathPrefix: "/security-center",
  productLogoPathD: require("./src/content/icons/security-center").pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/security-center",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "",
    apiKey: "",
    algoliaOptions: { facetFilters: "" },
  },
  siteMetadata: {
    title: "Cloudflare Security Center docs",
    description:
      "Cloudflare Security Center allows you to manage your IT assets in a single dashboard, warning you about possible security risks and vulnerabilities, and providing a one-click solution for Cloudflare configuration issues.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/security-center",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
