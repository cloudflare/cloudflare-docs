const fs = require('fs')

module.exports = {
    product: "Railgun",
    pathPrefix: "/railgun",
    productIconKey: "railgun",
    contentRepo: "cloudflare/cloudflare-docs",
    contentRepoFolder: "products/railgun",
    logoSVGContent: fs.readFileSync('../src/content/icons/railgun.svg' , 'utf8'),
    externalLinks: [
      {
        title: "Cloudflare homepage",
        url: "https://cloudflare.com"
      }
    ],
    search: {
      indexName: "developers-cloudflare",
      apiKey: "b23088ab4d346409f9d3ece6606344c3",
      algoliaOptions: { 'facetFilters': '["project:railgun"]'}
    },
    siteMetadata: {
      title: "Railgun Documentation",
      description: "Improve loading times by caching dynamically generated or personalized web pages, dramatically reducing bandwidth usage and improving download times.",
      author: "@cloudflare",
      url: "https://developers.cloudflare.com/railgun",
      image: "https://www.cloudflare.com/img/cf-twitter-card.png"
    }
  }