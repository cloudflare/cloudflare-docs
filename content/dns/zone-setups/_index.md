---
pcx-content-type: concept
title: Zone setups
weight: 3
---

# Zone setups

When using Cloudflare DNS, you have three main options for setup:

*   [Full setup](/dns/zone-setups/full-setup/) (most common): Use Cloudflare as your primary DNS provider and manage your DNS records on Cloudflare.
*   [Partial (CNAME) setup](/dns/zone-setups/partial-setup/): Keep your primary DNS provider and only use Cloudflare's reverse proxy for individual subdomains.
*   [Zone transfers](/dns/zone-setups/zone-transfers/): Use Cloudflare and another DNS provider together across your entire zone to increase availability and fault tolerance. DNS records will be transferred between providers using [AXFR](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR](https://datatracker.ietf.org/doc/html/rfc1995).

{{<Aside type="note" header="Note:">}}

If you run your own authoritative nameservers but still want to benefit from Cloudflare's global Anycast network, check out [DNS Firewall](/dns/dns-firewall/).

{{</Aside>}}
