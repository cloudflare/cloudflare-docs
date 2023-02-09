---
title: Data Security
weight: 2
pcx_content_type: concept
---

# Data Security

This page details the data security properties of R2, including encryption-at-rest (EAR), encryption-in-transit (EIT), and Cloudflare's compliance certifications.

## Encryption at Rest 

All objects stored in R2, including their metadata, are encrypted at rest. Encryption and decryption are automatic, do not require user configuration to enable, and do not impact the effective performance of R2.

Encryption keys are managed by Cloudflare and securely stored in the same key management systems we use for managing encrypted data across Cloudflare internally.

Objects are encrypted using [AES-256](https://www.cloudflare.com/learning/ssl/what-is-encryption/), a widely tested, highly performant and industry-standard encryption algorithm. R2 uses GCM (Galois/Counter Mode) as its preferred mode.

## Encryption in Transit

Data transfer between a client and R2 is secured using the same [Transport Layer Security](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) (TLS/SSL) supported on all Cloudflare domains.

Access over plaintext HTTP (without TLS/SSL) can be disabled by connecting a [custom domain](https://developers.cloudflare.com/r2/data-access/public-buckets/#custom-domains) to your R2 bucket and enabling [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/).

## Compliance

To learn more about Cloudflare's adherence to industry-standard security compliance certifications, visit the Cloudflare [Trust Hub](https://www.cloudflare.com/trust-hub/compliance-resources/).
