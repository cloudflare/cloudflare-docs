---
pcx_content_type: how-to
title: Run endpoint health checks
weight: 4
---

# Run endpoint health checks

Magic Transit uses endpoint health checks to determine the overall health of your [inter-network connections](/magic-transit/reference/tunnels-and-encapsulation/). Probes originate from Cloudflare infrastructure, outside customer network namespaces, and target IP addresses deep within your network, beyond the tunnel-terminating border router. These “long distance” probes are purely diagnostic.

When choosing which endpoint IP addresses to monitor with health checks, use these guidelines:

- Provide one IP address for each of the prefixes Cloudflare will advertise.
- Redundant IPs routed via the same ISP and infrastructure are not necessary but are useful when troubleshooting.

Cloudflare pings health check IPs from within the [published Cloudflare IP range](https://www.cloudflare.com/ips/), which is also available via the [Cloudflare API](/api/operations/cloudflare-i-ps-cloudflare-ip-details).

Refer to the table below for an example of an endpoint health check configuration.

| Prefix            | Endpoint IP address |
| ----------------- | ------------------- |
| `103.21.244.0/24` | `103.21.244.100`    | 
| `103.21.245.0/24` | `103.21.245.100`    |

Refer to [Health checks](/magic-transit/reference/health-checks/) for more information on this topic.