---
pcx_content_type: concept
title: How it works
weight: 1
meta:
    title: How Orange-to-Orange (O2O) works
---

# How Orange-to-Orange (O2O) works

Orange-to-orange (O2O) is when a Cloudflare zone sends proxied traffic to another Cloudflare zone through Cloudflare.

This setup is commonly used when a Cloudflare Enterprise customer sending traffic to a [Cloudflare for SaaS customer](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/).

```mermaid
graph TD
accTitle: Orange-to-orange process diagram

A[Website visitor]

subgraph Cloudflare
  B[Customer zone]
  C[SaaS zone]
end

D[SaaS Origin]

A -->|CF Proxy| B
B -->|"CF Proxy (Orange-to-Orange)"| C
C --> D
```