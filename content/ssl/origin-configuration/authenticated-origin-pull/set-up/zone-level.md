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

{{<Aside type="warning">}}

Although Cloudflare provides you a certificate to easily configure zone-level authenticated origin pulls, if you want more strict security, you should upload your own certificate.

Using a custom certificate is required if you need your domain to be [FIPS](https://en.wikipedia.org/wiki/Federal_Information_Processing_Standards) compliant.

{{</Aside>}}

## 2. Configure origin to accept client certificates

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

At this point, you may also want to enable logging on your origin so that you can verify the configuration is working.

## 3. Configure Cloudflare to use client certificate

Then, enable the Authenticated Origin Pulls feature as an option for your Cloudflare zone.

This step sets the TLS Client Auth to require Cloudflare to use a client certificate when connecting to your origin server.

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

##  4. Enable Authenticated Origin Pulls for all hostnames in a zone

Use the Cloudflare API to send a [`PUT`](/api/operations/zone-level-authenticated-origin-pulls-set-enablement-for-zone) request to enable zone-level authenticated origin pulls.

If you had set up logging on your origin, test and confirm that Authenticated Origin Pulls is working.

##  5. Enforce validation check on your origin

Once you can confirm everything is working as expected for your specific origin setup, configure your origin to enforce the authentication.

After completing the process, you can use `curl` to send requests directly to your origin IPs, verifying that the requests fail due to certificate validation being enforced.