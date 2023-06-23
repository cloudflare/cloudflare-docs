---
_build:
  publishResources: false
  render: never
  list: never
---

```json
---
header: Load Balancers
---
{
 "steering_policy": "least_outstanding_requests"
}
```
Refer to the [API documentation](/api/operations/load-balancers-update-load-balancer) for more information on the load balancer configuration.

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