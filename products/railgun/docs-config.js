module.exports = {
    product: "Railgun",
    pathPrefix: "/railgun",
    productIconKey: "railgun",
    contentRepo: "cloudflare/cloudflare-docs",
    contentRepoFolder: "products/railgun",
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
      title: "Cloudflare Railgun docs",
      description: "Improve loading times by caching dynamically generated or personalized web pages, dramatically reducing bandwidth usage and improving download times.",
      author: "@cloudflare",
      url: "https://developers.cloudflare.com/railgun",
      image: "https://www.cloudflare.com/img/cf-twitter-card.png"
    }
  }