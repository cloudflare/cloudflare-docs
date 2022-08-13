---
pcx_content_type: how-to
title: Enterprise
weight: 4
meta:
  title: Enterprise plans — Protect your origin server
---

# Protect your origin server — Enterprise

{{<render file="_origin-health-overview.md">}}

## Secure origin connections

{{<render file="_origin-secure-dns.md">}}

- **SSL**:
  - To encrypt all traffic between Cloudflare and your server, [choose Strict (SSL-Only Origin Pull)](/ssl/origin-configuration/ssl-modes/#strict-ssl-only-origin-pull) SSL/TLS mode (requires server configuration)
  - To validate requests are coming from the Cloudflare network, [set up authenticated origin pulls](/ssl/origin-configuration/authenticated-origin-pull/).
- **Prevent external connections**:
  - **Origin Server** (moderately secure): Configure your origin server to [only allow traffic from Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/#configure-origin-server).
  - **Cloudflare Tunnel** (very secure): To encrypt all traffic and prevent any inbound connections to your origin, [set up a Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/).

## Monitor origin health

For passive monitoring, [create notifications](/fundamentals/notifications/create-notifications/) for **Origin Error Rate Alerts** to receive alerts when your origin returns 5xx codes above a configurable threshold and **Passive Origin Monitoring** to see when Cloudflare is unable to reach your origin for a few minutes.

{{<render file="_origin-health-check.md">}}

{{<render file="_origin-lb-alert.md">}}

### Zero Downtime Failover

{{<render file="_dns-zero-downtime-failover.md">}}

## Reduce origin traffic

### Block traffic

For more details, refer to [Secure your website](/fundamentals/get-started/task-guides/secure-your-website/).

### Increase caching

{{<render file="_origin-caching.md">}}

### Distribute traffic

{{<render file="_origin-load-balancing.md">}}

\
{{<render file="_origin-waiting-room.md">}}
