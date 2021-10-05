const fs = require("fs");
const productIconKey = "randomness-beacon";
const path = require("path");

module.exports = {
  product: "Randomness Beacon",
  pathPrefix: "/randomness-beacon",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/randomness-beacon",
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
    algoliaOptions: { facetFilters: '["project:randomness-beacon"]' },
  },
  siteMetadata: {
    title: "Cloudflare Randomness Beacon docs",
    description:
      "Explore drand: a distributed service providing public randomness in an application-agnostic, secure, and efficient way.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/randomness-beacon",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
