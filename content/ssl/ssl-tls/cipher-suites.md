---
title: Cipher suites
pcx_content_type: reference
layout: list
weight: 2
meta:
  title: Cipher suites — Edge certificates
---

# Cipher suites — Edge certificates

{{<render file="_cipher-suites-definition.md">}}

Cloudflare publishes a [public repository of our SSL/TLS configurations](https://github.com/cloudflare/sslconfig) on GitHub. You can find changes in the commit history.

We no longer support [RC4 cipher suites](https://blog.cloudflare.com/end-of-the-road-for-rc4/) or [SSLv3](https://blog.cloudflare.com/sslv3-support-disabled-by-default-due-to-vulnerability/).

---

## Cipher suites recommendations

If your application has specific security requirements, Cloudflare recommends using the following values when you [restrict cipher suites](#disable-cipher-suites).

| Recommended security level | Description | Cipher suites [to specify](#disable-cipher-suites) | Other settings |
| --- | --- | --- | --- |
| Modern | Offers best security and performance, limiting your range of clients to modern devices and browsers. Supports TLS 1.2-1.3 cipher suites. All suites are forward-secret and support authenticated encryption (AEAD). | `["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384"]` | Enable [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13). |
| Compatible | Provides broader compatibility with somewhat weaker security. Supports TLS 1.2-1.3 cipher suites. All suites are forward-secret. | `["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-RSA-AES128-SHA256", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES256-SHA384"]` | Enable [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13). |
| Legacy | Includes all cipher suites that Cloudflare supports today. Broadest compatibility with the weakest security. Supports TLS 1.0-1.3 cipher suites. | `["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-RSA-AES128-SHA256", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES256-SHA384", "ECDHE-ECDSA-AES128-SHA", "ECDHE-RSA-AES128-SHA", "AES128-GCM-SHA256", "AES128-SHA256", "AES128-SHA", "ECDHE-RSA-AES256-SHA", "AES256-GCM-SHA384", "AES256-SHA256", "AES256-SHA", "DES-CBC3-SHA"]` | Enable [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13). |

---

## Supported cipher suites

| OpenSSL Name | Minimum protocol | [Security recommendation](#cipher-suites-recommendations) | Cipher suite | IANA name |
| ----------------------------------- | ------- | ------- | ------- | ------- |
| ECDHE-ECDSA-AES128-GCM-SHA256       | TLS 1.2 | Modern | [0xc02b] | TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256 |
| ECDHE-ECDSA-CHACHA20-POLY1305       | TLS 1.2 | Modern | [0xcca9] | TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256 |
| ECDHE-RSA-AES128-GCM-SHA256         | TLS 1.2 | Modern | [0xc02f] | TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 |
| ECDHE-RSA-CHACHA20-POLY1305         | TLS 1.2 | Modern  | [0xcca8] | TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256 |
| ECDHE-ECDSA-AES128-SHA256           | TLS 1.2 | Compatible | [0xc023] | TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256 |
| ECDHE-ECDSA-AES128-SHA              | TLS 1.0 | Modern | [0xc009] | TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA
| ECDHE-RSA-AES128-SHA256             | TLS 1.2 | Compatible | [0xc027] | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
| ECDHE-RSA-AES128-SHA                | TLS 1.0 | Modern | [0xc013] | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA |
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
| DES-CBC3-SHA                        | TLS 1.0 | Legacy | [0x0701c0] | SSL_CK_DES_192_EDE3_CBC_WITH_SHA |
| TLS_AES_128_GCM_SHA256[^1]        | TLS 1.3 | Modern | {0x13,0x01} | TLS_AES_128_GCM_SHA256 |
| TLS_AES_256_GCM_SHA384[^1]        | TLS 1.3 | Modern | {0x13,0x02} | TLS_AES_256_GCM_SHA384 |
| TLS_CHACHA20_POLY1305_SHA256[^1]  | TLS 1.3 | Modern | {0x13,0x03} | TLS_CHACHA20_POLY1305_SHA256 |

[^1]: Automatically supported by your zone if you [enable TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13). TLS 1.3 uses the same cipher suite space as previous versions of TLS, but define these cipher suites differently. They only specify the symmetric ciphers and cannot be used for TLS 1.2. Similarly, TLS 1.2 and lower cipher suites cannot be used with TLS 1.3 (IETF TLS 1.3 draft 21). BoringSSL also hard-codes cipher preferences in this order for TLS 1.3.

### Custom certificates

{{<render file="_custom-cert-ciphers.md">}}

---

## Disable cipher suites

With **Advanced Certificate Manager** or within **SSL for SaaS**, you can restrict connections to specific cipher suites. Currently, this functionality is only available when using the API:

- [Zone](https://api.cloudflare.com/#zone-settings-change-ciphers-setting)
- [Hostname (SSL for SaaS only)](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname)

To specify certain [cipher suites](#supported-cipher-suites-by-protocol), include an array of applicable cipher suites used for TLS 1.2 or lower, in the `value` field.

To reset to the default cipher suites, send an empty array in the `value` field.

---

## Matching on origin (optional)

Cloudflare will [present the cipher suites to your origin](/ssl/origin-configuration/cipher-suites/) and your server will select whichever cipher suite it prefers.

However, if you want to ensure that your origin server supports the same cipher suites that Cloudflare supports at our edge, use the following NGINX configuration. If you are terminating TLS on your origin using a different method, refer to that application’s documentation.

```txt
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ecdh_curve X25519:P-256:P-384;
ssl_ciphers '[ECDHE-ECDSA-AES128-GCM-SHA256|ECDHE-ECDSA-CHACHA20-POLY1305|ECDHE-RSA-AES128-GCM-SHA256|ECDHE-RSA-CHACHA20-POLY1305]:ECDHE+AES128:RSA+AES128:ECDHE+AES256:RSA+AES256:ECDHE+3DES:RSA+3DES';
ssl_prefer_server_ciphers on;
```
