---
pcx-content-type: reference
title: Digicert update
weight: 2
---

# Digicert update

On October 3rd, 2022, Cloudflare will deprecate DigiCert as a Certificate Authority available for a variety of certificates ([Universal Certificates](/ssl/edge-certificates/universal-ssl/), [Advanced Certificates](/ssl/edge-certificates/advanced-certificate-manager/), and [Cloudflare for SaaS Certificates](/cloudflare-for-saas/ssl/common-tasks/issuing-certificates/)).

This change will not impact existing certificates issued from Digicert that Cloudflare is currently serving, but it will impact new certificate orders and renewals.

## Universal certificates

### Upcoming changes

Cloudflare will stop using Digicert as an issuing certificate authority (CA) for new Universal certificates and instead use one of our other CAs. This will not affect existing Universal certificates.

This process will begin for Enterprise zones on **October 10, 2022**.

The maximum validity period for Universal certificates will also be decreased from 1 year to 90 days.

#### DCV changes

If your domain is on a [Full setup](/dns/zone-setups/full-setup/), you do not need to make any updates for [Domain Control Validation (DCV)](/ssl/edge-certificates/changing-dcv-method/). Cloudflare will automatically complete [TXT-based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) on your behalf.

If your domain is on a [Partial setup](/dns/zone-setups/partial-setup/), you also do not need to make any updates for [Domain Control Validation (DCV)](/ssl/edge-certificates/changing-dcv-method/). Cloudflare will automatically complete [HTTP-based DCV](/ssl/edge-certificates/changing-dcv-method/methods/http/) on your behalf.

### Required actions

If you are currently pinning your Universal certificate, stop pinning the certificate.

If you want to choose the issuing CA for your certificate, [order an Advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/).

---

## Advanced certificates

### Certificate issuance and renewal

Our changes will not affect existing Advanced certificates that Cloudflare is actively serving, but will impact new certificate orders and renewals:

- **New certificate orders**: After **October 3, 2022**, you will not be able to choose DigiCert as a Certificate Authority for Advanced certificates. This means that DigiCert will no longer be an option [in the dashboard](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#using-the-dashboard) and any [API calls](https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack) that are made using `“digicert”` as the CA will fail.
- **Certificate renewals**: After **October 10, 2022**, Cloudflare will choose an issuing CA on your behalf (Let's Encrypt or Google Trust Services) for certificate renewals.

### Domain control validation (DCV)

Email DCV will be deprecated as an option for new certificate orders on **October 3rd, 2022** and for renewals on **October 10th, 2022**.

Also, the maximum validity period for certificates will be decreased from 1 year to 90 days. This means that certificates will be renewed - and require DCV - more frequently.

If your domain is on a [Full setup](/dns/zone-setups/full-setup/), you do not need to make any updates for [Domain Control Validation (DCV)](/ssl/edge-certificates/changing-dcv-method/). Cloudflare will automatically complete [TXT-based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) on your behalf.

### Required actions

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

#### Zones on a partial setup

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

## SSL for SaaS certificates

### Certificate issuance and renewal

Our changes will not affect existing SSL for SaaS certificates that Cloudflare is actively serving, but will impact new certificate orders and renewals:

- **New certificate orders**: After October 3, 2022, you will not be able to choose DigiCert as a Certificate Authority for SSL for SaaS certificates. This means that DigiCert will no longer be an option [in the dashboard](/cloudflare-for-saas/ssl/common-tasks/issuing-certificates/#via-the-dashboard) and any [API calls](/cloudflare-for-saas/ssl/common-tasks/issuing-certificates/#via-the-api) that are made using `“digicert”` as the CA will fail.
- **Certificate renewals**: After October 10, 2022, Cloudflare will choose an issuing CA on your behalf (Let's Encrypt or Google Trust Services) for certificate renewals.

### Domain Control Validation (DCV)

CNAME DCV will also be deprecated, requiring customers to use either [HTTP](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#http) or [TXT](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#txt) DCV.

Also, the maximum validity period for certificates will be decreased from 1 year to 90 days. This means that certificates will be renewed - and require DCV - more frequently.

### Required changes

If your system integrates with the [SSL for SaaS API](https://api.cloudflare.com/#custom-hostname-for-a-zone-properties), update your system to use Google Trust Services (`"google"`) or Let's Encrypt (`"lets_encrypt"`) as the value for `"certificate_authority"`.

If you want to choose the issuing CA for certificate renewals, send a [`PATCH`](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) request that changes the `"certificate_authority"` field to use `"lets_encrypt"` or `"google"`.

#### Non-wildcard hostnames

For non-wildcard hostnames, you do not need to make any updates for DCV. Cloudflare will complete DCV by serving the [HTTP token](/cloudflare-for-saas/ssl/common-tasks/certificate-validation-methods/#http-automatic), so long as the custom hostname is actively proxying through Cloudflare.

#### Wildcard hostnames

To validate wildcard hostname, Cloudflare will now require two [TXT DCV tokens](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#txt) - one for the apex and one for the wildcard - to be placed at your customer’s authoritative DNS provider in order for the wildcard certificate to issue or renew. This is because - in contrast to DigiCert - Let’s Encrypt and Google Trust Services follow the [ACME Protocol](https://datatracker.ietf.org/doc/html/rfc8555), which requires one DCV token to be placed for every hostname on the certificate.

These tokens can be fetched through the [GET custom hostnames endpoint](https://api.cloudflare.com/#custom-hostname-for-a-zone-list-custom-hostnames) when the certificates are in a “pending validation” state during custom hostname creation or during certificate renewals. You can also fetch them through the dashboard.

As the SaaS provider, you will be responsible for sharing these DCV tokens with your customers. Let’s Encrypt DCV tokens are valid for 7 days and Google Trust Services tokens are valid for 14 days. We recommend that you make this clear to your customers, so that they add the tokens in a timely manner. If your customers take longer than the token validity period to add the record then you will need to fetch updated tokens and share those in order for the certificate to validate and issue.