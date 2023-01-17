---
pcx_content_type: how-to
title: Per-hostname
weight: 2
meta:
    title: Per-hostname authenticated origin pulls
---

# Per-hostname authenticated origin pulls

When you enable authenticated origin pulls per hostname, all proxied traffic to the specified hostname is authenticated at the origin web server. Customers can use client certificates from their Private PKI to authenticate connections from Cloudflare.

## Step 1 - Upload custom certificate

First, upload a custom certificate following [these instructions](/ssl/edge-certificates/custom-certificates/uploading/#using-the-api), but use the [`/origin_tls_client_auth/hostnames/certificates` endpoint](https://developers.cloudflare.com/api/operations/per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

In the API response, save the certificate ID `id` since it is required for the next step.

## Step 2 - Enable authenticated origin pulls (globally)

Then, enable authenticated origin pulls as an option for your Cloudflare zone.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **Authenticated Origin Pulls** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Navigate to **SSL/TLS** > **Origin Server**.
3.  For **Authenticated Origin Pulls**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable **Authenticated Origin Pulls** with the API, send a [`PATCH`](https://developers.cloudflare.com/api/operations/zone-settings-change-tls-client-auth-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).

{{</tab>}}
{{</tabs>}}

## Step 3 - Enable authenticated origin pulls for the hostname

Finally, use the Cloudflare API to send a [`PUT`](https://developers.cloudflare.com/api/operations/per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication) request to enable authenticated origin pulls for specific hostnames.
