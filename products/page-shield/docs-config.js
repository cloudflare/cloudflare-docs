module.exports = {
  product: "Page Shield",
  pathPrefix: "/page-shield",
  productIconKey: "page-shield",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/page-shield",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:page-shield"]'}
  },
  siteMetadata: {
    title: "Cloudflare Page Shield docs",
    description: "Provide client-side protection as part of your domain's firewall",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/page-shield",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}