const productIconKey = "magic-transit";

module.exports = {
  product: "Magic Transit",
  pathPrefix: "/magic-transit",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/magic-transit",
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M40.8522 8.445L36.0371 4.7775L35.1297 4.5H13.4171L12.5246 4.7925L7.56715 8.46L6.95215 9.6675V38.1675L7.36465 39.2025L10.9871 43.035L12.0821 43.5075H35.8272L36.8547 43.1025L40.9646 39.27L41.4446 38.1675V9.6675L40.8522 8.445ZM38.4446 27.5025L35.0922 31.2075H13.8446L9.95215 27.75V22.17L12.7046 24.6075H36.4197L38.4446 22.3575V27.5025ZM12.7046 15.4125H36.3897L38.4446 13.3125V17.9025L35.0922 21.6075H13.8446L9.95215 18.1575V12.9675L12.7046 15.4125ZM13.9121 7.5H34.6271L37.6797 9.8325L35.1297 12.4425H13.8446L10.8446 9.7725L13.9121 7.5ZM35.2497 40.5H12.7496L9.97465 37.5675V31.7775L12.7271 34.2075H36.4197L38.4446 31.9575V37.5L35.2497 40.5Z" /><path d="M33.3296 19.9875C33.6397 19.9875 33.9427 19.8956 34.2005 19.7233C34.4583 19.5511 34.6592 19.3063 34.7778 19.0199C34.8965 18.7334 34.9275 18.4183 34.867 18.1142C34.8065 17.8101 34.6573 17.5308 34.438 17.3116C34.2188 17.0924 33.9395 16.9431 33.6355 16.8826C33.3314 16.8221 33.0162 16.8532 32.7298 16.9718C32.4434 17.0905 32.1986 17.2914 32.0263 17.5491C31.8541 17.8069 31.7621 18.11 31.7621 18.42C31.7612 18.6261 31.801 18.8304 31.8794 19.021C31.9579 19.2117 32.0733 19.3849 32.219 19.5306C32.3648 19.6764 32.538 19.7918 32.7286 19.8702C32.9192 19.9486 33.1235 19.9885 33.3296 19.9875Z" /><path d="M33.3296 26.25C33.0196 26.25 32.7166 26.3419 32.4588 26.5142C32.201 26.6864 32.0001 26.9312 31.8815 27.2176C31.7628 27.5041 31.7318 27.8192 31.7923 28.1233C31.8528 28.4274 32.002 28.7067 32.2213 28.9259C32.4405 29.1451 32.7198 29.2944 33.0238 29.3549C33.3279 29.4154 33.6431 29.3843 33.9295 29.2657C34.2159 29.147 34.4607 28.9461 34.633 28.6884C34.8052 28.4306 34.8971 28.1275 34.8971 27.8175C34.8971 27.4018 34.732 27.0031 34.438 26.7091C34.1441 26.4151 33.7454 26.25 33.3296 26.25Z" /><path d="M33.3296 35.6325C33.0196 35.6325 32.7166 35.7244 32.4588 35.8967C32.201 36.0689 32.0001 36.3137 31.8815 36.6001C31.7628 36.8866 31.7318 37.2017 31.7923 37.5058C31.8528 37.8099 32.002 38.0892 32.2213 38.3084C32.4405 38.5276 32.7198 38.6769 33.0238 38.7374C33.3279 38.7979 33.6431 38.7668 33.9295 38.6482C34.2159 38.5295 34.4607 38.3286 34.633 38.0709C34.8052 37.8131 34.8971 37.51 34.8971 37.2C34.8971 36.7843 34.732 36.3856 34.438 36.0916C34.1441 35.7976 33.7454 35.6325 33.3296 35.6325Z" /></svg>',
  externalLinks: [
    {
      title: "Magic Transit home",
      url: "https://www.cloudflare.com/magic-transit/",
    },
    {
      title: "Magic Transit: DDoS Protection for Service Providers",
      url: "https://www.cloudflare.com/magic-transit/service-providers/",
    },
    {
      title: "Blog: Magic Transit",
      url: "https://blog.cloudflare.com/magic-transit/",
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:magic-transit"]' },
  },
  siteMetadata: {
    title: "Cloudflare Magic Transit docs",
    description:
      "Magic Transit delivers network functions at Cloudflare scale—DDoS protection, traffic acceleration, and much more from every Cloudflare data center—for on-premise, cloud-hosted, and hybrid networks.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/magic-transit",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
