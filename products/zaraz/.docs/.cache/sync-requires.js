const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/kody/Desktop/cloudflare-docs/products/zaraz/.docs/.cache/dev-404-page.js"))),
  "component---src-components-mdx-custom-renderer-js": hot(preferDefault(require("/Users/kody/Desktop/cloudflare-docs/products/zaraz/.docs/src/components/mdx-custom-renderer.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/kody/Desktop/cloudflare-docs/products/zaraz/.docs/src/pages/404.js")))
}

