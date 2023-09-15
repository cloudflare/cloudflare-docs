---
_build:
  publishResources: false
  render: never
  list: never
---

Origin steering customizes how each [pool](/load-balancing/understand-basics/pools/) distributes requests to its associated origins.

These distributions are a combination of two properties:

- The origin steering [policy](#policies) chosen for your pool.
- The [weights](#weights) assigned to each origin server.

{{<Aside type="note">}}

If an origin [becomes unhealthy](/load-balancing/understand-basics/health-details/), your pool will also re-balance traffic according to its steering policy.

{{</Aside>}}