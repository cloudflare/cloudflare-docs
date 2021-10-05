const fs = require("fs");
const productIconKey = "waf";
const path = require("path");

module.exports = {
  product: "WAF",
  pathPrefix: "/waf",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/waf",
  logoSVGContent: fs.readFileSync(
    path.join(__dirname, `src/content/icons/${productIconKey}.svg`),
    "utf8"
  ),
  externalLinks: [
    {
      title: "Cloudflare WAF homepage",
      url: "https://www.cloudflare.com/waf/",
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:waf"]' },
  },
  siteMetadata: {
    title: "Cloudflare Web Application Firewall (WAF) docs",
    description:
      "Protect against web application vulnerabilities with Cloudflare’s Web Application Firewall (WAF).",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/waf",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
