---
_build:
  publishResources: false
  render: never
  list: never
---

If your main domain is using Cloudflare's [Universal SSL certificate](/ssl/edge-certificates/universal-ssl/), that certificate also covers all first-level subdomains (`blog.example.com`).

For deeper subdomains (`dev.blog.example.com`), use a [different type of certificate](/ssl/edge-certificates/universal-ssl/limitations/#full-setup).