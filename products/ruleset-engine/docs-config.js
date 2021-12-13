const productIconKey = "ruleset-engine"

module.exports = {
  product: "Ruleset Engine",
  pathPrefix: "/ruleset-engine",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/ruleset-engine",
  logoSVGContent: '<svg width="48" height="48" version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="m29.9 10.1c-0.788 0.492-1.49 1.13-2.05 1.87-0.975 1.28-1.52 2.84-1.56 4.45-0.0414 1.61 0.425 3.2 1.33 4.53 0.908 1.33 2.21 2.35 3.73 2.9l0.924 1.32 0.0037 15.1h3.41l0.0037-15.1 0.924-1.32c1.51-0.552 2.82-1.57 3.73-2.9 0.908-1.33 1.37-2.92 1.33-4.53-0.0414-1.61-0.588-3.17-1.56-4.45-0.568-0.749-1.27-1.38-2.05-1.87l-0.0031 5.99-1.4 1.4h-5.33l-1.4-1.4zm-4.29 0.176c1.33-1.75 3.18-3.04 5.28-3.69l1.82 1.34 0.0034 6.76h2.52l0.0034-6.76 1.82-1.34c2.1 0.646 3.95 1.94 5.28 3.69 1.33 1.75 2.08 3.88 2.13 6.08 0.0565 2.2-0.58 4.36-1.82 6.18-1.05 1.54-2.49 2.77-4.16 3.57l-0.0037 15.6-1.4 1.4h-6.22l-1.4-1.4-0.0037-15.6c-1.67-0.797-3.11-2.03-4.16-3.57-1.24-1.82-1.88-3.98-1.82-6.18 0.0565-2.2 0.803-4.33 2.13-6.08zm-3.78 18.1h-9.83v-2.81h9.83zm4.21-5.62h-14v-2.81h14zm-1.4-5.62h-12.6v-2.81h12.6zm-18.3-7.73 1.4-1.4h21.1v2.81h-19.7v28.1h22.5v2.81h-23.9l-1.4-1.4z"/></svg>',
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:ruleset-engine"]' },
  },
  siteMetadata: {
    title: "Cloudflare Ruleset Engine docs",
    description:
      "Create and deploy rules and rulesets in different Cloudflare products using the same basic syntax.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/ruleset-engine",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
