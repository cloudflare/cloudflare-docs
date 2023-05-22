---
pcx_content_type: concept
title: Standard
weight: 1
meta:
  title: Standard traffic steering policies
---

# Standard steering policies

Standard steering policies include **Off - Failover** and **Random**.

These are the only steering policies available to non-Enterprise customers who have not purchased **Traffic Steering**.

## Off - Failover

Failover steering uses the pool order to determine failover priority (the failover order).

Failover directs traffic from unhealthy pools — determined by [health checks](/load-balancing/understand-basics/monitors/) and the **Health Threshold** — to the next healthy pool in the configuration. Customers commonly use this option to set up [active - passive failover](/load-balancing/reference/common-configurations/#active---passive-failover).

If all pools are marked unhealthy, Load Balancing will direct traffic to the fallback pool. The default fallback pool is the last pool listed in the Load Balancing configuration.

If no monitors are attached to the load balancer, it will direct traffic to the primary pool exclusively.

## Random steering

Choose **Random** to route traffic to a healthy pool at random. Customers can use this option to set up [active - active failover](/load-balancing/reference/common-configurations/#active---active-failover) (also known as round robin), where traffic is split equally between multiple pools.

Similar to setting Weights to direct the amount of traffic going to each origin server, customers can also set Weights on pools via the [API's](/api/operations/load-balancers-create-load-balancer) `random_steering` object to determine the percentage of traffic sent to each pool.
