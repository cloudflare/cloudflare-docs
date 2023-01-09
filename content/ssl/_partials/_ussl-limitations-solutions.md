---
_build:
  publishResources: false
  render: never
  list: never
---

To prevent insecure connections on a multi-level subdomain, do one of the following:

- Enable [Total TLS](/ssl/edge-certificates/additional-options/total-tls/), which automatically issues new certificates to any proxied hostnames not covered by a Universal certificate.
- Order an [Advanced Certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) covering the subdomain.
- Upload a [Custom Certificate](/ssl/edge-certificates/custom-certificates/) covering the subdomain.

If none of these solutions work, you could also remove the multi-level subdomain.