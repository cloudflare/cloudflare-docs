---
pcx_content_type: navigation
title: DigiCert update
weight: 2
---

# DigiCert update

In the latter half of 2023, Cloudflare will begin deprecating DigiCert as a certificate authority available for a variety of certificates:

{{<directory-listing>}}

{{<Aside type="warning">}}

The advanced certificate renewals offboarding has been postponed and started gradually rolling out on October 26, 2023. This process is expected to be complete by the end of March 2024.

The SSL for SaaS renewals offboarding has been postponed and started gradually rolling out on November 1, 2023.

{{</Aside>}}

## Scope

This migration only affects [Universal](/ssl/edge-certificates/universal-ssl/), [Advanced](/ssl/edge-certificates/advanced-certificate-manager/) and [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/) certificates where the certificate has been provisioned by Cloudflare using DigiCert as certificate authority.

Also, this change will not impact existing certificates issued from DigiCert that Cloudflare is currently serving, but it will impact new certificate orders and renewals.

Consider each specific migration guide for actions you might have to take and refer to [CAs and certificates FAQ](/ssl/edge-certificates/troubleshooting/ca-faq/) for commonly asked questions about the Cloudflare offerings and CAs that are used.

{{<Aside type="warning" header="Not affected">}}

Cloudflare [Origin CA certificates](/ssl/origin-configuration/origin-ca/), Cloudflare [mTLS client certificates](/ssl/client-certificates/), and [custom certificates](/ssl/edge-certificates/custom-certificates/) **are not** in the scope and thus not affected by this migration.

{{</Aside>}}

## Dates reference

{{<table-wrap>}}

| SSL/TLS offering            | What will happen                                                                           | When       |
|------------------------------|--------------------------------------------------------------------------------------------|------------|
| Advanced certificate | New Cloudflare accounts will not have DigiCert as an option for advanced certificates.     | August 31, 2023 |
| Advanced certificate | Cloudflare will stop using DigiCert as a CA for new advanced certificate orders.           | October 5, 2023 |
| Advanced certificate | Cloudflare will gradually stop using DigiCert as the CA for advanced certificate renewals.           | October 26, 2023 |
| SSL for SaaS                 | New Cloudflare accounts will not have DigiCert as an option for SSL for SaaS certificates. | September 7, 2023 |
| SSL for SaaS                 | Cloudflare will stop using DigiCert as a CA for new SSL for SaaS certificate orders.       | October 18, 2023 |
| SSL for SaaS                 | Cloudflare will gradually stop using DigiCert as a CA for SSL for SaaS certificate renewals.       | November 1, 2023 |

{{</table-wrap>}}
