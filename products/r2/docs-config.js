const productIconKey = "r2";

module.exports = {
  product: "R2",
  pathPrefix: "/r2",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/r2",
  logoSVGContent:
    '<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M10.75 9.116l-1.83-.991 1.69-.914.14-.078-.509-.892-1.775 1.085.049-2.076h-1.03l.05 2.076-1.776-1.085-.509.894 1.83.99-1.83.991.509.893 1.775-1.085L7.485 11h1.03l-.05-2.076 1.776 1.085.509-.893z"/><path fill-rule="evenodd" d="M8.372 1.164h-.745l-.287.322a6.896 6.896 0 01-3.852 1.91l-.343.05-.428.495v3.535c0 2.463 1.19 4.292 2.375 5.498 1.181 1.204 2.386 1.822 2.507 1.882l.177.09h.447l.18-.09c.119-.06 1.324-.677 2.506-1.882 1.184-1.206 2.375-3.035 2.375-5.498V3.942l-.428-.495-.343-.05a6.897 6.897 0 01-3.852-1.911l-.289-.322zM3.717 4.373A7.896 7.896 0 008 2.239a7.896 7.896 0 004.284 2.135v3.102c0 2.115-1.018 3.706-2.089 4.798A9.442 9.442 0 018 13.938a9.441 9.441 0 01-2.194-1.664C4.735 11.182 3.717 9.59 3.717 7.476V4.373z"/></svg>',
  externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com",
    },
  ],
  search: {
    indexName: "",
    apiKey: "",
    algoliaOptions: { facetFilters: "" },
  },
  siteMetadata: {
    title: "Cloudflare R2 docs",
    description:
      "Store large amounts of unstructured data without egress fees.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/r2",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png",
  },
};
