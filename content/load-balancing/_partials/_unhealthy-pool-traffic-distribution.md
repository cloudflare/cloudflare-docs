---
_build:
  publishResources: false
  render: never
  list: never
---

When a pool reaches **Critical** health, your load balancer will begin diverting traffic according to its [Traffic steering policy](/load-balancing/understand-basics/traffic-steering/steering-policies/):

- **Off**:

  - If the active pool becomes unhealthy, traffic goes to the next pool in order.
  - If an inactive pool becomes unhealthy, traffic continues to go to the active pool (but would skip over the unhealthy pool in the failover order).

- **All other methods**: Traffic is distributed across all remaining pools according to the steering policy.