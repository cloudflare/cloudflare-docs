module.exports = {
  product: "Image Resizing",
  pathPrefix: "/images",
  productIconKey: "images",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/images",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:images"]'}
  },
  siteMetadata: {
    title: "Cloudflare Image Resizing docs",
    description: "Run your image optimization logic at the edge.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/images",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
