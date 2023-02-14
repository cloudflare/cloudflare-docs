---
title: Components of a load balancer
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

For load balancing to happen, you need:

- **Origin pools**: Which contain one or more servers.
- **A load balancer**: Which decides which traffic goes to each origin pool associated with the load balancer.

## How it works

Normally, requests to your application would go to individual servers.

With a load balancer, requests first go through the load balancer. Your load balancer then routes requests to specific pools.

Once each pool gets the request, it routes requests to a specific server and that server performs the computational work needed for the request.

{{<render file="../../load-balancing/_partials/_load-balancing-diagram.md">}}