---
order: 3
pcx-content-type: concept
---

# Traffic steering

When requests come to your load balancer, it distributes them across your pools and origins according to three factors:

1. [Pool and origin health](/understand-basics/health-details): Traffic decisions start with which pools and origins are available and should receive traffic.
1. [Pool steering](pool-level-steering) (referred to as **Traffic Steering** in the dashboard): These are policies set on your [load balancer](/understand-basics/load-balancers) that route traffic to attached and available pools.
1. [Origin steering](origin-level-steering): These are policies set on each [pool](/understand-basics/pools) that route traffic to available origin servers within the pool.

When a pool or origin becomes unhealthy, your load balancer and pools redistribute traffic according to these same policies.