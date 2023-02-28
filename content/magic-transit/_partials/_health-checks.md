---
_build:
  publishResources: false
  render: never
  list: never
---

# Health checks

Magic Transit and Magic WAN health checks monitor network status and the health of specific network components. To monitor the health of a specific route, each Cloudflare global network server associated with your network sends a multicast "heartbeat" every few seconds to construct a list of live, peer IP addresses. This approach utilizes consistent hashing, and as a result, Magic Transit and Magic WAN can consistently assign tunnels to servers in a way that is resilient to server failures and does not require extra coordination between servers beyond heartbeats. 

Because Cloudflare sends probes asynchronously, origin routers typically receive several hundred per minute. This allows Magic Transit and Magic WAN to detect failures almost immediately.

Magic Transit and Magic WAN perform two types of health checks: endpoint health checks and tunnel health checks.

## Endpoint health checks

Endpoint health checks evaluate connectivity from Cloudflare distributed data centers to your origin network. Designed to provide a broad picture of Internet health, endpoint probes flow over available tunnels and do not inform tunnel selection or steering logic.

Cloudflare global network servers issue endpoint health checks outside of customer network namespaces and typically target endpoints beyond the tunnel-terminating border router. Each server sends one endpoint health check every ten minutes.

During onboarding, you [specify IP addresses to configure endpoint health checks](/magic-transit/how-to/run-endpoint-health-checks/).

## Tunnel health checks

Tunnel health checks monitor the status of the Generic Routing Encapsulation (GRE) and IPsec tunnels that route traffic from Cloudflare to your origin network. Magic Transit and Magic WAN rely on health checks to steer traffic to the best available routes.

During onboarding, you [specify the tunnel endpoints](/magic-transit/how-to/configure-tunnels/) the tunnel probes originating from Cloudflare's global network will target.

Tunnel health check results are exposed via an [API](/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/). These results are aggregated from individual health check results done on Cloudflare servers.
