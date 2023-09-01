---
_build:
  publishResources: false
  render: never
  list: never
---

A monitor issues health monitor requests at regular intervals to evaluate the health of each server within an [origin pool](/load-balancing/understand-basics/pools/).

When a pool [becomes unhealthy](/load-balancing/understand-basics/health-details/), your load balancer takes that pool out of the server rotation.