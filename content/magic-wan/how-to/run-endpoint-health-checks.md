---
title: Run endpoint health checks
pcx_content_type: how-to
weight: 3
---

# Run endpoint health checks

Magic WAN uses endpoint health checks to determine the overall health of your inter-network connections. Probes originate from Cloudflare infrastructure (outside customer network namespaces) and target IP addresses deep within your network. This process occurs beyond the tunnel-terminating border router, and these “long distance” probes are purely diagnostic.

{{<render file="_endpoint-health-checks.md" productFolder="magic-transit" >}}

| Prefix            | Endpoint IP address |
| ----------------- | ------------------- |
| `103.21.244.0/24` | `103.21.244.100`    |
| `103.21.245.0/24` | `103.21.245.100`    |
