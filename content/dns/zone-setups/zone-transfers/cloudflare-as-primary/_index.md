---
pcx_content_type: concept
title: Cloudflare as Primary
weight: 1
---

# Primary DNS - Outgoing Zone Transfers

With outgoing zone transfers, you can use Cloudflare as your primary DNS provider and configure one or more peer DNS servers as secondary DNS providers.

When you [make edits](/dns/manage-dns-records/how-to/create-dns-records/) to Cloudflare DNS, those DNS records will be transferred from Cloudflare to your secondary provider via zone transfer using [AXFR](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR](https://datatracker.ietf.org/doc/html/rfc1995)

![With Cloudflare as your primary provider in a multi-provider setup, Cloudflare periodically transfers records to your secondary DNS provider.](/dns/static/cloudflare-as-primary.png)

## How to

- [Set up outgoing zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-primary/setup/)

## Availability

Outgoing zone transfers are available to Enterprise customers who are currently using Cloudflare as their [authoritative DNS provider](/dns/zone-setups/full-setup/). For more details on activation and pricing, contact your account team.

## Notes

If you use [Cloudflare Load Balancing](/load-balancing/), only proxied Load Balancer DNS records will be transferred.
