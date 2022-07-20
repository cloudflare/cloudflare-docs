---
pcx-content-type: reference
title: Advanced certificates
hidden: true
weight: 2
meta:
    title: Advanced certificates - DigiCert migration guide
---

# Advanced certificates

## Certificate issuance and renewal

Our changes will not affect existing Advanced certificates that Cloudflare is actively serving, but will impact new certificate orders and renewals:

- **New certificate orders**: After **October 3, 2022**, you will not be able to choose DigiCert as a Certificate Authority for Advanced certificates. This means that DigiCert will no longer be an option [in the dashboard](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#using-the-dashboard) and any [API calls](https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack) that are made using `“digicert”` as the CA will fail.
- **Certificate renewals**: After **October 10, 2022**, Cloudflare will choose an issuing CA on your behalf (Let's Encrypt or Google Trust Services) for certificate renewals.

## Domain control validation (DCV)

Email DCV will be deprecated as an option for new certificate orders on **October 3rd, 2022** and for renewals on **October 10th, 2022**.

Also, the maximum validity period for certificates will be decreased from 1 year to 90 days. This means that certificates will be renewed - and require DCV - more frequently.

If your domain is on a [Full setup](/dns/zone-setups/full-setup/), you do not need to make any updates for [Domain Control Validation (DCV)](/ssl/edge-certificates/changing-dcv-method/). Cloudflare will automatically complete [TXT-based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) on your behalf.

## Required actions

If you are currently pinning your Advanced certificate, stop pinning the certificate.

If your system integrates with the [Advanced certificates API](https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack), update your system to use Google Trust Services (`"google"`) or Let's Encrypt (`"lets_encrypt"`) as the issuing CA.

If you want to choose the issuing CA for certificate renewals, first set up [notifications](/fundamentals/notifications/notification-available/#ssltls) for Advanced certificate events. Then, when the certificate is up for renewal, send a `PATCH` request to the Cloudflare API that changes the `"certificate_authority"` field to use `"lets_encrypt"` or `"google"`.

```bash
---
header: Request
---
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/<<ZONE_ID>>/ssl/certificate_packs/<<PACK_ID>>" \
     -H "X-Auth-Email: <<EMAIL>>" \
     -H "X-Auth-Key: <<AUTH_KEY>>" \
     -H "Content-Type: application/json"
     --data '{
        "certificate_authority":"google"
        }'
```

### Zones on a partial setup

If your domain is on a [Partial setup](/dns/zone-setups/partial-setup/), you will need to place one DCV token at your DNS provider for **every hostname** on your certificate. This means that multi-hostname certificates will need as many DCV tokens as specified hostnames and that a certificate covering a wildcard and the zone apex (`example.com`, `*.example.com`) would need two DCV tokens added to your DNS provider. These tokens will be returned in the API response or in the dashboard.

<details>
<summary>Multi-hostname certificate</summary>
<div>

**Eligible certificates**

To find out which certificates are up for renewal, set up [notifications](/fundamentals/notifications/notification-available/#ssltls) for Advanced certificate events.

**Fetch DCV tokens**

{{<render file="_generic-view-validation-status.md">}}

If you use the **API**, each hostname specified on your certificate will have its own object within the `validation_records` array in the response.

```json
...
"validity_days": 90,
"validation_method": "txt",
"validation_records": [
    {
        "status": "pending",
        "txt_name": "_acme-challenge.example.com",
        "txt_value": "<<VALIDATION_VALUE>>"
    },
    {
        "status": "pending",
        "txt_name": "_acme-challenge.www.example.com",
        "txt_value": "<<VALIDATION_VALUE>>"
    },
    {
        "status": "pending",
        "txt_name": "_acme-challenge.test.example.com",
        "txt_value": "<<VALIDATION_VALUE>>"
    }
  ],
"certificate_authority": "google"
...
```

**Add to external DNS provider**

{{<render file="_digicert-migration-dns-provider.md">}}

\
**Confirm certificate validation**

{{<render file="_dcv-validate-patch.md">}}

{{<render file="_acm-validate-cert.md">}}

</div>
</details>

<details>
<summary>Wildcard hostname certificate</summary>
<div>

**Eligible certificates**

To find out which certificates are up for renewal, set up [notifications](/fundamentals/notifications/notification-available/#ssltls) for Advanced certificate events.

**Fetch DCV tokens**

{{<render file="_generic-view-validation-status.md">}}

If you use the **API**, each hostname specified on your certificate will have its own object within the `validation_records` array in the response.

```json
...
"validity_days": 90,
"validation_method": "txt",
"validation_records": [
    {
        "status": "pending",
        "txt_name": "_acme-challenge.example.com",
        "txt_value": "<<VALIDATION_VALUE>>"
    },
    {
        "status": "pending",
        "txt_name": "_acme-challenge.example.com",
        "txt_value": "<<VALIDATION_VALUE>>"
    }
  ],
"certificate_authority": "lets_encrypt"
...
```

**Add to external DNS provider**

{{<render file="_digicert-migration-dns-provider.md">}}

\
**Confirm certificate validation**

{{<render file="_dcv-validate-patch.md">}}

{{<render file="_acm-validate-cert.md">}}

</div>
</details>

If you were previously using Email DCV, you will need to test and integrate with [TXT](/ssl/edge-certificates/changing-dcv-method/methods/txt/) or [HTTP](/ssl/edge-certificates/changing-dcv-method/methods/http/) DCV.

---
