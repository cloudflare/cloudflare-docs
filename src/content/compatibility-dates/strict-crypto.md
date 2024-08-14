---
_build:
  publishResources: false
  render: never
  list: never

name: "Strict crypto error checking"
# sort date increased by 2, noCfBotManagementDefault and strictCompression have
# the same compatibility date but was added earlier.
sort_date: "2023-08-03"
enable_date: "2023-08-01"
enable_flag: "strict_crypto_checks"
disable_flag: "no_strict_crypto_checks"
---

Perform additional error checking in the Web Crypto API to conform with the specification and reject possibly unsafe key parameters:
- For RSA key generation, key sizes are required to be multiples of 128 bits as boringssl may otherwise truncate the key.
- The size of imported RSA keys must be at least 256 bits and at most 16384 bits, as with newly generated keys.
- The public exponent for imported RSA keys is restricted to the commonly used values `[3, 17, 37, 65537]`.
- In conformance with the specification, an error will be thrown when trying to import a public ECDH key with non-empty usages.
