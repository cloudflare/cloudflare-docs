---
order: 1
pcx-content-type: how-to
---

# Manage universal certificates

## Enable Universal SSL

### Authoritative (Full) domains

For an authoritative or full domain — domains that changed their [domain nameservers](https://support.cloudflare.com/hc/articles/205195708) – Universal SSL requires two steps:

1. Once you change your domain nameservers, your domain should receive its Universal SSL certificate within **24 hours**.
1. Based on your imported DNS records, Cloudflare sets your default **SSL/TLS encryption mode**. For help changing your encryption mode, refer to [SSL modes](/origin-configuration/ssl-modes).

### Non-authoritative (Partial) domains

For non-authoritative or partial domains (domains on a CNAME setup), Universal SSL will be:

- Provisioned once the DNS record is [proxied through Cloudflare](https://support.cloudflare.com/hc/articles/360020348832#h_836723523521544131668686) (orange-clouded).
- Validated:

    - Immediately if you add [Domain Control Validation (DCV)](../changing-dcv-method) records to your authoritative DNS.
    - After a brief period of downtime if you **do not** add DCV records (once your traffic is proxied).

## Disable Universal SSL

Some customers may need to manage their own SSL certificates or rely on specific Certificate Authorities.

If you disable your domain's Universal SSL certificate, Cloudflare removes that certificate from our network and will not order or renew any additional Universal SSL certificates.

### Potential errors

To avoid errors with your domain, either [upload a custom certificate](../../custom-certificates) or purchase [Advanced Certificate Manager](../../advanced-certificate-manager) before disabling Universal SSL.

If you disable Universal SSL, you may experience errors with the following scenarios:

- **Enabled features**:

    - [HTTP Strict Transport Security (HSTS)](../../http-strict-transport-security)
    - [Always Use HTTPS](/edge-certificates/additional-options/always-use-https)
    - [Opportunistic Encryption](/edge-certificates/additional-options/opportunistic-encryption)

- **Other setups**:

    - [Page rules](https://support.cloudflare.com/hc/articles/218411427) that redirect traffic to HTTPS
    - HTTP to HTTPS redirects at your origin web server

### Disable Universal SSL

To disable Universal SSL:

1. Make sure you have [uploaded a custom certificate](../../custom-certificates) or purchased [Advanced Certificate Manager](../../advanced-certificate-manager) to protect your domain.
1. Log in to the Cloudflare dashboard and select your account.
1. Select your domain.
1. Go to **SSL/TLS** > **Edge Certificates**.
1. For **Disable Universal SSL**, select **Disable Universal SSL**.
1. Read the warnings in the **Acknowledgement**.
1. Select **I Understand** and click **Confirm**.