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

  - [Page rules](https://support.cloudflare.com/hc/articles/218411427) that redirect traffic to HTTPS
  - HTTP to HTTPS redirects at your origin web server

## Disable Universal SSL certificate

To disable Universal SSL:

1.  Make sure you have [uploaded a custom certificate](/ssl/edge-certificates/custom-certificates/) or purchased [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) to protect your domain.
2.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
3.  Select your domain.
4.  Go to **SSL/TLS** > **Edge Certificates**.
5.  For **Disable Universal SSL**, select **Disable Universal SSL**.
6.  Read the warnings in the **Acknowledgement**.
7.  Select **I Understand** and click **Confirm**.
