module.exports = {
  product: "Stream",
  pathPrefix: "/stream",
  productIconKey: "stream",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/stream",
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
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
