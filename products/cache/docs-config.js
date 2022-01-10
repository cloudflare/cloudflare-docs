const productIconKey = "cache";

module.exports = {
  product: "Cache",
  pathPrefix: "/cache",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/cache",
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M37.1252 22.227C37.9917 22.227 38.6942 21.5246 38.6942 20.658C38.6942 19.7915 37.9917 19.089 37.1252 19.089C36.2586 19.089 35.5562 19.7915 35.5562 20.658C35.5562 21.5246 36.2586 22.227 37.1252 22.227Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5891 6.55014L12.75 6H35.25L36.4109 6.55014L43.1609 14.8001L43.5 15.75V16.1685L43.506 16.1745V25.8135L42.006 27.3135H6L4.5 25.8135V15.75L4.83906 14.8001L11.5891 6.55014ZM7.5 17.6745V24.3135H40.506V18.75H40.5V17.6745H7.5ZM39.182 14.6745H8.81802L13.4608 9H34.5392L39.182 14.6745Z" /><path d="M37.1252 36.9075C37.9917 36.9075 38.6942 36.205 38.6942 35.3385C38.6942 34.472 37.9917 33.7695 37.1252 33.7695C36.2586 33.7695 35.5562 34.472 35.5562 35.3385C35.5562 36.205 36.2586 36.9075 37.1252 36.9075Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M6 29.355L4.5 30.855V40.494L6 41.994H42.006L43.506 40.494V30.855L42.006 29.355H6ZM7.5 38.994V32.355H40.506V38.994H7.5Z" /></svg>',
  externalLinks: [
    {
      title: "Cloudflare CDN",
      url: "https://www.cloudflare.com/cdn/",
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:cache"]' },
  },
  siteMetadata: {
    title: "Cloudflare Cache docs",
    description:
      "Cloudflare makes customer websites faster by storing a copy of the website’s content on our servers. Caching static resources at Cloudflare reduces your server load and bandwidth, with no extra charges for bandwidth spikes",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/cache",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
