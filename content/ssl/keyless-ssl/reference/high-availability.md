---
order: 2
pcx-content-type: reference
---

# High availability

The Cloudflare Keyless SSL server runs as a single binary with minimal dependencies and is designed to be robust and reliable. The network between your key server and Cloudflare may not be however, which could prevent new TLS connections.

For this reason, we strongly recommend that you run at least two key servers in a high availability configuration behind a load balancer. Set up health checks for each key server on the configured TCP port—2407 by default and failover as necessary or round-robin between active (healthy) key servers.

From a network availability and performance perspective, advertise the IP address of your key server from multiple data centers (an anycast setup) so the Cloudflare edge can route to the closest key server via BGP. When you use anycast routing, you can also safely take a data center offline to perform maintenance.