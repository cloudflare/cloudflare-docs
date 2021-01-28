module.exports = {
  product: "Workers",
  pathPrefix: "/workers",
  productIconKey: "workers",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/workers",
  externalLinks: [
    {
      title: "Workers home",
      url: "https://workers.cloudflare.com"
    },
    {
      title: "Playground",
      url: "https://cloudflareworkers.com"
    },
    {
      title: "Pricing",
      url: "https://workers.cloudflare.com/#plans"
    },
    {
      title: "Discord",
      url: "https://discord.gg/cloudflaredev"
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:workers"]'}
  },
  siteMetadata: {
    title: "Cloudflare Workers docs",
    description: "Documentation for Cloudflare Workers, a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.",
    author: "@cloudflare",
    url: "http://developers.cloudflare.com/workers",
    image: "http://developers.cloudflare.com/workers/og-image.png",
  }
}
