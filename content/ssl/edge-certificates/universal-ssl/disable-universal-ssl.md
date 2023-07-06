---
pcx_content_type: how-to
title: Disable Universal SSL certificates
weight: 3
---

# Disable Universal SSL certificates

Some customers may need to manage their own SSL certificates or rely on specific Certificate Authorities.

If you disable your domain's Universal SSL certificate, Cloudflare removes that certificate from our network and will not order or renew any additional Universal SSL certificates.

## Potential errors

To avoid errors with your domain, either [upload a custom certificate](/ssl/edge-certificates/custom-certificates/) or purchase [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) before disabling Universal SSL.

If you disable Universal SSL, you may experience errors with the following scenarios:

- **Enabled features**:

  - [HTTP Strict Transport Security (HSTS)](/ssl/edge-certificates/additional-options/http-strict-transport-security/)
  - [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/)
  - [Opportunistic Encryption](/ssl/edge-certificates/additional-options/opportunistic-encryption/)

- **Other setups**:

  - [Page rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) that redirect traffic to HTTPS
  - HTTP to HTTPS redirects at your origin web server

## Disable Universal SSL certificate

Before you disable Universal SSL/TLS, make sure you have [uploaded a custom certificate](/ssl/edge-certificates/custom-certificates/) or purchased [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) to protect your domain.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To disable Universal SSL in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Select your domain.
3.  Go to **SSL/TLS** > **Edge Certificates**.
4.  For **Disable Universal SSL**, select **Disable Universal SSL**.
5.  Read the warnings in the **Acknowledgement**.
6.  Select **I Understand** and select **Confirm**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To disable Universal SSL with the Cloudflare API, send a [`PATCH`](/api/operations/universal-ssl-settings-for-a-zone-edit-universal-ssl-settings) request and include the `"enabled": false` parameter.
 
{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}Even with Universal SSL disabled, some features such as [AMP Real URL](/speed/optimization/other/amp-real-ulr/) and [Signed Exchanges](/speed/optimization/other/signed-exchanges/) will still provision certificates for your domain.{{</Aside>}}

## Re-enable Universal SSL

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To re-enable Universal SSL in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Select your domain.
3.  Go to **SSL/TLS** > **Edge Certificates**.
4.  For **Disable Universal SSL**, select **Enable Universal SSL**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To re-enable Universal SSL with the Cloudflare API, send a [`PATCH`](/api/operations/universal-ssl-settings-for-a-zone-edit-universal-ssl-settings) request and include the `"enabled": true` parameter.
 
{{</tab>}}
{{</tabs>}}