---
pcx_content_type: navigation
title: Edge certificates
weight: 4
---

# Edge certificates

Edge certificates are the SSL/TLS certificates that Cloudflare presents to clients visiting your website or application.

Consider the information below for guidance on how to choose different edge certificates according to your use case, or refer to the other pages in this section for more options.

## Use cases

### Simplify issuance and renewal

To use Cloudflare to issue and renew your certificates, choose either [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/).

[Custom certificates](/ssl/edge-certificates/custom-certificates/) offer more flexibility in terms of certificate authority or certificate validation level, but require you to handle issuance and renewal independently.

### Meet cipher suites requirements

The different algorithms used in SSL/TLS encryption can vary in terms of how secure they are. Through [cipher suite customization](/ssl/reference/cipher-suites/customize-cipher-suites/) you can have more control over which ciphers are used for your domain and/or specific hostnames.

Cipher suites customization is set at the hostname level and applies to any edge certificate used in connections to a given hostname. However, to enable [this and other features](/ssl/edge-certificates/advanced-certificate-manager/#advanced-certificate-manager), you must (purchase the Advanced Certificate Manager add-on).

### Automate domain control validation (DCV)