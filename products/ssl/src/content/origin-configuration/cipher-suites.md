---
order: 1
---

# Cipher suites

Below are the cipher suites that we present to origins during an SSL/TLS handshake. We also have a list of [cipher suites that we support at our edge](/ssl-tls/cipher-suites/), i.e., that are presented to browsers and other user agents.

Note that the cipher suites below are ordered based on how they appear in the ClientHello, communicating our preference to the origin.

## Supported cipher suites by protocol

OpenSSL Name | TLS 1.0 | TLS 1.1 | TLS 1.2 | TLS 1.3
------|-------------|---------------|---------------|---------------
AEAD-AES128-GCM-SHA256 [^1]|❌|❌|❌|✅
AEAD-AES256-GCM-SHA384 [^1]|❌|❌|❌|✅
AEAD-CHACHA20-POLY1305-SHA256 [^1]|❌|❌|❌|✅
ECDHE-ECDSA-AES128-GCM-SHA256|❌|❌	|✅|❌
ECDHE-RSA-AES128-GCM-SHA256|❌|❌|✅|❌
ECDHE-RSA-AES128-SHA|✅|✅|✅|❌
AES128-GCM-SHA256|❌|❌|✅|❌
AES128-SHA|✅|✅|✅	|❌
ECDHE-ECDSA-AES256-GCM-SHA384|❌|❌|✅|❌
ECDHE-RSA-AES256-SHA384|❌|❌|✅|❌
AES256-SHA|✅|✅ |✅|❌
DES-CBC3-SHA|✅|❌|❌|❌


[^1]: *Although TLS 1.3 uses the same cipher suite space as previous versions of TLS, TLS 1.3 cipher suites are defined differently, only specifying the symmetric ciphers, and cannot be used for TLS 1.2. Similarly, TLS 1.2 and lower cipher suites cannot be used with TLS 1.3 (IETF TLS 1.3 draft 21). BoringSSL also hard-codes cipher preferences in this order for TLS 1.3.*
