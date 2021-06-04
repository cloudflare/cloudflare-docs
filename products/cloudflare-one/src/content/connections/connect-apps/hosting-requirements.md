---
order: 7
---

# Tunnel Hosting Requirements

Running `cloudflared` instances on a server and proxying traffic through it require computing resources such as CPU and memory on the server. The actual amount of resource usage depends on many variables, including the number of requests per second, bandwidth, network latency and hardware environment.

Although there is a physical limit on the amount of traffic that a single instance of `cloudflared` can proxy on a single server, you may easily scale up the capacity of your Tunnel by running many instances of `cloudflared` [over the same Tunnel multiple times](https://blog.cloudflare.com/highly-available-and-highly-scalable-cloudflare-tunnels/) on different machines or network cards, regardless of the baseline performance of one `cloudflared` instance.

You may refer to this guide for how to [deploy cloudflared replicas](/connections/connect-apps/run-tunnel/deploy-cloudflared-replicas) to deal with high-load cases.
