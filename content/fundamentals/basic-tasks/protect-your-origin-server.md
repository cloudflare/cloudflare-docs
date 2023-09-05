---
pcx_content_type: how-to
title: Protect your origin server
meta:
  title: Protect your origin server
aliases:
- /fundamentals/get-started/task-guides/origin-health/
- /fundamentals/get-started/task-guides/origin-health/free/
- /fundamentals/get-started/task-guides/origin-health/pro/
- /fundamentals/get-started/task-guides/origin-health/business/
- /fundamentals/get-started/task-guides/origin-health/enterprise/
---

# Protect your origin server

{{<render file="_origin-health-overview.md">}}

## Secure origin connections

{{<render file="_origin-secure-dns.md">}}

### Application layer

{{<render file="_limit-external-connections-application.md" productFolder="learning-paths">}}

### Transport Layer

{{<render file="_limit-external-connections-transport.md" productFolder="learning-paths">}}

### Network Layer

{{<render file="_limit-external-connections-network.md" productFolder="learning-paths">}}

{{<render file="_ent-only-network-security.md" productFolder="learning-paths">}}

## Monitor origin health

For passive monitoring, [create notifications](/notifications/create-notifications/) for **Origin Error Rate Alerts** to receive alerts when your origin returns 5xx codes above a configurable threshold and **Passive Origin Monitoring** to see when Cloudflare is unable to reach your origin for a few minutes.

{{<render file="_origin-health-check.md">}}

{{<render file="_origin-lb-alert.md">}}

### Zero Downtime Failover

{{<render file="_dns-zero-downtime-failover.md">}}

## Reduce origin traffic

### Block traffic

For more details, refer to [Secure your website](/learning-paths/application-security/).

### Increase caching

{{<render file="_origin-caching.md">}}

### Distribute traffic

{{<render file="_origin-load-balancing.md">}}

\
{{<render file="_origin-waiting-room.md">}}
