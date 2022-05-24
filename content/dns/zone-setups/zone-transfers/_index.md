---
pcx-content-type: navigation
title: DNS Zone transfers
weight: 3
meta:
   title: Zone transfers - Multi-provider DNS
---

# DNS Zone Transfers

To increase availability and fault tolerance, you can use an additional DNS provider alongside Cloudflare in case one provider becomes unavailable (known as a [peer DNS server](#peer-dns-server)). Your providers will then transfer DNS records between themselves using [AXFR](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR](https://datatracker.ietf.org/doc/html/rfc1995).

With zone transfers, you have two configuration options:

- [Cloudflare as Primary](/dns/zone-setups/zone-transfers/cloudflare-as-primary/): Cloudflare is your primary DNS provider and performs outgoing zone transfers to your secondary DNS provider.
- [Cloudflare as Secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/): Cloudflare is your secondary DNS provider and initiates incoming zone transfers from your primary DNS provider.

## Peer DNS server

Peer DNS servers can be used as primary and secondary external DNS servers. The same peer can be linked to multiple primary and secondary zones. Each peer can be associated with only one Transaction Signature (TSIG).

## Availability

Zone transfers are only available to customers on an Enterprise plan.