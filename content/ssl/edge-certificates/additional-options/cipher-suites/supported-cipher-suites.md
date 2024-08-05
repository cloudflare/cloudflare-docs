---
title: Supported cipher suites
pcx_content_type: reference
layout: wide
weight: 5
meta:
  title: Supported cipher suites
---

# Supported cipher suites

Cloudflare supports the following cipher suites by default. If needed, you can [restrict your website or application](/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) to only use specific cipher suites.

| Cipher name | Minimum protocol | [Security recommendation](/ssl/edge-certificates/additional-options/cipher-suites/recommendations/) | Cipher suite | IANA name |
| ----------------------------------- | ------- | ------- | ------- | ------- |
| ECDHE-ECDSA-AES128-GCM-SHA256       | TLS 1.2 | Modern | [0xc02b] | TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256 |
| ECDHE-ECDSA-CHACHA20-POLY1305       | TLS 1.2 | Modern | [0xcca9] | TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256 |
| ECDHE-RSA-AES128-GCM-SHA256         | TLS 1.2 | Modern | [0xc02f] | TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 |
| ECDHE-RSA-CHACHA20-POLY1305         | TLS 1.2 | Modern  | [0xcca8] | TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256 |
| ECDHE-ECDSA-AES128-SHA256           | TLS 1.2 | Compatible | [0xc023] | TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256 |
| ECDHE-ECDSA-AES128-SHA              | TLS 1.0 | Legacy | [0xc009] | TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA
| ECDHE-RSA-AES128-SHA256             | TLS 1.2 | Compatible | [0xc027] | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
| ECDHE-RSA-AES128-SHA                | TLS 1.0 | Legacy | [0xc013] | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA |
| AES128-GCM-SHA256                   | TLS 1.2 | Legacy | [0x9c] | TLS_RSA_WITH_AES_128_GCM_SHA256 |
| AES128-SHA256                       | TLS 1.2 | Legacy | [0x3c] | TLS_RSA_WITH_AES_128_CBC_SHA256 |
| AES128-SHA                          | TLS 1.0 | Legacy | [0x2f] | TLS_RSA_WITH_AES_128_CBC_SHA |
| ECDHE-ECDSA-AES256-GCM-SHA384       | TLS 1.2 | Modern | [0xc02c] | TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384 |
| ECDHE-ECDSA-AES256-SHA384           | TLS 1.2 | Compatible | [0xc024] | TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384 |
| ECDHE-RSA-AES256-GCM-SHA384         | TLS 1.2 | Modern | [0xc030] | TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 |
| ECDHE-RSA-AES256-SHA384             | TLS 1.2 | Compatible | [0xc028] | TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 |
| ECDHE-RSA-AES256-SHA                | TLS 1.0 | Legacy | [0xc014] | TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA |
| AES256-GCM-SHA384                   | TLS 1.2 | Legacy | [0x9d] | TLS_RSA_WITH_AES_256_GCM_SHA384 |
| AES256-SHA256                       | TLS 1.2 | Legacy | [0x3d] | TLS_RSA_WITH_AES_256_CBC_SHA256 |
| AES256-SHA                          | TLS 1.0 | Legacy | [0x35] | TLS_RSA_WITH_AES_256_CBC_SHA |
| DES-CBC3-SHA                        | TLS 1.0 | Legacy | [0x0a] | TLS_RSA_WITH_3DES_EDE_CBC_SHA |
| AEAD-AES128-GCM-SHA256 *        | TLS 1.3 | Modern | {0x13,0x01} | TLS_AES_128_GCM_SHA256 |
| AEAD-AES256-GCM-SHA384 *        | TLS 1.3 | Modern | {0x13,0x02} | TLS_AES_256_GCM_SHA384 |
| AEAD-CHACHA20-POLY1305-SHA256 *  | TLS 1.3 | Modern | {0x13,0x03} | TLS_CHACHA20_POLY1305_SHA256 |

{{<Aside type="note" header="* TLS 1.3 minimum protocol">}}
Ciphers `AEAD-AES128-GCM-SHA256`, `AEAD-AES256-GCM-SHA384`, and `AEAD-CHACHA20-POLY1305-SHA256` are automatically supported by your zone if you [enable TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13).

TLS 1.3 uses the same cipher suite space as previous versions of TLS, but defines these cipher suites differently. TLS 1.3 only specifies the symmetric ciphers and cannot be used for TLS 1.2. Similarly, TLS 1.2 and lower cipher suites cannot be used with TLS 1.3 (IETF TLS 1.3 draft 21). BoringSSL also hard-codes cipher preferences in this order for TLS 1.3.
{{</Aside>}}