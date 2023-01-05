---
title: Custom certificates
pcx_content_type: concept
weight: 5
---

# Custom certificates

If your customers need to provide their own key material, you may want to [upload a custom certificate](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/uploading-certificates/). Cloudflare will automatically bundle the certificate with a certificate chain [optimized for maximum browser compatibility](/ssl/edge-certificates/custom-certificates/bundling-methodologies/#compatible).

As part of this process, you may also want to [generate a Certificate Signing Request (CSR)](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/certificate-signing-requests/) for your customer so they do not have to manage the private key on their own.

{{<render file="_ssl-for-saas-plan-limitation.md">}}

## Use cases

This situation commonly occurs when your customers use Extended Validation (EV) certificates (the “green bar”) or when their information security policy prohibits third parties from generating private keys on their behalf.

## Limitations

If you use custom certificates, you are responsible for the entire certificate lifecycle (initial upload, renewal, subsequent upload).

Cloudflare also only accepts publicly trusted certificates of these types:

*   `SHA256WithRSA`
*   `SHA1WithRSA`
*   `ECDSAWithSHA256`

If you attempt to upload another type of certificate or a certificate that has been self-signed, it will be rejected.
