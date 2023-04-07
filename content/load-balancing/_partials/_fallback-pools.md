---
_build:
  publishResources: false
  render: never
  list: never
---

This pool is meant to be the pool of last resort, meaning that its health is not taken into account when directing traffic.

Fallback pools are important because traffic still might be coming to your load balancer even when all the pools are unreachable (disabled or unhealthy). Your load balancer needs somewhere to route this traffic, so it will send it to the fallback pool.