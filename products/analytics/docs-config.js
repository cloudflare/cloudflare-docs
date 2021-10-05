const fs = require("fs");
const productIconKey = "analytics";
const path = require("path");

module.exports = {
  product: "Analytics",
  pathPrefix: "/analytics",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/analytics",
  logoSVGContent: fs.readFileSync(
    path.join(__dirname, `src/content/icons/${productIconKey}.svg`),
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
    algoliaOptions: { facetFilters: '["project:analytics"]' },
  },
  siteMetadata: {
    title: "Cloudflare Analytics API docs",
    description:
      "With the GraphQL Analytics API, all of your performance, security, and reliability data is available from one endpoint. And you can select exactly what you need, from one metric for a domain to multiple metrics aggregated for your account.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/analytics",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
