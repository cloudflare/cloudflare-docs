---
pcx_content_type: how-to
title: Per-hostname
weight: 2
meta:
    title: Per-hostname Authenticated Origin Pulls
---

# Per-hostname Authenticated Origin Pulls

{{<render file="_aop-setup-intro.md" withParameters="per-hostname;;the specified hostname">}} <br />

You can use client certificates from your Private PKI to authenticate connections from Cloudflare.

{{<Aside type="warning">}}
Per-hostname Authenticated Origin Pulls can only be configured via API. The Authenticated Origin Pulls setting in **SSL/TLS** > **Origin Server** is only for enabling the zone-level configuration.
{{</Aside>}}

## Before you begin

Make sure your zone is using an [SSL/TLS encryption mode](/ssl/origin-configuration/ssl-modes/) of **Full** or higher.

## 1. Upload custom certificate

First, follow the API instructions to [upload a custom certificate to Cloudflare](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate), but use the [`/origin_tls_client_auth/hostnames/certificates` endpoint](/api/operations/per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

In the API response, save the certificate `id` since it will be required in step 4.

## 2. Configure origin to accept client certificates

{{<render file="_aop-configure-origin.md">}}

## 3. Enable Authenticated Origin Pulls (globally)

Then, enable the Authenticated Origin Pulls feature as an option for your Cloudflare zone, by sending a [`PATCH`](/api/operations/zone-settings-change-tls-client-auth-setting) request with the `value` parameter set to `"on"`.

This step sets the TLS Client Auth to require Cloudflare to use a client certificate when connecting to your origin server.

{{<Aside type="warning">}}

Note that this step means Authenticated Origin Pulls will be available, but you still have to go through the following steps to complete the configuration.

{{</Aside>}}

## 4. Enable Authenticated Origin Pulls for the hostname

Use the Cloudflare API to send a [`PUT`](/api/operations/per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication) request to enable Authenticated Origin Pulls for specific hostnames.

If you had set up logging on your origin during step 2, test and confirm that Authenticated Origin Pulls is working.

## 5. Enforce validation check on your origin

{{<render file="_aop-enforce-validation.md">}}