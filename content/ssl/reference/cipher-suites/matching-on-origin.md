---
title: Match on origin
pcx_content_type: how-to
weight: 8
layout: list
meta:
  title: Match on origin
---

# Match on origin

Cloudflare will [present the cipher suites to your origin](/ssl/origin-configuration/cipher-suites/) and your server will select whichever cipher suite it prefers.

However, if you want to ensure that your origin server supports the same cipher suites that Cloudflare supports at our global network and you use [NGINX](https://en.wikipedia.org/wiki/Nginx) for TLS termination on your origin, you can apply the following configuration:

```txt
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ecdh_curve X25519:P-256:P-384;
ssl_ciphers '[ECDHE-ECDSA-AES128-GCM-SHA256|ECDHE-ECDSA-CHACHA20-POLY1305|ECDHE-RSA-AES128-GCM-SHA256|ECDHE-RSA-CHACHA20-POLY1305]:ECDHE+AES128:RSA+AES128:ECDHE+AES256:RSA+AES256:ECDHE+3DES:RSA+3DES';
ssl_prefer_server_ciphers on;
```