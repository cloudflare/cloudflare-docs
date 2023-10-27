---
pcx_content_type: concept
title: Least connections
weight: 6
meta:
  title: Least connections steering
---

# Least connections steering

**Least connections steering** allows you to route traffic to pools that currently have the lowest number of open (including idle or active) connections.

{{<render file="_lcs-http2-callout.md">}}

This steering policy selects a pool by taking into consideration `random_steering` weights, as well as each pool's number of open connections. Pools with more connections are weighted proportionately less in relation to others.

Least connections steering is best to use if your pools are easily overwhelmed by a spike in concurrent requests. This steering method lends itself to applications that value server health above latency, geographic alignment, or other metrics. It takes into account the [pool's health status](/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy), [adaptive routing](/load-balancing/understand-basics/adaptive-routing/), and [session affinity](/load-balancing/understand-basics/session-affinity/).

## Configure via the API

```json
---
header: Load Balancers
---
{
  "steering_policy": "least_connections"
}
```

Refer to the [API documentation](/api/operations/load-balancers-update-load-balancer) for more information on the load balancer configuration.
  
{{<Aside type="note">}}
Least connections steering can also be configured on a pool as an [origin steering policy](/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-connections-origin/), taking into account connection counts and weights for origins within the pool.
{{</Aside>}}

## Limitations

Least connections steering can be configured for [DNS-only load balancers](/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), but is only supported in a no-operation, dummy form. For DNS-only load balancers, all pool connection counts are considered to be zero, meaning traffic is served solely based on `random_steering` weights.

Although it is configurable, it is not recommended to use least connections steering for DNS-only load balancers due to its partial support.