---
order: 1
---

# Cipher suites

We publish a [public repository of our SSL/TLS configurations](https://github.com/cloudflare/sslconfig) on GitHub, and changes can be found in commit history. Please note that Cloudflare [no longer supports RC4 cipher suites](https://blog.cloudflare.com/end-of-the-road-for-rc4/) or [SSLv3](https://blog.cloudflare.com/sslv3-support-disabled-by-default-due-to-vulnerability/).

--------

## Supported cipher suites by protocol

OpenSSL Name | TLS 1.0 | TLS 1.1 | TLS 1.2 | TLS 1.3
------|-------------|---------------|---------------|---------------
ECDHE-ECDSA-AES128-GCM-SHA256|❌|❌	|✅|❌
ECDHE-ECDSA-CHACHA20-POLY1305|❌|❌|✅|❌
ECDHE-RSA-AES128-GCM-SHA256|❌|❌|✅|❌
ECDHE-RSA-CHACHA20-POLY1305|❌|❌|✅|❌
ECDHE-ECDSA-AES128-SHA256|❌|❌|✅|❌
ECDHE-ECDSA-AES128-SHA|✅|✅|✅|❌
ECDHE-RSA-AES128-SHA256|❌|❌|✅|❌
ECDHE-RSA-AES128-SHA|✅|✅|✅|❌
AES128-GCM-SHA256|❌|❌|✅|❌
AES128-SHA256|❌|❌|✅|❌
AES128-SHA|✅|✅|✅	|❌
ECDHE-ECDSA-AES256-GCM-SHA384|❌|❌|✅|❌
ECDHE-ECDSA-AES256-SHA384|❌|❌|✅|❌
ECDHE-RSA-AES256-GCM-SHA384|❌|❌|✅|❌
ECDHE-RSA-AES256-SHA384|❌|❌|✅|❌
ECDHE-RSA-AES256-SHA|✅	|✅|✅|❌
AES256-GCM-SHA384|❌|❌|✅|❌
AES256-SHA256|❌|❌|✅|❌
AES256-SHA|✅|✅ |✅|❌
DES-CBC3-SHA|✅|❌|❌|❌
AEAD-AES128-GCM-SHA256 [^1]|❌|❌|❌|✅
AEAD-AES256-GCM-SHA384 [^1]|❌|❌|❌|✅
AEAD-CHACHA20-POLY1305-SHA256 [^1]|❌|❌|❌|✅

--------

## Restricting at edge

Restricting connections to specific cipher suites can be configured at the zone or hostname level. [Configure Zone-level requests via the API](https://api.cloudflare.com/#zone-settings-change-ciphers-setting) and [configure hostname-level restrictions via the Custom Hostnames API](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname).

--------

## Matching on origin

If you would like to support the same cipher suites on your origin that Cloudflare supports at our edge, the nginx configuration below can be used. If you are terminating TLS on your origin using something other than nginx, please refer to that application’s documentation.

```txt
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ecdh_curve X25519:P-256:P-384:P-224:P-521;
ssl_ciphers '[ECDHE-ECDSA-AES128-GCM-SHA256|ECDHE-ECDSA-CHACHA20-POLY1305|ECDHE-RSA-AES128-GCM-SHA256|ECDHE-RSA-CHACHA20-POLY1305]:ECDHE+AES128:RSA+AES128:ECDHE+AES256:RSA+AES256:ECDHE+3DES:RSA+3DES';
ssl_prefer_server_ciphers on;
```

Note that this step is completely optional. Cloudflare will [present the cipher suites to your origin](/origin-configuration/cipher-suites/), and your server will select whichever cipher suite it prefers.


[^1]: *Although TLS 1.3 uses the same cipher suite space as previous versions of TLS, TLS 1.3 cipher suites are defined differently, only specifying the symmetric ciphers, and cannot be used for TLS 1.2. Similarly, TLS 1.2 and lower cipher suites cannot be used with TLS 1.3 (IETF TLS 1.3 draft 21). BoringSSL also hard-codes cipher preferences in this order for TLS 1.3.*