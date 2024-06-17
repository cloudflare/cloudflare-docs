---
pcx_content_type: concept
title: Least outstanding requests
weight: 5
meta:
  title: Least outstanding requests steering - Steering policies
---

# Least outstanding requests steering

**Least outstanding requests steering** allows you to route traffic to pools that currently have the lowest number of outstanding requests.

This steering policy selects a pool by taking into consideration [`random_steering` weights](/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#random-steering), as well as each pool's number of in-flight requests. Pools with more pending requests are weighted proportionately less in relation to others.

Least outstanding requests steering is best to use if your pools are easily overwhelmed by a spike in concurrent requests. This steering method lends itself to applications that value server health above latency, geographic alignment, or other metrics. It takes into account the [pool's health status](/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy), [adaptive routing](/load-balancing/understand-basics/adaptive-routing/), and [session affinity](/load-balancing/understand-basics/session-affinity/).

## Configure via the API

```json
---
header: Load Balancers
---
{
  "steering_policy": "least_outstanding_requests"
}
```

Refer to the [API documentation](/api/operations/load-balancers-update-load-balancer) for more information on the load balancer configuration.

{{<Aside type="note">}}
Least outstanding requests steering can also be configured on a pool as a [local traffic steering policy](/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools/), taking into account outstanding request counts and weights for endpoints within the pool.
{{</Aside>}}

## Limitations

Least outstanding requests steering can be configured for [DNS-only load balancers](/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), but is only supported in a no-operation form. For DNS-only load balancers, all pool outstanding request counts are considered to be zero, meaning traffic is served solely based on [`random_steering` weights](/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#random-steering).

Although it is configurable, it is not recommended to use least outstanding requests steering for DNS-only load balancers due to its partial support.
