---
pcx_content_type: how-to
title: Run endpoint health checks
weight: 4
---

# Run endpoint health checks

Magic Transit uses endpoint health checks to determine the overall health of your inter-network connections. Probes originate from Cloudflare infrastructure, outside customer network namespaces, and target IP addresses deep within your network, beyond the tunnel-terminating border router. These “long distance” probes are purely diagnostic.

{{<render file="_endpoint-health-checks.md">}}

| Prefix          | Endpoint IP address |
| --------------- | ------------------- |
| 103.21.244.0/24 | 103.21.244.100      |
| 103.21.245.0/24 | 103.21.245.100      |
