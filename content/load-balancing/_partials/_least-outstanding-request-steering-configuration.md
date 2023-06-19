---
_build:
  publishResources: false
  render: never
  list: never
---

```json
---
header: Load Balancer
---
{
 "steering_policy": "least_outstanding_requests"
}
```

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
