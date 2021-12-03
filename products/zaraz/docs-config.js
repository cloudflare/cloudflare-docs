module.exports = {
  product: "Zaraz",
  pathPrefix: "/zaraz",
  productLogoPathD: require('./src/content/icons/zaraz').pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/zaraz",
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "",
    apiKey: "",
    algoliaOptions: { facetFilters: '' },
  },
  siteMetadata: {
    title: "Cloudflare Zaraz docs",
    description: "Run third-party tools and services on the cloud, and improve the loading speed of your website.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/zaraz",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}