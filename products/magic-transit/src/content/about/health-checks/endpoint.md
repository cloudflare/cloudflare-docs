---
title: Endpoint health checks
weight: 160
---

Endpoint health checks evaluate connectivity from Cloudflare distributed data centers to your origin network. Designed to provide a broad picture of Internet health, endpoint probes flow over available tunnels and do not inform tunnel selection or steering logic.

Cloudflare edge servers issue endpoint health checks outside of customer network namespaces and typically target endpoints beyond the tunnel-terminating border router.

Cloudflare configures health checks with endpoint IP addresses you supply during the onboarding process. For more on endpoint health check configuration, see _[Set up Magic Transit: Configuration data](/magic-transit/how-to/set-up/configuration-data/#endpoint-health-checks)_.
