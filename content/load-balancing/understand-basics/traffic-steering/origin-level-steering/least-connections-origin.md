---
pcx_content_type: concept
title: Least connections
weight: 5
meta:
  title: Least connections steering - Origin steering
---

# Least connections steering

**Least connections steering** allows you to route traffic to origins that currently have the lowest number of open (including idle or active) connections.

{{<render file="_lcs-http2-callout.md">}}

This steering policy selects an origin by taking into consideration [origin weights](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights), as well as each origin's number of open connections. Origins with more connections are weighted proportionately less in relation to others.

Least connections steering is best to use if your origins are easily overwhelmed by a spike in concurrent requests. It supports [adaptive routing](/load-balancing/understand-basics/adaptive-routing/) and [session affinity](/load-balancing/understand-basics/session-affinity/).

## Configure via the API

```json
---
header: Pools
---
{
  "origin_steering": {
    "policy": "least_connections"
  }
}
```

Refer to the [API documentation](/api/operations/load-balancer-pools-update-pool) for more information on the pool configuration.
    
{{<Aside type="note">}}
Least connections steering can also be configured on a load balancer as a [steering policy](/load-balancing/understand-basics/traffic-steering/steering-policies/least-connections/), taking into account connection counts and `random_steering` weights for pools on the load balancer.
{{</Aside>}}

## Limitations

Least connections steering can be configured for pools that are part of [DNS-only load balancers](/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), but is only supported in a no-operation, dummy form. When origin steering logic is applied for a pool on a DNS-only load balancer, all origin connection counts are considered to be zero, meaning traffic is served solely based on origin weights.

Although it is configurable, it is not recommended to associate pools that use least connections steering with DNS-only load balancers due to its partial support.
