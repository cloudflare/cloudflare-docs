---
_build:
  publishResources: false
  render: never
  list: never
---

- Going to **SSL/TLS** > **Edge Certificates** in the dashboard and clicking a certificate.
- Getting certificate details by making a [GET request](https://api.cloudflare.com/#certificate-packs-get-certificate-pack) with `status=pending_validation` in the request parameter and finding the `validation_method` and `validation_records`.