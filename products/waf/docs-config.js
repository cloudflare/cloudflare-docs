module.exports = {
  product: "WAF",
  pathPrefix: "/waf",
  productIconKey: "waf",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/waf",
  externalLinks: [
    {
      title: "Cloudflare WAF homepage",
      url: "https://www.cloudflare.com/waf/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:waf"]'}
  },
  siteMetadata: {
    title: "Cloudflare Web Application Firewall (WAF) docs",
    description: "Protect against web application vulnerabilities with Cloudflare’s Web Application Firewall (WAF).",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/waf",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
