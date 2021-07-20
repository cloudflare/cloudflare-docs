module.exports = {
  product: "Cache",
  pathPrefix: "/cache",
  productIconKey: "cache",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/cache",
  externalLinks: [
    {
      title: "Cloudflare CDN",
      url: "https://www.cloudflare.com/cdn/"
    },
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
    title: "Cloudflare Cache docs",
    description: "Cloudflare makes customer websites faster by storing a copy of the website’s content on our servers. Caching static resources at Cloudflare reduces your server load and bandwidth, with no extra charges for bandwidth spikes",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/cache",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
