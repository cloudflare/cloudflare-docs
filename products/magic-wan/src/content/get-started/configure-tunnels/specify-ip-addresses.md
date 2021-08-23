---
title: Specify IP address for endpoint health checks
order: 
pcx-content-type: how-to
---

# Specify IP addresses for endpoint health checks

Magic WAN uses endpoint health checks to determine the overall health of your inter-network connections. Probes originate from Cloudflare infrastructure, outside customer network namespaces, and target IP addresses deep within your network. This process occurs beyond the tunnel-terminating border router, and these “long distance” probes are purely diagnostic.

When choosing which endpoint IP addresses to monitor with health checks, keep in mind that redundant IPs routed via the same ISP and infrastructure are unnecessary but are useful when troubleshooting.

Cloudflare pings health check IPs from within the [published Cloudflare IP range](https://www.cloudflare.com/ips/), which is also available via the [Cloudflare API](https://api.cloudflare.com/#cloudflare-ips-properties).

For an example endpoint health check configuration, see the table below.

| Prefix          | Endpoint IP address |
| --------------- | ------------------- |
| 103.21.244.0/24 | 103.21.244.100      |
| 103.21.245.0/24 | 103.21.245.100      |
