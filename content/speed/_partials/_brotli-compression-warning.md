---
_build:
  publishResources: false
  render: never
  list: never
---

## Notes about end-to-end compression

Even when using the same compression algorithm end to end (between your origin server and Cloudflare, and between the Cloudflare global network and your website visitor), Cloudflare will need to decompress the response and compress it again if you enable any of the following options for the request:

- [Email Address Obfuscation](/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/)
- [Rocket Loader](/speed/optimization/content/rocket-loader/)
- [Server Side Excludes (SSE)](/support/more-dashboard-apps/cloudflare-scrape-shield/what-does-server-side-excludes-sse-do/)
- [Mirage](/speed/optimization/images/mirage/)
- [HTML Minification](/speed/optimization/content/auto-minify/) (you can minify JavaScript and CSS without any impact)
- [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/)

To disable these features for specific URI paths, create a [Configuration Rule](/rules/configuration-rules/).