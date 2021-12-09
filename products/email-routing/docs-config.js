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
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:email-routing"]' }
  },
  siteMetadata: {
    title: "Cloudflare Email Routing docs",
    description: "Simplify the way you create and manage email addresses. Create any number of custom email addresses to use in situations where you do not want to share your primary email address, and Email Routing will forward your email messages for you.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/email-routing",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  }
}