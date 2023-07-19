---
_build:
  publishResources: false
  render: never
  list: never
---

Before deploying custom certificates to Cloudflare's global network, Cloudflare automatically groups the certificates into certificate packs.

A certificate pack is a group of certificates that share the same set of hostnames — for example, `example.com` and `*.example.com` — but use different signature algorithms.

Each pack can include up to three certificates, one from each of the following signature algorithms:

- `SHA-2/RSA`
- `SHA-2/ECDSA`
- `SHA-1/RSA`
