---
title: Internet Routing Registry
pcx_content_type: concept
---

# Internet Routing Registry

The [Internet Routing Registry (IRR)](http://www.irr.net/index.html) is a globally distributed database of routing information. The IRR contains announced routes and routing policies in a common format, and network operators use this information to configure their backbone routers.

The IRR consists of many individual [routing registries](http://www.irr.net/docs/list.html), and some are managed by regional entities, such as APNIC, ARIN, and RIPE. Each routing registry contains IRR entries that provide information about IP prefixes and the [autonomous systems](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) authorized to announce them.

To announce your subnet prefixes, Cloudflare requires accurate IRR entries for your prefixes and autonomous system numbers (ASNs).

When you configure network infrastructure for services such as [Magic Transit](/magic-transit/about/), [verify your IRR entries](/byoip/how-to/verify-irr-entries/).

For help with adding missing IRR entries or updating inaccurate entries, refer to the [best practices for IRR entries](/byoip/best-practices/irr-entries/).
