---
_build:
  publishResources: false
  render: never
  list: never
---

In comparison to DNS-only load balancing, layer 7 load balancing:

- Protects origin servers from DDoS attacks by hiding their IP addresses.
- Offers faster failover and more accurate routing, which can otherwise be affected by DNS caching.
- Integrates with other Cloudflare features such as caching, Workers, and the WAF.
- Reduces authoritative queries against Cloudflare, which can potentially save money for customers with usage-based billing.
- Supports customized [session affinity](/load-balancing/understand-basics/session-affinity/) and [origin drain](/load-balancing/understand-basics/session-affinity/#origin-drain).
- More accurately geo-locates traffic, using the data center associated with the user making the request instead of the data center associated with a user's recursive resolver.