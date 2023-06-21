---
title: Certificate pinning
pcx_content_type: reference
weight: 8
meta:
    description: Learn why Cloudflare does not support HTTP public key pinning (HPKP) and consider an alternative solution to prevent certificate misissuance.
---

# Certificate pinning

Cloudflare does not support HTTP public key pinning (HPKP)[^1] for Universal, Advanced, or Custom Hostname certificates.

This is because Cloudflare regularly changes the edge certificates provisioned for your domain and - if you had HPKP enabled - your domain would go offline. Additionally, [industry experts](https://scotthelme.co.uk/im-giving-up-on-hpkp/) discourage using HPKP.

For a better solution to the problem that HPKP is trying to solve - preventing certificate misissuance - use [Certificate Transparency Monitoring](/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/).

[^1]: Key pinning allows a host to instruct a browser to only accept certain public keys when communicating with it for a given period of time.