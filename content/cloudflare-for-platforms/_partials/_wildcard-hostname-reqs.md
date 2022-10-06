---
_build:
  publishResources: false
  render: never
  list: never
---

To validate a certificate on a wildcard custom hostname, Cloudflare requires [TXT DCV tokens](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/) - one for the apex and one for the wildcard - to be placed at your customer’s authoritative DNS provider in order for the wildcard certificate to issue or renew. 