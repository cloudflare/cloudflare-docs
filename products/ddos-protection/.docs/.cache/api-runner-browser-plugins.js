module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-layout/gatsby-browser.js'),
      options: {"plugins":[],"component":"/Users/kody/Desktop/cloudflare-docs/products/ddos-protection/.docs/src/components/docs-page.js"},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1382,"disableBgImageOnAlpha":true}},"gatsby-remark-copy-linked-files"],"remarkPlugins":[null]},
    },{
      plugin: require('../node_modules/gatsby-plugin-material-ui/gatsby-browser.js'),
      options: {"plugins":[],"stylesProvider":{"disableGeneration":true}},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Cloudflare docs","short_name":"Docs","start_url":"/","background_color":"#f38020","theme_color":"#f38020","display":"minimal-ui","icon":"src/images/cloudflare-icon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"8a23e4822f3854c58b8f63b57e286bef"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-tagmanager/gatsby-browser.js'),
      options: {"plugins":[],"id":"GTM-PKQFGQB","dataLayerName":"cfDataLayer","selfHostedOrigin":"https://tr.www.cloudflare.com"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
