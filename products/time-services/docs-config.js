module.exports = {
  product: "Time Services",
  pathPrefix: "/time-services",
  productIconKey: "time-services",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/time-services",
  externalLinks: [
    {
      title: "Cloudflare Time Services homepage",
      url: "https://www.cloudflare.com/time/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:time-services"]'}
  },
  siteMetadata: {
    title: "Cloudflare Time Services docs",
    description: "Cloudflare’s suite of time services: NTP, NTS, and Roughtime.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/time-services",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
