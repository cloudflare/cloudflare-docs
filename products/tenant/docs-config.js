const fs = require('fs');
const productIconKey = "tenant";
const path = require("path");

module.exports = {
  product: "Tenant",
  pathPrefix: "/tenant",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/tenant",
  logoSVGContent: fs.readFileSync(path.join(__dirname, `../src/content/icons/${productIconKey}.svg`), 'utf8'),
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "",
    apiKey: "",
    algoliaOptions: { 'facetFilters': ''}
  },
  siteMetadata: {
    title: "Cloudflare Tenant docs",
    description: "With Cloudflare’s new provisioning APIs, you can provision and manage Cloudflare accounts and services for your team or your customers. A new set of APIs built into our Client v4 API library make a streamlined onboarding and setup experience",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/tenant",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
