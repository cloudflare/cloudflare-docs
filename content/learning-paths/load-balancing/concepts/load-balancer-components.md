---
title: Components of a load balancer
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

At it's most basic, load balancing is made up of three components:

- **Pools**: Which contain one or more endpoints.
- **Endpoints**: Which respond to individual requests.
- **A load balancer**: Which decides which traffic goes to each pool.

## How it works

Normally, requests to your application would go to individual servers directly.

With a load balancer, requests first go through the load balancer. Your load balancer then routes requests to specific pools.

{{<render file=_load-balancing-diagram.md productFolder="load-balancing">}}
<br/>

Within each pool, requests then go to individual endpoints. And that endpoint is what responds to the request.

```mermaid
    flowchart LR
      accTitle: Pool traffic flow
      accDescr: When an incoming request reaches a pool, it then goes to an endpoint within the pool.
    A[Request 1] --Routed by pool--> Endpoint2
      subgraph P1 [Pool]
        Endpoint1((Endpoint 1))
        Endpoint2((Endpoint 2))
      end
```
<br/>

This progression of load balancer --> pool --> endpoint is the core part of how a load balancer works.