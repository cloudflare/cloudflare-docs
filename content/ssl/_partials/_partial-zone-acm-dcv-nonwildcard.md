---
_build:
  publishResources: false
  render: never
  list: never
---

Non-wildcard hostname certificates will automatically renew as long as every hostname on the certificate is proxying traffic through Cloudflare.

However, if one or more of the hostnames on the certificate is not proxying through Cloudflare, the certificate will not issue and you will be required to complete DCV for each hostname not proxied - which will require manually updating the DCV token or proxying the hostname - in order for the certificate to renew.