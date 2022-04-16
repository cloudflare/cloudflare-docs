---
pcx-content-type: concept
title: Tunnel Hosting Requirements
weight: 8
---

# Tunnel Hosting Requirements

Running `cloudflared` instances on a server and proxying traffic through it requires computing resources such as CPU and memory on the server. The actual amount of resource usage depends on many variables, including the number of requests per second, bandwidth, network latency and hardware environment.

Although the limit to how much traffic a single `cloudflared` can proxy will be bound to the hardware capabilities of the underlying machine (including network-wise), you may easily scale up the capacity of your Tunnel by running many instances of `cloudflared` [over the same Tunnel multiple times](https://blog.cloudflare.com/highly-available-and-highly-scalable-cloudflare-tunnels/) on different machines or network cards, regardless of the baseline performance of one `cloudflared` instance.

You may refer to this guide for how to [deploy cloudflared replicas](/cloudflare-one/connections/connect-apps/run-tunnel/deploy-cloudflared-replicas/) to deal with high-load cases.
