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
    title: "The Life of a Cloudflare Request docs",
    description: "Undersea cables, peering agreements and TLS handshakes. Follow the life of a request across the internet and see how it all works.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/fundamentals",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
