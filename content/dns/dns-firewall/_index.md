---
pcx_content_type: overview
title: DNS Firewall
weight: 9
layout: single
---

# DNS Firewall

Cloudflare DNS Firewall proxies all DNS queries to your nameservers through Cloudflare’s global edge network. This action protects upstream nameservers from DDoS attacks and reduces load by caching DNS responses.

DNS Firewall is for customers who need to speed up and protect entire authoritative nameservers, while [authoritative DNS](/dns/zone-setups/full-setup/) is for customers who need to speed up and protect individual zones.

## How it works

When a DNS query goes to your nameservers:

1.  Queries go to the closest Cloudflare data center to the website visitor (determined by the location of the used DNS resolver).
2.  Cloudflare tries to return a DNS response from cache.
3.  If the response is not available in cache, Cloudflare queries the upstream authoritative nameservers.
4.  Cloudflare temporarily caches the response for subsequent DNS queries.

## Benefits

DNS Firewall provides the following benefits while allowing organizations total control over their authoritative nameservers:

*   DDoS mitigation
*   High availability
*   Global distribution
*   Enhanced performance
*   Bandwidth savings
*   DNS caching
*   Rate limiting per data center
*   Specify minimum and maximum TTL
*   Block [ANY](https://datatracker.ietf.org/doc/html/rfc8482) queries

## Availability

{{<feature-table id="dns.dns_firewall">}}

## Resources

*   [Setup](/dns/dns-firewall/setup/)
*   [Analytics](/dns/dns-firewall/analytics/)
*   [Random prefix attack mitigation](/dns/dns-firewall/random-prefix-attacks/)
*   [FAQs](/dns/dns-firewall/faq/)
