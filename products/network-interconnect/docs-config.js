const fs = require("fs");
const productIconKey = "network-interconnect";
const path = require("path");

module.exports = {
  product: "Network Interconnect",
  pathPrefix: "/network-interconnect",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/network-interconnect",
  logoSVGContent: fs.readFileSync(
    path.join(__dirname, `src/content/icons/${productIconKey}.svg`),
    "utf8"
  ),
  externalLinks: [
    {
      title: "Blog announcement",
      url: "https://blog.cloudflare.com/cloudflare-network-interconnect/",
    },
    {
      title: "CNI Partnerships",
      url: "https://www.cloudflare.com/network-interconnect-partnerships/",
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:network-interconnect"]' },
  },
  siteMetadata: {
    title: "Cloudflare Network Interconnect docs",
    description:
      "For a faster, more reliable, and more secure experience than connecting over the Internet.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/network-interconnect",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
