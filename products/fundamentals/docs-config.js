module.exports = {
  product: "Cloudflare Fundamentals",
  pathPrefix: "/fundamentals",
  productIconKey: "fundamentals",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/fundamentals",
  externalLinks: [
    {
      title: "How does Cloudflare work?",
      url: "https://support.cloudflare.com/hc/en-us/articles/205177068-How-does-Cloudflare-work-"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:fundamentals"]'}
  },
  siteMetadata: {
    title: "Cloudflare Fundamentals",
    description: "Cloudflare Fundamentals provides information about features that span Cloudflare products.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/fundamentals",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
