const productIconKey = "dns";

module.exports = {
    product: "DNS",
    pathPrefix: "/dns",
    contentRepo: "cloudflare/cloudflare-docs",
    contentRepoFolder: "products/dns",
    logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M 35 26.980469 L 32.875 26.980469 L 32.875 18.40625 L 21.148438 18.40625 L 21.148438 12.957031 L 23.25 12.957031 L 24.5 11.707031 L 24.5 5 L 23.25 3.75 L 16.511719 3.75 L 15.261719 5 L 15.261719 11.707031 L 16.511719 12.957031 L 18.648438 12.957031 L 18.648438 18.40625 L 7.125 18.40625 L 7.125 26.980469 L 5 26.980469 L 3.75 28.230469 L 3.75 35 L 5 36.25 L 11.742188 36.25 L 12.992188 35 L 12.992188 28.230469 L 11.742188 26.980469 L 9.625 26.980469 L 9.625 20.90625 L 18.648438 20.90625 L 18.648438 26.980469 L 16.511719 26.980469 L 15.261719 28.230469 L 15.261719 35 L 16.511719 36.25 L 23.25 36.25 L 24.5 35 L 24.5 28.230469 L 23.25 26.980469 L 21.148438 26.980469 L 21.148438 20.90625 L 30.382812 20.90625 L 30.382812 26.980469 L 28.261719 26.980469 L 27.011719 28.230469 L 27.011719 35 L 28.261719 36.25 L 35 36.25 L 36.25 35 L 36.25 28.230469 Z M 17.761719 6.25 L 22 6.25 L 22 10.488281 L 17.761719 10.488281 Z M 10.492188 33.75 L 6.25 33.75 L 6.25 29.480469 L 10.488281 29.480469 Z M 22 33.75 L 17.761719 33.75 L 17.761719 29.480469 L 22 29.480469 Z M 33.75 33.75 L 29.511719 33.75 L 29.511719 29.480469 L 33.75 29.480469 Z M 33.75 33.75 " /></svg>',
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
