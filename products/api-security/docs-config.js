const fs = require("fs");
const productIconKey = "page-shield";

module.exports = {
  product: "API Security",
  pathPrefix: "/api-security",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/api-security",
  logoSVGContent: fs.readFileSync(
    path.join(__dirname, `../src/content/icons/${productIconKey}.svg`),
    "utf8"
  ),
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:api-security"]' },
  },
  siteMetadata: {
    title: "Cloudflare API Security docs",
    description:
      "Protect your APIs from simple and sophisticated attacks using Cloudflare API Security products.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/api-security",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
