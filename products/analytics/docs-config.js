module.exports = {
  product: "Analytics",
  pathPrefix: "/analytics",
  productIconKey: "analytics",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/analytics",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:analytics"]'}
  },
  siteMetadata: {
    title: "Cloudflare Analytics API docs",
    description: "With the GraphQL Analytics API, all of your performance, security, and reliability data is available from one endpoint. And you can select exactly what you need, from one metric for a domain to multiple metrics aggregated for your account.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/analytics",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
