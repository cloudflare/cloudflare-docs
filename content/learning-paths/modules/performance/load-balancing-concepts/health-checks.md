---
title: Monitors and health checks
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

There's more to a load balancer than just distributing traffic, however.

After all, what good would it be if your load balancer and pools send a request to a server that's offline? Or one that's already overloaded with traffic? Ideally, your load balancer should only forward requests that a server can handle.

That's where another part of the load balancing equation comes in: monitors and health checks.

{{<render file="../../load-balancing/_partials/_health-check-diagram.md">}}

## How it works

A monitor issues health checks periodically to evaluate the health of a each server within a pool.

{{<render file="../../load-balancing/_partials/_health-check-definition.md">}}

This system of request and response ensures that a load balancer knows which servers can handle incoming requests.