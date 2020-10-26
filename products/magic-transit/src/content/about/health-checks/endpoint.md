---
title: Endpoint
order: 2
---

# Endpoint health checks

Endpoint health checks evaluate connectivity from Cloudflare distributed data centers to your origin network. Designed to provide a broad picture of Internet health, endpoint probes flow over available tunnels and do not inform tunnel selection or steering logic.

Cloudflare edge servers issue endpoint health checks outside of customer network namespaces and typically target endpoints beyond the tunnel-terminating border router.

Cloudflare configures health checks with endpoint IP addresses you supply during the onboarding process. For more on endpoint health check configuration, see _[Specify IP addresses for endpoint health checks](/set-up/provide-configuration-data/specify-ip-addresses-for-endpoint-health-checks)_.
