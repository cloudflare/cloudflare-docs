module.exports = {
  product: "Cloudflare for Teams", // TODO: change to "Cloudflare One"
  pathPrefix: "/cloudflare-one",
  productIconKey: "cloudflare-for-teams", // TODO: change to "cloudflare-one"
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/cloudflare-one",
  externalLinks: [
    {
      title: "Blog: Introducing Cloudflare One",
      url: "https://blog.cloudflare.com/introducing-cloudflare-one/"
    },
    {
      title: "Cloudflare for Teams pricing",
      url: "https://www.cloudflare.com/teams-pricing/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:cloudflare-one"]' }
  },
  siteMetadata: {
    title: "Cloudflare for Teams documentation",
    description: "Cloudflare One™ is the culmination of engineering and technical development guided by conversations with thousands of customers about the future of the corporate network. It provides secure, fast, reliable, cost-effective network services, integrated with leading identity management and endpoint security providers. These docs contain step-by-step, use case driven, tutorials to use Cloudflare One products.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/cloudflare-one",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
