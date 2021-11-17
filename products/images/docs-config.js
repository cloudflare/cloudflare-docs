module.exports = {
  product: "Cloudflare Image Optimization",
  pathPrefix: "/images",
  productLogoPathD: require("./src/content/icons/images").pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/images",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:images"]' },
  },
  siteMetadata: {
    title: "Cloudflare Image Optimization docs",
    description:
      "Choose between Cloudflare Images and Cloudflare Image Resizing, two products tailored to your different needs.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/images",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};