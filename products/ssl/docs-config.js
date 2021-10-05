const fs = require("fs");
const productIconKey = "ssl";
const path = require("path");

module.exports = {
  product: "SSL",
  pathPrefix: "/ssl",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/ssl",
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
    algoliaOptions: { facetFilters: '["project:ssl"]' },
  },
  siteMetadata: {
    title: "Cloudflare SSL docs",
    description:
      "Encrypting as much web traffic as possible to prevent data theft and other tampering is a critical step toward building a safer, better Internet. We’re proud to be the first Internet performance and security company to offer SSL protection free of charge.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/ssl",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
