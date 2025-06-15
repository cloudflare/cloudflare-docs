---
_build:
  publishResources: false
  render: never
  list: never

name: "WebCrypto preserve publicExponent field"
sort_date: "2023-12-01"
enable_date: "2023-12-01"
enable_flag: "crypto_preserve_public_exponent"
disable_flag: "no_crypto_preserve_public_exponent"
---

In the WebCrypto API, the `publicExponent` field of the algorithm of RSA keys would previously be an `ArrayBuffer`. Using this flag, `publicExponent` is a `Uint8Array` as mandated by the specification.
