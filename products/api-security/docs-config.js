const productIconKey = "api-security";

module.exports = {
  product: "API Security",
  pathPrefix: "/api-security",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/api-security",
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M37.8074 4.5H10.1924L8.69238 6V18.66C8.69238 34.8225 21.7949 42.4575 23.2874 43.2825H24.7499C26.2499 42.4575 39.3299 34.8225 39.3299 18.66V6L37.8074 4.5ZM11.6924 18.66V7.5H22.4999V39.21C18.7499 36.465 11.6924 29.85 11.6924 18.66ZM36.3074 18.66C36.3074 29.85 29.2874 36.465 25.5074 39.21V7.5H36.3074V18.66Z" /><path d="M37.8074 4.5H10.1924L8.69238 6V18.66C8.69238 34.8225 21.7949 42.4575 23.2874 43.2825H24.7499C26.2499 42.4575 39.3299 34.8225 39.3299 18.66V6L37.8074 4.5ZM11.6924 18.66V7.5H22.4999V39.21C18.7499 36.465 11.6924 29.85 11.6924 18.66ZM36.3074 18.66C36.3074 29.85 29.2874 36.465 25.5074 39.21V7.5H36.3074V18.66Z" fill="url(#paint0_linear)"/><path d="M37.8074 4.5H10.1924L8.69238 6V18.66C8.69238 34.8225 21.7949 42.4575 23.2874 43.2825H24.7499C26.2499 42.4575 39.3299 34.8225 39.3299 18.66V6L37.8074 4.5ZM11.6924 18.66V7.5H22.4999V39.21C18.7499 36.465 11.6924 29.85 11.6924 18.66ZM36.3074 18.66C36.3074 29.85 29.2874 36.465 25.5074 39.21V7.5H36.3074V18.66Z" fill="url(#paint1_linear)"/><defs><linearGradient id="paint0_linear" x1="24.0111" y1="4.5" x2="24.0111" y2="43.2825" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear" x1="24.0111" y1="4.5" x2="24.0111" y2="43.2825" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>',
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:api-security"]' },
  },
  siteMetadata: {
    title: "Cloudflare API Security docs",
    description:
      "Protect your APIs from simple and sophisticated attacks using Cloudflare API Security products.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/api-security",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
