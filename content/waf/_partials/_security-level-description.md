---
_build:
  publishResources: false
  render: never
  list: never
---

{{<render file="_security-level-deprecation.md">}}

Cloudflare's Security Level (deprecated) uses the threat score to decide whether to present a [challenge](/waf/reference/cloudflare-challenges/) to the visitor. Once the visitor enters the correct challenge, they receive the appropriate website resources.