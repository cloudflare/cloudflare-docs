---
pcx-content-type: concept
title: Cloudflare as Secondary
weight: 2
---

# Secondary DNS - Incoming Zone Transfers

With incoming zone transfers, you can keep your primary DNS provider and use Cloudflare as a secondary DNS provider. 

When you make edits in your primary DNS provider, those DNS records will be transferred from your primary DNS provider to Cloudflare via zone transfer using [AXFR](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR](https://datatracker.ietf.org/doc/html/rfc1995).

## How to

- [Initial setup](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/)
- [Proxy secondary traffic (secondary DNS override)](https://support.cloudflare.com/hc/articles/360042169091)

## Availability

Secondary DNS is only available to Enterprise customers. For more details on activation and pricing, contact your account team.
