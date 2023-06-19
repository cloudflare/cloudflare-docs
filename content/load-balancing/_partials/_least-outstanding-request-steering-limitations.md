---
_build:
  publishResources: false
  render: never
  list: never
---

Least Outstanding Request Steering supports gray load balancers, but in a no-op, dummy form. This will allow all counters acting as zero to serve traffic according to the origin weight. 

Although it is still supported, it is not recommended to use Least Outstanding Request Steering for gray load balancers since Cloudflare will always consider outstanding requests to be 0.