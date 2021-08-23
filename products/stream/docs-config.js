const fs = require('fs')

module.exports = {
  product: "Stream",
  pathPrefix: "/stream",
  productIconKey: "stream",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/stream",
  logoSVGContent: fs.readFileSync('../src/content/icons/stream.svg' , 'utf8'),
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:stream"]'}
  },
  siteMetadata: {
    title: "Cloudflare Stream docs",
    description: "Store, encode, deliver, and play videos on your sites and applications.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/stream",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
