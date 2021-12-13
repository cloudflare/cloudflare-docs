
const productIconKey =  "spectrum"

module.exports = {
  product: "Spectrum",
  pathPrefix: "/spectrum",
  productIconKey,
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/spectrum",
  logoSVGContent: '<svg width="48" height="48" viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M24.6673 44.8425H23.3323L22.7923 44.5725C22.1998 44.2725 8.15234 37.0725 8.15234 22.4325V11.8275L9.44234 10.3275L10.4998 10.2C14.8344 9.55013 18.8558 7.55648 21.9973 4.50001L22.8823 3.51001H25.1323L26.0098 4.50001C29.1564 7.56628 33.1906 9.56106 37.5373 10.2L38.5573 10.3425L39.8473 11.8425V22.4325C39.8473 37.0875 25.7998 44.25 25.2073 44.5725L24.6673 44.8425ZM11.1673 13.125V22.4325C11.1673 34.6875 22.5523 41.055 24.0148 41.82C25.5148 41.07 36.8623 34.6875 36.8623 22.4325V13.125C32.0248 12.3621 27.5365 10.1376 23.9998 6.75001C20.4672 10.1348 15.9845 12.3592 11.1523 13.125H11.1673Z"/><path d="M25.4998 14.265H22.4998V20.88H25.4998V14.265Z"/><path d="M29.8191 16.0555L25.1416 20.733L27.2629 22.8543L31.9404 18.1768L29.8191 16.0555Z"/><path d="M33.7348 22.5H27.1198V25.5H33.7348V22.5Z"/><path d="M27.2705 25.1381L25.1492 27.2594L29.8267 31.9369L31.948 29.8156L27.2705 25.1381Z"/><path d="M25.4998 27.12H22.4998V33.735H25.4998V27.12Z"/><path d="M20.7366 25.1457L16.0591 29.8232L18.1804 31.9445L22.8579 27.267L20.7366 25.1457Z"/><path d="M20.8798 22.5H14.2648V25.5H20.8798V22.5Z"/><path d="M18.1728 16.0556L16.0515 18.1769L20.729 22.8544L22.8503 20.7331L18.1728 16.0556Z"/></svg>',
   externalLinks: [
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:spectrum"]'}
  },
  siteMetadata: {
    title: "Cloudflare Spectrum docs",
    description: "DDoS protection for everything.",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/spectrum",
    image: "https://www.cloudflare.com/img/cf-twitter-card.png"
  }
}
