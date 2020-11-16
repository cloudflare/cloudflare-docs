---
order: 2
---

# High availability

<Aside type='warning' header='Important'>

It is important that you monitor the uptime and status of your key server, and ensure that it is available at all times, otherwise new TLS connections will not be possible.
</Aside>

Cloudflare’s Keyless SSL server runs as a single binary with minimal dependencies, and is designed to be robust and reliable. The network between your key server and Cloudflare may not be however, and we strongly recommend that you run at least two (2) key servers in a high availability (“HA”) configuration behind a load balancer.

The load balancer should be configured to health check each key server on the configured TCP port—2407 by default—and failover as necessary, or round-robin between active (healthy) key servers.

From a network availability and performance perspective, it is recommended that the IP address of your key server be advertised from multiple data centers (i.e., anycast’ed) so that Cloudflare’s edge can route to the closest key server via BGP. Additionally, utilizing anycast allows you to safely take a data center offline to perform maintenance.

--------

## Health checks and monitoring

Integrate your key servers with your existing monitoring systems. Your OS’ process monitor should manage starting and restarting the key server, but we recommend (at minimum) performing health checks on 2407/tcp and the infrastructure on which your key servers are running.