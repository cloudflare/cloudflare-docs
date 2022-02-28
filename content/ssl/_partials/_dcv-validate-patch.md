---
_build:
  publishResources: false
  render: never
  list: never
---

If you would like to request an immediate recheck, [rather than wait for the next retry](/ssl/ssl-tls/validation-backoff-schedule/), send another [PATCH request](https://api.cloudflare.com/#ssl-verification-edit-ssl-certificate-pack-validation-method) with the same values as your initial `PATCH` request.
