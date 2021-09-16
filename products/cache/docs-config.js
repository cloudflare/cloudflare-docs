const fs = require("fs");
const productIconKey = "cache";
const path = require("path");

module.exports = {
  product: "Cache",
  pathPrefix: "/cache",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/cache",
  logoSVGContent: fs.readFileSync(
    path.join(__dirname, `src/content/icons/${productIconKey}.svg`),
    "utf8"
  ),
  externalLinks: [
    {
      title: "Cloudflare CDN",
      url: "https://www.cloudflare.com/cdn/",
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:cache"]' },
  },
  siteMetadata: {
    title: "Cloudflare Cache docs",
    description:
      "Cloudflare makes customer websites faster by storing a copy of the website’s content on our servers. Caching static resources at Cloudflare reduces your server load and bandwidth, with no extra charges for bandwidth spikes",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/cache",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
