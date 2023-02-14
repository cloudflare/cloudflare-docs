---
title: Routing
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

Before, we mentioned that load balancers forward requests to pools and pools forward those requests to individual servers.

What we did not mention, however, was how the load balancer and pools make those "routing" decisions.

## How it works

There are four main components to routing:

1. How the load balancer distributes requests to pools.
2. How the pools distribute requests to individual servers.
3. The health of servers and pools.
4. Specialized routing requirements.

At Cloudflare, a load balancer's [steering policy](/load-balancing/understand-basics/traffic-steering/steering-policies/) controls how the load balancer distributes requests to pools. Routing decisions can be based on proximity, pool performance, geography, and more.

Then, [origin steering options](/load-balancing/understand-basics/traffic-steering/origin-level-steering/) controls how each pool distributes requests to the servers in the pool.

If a server or pool [becomes unhealthy](/load-balancing/understand-basics/health-details/), the load balancer will adjust routing accordingly.

Finally, specific settings can also affect the ways a load balancer distributes traffic, such as:

- Routing based on [specific aspects](/load-balancing/additional-options/load-balancing-rules/) of the request.
- Sending all requests from a [specific end user](/load-balancing/understand-basics/session-affinity/) to the same server, preserving information about their user session like items in a shopping cart.