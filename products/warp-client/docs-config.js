module.exports = {
  product: "WARP Client",
  pathPrefix: "/warp-client",
  productIconKey: "warp-client",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/warp-client",
  externalLinks: [
    {
      title: "Blog announcement",
      url: "https://blog.cloudflare.com/warp-for-desktop/"
    },
    {
      title: "1.1.1.1 homepage",
      url: "https://1.1.1.1"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:warp-client"]'}
  },
  siteMetadata: {
    title: "Cloudflare WARP client docs",
    description: "The Cloudflare WARP client allows individuals or organizations to have a faster, more secure and private experience online.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/warp-client",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
