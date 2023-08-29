---
pcx_content_type: reference
title: Advanced certificates
weight: 2
layout: list
meta:
    title: Advanced certificates - DigiCert migration guide
---

# Advanced certificates

Starting on **August 30, 2023**, new Cloudflare accounts will not have the option to choose DigiCert as a certificate authority (CA) for [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

On **October 4, 2023**, Cloudflare will stop using DigiCert as a CA for new advanced certificates. This will not affect existing advanced certificates.

On **October 11, 2023**, Cloudflare will stop using DigiCert as the CA for advanced certificate renewals. This will not affect existing advanced certificates, only their renewals.

## Summary of changes

This table provides a summary of the differences between DigiCert and Cloudflare's other CAs.

{{<table-wrap>}}
| Area | DigiCert | Other CAs | Actions required |
| --- | --- | --- | --- |
| Domain Control <br/> Validation (DCV) | If a certificate has multiple hostnames in the Subject Alternative Name (SAN), one DCV record is required to complete validation. | If a certificate has multiple hostnames in the SAN, one DCV token is required for every hostname on the certificate (five hostnames in the SAN would require five DCV tokens).<br/><br/> This will also require two DCV tokens to validate a certificate that covers an apex and wildcard (`example.com`, `*.example.com`). | **Full zones**: As long as Cloudflare remains the Authoritative DNS provider, no action is required since Cloudflare can complete [TXT based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) for certificate issuances and renewals.<br/><br/> **Partial zones**: Cloudflare will complete [HTTP DCV](/ssl/edge-certificates/changing-dcv-method/methods/http/) for non-wildcard hostnames, as long as they are proxying traffic through Cloudflare.<br/><br/>For advanced certificates with wildcard hostnames, you should consider [Delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/). If that does not work, you will be required to complete [TXT DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) for Advanced certificates with wildcard hostnames by placing the TXT DCV token at your Authoritative DNS provider.  |
| API | Customers can choose `“digicert”` as the issuing CA when using the [API](/api/operations/certificate-packs-order-advanced-certificate-manager-certificate-pack). | Customers can only choose `“lets_encrypt”` or `“google”` when using the [API](/api/operations/certificate-packs-order-advanced-certificate-manager-certificate-pack). | If you are currently using DigiCert as the issuing CA when creating advanced certificates, switch your integration to use Let’s Encrypt or Google. |
| DCV Methods | Email DCV is available. | Email DCV will be deprecated. Customers will be required to use [HTTP](/ssl/edge-certificates/changing-dcv-method/methods/http/) or [DNS](/ssl/edge-certificates/changing-dcv-method/methods/txt/) DCV. | If an existing certificate is relying on Email DCV then when the certificate comes up for renewal, Cloudflare will attempt to complete [HTTP validation](/ssl/edge-certificates/changing-dcv-method/methods/txt/). If HTTP validation is not possible, then Cloudflare will use [TXT DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) and return the associated tokens.  |
| Validity period | Advanced certificates can be valid for 14, 30, 90, or 365 days. | Advanced certificates can be valid for 14, 30, or 90 days. | No action required. Certificates will be renewed more frequently. Certificates using 14 or 30 day validity periods will be required to use Google Trust Services on renewal. Let’s Encrypt only supports certificates with 90 day validity periods. |
{{</table-wrap>}}

## Required actions

### Before October 4, 2023

If your system integrates with the Cloudflare API to [order advanced certificates](/api/operations/certificate-packs-order-advanced-certificate-manager-certificate-pack), you will need to update the following fields:

- The `"certificate_authority"` field should either use Google Trust Services (`"google"`) or Let's Encrypt (`"lets_encrypt"`).
- The `"validation_method"` field should either use [`"http"`](/ssl/edge-certificates/changing-dcv-method/methods/http/) (only available for [non-wildcard hostnames](/ssl/reference/migration-guides/dcv-update/)) or [`"txt"`](/ssl/edge-certificates/changing-dcv-method/methods/txt/).
- The `"validity_days"` field should either use `14`, `30`, or `90` (14 or 30 day certificates will use Google Trust Services as the issuing CA).

### Changes after October 11, 2023

The following changes will automatically affect certificates that are renewed after October 11, 2023. The renewed certificate will have a different certificate pack ID than the DigiCert certificate. 

#### Certificate authorities

DigiCert certificates renewed after October 11, 2023 will be issued through a Certificate Authority chosen by Cloudflare (Let's Encrypt or Google Trust Services).

{{<Aside type="note">}}

Certificates with 14 and 30 day validity periods will be renewed with Google Trust Services. 90 day certificates will either use Let’s Encrypt or Google Trust Services. 

{{</Aside>}}

#### Validity period

If the current DigiCert certificate has a 365 day validity period, that value will change to 90 in the `“validity_days”` field when the certificate is renewed.

#### DCV method

If the DigiCert certificate had the `“validation_method”` set to `“email”`, then this value will change to either `“txt”` or `“http”` when the certificate is renewed.

Full zone certificate renewals will default to [TXT DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) and are automatically renewed by Cloudflare. This is because Cloudflare can place the TXT DCV tokens as the Authoritative DNS provider.

Partial zone certificate renewals will default to [HTTP DCV](/ssl/edge-certificates/changing-dcv-method/methods/http/), unless there is a wildcard hostname on the certificate. 

Certificates with wildcard hostnames will be required to complete [Delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/) or [TXT DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/).

#### DCV tokens

For multi-hostname or wildcard certificates using DigiCert, multiple DCV records will now be returned in the `“validation_records”` field.

This is because DigiCert only requires one DCV record to be placed to validate the apex, wildcard, and subdomains on a certificate. Let’s Encrypt and Google Trust Services follow the [ACME protocol](https://datatracker.ietf.org/doc/html/rfc8555) which requires that one DCV token is placed for every hostname on a certificate. 

If your certificate covers multiple hostnames, then on renewal you will see one DCV token associated with every hostname on the certificate. These tokens will be returned in the `“validation_records”` field. 

If your certificate includes a wildcard hostname, you will see a TXT DCV token returned for the wildcard hostname. Previously with DigiCert, only one TXT DCV token would have been required at the apex to complete validation for any subdomains or wildcard under the zone.

### Required actions

#### Certificate migration

If you want to take control of migrating your certificates and choose a particular CA - instead of having Cloudflare handle migrations as certificates come up for renewal and choose a CA on your behalf - you will need to:

1. Order [new certificates](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#create-a-certificate) (applying all the [required changes](#changes-after-october-11-2023) noted before).
2. Make sure your certificates are validated ([partial zones](#dcv---partial-zones) will require additional steps than previously).
3. [Delete](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#delete-a-certificate) all existing DigiCert certificates (once each has been replaced and the new certificate is active).

#### DCV - Full zones

For full zones[^1], the only required action is to confirm the your nameservers are still [pointing to Cloudflare](https://support.cloudflare.com/hc/articles/4426809598605).

{{<render file="_full-zone-acm-dcv.md">}}
<br/>

#### DCV - Partial zones

For partial zones[^2], the process depends on whether the certificate uses a wildcard hostname.

{{<render file="_partial-zone-acm-dcv-nonwildcard.md">}}

{{<render file="_partial-zone-acm-dcv-wildcard.md">}}

##### Fetch DCV tokens

To automatically fetch tokens for certificates that are coming up for renewal, set up [notifications](/fundamentals/notifications/notification-available/#ssltls) for **Advanced Certificate Alert** events. This notification will include the DCV tokens associated with new or renewed certificates.

Notifications can be sent to an email address or a webhook.

{{<render file="_txt-validation-preamble.md">}}

{{<tabs labels="API | Dashboard">}}
{{<tab label="api" no-code="true">}}

{{<render file="_txt-validation-api.md">}}

{{</tab>}}

{{<tab label="dashboard" no-code="true">}}

{{<render file="_txt-validation-dashboard.md">}}

{{</tab>}}
{{</tabs>}}

You will need to add all of the DCV records returned in the `validation_records` field to your Authoritative DNS provider.

Once you update your DNS records, you can either [wait for the next retry](/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/) or request an immediate recheck.

{{<render file="_dcv-validate-patch.md">}}

Once the certificate has been validated, the certificate status will change to **Active**. 

[^1]: Meaning that Cloudflare is your Authoritative DNS provider.
[^2]: Meaning that another DNS provider - not Cloudflare - maintains your Authoritative DNS.
