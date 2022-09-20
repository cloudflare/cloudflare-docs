---
_build:
  publishResources: false
  render: never
  list: never
---

Once you update your DNS records, you can either [wait for the next retry](/ssl/reference/validation-backoff-schedule/) or request an immediate recheck.

To request an immediate recheck, send another [PATCH request](https://api.cloudflare.com/#ssl-verification-edit-ssl-certificate-pack-validation-method) with the same `validation_method` as your current validation method.
