---
pcx_content_type: reference
title: TXT
weight: 1
meta:
    title: TXT domain control validation (DCV)
---

# TXT domain control validation (DCV)

{{<render file="../../ssl/_partials/_txt-validation-definition.md">}}
<br>
 
{{<render file="_ssl-for-saas-create-hostname.md">}}
<br>
 
- [**API**](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details): Within the `ssl` object, refer to the values present in the `validation_records` array (specifically `txt_name` and `txt_value`).
- **Dashboard**: When viewing an individual certificate at **SSL/TLS** > **Custom Hostnames**, refer to the values for **Certificate validation TXT name** and **Certificate validation TXT value**.
 
Ask your customer to create a TXT record named the **name** and containing the **value** at their authoritative DNS provider. Once this TXT record is in place, validation and certificate issuance will automatically complete.
 
{{<render file="_ssl-for-saas-validate-patch.md">}}