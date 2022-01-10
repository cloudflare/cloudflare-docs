const productIconKey = "byoip";

module.exports = {
  product: "BYOIP",
  pathPrefix: "/byoip",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/byoip",
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M38.6925 16.3275C38.6925 16.6394 38.5999 16.9442 38.4265 17.2033C38.2531 17.4625 38.0067 17.6644 37.7185 17.7833C37.4302 17.9023 37.1132 17.9331 36.8075 17.8717C36.5017 17.8103 36.2211 17.6596 36.0012 17.4385C35.7812 17.2175 35.6318 16.9362 35.5719 16.6302C35.5119 16.3242 35.5442 16.0072 35.6646 15.7196C35.7849 15.4319 35.9879 15.1865 36.2479 15.0143C36.5079 14.8422 36.8132 14.751 37.125 14.7525C37.5414 14.7545 37.9401 14.9213 38.2338 15.2165C38.5276 15.5116 38.6925 15.9111 38.6925 16.3275ZM43.5 21.48V11.8425L42 10.3425H6L4.5 11.8425V21.48L6 22.98H42L43.5 21.48ZM7.5 13.3425H40.5V19.98H7.5V13.3425ZM37.125 29.4375C36.815 29.4375 36.5119 29.5295 36.2541 29.7017C35.9964 29.8739 35.7955 30.1187 35.6768 30.4052C35.5582 30.6916 35.5271 31.0068 35.5876 31.3108C35.6481 31.6149 35.7974 31.8942 36.0166 32.1134C36.2358 32.3326 36.5151 32.4819 36.8192 32.5424C37.1233 32.6029 37.4384 32.5719 37.7249 32.4532C38.0113 32.3346 38.2561 32.1337 38.4283 31.8759C38.6006 31.6181 38.6925 31.3151 38.6925 31.005C38.6925 30.7992 38.652 30.5954 38.5732 30.4052C38.4944 30.215 38.3789 30.0422 38.2334 29.8966C38.0878 29.7511 37.915 29.6356 37.7249 29.5568C37.5347 29.4781 37.3308 29.4375 37.125 29.4375ZM28.575 34.6875H7.5V28.02H28.5L30 25.02H6L4.5 26.52V36.1575L6 37.6575H30.0825L28.575 34.6875ZM43.74 30.9375C43.74 29.1831 43.0431 27.5006 41.8025 26.26C40.562 25.0195 38.8794 24.3225 37.125 24.3225C35.3706 24.3225 33.688 25.0195 32.4475 26.26C31.2069 27.5006 30.51 29.1831 30.51 30.9375C30.51 35.0925 35.34 41.4375 35.8875 42.1125H38.2425C38.805 41.37 43.74 35.0475 43.74 30.885V30.9375ZM40.74 30.9375C40.74 32.835 38.8125 36.1875 37.08 38.6625C35.3925 36.195 33.51 32.8425 33.51 30.9375C33.51 29.9788 33.8909 29.0593 34.5688 28.3813C35.2467 27.7034 36.1662 27.3225 37.125 27.3225C38.0838 27.3225 39.0032 27.7034 39.6812 28.3813C40.3591 29.0593 40.74 29.9788 40.74 30.9375Z" /></svg>',
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:byoip"]' },
  },
  siteMetadata: {
    title: "Cloudflare BYOIP docs",
    description:
      "With BYOIP, Cloudflare announces your IPs in all our locations. Use your IPs with Magic Transit, Spectrum, or CDN services.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/byoip",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
