---
pcx_content_type: reference
title: Advanced certificates
weight: 2
layout: list
meta:
    title: Advanced certificates - DigiCert migration guide
---

# Advanced certificates

On **October 3, 2022**, Cloudflare will stop using DigiCert as an issuing certificate authority (CA) for new [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/). This will not affect existing custom hostname certificates.

On **November 7, 2022**, Cloudflare will stop using DigiCert as the CA for advanced certificate renewals. This will not affect existing advanced certificates, only their renewals.

## Summary of changes

This table provides a summary of the differences between DigiCert and our other CAs.

{{<table-wrap>}}
| Area | DigiCert | Other CAs | Actions required |
| --- | --- | --- | --- |
| Domain Control <br/> Validation (DCV) | If a certificate has multiple hostnames in the Subject Alternative Name (SAN), one DCV record is required to complete validation. | If a certificate has multiple hostnames in the SAN, one DCV token is required for every hostname on the certificate (5 hostnames in the SAN would require 5 DCV tokens).<br/><br/> This will also require 2 DCV tokens to validate a certificate that covers an apex and wildcard (`example.com`, `*.example.com`). | **Full zones**: As long as Cloudflare remains the Authoritative DNS provider, no action is required since Cloudflare can complete [TXT based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) for certificate issuances and renewals.<br/><br/> **Partial zones**: Cloudflare will complete [HTTP DCV](/ssl/edge-certificates/changing-dcv-method/methods/http/) for non-wildcard hostnames, as long as they are proxying traffic through Cloudflare. You will be required to complete [TXT DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) for Advanced certificates with wildcard hostnames by placing the TXT DCV token at your Authoritative DNS provider.  |
| API | Customers can choose `“digicert”` as the issuing CA when using the [API](https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack). | Customers can only choose `“lets_encrypt”` or `“google”` when using the [API](https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack). | If you are currently using DigiCert as the issuing CA when creating advanced certificates, switch your integration to use Let’s Encrypt or Google. |
| DCV Methods | Email DCV is available. | Email DCV will be deprecated. Customers will be required to use [HTTP](/ssl/edge-certificates/changing-dcv-method/methods/http/) or [DNS](/ssl/edge-certificates/changing-dcv-method/methods/txt/) DCV. | If an existing certificate is relying on Email DCV then when the certificate comes up for renewal, Cloudflare will attempt to complete [HTTP validation](/ssl/edge-certificates/changing-dcv-method/methods/txt/). If HTTP validation is not possible, then Cloudflare will use [TXT DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) and return the associated tokens.  |
| Validity period | Advanced certificates can be valid for 14, 30, 90, or 365 days. | Advanced certificates can be valid for 14, 30, or 90 days. | No action required. Certificates will be renewed more frequently. Certificates using 14 or 30 day validity periods will be required to use Google Trust Services on renewal. Let’s Encrypt only supports certificates with 90 day validity periods. |
{{</table-wrap>}}