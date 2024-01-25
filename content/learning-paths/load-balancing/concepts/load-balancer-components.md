---
title: Components of a load balancer
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

At it's most basic, load balancing is made up of three components:

- **Origin pools**: Which contain one or more servers.
- **Origin servers**: Which respond to individual requests.
- **A load balancer**: Which decides which traffic goes to each origin pool.

## How it works

Normally, requests to your application would go to individual servers directly.

With a load balancer, requests first go through the load balancer. Your load balancer then routes requests to specific pools.

{{<render file=_load-balancing-diagram.md productFolder="load-balancing">}}
<br/>

Within each pool, requests then go to individual servers. And that server is what responds to the request.

```mermaid
    flowchart LR
      accTitle: Pool traffic flow
      accDescr: When an incoming request reaches a pool, it then goes to a server within the pool.
    A[Request 1] --Routed by pool--> Origin2
      subgraph P1 [Origin pool]
        Origin1((Origin 1))
        Origin2((Origin 2))
      end
```
<br/>

This progression of load balancer --> pool --> server is the core part of how a load balancer works.