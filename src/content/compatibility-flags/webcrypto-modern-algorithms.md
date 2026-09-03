---
_build:
  publishResources: false
  render: never
  list: never

name: "Web Crypto modern algorithms"
sort_date: "2026-09-28"
experimental: true
enable_flag: "webcrypto_modern_algorithms"
---

Enables the Workers subset of the evolving [Modern Algorithms in the Web Cryptography API](https://wicg.github.io/webcrypto-modern-algos/) draft. This subset includes:

- ML-KEM and ML-DSA.
- Key encapsulation and decapsulation methods.
- `getPublicKey()` and `SubtleCrypto.supports()`.
- JSON Web Keys (JWKs) with the `AKP` key type.

Workers does not implement the full proposal. The API may change as the draft evolves. Refer to [Supported algorithms](/workers/runtime-apis/web-crypto/#supported-algorithms) for current support.
