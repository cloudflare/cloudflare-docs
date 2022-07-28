---
title: Validity periods
pcx-content-type: reference
weight: 2
meta:
  title: Certificate validity periods
---

# Certificate validity periods

When you order an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/), you can select the following values for the **Certificate validity period**:

- **1 year** (soon to be [deprecated](/ssl/ssl-tls/migration-guides/digicert-update/))
- **3 months**
- **1 month**
- **2 weeks**

{{<Aside type="note">}}

For more details on the `validity_days` parameter used in API calls, refer to [Order Advanced Certificate Pack](https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack).

{{</Aside>}}

## Benefits of shorter validity periods

Cloudflare only issues certificates with validity periods of 3 months or less for two reasons.

First, shorter-lived certificates limit the damage from key compromise and mistaken issuance. Any compromised key material will be valid for a shorter period of time.

Second, shorter certificates encourage automation. The more frequently you have to do a task, the more likely you will want to automate it. Automation also means that you are less likely to let a certificate expire in production or give a person access to key material.

For more details on the benefits of shorter validity periods, refer to our [blog post introducing Advanced Certificate Manager](https://blog.cloudflare.com/advanced-certificate-manager/).