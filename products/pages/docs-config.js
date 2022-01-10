const productIconKey = "pages";

module.exports = {
  product: "Pages",
  pathPrefix: "/pages",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/pages",
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M21.375 7.50005L19.425 10.5H9V37.5H17.7L17.175 40.5H7.5L6 39V9.00005L7.5 7.50005H21.375ZM30.825 7.50005H40.5L42 9.00005V39L40.5 40.5H26.625L28.575 37.5H39V10.5H30.3L30.825 7.50005Z" /><path d="M21.45 28.5H12.75L11.475 26.175L27.075 2.17505L29.775 3.30005L26.55 19.5H35.25L36.525 21.825L20.925 45.825L18.225 44.7L21.45 28.5Z" /><path d="M11.175 13.725C11.7549 13.725 12.225 13.2549 12.225 12.675C12.225 12.0951 11.7549 11.625 11.175 11.625C10.5951 11.625 10.125 12.0951 10.125 12.675C10.125 13.2549 10.5951 13.725 11.175 13.725Z" /><path d="M13.95 13.725C14.5299 13.725 15 13.2549 15 12.675C15 12.0951 14.5299 11.625 13.95 11.625C13.3701 11.625 12.9 12.0951 12.9 12.675C12.9 13.2549 13.3701 13.725 13.95 13.725Z" /><path d="M16.725 13.725C17.3049 13.725 17.775 13.2549 17.775 12.675C17.775 12.0951 17.3049 11.625 16.725 11.625C16.1451 11.625 15.675 12.0951 15.675 12.675C15.675 13.2549 16.1451 13.725 16.725 13.725Z" /></svg>',
  externalLinks: [
    {
      title: "Pages home",
      url: "https://pages.cloudflare.com",
    },
    {
      title: "Announcement blog post",
      url: "https://blog.cloudflare.com/cloudflare-pages",
    },
    {
      title: "First look at Cloudflare Pages (video)",
      url: "https://www.youtube.com/watch?v=IeHC4NwkEfc",
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { facetFilters: '["project:pages"]' },
  },
  siteMetadata: {
    title: "Cloudflare Pages docs",
    description:
      "Documentation for Cloudflare Pages, the best way to deploy your static and JAMstack sites",
    author: "@cloudflare",
    url: "http://developers.cloudflare.com/pages",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
