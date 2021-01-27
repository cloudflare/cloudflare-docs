module.exports = {
  product: "Access",
  pathPrefix: "/access",
  productIconKey: "access",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/access",
  externalLinks: [
    {
      title: "Cloudflare for Teams: Access home",
      url: "https://www.cloudflare.com/teams/access/"
    },
    {
      title: "Cloudflare for Teams home",
      url: "https://www.cloudflare.com/teams/"
    },
    {
      title: "Cloudflare for Teams pricing",
      url: "https://www.cloudflare.com/teams-pricing/"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:access"]'}
  },
  siteMetadata: {
    title: "Cloudflare Access docs",
    description: "Welcome to Cloudflare Access. You can now make all your applications available on the internet without a VPN. Access protects these applications and allows only authorized users to access them. For example, Cloudflare uses Access to ensure only people at Cloudflare can access internal tools like our staging site.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/access",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
