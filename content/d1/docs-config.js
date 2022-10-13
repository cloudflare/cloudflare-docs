module.exports = {
  product: 'Pages',
  pathPrefix: '/pages',
  productLogoPathD:
    'M20.93 6L18.9 9H7.5v30h10.11l-.46 3H6l-1.5-1.5v-33L6 6h14.93zm10.52 0H42l1.5 1.5v33L42 42H27.63l1.94-3H40.5V9h-9.62l.57-3zM21.5 28.5H11.25l-1.24-2.34L27.26.66l2.71 1.12-3.4 17.72h10.18l1.26 2.31-16.5 25.5-2.74-1.04L21.5 28.5zM10.12 12.75a1.13 1.13 0 110-2.25 1.13 1.13 0 010 2.25zm3 0a1.13 1.13 0 110-2.25 1.13 1.13 0 010 2.25zm3 0a1.13 1.13 0 110-2.25 1.13 1.13 0 010 2.25z',
  contentRepo: 'cloudflare/cloudflare-docs',
  contentRepoFolder: 'products/pages',
  externalLinks: [
    {
      title: 'Pages home',
      url: 'https://pages.cloudflare.com',
    },
    {
      title: 'Announcement blog post',
      url: 'https://blog.cloudflare.com/cloudflare-pages',
    },
    {
      title: 'First look at Cloudflare Pages (video)',
      url: 'https://www.youtube.com/watch?v=IeHC4NwkEfc',
    },
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:pages"]'}
  },
  siteMetadata: {
    title: 'Cloudflare Pages docs',
    description:
      'Documentation for Cloudflare Pages, the best way to deploy your static and JAMstack sites',
    author: '@cloudflare',
    url: 'http://developers.cloudflare.com/pages',
    image:
      'https://www.cloudflare.com/img/cf-twitter-card.png',
  },
}
