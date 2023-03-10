---
pcx_content_type: overview
title: DNS Firewall
weight: 9
---

# DNS Firewall

{{<description>}}
Speed up and protect entire authoritative nameservers
{{</description>}}

{{<plan type="ent-add-on">}}

Cloudflare DNS Firewall proxies all DNS queries to your nameservers through Cloudflare’s global edge network. This action protects upstream nameservers from DDoS attacks and reduces load by caching DNS responses.

![Diagram showing protection provided by DNS Firewall. For more details, read further.](/dns/static/dns-firewall-overview.png)

DNS Firewall is for customers who need to speed up and protect entire authoritative nameservers. If you need to speed up and protect individual zones, see Cloudflare DNS [Zone Setups](/dns/zone-setups).

---

## How DNS Firewall works

When a DNS query for your domain takes place:

1. Queries go to the Cloudflare data center that is closest to the website visitor. This is determined by the location of the DNS resolver.
2. Cloudflare tries to return a DNS response from cache.
3. If the response is not available in cache, Cloudflare queries the upstream authoritative nameservers.
4. After returning the response from the nameservers, Cloudflare temporarily caches it for subsequent DNS queries.

---

## Benefits

DNS Firewall provides the following benefits while allowing your organization total control over your authoritative nameservers:

* DDoS mitigation
* High availability
* Global distribution
* Enhanced performance
* Bandwidth savings
* Rate limiting per data center
* Minimum and maximum cache TTL specification
* DNS [ANY](https://datatracker.ietf.org/doc/html/rfc8482) query type block