---
_build:
  publishResources: false
  render: never
  list: never
---

In comparison to proxied, layer 7 load balancing, DNS-only load balancing:

- Does not hide the IP addresses of your origin servers, leaving them vulnerable to DDoS attacks.
- Performs slower failover and less accurate routing, because it has to rely on DNS resolvers and cache settings.
- Cannot integrate with other Cloudflare features such as caching, Workers, and the WAF.
- Increases authoritative queries against Cloudflare, which can potentially cost more for customers with usage-based billing.
- Supports standard [session affinity](/load-balancing/understand-basics/session-affinity/).
- Geo-locates traffic based on the data center associated with the ECS source address, if available. If not available, geo-locates based a user's recursive resolver, which can sometimes cause issues with [latency-based steering](/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering/).