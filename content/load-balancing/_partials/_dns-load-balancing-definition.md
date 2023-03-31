---
_build:
  publishResources: false
  render: never
  list: never
---

DNS-only load balancers route traffic by returning specific IP addresses in response to a client's DNS query.

When a client visits your application, Cloudflare provides the address for a healthy origin server (determined by your [traffic steering policy](/load-balancing/understand-basics/traffic-steering/steering-policies/) and [origin-level steering policy](/load-balancing/understand-basics/traffic-steering/origin-level-steering/)). However, Cloudflare relies on DNS resolvers respecting the short TTL to re-query Cloudflare's DNS for an updated list of healthy addresses. If a client has a cached DNS response, they will go to their previous destination, potentially ignoring your load balancer.

Cloudflare performs DNS-only load balancing when traffic to your hostname is **not proxied** through Cloudflare. In the **Load Balancing** dashboard, these load balancers are marked with a gray cloud.

![DNS-only load balancers are marked with a gray cloud](/load-balancing/static/images/dns-only-load-balancer.png)