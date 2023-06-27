---
pcx_content_type: concept
title: Least Outstanding Requests
weight: 5
meta:
  title: Least Outstanding Requests steering
---

# Least Outstanding Requests steering

**Least Outstanding Requests Steering** allows you to route traffic to pools that currently have the fewest number of outstanding requests.

This steering policy selects a pool by taking into consideration `random_steering` weights, as well as each pool's number of in-flight requests. Pools with more pending requests are weighted proportionately less in relation to others.

Least Outstanding Requests Steering is best to use if your pools are easily overwhelmed by a spike in concurrent requests. This steering method lends itself to applications that value server health above latency, geographic alignment, or other metrics. It takes into account the [pool's health status](/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy), [adaptive routing](/load-balancing/understand-basics/adaptive-routing/), and [session affinity](/load-balancing/understand-basics/session-affinity/).

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
Least Outstanding Requests Steering can also be configured on a pool as an [origin steering policy](/load-balancing/understand-basics/traffic-steering/origin-level-steering/least-outstanding-requests-pools/), taking into account outstanding request counts and weights for origins within the pool.
{{</Aside>}}

## Limitations

Least Outstanding Requests steering can be configured for [DNS-only load balancers](/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), but is only supported in a no-operation, dummy form. For DNS-only load balancers, all pool outstanding request counts are considered to be zero, meaning traffic is served solely based on `random_steering` weights.

Although it is configurable, it is not recommended to use Least Outstanding Requests steering for DNS-only load balancers due to its partial support.
