---
_build:
  publishResources: false
  render: never
  list: never
---

Least Outstanding Request Steering supports [DNS-only load balancers](/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), but in a no-operation, dummy form. This will allow all counters acting as zero to serve traffic according to the origin weight. 

Although it is still supported, it is not recommended to use Least Outstanding Request Steering for DNS-only load balancers since Cloudflare will always consider outstanding requests to be zero.