var plugins = [{
      plugin: require('/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/node_modules/gatsby-plugin-layout/gatsby-ssr'),
      options: {"plugins":[],"component":"/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/src/components/docs-page.js"},
    },{
      plugin: require('/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1382,"disableBgImageOnAlpha":true}},"gatsby-remark-copy-linked-files"],"remarkPlugins":[null]},
    },{
      plugin: require('/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/node_modules/gatsby-plugin-material-ui/gatsby-ssr'),
      options: {"plugins":[],"stylesProvider":{"disableGeneration":true}},
    },{
      plugin: require('/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Cloudflare docs","short_name":"Docs","start_url":"/","background_color":"#f38020","theme_color":"#f38020","display":"minimal-ui","icon":"src/images/cloudflare-icon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"8a23e4822f3854c58b8f63b57e286bef"},
    },{
      plugin: require('/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/node_modules/gatsby-plugin-google-tagmanager/gatsby-ssr'),
      options: {"plugins":[],"id":"GTM-PKQFGQB","dataLayerName":"cfDataLayer","selfHostedOrigin":"https://tr.www.cloudflare.com"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
