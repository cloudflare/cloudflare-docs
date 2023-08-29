---
pcx_content_type: navigation
title: DigiCert update
weight: 2
---

# DigiCert update

In the latter half of 2023, Cloudflare will begin deprecating DigiCert as a Certificate Authority available for a variety of certificates:

{{<directory-listing>}}

This change will not impact existing certificates issued from DigiCert that Cloudflare is currently serving, but it will impact new certificate orders and renewals.

Refer to [CAs and certificates FAQ](/ssl/edge-certificates/troubleshooting/ca-faq/) for commonly asked questions that you may have.

## Dates reference

{{<table-wrap>}}

| SSL/TLS offering            | What will happen                                                                           | When       |
|------------------------------|--------------------------------------------------------------------------------------------|------------|
| Advanced certificate | New Cloudflare accounts will not have DigiCert as an option for advanced certificates.     | August 30, 2023 |
| Advanced certificate | Cloudflare will stop using DigiCert as a CA for new advanced certificate orders.           | October 4, 2023 |
| Advanced certificate | Cloudflare will stop using DigiCert as the CA for advanced certificate renewals.           | October 11, 2023 |
| SSL for SaaS                 | New Cloudflare accounts will not have DigiCert as an option for SSL for SaaS certificates. | Sept 6, 2023 |
| SSL for SaaS                 | Cloudflare will stop using DigiCert as a CA for new SSL for SaaS certificate orders.       | October 18, 2023 |
| SSL for SaaS                 | Cloudflare will stop using DigiCert as the CA for SSL for SaaS certificate renewals.       | October 25, 2023 |

{{</table-wrap>}}
