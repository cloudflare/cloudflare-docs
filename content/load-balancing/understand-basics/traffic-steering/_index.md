---
pcx_content_type: concept
title: Traffic steering
weight: 4
---

# Traffic steering

When requests come to your load balancer, it distributes them across your pools and origins according to three factors:

1.  [Pool and origin health](/load-balancing/understand-basics/health-details/): Traffic decisions start with which pools and origins are available and should receive traffic.
2.  [Traffic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/): Policies set on your [load balancer](/load-balancing/understand-basics/load-balancers/) that route traffic to attached and available pools.
3.  [Origin steering](/load-balancing/understand-basics/traffic-steering/origin-level-steering/): These are policies set on each [pool](/load-balancing/understand-basics/pools/) that route traffic to available origin servers within the pool.

When a pool or origin becomes unhealthy, your load balancer and pools redistribute traffic according to these same policies.
