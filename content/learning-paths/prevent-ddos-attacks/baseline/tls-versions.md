---
title: Update TLS versions
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

In some circumstances - specifically when an application allows client-initiated SSL/TLS renegotiation - previous versions of SSL/TLS can be more vulnerable to DDoS attacks.

When you use an SSL/TLS certificate issued by Cloudflare[^1], you can reduce the impact of this vulnerability by:

- Updating the [Minimum TLS Version](/ssl/edge-certificates/additional-options/minimum-tls/) accepted by your application.
- Allowing [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/).

[^1]: Meaning either [Universal](/ssl/edge-certificates/universal-ssl/) or [Advanced](/ssl/edge-certificates/advanced-certificate-manager/) certificates.

## Additional resources

For more details on this vulnerability, refer to [Secure Server- and Client-Initiated SSL Renegotiation](https://crashtest-security.com/secure-client-initiated-ssl-renegotiation/).