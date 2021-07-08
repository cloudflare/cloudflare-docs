module.exports = {
  product: "Registrar",
  pathPrefix: "/registrar",
  productIconKey: "registrar",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/registrar",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:registrar"]'}
  },
  siteMetadata: {
    title: "Cloudflare Registrar docs",
    description: "Welcome to Cloudflare Registrar. The first registrar you can love.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/registrar",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
