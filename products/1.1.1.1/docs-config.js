const fs = require("fs");
const productIconKey = "1.1.1.1";
const path = require("path");

module.exports = {
  product: "1.1.1.1",
  pathPrefix: "/1.1.1.1",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/1.1.1.1",
  logoSVGContent: fs.readFileSync(
    path.join(__dirname, `src/content/icons/${productIconKey}.svg`),
    "utf8"
  ),
  externalLinks: [
    {
      title: "1.1.1.1 website",
      url: "https://1.1.1.1",
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:1.1.1.1"]' },
  },
  siteMetadata: {
    title: "1.1.1.1 docs",
    description: "A blazing fast DNS resolver built for private browsing.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/1.1.1.1",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
