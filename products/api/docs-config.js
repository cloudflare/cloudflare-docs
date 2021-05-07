module.exports = {
  product: "API",
  pathPrefix: "/api",
  productIconKey: "api",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/api",
  externalLinks: [
    {
      title: "Full API docs",
      url: "https://api.cloudflare.com/"
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
    title: "Cloudflare API docs",
    description: "Cloudflare’s API tokens allow you to make calls to our API to alter different settings.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/api",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
