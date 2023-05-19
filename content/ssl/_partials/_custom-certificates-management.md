---
_build:
  publishResources: false
  render: never
  list: never
---

Unlike [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/), Cloudflare does not manage issuance and renewal for custom certificates.
When you use custom certificates, the following actions should be considered and accomplished by you.
- [Upload the certificate](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).
- [Update the certificate](/ssl/edge-certificates/custom-certificates/uploading/#update-a-custom-certificate).
- [Observe the certificate expiration date to avoid downtime](/ssl/edge-certificates/custom-certificates/renewing/).