---
pcx-content-type: configuration
title: Common load balancer configurations
---

# Common load balancer configurations

## Active - Passive Failover

An **active-passive failover** sends traffic to the servers in your active pool until a failure threshold (configurable) is reached. At the point of failure, your load balancer then redirects traffic to the passive pool.

This setup ensures uninterrupted service and helps with planned outtages, but it might lead to slower traffic overall.

To set up a load balancer with **active-passive failover**:

1.  Create a load balancer with two origin pools (`primary` and `secondary`).
2.  In the list of origin pools, set the following order:
    1.  `primary`
    2.  `secondary`
3.  For **Traffic Steering**, select [**Off**](/load-balancing/understand-basics/traffic-steering/pool-level-steering/#off---standard-failover).

With this setup, your load balancer will direct all traffic to `primary` until `primary` has fewer available origins than specified in its **Health Threshold**. Only then will your load balancer direct traffic to `secondary`.

In the event that all pools are marked down, Cloudflare uses the **fallback pool**, which is the option of last resort for successfully sending traffic to an origin. Since the fallback pool is a last resort, its health is not taken into account, and Cloudflare reports  its status as **No Health**. You can select the fallback pool via the API or in the Cloudflare dashboard. For more on working with fallback pools, refer to [Pool-level steering](/load-balancing/understand-basics/traffic-steering/pool-level-steering/).

## Active - Active Failover

An **active-active failover** distributes traffic to servers in the same pool until the pool reaches its failure threshold (configurable). At the point of failure, your load balancer would then re-direct traffic to the **fallback pool**.

This setup speeds up overall requests, but is more vulnerable to planned or unplanned outtages.

To set up a load balancer with **active-active failover**, either:

*   Create a load balancer with a single origin pool (`primary`) with multiple origins (`origin-1` and `origin-2`) and set the same [**Weight**](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) for each origin.
*   Create a load balancer with two origin pools (`primary` and `secondary`) and — for [**Traffic Steering**](/load-balancing/understand-basics/traffic-steering/pool-level-steering/) — select any option except for **Off**.

<Aside type='note'>

For more background reading on server failover and common configurations, see our <a href="https://www.cloudflare.com/learning/performance/what-is-server-failover/">Learning Center</a>.

</Aside>
