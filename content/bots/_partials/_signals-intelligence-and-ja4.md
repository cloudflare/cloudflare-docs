---
_build:
  publishResources: false
  render: never
  list: never
---

If you want to use JA4 fingerprints and Signals Intelligence, your Workers script must be able to handle the absence of any field in the array, including:

- The possibility that the JA4 fingerprint could be missing.
- The possibility that the `ja4Signals` array could be missing.
- Results with `NaN` or `Infinity` values will be excluded from the array. 