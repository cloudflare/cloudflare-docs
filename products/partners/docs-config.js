module.exports = {
  product: "Partners",
  pathPrefix: "/partners",
  productLogoPathD: require('./src/content/icons/partners').pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/partners",
  externalLinks: [
    {
      title: "Cloudflare Partners homepage",
      url: "https://www.cloudflare.com/partners"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "",
    algoliaOptions: { 'facetFilters': ''}
  },
  siteMetadata: {
    title: "Cloudflare Partners docs",
    description: "The Cloudflare Partner Network includes Channel Partners who deliver our security, reliability and performance solutions with a broad range of value-added and managed services, and Alliance Partners who embed Cloudflare into their applications.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/partners",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}