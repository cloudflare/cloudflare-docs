module.exports = {
  product: "Argo Tunnel",
  pathPrefix: "/argo-tunnel",
  productIconKey: "argo-tunnel",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/argo-tunnel",
  externalLinks: [
    {
      title: "Argo Tunnel home",
      url: "https://www.cloudflare.com/products/argo-tunnel/"
    },
    {
      title: "cloudflared on GitHub",
      url: "https://github.com/cloudflare/cloudflared"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:argo-tunnel"]'}
  },
  siteMetadata: {
    title: "Cloudflare Argo Tunnel docs",
    description: "Argo Tunnel exposes applications running on your local web server, on any network with an Internet connection, without adding DNS records or configuring a firewall or router. It just works.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/argo-tunnel",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
