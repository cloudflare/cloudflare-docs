const productIconKey = "waiting-room";

module.exports = {
  product: "Waiting Room",
  pathPrefix: "/waiting-room",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/waiting-room",
  logoSVGContent: '<svg width="48" height="49" viewBox="0 0 48 49"  xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.76853 5.5L10.2685 4H36.8678L38.3678 5.5V17.6201H42.6364L44.1364 19.1201V36.5088L42.6364 38.0088H37.0859V44.8025H34.0859V38.0088H13.3709V44.8025H10.3709V38.0088H4.5L3 36.5088V19.1201L4.5 17.6201H8.76853V5.5ZM8.76853 20.6201H6V35.0088H41.1364V20.6201H38.3678V30.7403L36.8678 32.2403H10.2685L8.76853 30.7403V20.6201ZM11.7685 7V23.4717H35.3678V7H11.7685ZM35.3678 26.4717H11.7685V29.2403H35.3678V26.4717Z" /></svg>',
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:waiting-room"]' },
  },
  siteMetadata: {
    title: "Cloudflare Waiting Room docs",
    description:
      "Cloudflare Waiting Rooms redirect visitors to virtual waiting rooms when they are trying to access web pages that have high volumes of traffic.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/waiting-room",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
