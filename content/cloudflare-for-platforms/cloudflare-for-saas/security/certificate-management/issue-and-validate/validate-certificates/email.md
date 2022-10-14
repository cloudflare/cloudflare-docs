---
pcx_content_type: reference
title: Email
weight: 4
meta:
    title: Email domain control validation (DCV)
---

# Email domain control validation (DCV)

{{<render file="../../ssl/_partials/_email-validation-definition.md">}}
<br>

{{<Aside type="warning">}}

With the [upcoming change](/ssl/reference/migration-guides/digicert-update/custom-hostname-certificates/) to certificates issued by DigiCert, email DCV will soon be unsupported.

{{</Aside>}}
 
{{<render file="_ssl-for-saas-create-hostname.md">}}
<br>
 
- [**API**](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details): Within the `ssl` object, refer to the values present in the `validation_records` array (specifically `emails`).
- **Dashboard**: When viewing an individual certificate at **SSL/TLS** > **Custom Hostnames**, refer to the value for **Certificate validation email recipients**.
 
{{<render file="../../ssl/_partials/_email-validation-process.md">}}
 
{{<render file="_ssl-for-saas-validate-patch.md">}}