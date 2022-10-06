---
pcx_content_type: reference
title: CNAME
weight: 3
meta:
    title: CNAME domain control validation (DCV)
---

# CNAME domain control validation (DCV)

{{<render file="../../ssl/_partials/_dcv-cname-definition.md">}}
<br>

{{<Aside type="note">}}

With the [upcoming change](/ssl/ssl-tls/migration-guides/digicert-update/custom-hostname-certificates/) to certificates issued by DigiCert, CNAME DCV will soon be unsupported.

{{</Aside>}}
 
Since this method is only available using the API, you need to make a [POST request](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname) and set a `"method":"cname"` parameter.
 
Within the `ssl` object in the response, refer to the values present in the `validation_records` array. Each record will contain a property for `cname` and `cname_target` (you can also access these values in the dashboard by clicking that specific hostname certificate). Provide these values to your customer so they can add a CNAME record at their authoritative DNS provider.
 
{{<render file="_ssl-for-saas-validate-patch.md">}}