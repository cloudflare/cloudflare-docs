---
title: Recommendations
pcx_content_type: reference
layout: wide
weight: 2
meta:
  title: Cipher suites recommendations
---

# Cipher suites recommendations

The following list presents a reference for three different security levels and how Cloudflare recommends that you set them up if you need to [restrict cipher suites](/ssl/reference/cipher-suites/customize-cipher-suites/) used between Cloudflare and clients that access your website or application.

| Recommended security level | Description | Cipher suites [to specify](/ssl/reference/cipher-suites/customize-cipher-suites/) | Other settings |
| --- | --- | --- | --- |
| Modern | Offers best security and performance, limiting your range of clients to modern devices and browsers. Supports TLS 1.2-1.3 cipher suites. All suites are forward-secret and support authenticated encryption (AEAD). | `["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384"]` | Enable [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13). |
| Compatible | Provides broader compatibility with somewhat weaker security. Supports TLS 1.2-1.3 cipher suites. All suites are forward-secret. | `["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-RSA-AES128-SHA256", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES256-SHA384"]` | Enable [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13). |
| Legacy | Includes all cipher suites that Cloudflare supports today. Broadest compatibility with the weakest security. Supports TLS 1.0-1.3 cipher suites. | `["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-RSA-AES128-SHA256", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES256-SHA384", "ECDHE-ECDSA-AES128-SHA", "ECDHE-RSA-AES128-SHA", "AES128-GCM-SHA256", "AES128-SHA256", "AES128-SHA", "ECDHE-RSA-AES256-SHA", "AES256-GCM-SHA384", "AES256-SHA256", "AES256-SHA", "DES-CBC3-SHA"]` | Enable [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13). |