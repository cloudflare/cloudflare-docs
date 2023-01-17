---
pcx_content_type: how-to
title: Zone-level
weight: 1
meta:
    title: Zone-level authenticated origin pulls
---

# Zone-level authenticated origin pulls

To apply authenticated origin pulls to all hostnames in your zone:

1. Choose whether you want to use a Cloudflare certificate or a custom certificate.

### Certificate value

Cloudflare uses a specific CA to sign certificates for the Authenticated Origin Pull service.

If you need the value for that CA, [download the .PEM file](/ssl/static/authenticated_origin_pull_ca.pem).

### Setup instructions

To enable Authenticated Origin Pull globally on a zone:

1.  Install the above certificate at the origin web server to authenticate all connections.

2.  For your [**SSL/TLS encryption mode**](/ssl/origin-configuration/ssl-modes/), select **Full** or higher.

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
    - For the API, [change the TLS Client Auth setting](https://developers.cloudflare.com/api/operations/zone-level-authenticated-origin-pulls-set-enablement-for-zone):

---

## Zone-Level — customer certificates

1.  For your [**SSL/TLS encryption mode**](/ssl/origin-configuration/ssl-modes/), select **Full** or higher.
2.  Upload a custom certificate following [these instructions](/ssl/edge-certificates/custom-certificates/uploading/#using-the-api), but use the [`origin_tls_client_auth` endpoint](https://developers.cloudflare.com/api/operations/zone-level-authenticated-origin-pulls-upload-certificate).
3.  Enable **Authenticated Origin Pulls**:

    - In the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin), go to **Authenticated Origin Pulls** and select **On**.
    - For the API, [set the enablement for a zone](https://developers.cloudflare.com/api/operations/zone-level-authenticated-origin-pulls-set-enablement-for-zone):