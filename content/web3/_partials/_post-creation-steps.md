---
_build:
  publishResources: false
  render: never
  list: never
---

When you create a gateway, Cloudflare automatically:
- Creates and adds [records to your Cloudflare DNS](/web3/reference/gateway-dns-records/) so your gateway can receive and route traffic appropriately.
- [Proxies](/dns/manage-dns-records/reference/proxied-dns-records/) traffic to that hostname.
- Issues an SSL/TLS certificate to cover the specified hostname.