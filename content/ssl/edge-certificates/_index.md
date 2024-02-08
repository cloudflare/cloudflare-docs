---
pcx_content_type: navigation
title: Edge certificates
weight: 4
meta:
  description: Edge certificates are the SSL/TLS certificates that Cloudflare presents to your visitors. Consider how different certificate types align to common use cases.
---

# Edge certificates

Consider the information below for guidance on how to choose different edge certificates for common use cases, or refer to the other pages in this section for more options.

## Use cases

### Simplify issuance and renewal

Issuing and renewing certificates can take up a lot of time from your technical teams. Leverage Cloudflare [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/) to simplify this process.

[Custom certificates](/ssl/edge-certificates/custom-certificates/) offer more flexibility in terms of certificate authority or certificate validation level, but require you to handle issuance and renewal independently.

### Meet cipher suites requirements

The different algorithms used in SSL/TLS encryption can vary in terms of how secure they are. Through [cipher suite customization](/ssl/reference/cipher-suites/customize-cipher-suites/) you can have more control over which ciphers are used for your domain and/or specific hostnames.

Cipher suites customization is set at the hostname level and applies to any edge certificate used in connections to a given hostname. However, to enable [this and other features](/ssl/edge-certificates/advanced-certificate-manager/#advanced-certificate-manager), you must (purchase the Advanced Certificate Manager add-on).

If you already have Advanced Certificate Manager, refer to [Change ciphers setting](/api/operations/zone-settings-change-ciphers-setting) to apply custom cipher suites to your zone, or to [Edit TLS setting for hostname](/api/operations/per-hostname-tls-settings-put) to specify your chosen ciphers per hostname.

Consider [Customize cipher suites](/ssl/reference/cipher-suites/customize-cipher-suites/) for more guidance.

### Automate domain control validation (DCV)

