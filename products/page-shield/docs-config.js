const productIconKey = "page-shield";

module.exports = {
  product: "Page Shield",
  pathPrefix: "/page-shield",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/page-shield",
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M9.9 21.1502C10.575 21.1502 11.175 20.5502 11.175 19.8752C11.175 19.2002 10.575 18.6002 9.9 18.6002C9.225 18.6002 8.625 19.2002 8.625 19.8752C8.625 20.5502 9.225 21.1502 9.9 21.1502Z" /><path d="M13.9499 21.1502C14.6249 21.1502 15.2249 20.5502 15.2249 19.8752C15.2249 19.2002 14.6249 18.6002 13.9499 18.6002C13.2749 18.6002 12.6749 19.2002 12.6749 19.8752C12.6749 20.5502 13.2749 21.1502 13.9499 21.1502Z" /><path d="M19.275 19.8752C19.275 20.5502 18.675 21.1502 18 21.1502C17.25 21.1502 16.725 20.5502 16.725 19.8752C16.725 19.2002 17.325 18.6002 18 18.6002C18.675 18.6002 19.275 19.2002 19.275 19.8752Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M26.6276 2.75384L28.8689 2.75244L29.7278 3.71663C32.8474 6.81005 36.8659 8.81763 41.1964 9.44782L42.2183 9.59816L43.5 11.0822V21.6849C43.5 29.0699 39.9542 34.5541 36.4254 38.1753C32.9041 41.7889 29.3124 43.6436 28.9553 43.8229L28.422 44.0907L27.0735 44.0896L26.5447 43.8229C26.1791 43.6392 22.591 41.7838 19.0746 38.1753C18.8619 37.9571 18.6492 37.732 18.4371 37.5002H6L4.5 36.0002V16.5002L6 15.0002H12V11.0792L13.2817 9.59516L14.3038 9.44479C18.6337 8.81542 22.6518 6.80911 25.7716 3.71715L26.6276 2.75384ZM15 15.0002H30L31.5 16.5002V36.0002L30 37.5002H22.7128C25.063 39.5801 27.1788 40.7655 27.75 41.0687C28.4404 40.7023 31.387 39.0471 34.2768 36.0816C37.4669 32.8079 40.5 28.034 40.5 21.6849V12.3765C35.6947 11.6211 31.2406 9.38567 27.75 5.97917C24.2589 9.38458 19.8049 11.6189 15 12.3736V15.0002ZM28.5 34.5002V24.7502H7.5V34.5002H28.5ZM7.5 18.0002V21.7502H28.5V18.0002H7.5Z" /></svg>',
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:page-shield"]' },
  },
  siteMetadata: {
    title: "Cloudflare Page Shield docs",
    description:
      "Provide client-side protection as part of your domain's firewall",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/page-shield",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
