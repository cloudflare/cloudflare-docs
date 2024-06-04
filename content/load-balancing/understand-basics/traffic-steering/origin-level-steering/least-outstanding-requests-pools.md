---
pcx_content_type: concept
title: Least Outstanding Requests
weight: 4
meta:
  title: Least Outstanding Requests steering - Endpoint-level steering
---

# Least Outstanding Requests steering

**Least Outstanding Requests steering** allows you to route traffic to endpoints that currently have the lowest number of outstanding requests.

This steering policy selects an endpoint by taking into consideration endpoint weights, as well as each endpoint's number of in-flight requests. Endpoints with more pending requests are weighted proportionately less in relation to others.

Least Outstanding Requests steering is best to use if your endpoints are easily overwhelmed by a spike in concurrent requests. It supports [adaptive routing](/load-balancing/understand-basics/adaptive-routing/) and [session affinity](/load-balancing/understand-basics/session-affinity/).

## Configure via the API

```json
---
header: Pools
---
{
  "origin_steering": {
    "policy": "least_outstanding_requests"
  }
}
```

Refer to the [API documentation](/api/operations/load-balancer-pools-update-pool) for more information on the pool configuration.

{{<Aside type="note">}}
Least Outstanding Requests steering can also be configured on a load balancer as a [global traffic steering policy](/load-balancing/understand-basics/traffic-steering/steering-policies/least-outstanding-requests/), taking into account outstanding request counts and `random_steering` weights for pools on the load balancer.
{{</Aside>}}

## Limitations

Least Outstanding Requests steering can be configured for pools that are part of [DNS-only load balancers](/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing), but is only supported in a no-operation form. When endpoint steering logic is applied for a pool on a DNS-only load balancer, all endpoint outstanding request counts are considered to be zero, meaning traffic is served solely based on endpoint weights.

Although it is configurable, it is not recommended to associate pools that use Least Outstanding Requests steering with DNS-only load balancers due to its partial support.
