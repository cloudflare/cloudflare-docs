const productIconKey = "workers";

module.exports = {
  product: "Workers",
  pathPrefix: "/workers",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/workers",
  logoSVGContent: '<svg width="48" height="49" viewBox="0 0 48 49"  xmlns="http://www.w3.org/2000/svg"><path d="M18.6298 37.4176L8.98484 24.5176L18.5773 11.9851L16.7248 9.45756L5.91734 23.5951L5.90234 25.4026L16.7623 39.9451L18.6298 37.4176Z" /><path d="M21.9973 6.50256H18.2848L31.6723 24.8026L18.5998 42.5026H22.3348L35.3998 24.8101L21.9973 6.50256Z" /><path d="M29.1748 6.50256H25.4173L39.0148 24.5851L25.4173 42.5026H29.1823L42.0898 25.4926V23.6851L29.1748 6.50256Z" /></svg>',
  externalLinks: [
    {
      title: "Workers home",
      url: "https://workers.cloudflare.com",
    },
    {
      title: "Playground",
      url: "https://cloudflareworkers.com",
    },
    {
      title: "Pricing",
      url: "https://workers.cloudflare.com/#plans",
    },
    {
      title: "Discord",
      url: "https://discord.gg/cloudflaredev",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:workers"]' },
  },
  siteMetadata: {
    title: "Cloudflare Workers docs",
    description:
      "Documentation for Cloudflare Workers, a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.",
    author: "@cloudflare",
    url: "http://developers.cloudflare.com/workers",
    image: "http://developers.cloudflare.com/workers/og-image.png",
  },
};
