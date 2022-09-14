---
title: Compliance status
pcx_content_type: reference
layout: list
weight: 6
meta:
  title: Compliance status — Edge cipher suites
---

# Compliance status

When you choose various [cipher suites](/ssl/ssl-tls/cipher-suites/supported-cipher-suites) to use with your edge certificates, your application may need to be in compliance with various regulatory standards.

The following table provides a status list of various cipher suites.

| Standard | Description | Cipher suites |
| --- | --- | --- |
| PCI DSS | Recommended cipher suites for compliance with the Payment Card Industry Data Security Standard. Enhances payment card data security. | TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256, ECDHE-ECDSA-AES128-GCM-SHA256, ECDHE-RSA-AES128-GCM-SHA256, ECDHE-ECDSA-AES256-GCM-SHA384, ECDHE-RSA-AES256-GCM-SHA384, ECDHE-ECDSA-CHACHA20-POLY1305, ECDHE-RSA-CHACHA20-POLY1305 |
| FIPS-140-2 | Recommended cipher suites for with the Federal Information Processing Standard (140-2). Used to approve cryptographic modules. | AES128-GCM-SHA256, AES128-SHA, AES128-SHA256, AES256-SHA, AES256-SHA256, DES-CBC3-SHA, ECDHE-ECDSA-AES128-GCM-SHA256, ECDHE-ECDSA-AES128-SHA, ECDHE-ECDSA-AES128-SHA256, ECDHE-ECDSA-AES256-GCM-SHA384, ECDHE-ECDSA-AES256-SHA384, ECDHE-RSA-AES128-GCM-SHA256, ECDHE-RSA-AES128-SHA, ECDHE-RSA-AES128-SHA256, ECDHE-RSA-AES256-GCM-SHA384, ECDHE-RSA-AES256-SHA, ECDHE-RSA-AES256-SHA384 |