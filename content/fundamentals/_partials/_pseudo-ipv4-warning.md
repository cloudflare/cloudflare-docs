---
_build:
  publishResources: false
  render: never
  list: never
---

If **Pseudo IPv4** is set to `Overwrite Headers` - Cloudflare overwrites the existing `Cf-Connecting-IP` and `X-Forwarded-For` headers with a pseudo IPv4 address while preserving the real IPv6 address in `CF-Connecting-IPv6` header.