---
_build:
  publishResources: false
  render: never
  list: never
---

To check whether your certificates have been validated and reissued:

- **Dashboard**: Find the certificate(s) **SSL/TLS** > **Edge Certificates** and make sure that the **Status** is **Active**.
- **API**: Send a [`GET`](/api/operations/certificate-packs-list-certificate-packs) request and confirm that your certificate(s) have `"status": "active"`.