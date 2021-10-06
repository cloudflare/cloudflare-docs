module.exports = {
  product: "HTTP/3",
  pathPrefix: "/http3",
  productIconKey: "http3",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/http3",
  externalLinks: [
    {
      title: "HTTP/3 posts on the Cloudflare blog",
      url: "https://blog.cloudflare.com/tag/http3/"
    },
    {
      title: "HTTP/3 vs. HTTP/3 performance",
      url: "https://blog.cloudflare.com/http-3-vs-http-2/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:http3"]'}
  },
  siteMetadata: {
    title: "Cloudflare HTTP/3 docs",
    description: "HTTP/3 is the newest version of the Hypertext Transfer Protocol",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/http3",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
