---
_build:
  publishResources: false
  render: never
  list: never
---

## Notes about end-to-end compression

Even when using the same compression algorithm end to end (between your origin server and Cloudflare, and between the Cloudflare global network and your website visitor), Cloudflare will need to decompress the response and compress it again if you enable any of the following options for the request:

- [Email Address Obfuscation](/waf/tools/scrape-shield/email-address-obfuscation/)
- [Rocket Loader](/speed/optimization/content/rocket-loader/)
- [Mirage](/speed/optimization/images/mirage/)
- [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/)
- [Polish](/images/polish/)

To disable these features for specific URI paths, create a [Configuration Rule](/rules/configuration-rules/).

Additionally, [Cloudflare Fonts](/speed/optimization/content/fonts/) also requires Cloudflare to decompress the response and compress it again, and cannot be disabled through Rules at this time.

{{<Aside type="note">}}
If you want to use [Cloudflare Web Analytics](/web-analytics/), we recommend that you use the [manual mode setup](/web-analytics/get-started/#sites-not-proxied-through-cloudflare) (adding a JavaScript snippet to your HTML pages) to avoid decompression.
{{</Aside>}}
