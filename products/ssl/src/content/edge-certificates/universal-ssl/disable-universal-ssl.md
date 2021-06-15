---
title: Disable Universal SSL
order: 3
pcx-content-type: how-to
---

# How do I disable Universal SSL?

Some customers may need to manage their own SSL certificates or rely on specific Certificate Authorities.

If you disable your domain's Universal SSL certificate, we remove that certificate from our network and will not order or renew any additional Universal SSL certificates.

## Potential errors

To avoid errors with your domain, either [upload a custom certificate](../../custom-certificates) or purchase [Advanced Certificate Manager](../../advanced-certificate-manager) before disabling Universal SSL.

If you disable Universal SSL, you may experience errors with the following scenarios:
- **Enabled features**:
    - [HTTP Strict Transport Security (HSTS)](../../http-strict-transport-security)
    - Always Use HTTPS
    - [Opportunistic Encryption](https://support.cloudflare.com/hc/articles/227253688)
- **Other setups**:
    - [Page rules](https://support.cloudflare.com/hc/articles/218411427) that redirect traffic to HTTPS
    - HTTP to HTTPS redirects at your origin web server

## Disable Universal SSL

To disable Universal SSL:
1. Make sure you have [uploaded a custom certificate](../../custom-certificates) or purchased [Advanced Certificate Manager](../../advanced-certificate-manager) to protect your domain.
1. Log in to the Cloudflare dashboard and select your account.
1. Select your domain.
1. Go to **SSL/TLS** > **Edge Certificates**.
1. For **Disable Universal SSL**, select **Disable Universal SSL**.
1. Read the warnings in the **Acknowledgement**.
1. Select **I Understand** and click **Confirm**.
