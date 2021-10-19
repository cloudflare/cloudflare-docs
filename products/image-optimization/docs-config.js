module.exports = {
  product: "Cloudflare Image Optimization",
  pathPrefix: "/image-optimization",
  productLogoPathD: require("./src/content/icons/image-optimization").pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/image-optimization",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:image-optimization"]' },
  },
  siteMetadata: {
    title: "Cloudflare Image Optimization docs",
    description:
      "Choose between Cloudflare Images and Cloudflare Image Resizing, two products tailored for your different needs.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/image-optimization",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};