---
title: Data security
pcx_content_type: concept
weight: 8
---

# Data security

This page details the data security properties of D1, including:

* Encryption-at-rest (EAR).
* Encryption-in-transit (EIT).
* Cloudflare's compliance certifications.

## Encryption at Rest

All objects stored in D1, including metadata, live databases, and inactive databases are encrypted at rest. Encryption and decryption are automatic, do not require user configuration to enable, and do not impact the effective performance of D1.

Encryption keys are managed by Cloudflare and securely stored in the same key management systems we use for managing encrypted data across Cloudflare internally.

Objects are encrypted using [AES-256](https://www.cloudflare.com/learning/ssl/what-is-encryption/), a widely tested, highly performant and industry-standard encryption algorithm. D1 uses GCM (Galois/Counter Mode) as its preferred mode.

## Encryption in Transit

Data transfer between a Cloudflare Worker, and/or between nodes within the Cloudflare network and D1 is secured using the same [Transport Layer Security](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) (TLS/SSL).

API access via the HTTP API or using the [wrangler](/workers/wrangler/install-and-update/) command-line interface is also over TLS/SSL (HTTPS).

## Compliance

To learn more about Cloudflare's adherence to industry-standard security compliance certifications, visit the Cloudflare [Trust Hub](https://www.cloudflare.com/trust-hub/compliance-resources/).
