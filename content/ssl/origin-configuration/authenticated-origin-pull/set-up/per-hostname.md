---
pcx_content_type: how-to
title: Per-hostname
weight: 2
meta:
    title: Per-hostname authenticated origin pulls
---

# Per-hostname authenticated origin pulls

When you enable Authenticated Origin Pulls per hostname, all proxied traffic to the specified hostname is authenticated at the origin web server. Customers can use client certificates from their Private PKI to authenticate connections from Cloudflare.

## 1. Upload custom certificate

First, follow the API instructions to [upload a custom certificate to Cloudflare](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate), but use the [`/origin_tls_client_auth/hostnames/certificates` endpoint](/api/operations/per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

In the API response, save the certificate `id` since it is required for the next step.

## 2. Enable Authenticated Origin Pulls (globally)

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

## 3. Enable Authenticated Origin Pulls for the hostname

Finally, use the Cloudflare API to send a [`PUT`](/api/operations/per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication) request to enable Authenticated Origin Pulls for specific hostnames.
