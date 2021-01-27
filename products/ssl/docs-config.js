module.exports = {
  product: "SSL",
  pathPrefix: "/ssl",
  productIconKey: "ssl",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/ssl",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:ssl"]'}
  },
  siteMetadata: {
    title: "Cloudflare SSL docs",
    description: "Encrypting as much web traffic as possible to prevent data theft and other tampering is a critical step toward building a safer, better Internet. We’re proud to be the first Internet performance and security company to offer SSL protection free of charge.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/ssl",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
