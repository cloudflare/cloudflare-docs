module.exports = {
  product: "Email Routing",
  pathPrefix: "/email-routing",
  productLogoPathD: require('./src/content/icons/email-routing').pathD,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/email-routing",
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
    title: "Cloudflare Email Routing docs",
    description: "Simplify the way you create and manage email addresses. With Email Routing, you can create any number of custom email addresses that you can use in situations where you do not want to share your real email address.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/firewall",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  }
}