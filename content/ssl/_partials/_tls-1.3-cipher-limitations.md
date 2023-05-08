---
_build:
  publishResources: false
  render: never
  list: never
---

You cannot [set](/ssl/reference/cipher-suites/customize-cipher-suites/) specific TLS 1.3 ciphers.

Instead, you will need to enable [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) for your entire domain and Cloudflare will use [all applicable TLS 1.3 cipher suites](/ssl/reference/cipher-suites/supported-cipher-suites/).

In combination with this, you can still restrict specific ciphers for TLS 1.0-1.2.