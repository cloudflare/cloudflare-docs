const fs = require('fs')
const path = require('path')
const productIconKey =  "spectrum"

module.exports = {
  product: "Spectrum",
  pathPrefix: "/spectrum",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/spectrum",
  logoSVGContent: fs.readFileSync(path.join(__dirname, `/src/content/icons/${productIconKey}.svg`), 'utf8'),
   externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:spectrum"]'}
  },
  siteMetadata: {
    title: "Cloudflare Spectrum docs",
    description: "DDoS protection for everything.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/spectrum",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
