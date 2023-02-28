---
title: Routing traffic
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

Before, we covered how requests move from load balancers to pools and then from pools to individual servers.

What we did not mention, however, was *how* the load balancer and pools make those decisions.

This is a concept known as routing.

## How it works

Generally, there are five questions involved with routing:

1. By default, how does the load balancer distributes requests to pools?
2. By default, how do pools distribute requests to individual servers?
3. Within a pool, which servers are healthy?
4. Within a load balancer, which pools are healthy?
5. Are there any specialized routing rules?

### Distributing requests to pools

A load balancer's [steering policy](/load-balancing/understand-basics/traffic-steering/steering-policies/) controls how the load balancer distributes requests to pools.

Routing decisions can be based on proximity, pool performance, geography, and more.

### Distributing requests within pools

Once the request reaches a pool, that pool's [origin steering policy](/load-balancing/understand-basics/traffic-steering/origin-level-steering/) control how each pool distributes requests to the servers in the pool.

These decisions can be based on default percentages of traffic sent to individual servers (also known as the **Weight**), aspects of the request (such as source IP address), or both.

### Server health

If a server fails a health check - which would mark it as unhealthy - its pool will adjust routing according to its origin steering policy.

Both new and existing requests will go to healthy servers in the pool, ignoring the unhealthy server.

### Pool health

With enough unhealthy servers, the pool itself may be considered unhealthy as well.

{{<render file=_unhealthy-pool-traffic-distribution.md productFolder="load-balancing">}}

#### Fallback pools

Often, load balancers have a special pool known as the **Fallback Pool**, which receives traffic no matter what.

{{<render file=_fallback-pools.md productFolder="load-balancing">}}

### Specialized routing

Finally, specific settings can also affect the ways a load balancer distributes traffic, such as:

- Routing based on [specific aspects](/load-balancing/additional-options/load-balancing-rules/) of the request.
- Sending all requests from a [specific end user](/load-balancing/understand-basics/session-affinity/) to the same server, preserving information about their user session like items in a shopping cart.