---
title: Validity periods
pcx_content_type: reference
weight: 8
meta:
  title: Certificate validity periods
  description: Review information about available validity periods for your Cloudflare Advanced Certificates.
---

# Certificate validity periods

## Universal SSL

{{<render file="_universal-ssl-validity.md">}}

## Advanced certificates

When you order an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/), you can select the following values for the **Certificate validity period**:

| Certificate validity period | Auto renewal period | Notes |
| --- | --- | --- |
| 1 year | 30 days | Soon to be [deprecated](/ssl/reference/migration-guides/digicert-update/) |
| 3 months | 30 days |
| 1 month | 7 days |
| 2 weeks | 3 days |

{{<Aside type="note">}}

For more details on the `validity_days` parameter used in API calls, refer to [Order Advanced Certificate Pack](/api/operations/certificate-packs-order-advanced-certificate-manager-certificate-pack).

{{</Aside>}}

## Benefits of shorter validity periods

Cloudflare only issues certificates with validity periods of three months or less for two reasons.

First, shorter-lived certificates limit the damage from key compromise and mistaken issuance. Any compromised key material will be valid for a shorter period of time.

Second, shorter certificates encourage automation. The more frequently you have to do a task, the more likely you will want to automate it. Automation also means that you are less likely to let a certificate expire in production or give a person access to key material.

For more details on the benefits of shorter validity periods, refer to our [blog post introducing Advanced Certificate Manager](https://blog.cloudflare.com/advanced-certificate-manager/).