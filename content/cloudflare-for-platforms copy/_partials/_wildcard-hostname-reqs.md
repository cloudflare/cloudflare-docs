---
_build:
  publishResources: false
  render: never
  list: never
---

To validate a certificate on a wildcard custom hostname, you should either set up [Delegated DCV](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/) or [TXT-based DCV](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/).

Cloudflare recommends Delegated DCV as it is much simpler for you and your customers.

If you choose TXT-based DCV, Cloudflare requires two TXT DCV tokens - one for the apex and one for the wildcard - to be placed at your customer’s authoritative DNS provider in order for the wildcard certificate to issue or renew. 

These two tokens are required because Let’s Encrypt and Google Trust Services follow the [ACME Protocol](https://datatracker.ietf.org/doc/html/rfc8555), which requires one DCV token to be placed for every hostname on the certificate.