---
_build:
  publishResources: false
  render: never
  list: never
---

Before your key servers can be configured, you must next upload the corresponding SSL certificates to Cloudflare’s edge. During TLS termination, Cloudflare will present these certificates to connecting browsers and then (for non-resumed sessions) communicate with the specified key server to complete the handshake.

Upload certificates to Cloudflare with only SANs that you wish to use with Cloudflare Keyless SSL. All Keyless SSL hostnames must be [proxied](/dns/manage-dns-records/reference/proxied-dns-records/).

You will have to upload each certificate used with Keyless SSL.