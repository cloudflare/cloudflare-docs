module.exports = {
  product: "Gateway",
  pathPrefix: "/gateway",
  productIconKey: "gateway",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/gateway",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:gateway"]'}
  },
  siteMetadata: {
    title: "Cloudflare Gateway docs",
    description: "Cloudflare Gateway protects enterprises, their devices, their networks and their data by securing every connection without compromising performance.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/gateway",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
