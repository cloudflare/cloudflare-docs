---
_build:
  publishResources: false
  render: never
  list: never
---

- Going to **SSL/TLS** > **Edge Certificates** in the dashboard and selecting a certificate.
- Getting certificate details by making a [`GET` request](/api/operations/certificate-packs-get-certificate-pack) with `status=pending_validation` in the request parameter and finding the `validation_method` and `validation_records`.