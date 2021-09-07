module.exports = {
    product: "Ruleset Engine",
    pathPrefix: "/ruleset-engine",
    productLogoPathD: require('./src/content/icons/ruleset-engine').pathD,
    contentRepo: "cloudflare/cloudflare-docs",
    contentRepoFolder: "products/ruleset-engine",
    externalLinks: [
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
      title: "Cloudflare Ruleset Engine docs",
      description: "Create and deploy rules and rulesets in different Cloudflare products using the same basic syntax.",
      author: "@cloudflare",
      url: "https://developers.cloudflare.com/ruleset-engine",
      image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
    }
  }