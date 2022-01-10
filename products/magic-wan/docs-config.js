const productIconKey = "magic-wan";

module.exports = {
  product: "Magic WAN",
  pathPrefix: "/magic-wan",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/magic-wan",
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M43.5 22.5H31.5675L42.57 17.925L41.4225 15.15L30.375 19.71L38.8275 11.25L36.705 9.1275L28.29 17.55L32.865 6.5625L30.09 5.4075L25.5 16.4475V4.5H22.5V16.395L18 5.3925L15.225 6.54L19.785 17.5875L11.295 9.135L9.1725 11.25L17.5875 19.6725L6.6 15.105L5.445 17.8725L16.5 22.5H4.5V25.5H16.4325L5.43 30L6.5775 32.775L17.625 28.215L9.1725 36.6675L11.295 38.79L19.71 30.375L15.135 41.3625L17.91 42.5175L22.5 31.5V43.4325H25.5V31.5L30 42.5025L32.775 41.3625L28.2525 30.3375L36.705 38.79L38.8275 36.6675L30.4125 28.2525L41.4 32.8275L42.555 30.0525L31.5 25.5H43.5V22.5ZM31.5 22.5V25.5L30.36 28.26L28.2525 30.3675L25.5 31.455H22.5L19.7475 30.315L17.64 28.2075L16.5 25.4475V22.5L17.64 19.74L19.7475 17.6325L22.5 16.5H25.5L28.2525 17.64L30.36 19.7475L31.5 22.5Z" /></svg>',
  externalLinks: [
    {
      title: "Magic WAN home",
      url: "https://www.cloudflare.com/magic-wan/",
    },
    {
      title: "Blog: Magic WAN & Magic Firewall",
      url: "https://blog.cloudflare.com/magic-wan-firewall/",
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:magic-wan"]' },
  },
  siteMetadata: {
    title: "Cloudflare Magic WAN docs",
    description:
      "Magic WAN replaces legacy WAN architectures with Cloudflare’s network, providing global connectivity, cloud-based security, performance, and control through one simple user interface.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/magic-wan",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
