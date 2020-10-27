---
order: 1
---

# IRR records

The [Internet Routing Registry (IRR)](http://www.irr.net/index.html) is a globally distributed database of routing information. The IRR contains announced routes and routing policy in a common format. Network operators use this information to configure their backbone routers.

The IRR consists of many individual [routing registries](http://www.irr.net/docs/list.html), some managed by regional entities, such as APNIC, ARIN, and  RIPE. Each routing registry contains IRR entries that provide information about IP prefixes and the [autonomous systems](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) that are authorized to announce them.

To announce your subnet prefixes, Cloudflare requires accurate IRR entries for your prefixes and autonomous system numbers (ASNs).

When you configure network infrastructure for services such as [Magic Transit](https://developers.cloudflare.com/magic-transit/about), [verify your IRR entries](/irr-records/verify-irr-entries).

When you add missing IRR entries or update inaccurate ones, use these [best practices](/irr-records/best-practices-for-irr-entry-updates).
