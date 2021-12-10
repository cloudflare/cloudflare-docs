const productIconKey = "zaraz";

module.exports = {
  product: "Zaraz",
  pathPrefix: "/zaraz",
  productIconKey,
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M4 14L26 14V10L4 10V14Z M4 22L26 22V18L4 18V22Z M40 38L26 38V34L40 34V38Z M26 30L40 30V26L26 26V30Z M60 54L26 54V50L60 50V54Z M26 46L60 46V42L26 42V46Z"/></svg>',
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
    description: "Run third-party tools and services on the cloud, and improve the loading speed and security of your website.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/zaraz",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}