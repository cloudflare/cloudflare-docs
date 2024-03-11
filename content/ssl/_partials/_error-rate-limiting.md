---
_build:
  publishResources: false
  render: never
  list: never
---

As mentioned in [Certificate authorities](/ssl/reference/certificate-authorities/), specific CAs may have their own limitations. If you use Let’s Encrypt and receive the error below, it means you hit the [duplicate certificate limit](https://letsencrypt.org/docs/duplicate-certificate-limit/) imposed by Let's Encrypt.

`The authority has rate limited these domains. Please wait for the rate limit to expire or try another authority.`

A certificate is considered a duplicate of an earlier certificate if it contains the exact same set of hostnames.

In this case, you can either wait for the rate limit window to end or choose a different certificate authority.