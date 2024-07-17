---
_build:
  publishResources: false
  render: never
  list: never
---

A partial (`CNAME`) setup allows you to use [Cloudflare's reverse proxy](/fundamentals/concepts/how-cloudflare-works/) while maintaining your primary and authoritative DNS provider.

Use this option to {{<glossary-tooltip term_id="proxy status">}}proxy{{</glossary-tooltip>}} only individual subdomains through Cloudflare's global network when you cannot change your authoritative DNS provider.
