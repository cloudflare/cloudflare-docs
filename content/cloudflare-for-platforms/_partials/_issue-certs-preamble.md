---
_build:
  publishResources: false
  render: never
  list: never
---

For each custom hostname, Cloudflare issues two certificates bundled in chains that maximize browser compatibility (unless you [upload custom certificates](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/custom-certificates/uploading-certificates/)). 

The primary certificate uses a P-256 key, is SHA-2/ECDSA signed, and will be presented to browsers that support elliptic curve cryptography (ECC). The secondary or fallback certificate uses an RSA 2048-bit key, is SHA-2/RSA signed, and will be presented to browsers that do not support ECC.
