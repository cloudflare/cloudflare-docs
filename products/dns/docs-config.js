const productIconKey = "dns";

module.exports = {
    product: "DNS",
    pathPrefix: "/dns",
    contentRepo: "cloudflare/cloudflare-docs",
    contentRepoFolder: "products/dns",
    logoSVGContent: '<svg width="48" height="48" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 2L21.5 0H30.5L32.5 2V11L30.5 13H27.9927V23.2971H47.5396V39H50L52 41V50L50 52H41L39 50V41L41 39H43.5496V27.2971H27.9927V39H30.5303L32.5303 41V50L30.5303 52H21.5303L19.5303 50V41L21.5303 39H23.9927V27.2971H8.53809V39H11L13 41V50L11 52H2L0 50V41L2 39H4.53809V23.2971H23.9927V13H21.5L19.5 11V2Z" /></svg>',
    externalLinks: [{
        title: "Cloudflare home",
        url: "https://www.cloudflare.com/"
    }],
    search: {
        indexName: "",
        apiKey: "",
        algoliaOptions: { 'facetFilters': ''}
    },
    siteMetadata: {
        title: "Cloudflare DNS docs",
        description: "Cloudflare DNS provides the fastest, most resilient, and simplest managed DNS platform to meet your needs.",
        author: "@cloudflare",
        url: "https://developers.cloudflare.com/dns",
        image: "https://www.cloudflare.com/img/cf-twitter-card.png",
    },
  }
