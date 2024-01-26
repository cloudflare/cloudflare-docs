---
pcx_content_type: concept
title: Key Management
weight: 1
---

# Key Management

Cloudflare provides two key management solutions: [Geo Key Manager](/ssl/edge-certificates/custom-certificates#geo-key-manager-private-key-restriction) and [Keyless SSL](/ssl/keyless-ssl/) to ensure that private SSL/TLS key material remains in designated regions.

- [Geo Key Manager](/data-localization/key-management/geo-key-manager/): uses Keyless SSL to ensure the keys remain within the specified region, ensuring compliance and data sovereignty.

- [Keyless SSL](/data-localization/key-management/keyless-ssl/): guarantees that Cloudflare never possesses the private key material, enhancing security.