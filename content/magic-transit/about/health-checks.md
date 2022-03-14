---
pcx-content-type: concept
title: Health checks
weight: 0
---

# Health checks

Magic Transit health checks monitor network status and the health of specific network components. To accurately and precisely monitor the health of a specific route, each Cloudflare edge server associated with your network asynchronously emits health check probes every 60 seconds.

Because Cloudflare sends probes asynchronously, origin routers typically receive several hundred per minute. This allows Magic Transit to detect failures almost immediately.

Magic Transit performs two types of health checks: endpoint health checks and tunnel health checks.

## Endpoint health checks

Endpoint health checks evaluate connectivity from Cloudflare distributed data centers to your origin network. Designed to provide a broad picture of Internet health, endpoint probes flow over available tunnels and do not inform tunnel selection or steering logic.

Cloudflare edge servers issue endpoint health checks outside of customer network namespaces and typically target endpoints beyond the tunnel-terminating border router. Each server sends one endpoint health check every ten minutes.

During onboarding, you [specify IP addresses to configure endpoint health checks](/magic-transit/get-started/configure-tunnels/specify-ip-addresses-for-endpoint-health-checks/).

## Tunnel health checks

Tunnel health checks monitor the status of the Generic Routing Encapsulation (GRE) tunnels that route traffic from Cloudflare to your origin network. Magic Transit relies on health checks to steer traffic to the best available routes.

During onboarding, you [specify the GRE tunnel endpoints](/magic-transit/get-started/configure-tunnels/specify-gre-tunnel-endpoints/) the tunnel probes originating from Cloudflare's edge network will target.

Tunnel health check results are exposed via an [API](/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/). These results are aggregated from individual health check results done on Cloudflare servers.
