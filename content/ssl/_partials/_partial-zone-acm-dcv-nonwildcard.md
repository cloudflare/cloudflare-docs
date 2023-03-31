---
_build:
  publishResources: false
  render: never
  list: never
---

If every hostname on a non-wildcard certificate is [proxying traffic](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare, Cloudflare can automatically complete DCV on your behalf.

This applies to customers using [Universal](/ssl/edge-certificates/universal-ssl/) or [Advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

If one of the hostnames on the certificate is not proxying traffic through Cloudflare, certificate issuance and renewal will vary based on the type of certificate you are using:

- **Universal**: Perform DCV using one of the available [methods](/ssl/edge-certificates/changing-dcv-method/methods/).
- **Advanced**: In most cases, you can opt for [Delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/), which greatly simplifies certificate management.