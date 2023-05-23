---
pcx_content_type: concept
title: How it works
weight: 1
meta:
    title: How Orange-to-Orange (O2O) works
---

# How Orange-to-Orange (O2O) works

Orange-to-orange (O2O) is when a Cloudflare zone sends proxied traffic to another Cloudflare zone through Cloudflare.

## Without O2O

Without O2O, the settings of your SaaS provider override whatever settings are applied to your own Cloudflare zone.

```mermaid
graph TD
accTitle: Your zone using a SaaS provider (and without O2O)

A[Website visitor]
B[SaaS provider owned Cloudflare account]
C[SaaS provider origin]

A --CF Proxy--> B
B --> C
```

## With O2O

With O2O, Cloudflare can apply the settings specified by both you and your SaaS provider.

