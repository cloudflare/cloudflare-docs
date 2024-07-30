---
title: Cipher suites
pcx_content_type: reference
weight: 6
meta:
  title: Cipher suites — Origin
  description: Review a list of cipher suites that Cloudflare presents to origins during an SSL/TLS handshake.
---

# Cipher suites — Origin

Refer to the following list to know what cipher suites Cloudflare presents to origin servers during an SSL/TLS handshake.

{{<Aside>}}
Refer to [cipher suites supported at Cloudflare's global network](/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/) to know what cipher suites Cloudflare presents to browsers and other user agents.
{{</Aside>}}

The list order is based on how the cipher suites appear in the [ClientHello](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/#:~:text=client%20hello), communicating Cloudflare's preference.

## Supported cipher suites by protocol

| Cipher name                        | TLS 1.0 | TLS 1.1 | TLS 1.2 | TLS 1.3 |
| ----------------------------------- | ------- | ------- | ------- | ------- |
| AEAD-AES128-GCM-SHA256 [^1]        | ❌      | ❌      | ❌      | ✅      |
| AEAD-AES256-GCM-SHA384 [^1]        | ❌      | ❌      | ❌      | ✅      |
| AEAD-CHACHA20-POLY1305-SHA256 [^1] | ❌      | ❌      | ❌      | ✅      |
| ECDHE-ECDSA-AES128-GCM-SHA256       | ❌      | ❌      | ✅      | ❌      |
| ECDHE-RSA-AES128-GCM-SHA256         | ❌      | ❌      | ✅      | ❌      |
| ECDHE-RSA-AES128-SHA                | ✅      | ✅      | ✅      | ❌      |
| AES128-GCM-SHA256                   | ❌      | ❌      | ✅      | ❌      |
| AES128-SHA                          | ✅      | ✅      | ✅      | ❌      |
| ECDHE-ECDSA-AES256-GCM-SHA384       | ❌      | ❌      | ✅      | ❌      |
| ECDHE-RSA-AES256-GCM-SHA384         | ❌      | ❌      | ✅      | ❌      |
| ECDHE-RSA-AES256-SHA384             | ❌      | ❌      | ✅      | ❌      |
| AES256-SHA                          | ✅      | ✅      | ✅      | ❌      |
| DES-CBC3-SHA                        | ✅      | ❌      | ❌      | ❌      |

## Match on origin

Cloudflare will present the cipher suites to your origin and your server will select whichever cipher suite it prefers.

However, if you want to ensure that your origin server supports the same cipher suites that Cloudflare supports at our global network and you use [NGINX](https://en.wikipedia.org/wiki/Nginx) for TLS termination on your origin, you can apply the following configuration:

```txt
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ecdh_curve X25519:P-256:P-384;
ssl_ciphers '[ECDHE-ECDSA-AES128-GCM-SHA256|ECDHE-ECDSA-CHACHA20-POLY1305|ECDHE-RSA-AES128-GCM-SHA256|ECDHE-RSA-CHACHA20-POLY1305]:ECDHE+AES128:RSA+AES128:ECDHE+AES256:RSA+AES256:ECDHE+3DES:RSA+3DES';
ssl_prefer_server_ciphers on;
```

[^1]: _Although TLS 1.3 uses the same cipher suite space as previous versions of TLS, TLS 1.3 cipher suites are defined differently, only specifying the symmetric ciphers, and cannot be used for TLS 1.2. Similarly, TLS 1.2 and lower cipher suites cannot be used with TLS 1.3 (IETF TLS 1.3 draft 21). BoringSSL also hard-codes cipher preferences in this order for TLS 1.3._