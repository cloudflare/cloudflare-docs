# Cloudflare Network Interconnect (CNI)

Private, high-performance connectivity to Cloudflare's network. **Enterprise-only**.

## Connection Types

**Direct**: Physical fiber in shared datacenter. 10/100 Gbps. You order cross-connect.

**Partner**: Virtual via Console Connect, Equinix, Megaport, etc. Managed via partner SDN.

**Cloud**: AWS Direct Connect or GCP Cloud Interconnect. Magic WAN only.

## Dataplane Versions

**v1 (Classic)**: GRE tunnel support, VLAN/BFD/LACP, asymmetric MTU (1500↓/1476↑), peering support.

**v2 (Beta)**: No GRE, 1500 MTU both ways, no VLAN/BFD/LACP yet, ECMP instead.

## Use Cases

- **Magic Transit DSR**: DDoS protection, egress via ISP (v1/v2)
- **Magic Transit + Egress**: DDoS + egress via CF (v1/v2)
- **Magic WAN + Zero Trust**: Private backbone (v1 needs GRE, v2 native)
- **Peering**: Public routes at PoP (v1 only)
- **App Security**: WAF/Cache/LB (v1/v2 over Magic Transit)

## Prerequisites

- Enterprise plan
- IPv4 /24+ or IPv6 /48+ prefixes
- BGP ASN for v1
- See [locations PDF](https://developers.cloudflare.com/network-interconnect/static/cni-locations-30-10-2025.pdf)

## Specs

- /31 point-to-point subnets
- 10km max optical distance
- 10G: 10GBASE-LR single-mode
- 100G: 100GBASE-LR4 single-mode
- **No SLA** (free service)
- Backup Internet required

## Throughput

| Direction | 10G | 100G |
|-----------|-----|------|
| CF → Customer | 10 Gbps | 100 Gbps |
| Customer → CF (peering) | 10 Gbps | 100 Gbps |
| Customer → CF (Magic) | 1 Gbps/tunnel or CNI | 1 Gbps/tunnel or CNI |

## Timeline

2-4 weeks typical. Steps: request → config review → order connection → configure → test → enable health checks → activate → monitor.

## See Also

- [configuration.md](./configuration.md) - BGP, routing, setup
- [api.md](./api.md) - API endpoints, SDKs
- [patterns.md](./patterns.md) - HA, hybrid cloud, failover
- [gotchas.md](./gotchas.md) - Troubleshooting, limits
