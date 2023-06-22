---
_build:
  publishResources: false
  render: never
  list: never
---

Least Outstanding Request Steering allows you to route traffic to pools or origin servers that currently have the lowest amount of outstanding requests. The origin weights are scaled proportionally by the ratio of active connections. 

During instances in which you have a large difference between the size of requests or time to process them, Least Outstanding Request Steering ensures that traffic is evenly distributed, preventing legitimate customer traffic from taking down specific servers. It works at the pool and origin level, and takes into account the [pool's health status](/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy), [adaptive routing](/load-balancing/understand-basics/adaptive-routing/), and [session affinity](/load-balancing/understand-basics/session-affinity/).

Least Outstanding Request Steering selects a pool by taking into consideration `random_steering` weights, as well as each pool’s number of outstanding requests. Pools with more pending requests are weighted proportionately less in relation to others.
