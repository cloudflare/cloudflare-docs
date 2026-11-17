---
_build:
  publishResources: false
  render: never
  list: never

name: "Ed25519 `crypto.subtle.verify()` returns false for small-order points and wrong-length signatures"
sort_date: "2027-01-12"
enable_date: "2027-01-12"
enable_flag: "webcrypto_ed25519_spec_verify"
disable_flag: "no_webcrypto_ed25519_spec_verify"
---

This flag makes [`crypto.subtle.verify()`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify) with an Ed25519 key follow the [Web Cryptography spec](https://w3c.github.io/webcrypto/#ed25519) in two places. It also applies to keys imported under the legacy `NODE-ED25519` name. `node:crypto` is not affected.

- If the public key or the first half of the signature (R) encodes a point of small order, `verify()` returns `false`. These points used to be accepted, so a signature from a small-order public key could verify for several different messages.
- If the signature is not 64 bytes long, `verify()` returns `false`. It used to reject with an `OperationError`.
