---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1;;param2
---

When you create a tunnel, Cloudflare generates a subdomain of `cfargotunnel.com` with the UUID of the created tunnel. You can treat `<UUID>.cfargotunnel.com` as if it were $1 in the Cloudflare dashboard.

Unlike publicly routable IP addresses, the subdomain will only proxy traffic for $2 in the same Cloudflare account. If someone discovers your subdomain UUID, they will not be able to create a DNS record in another account or system to proxy traffic to the address.