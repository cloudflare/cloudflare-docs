---
pcx_content_type: concept
title: Key Management
weight: 1
---

# Key Management

Cloudflare offers [Keyless SSL](https://www.cloudflare.com/ssl/keyless-ssl/) and [Geo Key Manager](/ssl/edge-certificates/custom-certificates#geo-key-manager-private-key-restriction), which ensures that private SSL/TLS key material stays in your intended region. Keyless SSL ensures that Cloudflare never has possession of the private key material at all; Geo Key Manager uses Keyless SSL to ensure the keys never leave the specified region.

To learn more about our Data Localization Suite offerings, please check our [blog post](https://blog.cloudflare.com/introducing-the-customer-metadata-boundary/).