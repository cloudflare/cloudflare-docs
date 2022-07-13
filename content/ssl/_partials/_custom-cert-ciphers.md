---
_build:
  publishResources: false
  render: never
  list: never
---

Custom certificates uploaded to Cloudflare will be automatically grouped together into a Certificate Pack before being deployed to the global edge.

A Certificate Pack is a group of certificates that share the same set of hostnames — for example, `example.com` and `*.example.com` — but use different signature algorithms. Each pack can include up to three certificates, with one from each of the following signature algorithms: `SHA-2/RSA`, `SHA-2/ECDSA`, and `SHA-1/RSA`.