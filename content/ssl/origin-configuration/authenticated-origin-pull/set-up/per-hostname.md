---
pcx_content_type: how-to
title: Per-hostname
weight: 2
meta:
    title: Per-hostname authenticated origin pulls
---

# Per-hostname authenticated origin pulls

When you enable Authenticated Origin Pulls per hostname, all proxied traffic to the specified hostname is authenticated at the origin web server. You can use client certificates from your Private PKI to authenticate connections from Cloudflare.

{{<render file="_aop-per-hostname-cert-requirement.md">}}<br />

## 1. Upload custom certificate

First, follow the API instructions to [upload a custom certificate to Cloudflare](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate), but use the [`/origin_tls_client_auth/hostnames/certificates` endpoint](/api/operations/per-hostname-authenticated-origin-pull-upload-a-hostname-client-certificate).

{{<Aside type="note">}}
You must upload a [leaf certificate](/ssl/concepts/#chain-of-trust). If you upload a root CA instead, the API will return a `missing leaf certificate` error.
{{</Aside>}}

In the API response, save the certificate `id` since it will be required in step 4.

## 2. Configure origin to accept client certificates

{{<render file="_aop-configure-origin.md" withParameters=" ;; ">}}

## 3. Enable Authenticated Origin Pulls (globally)

{{<render file="_aop-enable-feature.md">}}

## 4. Enable Authenticated Origin Pulls for the hostname

Use the Cloudflare API to send a [`PUT`](/api/operations/per-hostname-authenticated-origin-pull-enable-or-disable-a-hostname-for-client-authentication) request to enable Authenticated Origin Pulls for specific hostnames.

If you had set up logging on your origin during step 2, test and confirm that Authenticated Origin Pulls is working.

## 5. Enforce validation check on your origin

{{<render file="_aop-enforce-validation.md">}}

## 6. (Optional) Set up alerts for hostname-level Authenticated Origin Pulls certificates

You can configure alerts to receive notifications before your AOP certificates expire.

{{<available-notifications product="SSL/TLS" notificationName="Hostname-level Authenticated Origin Pulls Certificate Expiration Alert">}}

{{<render file="_get-started.md" productFolder="notifications" >}}