---
pcx_content_type: how-to
title: Set up authenticated origin pulls
weight: 2
---

# Set up authenticated origin pulls

Set up authenticated origin pulls via one of the following options:

- [Zone-Level Authenticated Origin Pull using **Cloudflare** certificate](#zone-level--cloudflare-certificate)
- [Zone-Level Authenticated Origin Pull using **customer** certificates](#zone-level--customer-certificates)
- [Per-Hostname Authenticated Origin Pull using customer certificates](#per-hostname--customer-certificates)

Authenticated Origin Pull does not work when your [**SSL/TLS encryption mode**](/ssl/origin-configuration/ssl-modes/) is set to **Off** or **Flexible**.

---

## Zone-Level — Cloudflare certificate

### Certificate value

Cloudflare uses a specific CA to sign certificates for the Authenticated Origin Pull service.

If you need the value for that CA, [download the .PEM file](/ssl/static/authenticated_origin_pull_ca.pem).

### Setup instructions

To enable Authenticated Origin Pull globally on a zone:

1.  Install the above certificate at the origin web server to authenticate all connections.

2.  For your **SSL/TLS encryption mode**, select **Full**.

3.  Configure your [origin web server](#server-installation-instructions) to accept client certificates:

    <details>
    <summary>Apache example</summary>
    <div>

    For this example, you would have saved the [certificate](#certificate-value) `/path/to/origin-pull-ca.pem`.

    ```txt
    SSLVerifyClient require
    SSLVerifyDepth 1
    SSLCACertificateFile /path/to/origin-pull-ca.pem
    ```

     </div>
    </details>

    <details>
    <summary>NGINX example</summary>
    <div>

    For this example, you would have saved the [certificate](#certificate-value) to `/etc/nginx/certs/cloudflare.crt`.

    ```txt
    ssl_client_certificate /etc/nginx/certs/cloudflare.crt;
    ssl_verify_client on;
    ```

    </div>

    </details>

4.  Enable **Authenticated Origin Pulls**:

    - In the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin), go to **Authenticated Origin Pulls** and select **On**.
    - For the API, [change the TLS Client Auth setting](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-set-enablement-for-zone):

---

## Zone-Level — customer certificates

1.  For your **SSL/TLS encryption mode**, select **Full**.
2.  Upload a custom certificate following [these instructions](/ssl/edge-certificates/custom-certificates/uploading/#using-the-api), but use the [`origin_tls_client_auth` endpoint](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-upload-certificate).
3.  Enable **Authenticated Origin Pulls**:

    - In the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin), go to **Authenticated Origin Pulls** and select **On**.
    - For the API, [set the enablement for a zone](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-set-enablement-for-zone):

---

## Per-Hostname — customer certificates

When enabling Authenticated Origin Pull per hostname, all proxied traffic to the specified hostname is authenticated at the origin web server. Customers can use client certificates from their Private PKI to authenticate connections from Cloudflare.

1.  Upload a custom certificate following [these instructions](/ssl/edge-certificates/custom-certificates/uploading/#using-the-api), but use the [`/origin_tls_client_auth/hostnames/certificates` endpoint](https://api.cloudflare.com/#per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

{{<Aside type="note" header="Note">}}
Save the certificate ID `id` since it is required for the next step.
{{</Aside>}}

1.  On a specific hostname, [enable Authenticated Origin Pull](https://api.cloudflare.com/#per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication).

### Replace a client cert (without downtime)

For hostname:

1.  [Upload the new certificate](https://api.cloudflare.com/#per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

2.  [Enable Authenticated Origin Pull for that specific hostname](https://api.cloudflare.com/#per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication).

For global:

1.  [Upload the new certificate](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-upload-certificate).

2.  [Check whether new certificate is Active](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-get-certificate-details).

3.  Once certificate is active, then [delete the old certificate](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-delete-certificate).

---

### To apply a different client certificate simultaneously at both the zone and hostname level

1.  Upload a certificate following steps in [Zone-Level Authenticated Origin Pull](#zone-level--customer-certificates)

2.  Upload multiple certificates following the steps in [Per-Hostname Authenticated Origin Pull](#per-hostname--customer-certificates)

{{<Aside type="note" header="Note">}}
Hostname certificates take precedence over zone certificates.
{{</Aside>}}

### Delete a certificate

Client certificates are not deleted from Cloudflare upon expiration unless a [delete](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-delete-certificate) or [replace](https://api.cloudflare.com/#zone-level-authenticated-origin-pulls-upload-certificate) request is sent to the Cloudflare API.

However, requests are dropped at your origin if your origin only accepts a valid client certificate.
