---
_build:
  publishResources: false
  render: never
  list: never
---

Layer 7 load balancers direct traffic to specific servers based on information present in each HTTP/HTTPS request (HTTP headers, URI, cookies, type of data, etc.).

When a client visits your application, Cloudflare directs their request to a healthy origin server (determined by your [traffic steering policy](/load-balancing/understand-basics/traffic-steering/steering-policies/) and [origin weights](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights)).

Cloudflare performs layer 7 load balancing when traffic to your hostname is **proxied** through Cloudflare. In the **Load Balancing** dashboard, these load balancers are marked with an orange cloud.

![DNS-only load balancers are marked with an orange cloud](/images/load-balancing/proxied-load-balancer.png)