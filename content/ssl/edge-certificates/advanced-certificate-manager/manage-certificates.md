---
pcx-content-type: how-to
title: Manage advanced certificates
weight: 1
---

# Manage advanced certificates

## Create a certificate

If you are using an existing [Universal SSL certificate](/ssl/edge-certificates/universal-ssl/), Cloudflare will automatically replace this certificate once you finish ordering your advanced certificate.

Once you order a certificate, you can review the [certificate's status](/ssl/ssl-tls/certificate-statuses/) in the dashboard at **SSL/TLS** > **Edge Certificates** or via the API with a [GET request](https://api.cloudflare.com/#certificate-packs-list-certificate-packs).

### Using the dashboard

To create a new advanced certificate in the dashboard:

1.  Log in to your Cloudflare account and select a domain.
2.  Navigate to **SSL/TLS** > **Edge Certificates**.
3.  Click **Order Advanced Certificate**.
4.  If Cloudflare does not have your billing information, you will need to enter that information.
5.  Enter the following information:
    - Certificate Authority
    - Certificate Hostnames
    - Validation method
    - Certificate Validity Period
6.  Click **Save**.

{{<Aside type="warning" header="Important">}}

{{<render file="_lets-encrypt-advanced-limitations.md">}}

{{</Aside>}}

### Using the API

To create a new certificate, send a [POST request](https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack) to the Cloudflare API.

---

## Delete a certificate

### Using the dashboard

To delete an advanced certificate in the dashboard:

1.  Log in to your Cloudflare account and select a domain.
2.  Select **SSL/TLS** > **Edge Certificates**.
3.  Click a certificate.
4.  Click **Delete Certificate**.

### Using the API

To delete a certificate, send a [DELETE request](https://api.cloudflare.com/#certificate-packs-delete-advanced-certificate-manager-certificate-pack) to the Cloudflare API.

---

## Restart validation

To restart validation for a certificate in a `validation_timed_out` status, send a [PATCH request](https://api.cloudflare.com/#certificate-packs-restart-validation-for-advanced-certificate-manager-certificate-pack) to the API.

---

## Restrict cipher suites

{{<render file="_cipher-suites-definition.md">}}

For more details, refer to [Disable cipher suites](/ssl/ssl-tls/cipher-suites/#disable-cipher-suites).

---

## Perform domain control validation (DCV)

{{<render file="_dcv-definition.md">}}

Normally, you only need to update DCV if you have your application on a partial setup (Cloudflare does not run your authoritative nameservers).

For more information about DCV, refer to [DCV methods](/ssl/edge-certificates/changing-dcv-method/).

{{<Aside type="warning">}}

Due to recent changes, HTTP DCV validation will soon not be allowed for wildcard certificates or certificates with multiple Subject Alternative Names (SANs). For more details and next steps, refer to [Changes to HTTP DCV](/ssl/ssl-tls/dcv-update/).

{{</Aside>}}
