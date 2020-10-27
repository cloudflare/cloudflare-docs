---
order: 0
---

# Health checks

Magic Transit health checks monitor network status and the health of specific network components. To accurately and precisely monitor the health of a specific route, each Cloudflare edge server associated with your network asynchronously emits health check probes every 60 seconds.

Because Cloudflare sends probes asynchronously, origin routers typically receive several hundred per minute. This allows Magic Transit to detect failures almost immediately.

Magic Transit performs two types of health check:

- __[Endpoint health checks](/about/health-checks/endpoint/)__ determine the overall health of inter-network connections by probing an endpoint deep within your network, across active tunnels.

- __[Tunnel health checks](/about/health-checks/tunnel)__ monitor the Generic Routing Encapsulation (GRE) tunnels that route traffic from Cloudflare to your network. Tunnel health check probes originate from within your dedicated network namespaces and typically target your GRE tunnel endpoint. Health check results influence how Cloudflare steers traffic across primary and failover tunnels so that packets transit the healthiest available routes.
