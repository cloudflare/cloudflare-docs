---
_build:
  publishResources: false
  render: never
  list: never
---

If you want to customize Cloudflare settings for individual subdomains, your approach will vary depending on your plan.

Enterprise customers can set up custom settings and access for a specific subdomain within Cloudflare with [Subdomain support](/dns/zone-setups/subdomain-setup/).

All other customers can set up subdomain-specific [Page Rules](https://support.cloudflare.com/hc/articles/218411427) to alter Cloudflare settings.

If you want a subdomain's DNS settings managed totally outside of Cloudflare — meaning this subdomain can be managed by individuals without access to your Cloudflare account — refer to [Delegating subdomains outside of Cloudflare](https://support.cloudflare.com/hc/articles/360021357131).
