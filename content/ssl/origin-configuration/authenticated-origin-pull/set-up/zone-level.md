---
pcx_content_type: how-to
title: Zone-level
weight: 1
meta:
    title: Zone-level authenticated origin pulls
---

# Zone-level authenticated origin pulls

When you enable Authenticated Origin Pulls for a zone, all proxied traffic to your zone is authenticated at the origin web server.

## Before you begin

Make sure your zone is using an [SSL/TLS encryption mode](/ssl/origin-configuration/ssl-modes/) of **Full** or higher.

## 1. Upload certificate to origin

First, upload a certificate to your origin.

To use a Cloudflare certificate (which uses a specific CA), [download the .PEM file](/ssl/static/authenticated_origin_pull_ca.pem) and upload it to your origin.

To use a custom certificate, follow the API instructions to [upload a custom certificate to Cloudflare](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate), but use the [`origin_tls_client_auth` endpoint](/api/operations/zone-level-authenticated-origin-pulls-upload-certificate). Then, upload the certificate to your origin.

## 2. Configure origin to accept client certs

With the certificate installed, set up your origin web server to accept client certificates.

<details>
<summary>Apache example</summary>
<div>

For this example, you would have saved the certificate `/path/to/origin-pull-ca.pem`.

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

For this example, you would have saved your certificate to `/etc/nginx/certs/cloudflare.crt`.

```txt
ssl_client_certificate /etc/nginx/certs/cloudflare.crt;
ssl_verify_client on;
```

</div>

</details>

## 3. Enable Authenticated Origin Pulls (globally)

Then, enable Authenticated Origin Pulls as an option for your Cloudflare zone.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **Authenticated Origin Pulls** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **SSL/TLS** > **Origin Server**.
3.  For **Authenticated Origin Pulls**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable **Authenticated Origin Pulls** with the API, send a [`PATCH`](/api/operations/zone-settings-change-tls-client-auth-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).

{{</tab>}}
{{</tabs>}}

##  4. Enable Authenticated Origin Pulls for zone

Finally, use the Cloudflare API to send a [`PUT`](/api/operations/zone-level-authenticated-origin-pulls-set-enablement-for-zone) request to enable or disable zone-level authenticated origin pulls.
