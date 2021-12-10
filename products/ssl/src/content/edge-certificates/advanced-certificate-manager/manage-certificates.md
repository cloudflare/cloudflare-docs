---
order: 0
pcx-content-type: how-to
---
import DCVDefinition from "../../_partials/_dcv-definition.md"
import CipherSuitesDefinition from "../../_partials/_cipher-suites-definition.md"

# Manage advanced certificates

## Create a certificate

### Using the dashboard

To create a new advanced certificate in the dashboard:

1. Log into your Cloudflare account and select a domain.
1. Navigate to **SSL/TLS** > **Edge Certificates**.
1. Click **Order Advanced Certificate**.
1. If Cloudflare does not have your billing information, you will need to enter that information.
1. Enter the following information:
    - Certificate Authority
    - Certificate Hostnames
    - Validation method
    - Certificate Validity Period
1. Click **Save**.

<Aside type='warning' header='Important'>

Selecting **Let’s Encrypt** as a CA limits a certificate to txt validation_method, 90 validity_days, omission of cloudflare_branding, and 2 host entries (one for the zone name and one for the subdomain wildcard of the zone name, such as `example.com`, `*.example.com`).

</Aside>

### Using the API

To create a new certificate, send a [POST request](https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack) to the Cloudflare API.

---

## Delete a certificate

### Using the dashboard

To delete an advanced certificate in the dashboard:

1. Log into your Cloudflare account and select a domain.
1. Select **SSL/TLS** > **Edge Certificates**.
1. Click a certificate.
1. Click **Delete Certificate**.

### Using the API

To delete a certificate, send a [DELETE request](https://api.cloudflare.com/#certificate-packs-delete-advanced-certificate-manager-certificate-pack) to the Cloudflare API.

---

## Restart validation

To restart validation for a certificate in a `validation_timed_out` status, send a [PATCH request](https://api.cloudflare.com/#certificate-packs-restart-validation-for-advanced-certificate-manager-certificate-pack) to the API.

---

## Restrict cipher suites

<CipherSuitesDefinition/>

For more details, refer to [Disable cipher suites](/ssl-tls/cipher-suites#disable-cipher-suites).

---

## Perform domain control validation (DCV)

<DCVDefinition/>

Normally, you only need to update DCV if you have your application on a partial setup (Cloudflare does not run your authoritative nameservers).

For more information about DCV, refer to [DCV methods](/edge-certificates/changing-dcv-method).

<Aside type="warning">

Due to recent changes, HTTP DCV validation will soon not be allowed for wildcard certificates or certificates with multiple Subject Alternative Names (SANs). For more details and next steps, refer to [Changes to HTTP DCV](/ssl-tls/dcv-update).

</Aside>