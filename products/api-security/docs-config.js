const fs = require("fs");
const productIconKey = "api-security";
const path = require("path");

module.exports = {
  product: "API Security",
  pathPrefix: "/api-security",
  productIconKey,
  productLogoPathD: "M43,10.17l-1-.14a21,21,0,0,1-11.52-5.7l-.9-1H27.28l-.88,1A21,21,0,0,1,14.86,10l-1,.14-1.29,1.49v3.43H5.25l-1.5,1.5v19.5l1.5,1.5H18.6a30.91,30.91,0,0,0,8.59,6.81l.54.27h1.34l.53-.27c.6-.29,14.65-7.49,14.65-22.14V11.66ZM27.4,18.09v3.55H6.75V18.09ZM6.75,24.64H27.4v10H20l0,0-.06,0H6.75Zm34.5-2.38c0,12.26-11.39,18.62-12.85,19.39a27.91,27.91,0,0,1-5.61-4.06H28.9l1.5-1.5V16.59l-1.5-1.5H15.55V13A23.88,23.88,0,0,0,28.4,6.56,23.78,23.78,0,0,0,41.25,13Z",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/api-security",
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
