---
title: Compliance status
pcx_content_type: reference
layout: wide
weight: 6
meta:
  title: Compliance status — Edge cipher suites
---

# Compliance status

Consider the following table for recommendations on [custom cipher suites](/ssl/reference/cipher-suites/customize-cipher-suites/) when your organization needs to comply with regulatory standards.


| Standard | Description | Cipher suites |
| --- | --- | --- |
| PCI DSS | Recommended cipher suites for compliance with the Payment Card Industry Data Security Standard. Enhances payment card data security. | `AEAD-AES128-GCM-SHA256`, `AEAD-AES256-GCM-SHA384`, `AEAD-CHACHA20-POLY1305-SHA256`, `ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-ECDSA-CHACHA20-POLY1305`, `ECDHE-RSA-CHACHA20-POLY1305` |
| FIPS-140-2 | Recommended cipher suites for compliance with the Federal Information Processing Standard (140-2). Used to approve cryptographic modules. | `AES128-GCM-SHA256`, `AES128-SHA`, `AES128-SHA256`, `AES256-SHA`, `AES256-SHA256`, `DES-CBC3-SHA`, `ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-AES128-SHA`, `ECDHE-ECDSA-AES128-SHA256`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-ECDSA-AES256-SHA384`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-RSA-AES128-SHA`, `ECDHE-RSA-AES128-SHA256`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-SHA`, `ECDHE-RSA-AES256-SHA384`|